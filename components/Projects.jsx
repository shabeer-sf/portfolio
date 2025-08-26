"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ExternalLink, 
  Github, 
  Eye, 
  Calendar, 
  Filter, 
  ArrowRight,
  Code,
  Loader2,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { getProjects2, getProjectsCount } from "@/actions/project";
import { getPublicCategories } from "@/actions/admin/category";

const Projects = () => {
  // State management
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination settings
  const PROJECTS_PER_PAGE = 6;

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getPublicCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    fetchCategories();
  }, []);

  // Fetch projects based on active category
  const fetchProjects = useCallback(async (categoryFilter = "all", loadMore = false) => {
    try {
      if (loadMore) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
        setError(null);
      }

      const currentOffset = loadMore ? projects.length : 0;
      
      // Determine filter parameters
      let filterParams = {
        limit: PROJECTS_PER_PAGE,
        offset: currentOffset,
        orderBy: "order",
        orderDirection: "asc",
        includeRelations: true
      };

      if (categoryFilter !== "all") {
        // Find category by slug
        const category = categories.find(cat => cat.slug === categoryFilter);
        if (category) {
          filterParams.categoryId = category.id;
        }
      }

      // Fetch projects and count
      const [fetchedProjects, count] = await Promise.all([
        getProjects2(filterParams),
        getProjectsCount(categoryFilter !== "all" ? 
          { categoryId: categories.find(cat => cat.slug === categoryFilter)?.id } : 
          {}
        )
      ]);

      if (loadMore) {
        setProjects(prev => [...prev, ...fetchedProjects]);
      } else {
        setProjects(fetchedProjects);
      }
      
      setTotalCount(count);
      setHasMore(currentOffset + fetchedProjects.length < count);
      
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again.");
      if (!loadMore) {
        setProjects([]);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [projects.length, categories]);

  // Initial load and category change
  useEffect(() => {
    if (categories.length > 0) {
      fetchProjects(activeCategory, false);
    }
  }, [activeCategory, categories]);

  // Handle category change
  const handleCategoryChange = (categorySlug) => {
    if (categorySlug === activeCategory) return;
    setActiveCategory(categorySlug);
    setProjects([]); // Clear projects for smooth transition
  };

  // Handle load more
  const handleLoadMore = () => {
    fetchProjects(activeCategory, true);
  };

  // Format project date safely
  const formatProjectDate = (project) => {
    try {
      let dateToFormat = project.date || project.endDate;
      if (!dateToFormat) return "2024";
      
      const date = new Date(dateToFormat);
      return format(date, "MMM yyyy");
    } catch (error) {
      console.error("Date formatting error:", error);
      return "2024";
    }
  };

  // Enhanced skeleton component
  const ProjectSkeleton = () => (
    <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden rounded-xl shadow-xl">
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
      <CardFooter className="p-4 border-t border-slate-800/50">
        <div className="flex justify-between items-center w-full">
          <Skeleton className="w-20 h-5 rounded-md" />
          <Skeleton className="w-28 h-5 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );

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

  // Fallback image for projects
  const fallbackImage = "https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Project+Image";

  return (
    <section id="projects" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-900 to-transparent -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20 -z-10" />
      
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
            <Sparkles size={14} className="mr-2" />
            Portfolio
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-200">
            My Projects
          </h2>
          
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            A collection of applications, websites, and development projects showcasing my skills and experience
          </p>
          
          {/* Enhanced filter buttons with mobile responsiveness */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 flex justify-center pt-6 px-4"
          >
            <div className="bg-slate-900/70 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl w-full max-w-4xl">
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {/* All Projects Button */}
                <Button
                  onClick={() => handleCategoryChange("all")}
                  className={`px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-full transition-all duration-300 min-w-0 ${
                    activeCategory === "all" 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105" 
                      : "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {activeCategory === "all" && <Filter size={12} className="mr-1 sm:mr-1.5" />}
                  <span className="whitespace-nowrap">All</span>
                  <span className="hidden sm:inline ml-1">Projects</span>
                </Button>
                
                {/* Dynamic Category Buttons */}
                {categories.map((category) => (
                  <Button
                    key={category.slug}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-full transition-all duration-300 min-w-0 relative ${
                      activeCategory === category.slug 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105" 
                        : "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    {activeCategory === category.slug && <Filter size={12} className="mr-1 sm:mr-1.5" />}
                    <span className="whitespace-nowrap truncate max-w-24 sm:max-w-none">{category.name}</span>
                    {category._count?.projects > 0 && (
                      <Badge 
                        variant="secondary" 
                        className="ml-1 sm:ml-2 bg-slate-700/50 text-slate-300 text-xs px-1 py-0 rounded-full"
                      >
                        {category._count.projects}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Error State */}
        {error && (
          <div className="text-center py-16 sm:py-20 px-6 bg-red-950/20 backdrop-blur-sm border border-red-800/30 rounded-xl mb-8">
            <Code size={40} className="mx-auto mb-4 text-red-500" />
            <p className="text-red-400 mb-4">{error}</p>
            <Button 
              onClick={() => fetchProjects(activeCategory, false)}
              variant="outline" 
              className="border-red-700 bg-red-800/50 text-red-300 hover:text-white hover:bg-red-700"
            >
              <RefreshCw size={16} className="mr-2" />
              Retry
            </Button>
          </div>
        )}

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Loading skeletons
            <motion.div 
              key="loading"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              exit={{ opacity: 0 }}
            >
              {Array(PROJECTS_PER_PAGE)
                .fill(null)
                .map((_, index) => (
                  <ProjectSkeleton key={index} />
                ))}
            </motion.div>
          ) : projects.length > 0 ? (
            <motion.div 
              key="projects"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {projects.map((project) => (
                <motion.div 
                  key={project.id} 
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="h-full"
                >
                  <Link href={`/projects/${project.slug}`}>
                    <Card className="h-full flex flex-col overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/30 rounded-xl shadow-xl group cursor-pointer">
                      <CardContent className="p-0 flex-grow">
                        {/* Project Image */}
                        <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10" />
                          
                          {/* Category badge */}
                          {(project.projectCategory || project.category) && (
                            <div className="absolute top-4 left-4 z-20">
                              <Badge 
                                className="backdrop-blur-sm border px-2.5 py-1 font-medium rounded-md"
                                style={{
                                  backgroundColor: project.projectCategory?.color ? `${project.projectCategory.color}20` : 'rgb(51 65 85 / 0.6)',
                                  borderColor: project.projectCategory?.color ? `${project.projectCategory.color}30` : 'rgb(100 116 139 / 0.3)',
                                  color: project.projectCategory?.color || 'rgb(203 213 225)'
                                }}
                              >
                                {project.projectCategory?.name || project.category}
                              </Badge>
                            </div>
                          )}
                          
                          {/* Featured badge */}
                          {project.featured && (
                            <div className="absolute top-4 right-4 z-20">
                              <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/30 backdrop-blur-sm">
                                Featured
                              </Badge>
                            </div>
                          )}
                          
                          {/* Hover overlay with action buttons */}
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-4 mb-3">
                                <div className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200">
                                  <Eye size={18} />
                                </div>
                                {project.githubUrl && project.showGithub !== false && (
                                  <div className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200">
                                    <Github size={18} />
                                  </div>
                                )}
                                {project.liveUrl && (
                                  <div className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200">
                                    <ExternalLink size={18} />
                                  </div>
                                )}
                              </div>
                              <p className="text-white text-sm font-medium">View Project</p>
                            </div>
                          </div>
                          
                          <Image
                            src={project.image || fallbackImage}
                            alt={project.title || "Project"}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              e.target.src = fallbackImage;
                            }}
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="p-4 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                            {project.title || "Untitled Project"}
                          </h3>
                          
                          <p className="text-slate-300 text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                            {project.shortDescription || project.longDescription || project.description || "No description available"}
                          </p>
                          
                          {/* Technologies */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? (
                              project.technologies.slice(0, 3).map((tech, techIndex) => (
                                <Badge 
                                  key={`${project.id}-tech-${techIndex}`} 
                                  variant="secondary" 
                                  className="bg-slate-800/70 hover:bg-slate-700/70 text-slate-300 px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs backdrop-blur-sm border border-slate-700/30 transition-colors duration-200"
                                >
                                  {typeof tech === 'string' ? tech : tech.name}
                                </Badge>
                              ))
                            ) : 
                            project.tags && Array.isArray(project.tags) && project.tags.length > 0 ? (
                              project.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge 
                                  key={`${project.id}-tag-${tagIndex}`} 
                                  variant="secondary" 
                                  className="bg-slate-800/70 hover:bg-slate-700/70 text-slate-300 px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs backdrop-blur-sm border border-slate-700/30 transition-colors duration-200"
                                >
                                  {typeof tag === 'string' ? tag : tag.name}
                                </Badge>
                              ))
                            ) : (
                              <>
                                <Badge variant="secondary" className="bg-slate-800/70 text-slate-300 px-2.5 py-1">React</Badge>
                                <Badge variant="secondary" className="bg-slate-800/70 text-slate-300 px-2.5 py-1">Next.js</Badge>
                              </>
                            )}
                            
                            {/* Show count if more technologies exist */}
                            {((project.technologies && project.technologies.length > 3) || (project.tags && project.tags.length > 3)) && (
                              <Badge variant="secondary" className="bg-slate-700/70 text-slate-400 px-2.5 py-1">
                                +{(project.technologies?.length || project.tags?.length || 0) - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      
                      {/* Footer */}
                      <CardFooter className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/30 flex justify-between p-3 sm:p-4 mt-auto">
                        <span className="text-xs text-slate-400 flex items-center">
                          <Calendar size={12} className="mr-1.5 text-blue-400" />
                          {formatProjectDate(project)}
                        </span>
                        
                        <div className="flex items-center gap-1 sm:gap-2">
                          {project.views && (
                            <span className="text-xs text-slate-400 flex items-center">
                              <Eye size={10} className="mr-1" />
                              <span className="hidden sm:inline">{project.views}</span>
                            </span>
                          )}
                          
                          {/* GitHub link if available and enabled */}
                          {project.githubUrl && project.showGithub !== false && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-slate-400 hover:text-white hover:bg-slate-800/50 p-1 sm:p-1.5 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                              }}
                            >
                              <Github size={12} className="sm:w-4 sm:h-4" />
                            </Button>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            asChild 
                            className="text-slate-300 hover:text-white hover:bg-slate-800/50 p-0 group text-xs sm:text-sm"
                          >
                            <div className="flex items-center">
                              <span className="hidden sm:inline">View Details</span>
                              <span className="sm:hidden">View</span>
                              <ArrowRight size={12} className="ml-1 sm:ml-1.5 transition-transform duration-300 group-hover:translate-x-1 sm:w-4 sm:h-4" />
                            </div>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // No projects found
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 sm:py-20 px-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl"
            >
              <Code size={40} className="mx-auto mb-4 text-slate-500" />
              <p className="text-slate-300 mb-4">No projects found for this category</p>
              <Button 
                variant="outline" 
                className="mt-2 border-slate-700 bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700"
                onClick={() => handleCategoryChange("all")}
              >
                Show All Categories
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More Button */}
        {hasMore && !isLoading && projects.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8 sm:mt-12 lg:mt-16 px-4"
          >
            <Button 
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg px-6 sm:px-8 py-4 sm:py-5 lg:py-6 rounded-lg w-full sm:w-auto"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Load More Projects</span>
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>
            <p className="text-slate-400 text-sm mt-3">
              Showing {projects.length} of {totalCount} projects
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;