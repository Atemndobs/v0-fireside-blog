"use server"

import { getPayload } from "payload"
import config from "@payload-config"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const transactionSchema = z.object({
  type: z.enum(["contribution", "expense"]),
  amount: z.coerce.number().positive("Amount must be positive"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum([
    "shield-editor",
    "lumiere-editor",
    "promotion",
    "guest-data",
    "contribution",
    "other",
  ]),
  person: z.enum(["atem", "anyang", "eunice"]),
  notes: z.string().optional(),
})

export type ActionState = {
  success: boolean
  error?: string
}

function parseFormData(formData: FormData) {
  return {
    type: formData.get("type"),
    amount: formData.get("amount"),
    date: formData.get("date"),
    description: formData.get("description"),
    category: formData.get("category"),
    person: formData.get("person"),
    notes: formData.get("notes") || undefined,
  }
}

export async function createTransaction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = transactionSchema.safeParse(parseFormData(formData))
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => e.message).join(", "),
    }
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: "transactions",
      data: {
        ...parsed.data,
        isHistorical: false,
      },
    })

    revalidatePath("/finance")
    revalidatePath("/finance/history")

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create transaction",
    }
  }
}

export async function updateTransaction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get("id") as string
  if (!id) return { success: false, error: "Missing transaction ID" }

  const parsed = transactionSchema.safeParse(parseFormData(formData))
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => e.message).join(", "),
    }
  }

  try {
    const payload = await getPayload({ config })
    await payload.update({
      collection: "transactions",
      id: Number(id),
      data: parsed.data,
    })

    revalidatePath("/finance")
    revalidatePath("/finance/history")

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update transaction",
    }
  }
}

export async function deleteTransaction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get("id") as string
  if (!id) return { success: false, error: "Missing transaction ID" }

  try {
    const payload = await getPayload({ config })
    await payload.delete({
      collection: "transactions",
      id: Number(id),
    })

    revalidatePath("/finance")
    revalidatePath("/finance/history")

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete transaction",
    }
  }
}
