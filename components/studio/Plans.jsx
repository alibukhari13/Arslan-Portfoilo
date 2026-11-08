import Link from "next/link";

function money(value) {
  return `$${Number(value || 0).toLocaleString("en-US")}`;
}

export default function Plans({ plans = [], note }) {
  return (
    <div>
      {note ? <p className="max-w-xl text-[#555]">{note}</p> : null}
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {plans.map((plan) => {
          const features = Array.isArray(plan.features) ? plan.features : [];
          return (
            <article key={plan.name} className={`flex flex-col p-8 ${plan.popular ? "bg-[#0b0b0c] text-white" : "bg-[#f6f6f6]"}`}>
              <div className="flex items-center justify-between gap-4">
                <h3 className={`text-xl ${plan.popular ? "text-white" : ""}`}>{plan.name}</h3>
                {plan.popular ? <span className="text-xs uppercase tracking-[0.14em] text-[#F9452D]">Recommended</span> : null}
              </div>
              <p className="mt-8 text-6xl leading-none">{money(plan.project)}</p>
              <p className={`mt-2 text-sm ${plan.popular ? "text-white/60" : "text-[#777]"}`}>
                / project · retainer {money(plan.retainer)} / month
              </p>
              <p className={`mt-4 text-sm leading-6 ${plan.popular ? "text-white/75" : "text-[#555]"}`}>{plan.blurb}</p>
              <Link
                href="/contact"
                className={`mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm ${plan.popular ? "bg-white text-black" : "bg-[#0b0b0c] text-white"}`}
              >
                Choose this plan <span aria-hidden>→</span>
              </Link>
              <p className={`mt-8 text-xs uppercase tracking-[0.14em] ${plan.popular ? "text-white/50" : "text-[#888]"}`}>What’s included</p>
              <ul className="mt-3 space-y-2 text-sm">
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
