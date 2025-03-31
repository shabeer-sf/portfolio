// app/admin/projects/page.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { getProjects, getProjectCount } from "@/actions/admin/project";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus, Pencil, Star, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ToggleFeaturedButton from "@/components/ToggleFeaturedButton";

// Metadata
export const metadata = {
  title: "Projects | Admin Dashboard",
  description: "Manage portfolio projects",
};

export default async function ProjectsPage({ searchParams }) {
  // Get pagination params from URL
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 10;
  const category = searchParams.category || null;
  const featured = searchParams.featured === "true" ? true : (searchParams.featured === "false" ? false : null);
  
  // Fetch projects with pagination
  const projects = await getProjects({
    page,
    limit,
    category,
    featured,
    sortBy: "order",
    sortOrder: "asc",
  });
  
  // Fetch total count for pagination
  const totalCount = await getProjectCount(category, featured);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Link href="/admin/projects/new">
            <Plus size={16} className="mr-2" />
            Add Project
          </Link>
        </Button>
      </div>

      <div className="text-sm text-slate-400 flex justify-between items-center">
        <span>Total: {totalCount} project{totalCount !== 1 ? "s" : ""}</span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search projects..."
            className="bg-slate-800/50 border-slate-700 pl-10 text-white w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue={category || "all"}>
            <SelectTrigger className="w-[160px] bg-slate-800/50 border-slate-700 text-white">
              <div className="flex items-center gap-2">
                <Filter size={14} />
                <SelectValue placeholder="Filter by category" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="all" className="text-white">All Categories</SelectItem>
              <SelectItem value="WEB" className="text-blue-400">Web</SelectItem>
              <SelectItem value="MOBILE" className="text-purple-400">Mobile</SelectItem>
              <SelectItem value="BACKEND" className="text-green-400">Backend</SelectItem>
              <SelectItem value="OTHER" className="text-amber-400">Other</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue={featured === null ? "all" : featured.toString()}>
            <SelectTrigger className="w-[160px] bg-slate-800/50 border-slate-700 text-white">
              <div className="flex items-center gap-2">
                <Star size={14} />
                <SelectValue placeholder="Filter by featured" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="all" className="text-white">All Projects</SelectItem>
              <SelectItem value="true" className="text-amber-400">Featured</SelectItem>
              <SelectItem value="false" className="text-slate-400">Not Featured</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects List */}
      <Card className="bg-[#1c1c1c] border-slate-800 shadow-md">
        <CardContent className="p-0">
          {projects.length > 0 ? (
            <Table>
              <TableHeader className="bg-slate-900/50">
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-slate-400 w-[60px]">Order</TableHead>
                  <TableHead className="text-slate-400">Project</TableHead>
                  <TableHead className="text-slate-400 w-[120px]">Category</TableHead>
                  <TableHead className="text-slate-400 w-[120px]">Featured</TableHead>
                  <TableHead className="text-slate-400 w-[120px]">Date</TableHead>
                  <TableHead className="text-slate-400 w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow 
                    key={project.id} 
                    className="border-slate-800 hover:bg-slate-800/50"
                  >
                    <TableCell className="font-medium text-white text-center">
                      {project.order}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded">
                          <Image
                            src={project.image || "https://via.placeholder.com/150"}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-white font-medium">{project.title}</p>
                          <p className="text-xs text-slate-400 line-clamp-1">{project.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`
                        ${project.category === 'WEB' ? 'bg-blue-500/10 text-blue-400' : ''}
                        ${project.category === 'MOBILE' ? 'bg-purple-500/10 text-purple-400' : ''}
                        ${project.category === 'BACKEND' ? 'bg-green-500/10 text-green-400' : ''}
                        ${project.category === 'OTHER' ? 'bg-amber-500/10 text-amber-400' : ''}
                      `}>
                        {project.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ToggleFeaturedButton 
                        projectId={project.id} 
                        isFeatured={project.featured} 
                      />
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">
                      {format(new Date(project.date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild className="text-slate-400 hover:text-white h-8 px-2">
                        <Link href={`/admin/projects/${project.id}`}>
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
              <p className="text-slate-400">No projects found</p>
              <Button 
                asChild 
                variant="outline" 
                className="mt-4 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Link href="/admin/projects/new">
                  <Plus size={16} className="mr-2" />
                  Add Your First Project
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href={page > 1 ? `/admin/projects?page=${page - 1}${category ? `&category=${category}` : ''}${featured !== null ? `&featured=${featured}` : ''}` : '#'} 
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink 
                  href={`/admin/projects?page=${pageNum}${category ? `&category=${category}` : ''}${featured !== null ? `&featured=${featured}` : ''}`}
                  isActive={pageNum === page}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                href={page < totalPages ? `/admin/projects?page=${page + 1}${category ? `&category=${category}` : ''}${featured !== null ? `&featured=${featured}` : ''}` : '#'} 
                className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}