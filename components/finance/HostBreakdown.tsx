interface HostData {
  person: string
  total: number
}

interface HostBreakdownProps {
  data: HostData[]
}

export function HostBreakdown({ data }: HostBreakdownProps) {
  const maxTotal = Math.max(...data.map((d) => d.total), 1)

  return (
    <div className="border border-dashed border-border p-3 space-y-2">
      {data.map(({ person, total }) => (
        <div key={person} className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground capitalize w-16">
            {person}
          </span>
          <div className="flex-1 h-4 bg-muted rounded-sm overflow-hidden">
            <div
              className="h-full bg-primary rounded-sm transition-all"
              style={{ width: `${(total / maxTotal) * 100}%` }}
            />
          </div>
          <span className="font-mono text-xs text-foreground w-16 text-right">
            ${total.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}
