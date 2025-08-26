"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar, 
  Clock, 
  Users, 
  Eye,
  Heart,
  Share2,
  Play,
  CheckCircle,
  Lightbulb,
  Target,
  TrendingUp,
  Quote,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { getProjectBySlug, getProjects2 } from '@/actions/project';

const ProjectDetailPage = () => {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch project data
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!params.slug) {
          setError("Project not found");
          return;
        }

        // Fetch the main project
        const projectData = await getProjectBySlug(params.slug);
        
        if (!projectData) {
          setError("Project not found");
          return;
        }

        setProject(projectData);

        // Fetch related projects (same category, excluding current)
        const allProjects = await getProjects2({
          category: projectData.category,
          limit: 6
        });
        
        const related = allProjects
          .filter(p => p.id !== projectData.id)
          .slice(0, 3);
        
        setRelatedProjects(related);
        
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to load project");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [params.slug]);

  const handleShare = async () => {
    if (!project) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.shortDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        // You could show a toast notification here
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
        {/* Navigation Skeleton */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Skeleton className="h-10 w-32" />
            <div className="flex gap-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </nav>

        {/* Content Skeleton */}
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center space-y-6 mb-16">
              <div className="flex justify-center gap-2 mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-16 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-2/3 mx-auto" />
              <div className="flex justify-center gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-slate-400 mb-8">{error || "The project you're looking for doesn't exist."}</p>
          <Link href="/#projects">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <ArrowLeft size={16} className="mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/#projects">
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              <ArrowLeft size={16} className="mr-2" />
              Back to Projects
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`${isLiked ? 'text-red-400' : 'text-slate-400'} hover:text-red-300`}
            >
              <Heart size={16} className={`mr-1 ${isLiked ? 'fill-current' : ''}`} />
              {project.likes || 0}
            </Button>
            
            <Button variant="ghost" size="sm" onClick={handleShare} className="text-slate-400 hover:text-white">
              <Share2 size={16} className="mr-1" />
              Share
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20 -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-16"
          >
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-blue-600/10 border-blue-600/20 text-blue-400">
                {project.category}
              </Badge>
              {project.featured && (
                <Badge className="bg-purple-600/10 border-purple-600/20 text-purple-400">
                  Featured
                </Badge>
              )}
              <Badge variant="outline" className="border-slate-700 text-slate-300">
                {project.status || 'COMPLETED'}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-200">
              {project.title}
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {project.longDescription || project.shortDescription}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {project.liveUrl && (
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    View Live Project
                  </a>
                </Button>
              )}
              
              {project.githubUrl && project.showGithub !== false && (
                <Button asChild variant="outline" className="border-slate-700 bg-slate-800/50 hover:bg-slate-700">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={16} className="mr-2" />
                    View Code
                  </a>
                </Button>
              )}
              
              {project.demoUrl && (
                <Button asChild variant="outline" className="border-slate-700 bg-slate-800/50 hover:bg-slate-700">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Play size={16} className="mr-2" />
                    Watch Demo
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Project Images Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <Image
                src={project.images && project.images.length > 0 ? project.images[currentImageIndex] : project.image}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                fill
                className="object-cover"
              />
              
              {project.images && project.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentImageIndex === index 
                          ? 'bg-white' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="process">Process</TabsTrigger>
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-8">
                  <Card className="bg-slate-900/60 border-slate-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <Target className="mr-2 text-blue-400" size={20} />
                        Project Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {project.problem && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Problem Statement</h4>
                          <p className="text-slate-300 leading-relaxed">{project.problem}</p>
                        </div>
                      )}
                      
                      {project.solution && (
                        <>
                          <Separator className="bg-slate-700" />
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Solution Approach</h4>
                            <p className="text-slate-300 leading-relaxed">{project.solution}</p>
                          </div>
                        </>
                      )}
                      
                      {project.features && project.features.length > 0 && (
                        <>
                          <Separator className="bg-slate-700" />
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {project.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                                  <span className="text-slate-300">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="process" className="mt-8">
                  <Card className="bg-slate-900/60 border-slate-800 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <Lightbulb className="mr-2 text-purple-400" size={20} />
                        Development Process
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {project.content && (
                          <div className="prose prose-invert max-w-none">
                            <div dangerouslySetInnerHTML={{ 
                              __html: project.content.replace(/\n/g, '<br/>').replace(/### /g, '<h3>').replace(/## /g, '<h2>') 
                            }} />
                          </div>
                        )}
                        
                        {project.technologies && project.technologies.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, index) => (
                                <Badge key={index} variant="secondary" className="bg-slate-800 border-slate-700 text-slate-300">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Show tags if technologies not available */}
                        {(!project.technologies || project.technologies.length === 0) && project.tags && project.tags.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="bg-slate-800 border-slate-700 text-slate-300">
                                  {tag.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="challenges" className="mt-8">
                  <Card className="bg-slate-900/60 border-slate-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <Target className="mr-2 text-red-400" size={20} />
                        Challenges & Learnings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {project.challenges && project.challenges.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Technical Challenges</h4>
                          <ul className="space-y-2">
                            {project.challenges.map((challenge, index) => (
                              <li key={index} className="flex items-start gap-2 text-slate-300">
                                <span className="text-red-400 mt-1">•</span>
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {project.learnings && project.learnings.length > 0 && (
                        <>
                          <Separator className="bg-slate-700" />
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Key Learnings</h4>
                            <ul className="space-y-2">
                              {project.learnings.map((learning, index) => (
                                <li key={index} className="flex items-start gap-2 text-slate-300">
                                  <span className="text-green-400 mt-1">•</span>
                                  {learning}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}

                      {(!project.challenges || project.challenges.length === 0) && (!project.learnings || project.learnings.length === 0) && (
                        <p className="text-slate-400 italic">
                          Detailed challenges and learnings information will be added soon.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="results" className="mt-8">
                  <Card className="bg-slate-900/60 border-slate-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <TrendingUp className="mr-2 text-green-400" size={20} />
                        Project Results & Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {project.results && (
                          <p className="text-slate-300 leading-relaxed">{project.results}</p>
                        )}
                        
                        {project.testimonials && project.testimonials.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Client Testimonial</h4>
                            {project.testimonials.map((testimonial, index) => (
                              <Card key={index} className="bg-slate-800/60 border-slate-700">
                                <CardContent className="p-6">
                                  <div className="flex items-start gap-4">
                                    <Quote className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                                    <div className="flex-1">
                                      <p className="text-slate-300 mb-4 italic leading-relaxed">
                                        "{testimonial.content}"
                                      </p>
                                      <div className="flex items-center gap-3">
                                        {testimonial.image && (
                                          <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <Image
                                              src={testimonial.image}
                                              alt={testimonial.name}
                                              width={40}
                                              height={40}
                                              className="object-cover"
                                            />
                                          </div>
                                        )}
                                        <div>
                                          <p className="font-semibold text-white">{testimonial.name}</p>
                                          <p className="text-sm text-slate-400">
                                            {testimonial.role} at {testimonial.company}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}

                        {!project.results && (!project.testimonials || project.testimonials.length === 0) && (
                          <p className="text-slate-400 italic">
                            Project results and impact details will be added soon.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card className="bg-slate-900/60 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Project Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.duration && (
                    <div className="flex items-center gap-3">
                      <Calendar className="text-blue-400" size={16} />
                      <div>
                        <p className="text-sm text-slate-400">Duration</p>
                        <p className="text-white font-medium">{project.duration}</p>
                      </div>
                    </div>
                  )}
                  
                  {project.teamSize && (
                    <div className="flex items-center gap-3">
                      <Users className="text-purple-400" size={16} />
                      <div>
                        <p className="text-sm text-slate-400">Team Size</p>
                        <p className="text-white font-medium">{project.teamSize} people</p>
                      </div>
                    </div>
                  )}
                  
                  {project.role && (
                    <div className="flex items-center gap-3">
                      <Clock className="text-green-400" size={16} />
                      <div>
                        <p className="text-sm text-slate-400">My Role</p>
                        <p className="text-white font-medium">{project.role}</p>
                      </div>
                    </div>
                  )}
                  
                  {project.client && (
                    <div className="flex items-center gap-3">
                      <Users className="text-orange-400" size={16} />
                      <div>
                        <p className="text-sm text-slate-400">Client</p>
                        <p className="text-white font-medium">{project.client}</p>
                      </div>
                    </div>
                  )}
                  
                  {project.views && (
                    <div className="flex items-center gap-3">
                      <Eye className="text-cyan-400" size={16} />
                      <div>
                        <p className="text-sm text-slate-400">Views</p>
                        <p className="text-white font-medium">{project.views.toLocaleString()}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Calendar className="text-blue-400" size={16} />
                    <div>
                      <p className="text-sm text-slate-400">Completed</p>
                      <p className="text-white font-medium">{formatDate(project.date || project.endDate)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card className="bg-slate-900/60 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  {project.technologies && project.technologies.length > 0 ? (
                    <div className="space-y-2">
                      {project.technologies.map((tech, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                          <span className="text-slate-300">{tech}</span>
                        </div>
                      ))}
                    </div>
                  ) : project.tags && project.tags.length > 0 ? (
                    <div className="space-y-2">
                      {project.tags.map((tag, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                          <span className="text-slate-300">{tag.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400">No technologies listed</p>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-slate-900/60 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.liveUrl && (
                    <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        Visit Live Site
                      </a>
                    </Button>
                  )}
                  
                  {project.githubUrl && project.showGithub !== false && (
                    <Button asChild variant="outline" className="w-full border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-white">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        View Source Code
                      </a>
                    </Button>
                  )}
                  
                  {project.demoUrl && (
                    <Button asChild variant="outline" className="w-full border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-white">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Play size={16} className="mr-2" />
                        Watch Demo Video
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Related Projects
              </h2>
              <p className="text-slate-400">
                Explore other projects in my portfolio
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/projects/${relatedProject.slug}`}>
                    <Card className="bg-slate-900/60 border-slate-800 overflow-hidden group cursor-pointer h-full">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {relatedProject.title}
                        </h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                          {relatedProject.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {relatedProject.technologies && relatedProject.technologies.slice(0, 3).map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="bg-slate-800 text-slate-300 text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {relatedProject.tags && relatedProject.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="bg-slate-800 text-slate-300 text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 -z-10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Interested in working together?
            </h2>
            <p className="text-xl text-slate-300">
              Let's discuss how I can help bring your ideas to life with modern web technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-6 text-lg">
                  Get In Touch
                </Button>
              </Link>
              <Link href="/#projects">
                <Button variant="outline" className="border-slate-700 bg-slate-800/50 hover:bg-slate-700 px-8 py-6 text-lg">
                  View All Projects
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;