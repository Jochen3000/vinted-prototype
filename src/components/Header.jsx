import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Search, ChevronDown, HelpCircle, X } from "lucide-react";
import { categories } from "../data/items";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("search_text") || "");

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/catalog?search_text=${encodeURIComponent(q)}` : "/catalog");
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
        <div className="flex items-center gap-4 h-16">
          <Link
            to="/"
            className="text-2xl font-bold italic text-vinted-green shrink-0"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Vinted
          </Link>

          <form
            onSubmit={submit}
            className="flex-grow flex items-center bg-stone-100 dark:bg-stone-800 rounded-md h-11"
          >
            <button
              type="button"
              className="flex items-center gap-1 px-3 text-sm text-stone-700 dark:text-stone-300 border-r border-stone-300 dark:border-stone-600 h-7"
            >
              Catalogue
              <ChevronDown size={16} />
            </button>
            <div className="flex items-center flex-grow px-3 gap-2">
              <Search size={18} className="text-stone-500 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for items"
                className="bg-transparent flex-grow outline-none text-sm text-stone-800 dark:text-stone-100 placeholder:text-stone-500"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <X size={18} className="text-stone-500" />
                </button>
              )}
            </div>
          </form>

          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-3">
              <button className="text-sm text-vinted-green font-medium border border-stone-300 dark:border-stone-600 rounded-md px-3 h-9 hover:bg-stone-50 dark:hover:bg-stone-800">
                Sign up | Log in
              </button>
              <button className="text-sm text-white bg-vinted-green hover:bg-vinted-greenDark rounded-md px-4 h-9 font-medium">
                Sell now
              </button>
              <HelpCircle size={26} className="text-vinted-green" />
            </div>
          </div>
        </div>
      </div>

      <nav className="border-t border-stone-100 dark:border-stone-800">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
          <ul className="flex items-center gap-6 h-11 overflow-x-auto no-scrollbar text-sm text-stone-800 dark:text-stone-200">
            {categories.map((c) => (
              <li key={c}>
                <Link
                  to={`/catalog?search_text=${encodeURIComponent(c)}`}
                  className="whitespace-nowrap hover:text-vinted-green"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
