
import { Button } from "@/components/ui/button";

interface GenderFilterProps {
  selectedGender: string;
  onGenderChange: (gender: string) => void;
}

export function GenderFilter({ selectedGender, onGenderChange }: GenderFilterProps) {
  const genderOptions = [
    { value: "all", label: "All" },
    { value: "men", label: "For Men" },
    { value: "women", label: "For Women" },
    { value: "unisex", label: "Unisex" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {genderOptions.map((option) => (
        <Button
          key={option.value}
          variant={selectedGender === option.value ? "default" : "outline"}
          size="sm"
          onClick={() => onGenderChange(option.value)}
          className={`${
            selectedGender === option.value
              ? "bg-kapraye-burgundy hover:bg-kapraye-burgundy/90"
              : "border-kapraye-burgundy text-kapraye-burgundy hover:bg-kapraye-burgundy/10"
          }`}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
