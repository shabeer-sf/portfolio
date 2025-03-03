"use server"
import { db } from "@/lib/prisma";

export async function getProjects2() {
    // console.log("search",search)
    try {
      // Fetch projects with pagination and search filter
      const projects = await db.project.findMany();
  
      // Get total count for pagination calculation
  
      return {
        projects: projects || [], // Ensure projects is never null
      };
    } catch (error) {
      console.error("Error fetching projects:", error.message);
      throw new Error("Failed to fetch projects. Please try again later.");
    }
  }