// app/admin/layout.jsx
import AdminWrapper from "@/components/AdminWrapper";
import "../globals.css";
import { dynamic, fetchCache, revalidate } from "./config"; // Make sure config.js is in the /admin folder

export default function AdminLayout({ children }) {
  return (
    <AdminWrapper>
      {/* <SearchParamsProvider> */}
      {children}
      {/* </SearchParamsProvider> */}
    </AdminWrapper>
  );
}
