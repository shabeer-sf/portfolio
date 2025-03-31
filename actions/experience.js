// actions/experience.js
"use server";

import { db } from "@/lib/prisma";

/**
 * Get experiences for the public website timeline
 */
export async function getTimeline({
  limit = null,
  orderBy = "order",
  orderDirection = "asc"
} = {}) {
  try {
    // Build query options
    const options = {
      orderBy: {
        [orderBy]: orderDirection,
      },
    };
    
    // Add limit if specified
    if (limit) {
      options.take = limit;
    }
    
    // Execute query
    const experiences = await db.experience.findMany(options);
    
    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}