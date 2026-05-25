"use client";

import { useCallback, useEffect, useState } from "react";
import type { Ticket } from "./data";
import {
  addTicket,
  FLOWDESK_TICKETS_CHANGED,
  getTickets,
  saveTickets
} from "./ticket-store";

export function useLocalTickets() {
  const [tickets, setTicketsState] = useState<Ticket[]>([]);

  const refresh = useCallback(() => {
    setTicketsState(getTickets());
  }, []);

  useEffect(() => {
    refresh();

    window.addEventListener("storage", refresh);
    window.addEventListener(FLOWDESK_TICKETS_CHANGED, refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(FLOWDESK_TICKETS_CHANGED, refresh);
    };
  }, [refresh]);

  const replaceTickets = useCallback((nextTickets: Ticket[]) => {
    saveTickets(nextTickets);
    setTicketsState(nextTickets);
  }, []);

  const createTicket = useCallback((ticket: Ticket) => {
    const nextTickets = addTicket(ticket);
    setTicketsState(nextTickets);
    return nextTickets;
  }, []);

  return {
    tickets,
    refresh,
    replaceTickets,
    createTicket
  };
}
