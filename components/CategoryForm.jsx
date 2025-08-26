'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Palette, Hash, Type, AlignLeft, ToggleLeft, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { createCategory, updateCategory } from '@/actions/admin/category';

// Form validation schema
const categorySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50),
  slug: z.string().optional(),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, { message: 'Please enter a valid hex color (e.g., #FF5733)' }).optional().or(z.literal('')),
  icon: z.string().optional(),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

// Predefined color options
const colorOptions = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Yellow', value: '#F59E0B' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Gray', value: '#6B7280' },
];

export default function CategoryForm({ category }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with category data or defaults
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || '',
      slug: category?.slug || '',
      description: category?.description || '',
      color: category?.color || '#3B82F6',
      icon: category?.icon || '',
      order: category?.order || 0,
      isActive: category?.isActive !== undefined ? category.isActive : true,
    },
  });

  // Auto-generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Watch name field to auto-generate slug
  const watchedName = form.watch('name');
  React.useEffect(() => {
    if (watchedName && !category) { // Only auto-generate for new categories
      const slug = generateSlug(watchedName);
      form.setValue('slug', slug);
    }
  }, [watchedName, form, category]);

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      if (category) {
        // Update existing category
        await updateCategory(category.id, data);
        toast.success('Category updated successfully');
      } else {
        // Create new category
        await createCategory(data);
        toast.success('Category created successfully');
        form.reset();
      }
      
      // Redirect to categories list
      router.push('/admin/categories');
      router.refresh();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <Card className="lg:col-span-2 bg-[#1c1c1c] border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <Palette className="mr-2" size={20} />
                Category Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300 flex items-center">
                      <Type className="mr-2" size={16} />
                      Category Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Web Development"
                        className="bg-slate-800/50 border-slate-700 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300 flex items-center">
                      <Hash className="mr-2" size={16} />
                      URL Slug
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="web-development"
                        className="bg-slate-800/50 border-slate-700 text-white font-mono"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-slate-500 text-xs">
                      Used in URLs. Will be auto-generated from name if left empty.
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300 flex items-center">
                      <AlignLeft className="mr-2" size={16} />
                      Description (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of this category..."
                        className="bg-slate-800/50 border-slate-700 min-h-24 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Settings & Appearance */}
          <div className="space-y-6">
            <Card className="bg-[#1c1c1c] border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-xl">Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Brand Color</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          <Input
                            placeholder="#3B82F6"
                            className="bg-slate-800/50 border-slate-700 text-white font-mono"
                            {...field}
                          />
                          <div className="grid grid-cols-5 gap-2">
                            {colorOptions.map((color) => (
                              <button
                                key={color.value}
                                type="button"
                                onClick={() => field.onChange(color.value)}
                                className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                                  field.value === color.value 
                                    ? 'border-white scale-110' 
                                    : 'border-slate-600 hover:border-slate-400'
                                }`}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                              />
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="text-slate-500 text-xs">
                        Color used for category badges and UI elements
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Icon (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Globe, Smartphone, Server..."
                          className="bg-slate-800/50 border-slate-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-slate-500 text-xs">
                        Lucide React icon name (e.g., Globe, Smartphone)
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="bg-[#1c1c1c] border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-xl">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-slate-800 p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-slate-300 flex items-center">
                          <ToggleLeft className="mr-2" size={16} />
                          Active Category
                        </FormLabel>
                        <FormDescription className="text-slate-500 text-xs">
                          Active categories appear in the public portfolio
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 flex items-center">
                        <ArrowUpDown className="mr-2" size={16} />
                        Display Order
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          className="bg-slate-800/50 border-slate-700 text-white"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription className="text-slate-500 text-xs">
                        Categories with lower numbers appear first
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <CardFooter className="bg-[#1c1c1c] border border-slate-800 rounded-lg px-6 py-4 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/categories')}
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}