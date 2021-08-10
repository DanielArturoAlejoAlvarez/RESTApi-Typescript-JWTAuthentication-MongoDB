import { Schema, model } from "mongoose";

export const ROLES = ["SUPERADMIN","ADMIN","USER"]

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);
