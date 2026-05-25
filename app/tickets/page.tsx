"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  CircleAlert,
  LayoutDashboard,
  MessageSquareText,
  Ticket,
  Workflow
} from "lucide-react";
import { useLocalTickets } from "@/lib/use-local-tickets";
import { priorityStyles, sentimentStyles } from "@/lib/smartflow";

const smoothEase = [0.16, 1, 0.3, 1] as const;

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Resolved"
      ? "border-mint/30 bg-mint/12 text-mint"
      : status === "Open"
        ? "border-rose/30 bg-rose/12 text-rose"
        : "border-amber/30 bg-amber/12 text-amber";

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${styles}`}>
      {status}
    </span>
  );
}

export default function TicketsPage() {
  const { tickets } = useLocalTickets();
  const totalTickets = tickets.length;
  const urgentTickets = tickets.filter((ticket) => ticket.priority === "High").length;
  const resolvedTickets = tickets.filter((ticket) => ticket.status === "Resolved").length;

  return (
    <main className="min-h-screen bg-ink px-4 py-6 text-frost sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.055] px-4 py-3 backdrop-blur-2xl">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-frost text-ink shadow-cyan">
              <Workflow className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm font-bold">FlowDesk AI</span>
          </Link>
          <div className="flex items-center gap-3 text-sm text-slate">
            <Link className="inline-flex items-center gap-2 transition hover:text-frost" href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link className="inline-flex items-center gap-2 transition hover:text-frost" href="/chat">
              <MessageSquareText className="h-4 w-4" />
              Chat
            </Link>
          </div>
        </nav>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <Link className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate transition hover:text-frost" href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Back to dashboard
            </Link>
            <h1 className="text-3xl font-semibold sm:text-5xl">Ticket management</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate sm:text-base">
              This page reads the same localStorage ticket source that chat writes to and dashboard summarizes.
            </p>
          </div>
          <Link
            href="/chat"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-frost px-4 text-sm font-semibold text-ink transition hover:bg-cyanline"
          >
            Create from chat
            <MessageSquareText className="h-4 w-4" />
          </Link>
        </motion.header>

        <div className="mb-4 grid gap-4 md:grid-cols-3">
          {[
            ["Total Tickets", totalTickets, Ticket, "text-cyanline"],
            ["Urgent Tickets", urgentTickets, CircleAlert, "text-rose"],
            ["Resolved Tickets", resolvedTickets, CheckCircle2, "text-mint"]
          ].map(([label, value, Icon, color], index) => {
            const MetricIcon = Icon as typeof Ticket;

            return (
              <motion.div
                key={label as string}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: index * 0.06, ease: smoothEase }}
                className="glass-panel rounded-3xl p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate">{label as string}</p>
                    <p className="mt-2 text-4xl font-semibold">{value as number}</p>
                  </div>
                  <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] ${color as string}`}>
                    <MetricIcon className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: smoothEase }}
          className="glass-panel overflow-hidden rounded-3xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div>
              <p className="text-sm text-slate">localStorage source</p>
              <h2 className="mt-1 text-xl font-semibold">All stored tickets</h2>
            </div>
            <Bot className="h-5 w-5 text-cyanline" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="bg-white/[0.035] text-xs text-slate">
                <tr>
                  <th className="px-5 py-4 font-medium">Ticket</th>
                  <th className="px-5 py-4 font-medium">Customer</th>
                  <th className="px-5 py-4 font-medium">Issue</th>
                  <th className="px-5 py-4 font-medium">Category</th>
                  <th className="px-5 py-4 font-medium">Sentiment</th>
                  <th className="px-5 py-4 font-medium">Priority</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="transition hover:bg-white/[0.035]">
                    <td className="px-5 py-4 font-semibold text-cyanline">{ticket.id}</td>
                    <td className="px-5 py-4 text-frost">{ticket.customer}</td>
                    <td className="max-w-md px-5 py-4 text-slate">{ticket.issue}</td>
                    <td className="px-5 py-4 text-slate">{ticket.category}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${sentimentStyles(ticket.sentiment)}`}>
                        {ticket.sentiment}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityStyles(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={ticket.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
