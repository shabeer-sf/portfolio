// app/admin/dashboard/page.jsx
import { db } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  MessageSquare, 
  FolderKanban, 
  Briefcase 
} from "lucide-react";

export default async function AdminDashboard() {
  // Fetch counts for dashboard
  const projectCount = await db.project.count();
  const contactCount = await db.contact.count({
    where: { status: "UNREAD" }
  });
  const experienceCount = await db.experience.count();
  const serviceCount = await db.service.count();

  const stats = [
    { 
      title: "Projects", 
      value: projectCount, 
      icon: FolderKanban, 
      color: "text-blue-500",
      bgColor: "bg-blue-500/10" 
    },
    { 
      title: "Unread Messages", 
      value: contactCount, 
      icon: MessageSquare,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    { 
      title: "Experience Entries", 
      value: experienceCount, 
      icon: Briefcase,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    { 
      title: "Services", 
      value: serviceCount, 
      icon: Users,
      color: "text-emerald-500", 
      bgColor: "bg-emerald-500/10"
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-[#1c1c1c] border-slate-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-slate-300 text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Add recent messages, activity, etc. */}
    </div>
  );
}