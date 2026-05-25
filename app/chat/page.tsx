"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Home,
  MessageSquareText,
  Send,
  Sparkles,
  Ticket as TicketIcon,
  Workflow
} from "lucide-react";
import { type Ticket as FlowTicket } from "@/lib/data";
import {
  analyzeMessage,
  priorityStyles,
  sentimentStyles,
  type SmartFlowResult
} from "@/lib/smartflow";
import { createTicketId } from "@/lib/ticket-store";
import { useLocalTickets } from "@/lib/use-local-tickets";

type ChatEvent = {
  id: string;
  sender: "customer" | "ai" | "system";
  text: string;
  meta?: string;
};

type ProcessingPhase = "idle" | "analyzing" | "typing" | "creating" | "success";

const smoothEase = [0.16, 1, 0.3, 1] as const;
const exampleMessage = "My order is damaged and I want refund immediately.";

const delay = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

function TypingDots() {
  return (
    <div className="inline-flex items-center gap-1.5">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
          transition={{ duration: 0.9, delay: dot * 0.14, repeat: Infinity, ease: "easeInOut" }}
          className="h-2 w-2 rounded-full bg-cyanline"
        />
      ))}
    </div>
  );
}

function AnimatedBadge({
  label,
  value,
  className
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <motion.div
      key={`${label}-${value}`}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: smoothEase }}
      className={`relative overflow-hidden rounded-2xl border p-4 ${className}`}
    >
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-white/10 blur-xl"
        animate={{ x: ["-120%", "240%"] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <p className="relative text-xs">{label}</p>
      <p className="relative mt-1 text-lg font-semibold">{value}</p>
    </motion.div>
  );
}

function PhaseBanner({ phase }: { phase: ProcessingPhase }) {
  const label =
    phase === "analyzing"
      ? "Analyzing customer message..."
      : phase === "typing"
        ? "AI is typing a customer-ready reply..."
        : phase === "creating"
          ? "Creating support ticket..."
          : phase === "success"
            ? "Ticket created and saved locally"
            : "Ready for local SmartFlow analysis";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink/70 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-cyanline/25 bg-cyanline/10 text-cyanline">
            {phase === "success" ? <CheckCircle2 className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
          </div>
          <div>
            <p className="text-sm font-semibold text-frost">{label}</p>
            <p className="text-xs text-slate">Rules engine active, APIs disabled</p>
          </div>
        </div>
        {(phase === "analyzing" || phase === "typing" || phase === "creating") && <TypingDots />}
      </div>
      {(phase === "analyzing" || phase === "creating") && (
        <motion.div
          className="absolute bottom-0 left-0 h-px w-1/2 bg-gradient-to-r from-transparent via-cyanline to-mint"
          animate={{ x: ["-100%", "240%"] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

function ChatBubble({ event }: { event: ChatEvent }) {
  const isCustomer = event.sender === "customer";
  const isSystem = event.sender === "system";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.34, ease: smoothEase }}
      className={`flex ${isCustomer ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[86%] rounded-3xl border px-4 py-3 shadow-cyan ${
          isSystem
            ? "border-amber/20 bg-amber/10 text-amber"
            : isCustomer
              ? "border-cyanline/20 bg-cyanline/12 text-frost"
              : "border-white/10 bg-white/[0.07] text-frost"
        }`}
      >
        {event.meta && <p className="mb-1 text-xs text-slate">{event.meta}</p>}
        <p className="text-sm leading-6">{event.text}</p>
      </div>
    </motion.div>
  );
}

export default function ChatPage() {
  const [customer, setCustomer] = useState("Maya Chen");
  const [message, setMessage] = useState(exampleMessage);
  const [phase, setPhase] = useState<ProcessingPhase>("idle");
  const [toast, setToast] = useState("");
  const [highlightedTicketId, setHighlightedTicketId] = useState("");
  const [activeAnalysis, setActiveAnalysis] = useState<SmartFlowResult | null>(null);
  const [chatEvents, setChatEvents] = useState<ChatEvent[]>([
    {
      id: "welcome",
      sender: "ai",
      meta: "FlowDesk AI",
      text: "Send a support message and I will analyze sentiment, priority, category, reply, and ticket creation locally."
    }
  ]);
  const endOfChatRef = useRef<HTMLDivElement | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const { tickets, createTicket: saveCreatedTicket } = useLocalTickets();
  const latestTicket = tickets[0];

  const preview = useMemo(() => analyzeMessage(message || exampleMessage), [message]);
  const liveAnalysis = activeAnalysis ?? preview;
  const isProcessing = phase === "analyzing" || phase === "typing" || phase === "creating";

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatEvents, phase]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  async function handleCreateTicket() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isProcessing) {
      return;
    }

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    const customerName = customer.trim() || "Guest Customer";
    const analysis = analyzeMessage(trimmedMessage);
    const ticketId = createTicketId(tickets);

    setToast("");
    setHighlightedTicketId("");
    setActiveAnalysis(null);
    setPhase("analyzing");
    setChatEvents((current) => [
      ...current,
      {
        id: `${ticketId}-customer`,
        sender: "customer",
        meta: customerName,
        text: trimmedMessage
      }
    ]);

    await delay(850);
    setActiveAnalysis(analysis);
    setPhase("typing");

    await delay(950);
    setChatEvents((current) => [
      ...current,
      {
        id: `${ticketId}-ai`,
        sender: "ai",
        meta: "Generated AI reply",
        text: analysis.aiReply
      }
    ]);
    setPhase("creating");

    await delay(620);
    const nextTicket: FlowTicket = {
      ...analysis,
      id: ticketId,
      customer: customerName,
      issue: trimmedMessage,
      status: "Open",
      createdAt: "Just now"
    };

    saveCreatedTicket(nextTicket);
    setHighlightedTicketId(ticketId);
    setChatEvents((current) => [
      ...current,
      {
        id: `${ticketId}-system`,
        sender: "system",
        meta: "Ticket created",
        text: `${ticketId} saved to localStorage and synced with Dashboard and Tickets.`
      }
    ]);
    setPhase("success");
    setMessage("");
    setToast(`${ticketId} created successfully`);

    toastTimerRef.current = window.setTimeout(() => {
      setToast("");
      setPhase("idle");
    }, 2600);
  }

  return (
    <main className="min-h-screen bg-ink px-4 py-6 text-frost sm:px-6 lg:px-8">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.32, ease: smoothEase }}
            className="fixed right-4 top-4 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-mint/30 bg-ink/92 px-4 py-3 text-sm font-semibold text-mint shadow-mint backdrop-blur-2xl"
          >
            <CheckCircle2 className="h-5 w-5" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl">
        <nav className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.055] px-4 py-3 backdrop-blur-2xl">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-frost text-ink shadow-cyan">
              <Workflow className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm font-bold">FlowDesk AI</span>
          </Link>
          <div className="flex items-center gap-3 text-sm text-slate">
            <Link className="inline-flex items-center gap-2 transition hover:text-frost" href="/">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link className="inline-flex items-center gap-2 transition hover:text-frost" href="/dashboard">
              <TicketIcon className="h-4 w-4" />
              Dashboard
            </Link>
          </div>
        </nav>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="glass-panel rounded-3xl p-5 sm:p-6"
          >
            <div className="mb-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyanline/20 bg-cyanline/10 px-3 py-1 text-xs font-semibold text-cyanline">
                <Sparkles className="h-3.5 w-3.5" />
                Premium customer chat
              </div>
              <h1 className="text-3xl font-semibold sm:text-5xl">Support message automation</h1>
              <p className="mt-4 text-sm leading-6 text-slate sm:text-base">
                FlowDesk analyzes the message, simulates an AI typing response, and creates a support ticket in localStorage for the dashboard.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-cyanline/10 text-cyanline">
                  <MessageSquareText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Customer input</p>
                  <p className="text-xs text-slate">Local demo mode</p>
                </div>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm text-slate">Customer name</span>
                <input
                  value={customer}
                  onChange={(event) => setCustomer(event.target.value)}
                  disabled={isProcessing}
                  className="min-h-12 w-full rounded-2xl border border-white/10 bg-ink/70 px-4 text-sm text-frost outline-none transition placeholder:text-slate/55 focus:border-cyanline/50 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Customer name"
                />
              </label>

              <label className="mt-4 block">
                <span className="mb-2 block text-sm text-slate">Support message</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  disabled={isProcessing}
                  className="min-h-40 w-full resize-none rounded-2xl border border-white/10 bg-ink/70 p-4 text-sm leading-6 text-frost outline-none transition placeholder:text-slate/55 focus:border-cyanline/50 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder={exampleMessage}
                />
              </label>

              <button
                type="button"
                onClick={handleCreateTicket}
                disabled={isProcessing || !message.trim()}
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-frost px-5 text-sm font-semibold text-ink transition hover:bg-mint disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-slate"
              >
                {isProcessing ? "Processing..." : "Send Message"}
                <Send className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <AnimatedBadge label="Sentiment" value={liveAnalysis.sentiment} className={sentimentStyles(liveAnalysis.sentiment)} />
              <AnimatedBadge label="Priority" value={liveAnalysis.priority} className={priorityStyles(liveAnalysis.priority)} />
              <AnimatedBadge label="Category" value={liveAnalysis.category} className="border-violet/30 bg-violet/12 text-violet" />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: smoothEase }}
            className="grid gap-4"
          >
            <div className="glass-panel surface-grid relative overflow-hidden rounded-3xl p-5 sm:p-6">
              <div className="absolute left-0 right-0 top-0 h-16 animate-scan bg-gradient-to-b from-cyanline/0 via-cyanline/18 to-cyanline/0" />
              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate">SmartFlow Engine</p>
                    <h2 className="mt-1 text-2xl font-semibold">Live analysis</h2>
                  </div>
                  <Bot className="h-6 w-6 text-cyanline" />
                </div>

                <PhaseBanner phase={phase} />

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    ["Rule matched", liveAnalysis.category],
                    ["AI confidence", `${liveAnalysis.confidence}%`],
                    ["Ticket status", phase === "creating" ? "Creating" : phase === "success" ? "Created" : "Ready"],
                    ["Storage source", "localStorage"]
                  ].map(([label, value]) => (
                    <motion.div
                      key={`${label}-${value}`}
                      layout
                      initial={{ opacity: 0.7, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-2xl border border-white/10 bg-ink/70 p-4"
                    >
                      <p className="text-xs text-slate">{label}</p>
                      <p className="mt-2 text-lg font-semibold">{value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 rounded-3xl border border-mint/20 bg-mint/10 p-5">
                  <div className="mb-3 flex items-center gap-2 text-mint">
                    <CheckCircle2 className="h-5 w-5" />
                    <p className="text-sm font-semibold">Generated AI reply</p>
                  </div>
                  <AnimatePresence mode="wait">
                    {phase === "typing" ? (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-3 text-sm text-frost"
                      >
                        FlowDesk AI is typing
                        <TypingDots />
                      </motion.div>
                    ) : (
                      <motion.p
                        key={liveAnalysis.aiReply}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="text-sm leading-7 text-frost"
                      >
                        {liveAnalysis.aiReply}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-5 sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate">Live conversation</p>
                  <h2 className="mt-1 text-2xl font-semibold">Auto-scrolling chat</h2>
                </div>
                <Link
                  href="/tickets"
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-frost transition hover:border-cyanline/40"
                >
                  Tickets page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="max-h-[360px] overflow-y-auto rounded-3xl border border-white/10 bg-ink/55 p-4">
                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {chatEvents.map((event) => (
                      <ChatBubble key={event.id} event={event} />
                    ))}
                    {phase === "typing" && (
                      <motion.div
                        key="typing-bubble"
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex justify-start"
                      >
                        <div className="rounded-3xl border border-white/10 bg-white/[0.07] px-4 py-3">
                          <TypingDots />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={endOfChatRef} />
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-5 sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate">Ticket Management System</p>
                  <h2 className="mt-1 text-2xl font-semibold">Latest stored ticket</h2>
                </div>
                <Link
                  href="/dashboard"
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-frost transition hover:border-cyanline/40"
                >
                  Admin view
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <AnimatePresence mode="wait">
                {latestTicket ? (
                  <motion.div
                    key={latestTicket.id}
                    initial={{ opacity: 0, y: 18, scale: 0.97 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: latestTicket.id === highlightedTicketId ? [1, 1.02, 1] : 1
                    }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: smoothEase }}
                    className={`rounded-3xl border p-5 ${
                      latestTicket.id === highlightedTicketId
                        ? "border-mint/35 bg-mint/10 shadow-mint"
                        : "border-cyanline/20 bg-cyanline/10"
                    }`}
                  >
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <p className="font-semibold text-cyanline">{latestTicket.id}</p>
                      <motion.span
                        key={latestTicket.priority}
                        initial={{ opacity: 0, scale: 0.86 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityStyles(latestTicket.priority)}`}
                      >
                        {latestTicket.priority}
                      </motion.span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-xs text-slate">Customer</p>
                        <p className="mt-1 font-semibold">{latestTicket.customer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate">Category</p>
                        <p className="mt-1 font-semibold">{latestTicket.category}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-xs text-slate">Issue</p>
                        <p className="mt-1 text-sm leading-6">{latestTicket.issue}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-xs text-slate">AI reply</p>
                        <p className="mt-1 text-sm leading-6 text-slate">{latestTicket.aiReply}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="rounded-3xl border border-white/10 bg-white/[0.045] p-8 text-center"
                  >
                    <TicketIcon className="mx-auto h-8 w-8 text-cyanline" />
                    <p className="mt-4 font-semibold">No ticket created yet</p>
                    <p className="mt-2 text-sm leading-6 text-slate">
                      Submit the sample message to see FlowDesk create a support ticket instantly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {tickets.length > 1 && (
                <div className="mt-4 space-y-2">
                  {tickets.slice(1, 4).map((ticket) => (
                    <motion.div
                      key={ticket.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">{ticket.id}</p>
                        <p className="text-xs text-slate">{ticket.category}</p>
                      </div>
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${sentimentStyles(ticket.sentiment)}`}>
                        {ticket.sentiment}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
