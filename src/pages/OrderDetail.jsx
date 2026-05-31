import { useParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  Circle,
  ShieldCheck,
  MessageCircle,
  Package,
  MapPin,
  Star,
} from "lucide-react";
import { getItem, getSeller } from "../data/items";
import { gbp } from "../utils/format";

const steps = [
  { label: "Order confirmed", detail: "Today, 14:32", done: true },
  { label: "Payment received", detail: "Today, 14:32", done: true },
  { label: "Posted by seller", detail: "Awaiting dispatch", done: false },
  { label: "Delivered", detail: "Estimated in 1–3 days", done: false },
];

function OrderDetail() {
  const { id } = useParams();
  const item = getItem(id);

  if (!item) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-20 text-center text-stone-500 dark:text-stone-400">
        Order not found.{" "}
        <Link to="/" className="text-vinted-green underline">
          Back to catalogue
        </Link>
      </div>
    );
  }

  const seller = getSeller(item.seller);
  const protectionFee = item.protectionPrice - item.price;
  const postage = 3.49;
  const total = item.price + protectionFee + postage;
  const orderNo = `VP-${item.id.slice(0, 6)}`;

  return (
    <div className="max-w-[960px] mx-auto px-4 lg:px-6 py-6">
      {/* Confirmation banner */}
      <div className="border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/20 rounded-lg p-5 flex items-start gap-3 mb-6">
        <CheckCircle2 size={28} className="text-vinted-green shrink-0" />
        <div>
          <h1 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Thanks, your order is confirmed!
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Order {orderNo} · We've let {seller.username} know. You'll get a
            notification once it's been posted.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
        <div className="space-y-5">
          {/* Status timeline */}
          <section className="border border-stone-200 dark:border-stone-800 rounded-lg p-5">
            <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-4">
              Order status
            </h2>
            <ol className="relative">
              {steps.map((s, i) => (
                <li key={s.label} className="flex gap-3 pb-5 last:pb-0">
                  <div className="flex flex-col items-center">
                    {s.done ? (
                      <CheckCircle2 size={22} className="text-vinted-green" />
                    ) : (
                      <Circle
                        size={22}
                        className="text-stone-300 dark:text-stone-600"
                      />
                    )}
                    {i < steps.length - 1 && (
                      <span
                        className={`w-0.5 flex-grow mt-1 ${
                          s.done
                            ? "bg-vinted-green"
                            : "bg-stone-200 dark:bg-stone-700"
                        }`}
                        style={{ minHeight: 24 }}
                      />
                    )}
                  </div>
                  <div className="-mt-0.5">
                    <p
                      className={`text-sm font-medium ${
                        s.done
                          ? "text-stone-900 dark:text-stone-100"
                          : "text-stone-400 dark:text-stone-500"
                      }`}
                    >
                      {s.label}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {s.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Item */}
          <section className="border border-stone-200 dark:border-stone-800 rounded-lg p-5">
            <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
              Your item
            </h2>
            <Link to={`/items/${item.id}`} className="flex gap-3 group">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-20 h-24 object-cover rounded-md bg-stone-100 dark:bg-stone-800"
              />
              <div className="text-sm">
                <p className="font-medium text-stone-900 dark:text-stone-100 group-hover:text-vinted-green">
                  {item.title}
                </p>
                <p className="text-stone-500 dark:text-stone-400">
                  {item.size} · {item.condition}
                </p>
                <p className="text-stone-500 dark:text-stone-400">
                  {item.brand}
                </p>
                <p className="font-semibold text-stone-900 dark:text-stone-100 mt-1">
                  {gbp(item.price)}
                </p>
              </div>
            </Link>
          </section>

          {/* Delivery */}
          <section className="border border-stone-200 dark:border-stone-800 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Package size={18} className="text-vinted-green" />
              <h2 className="font-semibold text-stone-900 dark:text-stone-100">
                Delivery
              </h2>
            </div>
            <div className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              <p className="flex items-center gap-1 text-stone-500 dark:text-stone-400 mb-2">
                <MapPin size={14} /> Shipping to
              </p>
              <p className="font-medium">Alex Morgan</p>
              <p>42 Camden High Street</p>
              <p>London NW1 0JH, United Kingdom</p>
              <p className="mt-3 text-stone-500 dark:text-stone-400">
                Tracking number will appear here once {seller.username} posts
                your item.
              </p>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="h-11 px-4 rounded-md border border-stone-300 dark:border-stone-600 text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2">
              <MessageCircle size={18} /> Contact seller
            </button>
            <button className="h-11 px-4 rounded-md border border-stone-300 dark:border-stone-600 text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800">
              I have an issue
            </button>
          </div>
        </div>

        {/* Right: payment summary + seller */}
        <aside className="space-y-5">
          <section className="border border-stone-200 dark:border-stone-800 rounded-lg p-5">
            <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
              Payment details
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-stone-700 dark:text-stone-300">
                <span>Item</span>
                <span>{gbp(item.price)}</span>
              </div>
              <div className="flex justify-between text-stone-700 dark:text-stone-300">
                <span className="flex items-center gap-1">
                  Buyer Protection fee
                  <ShieldCheck size={14} className="text-vinted-green" />
                </span>
                <span>{gbp(protectionFee)}</span>
              </div>
              <div className="flex justify-between text-stone-700 dark:text-stone-300">
                <span>Postage</span>
                <span>{gbp(postage)}</span>
              </div>
              <div className="flex justify-between font-semibold text-stone-900 dark:text-stone-100 border-t border-stone-100 dark:border-stone-800 pt-2 text-base">
                <span>Total paid</span>
                <span>{gbp(total)}</span>
              </div>
              <p className="text-xs text-stone-400 dark:text-stone-500 pt-1">
                Paid with Visa •••• 4242
              </p>
            </div>
          </section>

          <section className="border border-stone-200 dark:border-stone-800 rounded-lg p-5">
            <h2 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
              Seller
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-vinted-green text-white flex items-center justify-center font-semibold uppercase">
                {seller.username[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  {seller.username}
                </p>
                <p className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                  <Star size={13} className="text-amber-500 fill-amber-500" />
                  {seller.rating.toFixed(1)} · {seller.reviews} reviews
                </p>
              </div>
            </div>
          </section>

          <div className="border border-stone-200 dark:border-stone-800 rounded-lg p-4 flex gap-3">
            <ShieldCheck size={22} className="text-vinted-green shrink-0" />
            <p className="text-xs text-stone-500 dark:text-stone-400">
              This order is protected by Buyer Protection. We'll hold your
              payment until you confirm everything's fine.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default OrderDetail;
