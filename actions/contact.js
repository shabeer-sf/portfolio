"use server";

import { db } from "@/lib/prisma";

export async function createContact(data) {
  try {
    // console.log("Received data:", data);

    // Create the contact
    const contact = await db.contact.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });

    // console.log("Contact created successfully:", contact);
    return contact;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw new Error("Failed to create the contact. Please try again.");
  }
}
