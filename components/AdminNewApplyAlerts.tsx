"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const SEEN_KEY = "lr-admin-seen-applications";
const POLL_MS = 15000;

type ListedApplication = {
  id: string;
  full_name: string;
  role: string;
};

function loadSeen() {
  try {
    const raw = window.localStorage.getItem(SEEN_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []);
  } catch {
    return new Set<string>();
  }
}

function saveSeen(ids: Set<string>) {
  window.localStorage.setItem(SEEN_KEY, JSON.stringify([...ids]));
}

function notify(application: ListedApplication) {
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
  try {
    const notice = new Notification("New apply — Lootrushs", {
      body: `${application.full_name} · ${application.role}`,
      tag: `apply-${application.id}`,
    });
    notice.onclick = () => {
      window.focus();
      window.location.href = `/admin/applications/${application.id}`;
    };
  } catch {
    /* Notifications can fail in insecure contexts */
  }
}

export function AdminNewApplyAlerts() {
  const pathname = usePathname();
  const primed = useRef(false);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("denied");

  useEffect(() => {
    if (typeof Notification === "undefined") {
      setPermission("unsupported");
      return;
    }
    setPermission(Notification.permission);
  }, []);

  useEffect(() => {
    if (pathname === "/admin/login") return;

    let cancelled = false;

    async function poll() {
      try {
        const response = await fetch("/api/admin/applications", { cache: "no-store" });
        if (!response.ok) return;
        const payload = (await response.json()) as { applications?: ListedApplication[] };
        const applications = payload.applications ?? [];
        if (cancelled) return;

        const seen = loadSeen();
        if (!primed.current) {
          primed.current = true;
          for (const application of applications) seen.add(application.id);
          saveSeen(seen);
          return;
        }

        let changed = false;
        for (const application of applications) {
          if (seen.has(application.id)) continue;
          seen.add(application.id);
          changed = true;
          notify(application);
        }
        if (changed) saveSeen(seen);
      } catch {
        /* ignore network blips */
      }
    }

    void poll();
    const timer = window.setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [pathname]);

  if (pathname === "/admin/login" || permission === "unsupported" || permission === "granted") {
    return null;
  }

  return (
    <div className="border-b border-line bg-raised">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 text-sm">
        <p className="text-muted">Turn on desktop alerts for each new apply.</p>
        <button
          type="button"
          className="rounded-full bg-gold px-3 py-1.5 text-sm font-semibold text-[#1a1406] hover:bg-gold-soft"
          onClick={async () => {
            if (typeof Notification === "undefined") return;
            const next = await Notification.requestPermission();
            setPermission(next);
          }}
        >
          Enable desktop alerts
        </button>
      </div>
    </div>
  );
}
