import Company from "../models/Company.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTER
export const registerCompany = async (req, res) => {
  try {
    const { companyName, email, password } = req.body;

    const existing = await Company.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Company already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await Company.create({
      companyName,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: company._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      company: {
        id: company._id,
        companyName: company.companyName,
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

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: company._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      company: {
        id: company._id,
        companyName: company.companyName,
        email: company.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
