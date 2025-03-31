'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X, Plus } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { createExperience, updateExperience } from '@/actions/admin/experience';

// Form validation schema
const experienceSchema = z.object({
  company: z.string().min(2, { message: 'Company name must be at least 2 characters' }).max(100),
  location: z.string().min(2, { message: 'Location must be at least 2 characters' }).max(100),
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }).max(100),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  startDate: z.date(),
  endDate: z.date().nullable().optional(),
  isCurrent: z.boolean().default(false),
  roles: z.array(z.string()).min(1, { message: 'Please add at least one responsibility' }),
  skills: z.array(z.string()).min(1, { message: 'Please add at least one skill' }),
  order: z.number().int().min(0).default(0),
});

export default function ExperienceForm({ experience }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState(experience?.roles || []);
  const [roleInput, setRoleInput] = useState('');
  const [skills, setSkills] = useState(experience?.skills || []);
  const [skillInput, setSkillInput] = useState('');

  // Initialize form with experience data or defaults
  const form = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: experience?.company || '',
      location: experience?.location || '',
      title: experience?.title || '',
      description: experience?.description || '',
      startDate: experience?.startDate ? new Date(experience.startDate) : new Date(),
      endDate: experience?.endDate ? new Date(experience.endDate) : null,
      isCurrent: experience?.isCurrent || false,
      roles: experience?.roles || [],
      skills: experience?.skills || [],
      order: experience?.order || 0,
    },
  });

  // Watch isCurrent field to enable/disable end date and update endDate field
  const watchIsCurrent = form.watch('isCurrent');
  
  // Update endDate when isCurrent changes
  useEffect(() => {
    if (watchIsCurrent) {
      form.setValue('endDate', null);
    }
  }, [watchIsCurrent, form]);

  // Update roles and skills fields when their state changes
  useEffect(() => {
    form.setValue('roles', roles);
    form.setValue('skills', skills);
  }, [roles, skills, form]);

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // Make sure endDate is null if isCurrent is true
      if (data.isCurrent) {
        data.endDate = null;
      }
      
      if (experience) {
        // Update existing experience
        await updateExperience(experience.id, data);
        toast.success('Experience updated successfully');
      } else {
        // Create new experience
        await createExperience(data);
        toast.success('Experience created successfully');
        form.reset();
        setRoles([]);
        setSkills([]);
      }
      
      // Redirect to experiences list
      router.push('/admin/experience');
      router.refresh();
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('Failed to save experience: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding role
  const handleAddRole = () => {
    if (roleInput.trim() && !roles.includes(roleInput.trim())) {
      setRoles([...roles, roleInput.trim()]);
      setRoleInput('');
    }
  };

  // Handle keypress for adding role
  const handleRoleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddRole();
    }
  };

  // Handle removing role
  const handleRemoveRole = (role) => {
    setRoles(roles.filter((r) => r !== role));
  };

  // Handle adding skill
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  // Handle keypress for adding skill
  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Handle removing skill
  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Information */}
          <Card className="bg-[#1c1c1c] border-slate-800">
            <CardContent className="pt-6 space-y-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Company</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Company name"
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City, Country"
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your position"
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

          {/* Date and Status */}
          <Card className="bg-[#1c1c1c] border-slate-800">
            <CardContent className="pt-6 space-y-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-slate-300">Start Date</FormLabel>
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
                              format(field.value, "MMMM yyyy")
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
                          captionLayout="dropdown-buttons" 
                          fromYear={1990} 
                          toYear={2025}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isCurrent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-slate-800 p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-slate-300">Current Position</FormLabel>
                      <FormDescription className="text-slate-500 text-xs">
                        Toggle if this is your current job
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          // Clear end date if current position is checked
                          if (checked) {
                            form.setValue('endDate', null);
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-slate-300">
                      End Date {watchIsCurrent && <span className="text-slate-500 text-xs">(Not required for current position)</span>}
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal bg-slate-800/50 border-slate-700",
                              watchIsCurrent ? "opacity-50 text-slate-500" : "text-white",
                              !field.value && "text-slate-500"
                            )}
                            disabled={watchIsCurrent}
                          >
                            {field.value ? (
                              format(field.value, "MMMM yyyy")
                            ) : (
                              <span>{watchIsCurrent ? "Present" : "Pick a date"}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || null}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || 
                            date < new Date("1900-01-01") ||
                            watchIsCurrent
                          }
                          initialFocus
                          className="bg-slate-800 text-white"
                          captionLayout="dropdown-buttons" 
                          fromYear={1990} 
                          toYear={2025}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-400" />
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
                      Experiences with lower numbers appear first
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card className="bg-[#1c1c1c] border-slate-800">
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your role and responsibilities"
                      className="bg-slate-800/50 border-slate-700 min-h-32 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Key Responsibilities */}
        <Card className="bg-[#1c1c1c] border-slate-800">
          <CardContent className="pt-6 space-y-4">
            <div>
              <FormLabel className="text-slate-300">Key Responsibilities</FormLabel>
              <div className="flex flex-wrap gap-2 my-3">
                {roles.length > 0 ? (
                  roles.map((role, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-slate-800 text-slate-300 flex items-center gap-1"
                    >
                      {role}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveRole(role)}
                      >
                        <X size={12} />
                        <span className="sr-only">Remove {role}</span>
                      </Button>
                    </Badge>
                  ))
                ) : (
                  <div className="text-sm text-slate-500">No responsibilities added yet</div>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a responsibility"
                  className="bg-slate-800/50 border-slate-700 text-white"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  onKeyDown={handleRoleKeyPress}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddRole}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <Plus size={16} className="mr-1" /> Add
                </Button>
              </div>
              {form.formState.errors.roles && (
                <p className="text-sm font-medium text-red-400 mt-2">
                  {form.formState.errors.roles.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="bg-[#1c1c1c] border-slate-800">
          <CardContent className="pt-6 space-y-4">
            <div>
              <FormLabel className="text-slate-300">Skills Used/Gained</FormLabel>
              <div className="flex flex-wrap gap-2 my-3">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-slate-800 text-slate-300 flex items-center gap-1"
                    >
                      {skill}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        <X size={12} />
                        <span className="sr-only">Remove {skill}</span>
                      </Button>
                    </Badge>
                  ))
                ) : (
                  <div className="text-sm text-slate-500">No skills added yet</div>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g. React, Project Management)"
                  className="bg-slate-800/50 border-slate-700 text-white"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyPress}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddSkill}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <Plus size={16} className="mr-1" /> Add
                </Button>
              </div>
              {form.formState.errors.skills && (
                <p className="text-sm font-medium text-red-400 mt-2">
                  {form.formState.errors.skills.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <CardFooter className="bg-[#1c1c1c] border border-slate-800 rounded-lg px-6 py-4 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/experience')}
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? 'Saving...' : experience ? 'Update Experience' : 'Create Experience'}
          </Button>
        </CardFooter>
      </form>
    </Form>
  )};