import { InviteUserForm } from "@/components/admin/InviteUserForm"
import { ResendInviteButton } from "@/components/admin/ResendInviteButton"
import { getAdminUsers } from "@/lib/actions/users"
import { Badge } from "@/components/ui/badge"

const formatDate = (value: string | null) => {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export default async function TeamPage() {
  const usersResult = await getAdminUsers()
  const users = usersResult.data

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-400">Team</p>
        <h1 className="text-3xl font-black">The Fireside Tribe Team </h1>
        {/* <p className="mt-2 max-w-2xl text-slate-300">
          Send invite links to producers, editors, or contributors who need access to the Fireside admin. Invites use
          Supabase Auth and will redirect to the URL configured via <code>SUPABASE_INVITE_REDIRECT_URL</code>.
        </p> */}
      </div>

      <InviteUserForm />

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
        <p className="font-semibold">Invitation guide</p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Pending invites show anyone who hasn&apos;t confirmed their email yet.</li>
          <li>Accepted invites move to the Active state once the user finishes onboarding.</li>
          <li>
            Need a different redirect? Update <code>SUPABASE_INVITE_REDIRECT_URL</code> so links land on the right app
            when deploying to multiple frontends.
          </li>
        </ul>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950/40">
        <div className="border-b border-slate-800 px-4 py-3">
          <p className="text-sm uppercase tracking-wide text-slate-400">Invite status</p>
        </div>
        {!usersResult.success ? (
          <div className="px-4 py-6 text-sm text-slate-400">
            {usersResult.error ?? "Unable to load current invites."}
          </div>
        ) : users.length === 0 ? (
          <div className="px-4 py-6 text-sm text-slate-400">No users found yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead className="bg-slate-900/80 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Invited</th>
                  <th className="px-4 py-3">Last sign-in</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const isActive = Boolean(user.confirmedAt)
                  return (
                    <tr key={user.id} className="border-t border-slate-800">
                      <td className="px-4 py-3 font-medium">{user.email}</td>
                      <td className="px-4 py-3">
                        <Badge variant={isActive ? "default" : "secondary"} className={isActive ? "bg-green-500 text-white" : "bg-yellow-500/20 text-yellow-200"}>
                          {isActive ? "Active" : "Pending"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-400">{formatDate(user.invitedAt)}</td>
                      <td className="px-4 py-3 text-slate-400">{formatDate(user.lastSignInAt)}</td>
                      <td className="px-4 py-3 text-right">
                        {!isActive && user.email && <ResendInviteButton email={user.email} />}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
