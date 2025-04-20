
import React from "react";
import { Filter, SortAsc } from "lucide-react";

interface SortAndFilterSidebarProps {
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  sortOption?: string;
  onSortChange?: (sort: string) => void;
}

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" }
];

export const SortAndFilterSidebar: React.FC<SortAndFilterSidebarProps> = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange
}) => {
  return (
    <aside className="w-full sm:w-56 bg-white border border-kapraye-cream rounded-lg p-5 mb-8 sm:mb-0">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-kapraye-pink" />
        <span className="font-medium text-kapraye-burgundy text-lg">Filter</span>
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Category</h3>
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full text-left px-2 py-1 rounded ${selectedCategory === "all" ? "bg-kapraye-pink/10 text-kapraye-pink font-semibold" : "hover:bg-gray-50"}`}
              onClick={() => onCategoryChange && onCategoryChange("all")}
            >
              All
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`w-full text-left px-2 py-1 rounded ${selectedCategory === cat ? "bg-kapraye-pink/10 text-kapraye-pink font-semibold" : "hover:bg-gray-50"}`}
                onClick={() => onCategoryChange && onCategoryChange(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <SortAsc className="w-4 h-4 text-kapraye-pink" />
          <span className="text-sm font-semibold text-muted-foreground">Sort By</span>
        </div>
        <select
          className="w-full border px-2 py-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-kapraye-pink"
          value={sortOption || "default"}
          onChange={(e) => onSortChange && onSortChange(e.target.value)}
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </aside>
  );
};
