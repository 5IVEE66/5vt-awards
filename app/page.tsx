"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

type Nominee = { name: string; image: string; detail?: string };
type Award = { id: string; title: string; description: string; nominees: Nominee[]; openNomination?: boolean };
type Category = { id: string; title: string; awards: Award[] };
type Vote = { award_id: string; nominee_id: string };

const photo = (id: string) => `/nominees/${id}.webp`;
const musical = (filename: string) => `/musical-arts/${filename}`;
const annual = (id: string) => `/annual-achievement/${id}.webp`;

// IDs must match the approved nominee IDs in Supabase.
const musicIds: Record<string, string> = {
  "01-Zyyannn.png":"zyyannn", "02-KeyunDh.png":"keyundh",
  "03-Jaelblancoo.png":"jaelblancoo", "04-TaliBandz.png":"talibandz",
  "05-Plezo.png":"plezo", "01-DA-TEAM-REMIX.png":"da-team-remix",
  "02-liketorun.png":"liketorun", "03-Tyreek.png":"tyreek",
  "04-Bottega.png":"bottega", "05-Blake.png":"blake",
  "06-LeGOOSE-COAT.png":"legoose-coat", "07-Bippin-with-5.png":"bippin-with-5",
  "01-1of1.png":"1of1", "02-7219-2-ASHMEAD.png":"7219-2-ashmead",
  "03-Take-3.png":"take-3", "04-LIL-NICO.png":"lil-nico",
  "05-Only-Cause-Yall-Asked.png":"only-cause-yall-asked"
};
function nomineeId(n: Nominee): string {
  const file = n.image.split("/").pop() || "";
  if (n.image.startsWith("/musical-arts/")) return musicIds[file] || "";
  return file.replace(/\.webp$/, "");
}

const categories: Category[] = [
  {
    id: "creative-arts", title: "Creative Arts Awards", awards: [
      { id: "streamer", title: "5VT Streamer of the Year", description: "This award is awarded to the individual who has demonstrated outstanding dedication to streaming throughout the year. Whether it's through consistency, entertaining content, or building a community of your own, your hard work deserves to be celebrated.", nominees: [
        { name: "0HTHATSM0", image: photo("0hthatsm0") }, { name: "WydLethal", image: photo("wydlethal") }, { name: "Khiistaxxx", image: photo("khiistaxxx") }, { name: "layymuseum", image: photo("layymuseum") }, { name: "notdripland", image: photo("notdripland") }
      ] },
      { id: "masterpiece", title: "5VT Masterpiece Award", description: "Honors an exceptionally creative and well-executed project.", nominees: [
        { name: "FNAF Marathon", detail: "Sparkshot55", image: photo("fnaf-marathon") }, { name: "Assassin’s Creed Marathon", detail: "0HTHATSM0", image: photo("assassins-creed-marathon") }, { name: "30 Days 30 Skills", detail: "WydLethal", image: photo("30-days-30-skills") }, { name: "Neoween", detail: "layymuseum", image: photo("neoween") }, { name: "Mario Marathon", detail: "Sparkshot55", image: photo("mario-marathon") }
      ] },
      { id: "visionary", title: "5VT Visionary Award", description: "This award is awarded to the individual who sees possibilities where others see limitations. Your ability to think ahead, develop unique concepts, and bring fresh perspectives to the community is something truly special.", nominees: [
        { name: "WydLethal", image: photo("wydlethal") }, { name: "0HTHATSM0", image: photo("0hthatsm0") }, { name: "layymuseum", image: photo("layymuseum") }
      ] },
      { id: "creator", title: "5VT Creator of the Year", description: "This award recognizes an individual who has demonstrated outstanding creativity, originality, and dedication to content creation outside of streaming.", nominees: [
        { name: "Plezoooo", detail: "Skits", image: photo("plezoooo") }, { name: "noeluv.fredo", detail: "Dancer", image: photo("noeluv-fredo") }, { name: "layymuseum", detail: "Artist", image: photo("layymuseum") }, { name: "TopTrollJon15", detail: "Dancer", image: photo("toptrolljon15") }, { name: "SparkShot55", detail: "Food Content", image: photo("sparkshot55") }
      ] }
    ]
  },
  {
    id: "musical-arts", title: "Musical Arts Awards", awards: [
      { id: "valuable-artist", title: "5VT Most Valuable Artist Award", description: "This award honors an artist whose passion, dedication, and undeniable talent continue to inspire the 5VT community. Your journey is proof that greatness comes from believing in yourself and never giving up on your dreams.", nominees: [
        { name: "Zyyannn", image: musical("01-Zyyannn.png") }, { name: "KeyunDh", image: musical("02-KeyunDh.png") }, { name: "Jaelblancoo", image: musical("03-Jaelblancoo.png") }, { name: "TaliBandz", image: musical("04-TaliBandz.png") }, { name: "Plezo", image: musical("05-Plezo.png") }
      ] },
      { id: "record-excellence", title: "5VT Record of Excellence Award", description: "This award honors an artist whose creativity, passion, and dedication have transformed their vision into an unforgettable musical project. Your work is a testament to the power of self-expression and the impact music can leave on a community.", nominees: [
        { name: "1of1", detail: "Zyyannn", image: musical("01-1of1.png") }, { name: "7219 2 ASHMEAD", detail: "Jaelblancoo", image: musical("02-7219-2-ASHMEAD.png") }, { name: "Take 3", detail: "Z3nx0", image: musical("03-Take-3.png") }, { name: "LIL NICO", detail: "Jaelblancoo", image: musical("04-LIL-NICO.png") }, { name: "Only Cause Ya’ll Asked", detail: "Plezo", image: musical("05-Only-Cause-Yall-Asked.png") }
      ] },
      { id: "hitmaker", title: "5VT Hitmaker Award", description: "This award celebrates the artist behind the most memorable song in the community this year. Your music left a lasting impression on 5VT.", nominees: [
        { name: "DA TEAM (REMIX)", image: musical("01-DA-TEAM-REMIX.png") }, { name: "liketorun", image: musical("02-liketorun.png") }, { name: "Tyreek", image: musical("03-Tyreek.png") }, { name: "Bottega", image: musical("04-Bottega.png") }, { name: "Blake", image: musical("05-Blake.png") }, { name: "LeGOOSE COAT", image: musical("06-LeGOOSE-COAT.png") }, { name: "Bippin with 5", image: musical("07-Bippin-with-5.png") }
      ] }
    ]
  },
  {
    id: "annual-achievement", title: "Annual Achievement Awards", awards: [
      { id: "rookie", title: "5VT Rookie of the Year Award", description: "This award celebrates a fairly new supporter who joined within the last six months and has already made an unforgettable impact. Their presence, energy, and name carry weight throughout the 5VT community.", nominees: [
        { name: "Zyyannn", image: annual("zyyannn") }, { name: "KeenOffCam", image: annual("keenoffcam") }, { name: "Theonlymiimii_444", image: annual("theonlymiimii_444") }, { name: "Wraxs", image: annual("wraxs") }, { name: "Bammb00zl3d", image: annual("bammb00zl3d") }
      ] },
      { id: "peoples-choice", title: "5VT People's Choice Award", description: "This award honors the individual who has earned the love, respect, and recognition of the 5VT community. Unlike other awards, this winner is chosen entirely by the PEOPLE.", openNomination: true, nominees: [] },
      { id: "valuable-5ive", title: "5VT Most Valuable 5ive Award", description: "This award recognizes the person who best represents 5VT through their loyalty, involvement, personality, and lasting impact on the community.", nominees: [
        { name: "ThatsSoChilly", image: annual("thatsschilly") }, { name: "LiyyLovesYouu", image: annual("liyy-loves-you") }, { name: "OfficialMayNorth", image: annual("officialmaynorth") }, { name: "Zyyannn", image: annual("zyyannn") }, { name: "RobWasn’tHere", image: annual("rob-wasnt-here") }, { name: "KeyunDh", image: annual("keyundh") }
      ] },
      { id: "woman", title: "5VT Woman of the Year Award", description: "This award celebrates a woman who embodies strength, confidence, and excellence. Through her influence, dedication, and impact, she continues to inspire others, uplift the community, and prove that greatness knows no limits.", nominees: [
        { name: "leaa_eunoia", image: annual("leaa-eunoia") }, { name: "ThatsSoChilly", image: annual("thatsschilly") }, { name: "TaliRenee", image: annual("talirenee") }, { name: "FavoritesFavorite", image: annual("favoritesfavorite") }, { name: "LiyyLovesYou", image: annual("liyy-loves-you") }, { name: "Theonlymiimii_444", image: annual("theonlymiimii_444") }
      ] },
      { id: "chatter", title: "5VT Chatter of the Year", description: "This award recognizes the person who consistently makes Twitch chat more entertaining, engaging, and interactive.", nominees: [
        { name: "OfficialMayNorth", image: annual("officialmaynorth") }, { name: "ThatsSoChilly", image: annual("thatsschilly") }, { name: "LiyyLovesYou", image: annual("liyy-loves-you") }, { name: "TaliRenee", image: annual("talirenee") }, { name: "Zyyann", image: annual("zyyannn") }, { name: "Jahxgeez_", image: annual("jahxgeez") }
      ] }
    ]
  }
];

function NomineePhoto({ nominee }: { nominee: Nominee }) {
  const [failed, setFailed] = useState(false);
  return <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#192134]">
    {failed ? <span className="px-3 text-center text-xs text-slate-400">Photo unavailable</span> :
      <img src={nominee.image} alt={`${nominee.name} nominee`} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />}
  </div>;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [peopleChoice, setPeopleChoice] = useState("");
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState("");
  const [voteLoading, setVoteLoading] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({data,error}) => {
      if (!active) return;
      if (error) setAuthError(error.message);
      setUser(data.user);
      setLoading(false);
    }).catch(() => { if (active) { setAuthError("Could not check login status."); setLoading(false); } });
    const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) { setUser(session?.user ?? null); setLoading(false); }
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    let active = true;
    setVotes({});
    if (!user) { setVoteLoading(false); return; }
    setVoteLoading(true);
    supabase.from("votes").select("award_id, nominee_id").then(({data,error}) => {
      if (!active) return;
      if (error) setAuthError(`Unable to load your votes: ${error.message}`);
      else setVotes(Object.fromEntries((data as Vote[] || []).map(v => [v.award_id, v.nominee_id])));
      setVoteLoading(false);
    });
    return () => { active = false; };
  }, [user?.id]);

  async function loginWithTwitch() {
    setAuthError("");
    const {error} = await supabase.auth.signInWithOAuth({
      provider: "twitch", options: {redirectTo: "https://5vt-awards.vercel.app/"}
    });
    if (error) setAuthError(error.message);
  }
  async function logout() {
    const {error} = await supabase.auth.signOut();
    if (error) setAuthError(error.message);
    else { setUser(null); setVotes({}); setChoices({}); setMessage({}); }
  }
  async function submitVote(award: Award) {
    if (!user || busy || voteLoading || votes[award.id] !== undefined) return;
    const id = award.openNomination ? peopleChoice.trim().replace(/\s+/g, " ") : choices[award.id];
    if (!id || (award.openNomination && (id.length < 2 || id.length > 80))) {
      setMessage(p => ({...p, [award.id]: "Choose a nominee, or enter a name between 2 and 80 characters."}));
      return;
    }
    setBusy(award.id);
    setMessage(p => ({...p, [award.id]: ""}));
    const {error} = await supabase.from("votes").insert({
      voter_id: user.id, award_id: award.id, nominee_id: id
    });
    if (error) {
      // If another tab already voted, reload the authoritative record.
      const {data} = await supabase.from("votes").select("award_id, nominee_id").eq("award_id", award.id).maybeSingle();
      if (data) setVotes(p => ({...p, [award.id]: data.nominee_id}));
      setMessage(p => ({...p, [award.id]: data ? "Your vote was already recorded." : `Vote not saved: ${error.message}`}));
    } else {
      setVotes(p => ({...p, [award.id]: id}));
      setMessage(p => ({...p, [award.id]: "Your vote was recorded successfully!"}));
    }
    setBusy(null);
  }

  const twitchName = user?.user_metadata?.preferred_username || user?.user_metadata?.user_name || user?.user_metadata?.name || "Twitch User";
  const recordedCount = Object.keys(votes).length;

  return <main className="min-h-screen bg-[#080d1a] text-white">
    <header className="sticky top-0 z-20 border-b border-amber-300/20 bg-[#080d1a]/95 px-5 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <a href="#top" className="text-xl font-black tracking-widest">5VT <span className="text-amber-300">AWARDS</span></a>
        <nav className="flex flex-wrap gap-4 text-xs font-semibold sm:text-sm">
          {categories.map(c => <a key={c.id} href={`#${c.id}`} className="hover:text-amber-300">{c.title.replace(" Awards", "")}</a>)}
        </nav>
        {loading ? <span className="text-sm text-slate-300">Checking login...</span> : user ?
          <div className="flex items-center gap-3"><span className="text-sm text-amber-300">{twitchName}</span><button onClick={logout} className="rounded-lg border border-white/20 px-4 py-2 text-sm">Logout</button></div> :
          <button onClick={loginWithTwitch} className="rounded-lg bg-purple-600 px-5 py-2 font-bold hover:bg-purple-500">Login with Twitch</button>}
      </div>
      {authError && <p role="alert" className="mx-auto max-w-7xl px-4 py-2 text-sm text-red-300">{authError}</p>}
    </header>
    <section id="top" className="relative overflow-hidden px-5 py-20 text-center md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />
      <p className="relative mb-5 text-xs font-bold tracking-[.35em] text-amber-300">5IVE STUDIOS PRESENTS · 2026</p>
      <h1 className="relative text-5xl font-black tracking-tight md:text-7xl">5VT <span className="text-amber-300">AWARDS</span></h1>
      <p className="relative mx-auto mt-6 max-w-2xl text-slate-300">Celebrating the artists, creators, supporters, and unforgettable moments shaping the 5VT community.</p>
      <p className="relative mt-4 text-sm text-amber-300">{user ? `${twitchName} · ${recordedCount} of 12 votes recorded` : "Log in with Twitch to submit your votes."}</p>
      <a href="#creative-arts" className="relative mt-9 inline-block rounded-lg bg-amber-300 px-8 py-4 font-bold text-slate-950 hover:bg-amber-200">EXPLORE NOMINEES</a>
    </section>
    <div className="mx-auto max-w-7xl px-5 pb-24 md:px-10">
      {categories.map(category => <div key={category.id} id={category.id} className="scroll-mt-24">
        <div className="border-t border-amber-300/30 pt-16 text-center">
          <p className="mb-3 text-xs font-bold tracking-[.3em] text-amber-300">2026 · 5IVE STUDIOS</p>
          <h2 className="text-3xl font-black uppercase text-amber-300 md:text-5xl">{category.title}</h2>
        </div>
        {category.awards.map((award, i) => {
          const submitted = votes[award.id] !== undefined;
          const selected = choices[award.id];
          const selectedNominee = award.nominees.find(n => nomineeId(n) === selected);
          const recordedNominee = award.nominees.find(n => nomineeId(n) === votes[award.id]);
          return <section id={award.id} key={award.id} className="scroll-mt-24 border-b border-white/10 py-16">
            <div className="mb-9 text-center">
              <p className="mb-3 text-xs font-bold tracking-[.3em] text-amber-300">{category.title.toUpperCase()} · AWARD {String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-3xl font-black uppercase md:text-5xl">{award.title}</h3>
              <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">{award.description}</p>
            </div>
            {award.openNomination ? <div className="mx-auto max-w-xl rounded-xl border border-amber-300/25 bg-white/5 p-6">
              <label htmlFor="peoples-choice-name" className="mb-3 block font-bold">Nominate anyone in the 5VT community</label>
              <input id="peoples-choice-name" value={submitted ? votes[award.id] : peopleChoice} onChange={e => setPeopleChoice(e.target.value)} disabled={submitted || !user || voteLoading} maxLength={80} placeholder="Enter their Twitch name or community name" className="w-full rounded-lg border border-white/20 bg-[#111b2c] px-4 py-3 text-white outline-none focus:border-amber-300 disabled:opacity-60" />
            </div> : <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
              {award.nominees.map((n, j) => {
                const id = nomineeId(n);
                const chosen = submitted ? votes[award.id] === id : selected === id;
                return <button key={`${award.id}-${j}`} type="button" disabled={submitted || !user || voteLoading} aria-pressed={chosen} onClick={() => setChoices(p => ({...p, [award.id]: id}))} className={`overflow-hidden rounded-xl border text-left transition hover:-translate-y-1 disabled:cursor-default disabled:hover:translate-y-0 ${chosen ? "border-amber-300 bg-amber-300/15 ring-2 ring-amber-300" : "border-white/15 bg-white/5 hover:border-amber-300/70"}`}>
                  <NomineePhoto nominee={n} />
                  <div className="flex min-h-28 flex-col items-center justify-center gap-1 p-3 text-center">
                    <span className="break-words text-sm font-bold sm:text-base">{n.name}</span>
                    {n.detail && <span className="text-xs text-slate-300">{n.detail}</span>}
                    <span className={`mt-2 text-xs font-semibold ${chosen ? "text-amber-300" : "text-slate-400"}`}>{chosen ? (submitted ? "✓ Vote recorded" : "✓ Selected") : "Select nominee"}</span>
                  </div>
                </button>;
              })}
            </div>}
            <div className="mt-8 rounded-xl border border-amber-300/20 bg-white/5 p-5 text-center">
              <p className="font-semibold">{submitted ? `✓ Vote recorded: ${award.openNomination ? votes[award.id] : (recordedNominee?.name || votes[award.id])}` : !user ? "Log in with Twitch to vote" : voteLoading ? "Loading your saved votes..." : award.openNomination ? (peopleChoice.trim() ? `Nomination: ${peopleChoice.trim()}` : "Enter a name above") : selectedNominee ? `Selected: ${selectedNominee.name}` : "Choose one nominee above"}</p>
              {!submitted && user && !voteLoading && <button type="button" onClick={() => submitVote(award)} disabled={busy !== null || (award.openNomination ? peopleChoice.trim().length < 2 : !selectedNominee)} className="mt-4 rounded-lg bg-amber-300 px-8 py-3 font-bold text-slate-950 hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-40">{busy === award.id ? "Submitting..." : "Submit Vote"}</button>}
              {submitted && <p className="mt-2 text-xs text-slate-400">Your vote is final and cannot be changed.</p>}
              {message[award.id] && <p role="status" className="mt-3 text-sm text-amber-200">{message[award.id]}</p>}
            </div>
          </section>;
        })}
      </div>)}
    </div>
    <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-slate-400">© 2026 5IVE STUDIOS · ALL AWARDS</footer>
  </main>;
}
