# zero-commission-restaurant-booking

# Zero-Commission Restaurant Booking System 🍽️

A lightweight, open-source reservation automation workflow designed to free local hospitality businesses from high-commission platform monopolies (like TheFork). 

This project provides a serverless architecture using **Google Apps Script**, **Tally.so** (or any other form provider with webhooks), and the **Google Workspace APIs** (Calendar & Gmail) to handle automated bookings and confirmations.

## 🚀 The Architecture

Instead of a heavy SaaS backend, this system leverages tools local business owners already use daily:
1. **Frontend:** A clean, conversion-optimized form (e.g., Tally.so) embedded on the restaurant's website.
2. **Middleware (This Repo):** A Google Apps Script that receives a webhook when a form is submitted.
3. **Database & Notifications:** The script automatically parses the data, adds the reservation to the restaurant's Google Calendar, and sends a styled confirmation email to the guest via Gmail.

## 📦 Features

- **100% Commission-Free:** No per-seat fees or heavy monthly subscriptions.
- **Self-Hosted:** Runs entirely on the restaurant's own Google Workspace account.
- **Real-Time Calendar Sync:** Prevents double bookings by pushing directly to Google Calendar.
- **Automated Email Confirmations:** Instant communication with guests.

## 🛠️ Setup Instructions

### 1. Google Apps Script Setup
1. Go to [script.google.com](https://script.google.com/) and create a new project.
2. Copy the contents of `Code.gs` from this repository into the editor.
3. Update the `CALENDAR_ID` variable with the specific Google Calendar ID of the restaurant.
4. Deploy the script as a **Web App**:
   - Execute as: *Me*
   - Who has access: *Anyone*
5. Copy the generated Web App URL.

### 2. Form Setup (Tally.so / Typeform)
1. Create a form asking for: Name, Email, Date, Time, and Party Size.
2. Go to the integrations/webhooks section of your form builder.
3. Paste the Google Apps Script Web App URL to send a POST request upon submission.

## 🤝 Contributing

This project is aimed at web developers and local agencies building solutions for main street businesses. Pull requests for error handling, SMS integrations (via Twilio), or advanced calendar availability checks are highly welcome!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
