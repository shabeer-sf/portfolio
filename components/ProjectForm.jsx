'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { createProject, updateProject } from '@/actions/admin/project';

// Form validation schema
const projectSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }).max(100),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  link: z.string().url({ message: 'Please enter a valid URL' }),
  image: z.string().url({ message: 'Please enter a valid image URL' }),
  githubUrl: z.string().url({ message: 'Please enter a valid GitHub URL' }).optional().or(z.literal('')),
  liveUrl: z.string().url({ message: 'Please enter a valid live URL' }).optional().or(z.literal('')),
  technologies: z.array(z.string()).min(1, { message: 'Please add at least one technology' }),
  category: z.enum(['WEB', 'MOBILE', 'BACKEND', 'OTHER']),
  featured: z.boolean().default(false),
  date: z.date(),
  order: z.number().int().min(0).default(0),
});

export default function ProjectForm({ project }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [technologies, setTechnologies] = useState(project?.technologies || []);
  const [techInput, setTechInput] = useState('');

  // Initialize form with project data or defaults
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      link: project?.link || '',
      image: project?.image || '',
      githubUrl: project?.githubUrl || '',
      liveUrl: project?.liveUrl || '',
      technologies: project?.technologies || [],
      category: project?.category || 'WEB',
      featured: project?.featured || false,
      date: project?.date ? new Date(project.date) : new Date(),
      order: project?.order || 0,
    },
  });

  // Update technologies field when technologies state changes
  useEffect(() => {
    form.setValue('technologies', technologies);
  }, [technologies, form]);

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      if (project) {
        // Update existing project
        await updateProject(project.id, data);
        toast.success('Project updated successfully');
      } else {
        // Create new project
        await createProject(data);
        toast.success('Project created successfully');
        form.reset();
        setTechnologies([]);
      }
      
      // Redirect to projects list
      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding technology
  const handleAddTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  // Handle keypress for adding technology
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  // Handle removing technology
  const handleRemoveTechnology = (tech) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <Card className="lg:col-span-2 bg-[#1c1c1c] border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-xl">Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="My Awesome Project"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A brief description of your project..."
                        className="bg-slate-800/50 border-slate-700 min-h-32 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          <SelectItem value="WEB" className="text-blue-400">Web</SelectItem>
                          <SelectItem value="MOBILE" className="text-purple-400">Mobile</SelectItem>
                          <SelectItem value="BACKEND" className="text-green-400">Backend</SelectItem>
                          <SelectItem value="OTHER" className="text-amber-400">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-slate-300">Completion Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal bg-slate-800/50 border-slate-700 text-white",
                                !field.value && "text-slate-500"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="bg-slate-800 text-white"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormLabel className="text-slate-300">Technologies</FormLabel>
                <div className="flex flex-wrap gap-2 mb-3">
                  {technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-slate-800 text-slate-300 flex items-center gap-1"
                    >
                      {tech}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveTechnology(tech)}
                      >
                        <X size={12} />
                        <span className="sr-only">Remove {tech}</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add technology (e.g. React, Node.js)"
                    className="bg-slate-800/50 border-slate-700 text-white"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddTechnology}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    Add
                  </Button>
                </div>
                {form.formState.errors.technologies && (
                  <p className="text-sm font-medium text-red-400">
                    {form.formState.errors.technologies.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Details & Settings */}
          <div className="space-y-6">
            <Card className="bg-[#1c1c1c] border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-xl">Project Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          className="bg-slate-800/50 border-slate-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-slate-500 text-xs">
                        URL to the project screenshot or image
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Project URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://myproject.com"
                          className="bg-slate-800/50 border-slate-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-slate-500 text-xs">
                        Main link for the project
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">GitHub URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/yourusername/project"
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
                  name="liveUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Live Demo URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://demo.myproject.com"
                          className="bg-slate-800/50 border-slate-700 text-white"
                          {...field}
                        />
                      </FormControl>
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
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-slate-800 p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-slate-300">Featured Project</FormLabel>
                        <FormDescription className="text-slate-500 text-xs">
                          Featured projects appear at the top of your portfolio
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-amber-500 data-[state=checked]:text-white"
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
                      <FormLabel className="text-slate-300">Display Order</FormLabel>
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
                        Projects with lower numbers appear first
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
            onClick={() => router.push('/admin/projects')}
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}