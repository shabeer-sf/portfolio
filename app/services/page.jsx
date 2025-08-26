"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Code, 
  Smartphone, 
  Layout, 
  Database, 
  Cloud, 
  Zap,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Target,
  Star,
  Quote,
  Mail,
  Calendar,
  Package,
  Layers,
  Globe,
  Shield,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getServices } from '@/actions/project';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(0);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping for dynamic icons
  const iconMap = {
    'Code': Code,
    'Smartphone': Smartphone,
    'Layout': Layout,
    'Database': Database,
    'Cloud': Cloud,
    'Zap': Zap,
    'Layers': Layers,
    'ShoppingCart': ShoppingCart,
    'Globe': Globe,
    'Shield': Shield,
    'Package': Package
  };

  // Color mapping for dynamic colors
  const colorMap = {
    'blue': {
      bg: "bg-blue-600/10",
      border: "border-blue-600/20",
      icon: "text-blue-500"
    },
    'purple': {
      bg: "bg-purple-600/10",
      border: "border-purple-600/20",
      icon: "text-purple-500"
    },
    'emerald': {
      bg: "bg-emerald-600/10",
      border: "border-emerald-600/20",
      icon: "text-emerald-500"
    },
    'orange': {
      bg: "bg-orange-600/10",
      border: "border-orange-600/20",
      icon: "text-orange-500"
    },
    'cyan': {
      bg: "bg-cyan-600/10",
      border: "border-cyan-600/20",
      icon: "text-cyan-500"
    },
    'yellow': {
      bg: "bg-yellow-600/10",
      border: "border-yellow-600/20",
      icon: "text-yellow-500"
    },
    'green': {
      bg: "bg-green-600/10",
      border: "border-green-600/20",
      icon: "text-green-500"
    },
    'indigo': {
      bg: "bg-indigo-600/10",
      border: "border-indigo-600/20",
      icon: "text-indigo-500"
    }
  };

  // Mock testimonials for services that don't have them in DB
  const mockTestimonials = {
    "full-stack-web-development": {
      text: "Shabeer delivered an exceptional web application that exceeded our expectations. The attention to detail and technical expertise was outstanding.",
      author: "Sarah Johnson",
      role: "Product Manager",
      company: "TechStart Inc."
    },
    "react-native-mobile-apps": {
      text: "The mobile app Shabeer built for us has been a game-changer. Users love the smooth performance and intuitive interface.",
      author: "Mike Chen",
      role: "CEO",
      company: "MobileFirst Solutions"
    },
    "frontend-development": {
      text: "The frontend work was exceptional. Our website now looks modern and performs amazingly well across all devices.",
      author: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Design Studio Pro"
    },
    "api-development-integration": {
      text: "Shabeer built a robust API that handles our complex business logic perfectly. The documentation was thorough and helpful.",
      author: "David Kim",
      role: "CTO",
      company: "DataFlow Systems"
    },
    "cloud-deployment-devops": {
      text: "Our deployment process is now seamless and our application scales automatically. Great work on the infrastructure setup!",
      author: "Lisa Wang",
      role: "DevOps Lead",
      company: "ScaleUp Tech"
    },
    "performance-optimization": {
      text: "Our website speed improved by 60% after Shabeer's optimization work. User engagement has significantly increased!",
      author: "Alex Thompson",
      role: "Product Owner",
      company: "FastTrack Digital"
    }
  };

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const fetchedServices = await getServices({
          orderBy: "order",
          orderDirection: "asc"
        });
        
        if (Array.isArray(fetchedServices) && fetchedServices.length > 0) {
          // Transform services data to match component expectations
          const transformedServices = fetchedServices.map((service, index) => ({
            id: service.id,
            title: service.title,
            slug: service.slug,
            shortDescription: service.shortDescription,
            description: service.description,
            icon: iconMap[service.icon] || Code,
            color: colorMap[service.color]?.bg || "bg-blue-600/10",
            borderColor: colorMap[service.color]?.border || "border-blue-600/20",
            iconColor: colorMap[service.color]?.icon || "text-blue-500",
            features: Array.isArray(service.process) ? service.process : [],
            technologies: Array.isArray(service.technologies) ? service.technologies : [],
            process: Array.isArray(service.process) ? service.process : [],
            deliverables: Array.isArray(service.deliverables) ? service.deliverables : [],
            pricing: service.pricing || "Contact for pricing",
            duration: service.duration || "Varies",
            testimonial: mockTestimonials[service.slug] || {
              text: "Working with Shabeer was a fantastic experience. Professional, skilled, and delivered exactly what we needed.",
              author: "Client",
              role: "Project Manager",
              company: "Tech Company"
            }
          }));
          
          setServices(transformedServices);
        } else {
          // Fallback to mock data if no services found
          setServices([]);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to load services");
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const packages = [
    {
      name: "Starter",
      price: "$1,500",
      duration: "2-4 weeks",
      description: "Perfect for small projects and MVPs",
      features: [
        "Frontend development",
        "Responsive design",
        "Basic functionality",
        "2 rounds of revisions",
        "Basic documentation",
        "2 weeks support"
      ],
      recommended: false
    },
    {
      name: "Professional", 
      price: "$3,500",
      duration: "4-8 weeks",
      description: "Complete solution for growing businesses",
      features: [
        "Full-stack development",
        "Database integration",
        "API development",
        "Authentication system",
        "Unlimited revisions",
        "Complete documentation",
        "4 weeks support",
        "Performance optimization"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "$7,500+",
      duration: "8-16 weeks", 
      description: "Comprehensive solution for large-scale projects",
      features: [
        "Complete application suite",
        "Mobile app included",
        "Advanced integrations",
        "Custom admin dashboard",
        "Cloud infrastructure setup",
        "CI/CD pipeline",
        "6 months support",
        "Team training included",
        "Priority support"
      ],
      recommended: false
    }
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Shabeer
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/#contact">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Mail size={16} className="mr-2" />
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20 -z-10" />
        
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 mb-16"
          >
            <Badge className="bg-blue-600/10 border-blue-600/20 text-blue-400 px-4 py-1">
              My Services
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-200">
              Transform Your Ideas Into
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Digital Reality
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              I specialize in building modern, scalable applications that drive business growth. 
              From web development to mobile apps, I deliver solutions that exceed expectations.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-6 text-lg">
                <Calendar size={16} className="mr-2" />
                Book Consultation
              </Button>
              
              <Button variant="outline" className="border-slate-700 bg-slate-800/50 hover:bg-slate-700 px-8 py-6 text-lg">
                <Package size={16} className="mr-2" />
                View Packages
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Services I Offer
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Comprehensive development services to bring your digital vision to life
            </p>
          </motion.div>

          {isLoading ? (
            // Loading skeleton
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(null).map((_, index) => (
                <Card key={index} className="bg-slate-900/60 border-slate-800 shadow-xl">
                  <CardHeader className="pb-2">
                    <Skeleton className="w-14 h-14 rounded-2xl mb-4" />
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedService(index)}
                    className="cursor-pointer"
                  >
                    <Card className={`h-full border overflow-hidden ${service.borderColor} bg-gradient-to-b ${service.color} bg-slate-900/80 backdrop-blur-sm shadow-xl transition-all duration-500 hover:border-blue-500/50`}>
                      <CardHeader className="pb-2">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${service.color} shadow-lg border ${service.borderColor}`}>
                          <IconComponent size={26} className={service.iconColor} />
                        </div>
                        <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="pt-4 space-y-4">
                        <p className="text-slate-300 leading-relaxed">
                          {service.shortDescription}
                        </p>
                        
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-1 text-slate-400">
                            <Clock size={14} />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-400">
                            <Target size={14} />
                            <span>{service.pricing}</span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          className="w-full text-blue-400 hover:text-white hover:bg-blue-600/20 group"
                        >
                          Learn More 
                          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            // No services found
            <div className="text-center py-16">
              <Package size={48} className="mx-auto mb-4 text-slate-500" />
              <p className="text-slate-400 mb-4">No services available at the moment</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Service Details Section */}
      {!isLoading && services.length > 0 && selectedService !== null && (
        <section className="py-16 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-slate-900/60 border-slate-800 overflow-hidden">
                <CardHeader className="border-b border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${services[selectedService].color} border ${services[selectedService].borderColor}`}>
                      {React.createElement(services[selectedService].icon, { 
                        size: 28, 
                        className: services[selectedService].iconColor 
                      })}
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white">
                        {services[selectedService].title}
                      </CardTitle>
                      <p className="text-slate-400">
                        {services[selectedService].shortDescription}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-b border-slate-700">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="process">Process</TabsTrigger>
                      <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                      <TabsTrigger value="testimonial">Testimonial</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="p-8">
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                            <p className="text-slate-300 leading-relaxed">
                              {services[selectedService].description}
                            </p>
                          </div>
                          
                          {services[selectedService].features && services[selectedService].features.length > 0 && (
                            <div>
                              <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                              <div className="grid gap-2">
                                {services[selectedService].features.map((feature, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                                    <span className="text-slate-300">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-6">
                          {services[selectedService].technologies && services[selectedService].technologies.length > 0 && (
                            <div>
                              <h3 className="text-xl font-semibold text-white mb-3">Technologies</h3>
                              <div className="flex flex-wrap gap-2">
                                {services[selectedService].technologies.map((tech, index) => (
                                  <Badge key={index} variant="secondary" className="bg-slate-800 border-slate-700 text-slate-300">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="text-blue-400" size={16} />
                                <span className="text-sm text-slate-400">Duration</span>
                              </div>
                              <p className="text-white font-medium">{services[selectedService].duration}</p>
                            </div>
                            
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                              <div className="flex items-center gap-2 mb-2">
                                <Target className="text-green-400" size={16} />
                                <span className="text-sm text-slate-400">Starting Price</span>
                              </div>
                              <p className="text-white font-medium">{services[selectedService].pricing}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="process" className="p-8">
                      <h3 className="text-xl font-semibold text-white mb-6">Development Process</h3>
                      {services[selectedService].process && services[selectedService].process.length > 0 ? (
                        <div className="space-y-4">
                          {services[selectedService].process.map((step, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                              <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-400 font-medium">{index + 1}</span>
                              </div>
                              <span className="text-slate-300">{step}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-400">Process details will be discussed during consultation.</p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="deliverables" className="p-8">
                      <h3 className="text-xl font-semibold text-white mb-6">What You'll Receive</h3>
                      {services[selectedService].deliverables && services[selectedService].deliverables.length > 0 ? (
                        <div className="grid gap-3">
                          {services[selectedService].deliverables.map((deliverable, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                              <Package className="text-purple-400" size={16} />
                              <span className="text-slate-300">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-400">Deliverables will be defined based on your specific requirements.</p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="testimonial" className="p-8">
                      <Card className="bg-slate-800/60 border-slate-700">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Quote className="text-blue-400 flex-shrink-0 mt-1" size={24} />
                            <div>
                              <p className="text-slate-300 mb-4 italic text-lg leading-relaxed">
                                "{services[selectedService].testimonial.text}"
                              </p>
                              <div>
                                <p className="font-semibold text-white">
                                  {services[selectedService].testimonial.author}
                                </p>
                                <p className="text-sm text-slate-400">
                                  {services[selectedService].testimonial.role} at {services[selectedService].testimonial.company}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Packages Section */}
      <section className="py-16 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Package
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Flexible pricing options to fit your project needs and budget
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                      <Star size={12} className="mr-1" />
                      Recommended
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full border ${
                  pkg.recommended 
                    ? 'border-blue-500/50 bg-gradient-to-b from-blue-600/10 to-purple-600/10' 
                    : 'border-slate-800 bg-slate-900/60'
                } backdrop-blur-sm shadow-xl`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">{pkg.name}</CardTitle>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-blue-400">{pkg.price}</p>
                      <p className="text-slate-400">{pkg.duration}</p>
                      <p className="text-sm text-slate-300">{pkg.description}</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className={`w-full mt-6 ${
                      pkg.recommended
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : 'bg-slate-800 hover:bg-slate-700 border border-slate-700'
                    }`}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative border-t border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 -z-10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-slate-300">
              Let's discuss your requirements and bring your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-6 text-lg">
                  <Mail size={16} className="mr-2" />
                  Get Free Quote
                </Button>
              </Link>
              <Link href="/#projects">
                <Button variant="outline" className="border-slate-700 bg-slate-800/50 hover:bg-slate-700 px-8 py-6 text-lg">
                  <Globe size={16} className="mr-2" />
                  View Portfolio
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;