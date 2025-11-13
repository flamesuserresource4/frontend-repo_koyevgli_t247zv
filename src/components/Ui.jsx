import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Shirt, ImagePlus, Loader2, Sparkles, UploadCloud, Download, Play, Pause, Settings, ChevronRight, Stars, Wand2, Square, RectangleHorizontal, RectangleVertical, Instagram } from 'lucide-react'
import Spline from '@splinetool/react-spline'

export function TopNav({ activeTab, setActiveTab }) {
  const tabs = ['Apparel', 'Product', 'Mockup', 'Creator', 'Travel', 'Re-Imagine']
  return (
    <div className="fixed top-0 inset-x-0 z-30 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Sparkles className="text-purple-400" size={20} />
          <span>Pixels Mind</span>
        </div>
        <nav className="ml-6 hidden sm:flex gap-1">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1.5 rounded-md text-sm transition ${activeTab===t? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              {t}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-md text-white/80 hover:text-white hover:bg-white/5 text-sm">Login</button>
          <button className="px-3 py-1.5 rounded-md bg-purple-500/80 hover:bg-purple-500 text-white text-sm">Upgrade</button>
        </div>
      </div>
      <div className="h-[300px] w-full relative">
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />
      </div>
    </div>
  )
}

export function LeftPanel({ presets, onUpload, uploading, onPreset }) {
  return (
    <div className="space-y-4">
      <section className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 text-white/90 mb-3">
          <UploadCloud size={18} className="text-purple-400" />
          <h3 className="font-semibold">Uploads</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <UploadTile label="Model Upload" icon={<ImagePlus size={18} />} onChange={(e)=>onUpload('model', e)} uploading={uploading==='model'} />
          <UploadTile label="Apparel Upload" icon={<Shirt size={18} />} onChange={(e)=>onUpload('apparel', e)} uploading={uploading==='apparel'} />
        </div>
        <p className="text-xs text-white/50 mt-2">Drag & drop, or select multiple images.</p>
      </section>

      <section className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 text-white/90 mb-3">
          <Wand2 size={18} className="text-purple-400" />
          <h3 className="font-semibold">AI Art Director</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2">
          {presets.map((p)=> (
            <button key={p.id} onClick={()=>onPreset(p)} className="group text-left p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/90 font-medium">{p.title}</div>
                  <div className="text-xs text-white/60">{p.description}</div>
                </div>
                <ChevronRight className="text-white/40 group-hover:text-purple-300" size={16} />
              </div>
              <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-white/60">
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">Light: {p.lighting}</span>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">BG: {p.background}</span>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">Pose: {p.pose}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function UploadTile({ label, icon, onChange, uploading }) {
  return (
    <label className="relative flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400/40 transition cursor-pointer">
      <input type="file" accept="image/*" multiple className="hidden" onChange={onChange} />
      <div className="w-8 h-8 rounded-md bg-purple-500/10 border border-purple-400/20 text-purple-300 grid place-items-center">
        {icon}
      </div>
      <div className="text-white/90 text-sm">{label}</div>
      <div className="ml-auto">
        {uploading ? <Loader2 className="animate-spin text-white/70" size={16} /> : <UploadCloud className="text-white/60" size={16} />}
      </div>
    </label>
  )
}

export function Preview({ status, images, aspect }) {
  return (
    <div className="relative h-[420px] md:h-[520px] rounded-2xl bg-gradient-to-b from-[#0b0d14] to-black border border-white/10 grid place-items-center overflow-hidden">
      {status === 'idle' && images.length === 0 && (
        <div className="text-center text-white/60">
          <Camera size={42} className="mx-auto mb-3 text-purple-400/70" />
          <div className="font-medium">Drop your vision here</div>
          <div className="text-xs">Preparing your vision…</div>
        </div>
      )}
      {status === 'generating' && (
        <div className="flex flex-col items-center text-white/80">
          <Loader2 className="animate-spin text-purple-300" size={28} />
          <div className="text-sm mt-3">Preparing your vision…</div>
        </div>
      )}
      {status === 'done' && images.length > 0 && (
        <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
          {images.map((img)=> (
            <img key={img.url} src={img.url} alt="gen" className="w-full h-full object-cover rounded-xl" />
          ))}
        </div>
      )}
    </div>
  )
}

export function RightPanel({ aspect, setAspect, count, setCount, packs, setPacks, onGenerate, generating }) {
  const aspectOpts = [
    { id:'portrait', label:'Portrait', icon:<RectangleVertical size={16} /> },
    { id:'square', label:'Square', icon:<Square size={16} /> },
    { id:'landscape', label:'Landscape', icon:<RectangleHorizontal size={16} /> },
    { id:'stories', label:'Stories', icon:<Instagram size={16} /> },
  ]
  const counts = [1,2,4,6,8]
  return (
    <div className="space-y-4">
      <section className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 text-white/90 mb-3">
          <Settings size={18} className="text-purple-400" />
          <h3 className="font-semibold">Output Options</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {aspectOpts.map(a => (
            <button key={a.id} onClick={()=>setAspect(a.id)} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs border ${aspect===a.id? 'bg-purple-500/20 border-purple-400/40 text-white' : 'border-white/10 text-white/70 hover:text-white hover:bg-white/5'}`}>
              {a.icon}
              {a.label}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <div className="text-xs text-white/60 mb-1">Number of Images</div>
          <div className="flex flex-wrap gap-1">
            {counts.map(c => (
              <button key={c} onClick={()=>setCount(c)} className={`px-2.5 py-1.5 rounded-md text-xs border ${count===c? 'bg-purple-500/20 border-purple-400/40 text-white' : 'border-white/10 text-white/70 hover:text-white hover:bg-white/5'}`}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-white/90">
          <Stars size={18} className="text-purple-400" />
          <h3 className="font-semibold">Optional Packs</h3>
        </div>
        <Toggle label="E-commerce Pack" checked={!!packs.ecom} onChange={(v)=>setPacks(p=>({...p, ecom:v}))} sub="8 standard product images" />
        <Toggle label="Social Media Pack" checked={!!packs.social} onChange={(v)=>setPacks(p=>({...p, social:v}))} sub="1:1 and 9:16 shots" />
        <Toggle label="Complete Asset Pack" checked={!!packs.complete} onChange={(v)=>setPacks(p=>({...p, complete:v}))} sub="Full ecom + social" />
        <Toggle label="Creative God Mode" checked={!!packs.god} onChange={(v)=>setPacks(p=>({...p, god:v}))} sub="8 creative images" />
      </section>

      <button onClick={onGenerate} disabled={generating} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-medium shadow-lg shadow-purple-500/20 disabled:opacity-60">
        {generating ? 'Generating…' : 'Generate'}
      </button>
    </div>
  )
}

function Toggle({ label, sub, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
      <input type="checkbox" checked={checked} onChange={(e)=>onChange(e.target.checked)} className="accent-purple-500" />
      <div className="flex-1">
        <div className="text-sm text-white/90 font-medium">{label}</div>
        <div className="text-xs text-white/60">{sub}</div>
      </div>
    </label>
  )
}
