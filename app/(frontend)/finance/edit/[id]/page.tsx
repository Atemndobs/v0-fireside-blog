import { getPayload } from "payload"
import config from "@payload-config"
import { notFound } from "next/navigation"
import { TransactionForm } from "@/components/finance/TransactionForm"
import { DeleteButton } from "@/components/finance/DeleteButton"

export default async function EditTransactionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const payload = await getPayload({ config })

  let transaction
  try {
    transaction = await payload.findByID({
      collection: "transactions",
      id: Number(id),
    })
  } catch {
    notFound()
  }

  if (!transaction) notFound()

  const data = {
    id: String(transaction.id),
    type: transaction.type as "contribution" | "expense",
    amount: transaction.amount || 0,
    date: transaction.date,
    description: transaction.description,
    category: transaction.category || "other",
    person: transaction.person,
    notes: transaction.notes,
  }

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-medium text-foreground">Edit Transaction</h2>
      <TransactionForm initialData={data} mode="edit" />
      <div className="border-t border-dashed border-border pt-4">
        <DeleteButton id={data.id} />
      </div>
    </div>
  )
}
