"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { handleShare } from "@/lib/shareUtils";

export default function ActionButtons({
  formValues,
  setFormValues,
  resetDefaults,
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Button
        onClick={() => handleShare(formValues, pathname)}
        className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
      >
        Share Custom Values
      </Button>
      <Button
        onClick={() => {
          setFormValues(resetDefaults);
          router.push(pathname);
        }}
        variant="outline"
        className="hover:cursor-pointer"
      >
        Reset to Defaults
      </Button>
    </>
  );
}
