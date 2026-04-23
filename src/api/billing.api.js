// src/api/billing.api.js

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * TODO (Backend): POST /api/billing/checkout
 * Body: { plan: 'monthly' | 'annual' }
 * Creates a Stripe Checkout Session via stripe_service.
 * Returns: { checkout_url: string } — redirect the user to this URL.
 */
export async function createCheckoutSession(plan = 'monthly') {
  console.warn('createCheckoutSession: backend not connected');
  return null;
}

/**
 * TODO (Backend): POST /api/billing/portal
 * Creates a Stripe Customer Portal session for the current user.
 * Returns: { portal_url: string } — redirect the user to this URL.
 */
export async function createPortalSession() {
  console.warn('createPortalSession: backend not connected');
  return null;
}

/**
 * TODO (Backend): GET /api/billing/status
 * Returns the current subscription status from Stripe (via Supabase cache).
 * Returns: { plan: 'free'|'premium', status: 'active'|'cancelled'|'past_due', period_end: string }
 */
export async function getBillingStatus() {
  console.warn('getBillingStatus: backend not connected');
  return { plan: 'free', status: 'active', period_end: null };
}
