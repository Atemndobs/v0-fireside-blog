"use client"

import { useEffect } from "react"

export function AdminServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return
    }

    const register = async () => {
      try {
        await navigator.serviceWorker.register("/admin/service-worker.js", { scope: "/admin" })
      } catch (error) {
        console.error("Admin service worker registration failed", error)
      }
    }

    register()
  }, [])

  return null
}
