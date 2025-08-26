// app/(admin)/admin/categories/new/page.jsx
import React from "react";
import CategoryForm from "@/components/CategoryForm";

export const metadata = {
  title: "New Category | Admin Dashboard",
  description: "Create a new project category",
};

export default function NewCategoryPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Create New Category</h1>
        <p className="text-slate-400 text-sm mt-1">Add a new project category to organize your portfolio</p>
      </div>
      
      <CategoryForm />
    </div>
  );
}