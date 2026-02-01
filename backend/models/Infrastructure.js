import mongoose from "mongoose";

const infrastructureSchema = new mongoose.Schema({

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

  basics: {
    size: String,
    provider: String,
    spend: Number,
    currency: String,
  },

  infra: {
    compute: Number,
    storage: Number,
    traffic: String,
  },

  goals: Object,

  advanced: {
    monitoring: String,
    scaling: String,
    reserved: String,
  },

  optimization: {
    currentSpend: Number,
    optimizedSpend: Number,
    savings: Number,
    status: String,
    recommendations: [String]
  }

}, { timestamps: true });

export default mongoose.model("Infrastructure", infrastructureSchema);
