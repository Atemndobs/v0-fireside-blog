"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import { usePathname, useSearchParams } from "next/navigation"

const apiKey = process.env.NEXT_PUBLIC_POSTHOG_API_KEY
const proxyEnabled =
  process.env.NEXT_PUBLIC_POSTHOG_PROXY_ENABLED === "true" || process.env.NEXT_PUBLIC_POSTHOG_USE_PROXY === "true"
const defaultHost = process.env.NEXT_PUBLIC_POSTHOG_API_HOST ?? "https://us.i.posthog.com"
const proxyHost = process.env.NEXT_PUBLIC_POSTHOG_PROXY_HOST ?? "/posthog"
const apiHost = proxyEnabled ? proxyHost : defaultHost
const uiHost = process.env.NEXT_PUBLIC_POSTHOG_UI_HOST

let posthogInitialized = false

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

const getPageMetadata = (pathname: string) => {
  const path = pathname || "/"
  const pageMap: Record<string, string> = {
    "/": "Landing",
    "/episodes": "Episodes Index",
    "/artists": "Artists Index",
    "/blog": "Blog Index",
    "/about": "About",
    "/AAA": "AAA Showcase",
  }

  const segments = path.split("/").filter(Boolean)
  const fallbackName = segments.map((segment) => capitalize(segment.replace(/-/g, " "))).join(" / ") || "Page"
  const pageName = pageMap[path] ?? fallbackName
  const pageGroup = segments[0] ?? "home"

  return { path, pageName, pageGroup }
}

const getDeviceCategory = (width: number) => {
  if (width < 640) return "mobile"
  if (width < 1024) return "tablet"
  return "desktop"
}

const initPosthog = () => {
  if (posthogInitialized || !apiKey) {
    return
  }

  posthog.init(apiKey, {
    api_host: apiHost,
    ui_host: uiHost,
    capture_pageview: false, // we handle this manually for App Router navigations
    capture_pageleave: true,
    person_profiles: "always",
    request_batching: true,
  })

  if (process.env.NODE_ENV !== "production") {
    posthog.debug()
  }

  posthogInitialized = true
}

const shutdownPosthog = () => {
  if (posthogInitialized) {
    posthog.shutdown()
    posthogInitialized = false
  }
}

const RouteChangeTracker = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!apiKey || !posthogInitialized || typeof window === "undefined") {
      return
    }

    const currentPath = pathname ?? window.location.pathname
    const search = searchParams.toString()
    const currentUrl = window.location.href
    const referrer = document.referrer || null
    const { pageName, pageGroup, path } = getPageMetadata(currentPath)
    const pageProps = {
      page_name: pageName,
      page_group: pageGroup,
      path,
      search,
      url: currentUrl,
      referrer,
      title: document.title,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_category: getDeviceCategory(window.innerWidth),
    }

    posthog.capture("$pageview", {
      $current_url: currentUrl,
      $pathname: path,
      $search: search,
    })

    posthog.capture("fireside_page_view", {
      ...pageProps,
    })

    if (path === "/") {
      posthog.capture("landing_page_view", {
        ...pageProps,
        is_landing: true,
      })
    }
  }, [pathname, searchParams])

  return null
}

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    initPosthog()

    return () => {
      shutdownPosthog()
    }
  }, [])

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("NEXT_PUBLIC_POSTHOG_API_KEY is not set. PostHog analytics are disabled.")
    }
    return <>{children}</>
  }

  return (
    <PostHogProvider client={posthog}>
      {children}
      <RouteChangeTracker />
    </PostHogProvider>
  )
}
