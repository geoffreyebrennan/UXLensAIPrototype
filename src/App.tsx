import { useRef, useState, type ChangeEvent, type ReactNode } from 'react'

type IconName = 'grid' | 'plus' | 'spark' | 'chart' | 'book' | 'settings' | 'bell' | 'chevron' | 'upload' | 'link' | 'more' | 'arrow' | 'check' | 'close' | 'file'

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>, spark: <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/>,
    chart: <><path d="M4 19V5M4 19h16"/><path d="m7 15 4-4 3 2 5-6"/></>, book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z"/><path d="M4 5.5v16"/></>, settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20.3h-3v-.08A1.7 1.7 0 0 0 10.68 18.66a1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7.02 15a1.7 1.7 0 0 0-1.56-1.03H5.4v-3h.06A1.7 1.7 0 0 0 7.02 9.94a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 11.7 4.72V4.65h3v.07a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06L19.8 8l-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03h.08v3h-.08A1.7 1.7 0 0 0 19.4 15Z"/></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 22h4"/></>, chevron: <path d="m6 9 6 6 6-6"/>, upload: <><path d="M12 16V3"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/></>, link: <><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></>, more: <><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></>, arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>, check: <path d="m5 12 4 4L19 6"/>, close: <><path d="m6 6 12 12M18 6 6 18"/></>, file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

const analyses = [
  { title: 'Checkout flow', meta: 'Today · 12 findings', color: 'bg-[#a3cef1]' },
  { title: 'Landing page v3', meta: 'Yesterday · 8 findings', color: 'bg-[#6096ba]' },
  { title: 'Account settings', meta: 'Jun 14 · 5 findings', color: 'bg-[#8b8c89]' },
]
const issues = [
  { category: 'CTA', severity: 'High', title: 'Primary action blends into the page', desc: 'The “Start free trial” action has low visual prominence relative to nearby elements.', law: "Von Restorff effect", confidence: '91%', color: 'bg-[#d8695c]' },
  { category: 'Navigation', severity: 'Medium', title: 'Navigation has too many equal choices', desc: 'Seven top-level items compete for attention and increase decision time.', law: "Hick’s law", confidence: '88%', color: 'bg-[#d5a757]' },
  { category: 'Copy', severity: 'Medium', title: 'Helper text is difficult to scan', desc: 'Supporting copy is too close to its field label and lacks a clear reading rhythm.', law: 'Gestalt proximity', confidence: '84%', color: 'bg-[#d5a757]' },
]

type Finding = {
  category: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  confidence: string
  issue: string
  recommendation: string
  why: string
}

export default function App() {
  const [active, setActive] = useState('Welcome')
  const [selected, setSelected] = useState('Checkout flow')
  const [uploaded, setUploaded] = useState(false)
  const [toast, setToast] = useState('')
  const [showAll, setShowAll] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const triggerUpload = () => fileRef.current?.click()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageDimensions, setImageDimensions] = useState<string | null>(null)
  const [analysisResults, setAnalysisResults] = useState<Finding[] | null>(null)
  const [chatMessages, setChatMessages] = useState<Array<{role:'user'|'agent'; text:string}>>([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [chatError, setChatError] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const openAiKey = import.meta.env.VITE_OPENAI_KEY

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const f = event.target.files?.[0]
    if (!f) return
    if (!['image/png', 'image/jpeg'].includes(f.type)) { setToast('Only PNG/JPG images are supported'); setTimeout(() => setToast(''), 2600); return }
    if (f.size > 20 * 1024 * 1024) { setToast('Image must be under 20 MB'); setTimeout(() => setToast(''), 2600); return }
    setUploaded(true)
    setUploadedFile(f)
    const url = URL.createObjectURL(f)
    setPreviewUrl(url)
    setToast('Screenshot added to a new analysis')
    setTimeout(() => setToast(''), 2600)
    setAnalysisResults(null)
    setImageDimensions(null)
    setChatMessages([])
    setChatInput('')
    setActive('Analysis')
    void analyze(f, url)
    event.target.value = ''
  }

  function generateFindings(width:number,height:number,size:number): Finding[] {
    const findings: Finding[] = []
    // Basic heuristics based on dimensions and size
    const isMobile = Math.min(width, height) <= 420 || width <= 420
    if (size < 15000) {
      findings.push({ category: 'Image quality', severity: 'Low', confidence: '72%', issue: 'Low-resolution screenshot', recommendation: 'Capture a higher-resolution screenshot for more accurate analysis.', why: 'Small images can hide text and element relationships.' })
    }
    if (isMobile) {
      findings.push({ category: 'Touch targets', severity: 'Medium', confidence: '86%', issue: 'Potentially small touch targets', recommendation: 'Ensure tap targets are at least 44x44 px and spaced apart.', why: 'Smaller touch targets reduce tappability on mobile.' })
      findings.push({ category: 'Layout', severity: 'Medium', confidence: '80%', issue: 'Content may be cramped vertically', recommendation: 'Increase vertical rhythm and spacing between blocks.', why: 'Improves scanability on small screens.' })
    } else {
      findings.push({ category: 'Navigation', severity: 'Medium', confidence: '82%', issue: 'Navigation may have too many primary items', recommendation: 'Group related items or use a secondary menu to reduce cognitive load.', why: "Hick's law: more choices increase decision time." })
      findings.push({ category: 'CTA prominence', severity: 'High', confidence: '88%', issue: 'Primary CTA lacks strong contrast', recommendation: 'Use a distinct color and size for the primary CTA to improve prominence.', why: 'Improves conversion and discoverability.' })
    }
    // Add a positive signal
    findings.push({ category: 'Positive', severity: 'Low', confidence: '90%', issue: 'Strong whitespace and visual grouping', recommendation: 'Keep whitespace patterns consistent across pages.', why: 'Gestalt principles support clear grouping.' })
    return findings
  }

  const analyze = async (file = uploadedFile, sourceUrl = previewUrl) => {
    if (!file || !sourceUrl) { setToast('Upload an image first'); setTimeout(() => setToast(''),2600); return }
    setAnalyzing(true)
    try {
      const img = new Image()
      img.src = sourceUrl
      await new Promise<void>((resolve, reject) => { img.onload = () => resolve(); img.onerror = () => reject(new Error('Unable to load image')) })
      const width = img.naturalWidth || 0
      const height = img.naturalHeight || 0
      const findings = generateFindings(width, height, file.size)
      await new Promise(resolve => setTimeout(resolve, 600))
      setImageDimensions(`${width} × ${height} px`)
      setAnalysisResults(findings)
      setToast('Analysis complete')
      setTimeout(() => setToast(''),2600)
    } catch (error) {
      console.error(error)
      setToast('Unable to analyze this image')
      setTimeout(() => setToast(''), 2600)
    } finally {
      setAnalyzing(false)
    }
  }

  const generateChatResponse = (message: string) => {
    if (!analysisResults?.length) return 'Upload an image first and the assistant will review the findings with you.'
    const lower = message.toLowerCase()
    if (lower.includes('cta')) return 'The top finding is about CTA prominence; make your main action visually stronger than secondary actions.'
    if (lower.includes('navigation')) return 'Navigation can feel crowded; consider reducing top-level items or grouping related links.'
    if (lower.includes('contrast') || lower.includes('accessibility')) return 'Contrast matters especially for buttons and text. Use a stronger foreground/background combination.'
    if (lower.includes('spacing') || lower.includes('layout')) return 'Spacing and grouping are important for scanability. Increase whitespace around key sections.'
    const top = analysisResults[0]
    return `Based on the analysis, a key issue is: ${top.issue}. ${top.recommendation}`
  }

  const submitChat = async () => {
    const text = chatInput.trim()
    if (!text) return
    setChatLoading(true)
    setChatError('')
    setChatMessages(prev => [...prev, { role: 'user', text }])
    setChatInput('')

    if (!openAiKey) {
      const response = generateChatResponse(text)
      setChatMessages(prev => [...prev, { role: 'agent', text: response }])
      setChatLoading(false)
      return
    }

    try {
      const body = {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are UXLens AI, a UX analysis assistant.' },
          ...chatMessages.map(msg => ({ role: msg.role === 'user' ? 'user' : 'assistant', content: msg.text })),
          { role: 'user', content: text },
        ],
      }
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(`OpenAI API error ${res.status}`)
      const data = await res.json()
      const aiText = data.choices?.[0]?.message?.content?.trim() || 'The assistant did not return a response.'
      setChatMessages(prev => [...prev, { role: 'agent', text: aiText }])
    } catch (error) {
      console.error(error)
      setChatError('Unable to reach the chat assistant. Using local summary instead.')
      const response = generateChatResponse(text)
      setChatMessages(prev => [...prev, { role: 'agent', text: response }])
    } finally {
      setChatLoading(false)
    }
  }

  const exportMarkdown = () => {
    const findings = analysisResults ?? []
    const mdLines = [
      `# UXLens AI — Analysis Report`,
      ``,
      `**File:** ${uploadedFile?.name ?? 'N/A'}`,
      `**Dimensions:** ${imageDimensions ?? 'N/A'}`,
      ``,
      `## Findings`,
      ``,
    ]
    findings.forEach((f,i) => {
      mdLines.push(`### ${i+1}. ${f.issue}`)
      mdLines.push(`- **Category:** ${f.category}`)
      mdLines.push(`- **Severity:** ${f.severity}`)
      mdLines.push(`- **Confidence:** ${f.confidence}`)
      mdLines.push(`- **Recommendation:** ${f.recommendation}`)
      mdLines.push(`- **Why:** ${f.why}`)
      mdLines.push(``)
    })
    const blob = new Blob([mdLines.join('\n')], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${uploadedFile?.name ?? 'ux-analysis'}.md`
    a.click()
    URL.revokeObjectURL(url)
  }
  const nav = ['Overview', 'Analysis', 'Insights', 'Library']

  const summaryCount = analysisResults?.length ?? 0
  const overviewHighlights = analysisResults ? analysisResults.slice(0, 2) : []

  const renderWelcome = () => (
    <div className="space-y-8" style={{ padding: '0 24px' }}>
      <div className="grid min-h-[calc(100vh-140px)] place-items-center py-8">
        <div className="w-full max-w-3xl text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#274c77] text-[#a3cef1] shadow-[0_12px_28px_rgba(39,76,119,.2)]"><Icon name="spark" size={27}/></div>
          <p className="mt-7 text-sm font-semibold text-[#6096ba]">Welcome to UXLens AI</p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-.055em] text-[#18314f] sm:text-5xl">Find UX friction before it reaches your users.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#52718c]">Upload a product screenshot and get a focused review with practical recommendations based on established UX principles.</p>
          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-dashed border-[#6096ba]/60 bg-[#f7f9fa] p-8 shadow-[0_14px_32px_rgba(39,76,119,.08)] sm:p-10">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#a3cef1]/50 text-[#274c77]"><Icon name="upload" size={23}/></div>
            <h3 className="mt-5 text-xl font-bold tracking-[-.03em]">Start a new analysis</h3>
            <p className="mt-2 text-sm leading-6 text-[#52718c]">Choose a PNG or JPG screenshot to receive your UX review.</p>
            <button type="button" onClick={triggerUpload} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#274c77] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(39,76,119,.18)] transition hover:-translate-y-0.5 hover:bg-[#1f4169]"><Icon name="upload" size={17}/>Upload screenshot</button>
            <p className="mt-4 text-xs text-[#8b8c89]">PNG or JPG · Maximum file size 20 MB</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderOverview = () => (
    <div className="space-y-8" style={{ padding: '0 24px' }}>
      <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="mt-2 mb-2 text-sm font-semibold text-[#6096ba]">Overview</p>
          <h2 className="max-w-xl text-3xl font-bold tracking-[-.055em] sm:text-[38px]">High-level UX feedback at a glance.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#52718c]">Get the top recommendations and a direct path into the detailed review.</p>
        </div>
        <button onClick={() => setActive('Analysis')} className="flex items-center justify-center gap-2 rounded-xl bg-[#274c77] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(39,76,119,.18)] transition hover:-translate-y-0.5">Go to Analysis</button>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-2xl border border-[#274c77]/10 bg-[#f7f9fa] p-6 shadow-[0_12px_30px_rgba(39,76,119,.06)]">
          <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#8b8c89]">Snapshot</p><h3 className="mt-3 text-2xl font-bold tracking-[-.03em]">Current analysis status</h3></div><div className="rounded-2xl bg-[#6096ba]/15 px-3 py-2 text-sm font-semibold text-[#274c77]">{active}</div></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs uppercase tracking-[.18em] text-[#8b98b1]">Findings</p><p className="mt-3 text-3xl font-bold text-[#274c77]">{summaryCount}</p></div>
            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs uppercase tracking-[.18em] text-[#8b98b1]">Latest guideline</p><p className="mt-3 text-base font-semibold text-[#18314f]">Use contrast and whitespace to emphasize the primary CTA.</p></div>
            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs uppercase tracking-[.18em] text-[#8b98b1]">Next step</p><p className="mt-3 text-base font-semibold text-[#18314f]">Open Analysis for the full review and learn why each item matters.</p></div>
          </div>
        </div>
        <div className="rounded-2xl border border-[#274c77]/10 bg-[#274c77] p-6 text-white shadow-[0_12px_30px_rgba(39,76,119,.18)]">
          <p className="text-sm font-semibold text-[#a3cef1]">Quick highlights</p>
          <h3 className="mt-3 text-2xl font-bold tracking-[-.03em]">Top priorities from the last review</h3>
          <div className="mt-7 space-y-4">
            {overviewHighlights.length ? overviewHighlights.map((item, idx) => (
              <div key={idx} className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm font-semibold">{item.issue}</p>
                <p className="mt-2 text-sm leading-6 text-[#dbe5f1]">{item.recommendation}</p>
              </div>
            )) : <p className="mt-5 text-sm leading-6 text-[#dbe5f1]">Upload a screenshot to see the top UX findings here.</p>}
          </div>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_.6fr]">
        <div className="rounded-2xl border border-[#274c77]/10 bg-[#f7f9fa] p-6 shadow-[0_12px_30px_rgba(39,76,119,.06)]">
          <p className="text-xs font-semibold text-[#8b8c89]">Summary</p>
          <h3 className="mt-3 text-xl font-bold tracking-[-.03em]">What the app found most urgently</h3>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm font-semibold">Focus your first fix</p><p className="mt-2 text-sm leading-6 text-[#52718c]">Improving CTA prominence and reducing visual noise is the highest-impact change for this design.</p></div>
            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm font-semibold">Why it matters</p><p className="mt-2 text-sm leading-6 text-[#52718c]">Clear hierarchy helps people decide faster and increases conversion confidence.</p></div>
          </div>
        </div>
        <div className="rounded-2xl border border-[#274c77]/10 bg-white p-6 shadow-[0_12px_30px_rgba(39,76,119,.06)]">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#8b8c89]">Explore</p>
          <h3 className="mt-3 text-xl font-bold tracking-[-.03em]">Ready for analysis</h3>
          <p className="mt-4 text-sm leading-6 text-[#52718c]">Once you upload a design, Analysis delivers the detailed review and Insights shows the broader trends over time.</p>
          <button onClick={triggerUpload} className="mt-7 w-full rounded-xl bg-[#274c77] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f4169]">Upload screenshot</button>
        </div>
      </div>
    </div>
  )

  const renderAnalysis = () => (
    <div className="space-y-8" style={{ padding: '0 24px' }}>
      <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="mt-2 mb-2 text-sm font-semibold text-[#6096ba]">Analysis</p>
          <h2 className="max-w-xl text-3xl font-bold tracking-[-.055em] sm:text-[38px]">Detailed review with findings and recommendations.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#52718c]">{analyzing ? 'Analyzing the screenshot now. Results will appear shortly.' : 'Drill into each issue, see severity, and ask the AI reviewer for next-step guidance.'}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={exportMarkdown} disabled={!analysisResults} className="rounded-xl border border-[#274c77]/20 bg-white px-5 py-3 text-sm font-semibold text-[#274c77] transition hover:bg-[#f7f9fa] disabled:cursor-not-allowed disabled:opacity-50">Export report</button>
          <button onClick={triggerUpload} className="flex items-center justify-center gap-2 rounded-xl bg-[#274c77] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(39,76,119,.18)] transition hover:-translate-y-0.5">Upload another screenshot</button>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <div className="rounded-2xl border border-[#274c77]/10 bg-[#f7f9fa] p-5 shadow-[0_12px_30px_rgba(39,76,119,.06)] sm:p-6">
          <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-semibold text-[#8b8c89]">Detailed review</p><h3 className="mt-1 text-xl font-bold tracking-[-.03em]">Current analysis</h3></div></div>
          <div className="grid gap-5 sm:grid-cols-[.88fr_1.12fr]">
            <div className="relative min-h-[235px] overflow-hidden rounded-xl bg-[#a3cef1]/75 p-4">
              {previewUrl ? <img src={previewUrl} alt="preview" className="h-[320px] w-full object-contain rounded-md bg-white/80" /> : <div className="flex h-full items-center justify-center text-[#52718c]"><button type="button" onClick={triggerUpload} className="font-semibold text-[#274c77] underline decoration-[#6096ba] underline-offset-2 transition hover:text-[#6096ba]">Upload a screenshot</button><span>&nbsp;to start detailed analysis.</span></div>}
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-2"><Metric value={analysisResults ? '74' : '--'} label="UX score" suffix="/100"/><Metric value={analysisResults ? analysisResults.length.toString() : '--'} label="Findings" suffix=""/></div>
              {analysisResults ? <div className="mt-4 rounded-xl bg-white p-4 shadow-sm border border-[#e7ecef]"><div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold">Live analysis</span><span className="text-xs text-[#52718c]">{analysisResults.length} findings</span></div><div className="space-y-3">{analysisResults.slice(0,2).map((finding, idx) => <div key={idx} className="rounded-lg bg-[#f7f9fa] p-3"><p className="font-semibold text-sm">{finding.issue}</p><p className="mt-1 text-xs text-[#52718c]">{finding.recommendation}</p></div>)}</div></div> : <div className="mt-4 rounded-xl bg-[#e7ecef] p-4 text-sm text-[#52718c]">No detailed review yet. Upload a screenshot to generate an analysis.</div>}
              <div className="mt-4 rounded-xl bg-[#e7ecef] p-4"><div className="mb-2 flex items-center justify-between"><span className="text-sm font-semibold">Readiness score</span><span className="text-sm font-bold text-[#274c77]">{analysisResults ? '74%' : '—'}</span></div><div className="h-2 overflow-hidden rounded-full bg-white"><div className="h-full w-[74%] rounded-full bg-[#6096ba]"/></div><p className="mt-3 text-xs leading-5 text-[#52718c]">A solid foundation, with a few high-impact opportunities before release.</p></div>
            </div>
          </div>
        </div>
        <div className="mr-6 rounded-2xl bg-[#274c77] p-6 text-white shadow-[0_12px_30px_rgba(39,76,119,.18)]">
          <div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-[#a3cef1]">UX review agent</p><h3 className="mt-1 text-xl font-bold tracking-[-.03em]">Chat with the assistant</h3></div><div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#a3cef1]"><Icon name="spark" size={20}/></div></div>
          {analysisResults ? (
            <>
              <div className="mt-7 max-h-[280px] overflow-y-auto space-y-3">
                {chatMessages.length ? chatMessages.map((msg, idx) => <div key={idx} className={`rounded-xl p-3 ${msg.role === 'user' ? 'bg-white text-[#18314f]' : 'bg-[#1f4169] text-white'}`}><div className="text-[11px] uppercase tracking-[.16em] text-[#8b98b1]">{msg.role === 'user' ? 'You' : 'Agent'}</div><p className="mt-1 text-sm leading-6">{msg.text}</p></div>) : <div className="rounded-xl bg-white/10 p-4 text-sm text-[#dbe5f1]">Ask the assistant to explain a finding or suggest next steps.</div>}
              </div>
              <div className="relative mt-5 space-y-3"><div className="flex gap-2"><input value={chatInput} onChange={e => setChatInput(e.target.value)} disabled={!analysisResults || chatLoading} className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none" placeholder="Ask anything..."/><button onClick={submitChat} disabled={!analysisResults || !chatInput.trim() || chatLoading} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#274c77] transition hover:bg-[#f7f9fa] disabled:cursor-not-allowed disabled:opacity-60">{chatLoading ? 'Thinking…' : 'Send'}</button></div><div aria-hidden="true" className="absolute -right-11 top-1 grid h-10 w-10 place-items-center rounded-full bg-[#6096ba] text-white shadow-lg animate-pulse"><Icon name="arrow" size={21}/></div>{chatError ? <p className="text-sm text-[#ffdad6]">{chatError}</p> : null}</div>
            </>
          ) : (
            <div className="mt-7 rounded-xl border border-white/15 bg-white/10 p-5 text-sm leading-6 text-[#dbe5f1]">Upload an image to start a conversation with the AI reviewer.</div>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#8b8c89]">Findings</p>
            <h3 className="text-xl font-bold tracking-[-.03em]">Detailed review items</h3>
          </div>
          <button onClick={() => setShowAll(!showAll)} className="text-sm font-semibold text-[#274c77] hover:text-[#6096ba]">
            {showAll ? 'Show fewer' : 'View all findings'}
          </button>
        </div>
        <div className="grid gap-3">
          {analysisResults ? (
            (showAll ? analysisResults : analysisResults.slice(0, 3)).map((issue, i) => (
              <article key={i} className="rounded-xl border border-[#274c77]/10 bg-[#f7f9fa] p-4 transition hover:border-[#6096ba]/50 hover:shadow-sm">
                <div className="flex gap-3">
                  <i className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d5a757]"/>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h4 className="font-bold tracking-[-.02em]">{issue.issue}</h4>
                      <span className="rounded-full bg-[#e7ecef] px-2 py-0.5 text-xs font-semibold text-[#52718c]">{issue.severity}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-5 text-[#52718c]">{issue.recommendation}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-md bg-[#a3cef1]/35 px-2 py-1 font-semibold text-[#274c77]">{issue.category}</span>
                      <span className="rounded-md bg-[#e7ecef] px-2 py-1 text-[#52718c]">{issue.confidence} confidence</span>
                    </div>
                  </div>
                  <button aria-label="Dismiss finding" className="text-[#8b8c89] hover:text-[#274c77]"><Icon name="close" size={16}/></button>
                </div>
              </article>
            ))
          ) : (
            <article className="rounded-xl border border-[#274c77]/10 bg-[#f7f9fa] p-6 text-sm text-[#52718c]">
              <p className="font-semibold">No findings yet.</p>
              <p className="mt-2">Upload a screenshot to generate the detailed review items.</p>
            </article>
          )}
        </div>
      </div>
    </div>
  )

  const renderInsights = () => (
    <div className="space-y-8" style={{ padding: '0 24px' }}>
      <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="mt-2 mb-2 text-sm font-semibold text-[#6096ba]">Insights</p>
          <h2 className="max-w-xl text-3xl font-bold tracking-[-.055em] sm:text-[38px]">Understand what your reviews are teaching you.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#52718c]">Track patterns across analyses and see which UX issues appear most often.</p>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        <div className="rounded-2xl border border-[#274c77]/10 bg-[#f7f9fa] p-6 shadow-[0_12px_30px_rgba(39,76,119,.06)]"><p className="text-xs uppercase tracking-[.2em] text-[#8b8c89]">Review volume</p><p className="mt-4 text-3xl font-bold text-[#274c77]">{analyses.length}</p><p className="mt-3 text-sm leading-6 text-[#52718c]">Analyses completed over time.</p></div>
        <div className="rounded-2xl border border-[#274c77]/10 bg-[#f7f9fa] p-6 shadow-[0_12px_30px_rgba(39,76,119,.06)]"><p className="text-xs uppercase tracking-[.2em] text-[#8b8c89]">Common severity</p><p className="mt-4 text-3xl font-bold text-[#274c77]">High</p><p className="mt-3 text-sm leading-6 text-[#52718c]">Most frequent issue level across the last analyses.</p></div>
        <div className="rounded-2xl border border-[#274c77]/10 bg-[#f7f9fa] p-6 shadow-[0_12px_30px_rgba(39,76,119,.06)]"><p className="text-xs uppercase tracking-[.2em] text-[#8b8c89]">Top theme</p><p className="mt-4 text-3xl font-bold text-[#274c77]">Navigation</p><p className="mt-3 text-sm leading-6 text-[#52718c]">Most repeated design heuristic in the library.</p></div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_.6fr]">
        <div className="rounded-2xl border border-[#274c77]/10 bg-[#f7f9fa] p-6 shadow-[0_12px_30px_rgba(39,76,119,.06)]"><p className="text-xs uppercase tracking-[.2em] text-[#8b8c89]">Insight trends</p><h3 className="mt-3 text-xl font-bold tracking-[-.03em]">What users are learning</h3><div className="mt-6 grid gap-4"><div className="rounded-2xl bg-white p-4"><p className="text-sm font-semibold">UX issues are becoming more consistent.</p><p className="mt-2 text-sm leading-6 text-[#52718c]">Repeated guidance around contrast and hierarchy indicates this is a common improvement area.</p></div><div className="rounded-2xl bg-white p-4"><p className="text-sm font-semibold">Report acceptance is rising.</p><p className="mt-2 text-sm leading-6 text-[#52718c]">Users are acting on prioritized recommendations faster as the library grows.</p></div></div></div>
        <div className="rounded-2xl border border-[#274c77]/10 bg-[#274c77] p-6 text-white shadow-[0_12px_30px_rgba(39,76,119,.18)]"><p className="text-xs uppercase tracking-[.2em] text-[#a3cef1]">Snapshot</p><h3 className="mt-3 text-xl font-bold tracking-[-.03em]">Insights at a glance</h3><div className="mt-6 space-y-4"><div className="rounded-2xl bg-white/10 p-4"><p className="text-sm font-semibold text-white">Most cited heuristic</p><p className="mt-2 text-sm leading-6 text-[#dbe5f1]">Hick’s law and navigation clarity.</p></div><div className="rounded-2xl bg-white/10 p-4"><p className="text-sm font-semibold text-white">Confidence pattern</p><p className="mt-2 text-sm leading-6 text-[#dbe5f1]">Most suggestions are marked high confidence.</p></div></div></div>
      </div>
    </div>
  )

  const renderLibrary = () => (
    <div className="space-y-8" style={{ padding: '0 24px' }}>
      <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="mt-2 mb-2 text-sm font-semibold text-[#6096ba]">Library</p>
          <h2 className="max-w-xl text-3xl font-bold tracking-[-.055em] sm:text-[38px]">UX guidelines and patterns you can rely on.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#52718c]">A growing collection of advice, organized by UX category and confidence.</p>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_.6fr]">
        <div className="space-y-4">
          {issues.map((item, idx) => <div key={idx} className="rounded-2xl border border-[#274c77]/10 bg-[#f7f9fa] p-6 shadow-[0_12px_30px_rgba(39,76,119,.06)]"><div className="flex items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-[.2em] text-[#8b8c89]">{item.category}</p><h3 className="mt-2 text-lg font-bold tracking-[-.03em]">{item.title}</h3></div><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.color} text-white`}>{item.severity}</span></div><p className="mt-4 text-sm leading-6 text-[#52718c]">{item.desc}</p><div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="rounded-md bg-white/90 px-2 py-1 text-[#274c77]">{item.law}</span><span className="rounded-md bg-white/90 px-2 py-1 text-[#274c77]">{item.confidence} confidence</span></div></div>)}
        </div>
        <div className="rounded-2xl border border-[#274c77]/10 bg-[#f7f9fa] p-6 shadow-[0_12px_30px_rgba(39,76,119,.06)]">
          <p className="text-xs uppercase tracking-[.2em] text-[#8b8c89]">How this library grows</p>
          <h3 className="mt-3 text-xl font-bold tracking-[-.03em]">Guidelines added with every review</h3>
          <p className="mt-4 text-sm leading-6 text-[#52718c]">Every analysis contributes patterns, examples, and explanations so you can learn UX standards as you go.</p>
          <div className="mt-6 space-y-3"><div className="rounded-2xl bg-white p-4"><p className="text-sm font-semibold">Navigation clarity</p><p className="mt-2 text-sm leading-6 text-[#52718c]">Limit primary choices and group related links to reduce decision fatigue.</p></div><div className="rounded-2xl bg-white p-4"><p className="text-sm font-semibold">CTA prominence</p><p className="mt-2 text-sm leading-6 text-[#52718c]">Use color, size, and whitespace to make the main action unmistakable.</p></div></div>
        </div>
      </div>
    </div>
  )

  const renderActiveView = () => {
    if (active === 'Welcome') return renderWelcome()
    if (active === 'Analysis') return renderAnalysis()
    if (active === 'Insights') return renderInsights()
    if (active === 'Library') return renderLibrary()
    return renderOverview()
  }

  return <main className="min-h-screen bg-[#e7ecef] font-sans text-[#18314f]">
    <input ref={fileRef} onChange={onUpload} type="file" accept="image/png,image/jpeg" className="hidden" />
    <div className="flex min-h-screen">
      <aside className="hidden w-[248px] shrink-0 flex-col border-r border-[#274c77]/10 bg-[#f7f9fa] p-5 lg:flex">
        <button type="button" onClick={() => setActive('Welcome')} className="mb-12 flex items-center gap-3 rounded-xl px-2 text-left transition hover:opacity-80" aria-label="Go to welcome page"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#274c77] text-white shadow-sm"><Icon name="spark" size={18}/></span><span className="text-lg font-bold tracking-[-.04em]">UXLens <span className="font-normal text-[#6096ba]">AI</span></span></button>
        <button onClick={triggerUpload} className="mb-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#274c77] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(39,76,119,.18)] transition hover:bg-[#1f4169]"><Icon name="plus" size={17}/>New analysis</button>
        <nav className="space-y-1">{nav.map((item, i) => <button key={item} onClick={() => setActive(item)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${active === item ? 'bg-[#a3cef1]/45 font-semibold text-[#274c77]' : 'text-[#52718c] hover:bg-[#e7ecef]'}`}><Icon name={['grid','file','chart','book'][i] as IconName} size={18}/>{item}</button>)}</nav>
        <div className="mt-9"><p className="px-3 pb-2 text-xs font-semibold text-[#8b8c89]">Recent analyses</p><div className="space-y-1">{analyses.map(a => <button key={a.title} onClick={() => setSelected(a.title)} className={`w-full rounded-lg px-3 py-2 text-left transition ${selected === a.title ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}><span className="flex items-center gap-2 text-sm font-semibold"><i className={`h-2 w-2 rounded-full ${a.color}`}/>{a.title}</span><span className="ml-4 text-xs text-[#8b8c89]">{a.meta}</span></button>)}</div></div>
        <div className="mt-auto space-y-1 border-t border-[#274c77]/10 pt-4"><button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#52718c] hover:bg-[#e7ecef]"><Icon name="settings" size={18}/>Settings</button><div className="flex items-center gap-3 px-3 py-3"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#6096ba] text-xs font-bold text-white">JS</div><div><p className="text-sm font-semibold">Jordan Smith</p><p className="text-xs text-[#8b8c89]">Free plan</p></div></div></div>
      </aside>
      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[76px] items-center justify-between border-b border-[#274c77]/10 bg-[#f7f9fa]/80 px-5 backdrop-blur sm:px-8"><div><p className="text-xs text-[#8b8c89]">Workspace / {active}</p><h1 className="mt-0.5 text-lg font-bold tracking-[-.025em]">Good morning, Jordan</h1></div><div className="flex items-center gap-3"><button onClick={() => setToast('You’re all caught up')} className="relative grid h-9 w-9 place-items-center rounded-full text-[#52718c] hover:bg-[#e7ecef]"><Icon name="bell" size={19}/><i className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#d8695c]"/></button><button className="flex items-center gap-2 rounded-lg border border-[#274c77]/10 bg-white px-2.5 py-2 text-sm font-semibold">This week <Icon name="chevron" size={15}/></button></div></header>
        <div className="mx-auto w-full max-w-[1440px] p-5 sm:p-8" style={{ display: 'none' }}>
          <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end"><div><p className="mb-2 text-sm font-semibold text-[#6096ba]">Your design review workspace</p><h2 className="max-w-xl text-3xl font-bold tracking-[-.055em] sm:text-[38px]">Spot usability friction <span className="text-[#6096ba]">before</span> it ships.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#52718c]">Upload a screenshot and get grounded, actionable feedback tied to recognized UX principles.</p></div><button onClick={triggerUpload} className="flex items-center justify-center gap-2 rounded-xl bg-[#274c77] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(39,76,119,.18)] transition hover:-translate-y-0.5"><Icon name="spark" size={17}/>Analyze a design</button></div>
          <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
            <div className="rounded-2xl border border-[#274c77]/10 bg-[#f7f9fa] p-5 shadow-[0_12px_30px_rgba(39,76,119,.06)] sm:p-6"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-semibold text-[#8b8c89]">Latest analysis</p><h3 className="mt-1 text-xl font-bold tracking-[-.03em]">{selected}</h3></div><button className="rounded-lg p-2 text-[#52718c] hover:bg-[#e7ecef]"><Icon name="more"/></button></div><div className="grid gap-5 sm:grid-cols-[.88fr_1.12fr]">
              <div className="relative min-h-[235px] overflow-hidden rounded-xl bg-[#a3cef1]/75 p-4">
                {previewUrl ? (
                  <img src={previewUrl} alt="preview" className="h-[320px] w-full object-contain rounded-md bg-white/80" />
                ) : (
                  <>
                    <div className="absolute inset-x-4 top-4 h-8 rounded-md bg-white/85"/>
                    <div className="absolute left-4 top-[62px] h-10 w-[47%] rounded-md bg-[#274c77]/85"/>
                    <div className="absolute right-4 top-[62px] h-10 w-[34%] rounded-md bg-white/90"/>
                    <div className="absolute inset-x-4 top-[118px] grid grid-cols-2 gap-2"><div className="h-20 rounded-md bg-white/80"/><div className="h-20 rounded-md bg-white/65"/></div>
                    <span className="absolute bottom-4 left-4 rounded-md bg-[#274c77] px-2.5 py-1 text-xs font-semibold text-white">Desktop · 1440 px</span>
                  </>
                )}
              </div>
              <div className="flex flex-col"><div className="grid grid-cols-2 gap-2"><Metric value={analysisResults ? '74' : '--'} label="UX score" suffix="/100"/><Metric value={analysisResults ? analysisResults.length.toString() : '--'} label="Findings" suffix=""/></div>{analysisResults ? <div className="mt-4 rounded-xl bg-white p-4 shadow-sm border border-[#e7ecef]"><div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold">Live analysis</span><span className="text-xs text-[#52718c]">{analysisResults.length} findings</span></div><div className="space-y-3">{analysisResults.slice(0,2).map((finding, idx) => <div key={idx} className="rounded-lg bg-[#f7f9fa] p-3"><p className="font-semibold text-sm">{finding.issue}</p><p className="mt-1 text-xs text-[#52718c]">{finding.recommendation}</p></div>)}</div></div> : <div className="mt-4 rounded-xl bg-[#e7ecef] p-4 text-sm text-[#52718c]">Upload a screenshot to see personalized UX findings rendered inside the main page.</div>}<div className="mt-4 rounded-xl bg-[#e7ecef] p-4"><div className="mb-2 flex items-center justify-between"><span className="text-sm font-semibold">Readiness score</span><span className="text-sm font-bold text-[#274c77]">{analysisResults ? '74%' : '—'}</span></div><div className="h-2 overflow-hidden rounded-full bg-white"><div className="h-full w-[74%] rounded-full bg-[#6096ba]"/></div><p className="mt-3 text-xs leading-5 text-[#52718c]">A solid foundation, with a few high-impact opportunities before release.</p></div><button onClick={() => setActive('Analysis')} className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-semibold text-[#274c77] hover:text-[#6096ba]">Open full report <Icon name="arrow" size={16}/></button></div></div></div>
            <div className="rounded-2xl bg-[#274c77] p-6 text-white shadow-[0_12px_30px_rgba(39,76,119,.18)]">
              <div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-[#a3cef1]">UX review agent</p><h3 className="mt-1 text-xl font-bold tracking-[-.03em]">Chat with the analysis assistant</h3></div><div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#a3cef1]"><Icon name="spark" size={20}/></div></div>
              {analysisResults ? (
                <>
                  <div className="mt-7 max-h-[280px] overflow-y-auto space-y-3">
                    {chatMessages.length ? chatMessages.map((msg, idx) => <div key={idx} className={`rounded-xl p-3 ${msg.role === 'user' ? 'bg-white text-[#18314f]' : 'bg-[#1f4169] text-white'}`}><div className="text-[11px] uppercase tracking-[.16em] text-[#8b98b1]">{msg.role === 'user' ? 'You' : 'Agent'}</div><p className="mt-1 text-sm leading-6">{msg.text}</p></div>) : <div className="rounded-xl bg-white/10 p-4 text-sm text-[#dbe5f1]">Ask the assistant about the analysis, contrast, navigation, or CTA effectiveness.</div>}
                  </div>
                  <div className="mt-5 space-y-3"><div className="flex gap-2"><input value={chatInput} onChange={e => setChatInput(e.target.value)} disabled={!analysisResults || chatLoading} className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none" placeholder="Ask anything..."/><button onClick={submitChat} disabled={!analysisResults || !chatInput.trim() || chatLoading} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#274c77] transition hover:bg-[#f7f9fa] disabled:cursor-not-allowed disabled:opacity-60">{chatLoading ? 'Thinking…' : 'Send'}</button></div>{chatError ? <p className="text-sm text-[#ffdad6]">{chatError}</p> : null}</div>
                </>
              ) : (
                <div className="mt-7 rounded-xl border border-white/15 bg-white/10 p-5 text-sm leading-6 text-[#dbe5f1]">Upload an image to start a conversation with the AI reviewer. After analysis, ask questions about the findings and recommendations.</div>
              )}
            </div>
          </div>
          <div className="mt-7 grid gap-7 xl:grid-cols-[1.4fr_.6fr]"><section><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-semibold text-[#8b8c89]">Prioritized feedback</p><h3 className="mt-1 text-xl font-bold tracking-[-.03em]">Focus on these next</h3></div><button onClick={() => setShowAll(!showAll)} className="text-sm font-semibold text-[#274c77] hover:text-[#6096ba]">{showAll ? 'Show fewer' : 'View all findings'}</button></div><div className="space-y-3">{analysisResults ? (showAll ? analysisResults : analysisResults.slice(0,3)).map((issue, i) => <article key={i} className="rounded-xl border border-[#274c77]/10 bg-[#f7f9fa] p-4 transition hover:border-[#6096ba]/50 hover:shadow-sm"><div className="flex gap-3"><i className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d5a757]"/><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-3 gap-y-1"><h4 className="font-bold tracking-[-.02em]">{issue.issue}</h4><span className="rounded-full bg-[#e7ecef] px-2 py-0.5 text-xs font-semibold text-[#52718c]">{issue.severity}</span></div><p className="mt-1.5 text-sm leading-5 text-[#52718c]">{issue.recommendation}</p><div className="mt-3 flex flex-wrap gap-2 text-xs"><span className="rounded-md bg-[#a3cef1]/35 px-2 py-1 font-semibold text-[#274c77]">{issue.category}</span><span className="rounded-md bg-[#e7ecef] px-2 py-1 text-[#52718c]">{issue.confidence} confidence</span></div></div><button aria-label="Dismiss finding" className="text-[#8b8c89] hover:text-[#274c77]"><Icon name="close" size={16}/></button></div></article>) : <article className="rounded-xl border border-[#274c77]/10 bg-[#f7f9fa] p-6 text-sm text-[#52718c]"><p className="font-semibold">Upload an image to generate prioritized UX feedback.</p><p className="mt-2">Feedback will populate here once analysis is complete, including issues, severity, and recommendations.</p></article>}</div></section><section className="rounded-2xl border border-[#274c77]/10 bg-[#f7f9fa] p-5"><p className="text-xs font-semibold text-[#8b8c89]">Your momentum</p><h3 className="mt-1 text-xl font-bold tracking-[-.03em]">Review activity</h3><div className="mt-6 grid grid-cols-3 gap-2"><Metric value="8" label="Reviews" suffix=""/><Metric value="31" label="Findings fixed" suffix=""/><Metric value="4.7" label="Avg. rating" suffix=""/></div><div className="mt-6 border-t border-[#274c77]/10 pt-5"><p className="text-sm font-semibold">Keep building thoughtful experiences.</p><p className="mt-1 text-xs leading-5 text-[#52718c]">You’ve addressed 62% of high-impact findings this month.</p><div className="mt-4 flex h-14 items-end gap-2">{[35, 52, 41, 70, 60, 88, 75].map((h, i) => <div key={i} className="flex-1 rounded-t bg-[#6096ba]" style={{height: `${h}%`, opacity: .4 + i / 14}}/>)}</div><div className="mt-2 flex justify-between text-[10px] text-[#8b8c89]"><span>Mon</span><span>Sun</span></div></div></section></div>
        </div>
          {renderActiveView()}
      </section>
    </div>
    {uploaded && <div className="fixed bottom-5 right-5 flex items-center gap-3 rounded-xl bg-[#274c77] px-4 py-3 text-sm text-white shadow-xl"><Icon name="check" size={17}/>Screenshot queued for analysis<button onClick={() => setUploaded(false)}><Icon name="close" size={16}/></button></div>}
    {toast && <div className="fixed bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-[#18314f] px-4 py-2 text-sm text-white shadow-lg">{toast}</div>}
  </main>
}
function Metric({value,label,suffix}:{value:string;label:string;suffix:string}) { return <div className="rounded-lg bg-[#e7ecef] p-3"><p className="text-lg font-bold tracking-[-.04em]">{value}<span className="ml-0.5 text-xs font-normal text-[#52718c]">{suffix}</span></p><p className="mt-1 text-xs text-[#52718c]">{label}</p></div> }
