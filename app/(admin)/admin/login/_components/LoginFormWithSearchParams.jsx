import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

function LoginFormWithSearchParams() {
  const searchParams = useSearchParams();
  
  // ✅ Ensure searchParams is accessed inside useMemo
  const callbackUrl = useMemo(() => searchParams.get("callbackUrl") || "/admin", [searchParams]);

  return <LoginForm callbackUrl={callbackUrl} />;
}
