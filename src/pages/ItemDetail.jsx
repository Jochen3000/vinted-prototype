import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Heart,
  Share2,
  ShieldCheck,
  Star,
  MapPin,
  ChevronRight,
  Info,
} from "lucide-react";
import { getItem, getSeller, items } from "../data/items";
import { gbp } from "../utils/format";
import ItemCard from "../components/ItemCard";

function Row({ label, value, info }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-stone-100 dark:border-stone-800 text-sm">
      <span className="text-stone-500 dark:text-stone-400">{label}</span>
      <span className="flex items-center gap-1 text-stone-900 dark:text-stone-100">
        {value}
        {info && (
          <Info size={14} className="text-stone-400 dark:text-stone-500" />
        )}
      </span>
    </div>
  );
}

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getItem(id);

  if (!item) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-20 text-center text-stone-500 dark:text-stone-400">
        Item not found.{" "}
        <Link to="/" className="text-vinted-green underline">
          Back to catalogue
        </Link>
      </div>
    );
  }

  const seller = getSeller(item.seller);
  const similar = items.filter((i) => i.id !== item.id).slice(0, 5);

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-stone-500 dark:text-stone-400 mb-4 flex items-center gap-1 flex-wrap">
        <Link to="/" className="hover:text-vinted-green">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link
          to={`/catalog?search_text=${item.category}`}
          className="hover:text-vinted-green"
        >
          {item.category}
        </Link>
        <ChevronRight size={12} />
        <Link
          to={`/catalog?search_text=${item.brand}`}
          className="hover:text-vinted-green"
        >
          {item.brand}
        </Link>
        <ChevronRight size={12} />
        <span className="text-stone-700 dark:text-stone-300">{item.title}</span>
      </nav>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 content-start">
          {item.images.map((src, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-md bg-stone-100 dark:bg-stone-800 ${
                i === 0 ? "sm:col-span-2 aspect-square" : "aspect-[3/4]"
              }`}
            >
              <img
                src={src}
                alt={`${item.title} photo ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-32 self-start space-y-4">
          <div className="border border-stone-200 dark:border-stone-800 rounded-lg p-5">
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {item.title}
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              {item.size} · {item.condition} ·{" "}
              <Link
                to={`/catalog?search_text=${item.brand}`}
                className="text-vinted-green hover:underline"
              >
                {item.brand}
              </Link>{" "}
              · Uploaded {item.uploaded}
            </p>

            <p className="text-sm text-stone-500 dark:text-stone-400 mt-4">
              {gbp(item.price)}
            </p>
            <p className="text-xl font-bold text-vinted-green">
              {gbp(item.protectionPrice)}
            </p>
            <p className="flex items-center gap-1 text-sm text-vinted-green">
              Includes Buyer Protection
              <ShieldCheck size={15} />
            </p>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-2">
              Item price and all applicable fees are converted to your currency.{" "}
              <span className="text-vinted-green">Learn more</span>.
            </p>

            <div className="mt-4">
              <Row label="Brand" value={item.brand} />
              <Row label="Size" value={item.size} info />
              <Row label="Condition" value={item.condition} info />
              <Row label="Colour" value={item.colour} />
              <Row label="Uploaded" value={item.uploaded} />
            </div>

            <div className="mt-5 space-y-2">
              <button
                onClick={() => navigate(`/checkout/${item.id}`)}
                className="w-full h-11 rounded-md bg-vinted-green hover:bg-vinted-greenDark text-white font-medium"
              >
                Buy now
              </button>
              <button className="w-full h-11 rounded-md border border-vinted-green text-vinted-green font-medium hover:bg-teal-50 dark:hover:bg-teal-900/30">
                Make an offer
              </button>
              <button className="w-full h-11 rounded-md border border-stone-300 dark:border-stone-600 text-stone-800 dark:text-stone-200 font-medium hover:bg-stone-50 dark:hover:bg-stone-800">
                Message seller
              </button>
              <div className="flex gap-2 pt-1">
                <button className="flex-1 h-10 rounded-md border border-stone-300 dark:border-stone-600 flex items-center justify-center gap-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800">
                  <Heart size={18} /> 14
                </button>
                <button className="flex-1 h-10 rounded-md border border-stone-300 dark:border-stone-600 flex items-center justify-center gap-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800">
                  <Share2 size={18} /> Share
                </button>
              </div>
            </div>
          </div>

          {/* Buyer protection */}
          <div className="border border-stone-200 dark:border-stone-800 rounded-lg p-4 flex gap-3">
            <ShieldCheck size={22} className="text-vinted-green shrink-0" />
            <div>
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                Buyer Protection fee included
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Your money is protected in case your order doesn't arrive, or it
                arrives damaged or significantly not as described.{" "}
                <span className="text-vinted-green">Learn more</span>
              </p>
            </div>
          </div>

          {/* Seller card */}
          <div className="border border-stone-200 dark:border-stone-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-vinted-green text-white flex items-center justify-center font-semibold uppercase">
                {seller.username[0]}
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  {seller.username}
                </p>
                <p className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                  <Star size={13} className="text-amber-500 fill-amber-500" />
                  {seller.rating.toFixed(1)} · {seller.reviews} reviews
                </p>
              </div>
              <ChevronRight
                size={18}
                className="text-stone-400 dark:text-stone-500"
              />
            </div>
            {seller.badge && (
              <p className="flex items-center gap-1 text-xs text-vinted-green mt-3">
                <ShieldCheck size={14} /> {seller.badge}
              </p>
            )}
            <p className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 mt-2">
              <MapPin size={13} /> {seller.location}
            </p>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
              {seller.lastSeen}
            </p>
          </div>

          {/* Description */}
          <div className="border border-stone-200 dark:border-stone-800 rounded-lg p-4">
            <h2 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
              Description
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 whitespace-pre-line">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Similar items */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
          Similar items
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6">
          {similar.map((i) => (
            <ItemCard key={i.id} item={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ItemDetail;
