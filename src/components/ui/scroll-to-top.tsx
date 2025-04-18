
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      className={cn(
        "fixed bottom-6 right-6 p-3 rounded-full bg-kapraye-cream shadow-md z-50 transition-all duration-300 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      )}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5 text-kapraye-burgundy" />
    </button>
  );
}
