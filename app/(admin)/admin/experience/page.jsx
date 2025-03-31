import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { getExperiences, getExperienceCount } from "@/actions/admin/experience";
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
import { Plus, Pencil, Filter, Search, Building, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Experience Timeline | Admin Dashboard",
  description: "Manage timeline of work experiences",
};

export default async function ExperienceTimelinePage({ searchParams = {} }) {
  const page = parseInt(searchParams.page || "1", 10) || 1;
  const limit = parseInt(searchParams.limit || "10", 10) || 10;
  const currentStr = searchParams.current || null;
  const current = currentStr === "true" ? true : currentStr === "false" ? false : null;

  const experiences = await getExperiences({
    page,
    limit,
    current,
    sortBy: "order",
    sortOrder: "asc",
  });

  const totalCount = await getExperienceCount(current);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Experience Timeline</h1>
        <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Link href="/admin/experience/new">
            <Plus size={16} className="mr-2" /> Add Experience
          </Link>
        </Button>
      </div>

      <div className="text-sm text-slate-400 flex justify-between items-center">
        <span>Total: {totalCount} experience{totalCount !== 1 ? "s" : ""}</span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search experiences..."
            className="bg-slate-800/50 border-slate-700 pl-10 text-white w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue={current === null ? "all" : current.toString()}>
            <SelectTrigger className="w-[160px] bg-slate-800/50 border-slate-700 text-white">
              <div className="flex items-center gap-2">
                <Filter size={14} />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="all" className="text-white">All Positions</SelectItem>
              <SelectItem value="true" className="text-green-400">Current</SelectItem>
              <SelectItem value="false" className="text-slate-400">Previous</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Experiences List */}
      <Card className="bg-[#1c1c1c] border-slate-800 shadow-md">
        <CardContent className="p-0">
          {experiences.length > 0 ? (
            <Table>
              <TableHeader className="bg-slate-900/50">
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-slate-400 w-[60px]">Order</TableHead>
                  <TableHead className="text-slate-400">Position</TableHead>
                  <TableHead className="text-slate-400">Company</TableHead>
                  <TableHead className="text-slate-400 w-[180px]">Duration</TableHead>
                  <TableHead className="text-slate-400 w-[100px]">Status</TableHead>
                  <TableHead className="text-slate-400 w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experiences.map((experience) => (
                  <TableRow 
                    key={experience.id} 
                    className="border-slate-800 hover:bg-slate-800/50"
                  >
                    <TableCell className="font-medium text-white text-center">
                      {experience.order}
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      {experience.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-slate-500" />
                        <span className="text-slate-300">{experience.company}</span>
                        <span className="text-xs text-slate-500">{experience.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-slate-500" />
                        <span className="text-slate-300">
                          {format(new Date(experience.startDate), "MMM yyyy")} - {experience.endDate ? format(new Date(experience.endDate), "MMM yyyy") : "Present"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {experience.isCurrent ? (
                        <Badge className="bg-green-500/10 text-green-400 border-green-400/20">
                          Current
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-500/10 text-slate-400 border-slate-400/20">
                          Previous
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild className="text-slate-400 hover:text-white h-8 px-2">
                        <Link href={`/admin/experience/${experience.id}`}>
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
              <p className="text-slate-400">No experiences found</p>
              <Button 
                asChild 
                variant="outline" 
                className="mt-4 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Link href="/admin/experience/new">
                  <Plus size={16} className="mr-2" />
                  Add Your First Experience
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
                href={page > 1 ? `/admin/experience?page=${page - 1}${current !== null ? `&current=${current}` : ''}` : '#'} 
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink 
                  href={`/admin/experience?page=${pageNum}${current !== null ? `&current=${current}` : ''}`}
                  isActive={pageNum === page}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                href={page < totalPages ? `/admin/experience?page=${page + 1}${current !== null ? `&current=${current}` : ''}` : '#'} 
                className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}