// app/admin/layout.jsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Double-check authorization (in addition to middleware)
  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="h-screen flex bg-[#0c0c0c]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader user={session.user} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#111111]">
          {children}
        </main>
      </div>
    </div>
  );
}