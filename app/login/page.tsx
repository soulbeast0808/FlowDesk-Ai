"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, Mail, Workflow } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-ink text-frost lg:grid-cols-[0.95fr_1.05fr]">
      <section className="flex items-center px-4 py-10 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="mx-auto w-full max-w-md"
        >
          <Link href="/" className="mb-10 inline-flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-frost text-ink shadow-cyan">
              <Workflow className="h-5 w-5" />
            </span>
            <span className="font-bold">FlowDesk AI</span>
          </Link>

          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-semibold text-cyanline">Admin access</p>
              <h1 className="mt-3 text-3xl font-semibold">Welcome back</h1>
              <p className="mt-3 text-sm leading-6 text-slate">
                Enter the FlowDesk control room and review support automation in real time.
              </p>
            </div>

            <form className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm text-slate">Email</span>
                <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 transition focus-within:border-cyanline/50">
                  <Mail className="h-4 w-4 text-cyanline" />
                  <input
                    className="w-full bg-transparent text-sm text-frost outline-none placeholder:text-slate/55"
                    type="email"
                    placeholder="admin@flowdesk.ai"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate">Password</span>
                <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 transition focus-within:border-cyanline/50">
                  <LockKeyhole className="h-4 w-4 text-cyanline" />
                  <input
                    className="w-full bg-transparent text-sm text-frost outline-none placeholder:text-slate/55"
                    type="password"
                    placeholder="••••••••"
                  />
                </span>
              </label>

              <Link
                href="/dashboard"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-frost px-5 text-sm font-semibold text-ink transition hover:bg-cyanline"
              >
                Login
                <ArrowRight className="h-4 w-4" />
              </Link>
            </form>

            <p className="mt-6 text-center text-sm text-slate">
              New to FlowDesk?{" "}
              <Link className="font-semibold text-cyanline transition hover:text-mint" href="/signup">
                Create account
              </Link>
            </p>
          </div>
        </motion.div>
      </section>

      <section className="hidden overflow-hidden border-l border-white/10 bg-white/[0.035] p-8 lg:block">
        <div className="glass-panel surface-grid relative flex h-full min-h-[680px] items-center justify-center overflow-hidden rounded-3xl">
          <div className="absolute inset-x-12 top-16 h-px bg-gradient-to-r from-transparent via-cyanline to-transparent" />
          <div className="w-full max-w-xl p-8">
            <div className="mb-6 rounded-3xl border border-white/10 bg-ink/70 p-5">
              <p className="text-sm text-slate">Urgent queue</p>
              <p className="mt-3 text-4xl font-semibold">27</p>
              <div className="mt-5 h-2 rounded-full bg-white/10">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-rose via-amber to-mint" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Refund detected", "Reply drafted", "Ticket routed", "SLA protected"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-sm font-semibold">{item}</p>
                  <p className="mt-2 text-xs leading-5 text-slate">SmartFlow automation ready</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
