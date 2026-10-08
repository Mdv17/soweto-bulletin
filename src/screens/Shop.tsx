import { Plus, Sparkles } from 'lucide-react'
import { shopDash } from '../data/mock'
import { SectionHead, TrustTag, useToast, type Go } from '../components/chrome'

export default function Shop({ go }: { go: Go }) {
  const toast = useToast()
  const max = Math.max(...shopDash.daily)

  return (
    <div className="rise-in pb-8 px-4 pt-4">
      {/* listing status */}
      <div className="bg-retail-tint border border-retail/30 rounded-md px-3.5 py-3 flex items-center justify-between">
        <div>
          <TrustTag kind="retail" label="Advertiser dashboard" small />
          <div className="mt-1.5 font-display font-black text-[20px] leading-none text-ink">{shopDash.name}</div>
          <div className="mt-1 font-ui text-[11px] text-ink-soft">Orlando West · Free listing</div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 font-ui text-[10px] font-extrabold uppercase tracking-[0.1em] text-retail-deep">
            <span className="w-1.5 h-1.5 rounded-full bg-retail pulse-dot" /> {shopDash.status}
          </span>
          <div className="mt-1 font-ui text-[9.5px] text-ink-faint">Visible in directory &amp; deals</div>
        </div>
      </div>

      {/* 7-day stats */}
      <div className="mt-5">
        <SectionHead no="01" title="Last 7 days" />
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: shopDash.stats.impressions.toLocaleString(), l: 'Impressions' },
            { v: String(shopDash.stats.clicks), l: 'Clicks' },
            { v: String(shopDash.stats.downloads), l: 'Flyer downloads' },
          ].map((s) => (
            <div key={s.l} className="bg-paper-2 border border-line rounded-md px-2.5 py-2.5 text-center">
              <div className="font-display font-black text-[21px] leading-none text-ink">{s.v}</div>
              <div className="mt-1 font-ui text-[9px] font-bold uppercase tracking-[0.08em] text-ink-faint leading-tight">{s.l}</div>
            </div>
          ))}
        </div>

        {/* daily impressions bar chart */}
        <div className="mt-2 bg-paper-2 border border-line rounded-md px-3 pt-3 pb-2">
          <div className="font-ui text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-ink-faint mb-2">Daily impressions</div>
          <div className="flex items-end gap-1.5 h-24">
            {shopDash.daily.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="font-ui text-[9px] font-bold text-ink-faint">{v}</span>
                <div
                  className={`w-full rounded-t-[2px] ${i === 5 ? 'bg-retail' : 'bg-ink/20'}`}
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <span className="font-ui text-[9px] text-ink-faint">{shopDash.days[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* active promos */}
      <div className="mt-6">
        <SectionHead no="02" title="Your promotions" />
        <div className="divide-y divide-line border-y border-line">
          {shopDash.promos.map((p) => (
            <div key={p.id} className="py-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className={`font-ui text-[13px] font-bold leading-snug ${p.active ? 'text-ink' : 'text-ink-faint'}`}>{p.title}</span>
                <span className={`font-ui text-[9px] font-extrabold uppercase tracking-[0.08em] px-1.5 py-[3px] rounded-[3px] shrink-0 ${p.active ? 'bg-retail-tint text-retail-deep' : 'bg-paper-3 text-ink-faint'}`}>
                  {p.active ? 'Active' : 'Ended'}
                </span>
              </div>
              <div className="mt-1 font-ui text-[10.5px] text-ink-faint">
                {p.views.toLocaleString()} views · {p.downloads} downloads · {p.expires}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => toast('Promotion composer — demo')}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-retail text-paper-2 rounded-[4px] py-2.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.08em] hover:bg-retail-deep transition-colors"
        >
          <Plus size={14} /> Post a new promotion
        </button>
      </div>

      <button
        onClick={() => go('proof')}
        className="mt-6 w-full border border-ink rounded-md py-3 font-ui text-[12px] font-extrabold uppercase tracking-[0.1em] text-ink hover:bg-paper-3 transition-colors"
      >
        See a sample proof report →
      </button>

      {/* done-for-you onboarding */}
      <div className="mt-6 bg-retail-tint border border-retail/30 rounded-md px-4 py-3.5">
        <div className="font-ui text-[10px] font-extrabold uppercase tracking-[0.16em] text-retail-deep">Founding advertiser</div>
        <div className="mt-1 font-display font-black text-[17px] leading-tight text-ink">Too busy to log in? We’ll post it for you.</div>
        <p className="mt-1 font-ui text-[11.5px] leading-snug text-ink-soft">
          WhatsApp a photo of your flyer or price list to 060 555 0100 and your Bulletin rep will post it the same day.
          Founding advertisers get their first three months free.
        </p>
        <button
          onClick={() => toast('Opening WhatsApp — demo')}
          className="mt-2.5 w-full bg-retail text-paper-2 rounded-[4px] py-2 font-ui text-[11px] font-extrabold uppercase tracking-[0.08em] hover:bg-retail-deep transition-colors"
        >
          WhatsApp my flyer
        </button>
      </div>

      {/* upsell */}
      <div className="mt-6 bg-ink text-paper-2 rounded-md px-4 py-3.5">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-gov-tint" />
          <span className="font-ui text-[10px] font-extrabold uppercase tracking-[0.16em] text-paper-2/70">Coming soon</span>
        </div>
        <div className="mt-1.5 font-display font-black text-[18px] leading-tight">Featured listing</div>
        <p className="mt-1 font-ui text-[11.5px] leading-snug text-paper-2/70">
          Top of your category, a spot in the weekly deals digest, and WhatsApp highlight. Join the waitlist for launch pricing.
        </p>
        <button
          onClick={() => toast('You’re on the featured listing waitlist')}
          className="mt-2.5 w-full border border-paper-2/30 rounded-[4px] py-2 font-ui text-[11px] font-extrabold uppercase tracking-[0.08em] hover:bg-paper-2 hover:text-ink transition-colors"
        >
          Join waitlist
        </button>
      </div>
    </div>
  )
}
