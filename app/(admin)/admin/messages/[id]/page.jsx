// app/admin/messages/[id]/page.jsx
import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { getContact } from "@/actions/admin/contact";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import StatusUpdateForm from "@/components/StatusUpdateForm";
import DeleteMessageButton from "@/components/DeleteButton";
import { ArrowLeft, Mail, Calendar, User, Tag, Clock } from "lucide-react";

export async function generateMetadata({ params }) {
  try {
    const contact = await getContact(params.id);
    return {
      title: `Message from ${contact.name} | Admin Dashboard`,
      description: `View message details from ${contact.name}`,
    };
  } catch (error) {
    return {
      title: "Message Details | Admin Dashboard",
      description: "View message details",
    };
  }
}

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
      return (
        <Badge className="bg-slate-500/10 text-slate-400">
          {status}
        </Badge>
      );
  }
}

export default async function MessageDetailPage({ params }) {
  // Fetch contact details
  let contact;
  try {
    contact = await getContact(params.id);
  } catch (error) {
    notFound();
  }

  // Format dates
  const formattedDate = format(new Date(contact.createdAt), "MMMM d, yyyy 'at' h:mm a");
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="border-slate-700 text-slate-300 hover:bg-slate-800">
            <Link href="/admin/messages">
              <ArrowLeft size={14} className="mr-1" /> Back to Messages
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-white ml-2">Message Details</h1>
        </div>
        <StatusBadge status={contact.status} />
      </div>

      {/* Contact Information Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="bg-[#1c1c1c] border-slate-800 shadow-md lg:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl text-white">{contact.name}</CardTitle>
          </CardHeader>
          <Separator className="bg-slate-800" />
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Message content */}
              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700 min-h-[160px] text-slate-200 whitespace-pre-wrap">
                {contact.message}
              </div>
              
              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail size={16} className="text-slate-500" />
                  <span>Email:</span>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-blue-400 hover:underline truncate"
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={16} className="text-slate-500" />
                  <span>Received:</span>
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={16} className="text-slate-500" />
                  <span>Updated:</span>
                  <span>{format(new Date(contact.updatedAt), "MMMM d, yyyy")}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-slate-800 gap-2 justify-end">
            <Button
              variant="outline"
              asChild
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <Link href={`mailto:${contact.email}?subject=Re: Your message on Shabeer Portfolio`}>
                <Mail size={16} className="mr-2" /> Reply via Email
              </Link>
            </Button>
            <DeleteMessageButton id={contact.id} />
          </CardFooter>
        </Card>

        {/* Status management card */}
        <Card className="bg-[#1c1c1c] border-slate-800 shadow-md h-min">
          <CardHeader>
            <CardTitle className="text-white text-lg">Manage Status</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusUpdateForm 
              id={contact.id} 
              currentStatus={contact.status} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}