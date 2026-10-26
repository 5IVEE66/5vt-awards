"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Result = { award_id: string; nominee_id: string; votes: number };
type Dashboard = { role: "owner" | "viewer"; voting_open: boolean; total_votes: number; unique_voters: number; results: Result[] };
const titles: Record<string, string> = {
  streamer: "5VT Streamer of the Year", masterpiece: "5VT Masterpiece Award", visionary: "5VT Visionary Award", creator: "5VT Creator of the Year",
  "valuable-artist": "5VT Most Valuable Artist", hitmaker: "5VT Hitmaker", "record-excellence": "5VT Record of Excellence",
  rookie: "5VT Rookie of the Year", "peoples-choice": "5VT People's Choice", "valuable-5ive": "5VT Most Valuable 5ive",
  woman: "5VT Woman of the Year", chatter: "5VT Chatter of the Year"
};
const awardIds = Object.keys(titles);
const pretty = (s: string) => s.replace(/-/g, " ");

export default function AdminPage() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [newUid, setNewUid] = useState("");
  const [notice, setNotice] = useState("");

  async function load() {
    setError("");
    const { data: auth } = await supabase.auth.getUser();
    setSignedIn(!!auth.user);
    if (!auth.user) { setData(null); return; }
    const { data: result, error: err } = await supabase.rpc("awards_admin_results");
    if (err) { setData(null); setError("Access denied, or admin setup is incomplete. " + err.message); return; }
    setData(result as Dashboard);
  }
  useEffect(() => { void load(); const { data: listener } = supabase.auth.onAuthStateChange(() => { void load(); }); return () => listener.subscription.unsubscribe(); }, []);

  async function login() {
    await supabase.auth.signInWithOAuth({ provider: "twitch", options: { redirectTo: `${window.location.origin}/admin` } });
  }
  async function toggleVoting() {
    if (!data || data.role !== "owner") return;
    const next = !data.voting_open;
    if (!window.confirm(`Are you sure you want to ${next ? "OPEN" : "CLOSE"} voting?`)) return;
    setBusy(true); setNotice("");
    const { error: err } = await supabase.rpc("awards_set_voting", { is_open: next });
    if (err) setError(err.message); else { setNotice(`Voting ${next ? "opened" : "closed"}.`); await load(); }
    setBusy(false);
  }
  async function addViewer() {
    if (!data || data.role !== "owner" || !newUid.trim()) return;
    setBusy(true); setNotice(""); setError("");
    const { error: err } = await supabase.rpc("awards_add_viewer", { new_user_id: newUid.trim() });
    if (err) setError(err.message); else { setNotice("Viewer added successfully."); setNewUid(""); }
    setBusy(false);
  }
  const button = "rounded-lg bg-amber-400 px-4 py-2 font-semibold text-slate-950 disabled:opacity-50";
  return <main className="min-h-screen bg-[#080d1a] px-4 py-10 text-white">
    <div className="mx-auto max-w-5xl space-y-7">
      <header className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-bold tracking-[0.2em] text-amber-400">5IVE STUDIOS</p><h1 className="mt-2 text-3xl font-bold">Awards Admin Dashboard</h1><p className="mt-2 text-slate-400">Private voting results</p></div><a className="text-amber-300 underline" href="/">Back to voting</a></header>
      {signedIn === null && <p>Checking login…</p>}
      {signedIn === false && <div className="rounded-xl bg-slate-900 p-6"><p className="mb-4">Sign in with your approved Twitch account.</p><button className={button} onClick={login}>Log in with Twitch</button></div>}
      {error && <p role="alert" className="rounded-lg border border-red-500 p-4 text-red-300">{error}</p>}
      {notice && <p role="status" className="rounded-lg border border-emerald-500 p-4 text-emerald-300">{notice}</p>}
      {data && <>
        <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-slate-300">Role: <strong className="capitalize text-amber-300">{data.role}</strong> · Voting: <strong>{data.voting_open ? "Open" : "Closed"}</strong></p><button className={button} onClick={() => void load()}>Refresh results</button></div>
        <section className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {[{ label: "Total votes", value: data.total_votes }, { label: "Unique voters", value: data.unique_voters }, { label: "Awards", value: 12 }].map(x => <div key={x.label} className="rounded-xl bg-slate-900 p-5"><p className="text-sm text-slate-400">{x.label}</p><p className="mt-2 text-3xl font-bold text-amber-300">{x.value}</p></div>)}
        </section>
        {data.role === "owner" && <section className="space-y-4 rounded-xl border border-amber-500/40 bg-slate-900 p-5"><h2 className="text-xl font-semibold text-amber-300">Owner controls</h2><button disabled={busy} onClick={() => void toggleVoting()} className={button}>{data.voting_open ? "Close voting" : "Open voting"}</button><div className="space-y-2"><label htmlFor="uid" className="block text-sm text-slate-300">Add a view-only admin by their Supabase User UID (they must log in once first)</label><div className="flex flex-wrap gap-2"><input id="uid" value={newUid} onChange={e => setNewUid(e.target.value)} placeholder="Supabase User UID" className="min-w-0 flex-1 rounded-lg border border-slate-600 bg-slate-800 p-2 text-white"/><button disabled={busy || !newUid.trim()} onClick={() => void addViewer()} className={button}>Add viewer</button></div></div></section>}
        <section className="space-y-5"><h2 className="text-2xl font-semibold">Award results</h2>{awardIds.map(id => {
          const rows = data.results.filter(x => x.award_id === id).sort((a,b) => b.votes-a.votes || a.nominee_id.localeCompare(b.nominee_id));
          const total = rows.reduce((n,r) => n+r.votes, 0);
          return <article key={id} className="rounded-xl bg-slate-900 p-5"><div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-semibold text-amber-300">{titles[id]}</h3><span className="text-sm text-slate-400">{total} vote{total===1?"":"s"}</span></div>{rows.length === 0 ? <p className="text-sm text-slate-400">No votes yet</p> : <div className="space-y-3">{rows.map(r => <div key={r.nominee_id}><div className="mb-1 flex justify-between gap-3 text-sm"><span>{pretty(r.nominee_id)}{r.votes===rows[0].votes ? " ★" : ""}</span><span>{r.votes} ({Math.round(r.votes/total*100)}%)</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-700"><div className="h-full rounded-full bg-amber-400" style={{width:`${r.votes/total*100}%`}}/></div></div>)}</div>}</article>;
        })}</section>
      </>}
    </div>
  </main>;
}

