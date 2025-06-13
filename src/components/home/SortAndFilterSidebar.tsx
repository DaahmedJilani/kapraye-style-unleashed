
import React from "react";
import { Filter, SortAsc } from "lucide-react";

interface SortAndFilterSidebarProps {
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  sortOption?: string;
  onSortChange?: (sort: string) => void;
  priceRange?: [number, number];
  onPriceRangeChange?: (range: [number, number]) => void;
  onSale?: boolean;
  onSaleToggle?: (saleOnly: boolean) => void;
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
  onSortChange,
  priceRange = [0, 10000],
  onPriceRangeChange,
  onSale = false,
  onSaleToggle
}) => {
  return (
    <aside className="w-full sm:w-56 bg-white border border-kapraye-cream rounded-lg p-5 mb-8 sm:mb-0">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-kapraye-pink" />
        <span className="font-medium text-kapraye-burgundy text-lg">Filter</span>
      </div>
      
      {/* Categories */}
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

      {/* Price Range */}
      {onPriceRangeChange && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Price Range</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>PKR {priceRange[0]}</span>
              <span>PKR {priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="500"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Sale Filter */}
      {onSaleToggle && (
        <div className="mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={onSale}
              onChange={(e) => onSaleToggle(e.target.checked)}
              className="rounded border-gray-300 text-kapraye-pink focus:ring-kapraye-pink"
            />
            <span className="text-sm">On Sale Only</span>
          </label>
        </div>
      )}

      {/* Sort Options */}
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
