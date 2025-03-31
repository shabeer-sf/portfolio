// app/admin/experience/new/page.jsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExperienceForm from "../_components/experience-form";

export const metadata = {
  title: "Add New Experience | Admin Dashboard",
  description: "Add a new work experience to your timeline",
};

export default function NewExperiencePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Link href="/admin/experience">
              <ArrowLeft size={14} className="mr-1" /> Back to Timeline
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-white ml-2">Add New Experience</h1>
        </div>
      </div>

      <ExperienceForm />
    </div>
  );
}