"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
/** Keeps the public code checkout usable when owner-supplied photos are absent. */
export default function BrandImage({
  src,
  alt,
  onError,
  ...props
}: ImageProps) {
  const [failedSource, setFailedSource] = useState<ImageProps["src"] | null>(
    null,
  );
  const failed = failedSource === src;
  return (
    <Image
      {...props}
      src={failed ? "/images/product-1.svg" : src}
      alt={
        failed
          ? `Sample illustration (reference photo not installed): ${alt}`
          : alt
      }
      onError={(event) => {
        if (!failed) setFailedSource(src);
        onError?.(event);
      }}
    />
  );
}
