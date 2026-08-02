import { supabase } from "../config/supabaseClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTER
export const registerCompany = async (req, res) => {
  try {
    const { companyName, email, password } = req.body;

    const { data: existing, error: fetchError } = await supabase
      .from("companies")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (fetchError) {
      throw fetchError;
    }

    if (existing) {
      return res.status(400).json({ msg: "Company already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: company, error: insertError } = await supabase
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

    if (insertError) {
      throw insertError;
    }

    const token = jwt.sign(
      { id: company.id },
      process.env.JWT_SECRET || "nivaar_default_jwt_secret_key_2026",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      company: {
        id: company.id,
        companyName: company.company_name,
        email: company.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// LOGIN
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: company, error: fetchError } = await supabase
      .from("companies")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (fetchError) {
      throw fetchError;
    }

    if (!company) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: company.id },
      process.env.JWT_SECRET || "nivaar_default_jwt_secret_key_2026",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      company: {
        id: company.id,
        companyName: company.company_name,
        email: company.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
