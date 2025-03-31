'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { updateContactStatus } from '@/actions/admin/contact';
import { 
  RadioGroup, 
  RadioGroupItem 
} from '@/components/ui/radio-group';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { 
  Label 
} from '@/components/ui/label';
import { 
  Button 
} from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function StatusUpdateForm({ id, currentStatus }) {
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async () => {
    if (status === currentStatus) {
      toast.info("Status is already set to " + status);
      return;
    }

    setIsLoading(true);
    try {
      await updateContactStatus(id, status);
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
      // Reset to previous status on error
      setStatus(currentStatus);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <RadioGroup 
        value={status} 
        onValueChange={setStatus}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="UNREAD" id="unread" />
          <Label 
            htmlFor="unread" 
            className="text-sm font-medium text-blue-400"
          >
            Unread
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="READ" id="read" />
          <Label 
            htmlFor="read" 
            className="text-sm font-medium text-purple-400"
          >
            Read
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="REPLIED" id="replied" />
          <Label 
            htmlFor="replied" 
            className="text-sm font-medium text-green-400"
          >
            Replied
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ARCHIVED" id="archived" />
          <Label 
            htmlFor="archived" 
            className="text-sm font-medium text-slate-400"
          >
            Archived
          </Label>
        </div>
      </RadioGroup>

      <Button 
        onClick={handleStatusChange}
        disabled={isLoading || status === currentStatus}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          "Update Status"
        )}
      </Button>
    </div>
  );
}