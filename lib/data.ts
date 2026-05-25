import type { Category, Priority, Sentiment } from "./smartflow";

export type Ticket = {
  id: string;
  customer: string;
  issue: string;
  sentiment: Sentiment;
  priority: Priority;
  status: "Open" | "In Review" | "Resolved";
  category: Category;
  aiReply: string;
  createdAt: string;
};

export const initialTickets: Ticket[] = [
  {
    id: "FD-2048",
    customer: "Maya Chen",
    issue: "My order is damaged and I want refund immediately.",
    sentiment: "Angry",
    priority: "High",
    status: "Open",
    category: "Refund",
    aiReply:
      "I am sorry this happened. I have opened a priority refund case and routed it to the refunds queue for fast review.",
    createdAt: "2 min ago"
  },
  {
    id: "FD-2047",
    customer: "Andre Miles",
    issue: "We want bulk pricing for 80 seats and a yearly plan.",
    sentiment: "Neutral",
    priority: "Medium",
    status: "In Review",
    category: "Sales Lead",
    aiReply:
      "I have created a sales lead and prepared a pricing follow-up for the revenue team.",
    createdAt: "12 min ago"
  },
  {
    id: "FD-2046",
    customer: "Priya Sethi",
    issue: "Invoice sync is stuck for our finance workspace.",
    sentiment: "Frustrated",
    priority: "Medium",
    status: "In Review",
    category: "Operations",
    aiReply:
      "I have opened an operations ticket and attached the invoice sync context for review.",
    createdAt: "25 min ago"
  },
  {
    id: "FD-2045",
    customer: "Leo Park",
    issue: "Thanks, the last automation worked great. Can we add another route?",
    sentiment: "Positive",
    priority: "Low",
    status: "Resolved",
    category: "Support",
    aiReply:
      "I have logged the request and suggested a route expansion for the workflow owner.",
    createdAt: "1 hr ago"
  },
  {
    id: "FD-2044",
    customer: "Nora Patel",
    issue: "Worst delivery experience. The package arrived late and broken.",
    sentiment: "Angry",
    priority: "High",
    status: "Open",
    category: "Refund",
    aiReply:
      "I have escalated this case, captured the damaged delivery details, and queued a refund review.",
    createdAt: "2 hr ago"
  }
];

export const activityFeed = [
  "AI classified FD-2048 as Refund with High priority",
  "Revenue workflow created lead from pricing request",
  "Sentiment monitor flagged two angry conversations",
  "Refund queue SLA improved by 31%",
  "AI generated three customer-ready replies"
];

export const volumeData = [
  { day: "Mon", tickets: 38, resolved: 28 },
  { day: "Tue", tickets: 51, resolved: 41 },
  { day: "Wed", tickets: 44, resolved: 36 },
  { day: "Thu", tickets: 63, resolved: 55 },
  { day: "Fri", tickets: 58, resolved: 49 },
  { day: "Sat", tickets: 34, resolved: 30 },
  { day: "Sun", tickets: 42, resolved: 37 }
];

export const workflowNodes = [
  "Message received",
  "Sentiment analyzed",
  "Category detected",
  "Priority scored",
  "AI reply generated",
  "Ticket created"
];
