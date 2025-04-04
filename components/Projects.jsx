"use client";
import { getProjects2 } from "@/actions/project";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Eye } from "lucide-react";
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Calculate if there are more projects to show
  const hasMoreProjects = filter === "all" 
    ? allProjects.length > displayedProjects.length
    : allProjects.filter(p => p.category === categoryMapping[filter]).length > displayedProjects.length;

  return (
    <section id="projects" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute top-40 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <Badge variant="outline" className="px-4 py-1 text-sm font-normal border-slate-700 text-slate-400">
            Portfolio
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            My Projects
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto">
            A collection of applications, websites, and development projects showcasing my skills and experience
          </p>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setFilter(category);
                  setShowAll(false);
                }}
                className={`capitalize ${
                  filter === category 
                    ? "bg-slate-800 border-slate-700 text-white" 
                    : "bg-transparent border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading ? (
            // Loading skeletons
            Array(6)
              .fill(null)
              .map((_, index) => (
                <Card key={index} className="bg-[#1c1c1c] border-slate-800 overflow-hidden">
                  <CardContent className="p-0">
                    <Skeleton className="w-full h-52 rounded-none" />
                    <div className="p-5">
                      <Skeleton className="w-3/4 h-6 mb-2" />
                      <Skeleton className="w-full h-4 mb-1" />
                      <Skeleton className="w-5/6 h-4 mb-4" />
                      <div className="flex gap-2 mb-4">
                        <Skeleton className="w-16 h-6 rounded-full" />
                        <Skeleton className="w-16 h-6 rounded-full" />
                        <Skeleton className="w-16 h-6 rounded-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : displayedProjects.length > 0 ? (
            // Display projects
            displayedProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="h-full bg-[#1c1c1c] border-slate-800 overflow-hidden hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    {/* Project Image */}
                    <div className="relative w-full h-52 group">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
                        <Button size="sm" asChild variant="outline" className="border-white/20 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70">
                          <Link href={project.liveUrl || project.link} target="_blank">
                            <Eye size={16} className="mr-1" /> Live Demo
                          </Link>
                        </Button>
                        {project.githubUrl && (
                          <Button size="sm" asChild variant="outline" className="border-white/20 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70">
                            <Link href={project.githubUrl} target="_blank">
                              <Github size={16} className="mr-1" /> Code
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies && project.technologies.length > 0 ? (
                          project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="bg-slate-800/50 text-slate-300">
                              {tech}
                            </Badge>
                          ))
                        ) : (
                          // Default badges if tech stack is not available
                          <>
                            <Badge variant="secondary" className="bg-slate-800/50 text-slate-300">React</Badge>
                            <Badge variant="secondary" className="bg-slate-800/50 text-slate-300">Next.js</Badge>
                            <Badge variant="secondary" className="bg-slate-800/50 text-slate-300">Tailwind</Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-900/30 border-t border-slate-800 flex justify-between p-4">
                    <span className="text-xs text-slate-500">
                      {project.date ? format(new Date(project.date), "MMM yyyy") : "2024"}
                    </span>
                    <Button variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white p-0">
                      <Link href={project.link} target="_blank">
                        View Details <ExternalLink size={14} className="ml-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            // No projects found
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20">
              <p className="text-slate-400">No projects found for this category</p>
              <Button 
                variant="outline" 
                className="mt-4 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                onClick={() => setFilter("all")}
              >
                Show All Categories
              </Button>
            </div>
          )}
        </motion.div>
        
        {/* View all projects button */}
        {!isLoading && hasMoreProjects && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-12"
          >
            <Button 
              variant="outline" 
              className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
              onClick={handleViewAll}
            >
              Show All Projects <ExternalLink size={16} className="ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;