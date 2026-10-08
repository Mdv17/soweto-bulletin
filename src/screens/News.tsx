import { useState } from 'react'
import { Bell, MessageSquareText, ArrowLeft, Bookmark } from 'lucide-react'
import { articles, newsCategories, type Article } from '../data/mock'
import { SectionHead, TrustTag, useToast, type Go } from '../components/chrome'

export default function News(_: { go: Go }) {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState<Article | null>(null)
  const [optIn, setOptIn] = useState<'push' | 'whatsapp' | null>(null)
  const [saved, setSaved] = useState(false)
  const toast = useToast()

  const list = cat === 'All' ? articles : articles.filter((a) => a.category === cat)

  /* --------------------------- Article detail --------------------------- */
  if (open) {
    return (
      <div className="rise-in">
        <div className="px-4 pt-3">
          <button onClick={() => setOpen(null)} className="flex items-center gap-1.5 font-ui text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-soft hover:text-press transition-colors">
            <ArrowLeft size={13} /> All news
          </button>
        </div>
        {open.image && <img src={open.image} alt="" className="mt-3 w-full aspect-[8/5] object-cover" />}
        <article className="px-4 pt-4 pb-8">
          <div className="flex items-center gap-2">
            <TrustTag kind="news" label={open.breaking ? 'Breaking news' : open.category} />
            <span className="font-ui text-[10.5px] text-ink-faint">{open.readTime} min read</span>
          </div>
          <h1 className="mt-2.5 font-display font-black text-[27px] leading-[1.1] tracking-tight text-ink text-balance">
            {open.headline}
          </h1>
          <p className="mt-2.5 font-display text-[15.5px] leading-snug text-ink-soft italic">{open.dek}</p>
          <div className="mt-3 flex items-center justify-between border-y border-line py-2">
            <div className="font-ui text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-soft">
              By {open.byline} · {open.time} · {open.area}
            </div>
            <button
              onClick={() => { setSaved(!saved); toast(saved ? 'Removed from saved articles' : 'Saved to your articles') }}
              className={`${saved ? 'text-press' : 'text-ink-faint hover:text-press'} transition-colors`}
              aria-label="Save article"
            >
              <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="mt-4 space-y-3.5">
            {open.body.map((p, i) => (
              <p key={i} className={`text-[15px] leading-relaxed text-ink ${i === 0 ? 'first-letter:font-display first-letter:text-[44px] first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:leading-[0.85] first-letter:text-press' : ''}`}>
                {p}
              </p>
            ))}
          </div>
          <div className="mt-6 border-t-2 border-ink pt-3">
            <p className="font-ui text-[10.5px] leading-relaxed text-ink-faint">
              This article was reported by a Soweto Bulletin contributor and reviewed by our editor before publication.
              Corrections or complaints: see Account → Trust &amp; transparency.
            </p>
          </div>
        </article>
      </div>
    )
  }

  /* ------------------------------ Feed ---------------------------------- */
  const breaking = list.find((a) => a.breaking)
  const rest = list.filter((a) => a !== breaking)

  return (
    <div className="rise-in pb-8">
      {/* breaking news opt-in */}
      <div className="px-4 pt-4">
        <div className="bg-ink text-paper-2 rounded-md px-3.5 py-3">
          <div className="flex items-center gap-2">
            <Bell size={14} className="text-press-tint" />
            <div className="font-ui text-[11px] font-extrabold uppercase tracking-[0.14em]">Breaking news, your way</div>
          </div>
          <p className="mt-1 font-ui text-[11.5px] leading-snug text-paper-2/70">
            Only the stories that can’t wait. Choose push or WhatsApp — WhatsApp uses far less data and no app storage.
          </p>
          <div className="mt-2.5 flex gap-2">
            <button
              onClick={() => { setOptIn('push'); toast('Breaking news push notifications on') }}
              className={`flex-1 font-ui text-[11px] font-bold uppercase tracking-[0.08em] py-2 rounded-[4px] border transition-colors ${optIn === 'push' ? 'bg-press border-press text-paper-2' : 'border-white/25 text-paper-2/80 hover:border-white/50'}`}
            >
              Push
            </button>
            <button
              onClick={() => { setOptIn('whatsapp'); toast('Breaking news will arrive on WhatsApp') }}
              className={`flex-1 font-ui text-[11px] font-bold uppercase tracking-[0.08em] py-2 rounded-[4px] border transition-colors flex items-center justify-center gap-1.5 ${optIn === 'whatsapp' ? 'bg-press border-press text-paper-2' : 'border-white/25 text-paper-2/80 hover:border-white/50'}`}
            >
              <MessageSquareText size={12} /> WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* category filter */}
      <div className="mt-4 px-4">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4">
          {newsCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 font-ui text-[11px] font-bold uppercase tracking-[0.08em] px-3 py-1.5 rounded-full border transition-colors ${cat === c ? 'bg-ink text-paper-2 border-ink' : 'border-line text-ink-soft hover:border-ink'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* breaking card */}
      {breaking && (
        <button onClick={() => setOpen(breaking)} className="w-full text-left px-4 mt-4 group">
          <div className="border-2 border-press rounded-md overflow-hidden">
            {breaking.image && (
              <div className="relative">
                <img src={breaking.image} alt="" className="w-full aspect-[8/5] object-cover" />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-paper-2 pulse-dot" />
                  <TrustTag kind="news" label="Breaking news" />
                </div>
              </div>
            )}
            <div className="p-3 bg-paper-2">
              <h2 className="font-display font-black text-[19px] leading-tight text-ink group-hover:text-press transition-colors">{breaking.headline}</h2>
              <p className="mt-1 font-ui text-[10px] font-bold uppercase tracking-[0.12em] text-ink-faint">
                {breaking.byline} · {breaking.time}
              </p>
            </div>
          </div>
        </button>
      )}

      {/* rest of feed */}
      <div className="px-4 mt-5">
        <SectionHead no="" title={cat === 'All' ? 'More from the Bulletin' : cat} />
        <div className="divide-y divide-line border-y border-line">
          {rest.map((a) => (
            <button key={a.id} onClick={() => setOpen(a)} className="w-full text-left py-3 flex gap-3 group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <TrustTag kind="news" label={a.category} small />
                  <span className="font-ui text-[10px] text-ink-faint">{a.time} · {a.area}</span>
                </div>
                <h3 className="mt-1 font-display font-bold text-[17px] leading-snug text-ink group-hover:text-press transition-colors">
                  {a.headline}
                </h3>
                <p className="mt-1 text-[12.5px] leading-snug text-ink-soft line-clamp-2">{a.dek}</p>
              </div>
              {a.image && <img src={a.image} alt="" className="w-[76px] h-[76px] object-cover rounded-[3px] shrink-0" />}
            </button>
          ))}
        </div>
        {rest.length === 0 && (
          <p className="py-8 text-center font-ui text-[12px] text-ink-faint">No stories in this category yet this week.</p>
        )}
      </div>
    </div>
  )
}
