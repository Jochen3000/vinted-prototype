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
      {/* Ad slot placeholder, like the real catalogue */}
      <p className="text-xs text-stone-400 mb-1">Ad</p>
      <div className="h-40 sm:h-56 rounded-md bg-stone-100 mb-6 flex items-center justify-center text-stone-300 text-sm">
        Advertisement
      </div>

      <h1 className="text-2xl font-bold text-stone-900 mb-4">Items</h1>

      {/* Filter pill rail */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {filters.map((f) => (
          <button
            key={f}
            className="flex items-center gap-1 text-sm text-stone-800 border border-stone-300 rounded-full px-3 h-9 hover:bg-stone-50"
          >
            {f}
            <ChevronDown size={16} className="text-stone-500" />
          </button>
        ))}
      </div>

      {/* Active search filter pill */}
      {params.get("search_text") && (
        <div className="mb-4">
          <button
            onClick={() => navigate("/catalog")}
            className="inline-flex items-center gap-2 text-sm text-stone-800 border border-stone-300 rounded-full px-3 h-9 bg-stone-50"
          >
            {params.get("search_text")}
            <X size={16} className="text-stone-500" />
          </button>
        </div>
      )}

      {/* Category quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1 gap-x-8 border-y border-stone-100 py-4 mb-4">
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
        <p className="text-sm text-stone-500">
          {results.length === items.length
            ? "500+ results."
            : `${results.length} result${results.length === 1 ? "" : "s"}.`}
        </p>
        <div className="flex items-center gap-1 text-sm text-stone-700">
          Search results
          <HelpCircle size={16} className="text-stone-400" />
        </div>
      </div>

      {bannerOpen && (
        <div className="flex items-center justify-between border border-stone-200 rounded-md px-4 py-3 mb-6 text-sm text-stone-700">
          Shipping fees will be added at checkout
          <button onClick={() => setBannerOpen(false)} aria-label="Dismiss">
            <X size={18} className="text-stone-500" />
          </button>
        </div>
      )}

      {results.length === 0 ? (
        <p className="text-stone-500 py-12 text-center">
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
