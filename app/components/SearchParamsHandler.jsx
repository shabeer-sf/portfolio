// app/components/SearchParamsHandler.jsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchParamsHandler({ onParamsChange }) {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const callbackUrl = searchParams.get("callbackUrl") || "/admin";
    onParamsChange(callbackUrl);
  }, [searchParams, onParamsChange]);

  return null;
}