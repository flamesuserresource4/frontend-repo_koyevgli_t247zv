import { useEffect, useMemo, useState } from 'react'
import { LeftPanel, Preview, RightPanel, TopNav } from './components/Ui'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function App(){
  const [activeTab, setActiveTab] = useState('Apparel')
  const [presets, setPresets] = useState([])
  const [status, setStatus] = useState('idle') // idle | generating | done
  const [images, setImages] = useState([])
  const [aspect, setAspect] = useState('square')
  const [count, setCount] = useState(4)
  const [packs, setPacks] = useState({})
  const [uploading, setUploading] = useState(null)
  const [appliedPreset, setAppliedPreset] = useState(null)
  const [jobId, setJobId] = useState(null)

  useEffect(()=>{
    fetch(`${API}/api/presets`).then(r=>r.json()).then(setPresets).catch(()=>{})
  },[])

  const onUpload = async(kind, e)=>{
    const files = [...(e.target.files||[])]
    if(files.length===0) return
    setUploading(kind)
    const form = new FormData()
    form.append('kind', kind)
    files.forEach(f=> form.append('files', f))
    try{
      const res = await fetch(`${API}/api/upload`, { method:'POST', body: form })
      const data = await res.json()
      // We could store uploaded refs if needed
    }finally{
      setUploading(null)
    }
  }

  const onPreset = (p)=>{
    setAppliedPreset(p)
  }

  const onGenerate = async()=>{
    setStatus('generating')
    setImages([])
    setJobId(null)
    const body = {
      aspect_ratio: aspect,
      num_images: count,
      packs,
      preset_id: appliedPreset?.id || null,
    }
    const res = await fetch(`${API}/api/generate`, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(body) })
    const data = await res.json()
    const id = data.job_id
    setJobId(id)
    // Poll until done
    const poll = async()=>{
      const s = await fetch(`${API}/api/jobs/${id}`).then(r=>r.json())
      if(s.status==='completed'){
        setImages(s.assets)
        setStatus('done')
      }else if(s.status==='failed'){
        setStatus('idle')
      }else{
        setTimeout(poll, 700)
      }
    }
    setTimeout(poll, 700)
  }

  return (
    <div className="min-h-screen bg-[#0a0b12]">
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 pb-16 pt-[360px] grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <LeftPanel presets={presets} onUpload={onUpload} uploading={uploading} onPreset={onPreset} />
        </div>
        <div className="lg:col-span-6">
          <Preview status={status} images={images} aspect={aspect} />
          {jobId && status==='done' && (
            <div className="mt-3 flex gap-2">
              <a href={`${API}/api/jobs/${jobId}/zip`} className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-white/90 text-sm">Download ZIP</a>
            </div>
          )}
        </div>
        <div className="lg:col-span-3">
          <RightPanel aspect={aspect} setAspect={setAspect} count={count} setCount={setCount} packs={packs} setPacks={setPacks} onGenerate={onGenerate} generating={status==='generating'} />
        </div>
      </main>
    </div>
  )
}
