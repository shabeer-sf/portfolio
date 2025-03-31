"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Building, Check } from "lucide-react";
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

  // Format date range (e.g., "2022 - 2024" or "2024 - Present")
  const formatDateRange = (startDate, endDate, isCurrent) => {
    if (!startDate) return "N/A";
    
    try {
      // Parse dates safely
      const start = typeof startDate === 'string' ? parseISO(startDate) : new Date(startDate);
      const startYear = format(start, "yyyy");
      
      let endYear;
      if (isCurrent) {
        endYear = "Present";
      } else if (endDate) {
        const end = typeof endDate === 'string' ? parseISO(endDate) : new Date(endDate);
        endYear = format(end, "yyyy");
      } else {
        endYear = "Present";
      }
      
      return `${startYear} - ${endYear}`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Date Error";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const childVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <section id="experience" className="pt-24 pb-20 relative">
      {/* Background elements */}
      <div className="absolute top-60 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <Badge variant="outline" className="px-4 py-1 text-sm font-normal border-slate-700 text-slate-400">
            My Journey
          </Badge>
          
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Professional Experience
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto pt-4">
              A timeline of my professional journey, highlighting key roles and achievements in my career.
            </p>
          </div>
        </motion.div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Main vertical timeline line */}
            <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-600/30 via-purple-600/30 to-slate-600/30 ml-0.5 md:ml-0"></div>

            {isLoading ? (
              // Loading skeletons
              Array(2).fill(null).map((_, index) => (
                <div key={index} className="mb-16 relative">
                  <div className="absolute left-0 w-14 h-14 rounded-full bg-[#1c1c1c] border border-slate-700 shadow-lg"></div>
                  <div className="ml-20 relative">
                    <Skeleton className="h-8 w-24 mb-3" />
                    <Card className="bg-[#1c1c1c] border-slate-800 overflow-hidden shadow-lg mb-4">
                      <CardContent className="p-0">
                        <div className="p-6 border-b border-slate-800">
                          <Skeleton className="h-7 w-48 mb-2" />
                          <Skeleton className="h-5 w-32" />
                        </div>
                        <div className="p-6">
                          <Skeleton className="h-4 w-40 mb-4" />
                          <div className="space-y-4">
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                          </div>
                          <Skeleton className="h-4 w-40 mt-6 mb-4" />
                          <div className="flex gap-2">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
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
                  className="mb-16 relative"
                >
                  {/* Year circle marker */}
                  <div className="absolute left-0 w-14 h-14 rounded-full bg-[#1c1c1c] border border-slate-700 flex items-center justify-center shadow-lg z-10">
                    <Clock size={20} className="text-slate-400" />
                  </div>

                  {/* Experience content */}
                  <div className="ml-20 relative">
                    {/* Year badge */}
                    <motion.div variants={childVariants} className="mb-3">
                      <Badge className="bg-slate-800 hover:bg-slate-800 text-slate-300 text-sm px-3 py-1">
                        {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                      </Badge>
                    </motion.div>

                    {/* Company card */}
                    <motion.div variants={childVariants}>
                      <Card className="bg-[#1c1c1c] border-slate-800 overflow-hidden shadow-lg mb-4">
                        <CardContent className="p-0">
                          <div className="p-6 border-b border-slate-800 flex items-start gap-3">
                            <Building className="text-slate-400 mt-1" size={20} />
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">{exp.company}</h3>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <p className="text-slate-400">{exp.location}</p>
                                {exp.title && (
                                  <>
                                    <span className="hidden sm:inline text-slate-600">•</span>
                                    <p className="text-blue-400">{exp.title}</p>
                                  </>
                                )}
                                {exp.isCurrent && (
                                  <Badge variant="outline" className="w-fit border-green-500/20 text-green-400 mt-1 sm:mt-0">
                                    Current
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Roles */}
                          <div className="p-6 pt-4">
                            <h4 className="text-slate-300 font-medium text-sm uppercase tracking-wider mb-3">Key Responsibilities</h4>
                            <ul className="space-y-4">
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
                                    <div className="min-w-6 mt-1">
                                      <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <Check size={12} className="text-blue-400" />
                                      </div>
                                    </div>
                                    <p className="text-slate-300 text-sm">{role}</p>
                                  </motion.li>
                                ))
                              ) : (
                                <p className="text-slate-400">No responsibilities listed</p>
                              )}
                            </ul>
                            
                            {/* Skills */}
                            <div className="mt-6">
                              <h4 className="text-slate-300 font-medium text-sm uppercase tracking-wider mb-3">Technologies & Skills</h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.skills && Array.isArray(exp.skills) ? (
                                  exp.skills.map((skill, skillIdx) => (
                                    <Badge key={skillIdx} variant="secondary" className="bg-slate-800/50 hover:bg-slate-800 text-slate-300">
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
              <div className="text-center py-12">
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