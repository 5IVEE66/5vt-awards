  return <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#192134]">
    {failed ? <div className="px-3 text-center text-xs text-slate-400">Photo pending upload</div> : <img src={nominee.image} alt={`${nominee.name} nominee`} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-contain" />}
  </div>;
}

export default function Home() {
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [peopleChoice, setPeopleChoice] = useState("");
  return <main className="min-h-screen bg-[#080d1a] text-white">
    <header className="sticky top-0 z-20 border-b border-amber-300/20 bg-[#080d1a]/95 px-5 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <a href="#top" className="text-xl font-black tracking-widest">5VT <span className="text-amber-300">AWARDS</span></a>
        <nav className="flex flex-wrap gap-4 text-xs font-semibold sm:text-sm">
          {categories.map(c => <a key={c.id} href={`#${c.id}`} className="hover:text-amber-300">{c.title.replace(" Awards", "")}</a>)}
        </nav>
      </div>
    </header>
    <section id="top" className="relative overflow-hidden px-5 py-20 text-center md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />
      <p className="relative mb-5 text-xs font-bold tracking-[.35em] text-amber-300">5IVE STUDIOS PRESENTS · 2026</p>
      <h1 className="relative text-5xl font-black tracking-tight md:text-7xl">5VT <span className="text-amber-300">AWARDS</span></h1>
      <p className="relative mx-auto mt-6 max-w-2xl text-slate-300">Celebrating the artists, creators, supporters, and unforgettable moments shaping the 5VT community.</p>
      <a href="#creative-arts" className="relative mt-9 inline-block rounded-lg bg-amber-300 px-8 py-4 font-bold text-slate-950 hover:bg-amber-200">EXPLORE NOMINEES</a>
    </section>
    <div className="mx-auto max-w-7xl px-5 pb-24 md:px-10">
      {categories.map(category => <div key={category.id} id={category.id} className="scroll-mt-24">
        <div className="border-t border-amber-300/30 pt-16 text-center">
          <p className="mb-3 text-xs font-bold tracking-[.3em] text-amber-300">2026 · 5IVE STUDIOS</p>
          <h2 className="text-3xl font-black uppercase text-amber-300 md:text-5xl">{category.title}</h2>
        </div>
        {category.awards.map((award, i) => <section id={award.id} key={award.id} className="scroll-mt-24 border-b border-white/10 py-16">
          <div className="mb-9 text-center">
            <p className="mb-3 text-xs font-bold tracking-[.3em] text-amber-300">{category.title.toUpperCase()} · AWARD {String(i + 1).padStart(2, "0")}</p>
            <h3 className="text-3xl font-black uppercase md:text-5xl">{award.title}</h3>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">{award.description}</p>
          </div>
          {award.openNomination ? <div className="mx-auto max-w-xl rounded-xl border border-amber-300/25 bg-white/5 p-6">
            <label htmlFor="peoples-choice-name" className="mb-3 block font-bold">Nominate anyone in the 5VT community</label>
            <input id="peoples-choice-name" value={peopleChoice} onChange={e => setPeopleChoice(e.target.value)} maxLength={80} placeholder="Enter their Twitch name or community name" className="w-full rounded-lg border border-white/20 bg-[#111b2c] px-4 py-3 text-white outline-none focus:border-amber-300" />
            <p className="mt-4 text-sm text-slate-300">{peopleChoice.trim() ? `Your preview nomination: ${peopleChoice.trim()}` : "No nomination entered yet."}</p>
            <p className="mt-2 text-xs text-slate-400">Preview only — nominations are not submitted or counted yet.</p>
          </div> : <>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
              {award.nominees.map((n, j) => <button key={`${award.id}-${j}`} type="button" aria-pressed={choices[award.id] === String(j)} onClick={() => setChoices(p => ({ ...p, [award.id]: String(j) }))} className={`overflow-hidden rounded-xl border text-left transition hover:-translate-y-1 ${choices[award.id] === String(j) ? "border-amber-300 bg-amber-300/15 ring-2 ring-amber-300" : "border-white/15 bg-white/5 hover:border-amber-300/70"}`}>
                <NomineePhoto nominee={n} />
                <div className="flex min-h-28 flex-col items-center justify-center gap-1 p-3 text-center">
                  <span className="break-words text-sm font-bold sm:text-base">{n.name}</span>
                  {n.detail && <span className="text-xs text-slate-300">{n.detail}</span>}
                  <span className={`mt-2 text-xs font-semibold ${choices[award.id] === String(j) ? "text-amber-300" : "text-slate-400"}`}>{choices[award.id] === String(j) ? "✓ Selected" : "Select nominee"}</span>
                </div>
              </button>)}
            </div>
            <div className="mt-8 rounded-xl border border-amber-300/20 bg-white/5 p-5 text-center">
              <p className="font-semibold">{choices[award.id] !== undefined ? `Selected: ${award.nominees[Number(choices[award.id])].name}` : "Choose one nominee above"}</p>
              <p className="mt-2 text-sm text-slate-400">Preview only — selections are not saved or counted as votes.</p>
            </div>
          </>}
        </section>)}
      </div>)}
    </div>
    <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-slate-400">© 2026 5IVE STUDIOS · ALL AWARDS · PREVIEW MODE</footer>
  </main>;
}
