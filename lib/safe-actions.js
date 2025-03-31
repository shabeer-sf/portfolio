// lib/safe-actions.js
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';

/**
 * Wrapper for authenticated admin server actions that handles errors consistently
 * @param {Function} action - The server action to execute
 * @returns {Function} A wrapped server action with error handling
 */
export function withAdminAuth(action) {
  return async function authAction(...args) {
    try {
      // The 'cookies' function is only called when the action is actually executed
      // not during static analysis or build time
      const session = await getServerSession(authOptions);
      
      if (!session) {
        throw new Error("Unauthenticated");
      }
      
      if (session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
      }
      
      return await action(...args);
    } catch (error) {
      console.error("Admin action error:", error);
      return { error: error.message || "An error occurred" };
    }
  };
}

/**
 * Wrapper for public server actions that handles errors consistently
 * @param {Function} action - The server action to execute
 * @returns {Function} A wrapped server action with error handling
 */
export function withErrorHandling(action) {
  return async function safeAction(...args) {
    try {
      return await action(...args);
    } catch (error) {
      console.error("Action error:", error);
      return { error: error.message || "An error occurred" };
    }
  };
}