"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const SEEN_KEY = "lr-admin-latest-application-id";
const WATCH_KEY = "lr-admin-watch-applies";
/** Free tier: at most ~144 reads/day from alerts if left on all day. */
const POLL_MS = 10 * 60 * 1000;
const BACKOFF_MS = 60 * 60 * 1000;

type LatestApplication = {
  id: string;
  created_at: string;
  full_name: string;
  role: string;
};

function loadWatching() {
  try {
    return window.localStorage.getItem(WATCH_KEY) === "1";
  } catch {
    return false;
  }
}

function saveWatching(value: boolean) {
  window.localStorage.setItem(WATCH_KEY, value ? "1" : "0");
}

function loadSeenId() {
  try {
    return window.localStorage.getItem(SEEN_KEY);
  } catch {
    return null;
  }
}

function saveSeenId(id: string) {
  window.localStorage.setItem(SEEN_KEY, id);
}

function notify(application: LatestApplication) {
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
  const [watching, setWatching] = useState(false);

  useEffect(() => {
    if (typeof Notification === "undefined") {
      setPermission("unsupported");
      return;
    }
    setPermission(Notification.permission);
    setWatching(loadWatching());
  }, []);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    if (permission !== "granted" || !watching) return;

    let cancelled = false;
    let timer: number | undefined;
    let delay = POLL_MS;

    async function poll() {
      try {
        const response = await fetch("/api/admin/applications/latest", { cache: "no-store" });
        if (cancelled) return;

        if (response.status === 429 || response.status >= 500) {
          delay = BACKOFF_MS;
          timer = window.setTimeout(poll, delay);
          return;
        }
        if (!response.ok) {
          timer = window.setTimeout(poll, delay);
          return;
        }

        delay = POLL_MS;
        const payload = (await response.json()) as { latest?: LatestApplication | null };
        const latest = payload.latest ?? null;
        if (!latest) {
          timer = window.setTimeout(poll, delay);
          return;
        }

        if (!primed.current) {
          primed.current = true;
          saveSeenId(latest.id);
          timer = window.setTimeout(poll, delay);
          return;
        }

        const seenId = loadSeenId();
        if (seenId !== latest.id) {
          saveSeenId(latest.id);
          notify(latest);
        }
      } catch {
        delay = BACKOFF_MS;
      }
      if (!cancelled) timer = window.setTimeout(poll, delay);
    }

    timer = window.setTimeout(poll, POLL_MS);
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [pathname, permission, watching]);

  if (pathname === "/admin/login" || permission === "unsupported") {
    return null;
  }

  return (
    <div className="border-b border-line bg-raised">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm sm:px-5">
        <p className="text-muted">
          Free Firestore is capped at 50k reads/day. Live checks use 1 read every 10 minutes and are
          off by default.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {permission !== "granted" ? (
            <button
              type="button"
              className="rounded-full border border-line px-3 py-1.5 text-sm text-ink hover:border-gold/40 hover:text-gold"
              onClick={async () => {
                if (typeof Notification === "undefined") return;
                const next = await Notification.requestPermission();
                setPermission(next);
              }}
            >
              Allow desktop alerts
            </button>
          ) : null}
          <button
            type="button"
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
              watching
                ? "border border-line text-muted hover:border-gold/40 hover:text-gold"
                : "bg-gold text-[#1a1406] hover:bg-gold-soft"
            }`}
            onClick={async () => {
              if (!watching && permission !== "granted" && typeof Notification !== "undefined") {
                const next = await Notification.requestPermission();
                setPermission(next);
                if (next !== "granted") return;
              }
              const next = !watching;
              saveWatching(next);
              setWatching(next);
              primed.current = false;
            }}
          >
            {watching ? "Stop live checks" : "Watch for new applies"}
          </button>
        </div>
      </div>
    </div>
  );
}
