"use server";
// actions/project.js

import { db } from "@/lib/prisma";

/**
 * Get projects for the public website
 */
export async function getProjects2({
  featured = false,
  category = null,
  limit = null,
  orderBy = "order",
  orderDirection = "asc"
} = {}) {
  try {
    // Build where clause for filtering
    const where = {};
    
    // Filter by featured if specified
    if (featured) {
      where.featured = true;
    }
    
    // Filter by category if specified
    if (category) {
      where.category = category;
    }
    
    // Build query options
    const options = {
      where,
      orderBy: {
        [orderBy]: orderDirection,
      },
    };
    
    // Add limit if specified
    if (limit) {
      options.take = limit;
    }
    
    // Execute query
    const projects = await db.project.findMany(options);
    
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}