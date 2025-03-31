// actions/admin/experience.js
"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Get all experiences with optional filtering and pagination
 */
export async function getExperiences({
  page = 1,
  limit = 10,
  current = null,
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
    if (current !== null) {
      where.isCurrent = current;
    }

    // Get experiences with pagination
    const experiences = await db.experience.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    });

    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw new Error("Failed to fetch experiences");
  }
}

/**
 * Get experience count
 */
export async function getExperienceCount(current = null) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    // Build where clause for filtering
    const where = {};
    if (current !== null) {
      where.isCurrent = current;
    }

    // Get count
    const count = await db.experience.count({ where });
    return count;
  } catch (error) {
    console.error("Error counting experiences:", error);
    throw new Error("Failed to count experiences");
  }
}

/**
 * Get a single experience by ID
 */
export async function getExperience(id) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!id) {
      throw new Error("Experience ID is required");
    }

    // Get experience by ID
    const experience = await db.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      throw new Error("Experience not found");
    }

    return experience;
  } catch (error) {
    console.error("Error fetching experience:", error);
    throw new Error("Failed to fetch experience");
  }
}

/**
 * Create a new experience
 */
export async function createExperience(data) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    // Create the experience
    const experience = await db.experience.create({
      data: {
        company: data.company,
        location: data.location,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        isCurrent: data.isCurrent || false,
        title: data.title,
        description: data.description,
        roles: data.roles,
        skills: data.skills,
        order: data.order || 0,
      },
    });

    // Revalidate paths
    revalidatePath("/admin/experience");
    revalidatePath("/admin");
    revalidatePath("/");

    return experience;
  } catch (error) {
    console.error("Error creating experience:", error);
    throw new Error("Failed to create experience");
  }
}

/**
 * Update an existing experience
 */
export async function updateExperience(id, data) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!id) {
      throw new Error("Experience ID is required");
    }

    // Update the experience
    const experience = await db.experience.update({
      where: { id },
      data: {
        company: data.company,
        location: data.location,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : null,
        isCurrent: data.isCurrent,
        title: data.title,
        description: data.description,
        roles: data.roles,
        skills: data.skills,
        order: data.order,
      },
    });

    // Revalidate paths
    revalidatePath("/admin/experience");
    revalidatePath("/admin");
    revalidatePath("/");

    return experience;
  } catch (error) {
    console.error("Error updating experience:", error);
    throw new Error("Failed to update experience");
  }
}

/**
 * Delete an experience
 */
export async function deleteExperience(id) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!id) {
      throw new Error("Experience ID is required");
    }

    // Delete the experience
    await db.experience.delete({
      where: { id },
    });

    // Revalidate paths
    revalidatePath("/admin/experience");
    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error deleting experience:", error);
    throw new Error("Failed to delete experience");
  }
}