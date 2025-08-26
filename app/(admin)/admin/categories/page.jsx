// app/(admin)/admin/categories/page.jsx
import React from "react";
import Link from "next/link";
import { getCategories } from "@/actions/admin/category";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Palette, Eye, EyeOff } from "lucide-react";

// Metadata
export const metadata = {
  title: "Categories | Admin Dashboard",
  description: "Manage project categories",
};

export default async function CategoriesPage() {
  
  // Fetch categories with project count
  const categories = await getCategories({
    includeProjectCount: true
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Categories</h1>
          <p className="text-slate-400 text-sm mt-1">Manage dynamic project categories</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Link href="/admin/categories/new">
            <Plus size={16} className="mr-2" />
            Add Category
          </Link>
        </Button>
      </div>

      <div className="text-sm text-slate-400 flex justify-between items-center">
        <span>Total: {categories.length} categor{categories.length !== 1 ? "ies" : "y"}</span>
      </div>

      {/* Categories List */}
      <Card className="bg-[#1c1c1c] border-slate-800 shadow-md">
        <CardContent className="p-0">
          {categories.length > 0 ? (
            <Table>
              <TableHeader className="bg-slate-900/50">
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-slate-400 w-[80px]">Order</TableHead>
                  <TableHead className="text-slate-400">Category</TableHead>
                  <TableHead className="text-slate-400 w-[120px]">Projects</TableHead>
                  <TableHead className="text-slate-400 w-[100px]">Status</TableHead>
                  <TableHead className="text-slate-400 w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow 
                    key={category.id} 
                    className="border-slate-800 hover:bg-slate-800/50"
                  >
                    <TableCell className="font-medium text-white text-center">
                      {category.order}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full border-2"
                          style={{
                            backgroundColor: category.color || '#6B7280',
                            borderColor: category.color ? `${category.color}50` : '#6B728050'
                          }}
                        />
                        <div>
                          <p className="text-white font-medium">{category.name}</p>
                          <p className="text-xs text-slate-400 line-clamp-1">/{category.slug}</p>
                          {category.description && (
                            <p className="text-xs text-slate-500 line-clamp-1 mt-1">{category.description}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className="bg-slate-800 text-slate-300"
                      >
                        {category._count?.projects || 0} projects
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {category.isActive ? (
                          <Eye size={14} className="text-green-400" />
                        ) : (
                          <EyeOff size={14} className="text-slate-500" />
                        )}
                        <Badge 
                          className={`${
                            category.isActive 
                              ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                              : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                          }`}
                        >
                          {category.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild className="text-slate-400 hover:text-white h-8 px-2">
                        <Link href={`/admin/categories/${category.id}`}>
                          <Pencil size={14} className="mr-1" /> Edit
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center">
              <Palette size={40} className="mx-auto mb-4 text-slate-500" />
              <p className="text-slate-400 mb-4">No categories found</p>
              <p className="text-slate-500 text-sm mb-6">Create your first category to organize your projects</p>
              <Button 
                asChild 
                variant="outline" 
                className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Link href="/admin/categories/new">
                  <Plus size={16} className="mr-2" />
                  Create Your First Category
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}