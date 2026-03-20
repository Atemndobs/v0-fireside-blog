import { TransactionForm } from "@/components/finance/TransactionForm"

export default function AddTransactionPage() {
  return (
    <div>
      <h2 className="text-sm font-medium text-foreground mb-4">
        Add Transaction
      </h2>
      <div className="border border-dashed border-border p-4">
        <TransactionForm />
      </div>
    </div>
  )
}
