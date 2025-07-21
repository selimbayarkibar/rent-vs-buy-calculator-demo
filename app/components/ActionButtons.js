"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { handleShare } from "@/lib/shareUtils";

export default function ActionButtons({
  formValues,
  setFormValues,
  resetDefaults,
  onReset,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    if (onReset) {
      // Use custom reset handler if provided (for valuation page)
      onReset();
    } else {
      // Default reset behavior (for sell business page)
      setFormValues(resetDefaults);
    }
    router.push(pathname);
  };

  return (
    <>
      <Button
        onClick={() => handleShare(formValues, pathname)}
        className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
      >
        Share Custom Values
      </Button>
      <Button
        onClick={handleReset}
        variant="outline"
        className="hover:cursor-pointer"
      >
        Reset to Defaults
      </Button>
    </>
  );
}
