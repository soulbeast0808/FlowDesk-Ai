"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  Check,
  CirclePlay,
  DatabaseZap,
  Gauge,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap
} from "lucide-react";
import { workflowNodes } from "@/lib/data";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: smoothEase }
};

const features = [
  {
    icon: BrainCircuit,
    title: "AI employee execution",
    text: "FlowDesk reads requests, decides next actions, drafts replies, and creates tickets without waiting on manual triage."
  },
  {
    icon: DatabaseZap,
    title: "Business memory",
    text: "Customer context, workflow history, and support patterns become a living operating layer for the team."
  },
  {
    icon: ShieldCheck,
    title: "Enterprise guardrails",
    text: "Role-aware routing, approval checkpoints, and visible AI reasoning keep automation under control."
  },
  {
    icon: ChartNoAxesCombined,
    title: "Operational analytics",
    text: "Track tickets, sentiment, urgent issues, automation throughput, and customer impact from one dashboard."
  }
];

const plans = [
  {
    name: "Starter",
    price: "$49",
    text: "For founders and lean teams proving AI support automation.",
    perks: ["3 workflows", "Support chat demo", "Ticket automation", "Basic analytics"]
  },
  {
    name: "Growth",
    price: "$149",
    text: "For teams that need an AI employee across support and revenue.",
    perks: ["Unlimited dummy workflows", "AI insights panel", "Priority detection", "Team dashboard"],
    featured: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    text: "For companies preparing secure AI operations at scale.",
    perks: ["Supabase-ready architecture", "Approval gates", "Audit-ready activity", "Groq-ready engine"]
  }
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyanline/20 bg-cyanline/10 px-3 py-1 text-xs font-semibold text-cyanline">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function CtaLink({
  href,
  children,
  variant = "primary",
  icon
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon: React.ReactNode;
}) {
  const base =
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyanline/70 focus:ring-offset-2 focus:ring-offset-ink";
  const styles =
    variant === "primary"
      ? "bg-frost text-ink shadow-cyan hover:bg-cyanline"
      : "border border-white/14 bg-white/8 text-frost backdrop-blur-xl hover:border-mint/50 hover:bg-mint/10";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {icon}
      {children}
    </Link>
  );
}

function ProductScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease: smoothEase }}
      className="relative mx-auto w-full max-w-2xl lg:max-w-none"
    >
      <div className="absolute inset-x-6 -top-4 h-px bg-gradient-to-r from-transparent via-cyanline/80 to-transparent" />
      <div className="glass-panel relative overflow-hidden rounded-3xl p-3 shadow-cyan">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(85,230,255,0.12),transparent_32%,rgba(248,189,87,0.08)_62%,transparent)]" />
        <div className="relative rounded-2xl border border-white/10 bg-ink/78 p-4 md:p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-cyanline/30 bg-cyanline/10 text-cyanline">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-frost">FlowDesk Command</p>
                <p className="text-xs text-slate">AI support employee online</p>
              </div>
            </div>
            <div className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
              Live
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-3">
              {["Refund queue", "Sales lead", "Sentiment alert"].map((item, index) => (
                <motion.div
                  key={item}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 4.5,
                    delay: index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-3"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-frost">{item}</span>
                    <span className="text-[0.68rem] text-mint">Automating</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyanline to-mint"
                      initial={{ width: "24%" }}
                      animate={{ width: ["36%", "84%", "58%"] }}
                      transition={{
                        duration: 5,
                        delay: index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="surface-grid relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <div className="absolute left-0 right-0 top-0 h-12 animate-scan bg-gradient-to-b from-cyanline/0 via-cyanline/20 to-cyanline/0" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-ink/62 p-3">
                    <p className="text-xs text-slate">Tickets triaged</p>
                    <p className="mt-2 text-2xl font-semibold text-frost">1,284</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-ink/62 p-3">
                    <p className="text-xs text-slate">AI confidence</p>
                    <p className="mt-2 text-2xl font-semibold text-mint">94%</p>
                  </div>
                </div>
                <div className="my-5 space-y-3">
                  {workflowNodes.slice(0, 4).map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-cyanline/30 bg-cyanline/10 text-[0.7rem] font-bold text-cyanline">
                        {index + 1}
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyanline to-transparent animate-glow" />
                      <span className="w-24 text-right text-xs text-slate">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-amber/20 bg-amber/10 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-amber">Next action</span>
                    <span className="text-xs text-frost">Create urgent ticket</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-ink text-frost">
      <section className="relative px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-10 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.055] px-4 py-3 backdrop-blur-2xl md:mb-12">
            <Link href="/" className="flex items-center gap-2" aria-label="FlowDesk AI home">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-frost text-ink shadow-cyan">
                <Workflow className="h-4.5 w-4.5" />
              </span>
              <span className="text-sm font-bold text-frost">FlowDesk AI</span>
            </Link>
            <div className="hidden items-center gap-6 text-sm text-slate md:flex">
              <a className="transition hover:text-frost" href="#features">
                Features
              </a>
              <a className="transition hover:text-frost" href="#demo">
                Demo
              </a>
              <a className="transition hover:text-frost" href="#pricing">
                Pricing
              </a>
              <Link className="transition hover:text-frost" href="/dashboard">
                Dashboard
              </Link>
            </div>
            <Link
              href="/signup"
              className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-frost transition hover:border-cyanline/40 hover:bg-cyanline/10"
            >
              Sign up
            </Link>
          </nav>

          <div className="grid min-h-[76svh] items-center gap-10 pb-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 lg:pb-14">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: smoothEase }}
              className="max-w-3xl"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint">
                <Gauge className="h-3.5 w-3.5" />
                AI operations at executive speed
              </div>
              <h1 className="text-5xl font-semibold leading-[0.98] text-frost sm:text-6xl lg:text-7xl">
                AI Employee for Business Automation
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate sm:text-lg">
                FlowDesk AI analyzes customer messages, creates support tickets, generates replies, and gives operators a dashboard that feels ready for the boardroom.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaLink href="/signup" icon={<ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />}>
                  Get Started
                </CtaLink>
                <CtaLink href="/chat" variant="secondary" icon={<CirclePlay className="h-4 w-4" />}>
                  Live Demo
                </CtaLink>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-6">
                {[
                  ["4.8M", "tasks automated"],
                  ["62%", "faster handoffs"],
                  ["24/7", "AI coverage"]
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-semibold text-frost">{value}</p>
                    <p className="mt-1 text-xs leading-5 text-slate">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <ProductScene />
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="max-w-3xl">
            <SectionLabel>Features</SectionLabel>
            <h2 className="text-3xl font-semibold text-frost sm:text-5xl">
              Support automation that behaves like a real teammate.
            </h2>
          </motion.div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  {...fadeUp}
                  transition={{ duration: 0.65, delay: index * 0.08, ease: smoothEase }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="glass-panel rounded-2xl p-5 transition-shadow hover:shadow-cyan"
                >
                  <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl border border-cyanline/20 bg-cyanline/10 text-cyanline">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-frost">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">{feature.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="demo" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <motion.div {...fadeUp}>
            <SectionLabel>AI Workflow Demo</SectionLabel>
            <h2 className="text-3xl font-semibold text-frost sm:text-5xl">
              From angry message to routed ticket in seconds.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate">
              The SmartFlow engine classifies sentiment, detects the issue category, scores priority, generates a useful reply, and opens the ticket automatically.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="glass-panel relative overflow-hidden rounded-3xl p-4">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-mint to-transparent" />
            <div className="grid gap-3 md:grid-cols-2">
              {workflowNodes.map((step, index) => (
                <motion.div
                  key={step}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.055] p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-cyanline/10 text-sm font-bold text-cyanline">
                      {index + 1}
                    </span>
                    <Zap className="h-4 w-4 text-amber" />
                  </div>
                  <h3 className="text-sm font-semibold text-frost">{step}</h3>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyanline via-mint to-amber"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${58 + index * 6}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: index * 0.08 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <SectionLabel>Analytics</SectionLabel>
              <h2 className="text-3xl font-semibold text-frost sm:text-5xl">
                Enterprise dashboard visibility from day one.
              </h2>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-4 text-sm font-semibold text-mint transition hover:bg-mint/15"
            >
              Open dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <motion.div {...fadeUp} className="glass-panel surface-grid min-h-[420px] rounded-3xl p-5">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate">Automation throughput</p>
                  <p className="mt-2 text-3xl font-semibold text-frost">892 live workflows</p>
                </div>
                <Network className="h-6 w-6 text-cyanline" />
              </div>
              <div className="flex h-64 items-end gap-3">
                {[38, 58, 44, 72, 66, 86, 76, 94, 88, 100, 92, 108].map((height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    whileInView={{ height }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.045, ease: smoothEase }}
                    className="flex-1 rounded-t-xl bg-gradient-to-t from-cyanline/30 via-mint/65 to-frost shadow-mint"
                  />
                ))}
              </div>
            </motion.div>

            <div className="grid gap-4">
              {[
                ["Total tickets", "1,284", "Across support and revenue"],
                ["Urgent cases", "27", "Queued with high priority"],
                ["Resolved", "91%", "Closed within SLA"]
              ].map(([title, value, text], index) => (
                <motion.div
                  key={title}
                  {...fadeUp}
                  transition={{ duration: 0.65, delay: index * 0.08, ease: smoothEase }}
                  className="glass-panel rounded-2xl p-5"
                >
                  <p className="text-sm text-slate">{title}</p>
                  <p className="mt-2 text-4xl font-semibold text-frost">{value}</p>
                  <p className="mt-3 text-sm text-slate">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <SectionLabel>Customer Proof</SectionLabel>
            <h2 className="text-3xl font-semibold text-frost sm:text-5xl">
              Built for the kind of demo investors remember.
            </h2>
          </motion.div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Maya Chen", "COO, Lumos Cloud", "FlowDesk feels like a support lead, operations analyst, and revenue assistant inside one polished control room."],
              ["Andre Miles", "VP Revenue, Northstar Labs", "The sales lead detection is exactly what our team needed for high-intent support conversations."],
              ["Priya Sethi", "Head of Automation, AtlasWorks", "It has the executive polish and practical workflow depth we expect from serious enterprise software."]
            ].map(([name, role, quote], index) => (
              <motion.article
                key={name}
                {...fadeUp}
                transition={{ duration: 0.65, delay: index * 0.08, ease: smoothEase }}
                whileHover={{ y: -6 }}
                className="glass-panel rounded-2xl p-6"
              >
                <MessageSquareText className="h-5 w-5 text-amber" />
                <p className="mt-5 text-base leading-7 text-frost">"{quote}"</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-semibold text-frost">{name}</p>
                  <p className="mt-1 text-sm text-slate">{role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="text-3xl font-semibold text-frost sm:text-5xl">
              Start with dummy workflows, scale into real automation.
            </h2>
          </motion.div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                {...fadeUp}
                transition={{ duration: 0.65, delay: index * 0.08, ease: smoothEase }}
                whileHover={{ y: -8 }}
                className={`relative rounded-3xl p-6 ${
                  plan.featured
                    ? "border border-cyanline/40 bg-cyanline/10 shadow-cyan"
                    : "glass-panel"
                }`}
              >
                {plan.featured && (
                  <div className="absolute right-5 top-5 rounded-full border border-cyanline/30 bg-cyanline/10 px-3 py-1 text-xs font-semibold text-cyanline">
                    Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold text-frost">{plan.name}</h3>
                <p className="mt-4 text-sm leading-6 text-slate">{plan.text}</p>
                <div className="mt-7 flex items-end gap-2">
                  <span className="text-5xl font-semibold text-frost">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="pb-2 text-sm text-slate">/mo</span>}
                </div>
                <Link
                  href="/signup"
                  className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-frost px-5 text-sm font-semibold text-ink transition hover:bg-mint"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="mt-7 space-y-3">
                  {plan.perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-3 text-sm text-slate">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-mint/12 text-mint">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {perk}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-frost text-ink">
                <Layers3 className="h-4.5 w-4.5" />
              </span>
              <span className="font-bold text-frost">FlowDesk AI</span>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate">
              AI-powered business support and workflow automation for teams that want a product demo with real operational depth.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate">
            <Link className="transition hover:text-frost" href="/login">
              Login
            </Link>
            <Link className="transition hover:text-frost" href="/dashboard">
              Dashboard
            </Link>
            <Link className="transition hover:text-frost" href="/chat">
              Chat demo
            </Link>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <LockKeyhole className="h-3.5 w-3.5" />
              Supabase-ready
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
