"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cache } from "react";

/**
 * Fetch all projects with optional filtering and pagination
 * This function is cached to improve performance for repeated calls
 */
export const getProjects2 = cache(async (options = {}) => {
  const {
    page = 1,
    limit = 100,
    category = null,
    featured = null,
    search = "",
    orderBy = "order"
  } = options;

  try {
    // Calculate pagination values
    const skip = (page - 1) * limit;

    // Build where clause based on filters
    const where = {};

    // Add category filter if provided
    if (category && category !== "all") {
      where.category = category.toUpperCase();
    }

    // Add featured filter if provided
    if (featured !== null) {
      where.featured = featured;
    }

    // Add search filter if provided
    if (search && search.trim().length > 0) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ];
    }

    // Determine order by clause
    const orderByClause = {};
    
    // Default order by "order" field then "createdAt"
    if (orderBy === "date") {
      orderByClause.date = "desc";
    } else if (orderBy === "title") {
      orderByClause.title = "asc";
    } else {
      orderByClause.order = "asc";
      orderByClause.createdAt = "desc";
    }

    // Fetch projects with filters and pagination
    const projects = await db.project.findMany({
      where,
      orderBy: orderByClause,
      skip,
      take: limit,
    });

    // Get total count for pagination
    const totalProjects = await db.project.count({ where });

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalProjects / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    // Return formatted response
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects. Please try again later.");
  }
});

/**
 * Get a single project by ID
 */
export async function getProjectById(id) {
  try {
    const project = await db.project.findUnique({
      where: { id },
    });

    if (!project) {
      return { error: "Project not found", status: 404 };
    }

    return project;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw new Error("Failed to fetch the project. Please try again later.");
  }
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(limit = 6) {
  try {
    const projects = await db.project.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
      take: limit,
    });

    return projects;
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    throw new Error("Failed to fetch featured projects. Please try again later.");
  }
}

/**
 * Create a new project
 */
export async function createProject(data) {
  try {
    const project = await db.project.create({
      data: {
        title: data.title,
        description: data.description,
        link: data.link,
        image: data.image,
        githubUrl: data.githubUrl || null,
        liveUrl: data.liveUrl || null,
        technologies: data.technologies || [],
        category: data.category || "WEB",
        featured: data.featured || false,
        date: data.date ? new Date(data.date) : new Date(),
        order: data.order || 0,
      },
    });

    // Revalidate projects page
    revalidatePath("/projects");
    
    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      error: "Failed to create project",
      details: error.message,
      status: 500,
    };
  }
}

/**
 * Update an existing project
 */
export async function updateProject(id, data) {
  try {
    const project = await db.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        link: data.link,
        image: data.image,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        technologies: data.technologies,
        category: data.category,
        featured: data.featured,
        date: data.date ? new Date(data.date) : undefined,
        order: data.order,
      },
    });

    // Revalidate projects page
    revalidatePath("/projects");
    
    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    
    if (error.code === "P2025") {
      return {
        error: "Project not found",
        status: 404,
      };
    }
    
    return {
      error: "Failed to update project",
      details: error.message,
      status: 500,
    };
  }
}

/**
 * Delete a project
 */
export async function deleteProject(id) {
  try {
    await db.project.delete({
      where: { id },
    });

    // Revalidate projects page
    revalidatePath("/projects");
    
    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    
    if (error.code === "P2025") {
      return {
        error: "Project not found",
        status: 404,
      };
    }
    
    return {
      error: "Failed to delete project",
      details: error.message,
      status: 500,
    };
  }
}