'use client';

import React, { useState } from 'react';
import { deleteExperience } from '@/actions/admin/experience';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function DeleteExperienceButton({ id, company, title }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteExperience(id);
      toast.success("Experience deleted successfully");
      router.push("/admin/experience");
      router.refresh();
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("Failed to delete experience");
      setOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button 
        variant="destructive" 
        size="sm"
        onClick={() => setOpen(true)}
      >
        <Trash2 size={16} className="mr-2" /> Delete
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-[#1c1c1c] border-slate-800 text-white">
          <AlertDialogHeader>
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-red-400" size={24} />
            </div>
            <AlertDialogTitle className="text-center">Delete Experience</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400 text-center">
              Are you sure you want to delete <span className="font-medium text-white">{title}</span> at <span className="font-medium text-white">{company}</span>?
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Experience"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}