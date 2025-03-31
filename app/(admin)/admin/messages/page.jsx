// app/admin/messages/page.jsx
import { getContactCount, getContacts } from "@/actions/admin/contact";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { format } from "date-fns";
import { Eye, Filter, Search } from "lucide-react";
import Link from "next/link";
export const dynamic = 'force-dynamic';

// Metadata
export const metadata = {
  title: "Messages | Admin Dashboard",
  description: "Manage contact messages from your portfolio website",
};

// Function to render status badge
function StatusBadge({ status }) {
  switch (status) {
    case "UNREAD":
      return (
        <Badge className="bg-blue-500/10 text-blue-400 border-blue-400/20">
          Unread
        </Badge>
      );
    case "READ":
      return (
        <Badge className="bg-purple-500/10 text-purple-400 border-purple-400/20">
          Read
        </Badge>
      );
    case "REPLIED":
      return (
        <Badge className="bg-green-500/10 text-green-400 border-green-400/20">
          Replied
        </Badge>
      );
    case "ARCHIVED":
      return (
        <Badge className="bg-slate-500/10 text-slate-400 border-slate-400/20">
          Archived
        </Badge>
      );
    default:
      return <Badge className="bg-slate-500/10 text-slate-400">{status}</Badge>;
  }
}

export default async function MessagesPage({ searchParams }) {
  // Get pagination params from URL
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 10;
  const status = searchParams.status || null;

  // Fetch contacts with pagination
  const contacts = await getContacts({
    page,
    limit,
    status,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Fetch total count for pagination
  const totalCount = await getContactCount(status);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <div className="text-sm text-slate-400">
          Total: {totalCount} message{totalCount !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search messages..."
            className="bg-slate-800/50 border-slate-700 pl-10 text-white w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue={status || "all"}>
            <SelectTrigger className="w-[160px] bg-slate-800/50 border-slate-700 text-white">
              <div className="flex items-center gap-2">
                <Filter size={14} />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="all" className="text-white">
                All Messages
              </SelectItem>
              <SelectItem value="UNREAD" className="text-blue-400">
                Unread
              </SelectItem>
              <SelectItem value="READ" className="text-purple-400">
                Read
              </SelectItem>
              <SelectItem value="REPLIED" className="text-green-400">
                Replied
              </SelectItem>
              <SelectItem value="ARCHIVED" className="text-slate-400">
                Archived
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Messages List */}
      <Card className="bg-[#1c1c1c] border-slate-800 shadow-md">
        <CardContent className="p-0">
          {contacts.length > 0 ? (
            <Table>
              <TableHeader className="bg-slate-900/50">
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-slate-400 w-[200px]">
                    Name
                  </TableHead>
                  <TableHead className="text-slate-400">Message</TableHead>
                  <TableHead className="text-slate-400 w-[120px]">
                    Status
                  </TableHead>
                  <TableHead className="text-slate-400 w-[150px]">
                    Date
                  </TableHead>
                  <TableHead className="text-slate-400 w-[100px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow
                    key={contact.id}
                    className="border-slate-800 hover:bg-slate-800/50"
                  >
                    <TableCell className="font-medium text-white">
                      <div className="space-y-1">
                        <div>{contact.name}</div>
                        <div className="text-xs text-slate-400">
                          {contact.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div className="line-clamp-2">{contact.message}</div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={contact.status} />
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">
                      {format(new Date(contact.createdAt), "MMM d, yyyy")}
                      <div className="text-xs text-slate-500">
                        {format(new Date(contact.createdAt), "h:mm a")}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-slate-400 hover:text-white h-8 px-2"
                      >
                        <Link href={`/admin/messages/${contact.id}`}>
                          <Eye size={14} className="mr-1" /> View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center">
              <p className="text-slate-400">No messages found</p>
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
                href={
                  page > 1
                    ? `/admin/messages?page=${page - 1}${
                        status ? `&status=${status}` : ""
                      }`
                    : "#"
                }
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={`/admin/messages?page=${pageNum}${
                      status ? `&status=${status}` : ""
                    }`}
                    isActive={pageNum === page}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href={
                  page < totalPages
                    ? `/admin/messages?page=${page + 1}${
                        status ? `&status=${status}` : ""
                      }`
                    : "#"
                }
                className={
                  page >= totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
