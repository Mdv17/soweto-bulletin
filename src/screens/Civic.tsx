import { useState } from 'react'
import { ShieldCheck, Megaphone, ThumbsUp, Droplets, Zap, Trash2, Construction, HeartPulse, Banknote, Briefcase, GraduationCap, FileText, Share2, Bookmark } from 'lucide-react'
import { govAlerts, noticeSources, safetyPosts, type GovAlert } from '../data/mock'
import { TrustTag, useToast, type Go } from '../components/chrome'

const deptIcon: Record<string, typeof Droplets> = {
  'Johannesburg Water': Droplets,
  'City Power': Zap,
  'Pikitup': Trash2,
  'JRA': Construction,
  'CoJ Health': HeartPulse,
  'SASSA': Banknote,
  'UIF': Briefcase,
  'SEDA': GraduationCap,
}

function PlacementTag({ placement }: { placement: GovAlert['placement'] }) {
  if (placement === 'free') {
    return (
      <span className="font-ui text-[9px] font-extrabold uppercase tracking-[0.08em] px-1.5 py-[3px] rounded-[3px] bg-ink text-paper-2 shrink-0">
        Free community service
      </span>
    )
  }
  return (
    <span className="font-ui text-[9px] font-extrabold uppercase tracking-[0.08em] px-1.5 py-[3px] rounded-[3px] border border-ink/40 text-ink-soft shrink-0">
      Paid notice
    </span>
  )
}

function NoticeCard({ a }: { a: GovAlert }) {
  const toast = useToast()
  const Icon = deptIcon[a.department] ?? ShieldCheck
  return (
    <div className={`rounded-md overflow-hidden border ${a.priority ? 'bg-gov-tint border-gov/30' : 'bg-paper-2 border-line'}`}>
      {a.priority && (
        <div className="flex items-center justify-between bg-gov/15 px-3 py-1.5 border-b border-gov/20">
          <TrustTag kind="gov" label={`Official · ${a.department}`} small />
          <span className="font-ui text-[9.5px] font-extrabold uppercase tracking-[0.1em] text-gov-deep flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gov pulse-dot" /> Public-safety alert
          </span>
        </div>
      )}
      <div className="px-3 py-2.5">
        {!a.priority && (
          <div className="flex items-center justify-between gap-2">
            <TrustTag kind="gov" label={`Official · ${a.department}`} small />
            <span className="font-ui text-[10px] text-ink-faint">{a.time}</span>
          </div>
        )}
        <div className={`${a.priority ? '' : 'mt-1.5'} flex items-start gap-2`}>
          <Icon size={16} className="text-gov shrink-0 mt-0.5" />
          <div>
            <div className="font-ui text-[14px] font-bold leading-snug text-ink">{a.title}</div>
            <p className="mt-1 font-ui text-[12px] leading-relaxed text-ink-soft">{a.body}</p>
            <p className="mt-1.5 font-ui text-[10px] font-bold uppercase tracking-[0.1em] text-gov-deep">
              {a.priority ? `${a.time} · ` : ''}{a.area}
            </p>
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <PlacementTag placement={a.placement} />
          {a.attachment && (
            <button
              onClick={() => toast('Download — demo')}
              className="inline-flex items-center gap-1 font-ui text-[10px] font-bold uppercase tracking-[0.06em] text-ink border border-line rounded-[3px] px-2 py-1 hover:border-ink transition-colors"
            >
              <FileText size={11} /> {a.attachment}
            </button>
          )}
          <span className="flex-1" />
          <button onClick={() => toast('Saved to your list')} aria-label="Save notice" className="text-ink-faint hover:text-ink transition-colors p-1">
            <Bookmark size={15} />
          </button>
          <button onClick={() => toast('Opening WhatsApp to share — demo')} aria-label="Share notice" className="text-ink-faint hover:text-ink transition-colors p-1">
            <Share2 size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Civic({ go }: { go: Go }) {
  const [tab, setTab] = useState<'official' | 'community'>('official')
  const [src, setSrc] = useState('All')
  const [backed, setBacked] = useState<Record<string, boolean>>({})
  const toast = useToast()

  const list = govAlerts.filter((a) => src === 'All' || a.source === src)
  const priority = list.filter((a) => a.priority)
  const routine = list.filter((a) => !a.priority)

  return (
    <div className="rise-in pb-8">
      <div className="px-4 pt-4">
        <h1 className="font-display font-black text-[26px] leading-none text-ink">Official notices</h1>
        <p className="mt-1.5 font-ui text-[11.5px] leading-snug text-ink-soft">
          Verified notices from SASSA, UIF, SEDA, the City and other public bodies. Each one says whether the publisher
          paid for it or we are publishing it free as a community service.
        </p>
      </div>

      {/* tabs */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 border border-line rounded-md overflow-hidden">
          <button
            onClick={() => setTab('official')}
            className={`py-2.5 font-ui text-[11px] font-extrabold uppercase tracking-[0.08em] flex items-center justify-center gap-1.5 transition-colors ${tab === 'official' ? 'bg-gov text-paper-2' : 'bg-paper-2 text-ink-soft'}`}
          >
            <ShieldCheck size={13} /> Official notices
          </button>
          <button
            onClick={() => setTab('community')}
            className={`py-2.5 font-ui text-[11px] font-extrabold uppercase tracking-[0.08em] transition-colors ${tab === 'community' ? 'bg-comm text-paper-2' : 'bg-paper-2 text-ink-soft'}`}
          >
            Community alerts
          </button>
        </div>
      </div>

      {tab === 'official' ? (
        <div className="px-4 mt-4 space-y-2.5">
          <div className="border border-dashed border-line rounded-md px-3 py-2 font-ui text-[10.5px] leading-snug text-ink-faint">
            Sample content for design review. These are not real notices.
          </div>

          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {noticeSources.map((n) => (
              <button
                key={n}
                onClick={() => setSrc(n)}
                className={`font-ui text-[11px] font-bold px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${src === n ? 'bg-ink text-paper-2 border-ink' : 'border-line bg-paper-2 text-ink-soft hover:border-ink'}`}
              >
                {n}
              </button>
            ))}
          </div>

          {priority.map((a) => <NoticeCard key={a.id} a={a} />)}
          {routine.map((a) => <NoticeCard key={a.id} a={a} />)}
          {list.length === 0 && (
            <p className="font-ui text-[12px] text-ink-faint py-6 text-center">No notices from this body right now.</p>
          )}

          <div className="bg-paper-3 border border-line rounded-md px-3 py-2.5 mt-2">
            <p className="font-ui text-[11px] leading-relaxed text-ink-soft">
              <span className="font-extrabold text-ink">Are you a public body?</span> Notices such as grant payment dates,
              UIF updates and small-business training reach residents here. Introductory notices are published free.
            </p>
            <button
              onClick={() => toast('Notice enquiry sent — demo')}
              className="mt-2 font-ui text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-press hover:text-press-deep transition-colors"
            >
              Place a notice →
            </button>
          </div>
        </div>
      ) : (
        <div className="px-4 mt-4 space-y-2.5">
          <div className="border border-dashed border-comm/60 rounded-md px-3 py-2.5 bg-comm-tint/40">
            <p className="font-ui text-[11px] leading-relaxed text-comm">
              <span className="font-extrabold uppercase tracking-[0.06em]">Community alerts are unverified.</span>{' '}
              They come from residents, not the police or the City, and are not an emergency service.
              In an emergency always call SAPS 10111.
            </p>
          </div>

          <button
            onClick={() => go('report')}
            className="w-full bg-press text-paper-2 rounded-md py-3 flex items-center justify-center gap-2 font-ui text-[12px] font-extrabold uppercase tracking-[0.1em] hover:bg-press-deep transition-colors"
          >
            <Megaphone size={15} /> Post a street alert
          </button>

          {safetyPosts.map((s) => {
            const isBacked = !!backed[s.id]
            return (
              <div key={s.id} className="border border-dashed border-comm/50 rounded-md px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <TrustTag kind="comm" small />
                  <span className="font-ui text-[10px] text-ink-faint">{s.time}</span>
                </div>
                <p className="mt-1.5 font-ui text-[12.5px] leading-snug text-ink">{s.text}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-ui text-[10px] font-bold uppercase tracking-[0.08em] text-ink-faint">{s.area}</span>
                  <button
                    onClick={() => { setBacked({ ...backed, [s.id]: !isBacked }); if (!isBacked) toast('Thanks — neighbours can see you confirmed this') }}
                    className={`inline-flex items-center gap-1 font-ui text-[10px] font-extrabold uppercase tracking-[0.08em] px-2.5 py-1.5 rounded-[3px] border transition-colors ${isBacked ? 'bg-comm text-paper-2 border-comm' : 'border-comm/50 text-comm hover:border-comm'}`}
                  >
                    <ThumbsUp size={11} /> {s.backs + (isBacked ? 1 : 0)} confirmed
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
