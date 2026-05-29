import { Facebook, Instagram, Twitter } from "lucide-react";

const columns = [
  {
    title: "Vinted",
    links: ["About us", "Jobs", "Sustainability", "Press", "Advertising"],
  },
  {
    title: "Discover",
    links: ["How it works", "Mobile apps", "Infoboard", "Verified sellers"],
  },
  {
    title: "Help",
    links: ["Help Centre", "Selling", "Buying", "Trust and safety"],
  },
];

function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 mt-12">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-stone-900 mb-3 text-sm">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-stone-500 hover:text-vinted-green"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-semibold text-stone-900 mb-3 text-sm">
              Follow us
            </h4>
            <div className="flex gap-3 text-stone-500">
              <Facebook size={20} />
              <Instagram size={20} />
              <Twitter size={20} />
            </div>
          </div>
        </div>
        <div className="border-t border-stone-200 mt-8 pt-6 flex flex-col sm:flex-row gap-2 justify-between text-xs text-stone-400">
          <span>© 2026 Vinted — prototype for workshop use only</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-vinted-green">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-vinted-green">
              Cookie Policy
            </a>
            <a href="#" className="hover:text-vinted-green">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
