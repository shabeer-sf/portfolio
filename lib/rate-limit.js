/**
 * Simple rate limiting utility for Next.js server actions
 * This implementation uses an in-memory store for demonstration
 * For production, consider using Redis or another persistent store
 * 
 * @file lib/rate-limit.js
 */

// In-memory store for rate limiting
// Note: This will reset when the server restarts
// For production, use Redis or another persistent store
const rateLimitStore = new Map();

/**
 * Rate limiting configuration
 */
const RATE_LIMIT_CONFIG = {
  // Maximum number of requests in the time window
  MAX_REQUESTS: 5,
  // Time window in seconds
  WINDOW_MS: 60 * 1000, // 1 minute
  // How long to block if rate limit is exceeded (in ms)
  BLOCK_DURATION_MS: 5 * 60 * 1000, // 5 minutes
};

/**
 * Check if a request should be rate limited
 * 
 * @param {string} identifier - Unique identifier for the requester (IP, email, etc.)
 * @param {Object} options - Optional configuration to override defaults
 * @returns {Object} - Result with success flag and optional metadata
 */
export async function rateLimit(identifier, options = {}) {
  const config = { ...RATE_LIMIT_CONFIG, ...options };
  const now = Date.now();
  
  // Get or create record for this identifier
  const record = rateLimitStore.get(identifier) || {
    count: 0,
    resetAt: now + config.WINDOW_MS,
    blockedUntil: 0,
  };
  
  // Check if currently blocked
  if (record.blockedUntil > now) {
    const remainingBlockMs = record.blockedUntil - now;
    const remainingBlockMinutes = Math.ceil(remainingBlockMs / 60000);
    
    return {
      success: false,
      message: `Too many requests. Please try again in ${remainingBlockMinutes} minute${remainingBlockMinutes > 1 ? 's' : ''}.`,
      remainingMs: remainingBlockMs,
    };
  }
  
  // Reset count if window has expired
  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + config.WINDOW_MS;
  }
  
  // Increment count and check against limit
  record.count += 1;
  
  // Update store
  rateLimitStore.set(identifier, record);
  
  // Check if rate limit exceeded
  if (record.count > config.MAX_REQUESTS) {
    // Apply blocking
    record.blockedUntil = now + config.BLOCK_DURATION_MS;
    rateLimitStore.set(identifier, record);
    
    return {
      success: false,
      message: `Rate limit exceeded. Please try again later.`,
      remainingMs: config.BLOCK_DURATION_MS,
    };
  }
  
  // Return success with metadata
  return {
    success: true,
    currentCount: record.count,
    maxRequests: config.MAX_REQUESTS,
    remainingRequests: config.MAX_REQUESTS - record.count,
    resetsIn: record.resetAt - now,
  };
}

/**
 * Clear rate limit data for testing purposes
 * This should only be used in development
 */
export function clearRateLimitStore() {
  if (process.env.NODE_ENV !== 'production') {
    rateLimitStore.clear();
  }
}

/**
 * Get rate limit information for an identifier
 * Useful for debugging or displaying limits to users
 * 
 * @param {string} identifier - The unique identifier
 * @returns {Object|null} - Rate limit information or null if not found
 */
export function getRateLimitInfo(identifier) {
  if (!rateLimitStore.has(identifier)) {
    return null;
  }
  
  const record = rateLimitStore.get(identifier);
  const now = Date.now();
  
  return {
    isBlocked: record.blockedUntil > now,
    blockedUntil: record.blockedUntil > now ? new Date(record.blockedUntil) : null,
    requestCount: record.count,
    resetsAt: new Date(record.resetAt),
  };
}