"use client";
import Image from "next/image";
import { useState } from "react";
/** The public source stays usable while portrait disclosure approval is pending. */
export function OwnerPortrait() {
  const [unavailable, setUnavailable] = useState(false);
  return (
    <div className="owner-portrait">
      {unavailable ? (
        <div
          className="owner-initials"
          role="img"
          aria-label="Arpita Prajapati — owner portrait pending publication"
        >
          <span aria-hidden="true">AP</span>
          <p>Arpita Prajapati</p>
        </div>
      ) : (
        <Image
          src="/images/owner/arpita-prajapati.jpg"
          alt="Arpita Prajapati, owner of Bloomies by Aadar"
          fill
          sizes="(max-width:700px) 85vw, 420px"
          onError={() => setUnavailable(true)}
        />
      )}
    </div>
  );
}
