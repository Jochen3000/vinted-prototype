import { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronDown, X, HelpCircle } from "lucide-react";
import ItemCard from "../components/ItemCard";
import { items } from "../data/items";

const filters = [
  "Category",
  "Size",
  "Brand",
  "Condition",
  "Colour",
  "Price",
  "Material",
  "Sort by",
];

const quickLinks = [
  ["Men", "Women", "Kids"],
  ["Sports", "Home", "Hobbies & collectables"],
  ["Electronics", "Entertainment"],
];

function Catalogue() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [bannerOpen, setBannerOpen] = useState(true);
  const search = (params.get("search_text") || "").toLowerCase();

  const results = useMemo(() => {
    if (!search) return items;
    return items.filter((i) =>
      [i.title, i.brand, i.category, i.colour, i.condition]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [search]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
        Items
      </h1>

      {/* Filter pill rail */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {filters.map((f) => (
          <button
            key={f}
            className="flex items-center gap-1 text-sm text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-600 rounded-full px-3 h-9 hover:bg-stone-50 dark:hover:bg-stone-800"
          >
            {f}
            <ChevronDown
              size={16}
              className="text-stone-500 dark:text-stone-400"
            />
          </button>
        ))}
      </div>

      {/* Active search filter pill */}
      {params.get("search_text") && (
        <div className="mb-4">
          <button
            onClick={() => navigate("/catalog")}
            className="inline-flex items-center gap-2 text-sm text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-600 rounded-full px-3 h-9 bg-stone-50 dark:bg-stone-900"
          >
            {params.get("search_text")}
            <X size={16} className="text-stone-500 dark:text-stone-400" />
          </button>
        </div>
      )}

      {/* Category quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1 gap-x-8 border-y border-stone-100 dark:border-stone-800 py-4 mb-4">
        {quickLinks.flat().map((l) => (
          <button
            key={l}
            onClick={() =>
              navigate(`/catalog?search_text=${encodeURIComponent(l)}`)
            }
            className="text-left text-sm text-vinted-green hover:underline"
          >
            {l}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {results.length === items.length
            ? "500+ results."
            : `${results.length} result${results.length === 1 ? "" : "s"}.`}
        </p>
        <div className="flex items-center gap-1 text-sm text-stone-700 dark:text-stone-300">
          Search results
          <HelpCircle
            size={16}
            className="text-stone-400 dark:text-stone-500"
          />
        </div>
      </div>

      {bannerOpen && (
        <div className="flex items-center justify-between border border-stone-200 dark:border-stone-800 rounded-md px-4 py-3 mb-6 text-sm text-stone-700 dark:text-stone-300">
          Shipping fees will be added at checkout
          <button onClick={() => setBannerOpen(false)} aria-label="Dismiss">
            <X size={18} className="text-stone-500 dark:text-stone-400" />
          </button>
        </div>
      )}

      {results.length === 0 ? (
        <p className="text-stone-500 dark:text-stone-400 py-12 text-center">
          No items match “{params.get("search_text")}”. Try another search.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6">
          {results.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalogue;
