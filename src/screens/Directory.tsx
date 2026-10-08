import { useState } from 'react'
import { BadgeCheck, Phone, MapPin } from 'lucide-react'
import { providers, providerCategories } from '../data/mock'
import { TrustTag, useToast, type Go } from '../components/chrome'

export default function Directory({ go }: { go: Go }) {
  const [cat, setCat] = useState('All')
  const toast = useToast()
  const list = cat === 'All' ? providers : providers.filter((p) => p.category === cat)

  return (
    <div className="rise-in pb-8 px-4 pt-4">
      <h1 className="font-display font-black text-[24px] leading-none text-ink">Local services</h1>
      <p className="mt-1 font-ui text-[11px] text-ink-faint">
        Tradespeople and services near Diepkloof · sorted by distance
      </p>
      <p className="mt-2 font-ui text-[10.5px] leading-snug text-ink-faint border-l-2 border-retail pl-2">
        <BadgeCheck size={11} className="inline text-retail -mt-0.5" />{' '}
        <span className="font-bold text-retail-deep">Verified</span> means our editorial team has checked the
        provider’s ID and address in person. It is a trust check, not an endorsement of work quality.
      </p>

      <div className="mt-3 flex gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4">
        {providerCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 font-ui text-[11px] font-bold uppercase tracking-[0.08em] px-3 py-1.5 rounded-full border transition-colors ${cat === c ? 'bg-ink text-paper-2 border-ink' : 'border-line text-ink-soft hover:border-ink'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4 divide-y divide-line border-y border-line">
        {list.map((p) => (
          <div key={p.id} className="py-3 flex gap-3">
            {p.image ? (
              <img src={p.image} alt="" className="w-16 h-16 object-cover rounded-[3px] shrink-0" />
            ) : (
              <div className="w-16 h-16 rounded-[3px] bg-paper-3 border border-line flex items-center justify-center shrink-0">
                <span className="font-display font-black text-[20px] text-ink-faint">{p.name[0]}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-ui text-[14px] font-bold text-ink truncate">{p.name}</span>
                {p.verified && (
                  <span className="inline-flex items-center gap-0.5 font-ui text-[9px] font-extrabold uppercase tracking-[0.06em] text-retail-deep shrink-0">
                    <BadgeCheck size={12} className="text-retail" /> Verified
                  </span>
                )}
              </div>
              <div className="font-ui text-[11px] text-ink-faint">{p.category}</div>
              <p className="mt-0.5 font-ui text-[12px] leading-snug text-ink-soft line-clamp-2">{p.blurb}</p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="font-ui text-[10.5px] text-ink-faint flex items-center gap-1">
                  <MapPin size={10} /> {p.area} · {p.distance}
                </span>
                <button
                  onClick={() => toast(`Calling ${p.name} — demo`)}
                  className="inline-flex items-center gap-1.5 font-ui text-[10px] font-extrabold uppercase tracking-[0.08em] px-2.5 py-1.5 rounded-[3px] bg-ink text-paper-2 hover:bg-press transition-colors"
                >
                  <Phone size={10} /> {p.phone}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => go('shop')}
        className="mt-5 w-full border border-dashed border-line rounded-md px-4 py-3 text-center font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-ink-soft hover:border-retail hover:text-retail transition-colors"
      >
        List your trade or service — free
      </button>
      <div className="mt-4">
        <TrustTag kind="retail" label="Directory listings may contain sponsored placements — always labelled" small />
      </div>
    </div>
  )
}
