'use client';

import React, { useState } from 'react';
import { toggleProjectFeatured } from '@/actions/admin/project';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2, Star } from 'lucide-react';

export default function ToggleFeaturedButton({ projectId, isFeatured }) {
  const [featured, setFeatured] = useState(isFeatured);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await toggleProjectFeatured(projectId);
      setFeatured(!featured);
      toast.success(`Project ${!featured ? 'featured' : 'unfeatured'} successfully`);
    } catch (error) {
      console.error('Error toggling project featured status:', error);
      toast.error('Failed to update project status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        px-2 h-8
        ${featured 
          ? 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800'}
      `}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Star size={14} className={`mr-1 ${featured ? 'fill-amber-400' : ''}`} />
          {featured ? 'Featured' : 'Feature'}
        </>
      )}
    </Button>
  );
}