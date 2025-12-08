import { cn } from "@/lib/utils";

interface BrandNameProps {
  className?: string;
  withTagline?: boolean;
  taglineClassName?: string;
}

export function BrandName({ className, withTagline = false, taglineClassName }: BrandNameProps) {
  return (
    <>
      <span className={cn("font-above-beyond", className)}>Kaprayé</span>
      {withTagline && (
        <>
          {" "}
          <span className={cn("font-allure", taglineClassName)}>By Rayan</span>
        </>
      )}
    </>
  );
}
