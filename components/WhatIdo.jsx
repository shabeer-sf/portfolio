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
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
      color: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      title: "React Native App Development",
      icon: Smartphone,
      description:
        "Creating high-performance cross-platform mobile apps using React Native and Expo.",
      tags: ["React Native", "Expo", "Mobile"],
      color: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      title: "Frontend Development",
      icon: Layout,
      description:
        "Designing sleek, user-friendly interfaces with Tailwind CSS and advanced UI frameworks.",
      tags: ["UI/UX", "Tailwind", "Animation"],
      color: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    {
      title: "Backend & Database Management",
      icon: Database,
      description:
        "Developing secure and optimized backends using Prisma, MySQL, MongoDB, and Express.js.",
      tags: ["Prisma", "MySQL", "MongoDB"],
      color: "bg-red-500/10",
      borderColor: "border-red-500/20",
      iconColor: "text-red-400",
    },
    {
      title: "API Development & Integration",
      icon: LinkIcon,
      description:
        "Building RESTful and GraphQL APIs to integrate with various services and third-party platforms.",
      tags: ["REST", "GraphQL", "Integration"],
      color: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      iconColor: "text-amber-400",
    },
    {
      title: "Cloud Deployment & DevOps",
      icon: Cloud,
      description:
        "Deploying applications with Vercel, AWS, and Docker for high availability and performance.",
      tags: ["Vercel", "AWS", "Docker"],
      color: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      iconColor: "text-cyan-400",
    },
  ];

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

  return (
    <section id="what-i-do" className="pt-24 pb-20 relative">
      {/* Background elements */}
      <div className="absolute top-40 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <Badge variant="outline" className="px-4 py-1 text-sm font-normal border-slate-700 text-slate-400">
            My Services
          </Badge>
          
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Collaborate with brands and agencies
            </h2>
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              to create impactful results
            </h2>
          </div>
          
          <p className="text-slate-400 max-w-2xl mx-auto">
            Leveraging cutting-edge technologies to build performant, scalable, and user-friendly 
            applications that deliver exceptional experiences.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`h-full border overflow-hidden ${service.borderColor} transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50 bg-[#1c1c1c] backdrop-blur-sm hover:-translate-y-1`}>
                  <CardHeader className={`${service.color} pt-6`}>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-black/20 backdrop-blur-sm">
                      <IconComponent size={24} className={service.iconColor} />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardDescription className="text-slate-300 text-sm">
                      {service.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {service.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-black/30 text-slate-300 hover:bg-black/50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  {/* <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-0">
                      Learn more <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </CardFooter> */}
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