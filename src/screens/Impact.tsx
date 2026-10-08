import { SectionHead, type Go } from '../components/chrome'
import { impact } from '../data/mock'

export default function Impact({ go }: { go: Go }) {
  const max = Math.max(...impact.byType.map((t) => t.n))
  return (
    <div className="rise-in pb-8 px-4 pt-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-retail pulse-dot" />
        <span className="font-ui text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">Live community numbers</span>
      </div>
      <h1 className="mt-1 font-display font-black text-[26px] leading-none text-ink">Community impact</h1>
      <p className="mt-1.5 font-ui text-[11.5px] text-ink-soft leading-snug">
        Public numbers, updated daily. Street alerts are posted and confirmed by neighbours, so these figures show
        how much Soweto is looking out for itself.
      </p>

      <div className="mt-4">
        <SectionHead no="01" title="Street alerts · September" />
        <div className="grid grid-cols-3 border border-line divide-x divide-line bg-paper-2 rounded-md overflow-hidden">
          {[
            { v: String(impact.posted), l: 'Posted' },
            { v: String(impact.confirmed), l: 'Confirmed' },
            { v: String(impact.markedFixed), l: 'Marked fixed' },
          ].map((s) => (
            <div key={s.l} className="px-3 py-3 text-center">
              <div className="font-display font-black text-[26px] leading-none text-ink">{s.v}</div>
              <div className="mt-1 font-ui text-[9px] font-bold uppercase tracking-[0.1em] text-ink-faint">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 bg-paper-2 border border-line rounded-md px-3 py-2.5 flex items-center justify-between">
          <span className="font-ui text-[11.5px] font-bold text-ink">Stories our newsroom followed up</span>
          <span className="font-display font-black text-[19px] text-press">{impact.storiesSparked}</span>
        </div>
      </div>

      <div className="mt-6">
        <SectionHead no="02" title="What neighbours are flagging" />
        <div className="space-y-3">
          {impact.byType.map((t) => (
            <div key={t.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-ui text-[12px] font-bold text-ink">{t.name}</span>
                <span className="font-ui text-[11px] text-ink-faint">{t.n} alerts</span>
              </div>
              <div className="h-2.5 bg-paper-3 rounded-full overflow-hidden border border-line">
                <div className="h-full rounded-full bg-gov" style={{ width: `${Math.round((t.n / max) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 font-ui text-[10.5px] text-ink-faint leading-snug">
          Street alerts are not complaints to the City. When a problem keeps getting confirmed, our editor may ask the
          relevant department for comment and publish what they say.
        </p>
      </div>

      <div className="mt-6">
        <SectionHead no="03" title="The platform, this month" />
        <div className="grid grid-cols-2 gap-2">
          {[
            { v: String(impact.platform.articles), l: 'Articles published' },
            { v: impact.platform.specialsViewed, l: 'Specials viewed' },
            { v: String(impact.platform.shops), l: 'Shops advertising' },
            { v: impact.platform.confirmations.toLocaleString(), l: 'Neighbour confirmations' },
          ].map((s) => (
            <div key={s.l} className="bg-paper-2 border border-line rounded-md px-3 py-2.5">
              <div className="font-display font-black text-[21px] leading-none text-ink">{s.v}</div>
              <div className="mt-1 font-ui text-[9.5px] font-bold uppercase tracking-[0.08em] text-ink-faint">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => go('report')} className="mt-6 w-full bg-press text-paper-2 rounded-md py-3 font-ui text-[12px] font-extrabold uppercase tracking-[0.1em] hover:bg-press-deep transition-colors">
        Spotted something? Post a street alert
      </button>
    </div>
  )
}
