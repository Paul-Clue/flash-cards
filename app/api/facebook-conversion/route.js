
import { NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';

const API_VERSION = 'v20.0';
const PIXEL_ID = process.env.FACEBOOK_PIXEL_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

function hashData(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export async function POST(request) {

  const { eventName, eventSourceUrl, userData, customData } = await request.json();

  // const eventId = crypto.randomBytes(16).toString('hex');
  const eventId = crypto.randomUUID();

  console.log('Received event data:', { eventName, eventSourceUrl, userData, customData });

  console.log('client_user_agent:', request.headers.get('user-agent'));

  const eventData = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    event_source_url: eventSourceUrl,
    action_source: 'website',
    user_data: {
      em: userData.email ? [hashData(userData.email.toLowerCase())] : undefined,
      client_user_agent: request.headers.get('user-agent'),
    },
    custom_data: customData,
  };

  const payload = {
    data: [eventData],
    // test_event_code: 'TEST97372',
  };

  try {
    const response = await axios.post(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`,
      payload,
      {
        params: { access_token: ACCESS_TOKEN },
      }
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Event received successfully',
      data: { eventName, eventSourceUrl, userData, customData }
    });
  } catch (error) {
    console.error('Error sending event to Facebook:', error.response?.data || error.message);
    return NextResponse.json({ success: false, error: 'Failed to send event to Facebook' });
  }
}

// export default handler;