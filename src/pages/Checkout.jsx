import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  ChevronRight,
  CreditCard,
  Truck,
  MapPin,
  Lock,
} from "lucide-react";
import { getItem } from "../data/items";
import { gbp } from "../utils/format";

const shippingOptions = [
  {
    id: "pickup",
    label: "Ship to pickup point",
    detail: "InPost locker · 1–3 working days",
    price: 3.49,
  },
  {
    id: "home",
    label: "Home delivery",
    detail: "Evri to your door · 2–4 working days",
    price: 4.99,
  },
];

const payMethods = [
  { id: "card", label: "Credit or debit card", icon: CreditCard },
  { id: "paypal", label: "PayPal", icon: Lock },
  { id: "google", label: "Google Pay", icon: Lock },
];

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getItem(id);
  const [shipping, setShipping] = useState("pickup");
  const [payment, setPayment] = useState("card");

  if (!item) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-20 text-center text-stone-500">
        Item not found.{" "}
        <Link to="/" className="text-vinted-green underline">
          Back to catalogue
        </Link>
      </div>
    );
  }

  const shippingPrice =
    shippingOptions.find((s) => s.id === shipping)?.price ?? 0;
  const protectionFee = item.protectionPrice - item.price;
  const total = item.price + protectionFee + shippingPrice;

  return (
    <div className="max-w-[960px] mx-auto px-4 lg:px-6 py-6">
      <Link
        to={`/items/${item.id}`}
        className="text-sm text-stone-500 hover:text-vinted-green"
      >
        ← Back to item
      </Link>
      <h1 className="text-2xl font-bold text-stone-900 mt-3 mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Left: delivery + payment */}
        <div className="space-y-5">
          {/* Address */}
          <section className="border border-stone-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-vinted-green" />
              <h2 className="font-semibold text-stone-900">Ship to</h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-stone-700 leading-relaxed">
                <p className="font-medium">Alex Morgan</p>
                <p>42 Camden High Street</p>
                <p>London NW1 0JH</p>
                <p>United Kingdom</p>
              </div>
              <button className="text-sm text-vinted-green hover:underline">
                Change
              </button>
            </div>
          </section>

          {/* Shipping options */}
          <section className="border border-stone-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Truck size={18} className="text-vinted-green" />
              <h2 className="font-semibold text-stone-900">Delivery option</h2>
            </div>
            <div className="space-y-2">
              {shippingOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 border rounded-md p-3 cursor-pointer ${
                    shipping === opt.id
                      ? "border-vinted-green bg-teal-50"
                      : "border-stone-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    checked={shipping === opt.id}
                    onChange={() => setShipping(opt.id)}
                    className="accent-vinted-green"
                  />
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-stone-900">
                      {opt.label}
                    </p>
                    <p className="text-xs text-stone-500">{opt.detail}</p>
                  </div>
                  <span className="text-sm font-medium text-stone-900">
                    {gbp(opt.price)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section className="border border-stone-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard size={18} className="text-vinted-green" />
              <h2 className="font-semibold text-stone-900">Payment</h2>
            </div>
            <div className="space-y-2">
              {payMethods.map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center gap-3 border rounded-md p-3 cursor-pointer ${
                    payment === m.id
                      ? "border-vinted-green bg-teal-50"
                      : "border-stone-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === m.id}
                    onChange={() => setPayment(m.id)}
                    className="accent-vinted-green"
                  />
                  <m.icon size={18} className="text-stone-500" />
                  <span className="text-sm font-medium text-stone-900">
                    {m.label}
                  </span>
                </label>
              ))}
            </div>

            {payment === "card" && (
              <div className="mt-4 space-y-3">
                <input
                  placeholder="Card number"
                  className="w-full h-11 border border-stone-300 rounded-md px-3 text-sm outline-none focus:border-vinted-green"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="MM / YY"
                    className="h-11 border border-stone-300 rounded-md px-3 text-sm outline-none focus:border-vinted-green"
                  />
                  <input
                    placeholder="CVC"
                    className="h-11 border border-stone-300 rounded-md px-3 text-sm outline-none focus:border-vinted-green"
                  />
                </div>
                <input
                  placeholder="Name on card"
                  className="w-full h-11 border border-stone-300 rounded-md px-3 text-sm outline-none focus:border-vinted-green"
                />
              </div>
            )}
          </section>
        </div>

        {/* Right: order summary */}
        <aside className="lg:sticky lg:top-32 border border-stone-200 rounded-lg p-5 space-y-4">
          <h2 className="font-semibold text-stone-900">Order summary</h2>

          <div className="flex gap-3">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-16 h-20 object-cover rounded-md bg-stone-100"
            />
            <div className="text-sm">
              <p className="font-medium text-stone-900 leading-tight">
                {item.title}
              </p>
              <p className="text-stone-500">
                {item.size} · {item.condition}
              </p>
              <p className="text-stone-500">{item.brand}</p>
            </div>
          </div>

          <div className="border-t border-stone-100 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-stone-700">
              <span>Item</span>
              <span>{gbp(item.price)}</span>
            </div>
            <div className="flex justify-between text-stone-700">
              <span className="flex items-center gap-1">
                Buyer Protection fee
                <ShieldCheck size={14} className="text-vinted-green" />
              </span>
              <span>{gbp(protectionFee)}</span>
            </div>
            <div className="flex justify-between text-stone-700">
              <span>Postage</span>
              <span>{gbp(shippingPrice)}</span>
            </div>
            <div className="flex justify-between font-semibold text-stone-900 border-t border-stone-100 pt-2 text-base">
              <span>Total to pay</span>
              <span>{gbp(total)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/orders/${item.id}`)}
            className="w-full h-12 rounded-md bg-vinted-green hover:bg-vinted-greenDark text-white font-medium flex items-center justify-center gap-2"
          >
            <Lock size={16} /> Pay {gbp(total)}
          </button>

          <p className="flex items-start gap-2 text-xs text-stone-500">
            <ShieldCheck size={28} className="text-vinted-green shrink-0 -mt-1" />
            Your purchase is covered by Buyer Protection. Get a full refund if
            your item doesn't arrive, is damaged or not as described.
          </p>

          <p className="text-[11px] text-stone-400 flex items-center gap-1 justify-center">
            <Lock size={11} /> Payments are secure and encrypted
          </p>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
