import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      email?: string;
      vehicle?: string;
      notes?: string;
    };

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const vehicle = typeof body.vehicle === "string" ? body.vehicle.trim() : "";
    const notes = typeof body.notes === "string" ? body.notes.trim() : "";

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and contact number are required." },
        { status: 400 }
      );
    }

    const bookingData = {
      name,
      phone,
      email: email || "Not provided",
      vehicle: vehicle || "General Consultation",
      notes: notes || "None",
      timestamp: new Date().toISOString(),
      source: "Cyber Torque Chatbot",
    };

    // =========================================================================
    // PLACEHOLDER: GOOGLE SHEETS / WEBHOOK INTEGRATION
    // -------------------------------------------------------------------------
    // To send this lead directly to your Google Sheet:
    // 1. In Google Sheets: Extensions > Apps Script > deploy as Web App (or use SheetDB/Zapier/Make).
    // 2. Add GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/... to your .env file.
    // =========================================================================
    const googleSheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (googleSheetWebhookUrl) {
      try {
        console.log("[CHATBOT BOOKING] Forwarding lead to Google Sheet webhook:", googleSheetWebhookUrl);
        const webhookResponse = await fetch(googleSheetWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (!webhookResponse.ok) {
          console.warn("[CHATBOT BOOKING] Google Sheet webhook returned status:", webhookResponse.status);
        } else {
          console.log("[CHATBOT BOOKING] Successfully sent lead to Google Sheet!");
        }
      } catch (webhookErr) {
        console.error("[CHATBOT BOOKING] Error calling Google Sheet webhook:", webhookErr);
      }
    } else {
      console.log("------------------------------------------------------------");
      console.log("[CHATBOT BOOKING - LEAD CAPTURED (PLACEHOLDER)]: ");
      console.log("Name:     ", bookingData.name);
      console.log("Phone:    ", bookingData.phone);
      console.log("Email:    ", bookingData.email);
      console.log("Vehicle:  ", bookingData.vehicle);
      console.log("Notes:    ", bookingData.notes);
      console.log("Timestamp:", bookingData.timestamp);
      console.log("Tip: Set GOOGLE_SHEET_WEBHOOK_URL in .env to sync leads automatically.");
      console.log("------------------------------------------------------------");
    }

    return NextResponse.json(
      {
        success: true,
        message: `Thank you, ${name}! Your booking request for ${vehicle || "a consultation"} has been received. Our concierge will contact you at ${phone} shortly.`,
        booking: bookingData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[CHATBOT BOOKING ERROR]:", error);
    return NextResponse.json(
      { error: "Unable to process booking at this time. Please try again." },
      { status: 500 }
    );
  }
}
