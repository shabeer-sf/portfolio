"use client"
import React from "react";
import {
  Brain,
  Cloud,
  Code,
  Database,
  Layout,
  Link as LinkIcon,
  Smartphone,
  ArrowRight,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const WhatIdo = () => {
  const services = [
    {
      title: "Full Stack Development",
      icon: Code,
      description:
        "Building scalable web applications with modern frameworks like Next.js, React, and Node.js.",
      tags: ["Next.js", "React", "Node.js"],
      color: "bg-blue-600/10",
      borderColor: "border-blue-600/20",
      iconColor: "text-blue-500",
      gradientFrom: "from-blue-600/20",
      gradientTo: "to-blue-400/5",
    },
    {
      title: "React Native App Development",
      icon: Smartphone,
      description:
        "Creating high-performance cross-platform mobile apps using React Native and Expo.",
      tags: ["React Native", "Expo", "Mobile"],
      color: "bg-purple-600/10",
      borderColor: "border-purple-600/20",
      iconColor: "text-purple-500",
      gradientFrom: "from-purple-600/20",
      gradientTo: "to-purple-400/5",
    },
    {
      title: "Frontend Development",
      icon: Layout,
      description:
        "Designing sleek, user-friendly interfaces with Tailwind CSS and advanced UI frameworks.",
      tags: ["UI/UX", "Tailwind", "Animation"],
      color: "bg-emerald-600/10",
      borderColor: "border-emerald-600/20",
      iconColor: "text-emerald-500",
      gradientFrom: "from-emerald-600/20",
      gradientTo: "to-emerald-400/5",
    },
    {
      title: "Backend & Database Management",
      icon: Database,
      description:
        "Developing secure and optimized backends using Prisma, MySQL, MongoDB, and Express.js.",
      tags: ["Prisma", "MySQL", "MongoDB"],
      color: "bg-rose-600/10",
      borderColor: "border-rose-600/20",
      iconColor: "text-rose-500",
      gradientFrom: "from-rose-600/20",
      gradientTo: "to-rose-400/5",
    },
    {
      title: "API Development & Integration",
      icon: LinkIcon,
      description:
        "Building RESTful and GraphQL APIs to integrate with various services and third-party platforms.",
      tags: ["REST", "GraphQL", "Integration"],
      color: "bg-amber-600/10",
      borderColor: "border-amber-600/20",
      iconColor: "text-amber-500",
      gradientFrom: "from-amber-600/20",
      gradientTo: "to-amber-400/5",
    },
    {
      title: "Cloud Deployment & DevOps",
      icon: Cloud,
      description:
        "Deploying applications with Vercel, AWS, and Docker for high availability and performance.",
      tags: ["Vercel", "AWS", "Docker"],
      color: "bg-cyan-600/10",
      borderColor: "border-cyan-600/20",
      iconColor: "text-cyan-500",
      gradientFrom: "from-cyan-600/20",
      gradientTo: "to-cyan-400/5",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        duration: 0.6,
      },
    },
  };

  return (
    <section id="what-i-do" className="py-32 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-900 to-transparent -z-10" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl opacity-30 -z-10" />
      
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
          className="text-center space-y-6 mb-20"
        >
          <Badge 
            variant="outline" 
            className="px-5 py-1.5 text-sm font-medium rounded-full bg-slate-900/50 backdrop-blur-sm border-slate-700 text-slate-300"
          >
            My Services
          </Badge>
          
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-200">
              Collaborate with brands and agencies
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-200">
              to create impactful results
            </h2>
          </div>
          
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Leveraging cutting-edge technologies to build performant, scalable, and user-friendly 
            applications that deliver exceptional experiences.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <motion.div key={index} variants={itemVariants} whileHover={{ y: -8 }}>
                <Card className={`h-full border overflow-hidden ${service.borderColor} bg-gradient-to-b ${service.gradientFrom} ${service.gradientTo} bg-slate-900/80 backdrop-blur-sm shadow-xl transition-all duration-500`}>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>
                  
                  <CardHeader className={`pb-2 relative`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${service.color} shadow-lg border ${service.borderColor}`}>
                      <IconComponent size={26} className={service.iconColor} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">{service.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <CardDescription className="text-slate-300 text-base leading-relaxed mb-6">
                      {service.description}
                    </CardDescription>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, tagIndex) => (
                          <Badge 
                            key={tagIndex} 
                            variant="secondary" 
                            className={`${service.color} border ${service.borderColor} text-white font-medium py-1 px-3`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIdo;