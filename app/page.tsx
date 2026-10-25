
"use client";

import { useState } from "react";

type Nominee = {
  name: string;
  image: string;
  detail?: string;
};

type Award = {
  id: string;
  title: string;
  description: string;
  nominees: Nominee[];
  openNomination?: boolean;
};

type Category = {
  id: string;
  title: string;
  awards: Award[];
};

const photo = (name: string) => `/nominees/${name}.webp`;
const musical = (name: string) => `/musical-arts/${name}`;
const annual = (name: string) => `/annual-achievement/${name}.webp`;

const categories: Category[] = [
  {
    id: "creative-arts",
    title: "Creative Arts Awards",
    awards: [
      {
        id: "streamer",
        title: "5VT Streamer of the Year",
        description:
          "This award is awarded to the individual who has demonstrated outstanding dedication to streaming throughout the year. Whether it's through consistency, entertaining content, or building a community of your own, your hard work deserves to be celebrated.",
        nominees: [
          { name: "0HTHATSM0", image: photo("0hthatsm0") },
          { name: "WydLethal", image: photo("wydlethal") },
          { name: "Khiistaxxx", image: photo("khiistaxxx") },
          { name: "layymuseum", image: photo("layymuseum") },
          { name: "notdripland", image: photo("notdripland") },
        ],
      },
      {
        id: "masterpiece",
        title: "5VT Masterpiece Award",
        description:
          "Honors an exceptionally creative and well-executed project.",
        nominees: [
          {
            name: "FNAF Marathon",
            detail: "Sparkshot55",
            image: photo("fnaf-marathon"),
          },
          {
            name: "Assassin's Creed Marathon",
            detail: "0HTHATSM0",
            image: photo("assassins-creed-marathon"),
          },
          {
            name: "30 Days 30 Skills",
            detail: "WydLethal",
            image: photo("30-days-30-skills"),
          },
          {
            name: "Neoween",
            detail: "layymuseum",
            image: photo("neoween"),
          },
          {
            name: "Mario Marathon",
            detail: "Sparkshot55",
            image: photo("mario-marathon"),
          },
        ],
      },
      {
        id: "visionary",
        title: "5VT Visionary Award",
        description:
          "This award is awarded to the individual who sees possibilities where others see limitations. Your ability to think ahead, develop unique concepts, and bring fresh perspectives to the community is something truly special.",
        nominees: [
          { name: "WydLethal", image: photo("wydlethal") },
          { name: "0HTHATSM0", image: photo("0hthatsm0") },
          { name: "layymuseum", image: photo("layymuseum") },
        ],
      },
      {
        id: "creator",
        title: "5VT Creator of the Year",
        description:
          "This award recognizes an individual who has demonstrated outstanding creativity, originality, and dedication to content creation outside of streaming.",
        nominees: [
          {
            name: "Plezoooo",
            detail: "Skits",
            image: photo("plezoooo"),
          },
          {
            name: "noeluv.fredo",
            detail: "Dancer",
            image: photo("noeluv-fredo"),
          },
          {
            name: "layymuseum",
            detail: "Artist",
            image: photo("layymuseum"),
          },
          {
            name: "TopTrollJon15",
            detail: "Dancer",
            image: photo("toptrolljon15"),
          },
          {
            name: "SparkShot55",
            detail: "Food Content",
            image: photo("sparkshot55"),
          },
        ],
      },
    ],
  },

  {
    id: "musical-arts",
    title: "Musical Arts Awards",
    awards: [
      {
        id: "valuable-artist",
        title: "5VT Most Valuable Artist Award",
        description:
          "This award honors an artist whose passion, dedication, and undeniable talent continue to inspire the 5VT community. Your journey is proof that greatness comes from believing in yourself and never giving up on your dreams.",
        nominees: [
          {
            name: "Zyyannn",
            image: musical("01-Zyyannn.png"),
          },
          {
            name: "KeyunDh",
            image: musical("02-KeyunDh.png"),
          },
          {
            name: "Jaelblancoo",
            image: musical("03-Jaelblancoo.png"),
          },
          {
            name: "TaliBandz",
            image: musical("04-TaliBandz.png"),
          },
          {
            name: "Plezo",
            image: musical("05-Plezo.png"),
          },
        ],
      },
      {
        id: "hitmaker",
        title: "5VT Hitmaker Award",
        description:
          "This award celebrates the artist behind the most memorable song in the community this year. Your music left a lasting impression on 5VT.",
        nominees: [
          {
            name: "DA TEAM (REMIX)",
            detail: "Jaelblancoo Ft. KeyunDh, Simonbabyy",
            image: musical("01-DA-TEAM-REMIX.png"),
          },
          {
            name: "liketorun",
            detail: "KeyunDh",
            image: musical("02-liketorun.png"),
          },
          {
            name: "Tyreek",
            detail: "Zyyannn",
            image: musical("03-Tyreek.png"),
          },
          {
            name: "Bottega",
            detail: "KeyunDh",
            image: musical("04-Bottega.png"),
          },
          {
            name: "Blake",
            detail: "ZYYAN",
            image: musical("05-Blake.png"),
          },
          {
            name: "LeGOOSE COAT",
            detail: "Plezo X Kor",
            image: musical("06-LeGOOSE-COAT.png"),
          },
          {
            name: "Bippin with 5",
            detail: "Plezo Ft. Sah5kk",
            image: musical("07-Bippin-with-5.png"),
          },
        ],
      },
      {
        id: "record-excellence",
        title: "5VT Record of Excellence Award",
        description:
          "This award honors an artist whose creativity, passion, and dedication have transformed their vision into an unforgettable musical project. Your work is a testament to the power of self-expression and the impact music can leave on a community.",
        nominees: [
          {
            name: "1of1",
            detail: "Zyyannn",
            image: musical("01-1of1.png"),
          },
          {
            name: "7219 2 ASHMEAD",
            detail: "Jaelblancoo",
            image: musical("02-7219-2-ASHMEAD.png"),
          },
          {
            name: "Take 3",
            detail: "Z3nx0",
            image: musical("03-Take-3.png"),
          },
          {
            name: "LIL NICO",
            detail: "Jaelblancoo",
            image: musical("04-LIL-NICO.png"),
          },
          {
            name: "Only Cause Ya'll Asked",
            detail: "Plezo",
            image: musical("05-Only-Cause-Yall-Asked.png"),
          },
        ],
      },
    ],
  },

  {
    id: "annual-achievement",
    title: "Annual Achievement Awards",
    awards: [
      {
        id: "rookie",
        title: "5VT Rookie of the Year Award",
        description:
          "This award is awarded to a fairly new supporter. This supporter appeared in the last 6 months and their presence and name holds weight in the community like no other already.",
        nominees: [
          {
            name: "Zyyannn",
            image: annual("zyyannn"),
          },
          {
            name: "KeenOffCam",
            image: annual("keenoffcam"),
          },
          {
            name: "Theonlymiimii_444",
            image: annual("theonlymiimii_444"),
          },
          {
            name: "Wraxs",
            image: annual("wraxs"),
          },
          {
            name: "Bammb00zl3d",
            image: annual("bammb00zl3d"),
          },
        ],
      },
      {
        id: "peoples-choice",
        title: "5VT People's Choice Award",
        description:
          "This award is awarded to the individual who has earned the love, respect, and recognition of the 5VT community. Unlike other awards, this winner is chosen entirely by the PEOPLE.",
        openNomination: true,
        nominees: [],
      },
      {
        id: "valuable-5ive",
        title: "5VT Most Valuable 5ive Award",
        description:
          "This Award is awarded to the person who best represents 5VT through their loyalty, involvement, personality, and impact on the community.",
        nominees: [
          {
            name: "ThatsSoChilly",
            image: annual("thatsschilly"),
          },
          {
            name: "LiyyLovesYouu",
            image: annual("liyy-loves-you"),
          },
          {
            name: "OfficialMayNorth",
            image: annual("officialmaynorth"),
          },
          {
            name: "Zyyannn",
            image: annual("zyyannn"),
          },
          {
            name: "RobWasn'tHere",
            image: annual("rob-wasnt-here"),
          },
          {
            name: "KeyunDh",
            image: annual("keyundh"),
          },
        ],
      },
      {
        id: "woman",
        title: "5VT Woman of the Year Award",
        description:
          "This award celebrates a woman who embodies strength, confidence, and excellence. Through her influence, dedication, and impact, she continues to inspire others, uplift the community, and prove that greatness knows no limits.",
        nominees: [
          {
            name: "leaa_eunoia",
            image: annual("leaa-eunoia"),
          },
          {
            name: "ThatsSoChilly",
            image: annual("thatsschilly"),
          },
          {
            name: "TaliRenee",
            image: annual("talirenee"),
          },
          {
            name: "FavoritesFavorite",
            image: annual("favoritesfavorite"),
          },
          {
            name: "LiyyLovesYou",
            image: annual("liyy-loves-you"),
          },
          {
            name: "Theonlymiimii_444",
            image: annual("theonlymiimii_444"),
          },
        ],
      },
      {
        id: "chatter",
        title: "5VT Chatter of the Year",
        description:
          "This award is awarded to the person who consistently makes Twitch chat more entertaining and interactive.",
        nominees: [
          {
            name: "OfficialMayNorth",
            image: annual("officialmaynorth"),
          },
          {
            name: "ThatsSoChilly",
            image: annual("thatsschilly"),
          },
          {
            name: "LiyyLovesYou",
            image: annual("liyy-loves-you"),
          },
          {
            name: "TaliRenee",
            image: annual("talirenee"),
          },
          {
            name: "Zyyann",
            image: annual("zyyannn"),
          },
          {
            name: "Jahxgeez_",
            image: annual("jahxgeez"),
          },
        ],
      },
    ],
  },
];

function NomineePhoto({ nominee }: { nominee: Nominee }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#192134]">
      {failed ? (
        <div className="px-3 text-center text-xs text-slate-400">
          Photo pending upload
        </div>
      ) : (
        <img
          src={nominee.image}
          alt={`${nominee.name} nominee`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export default function Home() {
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [peopleChoice, setPeopleChoice] = useState("");

  return (
    <main className="min-h-screen bg-[#080d1a] text-white">
      <header className="sticky top-0 z-20 border-b border-amber-300/20 bg-[#080d1a]/95 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <a
            href="#top"
            className="text-xl font-black tracking-widest"
          >
            5VT <span className="text-amber-300">AWARDS</span>
          </a>

          <nav className="flex flex-wrap gap-4 text-xs font-semibold sm:text-sm">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="hover:text-amber-300"
              >
                {category.title.replace(" Awards", "")}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section
        id="top"
        className="relative overflow-hidden px-5 py-20 text-center md:py-28"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

        <p className="relative mb-5 text-xs font-bold tracking-[.35em] text-amber-300">
          5IVE STUDIOS PRESENTS · 2026
        </p>

        <h1 className="relative text-5xl font-black tracking-tight md:text-7xl">
          5VT <span className="text-amber-300">AWARDS</span>
        </h1>

        <p className="relative mx-auto mt-6 max-w-2xl text-slate-300">
          Celebrating the artists, creators, supporters, and unforgettable
          moments shaping the 5VT community.
        </p>

        <a
          href="#creative-arts"
          className="relative mt-9 inline-block rounded-lg bg-amber-300 px-8 py-4 font-bold text-slate-950 hover:bg-amber-200"
        >
          EXPLORE NOMINEES
        </a>
      </section>

      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-10">
        {categories.map((category) => (
          <div
            key={category.id}
            id={category.id}
            className="scroll-mt-24"
          >
            <div className="border-t border-amber-300/30 pt-16 text-center">
              <p className="mb-3 text-xs font-bold tracking-[.3em] text-amber-300">
                2026 · 5IVE STUDIOS
              </p>

              <h2 className="text-3xl font-black uppercase text-amber-300 md:text-5xl">
                {category.title}
              </h2>
            </div>

            {category.awards.map((award, index) => (
              <section
                id={award.id}
                key={award.id}
                className="scroll-mt-24 border-b border-white/10 py-16"
              >
                <div className="mb-9 text-center">
                  <p className="mb-3 text-xs font-bold tracking-[.3em] text-amber-300">
                    {category.title.toUpperCase()} · AWARD{" "}
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="text-3xl font-black uppercase md:text-5xl">
                    {award.title}
                  </h3>

                  <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                    {award.description}
                  </p>
                </div>

                {award.openNomination ? (
                  <div className="mx-auto max-w-xl rounded-xl border border-amber-300/25 bg-white/5 p-6">
                    <label
                      htmlFor="peoples-choice-name"
                      className="mb-3 block font-bold"
                    >
                      Nominate anyone in the 5VT community
                    </label>

                    <input
                      id="peoples-choice-name"
                      value={peopleChoice}
                      onChange={(e) => setPeopleChoice(e.target.value)}
                      maxLength={80}
                      placeholder="Enter their Twitch name or community name"
                      className="w-full rounded-lg border border-white/20 bg-[#111b2c] px-4 py-3 text-white outline-none focus:border-amber-300"
                    />

                    <p className="mt-4 text-sm text-slate-300">
                      {peopleChoice.trim()
                        ? `Your preview nomination: ${peopleChoice.trim()}`
                        : "No nomination entered yet."}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      Preview only — nominations are not submitted or counted yet.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
                      {award.nominees.map((nominee, nomineeIndex) => {
                        const selected =
                          choices[award.id] === String(nomineeIndex);

                        return (
                          <button
                            key={`${award.id}-${nomineeIndex}`}
                            type="button"
                            aria-pressed={selected}
                            onClick={() =>
                              setChoices((previous) => ({
                                ...previous,
                                [award.id]: String(nomineeIndex),
                              }))
                            }
                            className={`overflow-hidden rounded-xl border text-left transition hover:-translate-y-1 ${
                              selected
                                ? "border-amber-300 bg-amber-300/15 ring-2 ring-amber-300"
                                : "border-white/15 bg-white/5 hover:border-amber-300/70"
                            }`}
                          >
                            <NomineePhoto nominee={nominee} />

                            <div className="flex min-h-28 flex-col items-center justify-center gap-1 p-3 text-center">
                              <span className="break-words text-sm font-bold sm:text-base">
                                {nominee.name}
                              </span>

                              {nominee.detail && (
                                <span className="text-xs text-slate-300">
                                  {nominee.detail}
                                </span>
                              )}

                              <span
                                className={`mt-2 text-xs font-semibold ${
                                  selected
                                    ? "text-amber-300"
                                    : "text-slate-400"
                                }`}
                              >
                                {selected
                                  ? "✓ Selected"
                                  : "Select nominee"}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-8 rounded-xl border border-amber-300/20 bg-white/5 p-5 text-center">
                      <p className="font-semibold">
                        {choices[award.id] !== undefined
                          ? `Selected: ${
                              award.nominees[
                                Number(choices[award.id])
                              ].name
                            }`
                          : "Choose one nominee above"}
                      </p>

                      <p className="mt-2 text-sm text-slate-400">
                        Preview only — selections are not saved or counted as votes.
                      </p>
                    </div>
                  </>
                )}
              </section>
            ))}
          </div>
        ))}
      </div>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-slate-400">
        © 2026 5IVE STUDIOS · ALL AWARDS · PREVIEW MODE
      </footer>
    </main>
  );
}
