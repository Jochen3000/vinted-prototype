import { Link } from "react-router-dom";
import { Heart, BadgeCheck } from "lucide-react";
import { gbp } from "../utils/format";

function ItemCard({ item }) {
  return (
    <div className="group">
      <Link to={`/items/${item.id}`} className="block relative">
        <div className="aspect-[3/4] overflow-hidden rounded-md bg-stone-100">
          <img
            src={item.images[0]}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <button
          className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white"
          aria-label="Add to favourites"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={18} className="text-stone-700" />
        </button>
      </Link>
      <div className="pt-2">
        <p className="text-sm text-stone-800 truncate">{item.brand}</p>
        <p className="text-xs text-stone-500 truncate">
          {item.size} · {item.condition}
        </p>
        <p className="text-sm font-semibold text-stone-900 mt-1">
          {gbp(item.price)}
        </p>
        <p className="flex items-center gap-1 text-xs text-vinted-green">
          {gbp(item.protectionPrice)}
          <BadgeCheck size={13} />
        </p>
      </div>
    </div>
  );
}

export default ItemCard;
