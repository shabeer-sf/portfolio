"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Get all project categories
 */
export async function getCategories({
  includeProjectCount = false,
  onlyActive = false
} = {}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const where = {};
    if (onlyActive) {
      where.isActive = true;
    }

    const categories = await db.projectCategory.findMany({
      where,
      orderBy: { order: "asc" },
      include: includeProjectCount ? {
        _count: {
          select: { projects: true }
        }
      } : undefined
    });

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

/**
 * Get a single category by ID
 */
export async function getCategory(id) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const category = await db.projectCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { projects: true }
        }
      }
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error("Failed to fetch category");
  }
}

/**
 * Create a new category
 */
export async function createCategory(data) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    // Generate slug from name if not provided
    const slug = data.slug || data.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const category = await db.projectCategory.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        color: data.color,
        icon: data.icon,
        order: data.order || 0,
        isActive: data.isActive !== undefined ? data.isActive : true
      }
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/projects");
    revalidatePath("/");

    return category;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category");
  }
}

/**
 * Update an existing category
 */
export async function updateCategory(id, data) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!id) {
      throw new Error("Category ID is required");
    }

    const category = await db.projectCategory.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug || data.name.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
        description: data.description,
        color: data.color,
        icon: data.icon,
        order: data.order,
        isActive: data.isActive
      }
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/projects");
    revalidatePath("/");

    return category;
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category");
  }
}

/**
 * Delete a category
 */
export async function deleteCategory(id) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!id) {
      throw new Error("Category ID is required");
    }

    // Check if category has projects
    const projectCount = await db.project.count({
      where: { categoryId: id }
    });

    if (projectCount > 0) {
      throw new Error(`Cannot delete category with ${projectCount} projects. Please reassign or delete projects first.`);
    }

    await db.projectCategory.delete({
      where: { id }
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/projects");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new Error(error.message || "Failed to delete category");
  }
}

/**
 * Get public categories for frontend (no auth required)
 */
export async function getPublicCategories() {
  try {
    const categories = await db.projectCategory.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { projects: true }
        }
      }
    });

    return categories;
  } catch (error) {
    console.error("Error fetching public categories:", error);
    return [];
  }
}