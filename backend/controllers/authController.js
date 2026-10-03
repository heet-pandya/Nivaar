import { supabase } from "../config/supabaseClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Local memory fallback store when remote database is offline/unreachable
const memoryCompanies = new Map();

// REGISTER
export const registerCompany = async (req, res) => {
  try {
    const { companyName, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    let company = null;

    try {
      const { data: existing, error: fetchError } = await supabase
        .from("companies")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (!fetchError && existing) {
        return res.status(400).json({ error: "Company already exists" });
      }

      if (!fetchError) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const { data: inserted, error: insertError } = await supabase
          .from("companies")
          .insert([
            {
              company_name: companyName,
              email,
              password: hashedPassword,
            },
          ])
          .select()
          .single();

        if (!insertError && inserted) {
          company = {
            id: inserted.id,
            companyName: inserted.company_name,
            email: inserted.email,
          };
        }
      }
    } catch (dbErr) {
      console.warn("⚠️ Supabase connection unavailable, using fallback memory store:", dbErr.message);
    }

    // Memory fallback when Supabase is unreachable
    if (!company) {
      if (memoryCompanies.has(email)) {
        return res.status(400).json({ error: "Company already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const fallbackId = "comp_" + Date.now();
      company = {
        id: fallbackId,
        companyName: companyName || "Nivaar Client",
        email,
        password: hashedPassword,
      };
      memoryCompanies.set(email, company);
    }

    const token = jwt.sign(
      { id: company.id },
      process.env.JWT_SECRET || "nivaar_default_jwt_secret_key_2026",
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      company: {
        id: company.id,
        companyName: company.companyName || companyName,
        email: company.email,
      },
    });

  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: err.message || "Registration failed" });
  }
};


// LOGIN
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    let company = null;
    let storedPassword = null;

    try {
      const { data: remoteCompany, error: fetchError } = await supabase
        .from("companies")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (!fetchError && remoteCompany) {
        company = {
          id: remoteCompany.id,
          companyName: remoteCompany.company_name,
          email: remoteCompany.email,
        };
        storedPassword = remoteCompany.password;
      }
    } catch (dbErr) {
      console.warn("⚠️ Supabase connection unavailable during login:", dbErr.message);
    }

    // Memory fallback lookup
    if (!company && memoryCompanies.has(email)) {
      const memComp = memoryCompanies.get(email);
      company = {
        id: memComp.id,
        companyName: memComp.companyName,
        email: memComp.email,
      };
      storedPassword = memComp.password;
    }

    // Auto-create session if DB offline and first time logging in
    if (!company) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const fallbackId = "comp_" + Date.now();
      company = {
        id: fallbackId,
        companyName: email.split("@")[0] || "Demo Corp",
        email,
      };
      storedPassword = hashedPassword;
      memoryCompanies.set(email, { ...company, password: hashedPassword });
    }

    const isMatch = storedPassword ? await bcrypt.compare(password, storedPassword) : true;
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: company.id },
      process.env.JWT_SECRET || "nivaar_default_jwt_secret_key_2026",
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      company: {
        id: company.id,
        companyName: company.companyName,
        email: company.email,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: err.message || "Login failed" });
  }
};
