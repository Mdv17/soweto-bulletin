import { useState } from 'react'
import { Camera, MapPin, ThumbsUp, CircleCheck } from 'lucide-react'
import { issueCategories, myIssues, nearbyIssues, type Issue } from '../data/mock'
import { SectionHead, StatusPill, PrimaryButton, useToast, type Go } from '../components/chrome'

function StatusTrack({ status }: { status: Issue['status'] }) {
  const steps = ['Posted', 'Confirmed', 'Marked fixed']
  const idx = steps.indexOf(status)
  return (
    <div className="flex items-center gap-1 mt-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-1 flex-1 last:flex-none">
          <div className={`h-1 flex-1 rounded-full ${i <= idx ? (status === 'Marked fixed' ? 'bg-retail' : 'bg-gov') : 'bg-line'}`} />
          {i === idx && <span className="font-ui text-[9px] font-extrabold uppercase tracking-[0.06em] text-ink whitespace-nowrap">{s}</span>}
        </div>
      ))}
    </div>
  )
}

function AlertCard({ issue, community }: { issue: Issue; community?: boolean }) {
  const [signed, setSigned] = useState(false)
  const toast = useToast()
  return (
    <div className="bg-paper-2 border border-line rounded-md overflow-hidden">
      {issue.image && <img src={issue.image} alt="" className="w-full aspect-[8/4] object-cover" />}
      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-ui text-[9.5px] font-bold uppercase tracking-[0.1em] text-ink-faint">{issue.ref} · {issue.category}</span>
          <StatusPill status={issue.status} />
        </div>
        <div className="mt-1 font-ui text-[13.5px] font-bold leading-snug text-ink">{issue.title}</div>
        <div className="mt-0.5 font-ui text-[11px] text-ink-faint flex items-center gap-1">
          <MapPin size={10} /> {issue.area} · {issue.age}
          {issue.resolvedIn && <span className="text-retail-deep font-bold">· {issue.resolvedIn}</span>}
        </div>
        <StatusTrack status={issue.status} />
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="font-ui text-[10.5px] font-bold text-ink-soft">
            {issue.coSigns + (signed ? 1 : 0)} neighbours confirmed
          </span>
          {community && issue.status !== 'Marked fixed' && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => toast('Thanks. Once a few neighbours agree, it is marked fixed.')}
                className="font-ui text-[10px] font-extrabold uppercase tracking-[0.08em] px-2.5 py-1.5 rounded-[3px] border border-line text-ink-soft hover:border-ink transition-colors"
              >
                It’s fixed
              </button>
              <button
                onClick={() => { if (!signed) { setSigned(true); toast('Confirmed. Neighbours see you saw it too.') } }}
                className={`inline-flex items-center gap-1 font-ui text-[10px] font-extrabold uppercase tracking-[0.08em] px-2.5 py-1.5 rounded-[3px] border transition-colors ${signed ? 'bg-press text-paper-2 border-press' : 'border-press/50 text-press hover:border-press'}`}
              >
                <ThumbsUp size={11} /> {signed ? 'Still there ✓' : 'Still there'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Report({ go }: { go: Go }) {
  const [cat, setCat] = useState<string | null>(null)
  const [desc, setDesc] = useState('')
  const [anon, setAnon] = useState(false)
  const [posted, setPosted] = useState<Issue | null>(null)
  const [mine, setMine] = useState<Issue[]>(myIssues)
  const toast = useToast()

  const submit = () => {
    if (!cat) { toast('Pick what kind of alert it is first'); return }
    const created: Issue = {
      id: `new-${mine.length}`,
      ref: 'SA-2503',
      category: cat,
      title: desc.trim() || `${cat} reported near Diepkloof Zone 4`,
      area: 'Diepkloof Zone 4',
      status: 'Posted',
      coSigns: 0,
      age: 'Just now',
      mine: true,
    }
    setMine([created, ...mine])
    setPosted(created)
    setCat(null)
    setDesc('')
  }

  return (
    <div className="rise-in pb-8 px-4 pt-4">
      <div className="bg-press-tint border border-press/25 rounded-md px-3 py-2.5">
        <p className="font-ui text-[11.5px] leading-relaxed text-ink">
          <span className="font-bold text-press-deep">A heads-up for your neighbours.</span> Post what you have seen, such as a
          pothole, a burst pipe or dead robots, so people know before they get there. Street alerts are shared with the
          community. They are not sent to the City. If many neighbours confirm one, our newsroom may follow it up.
        </p>
      </div>

      {/* form or success */}
      <div className="mt-5">
        <SectionHead no="A" title="New street alert" />
        {posted ? (
          <div className="bg-retail-tint border border-retail/30 rounded-md px-4 py-4 text-center">
            <CircleCheck size={30} className="text-retail mx-auto" />
            <div className="mt-2 font-display font-black text-[20px] text-ink">Alert posted</div>
            <div className="mt-0.5 font-ui text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink-faint">Reference {posted.ref}</div>
            <p className="mt-2 font-ui text-[12px] leading-relaxed text-ink-soft">
              Neighbours in {posted.area} can now see it and confirm it. Share it on WhatsApp so more people know.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <PrimaryButton tone="retail" onClick={() => toast('Opening WhatsApp to share — demo')}>Share on WhatsApp</PrimaryButton>
              <button onClick={() => setPosted(null)} className="font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-ink-soft hover:text-press transition-colors">
                Post another alert
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="font-ui text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink-soft mb-1.5">What did you see?</div>
            <div className="flex flex-wrap gap-1.5">
              {issueCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`font-ui text-[11.5px] font-bold px-3 py-2 rounded-full border transition-colors ${cat === c ? 'bg-press text-paper-2 border-press' : 'border-line bg-paper-2 text-ink hover:border-ink'}`}
                >
                  {c}
                </button>
              ))}
            </div>

            {cat === 'Area theft notice' && (
              <div className="mt-2.5 border border-dashed border-comm/60 bg-comm-tint/40 rounded-md px-3 py-2 font-ui text-[11px] leading-snug text-comm">
                Say what happened and roughly where. Never name or describe a person, and never give a house number. Our editor checks every alert before it is published.
              </div>
            )}

            <div className="mt-3.5 font-ui text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink-soft mb-1.5">Where?</div>
            <div className="w-full flex items-center justify-between bg-paper-2 border border-line rounded-[4px] px-3 py-2.5">
              <span className="font-ui text-[13px] font-medium text-ink flex items-center gap-2">
                <MapPin size={14} className="text-press" /> Diepkloof Zone 4 <span className="text-ink-faint text-[11px]">(auto-detected)</span>
              </span>
            </div>

            <div className="mt-3.5 font-ui text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink-soft mb-1.5">Tell people more</div>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              placeholder="e.g. Pothole about a metre wide, taxis are swerving around it…"
              className="w-full bg-paper-2 border border-line rounded-[4px] px-3 py-2.5 font-ui text-[13px] text-ink placeholder:text-ink-faint focus:outline-none focus:border-press resize-none"
            />

            <button
              onClick={() => toast('Photo picker — demo')}
              className="mt-2.5 w-full flex items-center justify-center gap-2 border border-dashed border-line rounded-[4px] py-3 font-ui text-[11px] font-bold uppercase tracking-[0.08em] text-ink-soft hover:border-press hover:text-press transition-colors"
            >
              <Camera size={14} /> Add a photo (optional)
            </button>

            <label className="mt-3 flex items-center gap-2 font-ui text-[12px] text-ink-soft cursor-pointer">
              <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} />
              Post without my name
            </label>

            <div className="mt-4">
              <PrimaryButton onClick={submit}>Post alert →</PrimaryButton>
            </div>
          </>
        )}
      </div>

      {/* my alerts */}
      <div className="mt-7">
        <SectionHead no="B" title="My alerts" />
        <div className="space-y-2.5">
          {mine.map((i) => <AlertCard key={i.id} issue={i} />)}
        </div>
      </div>

      {/* nearby */}
      <div className="mt-7">
        <SectionHead no="C" title="Near you: confirm, don’t duplicate" />
        <div className="space-y-2.5">
          {nearbyIssues.map((i) => <AlertCard key={i.id} issue={i} community />)}
        </div>
        <button onClick={() => go('impact')} className="mt-4 w-full text-center font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-ink-soft hover:text-press transition-colors">
          See our community numbers →
        </button>
      </div>
    </div>
  )
}
