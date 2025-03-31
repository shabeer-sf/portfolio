// actions/admin/contact.js
"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Get all contacts with optional filtering and pagination
 */
export async function getContacts({
  page = 1,
  limit = 10,
  status = null,
  sortBy = "createdAt",
  sortOrder = "desc"
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
    if (status) {
      where.status = status;
    }

    // Get contacts with pagination
    const contacts = await db.contact.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    });

    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contacts");
  }
}

/**
 * Get contact count with optional status filter
 */
export async function getContactCount(status = null) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    // Build where clause for filtering
    const where = {};
    if (status) {
      where.status = status;
    }

    // Get count
    const count = await db.contact.count({ where });
    return count;
  } catch (error) {
    console.error("Error counting contacts:", error);
    throw new Error("Failed to count contacts");
  }
}

/**
 * Get a single contact by ID
 */
export async function getContact(id) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!id) {
      throw new Error("Contact ID is required");
    }

    // Get contact by ID
    const contact = await db.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new Error("Contact not found");
    }

    return contact;
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw new Error("Failed to fetch contact");
  }
}

/**
 * Update a contact's status
 */
export async function updateContactStatus(id, status) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!id || !status) {
      throw new Error("Contact ID and status are required");
    }

    // Update the contact status
    const updatedContact = await db.contact.update({
      where: { id },
      data: { status },
    });

    // Revalidate contact listing pages
    revalidatePath("/admin/messages");
    revalidatePath("/admin");

    return updatedContact;
  } catch (error) {
    console.error("Error updating contact status:", error);
    throw new Error("Failed to update contact status");
  }
}

/**
 * Delete a contact
 */
export async function deleteContact(id) {
  try {
    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!id) {
      throw new Error("Contact ID is required");
    }

    // Delete the contact
    await db.contact.delete({
      where: { id },
    });

    // Revalidate contact listing pages
    revalidatePath("/admin/messages");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new Error("Failed to delete contact");
  }
}