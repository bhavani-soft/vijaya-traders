import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";

// Replace with your Formspree form ID from https://formspree.io
// Sign up free → New Form → copy the ID (e.g. "xpwzgevk")
const FORMSPREE_ID = "xpwzgevk";

const PRODUCT_OPTIONS = [
  "1121 Basmati", "1509 Basmati", "1401 Basmati", "Pusa Basmati",
  "IR64", "PR11 / PR14", "Parmal", "Sona Masoori",
  "Custom Packaging Quote", "Mixed Container",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", country: "",
    phone: "", product_interest: PRODUCT_OPTIONS[0],
    order_quantity_mt: "", message: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.country || !form.order_quantity_mt) {
      toast.error("Please complete the required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Inquiry received. Our export team will reply within 24 hours.");
        setForm({
          name: "", email: "", company: "", country: "",
          phone: "", product_interest: PRODUCT_OPTIONS[0],
          order_quantity_mt: "", message: "",
        });
      } else {
        const data = await res.json();
        toast.error(data?.errors?.[0]?.message || "Submission failed. Please try again.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 sm:py-32 bg-chalk-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left — contact info */}
          <div className="lg:col-span-5 reveal">
            <p className="overline mb-6">Begin a Conversation</p>
            <div className="hairline mb-8" />
            <h2 className="font-serif text-monsoon-charcoal text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Let's discuss<br />
              <span className="italic text-paddy-green">your next shipment.</span>
            </h2>
            <p className="mt-8 text-monsoon-charcoal/75 leading-relaxed font-light max-w-md">
              Share your requirement below and a member of our export desk will respond
              with a detailed quotation, sample pictures and CIF / FOB pricing within
              one business day.
            </p>

            <div className="mt-12 space-y-7">
              <InfoLine
                icon={MapPin}
                label="Head Office"
                value="Plot 14, Industrial Area, Karnal, Haryana 132001, India"
              />
              <InfoLine
                icon={Mail}
                label="Export Desk"
                value="exports@vijayatraders.com"
              />
              <InfoLine
                icon={Phone}
                label="Direct Line"
                value="+91 184 4055 200"
              />
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7 reveal">
            <form
              onSubmit={submit}
              data-testid="inquiry-form"
              className="bg-white border border-monsoon-charcoal/10 p-8 sm:p-12 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Full Name *">
                  <input
                    data-testid="form-name"
                    className="input-line"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your full name"
                    required
                  />
                </Field>
                <Field label="Email Address *">
                  <input
                    type="email"
                    data-testid="form-email"
                    className="input-line"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@company.com"
                    required
                  />
                </Field>
                <Field label="Company *">
                  <input
                    data-testid="form-company"
                    className="input-line"
                    value={form.company}
                    onChange={update("company")}
                    placeholder="Importer / Distributor"
                    required
                  />
                </Field>
                <Field label="Country *">
                  <input
                    data-testid="form-country"
                    className="input-line"
                    value={form.country}
                    onChange={update("country")}
                    placeholder="Destination country"
                    required
                  />
                </Field>
                <Field label="Phone (optional)">
                  <input
                    data-testid="form-phone"
                    className="input-line"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+ country code"
                  />
                </Field>
                <Field label="Order Quantity (MT) *">
                  <input
                    data-testid="form-qty"
                    className="input-line"
                    value={form.order_quantity_mt}
                    onChange={update("order_quantity_mt")}
                    placeholder="e.g. 25 MT, 1 FCL"
                    required
                  />
                </Field>
              </div>

              <Field label="Product Interest">
                <select
                  data-testid="form-product"
                  className="input-line cursor-pointer"
                  value={form.product_interest}
                  onChange={update("product_interest")}
                >
                  {PRODUCT_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </Field>

              <Field label="Additional Notes">
                <textarea
                  data-testid="form-message"
                  className="input-line resize-none"
                  rows={3}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Packaging preferences, delivery port, certifications required…"
                />
              </Field>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <p className="text-xs text-monsoon-charcoal/55 max-w-sm font-light">
                  Your details are shared only with our export team. We respect buyer confidentiality.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="form-submit"
                  className="btn-gold disabled:opacity-60"
                >
                  {loading ? "Submitting…" : "Send Inquiry"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="label-overline">{label}</span>
      {children}
    </label>
  );
}

function InfoLine({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-5 items-start">
      <div className="w-10 h-10 border border-basmati-gold/40 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-basmati-gold" />
      </div>
      <div>
        <div className="overline !text-[10px]">{label}</div>
        <div className="mt-1 text-monsoon-charcoal font-light leading-relaxed">{value}</div>
      </div>
    </div>
  );
}
