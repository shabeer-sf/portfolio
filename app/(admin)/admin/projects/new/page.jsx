// app/admin/projects/new/page.jsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectForm from "@/components/ProjectForm";

export const metadata = {
  title: "Add New Project | Admin Dashboard",
  description: "Create a new portfolio project",
};

export default function NewProjectPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Link href="/admin/projects">
              <ArrowLeft size={14} className="mr-1" /> Back to Projects
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-white ml-2">Add New Project</h1>
        </div>
      </div>

      <ProjectForm />
    </div>
  );
}