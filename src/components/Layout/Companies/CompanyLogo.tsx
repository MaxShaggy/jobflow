"use client"

import Image from "next/image";
import { useState } from "react";

interface CompanyLogoProps {
  website: string;
  name: string;
}

function getLogo(url: string) {
  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}


export function CompanyLogo({ website, name }: CompanyLogoProps) {
  const [hasError, setHasError] = useState(false);

  return hasError || !website ? (
    <div className="w-6 h-6 flex items-center justify-center shrink-0 rounded-full bg-text-2 text-destructive text-lg font-bold">
      {name.charAt(0).toUpperCase()}
    </div>
  ) : (
    <Image
      width={24}
      height={24}
      alt={`${name} logo`}
      src={getLogo(website)}
      onError={() => setHasError(true)}
    />
  )
}