import { DailyQuote } from "@/types/dashboard";

const FINANCIAL_QUOTES: DailyQuote[] = [
  {
    text: "Do not save what is left after spending, but spend what is left after saving.",
    author: "Warren Buffett",
    category: "Saving",
  },
  {
    text: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
    category: "Investment",
  },
  {
    text: "The budget is not just a collection of numbers, but an expression of our values and aspirations.",
    author: "Jacob Lew",
    category: "Discipline",
  },
  {
    text: "You must gain control over your money or the lack of it will forever control you.",
    author: "Dave Ramsey",
    category: "Money Management",
  },
  {
    text: "It's not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for.",
    author: "Robert Kiyosaki",
    category: "Wealth Building",
  },
  {
    text: "Doing well with money has a little to do with how smart you are and a lot to do with how you behave.",
    author: "Morgan Housel",
    category: "Financial Psychology",
  },
  {
    text: "A penny saved is a penny earned.",
    author: "Benjamin Franklin",
    category: "Saving",
  },
  {
    text: "Beware of little expenses; a small leak will sink a great ship.",
    author: "Benjamin Franklin",
    category: "Discipline",
  },
  {
    text: "The goal isn't more money. The goal is living life on your own terms.",
    author: "Chris Brogan",
    category: "Risk Management",
  },
  {
    text: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make.",
    author: "Dave Ramsey",
    category: "Money Management",
  },
];

/**
 * Returns a daily financial quote which remains consistent for the entire day.
 */
export function getDailyQuote(): DailyQuote {
  const now = new Date();
  // Get day of year index: e.g. difference from start of year divided by milliseconds in a day
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayIndex = Math.floor(diff / oneDay);
  
  const quoteIndex = dayIndex % FINANCIAL_QUOTES.length;
  return FINANCIAL_QUOTES[quoteIndex];
}
