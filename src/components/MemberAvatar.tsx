"use client";

import { useState } from "react";
import { initials, avatarColor } from "@/lib/avatar";

export function MemberAvatar({
  name,
  github,
}: {
  name: string;
  github: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative shrink-0">
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://github.com/${github}.png`}
          alt={name}
          className="h-12 w-12 rounded-full border border-ink-200 object-cover shadow-2xs dark:border-ink-700"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-sm font-semibold text-white shadow-2xs ${avatarColor(
            name,
          )}`}
        >
          {initials(name)}
        </div>
      )}
    </div>
  );
}
