"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Car,
  Calendar,
  HelpCircle,
  Phone,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  RefreshCw,
  Minus,
  Maximize2,
} from "lucide-react";

interface VehicleItem {
  id: number | string;
  name: string;
  brand: string;
  model?: string;
  category: string;
  image: string;
  horsepower: string;
  price: string;
  engine: string;
  year: number | string;
  slug: string;
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  vehicles?: VehicleItem[];
  suggestions?: string[];
  showBookingForm?: boolean;
  prefilledVehicle?: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "fleet" | "book" | "faqs">("chat");

  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  // Booking Form State
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingVehicle, setBookingVehicle] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Welcome to Cyber Torque Concierge. I am your private automotive advisor. How may I assist your journey today?",
      timestamp: "Just now",
      suggestions: [
        "Browse Available Fleet ???",
        "Book a Test Drive / Consultation ??",
        "How does customisation work? ???",
        "Import, Shipping & Customs ??",
        "Browse Available Fleet",
        "Book a Test Drive / Consultation",
        "How does customisation work?",
        "Import, Shipping and Customs",
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || loading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMessageId,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text || "I am at your service. Let me know what you would like to know about our fleet or services.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        vehicles: data.vehicles,
        suggestions: data.suggestions,
        showBookingForm: data.showBookingForm,
        prefilledVehicle: data.prefilledVehicle,
      };

      if (data.prefilledVehicle) {
        setBookingVehicle(data.prefilledVehicle);
      }

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("[CHATBOT ERROR]:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "I am having temporary trouble connecting to the network. You can reach our team 24/7 at concierge@cybertorque.com or +91 98765 43210.",
         timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestions: ["Try again", "View Fleet ???"],
          
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim()) return;

    setBookingLoading(true);
    try {
      const response = await fetch("/api/chatbot/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingName.trim(),
          phone: bookingPhone.trim(),
          email: bookingEmail.trim(),
          vehicle: bookingVehicle.trim() || "General Consultation",
          notes: bookingNotes.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBookingSubmitted(true);
        setBookingMessage(data.message);

        // Add confirmation message to chat stream
        setMessages((prev) => [
          ...prev,
          {
            id: `booking-success-${Date.now()}`,
            sender: "bot",
           text: `Lead successfully recorded! Thank you ${bookingName}. Our concierge team has received your booking inquiry for ${bookingVehicle || "a consultation"} and will contact you at ${bookingPhone} within 24 hours.`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
             suggestions: ["Browse more cars", "How does delivery work?"],
          },
        ]);
      } else {
        alert(data.error || "Unable to save booking. Please check your contact number.");
        alert(data.error || "Unable to record booking. Please verify your contact number.");
      }
    } catch (err) {
      console.error("[BOOKING ERROR]:", err);
      alert("Something went wrong while booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const openBookingForVehicle = (vehicleName: string) => {
    setBookingVehicle(vehicleName);
    setBookingSubmitted(false);
    setActiveTab("book");
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: "Conversation refreshed. How can Cyber Torque assist you?",
        timestamp: "Just now",
        suggestions: [
          "Browse Available Fleet ???",
          "Book a Test Drive ??",
          "Vehicle Customisation ???",
          "Track Order ??",
          "Browse Available Fleet",
          "Book a Test Drive",
          "Vehicle Customisation",
          "Track My Vehicle",
        ],
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* -- TRIGGER BUTTON -- */}
      {/* TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-[#c6a35d]/60 bg-[#121212] text-[#c6a35d] shadow-[0_10px_35px_rgba(0,0,0,0.65),0_0_20px_rgba(198,163,93,0.3)] transition-all duration-500 hover:scale-110 hover:border-[#c6a35d] hover:bg-[#1c1c1c]"
          aria-label="Open Cyber Torque Concierge Chat"
        >
          {/* Subtle pulsating outer aura */}
          <span className="absolute -inset-1 animate-ping rounded-full bg-[#c6a35d]/20 opacity-75" />

          {/* Icon */}
          <span className="relative flex items-center justify-center">
            <MessageSquare size={24} strokeWidth={1.75} />
            <Sparkles size={11} className="absolute -top-1 -right-1 text-[#e5c986]" />
          </span>

          {/* Unread dot */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c6a35d] text-[10px] font-bold text-black shadow-md">
              {unreadCount}
            </span>
          )}

          {/* Tooltip on hover */}
          <div className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded border border-[#c6a35d]/40 bg-[#141414] px-3 py-1.5 font-stint text-[10px] uppercase tracking-[0.14em] text-white shadow-xl group-hover:block">
            Concierge & Booking <span className="text-[#c6a35d]">· Online</span>
            Concierge & Booking <span className="text-[#c6a35d]">- Online</span>
          </div>
        </button>
      )}

      {/* -- CHAT WINDOW -- */}
      {/* CHAT WINDOW */}
      {isOpen && (
        <div
          className={`relative flex w-[370px] sm:w-[410px] max-w-[calc(100vw-2rem)] flex-col border border-[#c6a35d]/40 bg-[#121212] text-white shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(198,163,93,0.15)] transition-all duration-300 ${
            isMinimized ? "h-14" : "h-[600px] max-h-[85vh]"
          }`}
          style={{
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Gold Accent Corners */}
          <div className="pointer-events-none absolute -top-1 -left-1 h-3 w-3 border-l-2 border-t-2 border-[#c6a35d]" />
          <div className="pointer-events-none absolute -top-1 -right-1 h-3 w-3 border-r-2 border-t-2 border-[#c6a35d]" />

          {/* -- HEADER -- */}
          {/* HEADER */}
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#181818] px-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#c6a35d]/50 bg-[#222]">
                <Car size={16} className="text-[#c6a35d]" />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[#181818]" />
              </div>
              <div>
                <h3 className="font-stint text-[12px] uppercase tracking-[0.12em] text-[#c6a35d]">
                  Cyber Torque
                </h3>
                <p className="font-sans text-[10px] text-white/50">Concierge & Inquiries</p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className="rounded p-1.5 text-white/40 hover:bg-white/5 hover:text-white"
              >
                <RefreshCw size={13} />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand" : "Minimize"}
                className="rounded p-1.5 text-white/40 hover:bg-white/5 hover:text-white"
              >
                {isMinimized ? <Maximize2 size={13} /> : <Minus size={14} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="rounded p-1.5 text-white/40 hover:bg-white/5 hover:text-white"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* If not minimized, show body */}
          {!isMinimized && (
            <>
              {/* -- SUB-HEADER TABS -- */}
              {/* SUB-HEADER TABS */}
              <div className="flex border-b border-white/10 bg-[#141414] text-[10px] uppercase tracking-[0.1em]">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 font-stint transition ${
                    activeTab === "chat"
                      ? "border-b-2 border-[#c6a35d] bg-white/5 text-[#c6a35d]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <MessageSquare size={12} /> Chat
                </button>
                <button
                  onClick={() => {
                    setActiveTab("chat");
                    handleSendMessage("Show me vehicles in the fleet");
                  }}
                  className="flex flex-1 items-center justify-center gap-1.5 py-2.5 font-stint text-white/50 transition hover:text-white"
                >
                  <Car size={12} /> Fleet
                </button>
                <button
                  onClick={() => setActiveTab("book")}
                  className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 font-stint transition ${
                    activeTab === "book"
                      ? "border-b-2 border-[#c6a35d] bg-white/5 text-[#c6a35d]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <Calendar size={12} /> Book
                </button>
                <button
                  onClick={() => {
                    setActiveTab("chat");
                    handleSendMessage("Frequently Asked Questions");
                  }}
                  className="flex flex-1 items-center justify-center gap-1.5 py-2.5 font-stint text-white/50 transition hover:text-white"
                >
                  <HelpCircle size={12} /> FAQs
                </button>
              </div>

              {/* -- TAB CONTENT: BOOKING TAB -- */}
              {/* TAB CONTENT: BOOKING TAB */}
              {activeTab === "book" ? (
                <div className="flex flex-1 flex-col overflow-y-auto p-5 text-sm">
                  <div className="mb-4 border-b border-white/10 pb-3">
                    <span className="font-stint text-[9px] uppercase tracking-[0.18em] text-[#c6a35d]">
                      Private Concierge
                    </span>
                    <h4 className="mt-1 font-stint text-lg uppercase text-white">
                      Request a Booking or Viewing
                    </h4>
                    <p className="mt-1 text-xs text-white/60">
                      Provide your name and contact details. We will schedule a private consultation and confirm vehicle availability.
                    </p>
                  </div>

                  {bookingSubmitted ? (
                    <div className="my-auto flex flex-col items-center justify-center rounded border border-[#c6a35d]/40 bg-[#181818] p-6 text-center">
                      <CheckCircle2 size={36} className="text-[#c6a35d]" />
                      <h5 className="mt-3 font-stint text-base uppercase text-white">
                        Inquiry Received
                      </h5>
                      <p className="mt-2 text-xs leading-5 text-white/70">
                        {bookingMessage || "Thank you. Our team will contact you shortly to confirm your booking."}
                      </p>
                      <div className="mt-5 flex gap-2">
                        <button
                          onClick={() => {
                            setBookingSubmitted(false);
                            setActiveTab("chat");
                          }}
                          className="border border-white/20 px-4 py-2 font-stint text-[10px] uppercase text-white hover:border-[#c6a35d]"
                        >
                          Return to Chat
                        </button>
                        <button
                          onClick={() => {
                            setBookingSubmitted(false);
                            setBookingVehicle("");
                          }}
                          className="bg-[#c6a35d] px-4 py-2 font-stint text-[10px] uppercase text-black hover:bg-[#d9b870]"
                        >
                          New Booking
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="flex flex-col gap-3">
                      <div>
                        <label className="font-stint text-[9px] uppercase tracking-wider text-white/60">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="mt-1 w-full border border-white/20 bg-[#1a1a1a] px-3 py-2 text-xs text-white outline-none focus:border-[#c6a35d]"
                        />
                      </div>

                      <div>
                        <label className="font-stint text-[9px] uppercase tracking-wider text-white/60">
                          Phone Number / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="mt-1 w-full border border-white/20 bg-[#1a1a1a] px-3 py-2 text-xs text-white outline-none focus:border-[#c6a35d]"
                        />
                      </div>

                      <div>
                        <label className="font-stint text-[9px] uppercase tracking-wider text-white/60">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          placeholder="you@domain.com"
                          className="mt-1 w-full border border-white/20 bg-[#1a1a1a] px-3 py-2 text-xs text-white outline-none focus:border-[#c6a35d]"
                        />
                      </div>

                      <div>
                        <label className="font-stint text-[9px] uppercase tracking-wider text-white/60">
                          Vehicle of Interest
                        </label>
                        <input
                          type="text"
                          value={bookingVehicle}
                          onChange={(e) => setBookingVehicle(e.target.value)}
                          placeholder="e.g. Ford Mustang / General Consultation"
                          className="mt-1 w-full border border-white/20 bg-[#1a1a1a] px-3 py-2 text-xs text-white outline-none focus:border-[#c6a35d]"
                        />
                      </div>

                      <div>
                        <label className="font-stint text-[9px] uppercase tracking-wider text-white/60">
                          Special Requests / Preferred Date
                        </label>
                        <textarea
                          rows={2}
                          value={bookingNotes}
                          onChange={(e) => setBookingNotes(e.target.value)}
                          placeholder="Any customisation preferences, test drive request, or timing..."
                          className="mt-1 w-full resize-none border border-white/20 bg-[#1a1a1a] px-3 py-2 text-xs text-white outline-none focus:border-[#c6a35d]"
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setActiveTab("chat")}
                          className="font-stint text-[10px] uppercase text-white/50 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={bookingLoading}
                          className="flex items-center gap-2 bg-[#c6a35d] px-5 py-2.5 font-stint text-[10px] uppercase tracking-[0.1em] text-black transition hover:bg-[#d9b870] disabled:opacity-50"
                        >
                          {bookingLoading ? (
                            "Processing..."
                          ) : (
                            <>
                              Submit Booking <ArrowUpRight size={13} />
                            </>
                          )}
                        </button>
                      </div>

                      <p className="mt-2 text-[9px] text-white/40">
                        * Leads are automatically captured and synchronized with our Google Sheets concierge integration.
                      </p>
                    </form>
                  )}
                </div>
              ) : (
                /* -- TAB CONTENT: CHAT TAB -- */
                /* TAB CONTENT: CHAT TAB */
                <div className="flex flex-1 flex-col overflow-hidden">
                  {/* Messages Feed */}
                  <div className="flex-1 space-y-4 overflow-y-auto p-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${
                          msg.sender === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        {/* Bubble */}
                        <div
                          className={`relative max-w-[85%] px-3.5 py-2.5 text-xs leading-relaxed ${
                            msg.sender === "user"
                              ? "border border-[#c6a35d]/60 bg-[#c6a35d] font-medium text-black"
                              : "border border-white/10 bg-[#1a1a1a] text-white/90"
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>
                          <span
                            className={`mt-1 block text-[8px] ${
                              msg.sender === "user" ? "text-black/60" : "text-white/40"
                            }`}
                          >
                            {msg.timestamp}
                          </span>
                        </div>

                        {/* Interactive Vehicles Gallery inside message */}
                        {msg.vehicles && msg.vehicles.length > 0 && (
                          <div className="mt-2.5 flex w-full flex-col gap-2">
                            {msg.vehicles.map((v) => (
                              <div
                                key={v.id}
                                className="flex gap-3 border border-white/15 bg-[#181818] p-2.5 transition hover:border-[#c6a35d]/50"
                              >
                                {v.image ? (
                                  <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-[#242424]">
                                    <Image
                                      src={v.image}
                                      alt={v.name}
                                      fill
                                      className="object-cover"
                                      sizes="80px"
                                    />
                                  </div>
                                ) : (
                                  <div className="flex h-16 w-20 shrink-0 items-center justify-center bg-[#242424] text-[#c6a35d]">
                                    <Car size={20} />
                                  </div>
                                )}

                                <div className="flex flex-1 flex-col justify-between overflow-hidden">
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <span className="font-stint text-[8px] uppercase tracking-wider text-[#c6a35d]">
                                        {v.brand}
                                      </span>
                                      <span className="font-stint text-[9px] text-white/60">
                                        {v.year}
                                      </span>
                                    </div>
                                    <h5 className="truncate font-stint text-xs uppercase text-white">
                                      {v.name}
                                    </h5>
                                    <p className="text-[10px] text-white/60">
                                      {v.horsepower} · {v.engine}
                                      {v.horsepower} - {v.engine}
                                    </p>
                                  </div>

                                  <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-1">
                                    <span className="font-stint text-[10px] text-[#c6a35d]">
                                      {v.price}
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                      <Link
                                        href={`/cars/${v.slug}`}
                                        target="_blank"
                                        className="font-stint text-[8px] uppercase tracking-wider text-white/70 hover:text-white"
                                      >
                                        Specs
                                      </Link>
                                      <button
                                        onClick={() => openBookingForVehicle(`${v.brand} ${v.name}`)}
                                        className="bg-[#c6a35d] px-2 py-0.5 font-stint text-[8px] uppercase tracking-wider text-black hover:bg-[#d9b870]"
                                      >
                                        Book
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Booking Prompt Trigger Button */}
                        {msg.showBookingForm && (
                          <div className="mt-2 w-full rounded border border-[#c6a35d]/40 bg-[#1c1c1c] p-3 text-center">
                            <p className="font-stint text-[10px] uppercase tracking-wider text-[#c6a35d]">
                              Ready to schedule?
                            </p>
                            <button
                              onClick={() => {
                                if (msg.prefilledVehicle) {
                                  setBookingVehicle(msg.prefilledVehicle);
                                }
                                setActiveTab("book");
                              }}
                              className="mt-2 flex w-full items-center justify-center gap-2 bg-[#c6a35d] py-1.5 font-stint text-[10px] uppercase text-black hover:bg-[#d9b870]"
                            >
                              <Calendar size={12} /> Complete Booking Form
                            </button>
                          </div>
                        )}

                        {/* Quick suggestions pills */}
                        {msg.suggestions && msg.suggestions.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {msg.suggestions.map((sug, i) => (
                              <button
                                key={i}
                                onClick={() => handleSendMessage(sug)}
                                className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[10px] text-white/80 transition hover:border-[#c6a35d] hover:bg-[#c6a35d]/10 hover:text-white"
                              >
                                {sug}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Typing Loader */}
                    {loading && (
                      <div className="flex items-center gap-1.5 px-3 py-2 text-xs text-white/40">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c6a35d]" />
                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c6a35d]"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c6a35d]"
                          style={{ animationDelay: "0.4s" }}
                        />
                        <span className="ml-1 text-[10px] font-stint uppercase tracking-widest text-white/40">
                          Concierge typing...
                        </span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* -- INPUT AREA -- */}
                  {/* INPUT AREA */}
                  <div className="border-t border-white/10 bg-[#161616] p-3">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ask about vehicles, prices, FAQs or booking..."
                        className="flex-1 border border-white/15 bg-[#1f1f1f] px-3 py-2 text-xs text-white outline-none placeholder:text-white/35 focus:border-[#c6a35d]"
                      />
                      <button
                        type="submit"
                        disabled={loading || !inputMessage.trim()}
                        className="flex h-8 w-8 items-center justify-center bg-[#c6a35d] text-black transition hover:bg-[#d9b870] disabled:opacity-40"
                        title="Send message"
                      >
                        <Send size={13} />
                      </button>
                    </form>
                    <div className="mt-2 flex items-center justify-between text-[9px] text-white/35">
                      <span>Powered by Cyber Torque Database</span>
                      <button
                        onClick={() => setActiveTab("book")}
                        className="font-stint uppercase tracking-wider text-[#c6a35d] hover:underline"
                      >
                        Direct Booking ??
                        Direct Booking
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
