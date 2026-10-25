"use client";
import { useState } from "react";

type Nominee = { name: string; image: string; detail?: string };
type Award = { id: string; title: string; description: string; nominees: Nominee[] };
const photo = (id: string) => `/nominees/${id}.webp`;
const music = (filename: string) => `/musical-arts/${filename}.png`;

const creativeAwards: Award[] = [
 {id:"streamer",title:"5VT Streamer of the Year",description:"This award is awarded to the individual who has demonstrated outstanding dedication to streaming throughout the year. Whether it's through consistency, entertaining content, or building a community of your own, your hard work deserves to be celebrated.",nominees:[
  {name:"0HTHATSM0",image:photo("0hthatsm0")},{name:"WydLethal",image:photo("wydlethal")},{name:"Khiistaxxx",image:photo("khiistaxxx")},{name:"layymuseum",image:photo("layymuseum")},{name:"notdripland",image:photo("notdripland")}]},
 {id:"masterpiece",title:"5VT Masterpiece Award",description:"Honors an exceptionally creative and well-executed project.",nominees:[
  {name:"FNAF Marathon",detail:"Sparkshot55",image:photo("fnaf-marathon")},{name:"Assassin’s Creed Marathon",detail:"0HTHATSM0",image:photo("assassins-creed-marathon")},{name:"30 Days 30 Skills",detail:"WydLethal",image:photo("30-days-30-skills")},{name:"Neoween",detail:"layymuseum",image:photo("neoween")},{name:"Mario Marathon",detail:"Sparkshot55",image:photo("mario-marathon")}]},
 {id:"visionary",title:"5VT Visionary Award",description:"This award is awarded to the individual who sees possibilities where others see limitations. Your ability to think ahead, develop unique concepts, and bring fresh perspectives to the community is something truly special.",nominees:[
  {name:"WydLethal",image:photo("wydlethal")},{name:"0HTHATSM0",image:photo("0hthatsm0")},{name:"layymuseum",image:photo("layymuseum")}]},
 {id:"creator",title:"5VT Creator of the Year",description:"This award recognizes an individual who has demonstrated outstanding creativity, originality, and dedication to content creation outside of streaming.",nominees:[
  {name:"Plezoooo",detail:"Skits",image:photo("plezoooo")},{name:"noeluv.fredo",detail:"Dancer",image:photo("noeluv-fredo")},{name:"layymuseum",detail:"Artist",image:photo("layymuseum")},{name:"TopTrollJon15",detail:"Dancer",image:photo("toptrolljon15")},{name:"SparkShot55",detail:"Food Content",image:photo("sparkshot55")}]}
];

const musicalAwards: Award[] = [
 {id:"mva",title:"5VT Most Valuable Artist Award",description:"This award honors an artist whose passion, dedication, and undeniable talent continue to inspire the 5VT community. Your journey is proof that greatness comes from believing in yourself and never giving up on your dreams.",nominees:[
  {name:"Zyyannn",image:music("01-Zyyannn")},{name:"KeyunDh",image:music("02-KeyunDh")},{name:"Jaelblancoo",image:music("03-Jaelblancoo")},{name:"TaliBandz",image:music("04-TaliBandz")},{name:"Plezo",image:music("05-Plezo")}]},
 {id:"hitmaker",title:"5VT Hitmaker Award",description:"This award honors the artist responsible for creating one of the most memorable songs within the community this year. Your music left a lasting impression on 5VT.",nominees:[
  {name:"DA TEAM (REMIX)",detail:"Jaelblancoo ft. KeyunDh, Simonbabyy",image:music("01-DA-TEAM-REMIX")},
  {name:"liketorun",detail:"KeyunDh",image:music("02-liketorun")},
  {name:"Tyreek",detail:"Zyyannn",image:music("03-Tyreek")},
  {name:"Bottega",detail:"KeyunDh",image:music("04-Bottega")},
  {name:"Blake",detail:"ZYYAN",image:music("05-Blake")},
  {name:"LeGOOSE COAT",detail:"Plezo x Kor",image:music("06-LeGOOSE-COAT")},
  {name:"Bippin with 5",detail:"Plezo ft. Sah5kk",image:music("07-Bippin-with-5")}]},
 {id:"record",title:"5VT Record of Excellence Award",description:"This award honors an artist whose creativity, passion, and dedication have transformed their vision into an unforgettable musical project. Your work is a testament to the power of self-expression and the impact music can leave on a community.",nominees:[
  {name:"1of1",detail:"Zyyannn",image:music("01-1of1")},
  {name:"7219 2 ASHMEAD",detail:"Jaelblancoo",image:music("02-7219-2-ASHMEAD")},
  {name:"Take 3",detail:"Z3nx0",image:music("03-Take-3")},
  {name:"LIL NICO",detail:"Jaelblancoo",image:music("04-LIL-NICO")},
  {name:"Only Cause Ya’ll Asked",detail:"Plezo",image:music("05-Only-Cause-Yall-Asked")}]}
];

export default function Home() {
 const [choices,setChoices] = useState<Record<string,string>>({});
 const renderAward = (award: Award, index: number, category: string) => (
  <section id={award.id} key={award.id} className="scroll-mt-24 border-t border-white/10 py-16">
   <div className="mb-9 text-center">
    <p className="mb-3 text-xs font-bold tracking-[.3em] text-amber-300">{category.toUpperCase()} · AWARD {String(index+1).padStart(2,"0")}</p>
    <h2 className="text-3xl font-black uppercase md:text-5xl">{award.title}</h2>
    <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">{award.description}</p>
   </div>
   <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
    {award.nominees.map((n,j)=><button key={`${award.id}-${j}`} type="button" aria-pressed={choices[award.id]===String(j)} onClick={()=>setChoices(p=>({...p,[award.id]:String(j)}))} className={`overflow-hidden rounded-xl border text-left transition hover:-translate-y-1 ${choices[award.id]===String(j)?"border-amber-300 bg-amber-300/15 ring-2 ring-amber-300":"border-white/15 bg-white/5 hover:border-amber-300/70"}`}>
     <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#192134]"><img src={n.image} alt={`${n.name} nominee`} className="h-full w-full object-cover" /></div>
     <div className="flex min-h-28 flex-col items-center justify-center gap-1 p-3 text-center"><span className="break-words text-sm font-bold sm:text-base">{n.name}</span>{n.detail&&<span className="text-xs text-slate-300">{n.detail}</span>}<span className={`mt-2 text-xs font-semibold ${choices[award.id]===String(j)?"text-amber-300":"text-slate-400"}`}>{choices[award.id]===String(j)?"✓ Selected":"Select nominee"}</span></div>
    </button>)}
   </div>
   <div className="mt-8 rounded-xl border border-amber-300/20 bg-white/5 p-5 text-center"><p className="font-semibold">{choices[award.id]!==undefined?`Selected: ${award.nominees[Number(choices[award.id])].name}`:"Choose one nominee above"}</p><p className="mt-2 text-sm text-slate-400">Preview only — selections are not saved or counted as votes. Twitch sign-in and secure voting are coming later.</p></div>
  </section>
 );
 return <main className="min-h-screen bg-[#080d1a] text-white">
  <header className="sticky top-0 z-20 border-b border-amber-300/20 bg-[#080d1a]/95 px-5 py-4 backdrop-blur">
   <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4"><a href="#top" className="text-xl font-black tracking-widest">5VT <span className="text-amber-300">AWARDS</span></a><nav className="flex flex-wrap gap-3 text-xs font-semibold sm:text-sm"><a href="#creative-arts" className="hover:text-amber-300">Creative Arts</a><a href="#musical-arts" className="hover:text-amber-300">Musical Arts</a></nav></div>
  </header>
  <section id="top" className="relative overflow-hidden px-5 py-20 text-center md:py-28"><div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl"/><p className="relative mb-5 text-xs font-bold tracking-[.35em] text-amber-300">5IVE STUDIOS PRESENTS · 2026</p><h1 className="relative text-5xl font-black tracking-tight md:text-7xl">5VT <span className="text-amber-300">AWARDS</span><br/>2026</h1><p className="relative mx-auto mt-6 max-w-2xl text-slate-300">Celebrating the streamers, creators, artists, songs, and projects shaping the 5VT community.</p><div className="relative mt-9 flex flex-wrap justify-center gap-3"><a href="#creative-arts" className="inline-block rounded-lg bg-amber-300 px-8 py-4 font-bold text-slate-950 hover:bg-amber-200">CREATIVE ARTS</a><a href="#musical-arts" className="inline-block rounded-lg border border-amber-300 px-8 py-4 font-bold text-amber-300 hover:bg-amber-300/10">MUSICAL ARTS</a></div></section>
  <div className="mx-auto max-w-7xl px-5 pb-24 md:px-10">
   <div id="creative-arts" className="scroll-mt-24 pt-8 text-center"><p className="text-xs font-bold tracking-[.3em] text-amber-300">2026 · 5VT AWARDS</p><h2 className="mt-3 text-4xl font-black md:text-6xl">CREATIVE ARTS AWARDS</h2></div>
   {creativeAwards.map((award,i)=>renderAward(award,i,"Creative Arts"))}
   <div id="musical-arts" className="scroll-mt-24 border-t border-amber-300/30 pt-20 text-center"><p className="text-xs font-bold tracking-[.3em] text-amber-300">2026 · 5VT AWARDS</p><h2 className="mt-3 text-4xl font-black md:text-6xl">MUSICAL ARTS AWARDS</h2><p className="mx-auto mt-5 max-w-2xl text-slate-300">Honoring the music and artists making their mark on the 5VT community.</p></div>
   {musicalAwards.map((award,i)=>renderAward(award,i,"Musical Arts"))}
  </div><footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-slate-400">© 2026 5IVE STUDIOS · CREATIVE & MUSICAL ARTS AWARDS · PREVIEW MODE</footer>
 </main>;
