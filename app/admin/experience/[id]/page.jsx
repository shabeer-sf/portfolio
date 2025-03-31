// app/admin/experience/[id]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExperienceForm from "../_components/experience-form";
import { getExperience } from "@/actions/admin/experience";
import DeleteExperienceButton from "../_components/delete-button";

export async function generateMetadata({ params }) {
  try {
    const experience = await getExperience(params.id);
    return {
      title: `Edit ${experience.title} at ${experience.company} | Admin Dashboard`,
      description: `Edit work experience details`,
    };
  } catch (error) {
    return {
      title: "Edit Experience | Admin Dashboard",
      description: "Edit work experience details",
    };
  }
}

export default async function EditExperiencePage({ params }) {
  let experience;
  
  try {
    experience = await getExperience(params.id);
  } catch (error) {
    notFound();
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Link href="/admin/experience">
              <ArrowLeft size={14} className="mr-1" /> Back to Timeline
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-white ml-2">Edit Experience</h1>
        </div>
        <DeleteExperienceButton id={experience.id} company={experience.company} title={experience.title} />
      </div>

      <ExperienceForm experience={experience} />
    </div>
  );
}