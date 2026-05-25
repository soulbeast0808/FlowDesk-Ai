import { initialTickets, type Ticket } from "./data";
import type { Sentiment } from "./smartflow";

export const FLOWDESK_TICKETS_KEY = "flowdesk:tickets";
export const FLOWDESK_TICKETS_CHANGED = "flowdesk:tickets-changed";

const isBrowser = () => typeof window !== "undefined";

function broadcastTicketChange() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(FLOWDESK_TICKETS_CHANGED));
}

export function getTickets(): Ticket[] {
  if (!isBrowser()) {
    return [];
  }

  const stored = window.localStorage.getItem(FLOWDESK_TICKETS_KEY);

  if (!stored) {
    saveTickets(initialTickets);
    return initialTickets;
  }

  try {
    const parsed = JSON.parse(stored);

    if (Array.isArray(parsed)) {
      return parsed as Ticket[];
    }
  } catch {
    saveTickets(initialTickets);
    return initialTickets;
  }

  saveTickets(initialTickets);
  return initialTickets;
}

export function saveTickets(tickets: Ticket[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(FLOWDESK_TICKETS_KEY, JSON.stringify(tickets));
  broadcastTicketChange();
}

export function addTicket(ticket: Ticket) {
  const tickets = getTickets();
  const nextTickets = [ticket, ...tickets];
  saveTickets(nextTickets);
  return nextTickets;
}

export function createTicketId(tickets: Ticket[]) {
  const maxId = tickets.reduce((max, ticket) => {
    const numericId = Number(ticket.id.replace(/\D/g, ""));
    return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
  }, 2048);

  return `FD-${maxId + 1}`;
}

export function calculateSentimentData(tickets: Ticket[]) {
  const colors: Record<Sentiment, string> = {
    Angry: "#ff6f9d",
    Frustrated: "#f8bd57",
    Neutral: "#55e6ff",
    Positive: "#6ef7b4"
  };

  const sentiments = Object.keys(colors) as Sentiment[];

  if (tickets.length === 0) {
    return sentiments.map((name) => ({ name, value: 0, fill: colors[name] }));
  }

  return sentiments.map((name) => ({
    name,
    value: tickets.filter((ticket) => ticket.sentiment === name).length,
    fill: colors[name]
  }));
}
