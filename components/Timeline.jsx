"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building, CheckCircle, Award, Briefcase, MapPin } from "lucide-react";
import { format, parseISO } from "date-fns";
import { getTimeline } from "@/actions/experience";
import { Skeleton } from "@/components/ui/skeleton";

const Timeline = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getTimeline();
        
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }
        
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
        setError("Failed to load experiences");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // Format date range with improved formatting
  const formatDateRange = (startDate, endDate, isCurrent) => {
    if (!startDate) return "N/A";
    
    try {
      // Parse dates safely
      const start = typeof startDate === 'string' ? parseISO(startDate) : new Date(startDate);
      const startYear = format(start, "yyyy");
      const startMonth = format(start, "MMM");
      
      let endDisplay;
      if (isCurrent) {
        endDisplay = "Present";
      } else if (endDate) {
        const end = typeof endDate === 'string' ? parseISO(endDate) : new Date(endDate);
        const endYear = format(end, "yyyy");
        const endMonth = format(end, "MMM");
        
        if (startYear === endYear) {
          endDisplay = `${endMonth} ${endYear}`;
        } else {
          endDisplay = `${endMonth} ${endYear}`;
        }
      } else {
        endDisplay = "Present";
      }
      
      return `${startMonth} ${startYear} - ${endDisplay}`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Date Error";
    }
  };

  // Animation variants with improved timing and effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.7,
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-900 to-transparent -z-10" />
      <div className="absolute top-60 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20 -z-10" />
      
      {/* Small decorative elements */}
      <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-300" />
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-cyan-500 rounded-full animate-pulse delay-700" />
      
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-20"
        >
          <Badge 
            variant="outline" 
            className="px-5 py-1.5 text-sm font-medium rounded-full border-slate-700 text-slate-300 bg-slate-900/50 backdrop-blur-sm"
          >
            My Journey
          </Badge>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-200">
            Professional Experience
          </h2>
          
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            A timeline of my professional journey, highlighting key roles and achievements in my career.
          </p>
        </motion.div>

        {error ? (
          <div className="text-center py-12 px-6 bg-red-950/20 border border-red-800/30 rounded-xl backdrop-blur-sm">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            {/* Enhanced vertical timeline line with dot markers */}
            <div className="absolute left-[28px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-600/40 via-purple-600/40 to-slate-600/30 ml-0.5 md:ml-0"></div>
            
            {isLoading ? (
              // Enhanced loading skeletons
              Array(2).fill(null).map((_, index) => (
                <div key={index} className="mb-20 relative">
                  <div className="absolute left-0 w-16 h-16 rounded-full bg-slate-900/80 border border-slate-700/50 shadow-lg"></div>
                  <div className="ml-24 relative">
                    <Skeleton className="h-8 w-40 mb-4 rounded-full" />
                    <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 overflow-hidden shadow-xl rounded-xl">
                      <CardContent className="p-0">
                        <div className="p-6 border-b border-slate-800/50">
                          <Skeleton className="h-7 w-64 mb-2" />
                          <Skeleton className="h-5 w-48" />
                        </div>
                        <div className="p-6">
                          <Skeleton className="h-5 w-40 mb-6" />
                          <div className="space-y-4">
                            <Skeleton className="h-20 w-full rounded-lg" />
                            <Skeleton className="h-20 w-full rounded-lg" />
                          </div>
                          <Skeleton className="h-5 w-40 mt-8 mb-4" />
                          <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-8 w-20 rounded-full" />
                            <Skeleton className="h-8 w-24 rounded-full" />
                            <Skeleton className="h-8 w-28 rounded-full" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))
            ) : experiences.length > 0 ? (
              experiences.map((exp, index) => (
                <motion.div 
                  key={exp.id || index} 
                  variants={itemVariants}
                  className="mb-20 relative"
                  whileHover={{ x: 5 }}
                >
                  {/* Year circle marker with enhanced styling */}
                  <motion.div 
                    className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center shadow-lg z-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Briefcase size={24} className="text-blue-400" />
                  </motion.div>

                  {/* Experience content */}
                  <div className="ml-24 relative">
                    {/* Year badge with enhanced styling */}
                    <motion.div variants={childVariants} className="mb-4">
                      <Badge className="bg-slate-800/80 backdrop-blur-sm hover:bg-slate-800 text-white px-4 py-1.5 text-sm font-medium rounded-full border border-slate-700/50 shadow-md">
                        <Calendar size={14} className="mr-2 text-blue-400" />
                        {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                      </Badge>
                    </motion.div>

                    {/* Company card with enhanced styling */}
                    <motion.div 
                      variants={childVariants}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Card className="bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50 overflow-hidden shadow-xl rounded-xl">
                        <CardContent className="p-0">
                          {/* Company header with enhanced styling */}
                          <div className="p-6 border-b border-slate-700/50 bg-slate-800/30">
                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                              <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-2">{exp.company}</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                  <div className="flex items-center gap-1 text-slate-300">
                                    <MapPin size={14} className="text-blue-400" />
                                    <span>{exp.location}</span>
                                  </div>
                                  
                                  {exp.title && (
                                    <>
                                      <span className="hidden sm:inline text-slate-600">•</span>
                                      <div className="flex items-center gap-1">
                                        <Award size={14} className="text-purple-400" />
                                        <p className="text-purple-400 font-medium">{exp.title}</p>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              
                              {exp.isCurrent && (
                                <Badge variant="outline" className="w-fit border-green-500/30 bg-green-900/20 text-green-400 px-3 py-1 rounded-full shadow-inner shadow-green-900/10">
                                  Current Position
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Roles with enhanced styling */}
                          <div className="p-6">
                            <h4 className="text-slate-200 font-medium text-sm uppercase tracking-wider mb-4 flex items-center">
                              <span className="inline-block w-8 h-px bg-blue-500/50 mr-2"></span>
                              Key Responsibilities
                            </h4>
                            
                            <ul className="space-y-4 mb-8">
                              {exp.roles && Array.isArray(exp.roles) ? (
                                exp.roles.map((role, idx) => (
                                  <motion.li 
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-3"
                                  >
                                    <div className="min-w-6 mt-0.5">
                                      <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                                        <CheckCircle size={12} className="text-blue-400" />
                                      </div>
                                    </div>
                                    <p className="text-slate-300 text-sm leading-relaxed">{role}</p>
                                  </motion.li>
                                ))
                              ) : (
                                <p className="text-slate-400">No responsibilities listed</p>
                              )}
                            </ul>
                            
                            {/* Skills with enhanced styling */}
                            <div>
                              <h4 className="text-slate-200 font-medium text-sm uppercase tracking-wider mb-4 flex items-center">
                                <span className="inline-block w-8 h-px bg-purple-500/50 mr-2"></span>
                                Technologies & Skills
                              </h4>
                              
                              <div className="flex flex-wrap gap-2">
                                {exp.skills && Array.isArray(exp.skills) ? (
                                  exp.skills.map((skill, skillIdx) => (
                                    <Badge 
                                      key={skillIdx} 
                                      variant="secondary" 
                                      className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 transition-all duration-300"
                                    >
                                      {skill}
                                    </Badge>
                                  ))
                                ) : (
                                  <p className="text-slate-400">No skills listed</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16 px-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl">
                <p className="text-slate-400">No experience data found</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Timeline;