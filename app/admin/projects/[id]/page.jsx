// app/admin/projects/[id]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectForm from "../project-form";
import { getProject } from "@/actions/admin/project";
import DeleteProjectButton from "./delete-button";

export async function generateMetadata({ params }) {
  try {
    const project = await getProject(params.id);
    return {
      title: `Edit ${project.title} | Admin Dashboard`,
      description: `Edit project details for ${project.title}`,
    };
  } catch (error) {
    return {
      title: "Edit Project | Admin Dashboard",
      description: "Edit project details",
    };
  }
}

export default async function EditProjectPage({ params }) {
  let project;
  
  try {
    project = await getProject(params.id);
  } catch (error) {
    notFound();
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Link href="/admin/projects">
              <ArrowLeft size={14} className="mr-1" /> Back to Projects
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-white ml-2">Edit Project</h1>
        </div>
        <DeleteProjectButton id={project.id} title={project.title} />
      </div>

      <ProjectForm project={project} />
    </div>
  );
}