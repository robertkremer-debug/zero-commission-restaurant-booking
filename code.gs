/**
 * ZERO-COMMISSION BOOKING SYSTEM
 * Webhook receiver for automated restaurant reservations.
 */

const CALENDAR_ID = 'restaurant@gmail.com'; // Replace with actual Calendar ID
const RESTAURANT_NAME = 'Da Gennaro'; // Replace with the client's name

/**
 * Handles incoming POST requests (Webhooks from Tally.so or other forms)
 */
function doPost(e) {
  try {
    // Parse the incoming JSON payload
    const payload = JSON.parse(e.postData.contents);
    
    // Extract reservation details (Adjust mapping based on your form fields)
    const guestName = payload.data.name || "Guest";
    const guestEmail = payload.data.email;
    const dateStr = payload.data.date; // Expected format: YYYY-MM-DD
    const timeStr = payload.data.time; // Expected format: HH:MM
    const partySize = payload.data.party_size || 2;
    
    // Create Date objects for Calendar event
    const startDateTime = new Date(`${dateStr}T${timeStr}:00`);
    const endDateTime = new Date(startDateTime.getTime() + (2 * 60 * 60 * 1000)); // Default 2 hours
    
    // 1. Create Calendar Event
    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    const eventTitle = `Reservering: ${guestName} (${partySize} pers.)`;
    calendar.createEvent(eventTitle, startDateTime, endDateTime, {
      description: `Email: ${guestEmail}\nAantal personen: ${partySize}`
    });
    
    // 2. Send Confirmation Email to Guest
    const emailSubject = `Bevestiging reservering bij ${RESTAURANT_NAME}`;
    const emailBody = `Beste ${guestName},\n\nBedankt voor je reservering bij ${RESTAURANT_NAME}!\n\nWe hebben een tafel voor ${partySize} personen gereserveerd op ${dateStr} om ${timeStr}.\n\nTot dan!\n\nMet vriendelijke groet,\nTeam ${RESTAURANT_NAME}`;
    
    GmailApp.sendEmail(guestEmail, emailSubject, emailBody);
    
    // Return success response to the webhook provider
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error if parsing or execution fails
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
