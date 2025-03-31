// app/admin/page.jsx
import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { 
  Mail, 
  FolderKanban, 
  Briefcase, 
  Eye, 
  ArrowRight, 
  MessageSquare, 
  Clock
} from "lucide-react";
import { getContacts } from "@/actions/admin/contact";
import { getProjects } from "@/actions/admin/project";
import { getExperiences } from "@/actions/admin/experience";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Dynamic metadata
export const metadata = {
  title: "Admin Dashboard | Shabeer Portfolio",
  description: "Admin dashboard for Shabeer's portfolio website",
};

export default async function AdminDashboard() {
  // Fetch data for dashboard
  const contacts = await getContacts({ limit: 5 });
  const projects = await getProjects({ limit: 5 });
  const experiences = await getExperiences({ limit: 3 });

  // Count unread messages
  const unreadMessages = contacts.filter(contact => contact.status === "UNREAD").length;
  
  // Analytics cards data
  const analyticsCards = [
    { 
      title: "Total Messages", 
      value: contacts.length, 
      icon: Mail, 
      color: "text-blue-400", 
      bgColor: "bg-blue-500/10",
      link: "/admin/messages" 
    },
    { 
      title: "Unread Messages", 
      value: unreadMessages, 
      icon: MessageSquare, 
      color: "text-purple-400", 
      bgColor: "bg-purple-500/10",
      link: "/admin/messages" 
    },
    { 
      title: "Total Projects", 
      value: projects.length, 
      icon: FolderKanban, 
      color: "text-emerald-400", 
      bgColor: "bg-emerald-500/10",
      link: "/admin/projects" 
    },
    { 
      title: "Experience Entries", 
      value: experiences.length, 
      icon: Briefcase, 
      color: "text-amber-400", 
      bgColor: "bg-amber-500/10", 
      link: "/admin/experience"
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="text-sm text-slate-400">
          {format(new Date(), "EEEE, MMMM do, yyyy")}
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card, index) => (
          <Card key={index} className="bg-[#1c1c1c] border-slate-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.bgColor}`}>
                <card.icon className={card.color} size={24} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{card.value}</div>
              <CardDescription className="text-slate-400">
                {card.title}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" asChild className="text-slate-400 hover:text-white p-0">
                <Link href={card.link}>
                  View Details <ArrowRight size={14} className="ml-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Recent Messages */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Messages</h2>
          <Button variant="outline" size="sm" asChild className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Link href="/admin/messages">
              View All <ArrowRight size={14} className="ml-1" />
            </Link>
          </Button>
        </div>

        <Card className="bg-[#1c1c1c] border-slate-800 shadow-md">
          <CardContent className="p-0">
            {contacts.length > 0 ? (
              <div className="divide-y divide-slate-800">
                {contacts.map((contact, index) => (
                  <div key={contact.id} className="p-4 flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{contact.name}</h3>
                        {contact.status === "UNREAD" && (
                          <Badge variant="default" className="bg-blue-500 text-white">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">{contact.email}</p>
                      <p className="text-sm text-slate-300 line-clamp-1">
                        {contact.message}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-xs text-slate-500 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {format(new Date(contact.createdAt), "MMM d, yyyy")}
                      </div>
                      <Button size="sm" variant="ghost" asChild className="text-slate-400 hover:text-white h-8 px-2">
                        <Link href={`/admin/messages/${contact.id}`}>
                          <Eye size={14} className="mr-1" /> View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-slate-400">No messages found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Projects and Experience Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
            <Button variant="outline" size="sm" asChild className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Link href="/admin/projects">
                View All <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          </div>

          <Card className="bg-[#1c1c1c] border-slate-800 shadow-md h-full">
            <CardContent className="p-0">
              {projects.length > 0 ? (
                <div className="divide-y divide-slate-800">
                  {projects.map((project) => (
                    <div key={project.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white">{project.title}</h3>
                        {project.featured && (
                          <Badge variant="outline" className="border-amber-500/20 text-amber-400">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mt-1 line-clamp-1">{project.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-1 flex-wrap">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <Badge key={i} variant="secondary" className="bg-slate-800/50 text-slate-300 text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="secondary" className="bg-slate-800/50 text-slate-300 text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                        <Button size="sm" variant="ghost" asChild className="text-slate-400 hover:text-white h-7 px-2">
                          <Link href={`/admin/projects/${project.id}`}>
                            <Eye size={14} className="mr-1" /> View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-slate-400">No projects found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Experience */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Work Experience</h2>
            <Button variant="outline" size="sm" asChild className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <Link href="/admin/experience">
                View All <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          </div>

          <Card className="bg-[#1c1c1c] border-slate-800 shadow-md h-full">
            <CardContent className="p-0">
              {experiences.length > 0 ? (
                <div className="divide-y divide-slate-800">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white">{exp.title}</h3>
                        {exp.isCurrent && (
                          <Badge variant="outline" className="border-green-500/20 text-green-400">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{exp.company}, {exp.location}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs text-slate-500">
                          {format(new Date(exp.startDate), "MMM yyyy")} - {exp.endDate ? format(new Date(exp.endDate), "MMM yyyy") : "Present"}
                        </div>
                        <Button size="sm" variant="ghost" asChild className="text-slate-400 hover:text-white h-7 px-2">
                          <Link href={`/admin/experience/${exp.id}`}>
                            <Eye size={14} className="mr-1" /> View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-slate-400">No experience entries found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}