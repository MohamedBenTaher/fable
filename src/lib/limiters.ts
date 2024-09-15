"use server";

import { RateLimitError } from "./errors";
import { getIp } from "./get-ip";

const PRUNE_INTERVAL = 60 * 1000; // 1 minute

const trackers = new Map<
  string,
  {
    count: number;
    expiresAt: number;
  }
>();

function pruneTrackers() {
  const now = Date.now();

  for (const [key, value] of trackers.entries()) {
    if (value.expiresAt < now) {
      trackers.delete(key);
    }
  }
}

setInterval(pruneTrackers, PRUNE_INTERVAL);

export async function rateLimitByIp({
  key = "global",
  limit = 30,
  window = 10000,
}: {
  key: string;
  limit: number;
  window: number;
}) {
  const ip = getIp();
  console.log(`rateLimitByIp: IP - ${ip}`);

  if (!ip) {
    console.error("rateLimitByIp: No IP found, throwing RateLimitError");
    throw new RateLimitError();
  }

  await rateLimitByKey({
    key: `${ip}-${key}`,
    limit,
    window,
  });
}

export async function rateLimitByKey({
  key = "global",
  limit = 30,
  window = 10000,
}: {
  key: string;
  limit: number;
  window: number;
}) {
  console.log(
    `rateLimitByKey: Key - ${key}, Limit - ${limit}, Window - ${window}`
  );
  const tracker = trackers.get(key) || { count: 0, expiresAt: 0 };

  if (tracker.expiresAt < Date.now()) {
    console.log(`rateLimitByKey: Resetting tracker for key - ${key}`);
    tracker.count = 0;
    tracker.expiresAt = Date.now() + window;
  }

  tracker.count++;
  console.log(
    `rateLimitByKey: Tracker count for key - ${key} is now ${tracker.count}`
  );

  if (tracker.count > limit) {
    console.error(
      `rateLimitByKey: Limit exceeded for key - ${key}, throwing RateLimitError`
    );
    throw new RateLimitError();
  }

  trackers.set(key, tracker);
}
