"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon } from "./Icons";
import RollText from "./RollText";

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function featuresOf(plan) {
  if (Array.isArray(plan.features)) return plan.features.filter(Boolean);
  return String(plan.features || "")
    .split(/\n|·/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function Check() {
  return (
    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center" aria-hidden>
      <svg viewBox="0 0 12 10" className="h-2.5 w-3">
        <path d="M 4 9.4 L 0 5.4 L 1.4 4 L 4 6.6 L 10.6 0 L 12 1.4 Z" fill="#ecfdad" />
      </svg>
    </span>
  );
}

function PlanButton({ popular, label }) {
  return (
    <Link
      href="/contact"
      className={`group relative flex h-12 w-full items-center pl-6 pr-14 text-[14px] font-semibold uppercase ${
        popular ? "bg-lime text-ink" : "border border-[#484848] text-white"
      }`}
    >
      <RollText text={label} />
      <span
        className={`absolute right-2.5 grid h-7 w-7 place-items-center ${popular ? "bg-ink text-lime" : "bg-lime text-ink"}`}
      >
        <ArrowIcon className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export default function PricingCards({ plans = [], note = "", copy = {} }) {
  const [retainer, setRetainer] = useState(true);
  const per = copy.pricingPer || "Per project";
  const retainerLabel = copy.pricingRetainer || "Retainer";
  const save = copy.pricingSave || "(Save 20%)";
  const included = copy.pricingIncluded || "What's included";
  const popularLabel = copy.pricingPopular || "Popular";
  const start = copy.pricingStart || "Start your project";
  const month = copy.pricingMonth || "/ month";
  const projectUnit = copy.pricingProject || "/ project";

  return (
    <div className="mx-auto flex w-full max-w-[1096px] flex-col items-center gap-12">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setRetainer(false)}
          className="text-[20px] font-semibold leading-[30px] tracking-[-0.01em] text-white"
          aria-pressed={!retainer}
        >
          {per}
        </button>
        <button
          type="button"
          aria-label={retainer ? retainerLabel : per}
          onClick={() => setRetainer((value) => !value)}
          className="relative h-[30px] w-[67px] border border-[#484848]"
        >
          <span
            className="absolute left-[6px] top-[6px] h-[18px] w-7 bg-lime transition-transform duration-300 ease-out"
            style={{ transform: retainer ? "translateX(0px)" : "translateX(27px)" }}
          />
        </button>
        <button
          type="button"
          onClick={() => setRetainer(true)}
          className="text-[20px] font-semibold leading-[30px] tracking-[-0.01em] text-white"
          aria-pressed={retainer}
        >
          {retainerLabel} <span className="text-base font-normal text-[#dbd7d7]">{save}</span>
        </button>
      </div>

      <div className="grid w-full gap-6 lg:grid-cols-2">
        {plans.map((plan) => {
          const price = retainer ? plan.retainer : plan.project;
          const popular = Boolean(plan.popular);
          const features = featuresOf(plan);
          return (
            <article key={plan.name} className="relative flex h-full flex-col bg-panel">
              {popular ? (
                <span className="absolute right-4 top-8 bg-lime px-8 py-[13px] text-[20px] font-semibold leading-[30px] tracking-[-0.01em] text-ink">
                  {popularLabel}
                </span>
              ) : null}
              <div className="flex flex-col gap-10 p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-lime" aria-hidden />
                  <p className="text-[20px] font-semibold leading-[30px] tracking-[-0.01em]">{plan.name}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="flex items-end">
                    <span className="font-pixel text-[64px] leading-[0.9] text-white">{money(price)}</span>
                    <span className="mb-1 ml-2 text-lg leading-[27px] tracking-[-0.01em] text-[#b9b8b8]">
                      {retainer ? month : projectUnit}
                    </span>
                  </p>
                  <p className="max-w-[28rem] text-lg leading-[27px] tracking-[-0.01em] text-[#b9b8b8]">{plan.blurb}</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col px-8 pb-8 md:px-10 md:pb-10">
                <p className="text-base font-medium leading-6 tracking-[-0.01em]">{included}</p>
                <ul className="mt-6 flex flex-col gap-[13px]">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[20px] font-medium leading-[30px] tracking-[-0.01em]">
                      <Check />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-16">
                  <PlanButton popular={popular} label={start} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {note ? <p className="text-center text-sm leading-6 tracking-[-0.01em] text-[#b9b8b8]">{note}</p> : null}
    </div>
  );
}
