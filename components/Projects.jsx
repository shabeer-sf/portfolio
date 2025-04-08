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
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initial projects to display
  const initialDisplayCount = 6;

  // Define category mapping for filtering
  const categoryMapping = {
    "all": null, // Special case for all categories
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

  // Check for direct link to section with a category hash
  useEffect(() => {
    // Check if URL has a hash that corresponds to a category
    const hash = window.location.hash;
    if (hash && hash.startsWith('#projects-')) {
      const urlCategory = hash.replace('#projects-', '');
      if (Object.keys(categoryMapping).includes(urlCategory)) {
        setFilter(urlCategory);
      }
    }
  }, []);

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        // Fetch all projects
        const fetchedProjects = await getProjects2();
        
        if (Array.isArray(fetchedProjects) && fetchedProjects.length > 0) {
          setAllProjects(fetchedProjects);
          setIsInitialized(true);
        } else {
          console.warn("No projects returned or invalid data format", fetchedProjects);
          setAllProjects([]);
          setIsInitialized(true);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setAllProjects([]);
        setIsInitialized(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Apply filtering when relevant state changes
  useEffect(() => {
    if (!isInitialized || allProjects.length === 0) return;
    
    const applyFiltering = () => {
      let filtered = [];
      
      // Apply category filter
      if (filter === "all") {
        filtered = [...allProjects];
      } else {
        const categoryValue = categoryMapping[filter];
        if (categoryValue) {
          filtered = allProjects.filter(project => project.category === categoryValue);
        } else {
          filtered = [...allProjects]; // Fallback to all if category not found
        }
      }
      
      // Handle empty results
      if (filtered.length === 0) {
        setDisplayedProjects([]);
        return;
      }
      
      // Limit projects if not showing all
      if (!showAll) {
        setDisplayedProjects(filtered.slice(0, initialDisplayCount));
      } else {
        setDisplayedProjects(filtered);
      }
    };
    
    applyFiltering();
  }, [filter, allProjects, showAll, isInitialized]);

  // Handle "View All" button click
  const handleViewAll = () => {
    setShowAll(true);
  };

  // Handle filter change
  const handleFilterChange = (category) => {
    // Don't re-set the same filter
    if (category === filter) return;
    
    setFilter(category);
    setShowAll(false);
  };

  // Filter categories based on your project types
  const categories = ["all", "web", "mobile", "backend", "other"];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
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

  // Fallback image for projects
  const fallbackImage = "https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Project+Image";

  return (
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-900 to-transparent -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute right-1/4 top-1/3 w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
      <div className="absolute left-1/3 bottom-1/4 w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-300" />
      <div className="absolute right-1/3 bottom-1/3 w-1 h-1 bg-emerald-500 rounded-full animate-pulse delay-500" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-12 sm:mb-16"
        >
          <Badge 
            variant="outline" 
            className="px-4 sm:px-5 py-1 sm:py-1.5 text-sm font-medium rounded-full bg-slate-900/50 backdrop-blur-sm border-slate-700 text-slate-300"
          >
            Portfolio
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-200">
            My Projects
          </h2>
          
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            A collection of applications, websites, and development projects showcasing my skills and experience
          </p>
          
          {/* Enhanced filter buttons - Better responsiveness */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 flex justify-center pt-6"
          >
            <div className="bg-slate-900/70 backdrop-blur-md p-1.5 rounded-full border border-slate-800 shadow-xl flex flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`capitalize px-3 sm:px-5 py-1.5 sm:py-2 m-0.5 text-sm rounded-full transition-all duration-300 ${
                    filter === category 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md" 
                      : "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {filter === category && <Filter size={14} className="mr-1.5 hidden sm:inline" />}
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {isLoading ? (
          // Enhanced loading skeletons with better grid
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array(6)
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
              ))}
          </motion.div>
        ) : (
          <>
            {displayedProjects.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {/* Display projects with enhanced styling and fixed footer */}
                {displayedProjects.map((project) => (
                  <motion.div 
                    key={project.id || `project-${Math.random()}`} 
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
                            src={project.image || fallbackImage}
                            alt={project.title || "Project"}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              // Fallback if image fails to load
                              e.target.src = fallbackImage;
                            }}
                          />
                          
                          {/* Project links overlay */}
                          {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all duration-300 z-10">
                            <Button 
                              size="sm" 
                              asChild 
                              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-none rounded-lg shadow-lg"
                            >
                              <Link href={project.liveUrl || project.link || "#"} target="_blank">
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
                            {project.title || "Untitled Project"}
                          </h3>
                          
                          <p className="text-slate-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                            {project.description || "No description available"}
                          </p>
                          
                          {/* Technologies with enhanced styling */}
                          <div className="flex flex-wrap gap-2">
                            {project.technologies && project.technologies.length > 0 ? (
                              project.technologies.map((tech, techIndex) => (
                                <Badge 
                                  key={`${project.id}-tech-${techIndex}`} 
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
                          {project.date ? 
                            format(new Date(project.date), "MMM yyyy") : 
                            "2024"}
                        </span>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          asChild 
                          className="text-slate-300 hover:text-white hover:bg-slate-800/50 p-0 group"
                        >
                          <Link 
                            href={project.link || "#"} 
                            target="_blank" 
                            className="flex items-center"
                          >
                            View Details 
                            <ExternalLink size={14} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // No projects found with enhanced styling
              <div className="text-center py-16 sm:py-20 px-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl">
                <Code size={40} className="mx-auto mb-4 text-slate-500" />
                <p className="text-slate-300 mb-4">No projects found for this category</p>
                <Button 
                  variant="outline" 
                  className="mt-2 border-slate-700 bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700"
                  onClick={() => handleFilterChange("all")}
                >
                  Show All Categories
                </Button>
              </div>
            )}

            {/* View all projects button with enhanced styling */}
            {!isLoading && hasMoreProjects && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center mt-12 sm:mt-16"
              >
                <Button 
                  onClick={handleViewAll}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg px-6 sm:px-8 py-5 sm:py-6 rounded-lg"
                >
                  View All Projects <ExternalLink size={16} className="ml-2" />
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;