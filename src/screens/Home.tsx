import { MessageCircle, Megaphone, BadgePercent, Bell, Landmark, BarChart3, Store, PenLine, Briefcase, ChevronRight, Droplets, ThumbsUp } from 'lucide-react'
import { articles, deals, govAlerts, impact, pressCouncilLine, safetyPosts } from '../data/mock'
import { SectionHead, TrustTag, type Go } from '../components/chrome'
import type { Screen } from '../components/chrome'

const services: {
  no: string; label: string; stat: string; icon: typeof Megaphone; screen: Screen; tone: string; phase: 'A' | 'B' | 'C'
}[] = [
  { no: '01', label: 'Street alerts', stat: '3 hazards near you', icon: Megaphone, screen: 'report', tone: 'text-press', phase: 'B' },
  { no: '02', label: 'This week’s specials', stat: '8 deals · end Sunday', icon: BadgePercent, screen: 'deals', tone: 'text-retail', phase: 'A' },
  { no: '03', label: 'Government notices', stat: 'SASSA · UIF · SEDA · City', icon: Bell, screen: 'alerts', tone: 'text-gov', phase: 'A' },
  { no: '04', label: 'Find your councillor', stat: 'Ward 25 · Orlando', icon: Landmark, screen: 'ward', tone: 'text-gov', phase: 'C' },
  { no: '05', label: 'Community impact', stat: '289 alerts marked fixed', icon: BarChart3, screen: 'impact', tone: 'text-ink', phase: 'C' },
  { no: '06', label: 'Local services', stat: '5 verified pros nearby', icon: Store, screen: 'directory', tone: 'text-retail', phase: 'B' },
  { no: '07', label: 'Submit a story', stat: 'Paid contributions', icon: PenLine, screen: 'contribute', tone: 'text-press', phase: 'C' },
  { no: '08', label: 'My shop dashboard', stat: 'For advertisers', icon: Briefcase, screen: 'shop', tone: 'text-retail', phase: 'A' },
]

export default function Home({ go }: { go: Go }) {
  const hero = articles[0]
  const latest = articles.slice(1, 4)
  const alert = govAlerts[0]
  const deal = deals[1]
  const safety = safetyPosts[1]

  return (
    <div className="rise-in">
      {/* ── Top story ── */}
      <button onClick={() => go('news')} className="w-full text-left group">
        <div className="relative">
          <img src={hero.image} alt="" className="w-full aspect-[8/5] object-cover" />
          <div className="absolute top-2 left-2 flex gap-1.5">
            <TrustTag kind="news" label="Breaking news" />
          </div>
        </div>
        <div className="px-4 pt-3 pb-4 border-b border-line">
          <h1 className="font-display font-black text-[24px] leading-[1.08] tracking-tight text-ink text-balance group-hover:text-press transition-colors">
            {hero.headline}
          </h1>
          <p className="mt-2 text-[13.5px] leading-snug text-ink-soft">{hero.dek}</p>
          <p className="mt-2 font-ui text-[10px] font-bold uppercase tracking-[0.14em] text-ink-faint">
            {hero.byline} · {hero.time} · {hero.area}
          </p>
        </div>
      </button>

      {/* ── WhatsApp Channel (Phase A) ── */}
      <section className="px-4 pt-4">
        <div className="bg-ink text-paper-2 rounded-md px-4 py-3.5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
            <MessageCircle size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="font-ui text-[13.5px] font-bold">Join our WhatsApp Channel</div>
            <div className="font-ui text-[11px] text-paper-3/80 leading-snug">News, specials and notices on your phone. Free. Scan the code in the paper.</div>
          </div>
          <button onClick={() => go('alerts')} className="font-ui text-[11px] font-extrabold uppercase tracking-[0.08em] bg-paper-2 text-ink rounded-full px-3.5 py-2">Join</button>
        </div>
      </section>

      {/* ── Services grid: every feature one tap from first launch ── */}
      <section className="px-4 pt-4 pb-1">
        <SectionHead no="" title="Everything the Bulletin does" />
        <div className="grid grid-cols-2 border-t border-l border-line">
          {services.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.no}
                onClick={() => go(s.screen)}
                className="text-left border-b border-r border-line bg-paper-2 px-3 py-3 hover:bg-paper-3 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <Icon size={17} className={s.tone} strokeWidth={2.2} />
                  <span className="font-ui text-[9px] font-bold text-ink-faint">{s.no}</span>
                </div>
                <div className="mt-2 font-ui text-[13px] font-bold leading-tight text-ink">{s.label}</div>
                <div className="mt-0.5 font-ui text-[10.5px] leading-tight text-ink-faint">{s.stat}</div>
                <div className={`mt-1.5 font-ui text-[8.5px] font-extrabold uppercase tracking-[0.14em] ${s.phase === 'A' ? 'text-press' : 'text-ink-faint'}`}>{s.phase === 'A' ? 'Live first · Phase A' : `Phase ${s.phase}`}</div>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Right now: one of each content class, labels doing the work ── */}
      <section className="px-4 pt-5 pb-1">
        <SectionHead no="" title="Right now in Soweto" />
        <div className="space-y-2.5">
          <button onClick={() => go('alerts')} className="w-full text-left bg-gov-tint border border-gov/25 rounded-md px-3 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <TrustTag kind="gov" label={`Official · ${alert.department}`} small />
              <span className="font-ui text-[10px] font-bold text-gov-deep flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gov pulse-dot" /> Priority alert
              </span>
            </div>
            <div className="mt-1.5 font-ui text-[13.5px] font-bold leading-snug text-ink flex items-start gap-2">
              <Droplets size={15} className="text-gov shrink-0 mt-0.5" />
              {alert.title}
            </div>
          </button>

          <button onClick={() => go('deals')} className="w-full text-left bg-retail-tint border border-retail/25 rounded-md px-3 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <TrustTag kind="retail" label={`Sponsored · ${deal.shop}`} small />
              <span className="font-ui text-[10px] font-bold text-retail-deep">{deal.expires}</span>
            </div>
            <div className="mt-1.5 font-ui text-[13.5px] font-bold leading-snug text-ink">
              {deal.title} — <span className="text-retail-deep">{deal.price}</span>
            </div>
          </button>

          <button onClick={() => go('alerts')} className="w-full text-left border border-dashed border-comm/50 rounded-md px-3 py-2.5 bg-transparent">
            <div className="flex items-center justify-between gap-2">
              <TrustTag kind="comm" small />
              <span className="font-ui text-[10px] font-bold text-comm flex items-center gap-1">
                <ThumbsUp size={10} /> {safety.backs} confirmed
              </span>
            </div>
            <div className="mt-1.5 font-ui text-[12.5px] leading-snug text-comm">{safety.text}</div>
          </button>
        </div>
      </section>

      {/* ── Latest news rows ── */}
      <section className="px-4 pt-5 pb-1">
        <SectionHead no="" title="Latest news" action="All news" onAction={() => go('news')} />
        <div className="divide-y divide-line border-y border-line">
          {latest.map((a) => (
            <button key={a.id} onClick={() => go('news')} className="w-full text-left py-2.5 flex gap-3 items-center group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <TrustTag kind="news" label={a.category} small />
                  <span className="font-ui text-[10px] text-ink-faint">{a.time}</span>
                </div>
                <div className="mt-1 font-display font-bold text-[15.5px] leading-snug text-ink group-hover:text-press transition-colors line-clamp-2">
                  {a.headline}
                </div>
              </div>
              {a.image && <img src={a.image} alt="" className="w-16 h-16 object-cover rounded-[3px] shrink-0" />}
            </button>
          ))}
        </div>
      </section>

      {/* ── Impact snapshot ── */}
      <section className="px-4 pt-5 pb-4">
        <button onClick={() => go('impact')} className="w-full text-left bg-ink text-paper-2 rounded-md px-4 py-3.5 group">
          <div className="flex items-center justify-between">
            <div className="font-ui text-[10px] font-extrabold uppercase tracking-[0.18em] text-paper-2/70">
              Community alerts · September
            </div>
            <ChevronRight size={15} className="text-paper-2/50 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="mt-2.5 grid grid-cols-3 divide-x divide-white/15">
            {[
              { v: String(impact.posted), l: 'Alerts posted' },
              { v: String(impact.confirmed), l: 'Confirmed' },
              { v: String(impact.storiesSparked), l: 'Stories sparked' },
            ].map((s) => (
              <div key={s.l} className="px-3 first:pl-0">
                <div className="font-display font-black text-[22px] leading-none">{s.v}</div>
                <div className="mt-1 font-ui text-[9.5px] uppercase tracking-[0.08em] text-paper-2/60">{s.l}</div>
              </div>
            ))}
          </div>
        </button>
      </section>

      {/* ── Trust strip ── */}
      <footer className="px-4 pb-8">
        <div className="border-t-2 border-ink pt-3">
          <p className="font-ui text-[10.5px] leading-relaxed text-ink-faint">
            <span className="font-bold text-ink">How to read this app:</span>{' '}
            <span className="text-press font-bold">News</span> is reviewed by our editor ·{' '}
            <span className="text-gov-deep font-bold">Official</span> notices come verified from public bodies, and say whether they are paid or free ·{' '}
            <span className="text-retail-deep font-bold">Sponsored</span> is paid retail content ·{' '}
            <span className="text-comm font-bold">Community</span> posts are unverified.
            {pressCouncilLine}
          </p>
        </div>
      </footer>
    </div>
  )
}
