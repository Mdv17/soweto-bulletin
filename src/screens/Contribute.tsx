import { useState } from 'react'
import { Camera, PenLine } from 'lucide-react'
import { contributor, newsCategories } from '../data/mock'
import { SectionHead, StatusPill, PrimaryButton, useToast, type Go } from '../components/chrome'

export default function Contribute(_: { go: Go }) {
  const [agreed, setAgreed] = useState(false)
  const toast = useToast()

  return (
    <div className="rise-in pb-8 px-4 pt-4">
      {/* contributor identity */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-press text-paper-2 flex items-center justify-center">
          <PenLine size={18} />
        </div>
        <div>
          <div className="font-display font-black text-[19px] leading-tight text-ink">{contributor.name}</div>
          <div className="font-ui text-[11px] text-ink-soft">
            Freelance contributor · <span className="font-bold text-press">{contributor.published} articles published</span>
          </div>
        </div>
      </div>

      {/* guidelines */}
      <div className="mt-5">
        <SectionHead no="01" title="Editorial guidelines — read first" />
        <div className="bg-press-tint border border-press/20 rounded-md px-3.5 py-3">
          <ul className="space-y-2">
            {contributor.guidelines.map((g, i) => (
              <li key={i} className="font-ui text-[12px] leading-snug text-ink flex gap-2">
                <span className="font-display font-black text-press shrink-0">{i + 1}.</span>
                {g}
              </li>
            ))}
          </ul>
          <label className="mt-3 flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 accent-[#B4231B]"
            />
            <span className="font-ui text-[11.5px] font-bold text-ink">I’ve read and accept the guidelines</span>
          </label>
        </div>
      </div>

      {/* submission form */}
      <div className="mt-6">
        <SectionHead no="02" title="Submit a story" />
        <div className="space-y-2.5">
          <input
            placeholder="Headline"
            className="w-full bg-paper-2 border border-line rounded-[4px] px-3 py-2.5 font-ui text-[13px] font-bold text-ink placeholder:text-ink-faint focus:outline-none focus:border-press"
          />
          <div className="grid grid-cols-2 gap-2.5">
            <select className="bg-paper-2 border border-line rounded-[4px] px-3 py-2.5 font-ui text-[12.5px] text-ink focus:outline-none focus:border-press">
              {newsCategories.slice(1).map((c) => <option key={c}>{c}</option>)}
            </select>
            <select className="bg-paper-2 border border-line rounded-[4px] px-3 py-2.5 font-ui text-[12.5px] text-ink focus:outline-none focus:border-press">
              {['Diepkloof', 'Orlando', 'Pimville', 'Klipspruit', 'Meadowlands', 'Soweto-wide'].map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
          <textarea
            rows={6}
            placeholder="Your story. Name your sources, keep it local, keep it true."
            className="w-full bg-paper-2 border border-line rounded-[4px] px-3 py-2.5 font-ui text-[13px] text-ink placeholder:text-ink-faint focus:outline-none focus:border-press resize-none"
          />
          <button
            onClick={() => toast('Photo picker — demo')}
            className="w-full flex items-center justify-center gap-2 border border-dashed border-line rounded-[4px] py-3 font-ui text-[11px] font-bold uppercase tracking-[0.08em] text-ink-soft hover:border-press hover:text-press transition-colors"
          >
            <Camera size={14} /> Add a photo (optional)
          </button>
          <PrimaryButton
            onClick={() => {
              if (!agreed) { toast('Please accept the editorial guidelines first'); return }
              toast('Submitted — an editor reviews every story within 48 hours')
            }}
          >
            Send to the editor →
          </PrimaryButton>
        </div>
      </div>

      {/* past submissions */}
      <div className="mt-7">
        <SectionHead no="03" title="Your submissions" />
        <div className="divide-y divide-line border-y border-line">
          {contributor.submissions.map((s) => (
            <div key={s.id} className="py-2.5 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-ui text-[13px] font-bold leading-snug text-ink">{s.title}</div>
                <div className="mt-0.5 font-ui text-[10px] text-ink-faint">Submitted {s.date}</div>
              </div>
              <StatusPill status={s.status} />
            </div>
          ))}
        </div>
        <p className="mt-3 font-ui text-[10.5px] leading-relaxed text-ink-faint">
          Published stories are paid per our contributor rates. An editor may contact you for verification before
          anything goes live.
        </p>
      </div>
    </div>
  )
}
