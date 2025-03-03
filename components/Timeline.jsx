"use client"
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Building, Check } from "lucide-react";

const experiences = [
  {
    year: "2024 - 2025",
    company: "Doutya Private Limited",
    location: "Bangalore, India",
    roles: [
      "Developed and maintained cross-platform mobile applications using Expo and React Native, ensuring seamless functionality and performance on both iOS and Android platforms.",
      "Implemented and integrated various third-party services and APIs, such as Firebase, Google Maps, and payment gateways, to extend app functionality and provide a richer user experience.",
      "Worked on Software-as-a-Service (SaaS) solutions, contributing to the digital transformation of businesses.",
    ],
    skills: ["React Native", "Expo", "Firebase", "SaaS", "API Integration"]
  },
  {
    year: "2022 - 2024",
    company: "Smartwebin Software Development Company",
    location: "Cochin, India",
    roles: [
      "Optimized backend processes in PHP, reducing server response time by 30% and enhancing overall application performance.",
      "Led a cross-functional team to successfully deliver a complex project, meeting all deadlines and exceeding client expectations.",
      "Worked on full-service website and mobile app development projects, improving system efficiency and user experience.",
    ],
    skills: ["PHP", "Team Leadership", "Web Development", "Performance Optimization"]
  },
];

const Timeline = () => {
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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Main vertical timeline line */}
          <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-600/30 via-purple-600/30 to-slate-600/30 ml-0.5 md:ml-0"></div>

          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
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
                    {exp.year}
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
                          <p className="text-slate-400">{exp.location}</p>
                        </div>
                      </div>
                      
                      {/* Roles */}
                      <div className="p-6 pt-4">
                        <h4 className="text-slate-300 font-medium text-sm uppercase tracking-wider mb-3">Key Responsibilities</h4>
                        <ul className="space-y-4">
                          {exp.roles.map((role, idx) => (
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
                          ))}
                        </ul>
                        
                        {/* Skills */}
                        <div className="mt-6">
                          <h4 className="text-slate-300 font-medium text-sm uppercase tracking-wider mb-3">Technologies & Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, skillIdx) => (
                              <Badge key={skillIdx} variant="secondary" className="bg-slate-800/50 hover:bg-slate-800 text-slate-300">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;