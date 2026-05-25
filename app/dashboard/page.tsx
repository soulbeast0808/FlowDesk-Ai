"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  CheckCircle2,
  CircleAlert,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Sparkles,
  Ticket,
  Workflow
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  activityFeed,
  volumeData
} from "@/lib/data";
import { calculateSentimentData } from "@/lib/ticket-store";
import { useLocalTickets } from "@/lib/use-local-tickets";
import { priorityStyles, sentimentStyles } from "@/lib/smartflow";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Tickets", icon: Inbox, href: "/tickets" },
  { label: "Customer Chat", icon: MessageSquareText, href: "/chat" },
  { label: "Landing", icon: Home, href: "/" }
];

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

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

function ChartSkeleton() {
  return (
    <div className="flex h-full min-h-0 items-end gap-3">
      {[45, 70, 55, 88, 74, 96, 82].map((height, index) => (
        <div
          key={index}
          className="flex-1 rounded-t-xl bg-white/[0.07]"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const chartsReady = useMounted();
  const { tickets } = useLocalTickets();
  const totalTickets = tickets.length;
  const urgentTickets = tickets.filter((ticket) => ticket.priority === "High").length;
  const resolvedTickets = tickets.filter((ticket) => ticket.status === "Resolved").length;
  const sentimentData = calculateSentimentData(tickets);
  const metrics = [
    {
      label: "Total Tickets",
      value: totalTickets,
      detail: `${tickets.length} stored locally`,
      icon: Ticket,
      color: "text-cyanline"
    },
    {
      label: "Urgent Tickets",
      value: urgentTickets,
      detail: "High priority queue",
      icon: CircleAlert,
      color: "text-rose"
    },
    {
      label: "Resolved Tickets",
      value: resolvedTickets,
      detail: "Calculated from status",
      icon: CheckCircle2,
      color: "text-mint"
    }
  ];

  return (
    <main className="min-h-screen bg-ink text-frost">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/10 bg-white/[0.035] p-4 backdrop-blur-2xl lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between lg:block">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-frost text-ink shadow-cyan">
                <Workflow className="h-5 w-5" />
              </span>
              <span className="font-bold">FlowDesk AI</span>
            </Link>
            <Link className="text-sm text-slate transition hover:text-frost lg:hidden" href="/chat">
              Chat
            </Link>
          </div>

          <nav className="mt-6 flex gap-2 overflow-x-auto lg:block lg:space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex min-h-11 shrink-0 items-center gap-3 rounded-2xl px-4 text-sm font-semibold transition ${
                    item.active
                      ? "border border-cyanline/25 bg-cyanline/10 text-cyanline"
                      : "text-slate hover:bg-white/[0.06] hover:text-frost"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 hidden rounded-3xl border border-white/10 bg-white/[0.055] p-4 lg:block">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-mint/10 text-mint">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">AI Employee</p>
                <p className="text-xs text-slate">Online and routing</p>
              </div>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyanline to-mint" />
            </div>
          </div>

          <Link
            href="/login"
            className="mt-6 hidden min-h-11 items-center gap-3 rounded-2xl px-4 text-sm font-semibold text-slate transition hover:bg-white/[0.06] hover:text-frost lg:flex"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </aside>

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: smoothEase }}
              className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end"
            >
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
                  <Sparkles className="h-3.5 w-3.5" />
                  Admin dashboard
                </div>
                <h1 className="text-3xl font-semibold sm:text-5xl">Support operations cockpit</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate sm:text-base">
                  Monitor tickets, customer sentiment, AI decisions, and workflow activity from one polished enterprise surface.
                </p>
              </div>
              <Link
                href="/chat"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-frost px-4 text-sm font-semibold text-ink transition hover:bg-cyanline"
              >
                Test customer chat
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.header>

            <div className="grid gap-4 md:grid-cols-3">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;

                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: index * 0.08, ease: smoothEase }}
                    whileHover={{ y: -5 }}
                    className="glass-panel rounded-3xl p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate">{metric.label}</p>
                        <p className="mt-2 text-4xl font-semibold">{metric.value}</p>
                      </div>
                      <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] ${metric.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-slate">{metric.detail}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
                className="glass-panel rounded-3xl p-5"
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate">Ticket volume</p>
                    <h2 className="mt-1 text-xl font-semibold">Weekly automation flow</h2>
                  </div>
                  <ChartNoAxesCombined className="h-5 w-5 text-cyanline" />
                </div>
                <div className="h-[320px] min-w-0">
                  {chartsReady ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={volumeData} margin={{ left: -18, right: 12, top: 8, bottom: 0 }}>
                        <defs>
                          <linearGradient id="ticketsGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="5%" stopColor="#55e6ff" stopOpacity={0.42} />
                            <stop offset="95%" stopColor="#55e6ff" stopOpacity={0.02} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="rgba(237,247,255,0.08)" vertical={false} />
                        <XAxis dataKey="day" stroke="#a6b5c6" tickLine={false} axisLine={false} />
                        <YAxis stroke="#a6b5c6" tickLine={false} axisLine={false} />
                        <Tooltip
                          cursor={{ stroke: "rgba(85,230,255,0.22)" }}
                          contentStyle={{
                            background: "rgba(5,7,13,0.92)",
                            border: "1px solid rgba(237,247,255,0.14)",
                            borderRadius: "16px",
                            color: "#edf7ff"
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="tickets"
                          stroke="#55e6ff"
                          strokeWidth={3}
                          fill="url(#ticketsGradient)"
                        />
                        <Area
                          type="monotone"
                          dataKey="resolved"
                          stroke="#6ef7b4"
                          strokeWidth={3}
                          fill="transparent"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <ChartSkeleton />
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.16, ease: smoothEase }}
                className="glass-panel rounded-3xl p-5"
              >
                <div className="mb-6">
                  <p className="text-sm text-slate">Customer sentiment</p>
                  <h2 className="mt-1 text-xl font-semibold">Live conversation mix</h2>
                </div>
                <div className="h-[260px] min-w-0">
                  {chartsReady ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          innerRadius={68}
                          outerRadius={96}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {sentimentData.map((entry) => (
                            <Cell key={entry.name} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: "rgba(5,7,13,0.92)",
                            border: "1px solid rgba(237,247,255,0.14)",
                            borderRadius: "16px",
                            color: "#edf7ff"
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <ChartSkeleton />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {sentimentData.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.fill }} />
                        <span className="text-xs text-slate">{item.name}</span>
                      </div>
                      <p className="mt-2 text-lg font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_360px]">
              <motion.div
                id="tickets"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
                className="glass-panel overflow-hidden rounded-3xl"
              >
                <div className="flex items-center justify-between border-b border-white/10 p-5">
                  <div>
                    <p className="text-sm text-slate">Ticket table</p>
                    <h2 className="mt-1 text-xl font-semibold">AI-created support tickets</h2>
                  </div>
                  <Ticket className="h-5 w-5 text-cyanline" />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[880px] text-left text-sm">
                    <thead className="bg-white/[0.035] text-xs text-slate">
                      <tr>
                        <th className="px-5 py-4 font-medium">Ticket</th>
                        <th className="px-5 py-4 font-medium">Customer</th>
                        <th className="px-5 py-4 font-medium">Issue</th>
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
                          <td className="max-w-sm px-5 py-4 text-slate">{ticket.issue}</td>
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
              </motion.div>

              <div className="grid gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.24, ease: smoothEase }}
                  className="glass-panel rounded-3xl p-5"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-cyanline/10 text-cyanline">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate">AI Insights Panel</p>
                      <h2 className="text-lg font-semibold">Suggested actions</h2>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Route angry refund messages to the priority queue.",
                      "Create a sales follow-up for every bulk pricing mention.",
                      "Monitor damaged-order language for refund automation."
                    ].map((insight) => (
                      <div key={insight} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                        <p className="text-sm leading-6 text-slate">{insight}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.28, ease: smoothEase }}
                  className="glass-panel rounded-3xl p-5"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate">Live Activity Feed</p>
                      <h2 className="text-lg font-semibold">Automation stream</h2>
                    </div>
                    <Activity className="h-5 w-5 text-mint" />
                  </div>
                  <div className="space-y-3">
                    {activityFeed.map((item) => (
                      <div key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-mint shadow-mint" />
                        <p className="text-sm leading-6 text-slate">{item}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: smoothEase }}
              className="mt-4 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]"
            >
              <div className="glass-panel rounded-3xl p-5">
                <p className="text-sm text-slate">SmartFlow Engine</p>
                <h2 className="mt-1 text-xl font-semibold">Rule-based intelligence</h2>
                <div className="mt-5 space-y-3 text-sm text-slate">
                  {["refund maps to Refund", "angry, worst, bad maps to Angry sentiment", "urgent, immediately maps to High priority", "buy, pricing, bulk maps to Sales Lead"].map((rule) => (
                    <div key={rule} className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                      {rule}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-3xl p-5">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate">Resolution capacity</p>
                    <h2 className="mt-1 text-xl font-semibold">Resolved versus created</h2>
                  </div>
                  <Workflow className="h-5 w-5 text-amber" />
                </div>
                <div className="h-[260px] min-w-0">
                  {chartsReady ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={volumeData} margin={{ left: -18, right: 12, top: 8, bottom: 0 }}>
                        <CartesianGrid stroke="rgba(237,247,255,0.08)" vertical={false} />
                        <XAxis dataKey="day" stroke="#a6b5c6" tickLine={false} axisLine={false} />
                        <YAxis stroke="#a6b5c6" tickLine={false} axisLine={false} />
                        <Tooltip
                          cursor={{ fill: "rgba(237,247,255,0.04)" }}
                          contentStyle={{
                            background: "rgba(5,7,13,0.92)",
                            border: "1px solid rgba(237,247,255,0.14)",
                            borderRadius: "16px",
                            color: "#edf7ff"
                          }}
                        />
                        <Bar dataKey="tickets" fill="#55e6ff" radius={[10, 10, 0, 0]} />
                        <Bar dataKey="resolved" fill="#6ef7b4" radius={[10, 10, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <ChartSkeleton />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
