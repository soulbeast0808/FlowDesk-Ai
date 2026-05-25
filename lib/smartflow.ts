export type Sentiment = "Angry" | "Frustrated" | "Neutral" | "Positive";
export type Priority = "High" | "Medium" | "Low";
export type Category = "Refund" | "Sales Lead" | "Support" | "Operations";

export type SmartFlowResult = {
  sentiment: Sentiment;
  priority: Priority;
  category: Category;
  aiReply: string;
  confidence: number;
};

const includesAny = (message: string, words: string[]) =>
  words.some((word) => message.includes(word));

export function analyzeMessage(rawMessage: string): SmartFlowResult {
  const message = rawMessage.toLowerCase();
  const category: Category = includesAny(message, ["refund", "return", "damaged"])
    ? "Refund"
    : includesAny(message, ["buy", "pricing", "bulk", "quote"])
      ? "Sales Lead"
      : includesAny(message, ["invoice", "order", "shipping", "delivery"])
        ? "Operations"
        : "Support";

  const sentiment: Sentiment = includesAny(message, ["angry", "worst", "bad", "terrible", "damaged"])
    ? "Angry"
    : includesAny(message, ["late", "issue", "problem", "stuck", "refund"])
      ? "Frustrated"
      : includesAny(message, ["thanks", "great", "love", "happy"])
        ? "Positive"
        : "Neutral";

  const priority: Priority = includesAny(message, ["urgent", "immediately", "asap", "now", "angry"])
    ? "High"
    : includesAny(message, ["refund", "damaged", "late", "pricing"])
      ? "Medium"
      : "Low";

  const aiReply =
    category === "Refund"
      ? "I am sorry this happened. I have opened a priority refund case, captured the issue details, and routed it to the refunds queue for fast review."
      : category === "Sales Lead"
        ? "Thanks for reaching out. I have created a sales lead and prepared a pricing follow-up so our team can respond with the right package options."
        : priority === "High"
          ? "I understand this is urgent. I have created a high-priority support ticket and alerted the operations team for immediate follow-up."
          : "Thanks for the details. I have created a support ticket and will keep the team updated with the next best action.";

  const confidence = priority === "High" || category !== "Support" ? 94 : 86;

  return {
    sentiment,
    priority,
    category,
    aiReply,
    confidence
  };
}

export function priorityStyles(priority: Priority) {
  if (priority === "High") {
    return "border-rose/30 bg-rose/12 text-rose";
  }

  if (priority === "Medium") {
    return "border-amber/30 bg-amber/12 text-amber";
  }

  return "border-mint/30 bg-mint/12 text-mint";
}

export function sentimentStyles(sentiment: Sentiment) {
  if (sentiment === "Angry") {
    return "border-rose/30 bg-rose/12 text-rose";
  }

  if (sentiment === "Frustrated") {
    return "border-amber/30 bg-amber/12 text-amber";
  }

  if (sentiment === "Positive") {
    return "border-mint/30 bg-mint/12 text-mint";
  }

  return "border-cyanline/30 bg-cyanline/12 text-cyanline";
}
