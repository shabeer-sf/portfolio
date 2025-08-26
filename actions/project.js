"use server";
// Enhanced actions for the corrected schema

import { db } from "@/lib/prisma";
import { contactSchema } from "@/lib/validators";
import { z } from "zod";
import { revalidatePath } from "next/cache";

/**
 * Enhanced project fetching with fixed relationships
 */
export async function getProjects2({
  featured = false,
  category = null,
  categoryId = null,
  status = null,
  limit = null,
  offset = null,
  orderBy = "order",
  orderDirection = "asc",
  includeRelations = true
} = {}) {
  try {
    // Build where clause for filtering
    const where = {};
    
    // Filter by featured if specified
    if (featured) {
      where.featured = true;
    }
    
    // Filter by category if specified (support both dynamic and legacy)
    if (categoryId) {
      where.categoryId = categoryId;
    } else if (category) {
      where.category = category;
    }
    
    // Filter by status if specified  
    if (status) {
      where.status = status;
    }
    
    // Build query options
    const options = {
      where,
      orderBy: {
        [orderBy]: orderDirection,
      },
    };
    
    // Include relations if requested
    if (includeRelations) {
      options.include = {
        projectTags: {
          include: {
            tag: {
              select: {
                name: true,
                color: true
              }
            }
          }
        },
        projectCategory: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
            icon: true
          }
        },
        testimonials: {
          where: { featured: true },
          take: 1,
          select: {
            name: true,
            role: true,
            company: true,
            content: true,
            image: true,
            rating: true
          }
        }
      };
    }
    
    // Add offset for pagination
    if (offset) {
      options.skip = offset;
    }
    
    // Add limit if specified
    if (limit) {
      options.take = limit;
    }
    
    // Execute query
    const projects = await db.project.findMany(options);
    
    // Transform the data to include tags directly on the project
    const transformedProjects = projects.map(project => ({
      ...project,
      tags: project.projectTags?.map(pt => pt.tag) || []
    }));
    
    return transformedProjects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

/**
 * Get total count of projects with filters
 */
export async function getProjectsCount({
  featured = false,
  category = null,
  categoryId = null,
  status = null
} = {}) {
  try {
    const where = {};
    
    if (featured) {
      where.featured = true;
    }
    
    if (categoryId) {
      where.categoryId = categoryId;
    } else if (category) {
      where.category = category;
    }
    
    if (status) {
      where.status = status;
    }
    
    const count = await db.project.count({ where });
    return count;
  } catch (error) {
    console.error("Error counting projects:", error);
    return 0;
  }
}

/**
 * Get a single project by slug with full details
 */
export async function getProjectBySlug(slug) {
  try {
    const project = await db.project.findUnique({
      where: { slug },
      include: {
        projectTags: {
          include: {
            tag: {
              select: {
                name: true,
                color: true
              }
            }
          }
        },
        testimonials: {
          where: { featured: true },
          orderBy: { createdAt: "desc" }
        }
      }
    });
    
    if (!project) return null;
    
    // Transform the data to include tags directly on the project
    const transformedProject = {
      ...project,
      tags: project.projectTags?.map(pt => pt.tag) || []
    };
    
    // Increment view count
    await db.project.update({
      where: { id: project.id },
      data: { views: { increment: 1 } }
    });
    
    return transformedProject;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

/**
 * Enhanced contact creation with better validation and features
 */
export async function createContact(data) {
  try {
    // Validate data against schema
    const validatedData = contactSchema.parse(data);
    
    // Create the contact with enhanced fields
    const contact = await db.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || null,
        message: validatedData.message,
        status: "UNREAD",
        priority: "NORMAL",
        source: "website"
      },
    });
    
    // Revalidate paths
    revalidatePath("/admin/contacts");
    revalidatePath("/dashboard");
    
    return {
      success: true,
      data: contact,
      message: "Message sent successfully!"
    };
  } catch (error) {
    console.error("Error creating contact:", error);
    
    if (error instanceof z.ZodError) {
      return {
        error: "Validation failed",
        details: error.format(),
        status: 400
      };
    }
    
    return {
      error: "Failed to send your message. Please try again later.",
      status: 500
    };
  }
}

/**
 * Get experiences with enhanced filtering
 */
export async function getTimeline({
  limit = null,
  orderBy = "order",
  orderDirection = "asc",
  includeCurrentOnly = false
} = {}) {
  try {
    const where = {};
    
    if (includeCurrentOnly) {
      where.isCurrent = true;
    }
    
    const options = {
      where,
      orderBy: {
        [orderBy]: orderDirection,
      },
    };
    
    if (limit) {
      options.take = limit;
    }
    
    const experiences = await db.experience.findMany(options);
    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

/**
 * Get services for the services page with enhanced filtering
 */
export async function getServices({
  featured = false,
  limit = null,
  orderBy = "order",
  orderDirection = "asc"
} = {}) {
  try {
    const where = {};
    
    if (featured) {
      where.featured = true;
    }
    
    const options = {
      where,
      orderBy: {
        [orderBy]: orderDirection,
      },
    };
    
    if (limit) {
      options.take = limit;
    }
    
    const services = await db.service.findMany(options);
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

/**
 * Get a single service by slug
 */
export async function getServiceBySlug(slug) {
  try {
    const service = await db.service.findUnique({
      where: { slug }
    });
    
    return service;
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    return null;
  }
}

/**
 * Get skills grouped by category
 */
export async function getSkills({
  category = null,
  featured = false,
  orderBy = "order",
  orderDirection = "asc"
} = {}) {
  try {
    const where = {};
    
    if (category) {
      where.category = category;
    }
    
    if (featured) {
      where.featured = true;
    }
    
    const skills = await db.skill.findMany({
      where,
      orderBy: {
        [orderBy]: orderDirection,
      },
    });
    
    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

/**
 * Get certifications
 */
export async function getCertifications({
  limit = null,
  orderBy = "issueDate",
  orderDirection = "desc"
} = {}) {
  try {
    const options = {
      orderBy: {
        [orderBy]: orderDirection,
      },
    };
    
    if (limit) {
      options.take = limit;
    }
    
    const certifications = await db.certification.findMany(options);
    return certifications;
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return [];
  }
}

/**
 * Get education records
 */
export async function getEducation({
  limit = null,
  orderBy = "startDate",
  orderDirection = "desc"
} = {}) {
  try {
    const options = {
      orderBy: {
        [orderBy]: orderDirection,
      },
    };
    
    if (limit) {
      options.take = limit;
    }
    
    const education = await db.education.findMany(options);
    return education;
  } catch (error) {
    console.error("Error fetching education:", error);
    return [];
  }
}

/**
 * Get testimonials
 */
export async function getTestimonials({
  featured = false,
  projectId = null,
  limit = null,
  orderBy = "createdAt",
  orderDirection = "desc"
} = {}) {
  try {
    const where = {};
    
    if (featured) {
      where.featured = true;
    }
    
    if (projectId) {
      where.projectId = projectId;
    }
    
    const options = {
      where,
      orderBy: {
        [orderBy]: orderDirection,
      },
    };
    
    if (limit) {
      options.take = limit;
    }
    
    const testimonials = await db.testimonial.findMany(options);
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

/**
 * Get profile information
 */
export async function getProfile() {
  try {
    // Assuming there's only one profile record
    const profile = await db.profile.findFirst({
      orderBy: { updatedAt: "desc" }
    });
    
    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

/**
 * Get social links
 */
export async function getSocialLinks({
  isActive = true,
  orderBy = "order",
  orderDirection = "asc"
} = {}) {
  try {
    const where = {};
    
    if (isActive !== null) {
      where.isActive = isActive;
    }
    
    const socialLinks = await db.socialLink.findMany({
      where,
      orderBy: {
        [orderBy]: orderDirection,
      },
    });
    
    return socialLinks;
  } catch (error) {
    console.error("Error fetching social links:", error);
    return [];
  }
}

/**
 * Analytics tracking
 */
export async function trackAnalytics({
  page,
  event,
  data = null,
  userAgent = null,
  ipAddress = null,
  referrer = null,
  sessionId = null
}) {
  try {
    await db.analytics.create({
      data: {
        page,
        event,
        data,
        userAgent,
        ipAddress,
        referrer,
        sessionId
      }
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error tracking analytics:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Newsletter subscription
 */
export async function subscribeNewsletter(email, tags = [], source = "website") {
  try {
    // Check if email already exists
    const existingSubscriber = await db.newsletter.findUnique({
      where: { email }
    });
    
    if (existingSubscriber) {
      if (!existingSubscriber.isActive) {
        // Reactivate subscription
        await db.newsletter.update({
          where: { email },
          data: {
            isActive: true,
            tags,
            source,
            unsubscribedAt: null
          }
        });
        
        return {
          success: true,
          message: "Subscription reactivated successfully!"
        };
      } else {
        return {
          error: "Email already subscribed",
          status: 409
        };
      }
    }
    
    // Create new subscription
    await db.newsletter.create({
      data: {
        email,
        tags,
        source,
        isActive: true
      }
    });
    
    return {
      success: true,
      message: "Successfully subscribed to newsletter!"
    };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return {
      error: "Failed to subscribe. Please try again later.",
      status: 500
    };
  }
}