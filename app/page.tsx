"use client";

import { useState } from "react";

const nominees = [
  { name: "0HTHATSM0", photo: "/nominees/0hthatsm0.webp" },
  { name: "WydLethal", photo: "/nominees/wydlethal.webp" },
  { name: "Khiistaxxx", photo: "/nominees/khiistaxxx.webp" },
  { name: "layymuseum", photo: "/nominees/layymuseum.webp" },
  { name: "notdripland", photo: "/nominees/notdripland.webp" },
];

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <main className="min-h-screen bg-[#081326] text-white">
      <header className="border-b border-white/10 px-6 py-5 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="#top" className="text-xl font-black tracking-widest">5VT <span className="text-blue-300">AWARDS</span></a>
          <a href="#category-1" className="rounded-full border border-blue-300/50 px-5 py-2 text-sm font-semibold hover:bg-white/10">View Nominees</a>
        </div>
      </header>
      <section id="top" className="relative overflow-hidden px-6 py-20 text-center md:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <p className="relative mb-5 text-xs font-bold tracking-[.35em] text-blue-300">5IVE STUDIOS PRESENTS</p>
        <h1 className="relative text-5xl font-black tracking-tight md:text-8xl">THE 5VT<br /><span className="text-blue-300">AWARDS</span></h1>
        <p className="relative mx-auto mt-6 max-w-xl text-slate-300">Celebrating the creators, streams, and moments that defined the year.</p>
        <a href="#category-1" className="relative mt-9 inline-block rounded-lg bg-blue-300 px-8 py-4 font-bold text-slate-950 hover:bg-blue-200">EXPLORE NOMINEES</a>
      </section>
      <section id="category-1" className="mx-auto max-w-7xl px-5 pb-24 pt-8 md:px-10">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold tracking-[.3em] text-blue-300">CATEGORY 01</p>
          <h2 className="text-3xl font-black uppercase md:text-5xl">5VT Streamer of the Year</h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">This award is awarded to the individual who has demonstrated outstanding dedication to streaming throughout the year. Whether it’s through consistency, entertaining content, or building a community of your own, your hard work deserves to be celebrated.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
          {nominees.map((nominee) => (
            <button key={nominee.name} type="button" aria-pressed={selected === nominee.name} onClick={() => setSelected(nominee.name)} className={`overflow-hidden rounded-xl border text-left transition hover:-translate-y-1 ${selected === nominee.name ? "border-blue-300 bg-blue-300/15 ring-2 ring-blue-300" : "border-white/15 bg-white/5 hover:border-blue-300/70"}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#1b2b45]">
                <img src={nominee.photo} alt={`${nominee.name} nominee portrait`} className="h-full w-full object-contain" />
              </div>
              <div className="flex min-h-20 flex-col items-center justify-center gap-2 p-3 text-center">
                <span className="break-all text-sm font-bold sm:text-base">{nominee.name}</span>
                <span className={`text-xs font-semibold ${selected === nominee.name ? "text-blue-300" : "text-slate-400"}`}>{selected === nominee.name ? "✓ Selected" : "Select nominee"}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-9 rounded-xl border border-blue-300/20 bg-white/5 p-5 text-center">
          <p className="font-semibold">{selected ? `You selected ${selected}` : "Select a nominee above to preview your choice"}</p>
          <p className="mt-2 text-sm text-slate-400">Preview only — votes are not being recorded yet. Secure Twitch sign-in and ballot submission will be added before voting opens.</p>
        </div>
      </section>
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-slate-400">© 2026 5IVE STUDIOS. ALL RIGHTS RESERVED.</footer>
    </main>
  );
}
