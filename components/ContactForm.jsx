"use client";

import { createContact } from "@/actions/contact";
import useFetch from "@/hooks/use-fetch";
import { contactSchema } from "@/lib/validators";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Send, User, MessageSquare, Clock, CheckCircle2, Loader2 } from "lucide-react";

const ContactForm = () => {
  const router = useRouter();
  
  // Create form using react-hook-form and zod validation
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const {
    data: contact,
    loading: isLoading,
    error,
    fn: createContactFN,
  } = useFetch(createContact);

  useEffect(() => {
    if (contact) {
      toast.success("Message sent successfully!");
      form.reset();
      router.refresh();
    }
    
    if (error) {
      toast.error("Failed to send message. Please try again.");
    }
  }, [contact, error, form, router]);

  const onSubmit = async (data) => {
    await createContactFN(data);
  };

  return (
    <section id="contact" className="pt-24 pb-20 relative">
      {/* Background elements */}
      <div className="absolute top-40 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <Badge variant="outline" className="px-4 py-1 text-sm font-normal border-slate-700 text-slate-400">
            Get In Touch
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Let's work together
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? Fill out the form below, and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <Card className="bg-[#1c1c1c] border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/10">
                  <Mail className="text-blue-400" size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-semibold text-white mb-1">
                  Email Me
                </CardTitle>
                <CardDescription className="text-slate-400">
                  <a 
                    href="mailto:mohammedshabeer2520@gmail.com" 
                    className="transition-colors hover:text-slate-200"
                  >
                    mohammedshabeer2520@gmail.com
                  </a>
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-[#1c1c1c] border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-500/10">
                  <Clock className="text-purple-400" size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-semibold text-white mb-1">
                  Response Time
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Usually within 24-48 hours
                </CardDescription>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-[#1c1c1c] border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500/10">
                  <CheckCircle2 className="text-emerald-400" size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-semibold text-white mb-1">
                  Available For
                </CardTitle>
                <CardDescription className="text-slate-400 mb-2">
                  Freelance, Full-time positions, and project collaborations
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card className="bg-[#1c1c1c] border-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white text-xl">Send a Message</CardTitle>
                <CardDescription className="text-slate-400">
                  Fill out the form below to get in touch with me
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                                <Input
                                  placeholder="Your name"
                                  className="bg-slate-800/50 border-slate-700 pl-10 text-white"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                                <Input
                                  placeholder="Your email address"
                                  type="email"
                                  className="bg-slate-800/50 border-slate-700 pl-10 text-white"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Message</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MessageSquare className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                              <Textarea
                                placeholder="Your message..."
                                className="bg-slate-800/50 border-slate-700 min-h-32 pl-10 text-white"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="border-t border-slate-800 pt-4 text-xs text-slate-500">
                Your information will only be used to respond to your inquiry and will never be shared with third parties.
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;