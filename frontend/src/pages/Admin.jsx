import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Lock, LogOut, RefreshCw, Mail, MapPin, Phone, Package } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "vt_admin_token";

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "");
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async (tkn) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/inquiries`, {
        headers: { "X-Admin-Token": tkn },
      });
      setItems(data);
    } catch (err) {
      if (err?.response?.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken("");
        toast.error("Session expired. Please sign in again.");
      } else {
        toast.error("Failed to fetch inquiries.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) load(token);
  }, [token]);

  const signIn = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      await axios.post(`${API}/admin/verify`, { token: input.trim() });
      sessionStorage.setItem(TOKEN_KEY, input.trim());
      setToken(input.trim());
      toast.success("Signed in.");
    } catch {
      toast.error("Invalid admin token.");
    }
  };

  const signOut = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setItems([]);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-chalk-white flex items-center justify-center px-6">
        <form
          onSubmit={signIn}
          data-testid="admin-login-form"
          className="w-full max-w-md bg-white border border-monsoon-charcoal/10 p-10"
        >
          <div className="w-12 h-12 border border-basmati-gold flex items-center justify-center mb-6">
            <Lock size={18} className="text-basmati-gold" />
          </div>
          <p className="overline mb-3">Restricted</p>
          <h1 className="font-serif text-3xl text-monsoon-charcoal mb-2">Admin Sign-in</h1>
          <p className="text-sm text-monsoon-charcoal/60 mb-8 font-light">
            Enter the admin token to view B2B inquiries.
          </p>
          <label className="label-overline">Admin Token</label>
          <input
            data-testid="admin-token-input"
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-line mb-8"
            placeholder="••••••••"
            autoFocus
          />
          <button type="submit" data-testid="admin-sign-in-btn" className="btn-gold w-full justify-center">
            Sign In
          </button>
          <a href="/" className="block text-center mt-6 text-xs tracking-[0.2em] uppercase text-monsoon-charcoal/50 font-[Marcellus] hover:text-basmati-gold">
            ← Back to site
          </a>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-chalk-white">
      <header className="bg-white border-b border-monsoon-charcoal/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">
          <div>
            <p className="overline">Vijaya Traders · Admin</p>
            <h1 className="font-serif text-3xl text-monsoon-charcoal mt-1">B2B Inquiries</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => load(token)}
              data-testid="admin-refresh-btn"
              className="btn-ghost !py-3 !px-5"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button onClick={signOut} data-testid="admin-signout-btn" className="btn-ghost !py-3 !px-5">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-monsoon-charcoal/10 mb-10">
          <Stat label="Total Inquiries" value={items.length} />
          <Stat label="Countries" value={new Set(items.map((i) => i.country.toLowerCase())).size} />
          <Stat label="Companies" value={new Set(items.map((i) => i.company.toLowerCase())).size} />
          <Stat label="Last 7 Days" value={items.filter((i) => {
            const d = new Date(i.created_at);
            return Date.now() - d.getTime() < 7 * 24 * 3600 * 1000;
          }).length} />
        </div>

        {items.length === 0 ? (
          <div className="bg-white border border-monsoon-charcoal/10 p-16 text-center" data-testid="admin-empty">
            <p className="overline">Empty</p>
            <p className="font-serif text-2xl text-monsoon-charcoal mt-3">No inquiries yet.</p>
            <p className="text-monsoon-charcoal/55 mt-2 font-light">
              New B2B leads from the website will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4" data-testid="admin-inquiries-list">
            {items.map((it) => (
              <article
                key={it.id}
                data-testid={`inquiry-${it.id}`}
                className="bg-white border border-monsoon-charcoal/10 hover:border-basmati-gold/40 transition-colors p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                  <div>
                    <h3 className="font-serif text-2xl text-monsoon-charcoal">{it.name}</h3>
                    <p className="text-sm text-monsoon-charcoal/60 mt-1">{it.company} · {it.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="overline !text-[10px]">{it.product_interest}</p>
                    <p className="font-serif text-xl text-basmati-gold mt-1">{it.order_quantity_mt}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm border-t border-monsoon-charcoal/10 pt-5">
                  <Line icon={Mail} value={it.email} />
                  {it.phone && <Line icon={Phone} value={it.phone} />}
                  <Line icon={MapPin} value={new Date(it.created_at).toLocaleString()} />
                </div>

                {it.message && (
                  <div className="mt-5 pt-5 border-t border-monsoon-charcoal/10 text-sm text-monsoon-charcoal/75 font-light leading-relaxed">
                    <Package size={14} className="inline mr-2 text-basmati-gold" />
                    {it.message}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white p-6">
      <p className="text-[9px] tracking-[0.2em] uppercase text-monsoon-charcoal/55 font-[Marcellus]">{label}</p>
      <p className="font-serif text-4xl text-monsoon-charcoal mt-2">{value}</p>
    </div>
  );
}

function Line({ icon: Icon, value }) {
  return (
    <div className="flex items-center gap-2 text-monsoon-charcoal/70">
      <Icon size={13} className="text-basmati-gold flex-shrink-0" />
      <span className="font-light">{value}</span>
    </div>
  );
}
