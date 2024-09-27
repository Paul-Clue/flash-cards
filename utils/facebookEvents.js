export async function sendFacebookEvent(eventName, eventSourceUrl, userData, customData) {
  try {
    const response = await fetch('/api/facebook-conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventSourceUrl,
        userData,
        customData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send event');
    }

    const result = await response.json();
    console.log('Event sent successfully:', result);
  } catch (error) {
    console.error('Error sending event:', error);
  }
}