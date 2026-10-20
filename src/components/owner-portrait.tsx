"use client";
import Image from "next/image";
import { owner } from "@/data/owner";
import { useState } from "react";
/** Accessible initials are retained as a fallback if a replacement image fails. */
export function OwnerPortrait() {
  const [unavailable, setUnavailable] = useState(false);
  return (
    <div className="owner-portrait">
      {unavailable ? (
        <div className="owner-initials" role="img" aria-label={owner.name}>
          <span aria-hidden="true">AP</span>
          <p>{owner.name}</p>
        </div>
      ) : (
        <Image
          src={owner.portrait}
          alt={`${owner.name}, owner of Bloomies by Aadar`}
          fill
          sizes="(max-width:700px) 85vw, 420px"
          onError={() => setUnavailable(true)}
        />
      )}
    </div>
  );
}
