"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Mail, UserRound, Workflow } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-ink px-4 py-8 text-frost sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-10 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-frost text-ink shadow-cyan">
              <Workflow className="h-5 w-5" />
            </span>
            <span className="font-bold">FlowDesk AI</span>
          </Link>
          <Link className="text-sm font-semibold text-slate transition hover:text-frost" href="/login">
            Login
          </Link>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: smoothEase }}
          >
            <p className="text-sm font-semibold text-mint">Launch workspace</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
              Put an AI employee in your support workflow.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate">
              Create a demo workspace with ticket automation, sentiment analytics, customer replies, and an executive dashboard.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["2 min", "workspace setup"],
                ["94%", "demo confidence"],
                ["0 APIs", "dummy data mode"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="mt-1 text-xs text-slate">{label}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: smoothEase }}
            className="glass-panel rounded-3xl p-6 sm:p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold">Create account</h2>
              <p className="mt-3 text-sm leading-6 text-slate">
                Your demo will open directly into the admin dashboard.
              </p>
            </div>

            <form className="grid gap-4">
              <label className="block">
                <span className="mb-2 block text-sm text-slate">Name</span>
                <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 transition focus-within:border-cyanline/50">
                  <UserRound className="h-4 w-4 text-cyanline" />
                  <input
                    className="w-full bg-transparent text-sm text-frost outline-none placeholder:text-slate/55"
                    placeholder="Avery Stone"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate">Work email</span>
                <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 transition focus-within:border-cyanline/50">
                  <Mail className="h-4 w-4 text-cyanline" />
                  <input
                    className="w-full bg-transparent text-sm text-frost outline-none placeholder:text-slate/55"
                    type="email"
                    placeholder="avery@company.com"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate">Company</span>
                <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 transition focus-within:border-cyanline/50">
                  <Building2 className="h-4 w-4 text-cyanline" />
                  <input
                    className="w-full bg-transparent text-sm text-frost outline-none placeholder:text-slate/55"
                    placeholder="Northstar Labs"
                  />
                </span>
              </label>

              <Link
                href="/dashboard"
                className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-frost px-5 text-sm font-semibold text-ink transition hover:bg-mint"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </form>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
