import dotenv from "dotenv";
dotenv.config();
export const getCurrentUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return process.env.NEXT_PUBLIC_API_HOST;
};
