"use client";
import { getProjects2 } from "@/actions/project";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Eye, Code, Calendar, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const Projects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  
  // Initial projects to display
  const initialDisplayCount = 6;

  // Define category mapping for filtering
  const categoryMapping = {
    "web": "WEB",
    "mobile": "MOBILE",
    "backend": "BACKEND",
    "other": "OTHER"
  };
  
  // Category color mapping
  const categoryColors = {
    "WEB": {
      bg: "bg-blue-600/10",
      border: "border-blue-600/20",
      text: "text-blue-400"
    },
    "MOBILE": {
      bg: "bg-purple-600/10",
      border: "border-purple-600/20", 
      text: "text-purple-400"
    },
    "BACKEND": {
      bg: "bg-emerald-600/10",
      border: "border-emerald-600/20",
      text: "text-emerald-400"
    },
    "OTHER": {
      bg: "bg-amber-600/10", 
      border: "border-amber-600/20",
      text: "text-amber-400"
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        // Fetch all projects
        const fetchedProjects = await getProjects2();
        setAllProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter and limit projects when filter changes or all projects loaded
  useEffect(() => {
    if (allProjects.length === 0) return;
    
    let filtered = [];
    
    // Apply category filter
    if (filter === "all") {
      filtered = [...allProjects];
    } else {
      filtered = allProjects.filter(
        project => project.category === categoryMapping[filter]
      );
    }
    
    // Limit projects if not showing all
    if (!showAll) {
      setDisplayedProjects(filtered.slice(0, initialDisplayCount));
    } else {
      setDisplayedProjects(filtered);
    }
    
    // Reset showAll when filter changes
    if (!showAll) {
      setShowAll(false);
    }
  }, [filter, allProjects, showAll]);

  // Handle "View All" button click
  const handleViewAll = () => {
    setShowAll(true);
  };

  // Filter categories based on your project types
  const categories = ["all", "web", "mobile", "backend", "other"];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.5,
      },
    },
  };

  // Calculate if there are more projects to show
  const hasMoreProjects = filter === "all" 
    ? allProjects.length > displayedProjects.length
    : allProjects.filter(p => p.category === categoryMapping[filter]).length > displayedProjects.length;

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-900 to-transparent -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute right-1/4 top-1/3 w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
      <div className="absolute left-1/3 bottom-1/4 w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-300" />
      <div className="absolute right-1/3 bottom-1/3 w-1 h-1 bg-emerald-500 rounded-full animate-pulse delay-500" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <Badge 
            variant="outline" 
            className="px-5 py-1.5 text-sm font-medium rounded-full bg-slate-900/50 backdrop-blur-sm border-slate-700 text-slate-300"
          >
            Portfolio
          </Badge>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-200">
            My Projects
          </h2>
          
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            A collection of applications, websites, and development projects showcasing my skills and experience
          </p>
          
          {/* Enhanced filter buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 flex flex-wrap justify-center gap-3 pt-6"
          >
            <div className="bg-slate-900/70 backdrop-blur-md p-1.5 rounded-full border border-slate-800 shadow-xl flex flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => {
                    setFilter(category);
                    setShowAll(false);
                  }}
                  className={`capitalize px-5 py-2 rounded-full transition-all duration-300 ${
                    filter === category 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md" 
                      : "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {filter === category && <Filter size={14} className="mr-1.5" />}
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {isLoading ? (
            // Enhanced loading skeletons
            Array(6)
              .fill(null)
              .map((_, index) => (
                <Card key={index} className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden rounded-xl shadow-xl">
                  <CardContent className="p-0">
                    <Skeleton className="w-full h-56 rounded-t-xl" />
                    <div className="p-6">
                      <Skeleton className="w-3/4 h-7 mb-3 rounded-lg" />
                      <Skeleton className="w-full h-4 mb-1.5 rounded-md" />
                      <Skeleton className="w-5/6 h-4 mb-5 rounded-md" />
                      <div className="flex gap-2 flex-wrap mb-4">
                        <Skeleton className="w-20 h-7 rounded-full" />
                        <Skeleton className="w-24 h-7 rounded-full" />
                        <Skeleton className="w-16 h-7 rounded-full" />
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-4 border-t border-slate-800/50">
                    <div className="flex justify-between items-center">
                      <Skeleton className="w-20 h-5 rounded-md" />
                      <Skeleton className="w-28 h-5 rounded-md" />
                    </div>
                  </div>
                </Card>
              ))
          ) : displayedProjects.length > 0 ? (
            // Display projects with enhanced styling and fixed footer
            displayedProjects.map((project) => (
              <motion.div 
                key={project.id} 
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="h-full" // Important for maintaining equal heights
              >
                <Card className="h-full flex flex-col overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/30 rounded-xl shadow-xl group">
                  <CardContent className="p-0 flex-grow">
                    {/* Project Image with enhanced overlay */}
                    <div className="relative w-full h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10" />
                      
                      {/* Category badge */}
                      {project.category && (
                        <div className="absolute top-4 left-4 z-20">
                          <Badge 
                            className={`${categoryColors[project.category]?.bg || 'bg-slate-700/60'} 
                                      ${categoryColors[project.category]?.text || 'text-slate-300'}
                                      ${categoryColors[project.category]?.border || 'border-slate-600/30'} 
                                      backdrop-blur-sm border px-2.5 py-1 font-medium rounded-md`}
                          >
                            {project.category}
                          </Badge>
                        </div>
                      )}
                      
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Project links overlay */}
                      {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all duration-300 z-10">
                        <Button 
                          size="sm" 
                          asChild 
                          className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-none rounded-lg shadow-lg"
                        >
                          <Link href={project.liveUrl || project.link} target="_blank">
                            <Eye size={16} className="mr-2" /> Live Demo
                          </Link>
                        </Button>
                        
                        {project.githubUrl && (
                          <Button 
                            size="sm" 
                            asChild 
                            variant="outline"
                            className="border-white/20 bg-slate-900/50 backdrop-blur-md text-white hover:bg-slate-800/80 rounded-lg"
                          >
                            <Link href={project.githubUrl} target="_blank">
                              <Github size={16} className="mr-2" /> Code
                            </Link>
                          </Button>
                        )}
                      </div> */}
                    </div>
                    
                    {/* Content with enhanced styling */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-slate-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Technologies with enhanced styling */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies && project.technologies.length > 0 ? (
                          project.technologies.map((tech, techIndex) => (
                            <Badge 
                              key={techIndex} 
                              variant="secondary" 
                              className="bg-slate-800/70 hover:bg-slate-700/70 text-slate-300 px-2.5 py-1 backdrop-blur-sm border border-slate-700/30 transition-colors duration-200"
                            >
                              {tech}
                            </Badge>
                          ))
                        ) : (
                          // Default badges if tech stack is not available
                          <>
                            <Badge variant="secondary" className="bg-slate-800/70 text-slate-300 px-2.5 py-1 backdrop-blur-sm border border-slate-700/30">React</Badge>
                            <Badge variant="secondary" className="bg-slate-800/70 text-slate-300 px-2.5 py-1 backdrop-blur-sm border border-slate-700/30">Next.js</Badge>
                            <Badge variant="secondary" className="bg-slate-800/70 text-slate-300 px-2.5 py-1 backdrop-blur-sm border border-slate-700/30">Tailwind</Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  
                  {/* Footer with enhanced styling - now fixed at bottom */}
                  <CardFooter className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/30 flex justify-between p-4 mt-auto">
                    <span className="text-xs text-slate-400 flex items-center">
                      <Calendar size={12} className="mr-1.5 text-blue-400" />
                      {project.date ? format(new Date(project.date), "MMM yyyy") : "2024"}
                    </span>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild 
                      className="text-slate-300 hover:text-white hover:bg-slate-800/50 p-0 group"
                    >
                      <Link href={project.link} target="_blank" className="flex items-center">
                        View Details 
                        <ExternalLink size={14} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            // No projects found with enhanced styling
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 px-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl">
              <Code size={40} className="mx-auto mb-4 text-slate-500" />
              <p className="text-slate-300 mb-4">No projects found for this category</p>
              <Button 
                variant="outline" 
                className="mt-2 border-slate-700 bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700"
                onClick={() => setFilter("all")}
              >
                Show All Categories
              </Button>
            </div>
          )}
        </motion.div>
        
        {/* View all projects button with enhanced styling */}
        {!isLoading && hasMoreProjects && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-16"
          >
            <Button 
              onClick={handleViewAll}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg px-8 py-6 rounded-lg"
            >
              View All Projects <ExternalLink size={16} className="ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;