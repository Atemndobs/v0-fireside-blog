/**
 * Fireside Tribe Finance Tracker
 * Convex queries and mutations for transaction management
 */

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all transactions with optional filtering
export const getAllTransactions = query({
  args: {
    limit: v.optional(v.number()),
    type: v.optional(v.union(v.literal("contribution"), v.literal("expense"))),
    person: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let transactionsQuery = ctx.db.query("transactions").order("desc");

    const transactions = await transactionsQuery.collect();

    // Apply filters
    let filtered = transactions;
    if (args.type) {
      filtered = filtered.filter((t) => t.type === args.type);
    }
    if (args.person) {
      filtered = filtered.filter((t) => t.person === args.person);
    }

    // Apply limit
    if (args.limit) {
      filtered = filtered.slice(0, args.limit);
    }

    return filtered;
  },
});

// Get transactions paginated
export const getTransactions = query({
  args: {
    paginationOpts: v.object({
      numItems: v.number(),
      cursor: v.union(v.string(), v.null()),
    }),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("transactions")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

// Get transaction by ID
export const getTransaction = query({
  args: { id: v.id("transactions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get financial summary
export const getFinancialSummary = query({
  args: {},
  handler: async (ctx) => {
    const transactions = await ctx.db.query("transactions").collect();

    const totalIn = transactions
      .filter((t) => t.type === "contribution")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalOut = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIn - totalOut;

    // Calculate monthly breakdown
    const monthlyMap = new Map<string, { income: number; expenses: number }>();
    for (const tx of transactions) {
      const date = new Date(tx.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const existing = monthlyMap.get(key) || { income: 0, expenses: 0 };

      if (tx.type === "contribution") {
        existing.income += tx.amount;
      } else {
        existing.expenses += tx.amount;
      }
      monthlyMap.set(key, existing);
    }

    const monthlySummary = Array.from(monthlyMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month,
        label: new Date(month + "-01").toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        }),
        income: data.income,
        expenses: data.expenses,
        net: data.income - data.expenses,
      }));

    return {
      totalIn,
      totalOut,
      balance,
      transactionCount: transactions.length,
      monthlySummary,
    };
  },
});

// Create transaction
export const createTransaction = mutation({
  args: {
    type: v.union(v.literal("contribution"), v.literal("expense")),
    amount: v.number(),
    date: v.string(),
    description: v.string(),
    category: v.string(),
    person: v.string(),
    notes: v.optional(v.string()),
    isHistorical: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    return await ctx.db.insert("transactions", {
      type: args.type,
      amount: args.amount,
      date: args.date,
      description: args.description,
      category: args.category,
      person: args.person,
      notes: args.notes || "",
      isHistorical: args.isHistorical || false,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update transaction
export const updateTransaction = mutation({
  args: {
    id: v.id("transactions"),
    type: v.optional(v.union(v.literal("contribution"), v.literal("expense"))),
    amount: v.optional(v.number()),
    date: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    person: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return id;
  },
});

// Delete transaction
export const deleteTransaction = mutation({
  args: { id: v.id("transactions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Bulk import transactions (for historical data)
export const bulkImportTransactions = mutation({
  args: {
    transactions: v.array(
      v.object({
        type: v.union(v.literal("contribution"), v.literal("expense")),
        amount: v.number(),
        date: v.string(),
        description: v.string(),
        category: v.string(),
        person: v.string(),
        notes: v.optional(v.string()),
        isHistorical: v.optional(v.boolean()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const ids = [];

    for (const tx of args.transactions) {
      const id = await ctx.db.insert("transactions", {
        ...tx,
        notes: tx.notes || "",
        isHistorical: tx.isHistorical || true,
        createdAt: now,
        updatedAt: now,
      });
      ids.push(id);
    }

    return { count: ids.length, ids };
  },
});
