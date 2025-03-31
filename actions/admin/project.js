"use server";
// actions/admin/project.js

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Get all projects with optional filtering and pagination
 */
export async function getProjects({
  page = 1,
  limit = 10,
  category = null,
  featured = null,
  sortBy = "order",
  sortOrder = "asc"
} = {}) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const where = {};
    if (category) {
      where.category = category;
    }
    if (featured !== null) {
      where.featured = featured;
    }

    // Get projects with pagination
    const projects = await db.project.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}

/**
 * Get project count with optional filters
 */
export async function getProjectCount(category = null, featured = null) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    // Build where clause for filtering
    const where = {};
    if (category) {
      where.category = category;
    }
    if (featured !== null) {
      where.featured = featured;
    }

    // Get count
    const count = await db.project.count({ where });
    return count;
  } catch (error) {
    console.error("Error counting projects:", error);
    throw new Error("Failed to count projects");
  }
}

/**
 * Get a single project by ID
 */
export async function getProject(id) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!id) {
      throw new Error("Project ID is required");
    }

    // Get project by ID
    const project = await db.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw new Error("Failed to fetch project");
  }
}

/**
 * Create a new project
 */
export async function createProject(data) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    // Create the project
    const project = await db.project.create({
      data: {
        title: data.title,
        description: data.description,
        link: data.link,
        image: data.image,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        technologies: data.technologies,
        category: data.category,
        featured: data.featured || false,
        date: data.date ? new Date(data.date) : new Date(),
        order: data.order || 0,
      },
    });

    // Revalidate paths
    revalidatePath("/admin/projects");
    revalidatePath("/admin");
    revalidatePath("/");

    return project;
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project");
  }
}

/**
 * Update an existing project
 */
export async function updateProject(id, data) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!id) {
      throw new Error("Project ID is required");
    }

    // Update the project
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

    // Revalidate paths
    revalidatePath("/admin/projects");
    revalidatePath("/admin");
    revalidatePath("/");

    return project;
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Failed to update project");
  }
}

/**
 * Delete a project
 */
export async function deleteProject(id) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!id) {
      throw new Error("Project ID is required");
    }

    // Delete the project
    await db.project.delete({
      where: { id },
    });

    // Revalidate paths
    revalidatePath("/admin/projects");
    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project");
  }
}

/**
 * Toggle project featured status
 */
export async function toggleProjectFeatured(id) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!id) {
      throw new Error("Project ID is required");
    }

    // Get current project
    const project = await db.project.findUnique({
      where: { id },
      select: { featured: true },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    // Toggle featured status
    const updatedProject = await db.project.update({
      where: { id },
      data: {
        featured: !project.featured,
      },
    });

    // Revalidate paths
    revalidatePath("/admin/projects");
    revalidatePath("/admin");
    revalidatePath("/");

    return updatedProject;
  } catch (error) {
    console.error("Error toggling project featured status:", error);
    throw new Error("Failed to update project");
  }
}