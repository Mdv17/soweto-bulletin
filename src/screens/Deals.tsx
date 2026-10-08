import { useState } from 'react'
import { Bookmark, Download, MapPin } from 'lucide-react'
import { deals, dealCategories } from '../data/mock'
import { SectionHead, TrustTag, useToast, type Go } from '../components/chrome'

export default function Deals({ go }: { go: Go }) {
  const [cat, setCat] = useState('All')
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const toast = useToast()

  const list = cat === 'All' ? deals : deals.filter((d) => d.category === cat)

  return (
    <div className="rise-in pb-8">
      <div className="px-4 pt-4">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display font-black text-[24px] leading-none text-ink">This week’s specials</h1>
            <p className="mt-1 font-ui text-[11px] text-ink-faint">
              From Soweto shops &amp; national partners · updated Monday
            </p>
          </div>
          <span className="font-ui text-[10px] font-extrabold uppercase tracking-[0.1em] text-retail-deep bg-retail-tint px-2 py-1 rounded-[3px]">
            {list.length} deals
          </span>
        </div>
        <p className="mt-2 font-ui text-[10.5px] leading-snug text-ink-faint border-l-2 border-retail pl-2">
          Everything on this page is <span className="font-bold text-retail-deep">paid retail content</span> — always
          labelled <span className="font-bold text-retail-deep">Sponsored</span>, never mixed into the news.
        </p>
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto no-scrollbar px-4">
        {dealCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 font-ui text-[11px] font-bold uppercase tracking-[0.08em] px-3 py-1.5 rounded-full border transition-colors ${cat === c ? 'bg-retail text-paper-2 border-retail' : 'border-line text-ink-soft hover:border-retail'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="px-4 mt-4 grid grid-cols-2 gap-2.5">
        {list.map((d) => {
          const isSaved = !!saved[d.id]
          return (
            <div key={d.id} className="bg-paper-2 border border-line rounded-md overflow-hidden flex flex-col">
              {d.image && <img src={d.image} alt="" className="w-full aspect-[4/3] object-cover" />}
              <div className="p-2.5 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-1">
                  <TrustTag kind="retail" label={d.chain === 'partner' ? 'Sponsored · Partner' : 'Sponsored · Local'} small />
                </div>
                <div className="mt-1.5 font-ui text-[10.5px] font-bold uppercase tracking-[0.06em] text-retail-deep truncate">{d.shop}</div>
                <div className="mt-0.5 font-ui text-[12.5px] font-bold leading-snug text-ink flex-1">{d.title}</div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="font-display font-black text-[19px] text-ink">{d.price}</span>
                  {d.was && <span className="font-ui text-[11px] text-ink-faint line-through">{d.was}</span>}
                </div>
                <div className="mt-0.5 font-ui text-[10px] text-ink-faint flex items-center gap-1">
                  <MapPin size={9} /> {d.area} · <span className="text-press font-bold">{d.expires}</span>
                </div>
                <div className="mt-2 flex gap-1.5">
                  <button
                    onClick={() => { setSaved({ ...saved, [d.id]: !isSaved }); toast(isSaved ? 'Deal removed' : 'Deal saved — find it under Account') }}
                    className={`flex-1 font-ui text-[10px] font-extrabold uppercase tracking-[0.06em] py-1.5 rounded-[3px] border transition-colors flex items-center justify-center gap-1 ${isSaved ? 'bg-retail text-paper-2 border-retail' : 'border-retail/50 text-retail-deep hover:border-retail'}`}
                  >
                    <Bookmark size={10} fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Saved' : 'Save'}
                  </button>
                  <button
                    onClick={() => toast('Flyer downloaded for offline viewing')}
                    className="w-8 flex items-center justify-center border border-line rounded-[3px] text-ink-soft hover:border-retail hover:text-retail transition-colors"
                    aria-label="Download flyer"
                  >
                    <Download size={12} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="px-4 mt-5">
        <SectionHead no="" title="Own a shop in Soweto?" />
        <button onClick={() => go('shop')} className="w-full bg-retail text-paper-2 rounded-md px-4 py-3 text-left hover:bg-retail-deep transition-colors">
          <div className="font-ui text-[13px] font-extrabold uppercase tracking-[0.08em]">Advertise here from R0</div>
          <p className="mt-0.5 font-ui text-[11.5px] text-paper-2/80 leading-snug">
            Free listing, self-service promotions, real stats. See the shop owner dashboard →
          </p>
        </button>
      </div>
    </div>
  )
}
