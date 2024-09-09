import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const customers = await stripe.customers.list({ email: email, limit: 1 });

    if (customers.data.length === 0) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    const customer = customers.data[0];

    const sessions = await stripe.checkout.sessions.list({
      customer: customer.id,
      limit: 1,
    });

    if (sessions.data.length === 0) {
      return NextResponse.json(
        { error: 'No session found for this customer' },
        { status: 404 }
      );
    }

    const sessionId = sessions.data[0].id;
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    const returnUrl = 'http://localhost:3000/';

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });

    const portalUrl = portalSession.url;

    return NextResponse.json({ portalUrl });
  } catch (error) {
    console.error('Error getting Stripe session ID:', error);
    return NextResponse.json(
      { error: 'Failed to get Stripe session ID' },
      { status: 500 }
    );
  }
}
