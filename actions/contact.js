"use server";

import { db } from "@/lib/prisma";
import { contactSchema } from "@/lib/validators";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Creates a new contact record from form submission
 * 
 * @param {Object} data - Contact form data
 * @returns {Object} The created contact or error object
 */
export async function createContact(data) {
  try {
    // Optional: Rate limiting to prevent spam
    const identifier = data.email || 'anonymous';
    const { success } = await rateLimit(identifier);
    
    if (!success) {
      return {
        error: "Rate limit exceeded. Please try again later.",
        status: 429
      };
    }

    // Validate data against schema
    const validatedData = contactSchema.parse(data);
    
    // Create the contact with status
    const contact = await db.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        status: "UNREAD" // Using the new status field
      },
    });

    // Optional: Send notification email to admin
    // await sendNotificationEmail(contact);
    
    // Revalidate any paths that show contact counts or lists
    revalidatePath("/admin/contacts");
    revalidatePath("/dashboard");
    
    return {
      success: true,
      data: contact,
      message: "Message sent successfully!"
    };
  } catch (error) {
    console.error("Error creating contact:", error);
    
    // Return appropriate error type
    if (error instanceof z.ZodError) {
      return {
        error: "Validation failed",
        details: error.format(),
        status: 400
      };
    }
    
    // Check for common database errors
    if (error.code === 'P2002') {
      return {
        error: "A constraint violation occurred.",
        status: 409
      };
    }
    
    // Generic error
    return {
      error: "Failed to send your message. Please try again later.",
      status: 500
    };
  }
}

/**
 * Optional helper function to send notification email
 * Uncomment and implement if needed
 */
/*
async function sendNotificationEmail(contact) {
  try {
    // Implementation depends on your email service
    // Example with a hypothetical email service:
    await emailService.send({
      to: "admin@yourdomain.com",
      subject: "New Contact Form Submission",
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Message:</strong> ${contact.message}</p>
        <p><strong>Time:</strong> ${contact.createdAt.toLocaleString()}</p>
      `
    });
  } catch (emailError) {
    // Log but don't fail the request if email sending fails
    console.error("Failed to send notification email:", emailError);
  }
}
*/