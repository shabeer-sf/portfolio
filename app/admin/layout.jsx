// app/admin/layout.jsx
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";
import { SessionProvider } from "@/providers/session-provider";

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <div className="h-screen flex bg-[#0c0c0c]">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader user={{ name: "Admin", email: "admin@example.com" }} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#111111]">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}