import { useState, useEffect } from 'react'
import './App.css'

function useScale() {
  const [scale, setScale] = useState(Math.min(window.innerWidth / 1920, window.innerHeight / 1080))

  useEffect(() => {
    const update = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080))
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return scale
}

const projectData = {
  pvz: {
    title: 'PLANTS VS ZOMBIES',
    description: 'Wrote design documents for new and returning Plants from the PVZ Franchise\nDesigned 5+ new plants and merges of previously existing plants\nModernized older plants from previous installations\nDesigned and pitched engineering feature request for upcoming plant\nIterated and implemented feedback on plant balance\nPlayed and observed weekly playtests and logged bugs\nParticipated in art and animation meetings to provide feedback on new designs',
  },
  smoke: {
    title: 'SMOKE',
    description: 'Worked with marketing director to create 50+ posts across multiple social media platforms, (Tiktok, Instagram, Twitter), leading to 25,000+ views and 1,000 total plays\nStoryboarded trailer and provided feedback during development\nCreated .carrd website and recorded/edited gifs to show gameplay features',
  },
  chud: {
    title: 'CHUD',
    description: 'Your description here. Edit this text in App.jsx to describe your Chud project.',
  },
  sale: {
    title: 'SALE',
    description: 'Wrote, and implemented complex dialogue trees, scripted with Lua\nRedesigned existing areas and adjusted props to align with new story direction and game fantasy\nWrote and adjusted previous Unity editor tools to work with updated game systems\nImplemented and tested idle voice barks and NPC conversation voicelines\nDesigned and implemented unique Quest NPC and integrated with voice and dialogue to match story tone\nHelped other designer with miscellaneous tasks as needed:\nUpdating prefabs, creating new items\nAdding unique interaction text to create immersion\nCreated documentation for tasks created by new systems',
  },
  thena: {
    title: 'THENA',
    description: 'Your description here. Edit this text in App.jsx to describe your Thena project.',
  },
  poc: {
    title: 'POC',
    description: 'Your description here. Edit this text in App.jsx to describe your POC project.',
  },
}

function App() {
  const [page, setPage] = useState('start')
  const [pawOpen, setPawOpen] = useState(false)
  const [pawAnimate, setPawAnimate] = useState(false)
  const [uscHover, setUscHover] = useState(false)
  const [stat2Hover, setStat2Hover] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)
  const [projectsHover, setProjectsHover] = useState(false)
  const [projectsScroll, setProjectsScroll] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const scale = useScale()

  const statusMessages = [
    'open to work!',
    'looking for job!',
    'hire me pleaaaaase',
    'i wanna play aram',
  ]

  if (page === 'start') {
    return (
      <div className="page" style={{ '--page-scale': scale }}>
        <div className="start-blur">
          <img src="/splash.png" className="layer fill-layer" alt="" draggable={false} />
          <img src="/blackedge.png" className="layer fill-layer blackedge" alt="" draggable={false} />
          <img src="/banner.png" className="layer" alt="" draggable={false} />
          <img src="/base.png" className="layer base-layer" alt="" draggable={false} />
          <img src="/games.png" className="layer shift-right" alt="" draggable={false} />
          <img src="/gamescover.png" className="layer shift-right" alt="" draggable={false} />
          <img src="/play.png" className="layer" alt="" draggable={false} />
          <img src="/toprighticon.png" className="layer shift-topright" alt="" draggable={false} />
          <img src="/socials.png" className="layer" alt="" draggable={false} />
          <img src="/resume.png" className="layer" alt="" draggable={false} />
          <img src="/profileicons.png" className="layer" alt="" draggable={false} />
          <img src="/bigicon.png" className="layer" alt="" draggable={false} />
          <img src="/paw.png" className="paw" alt="" draggable={false} />

          <span className="text nav-play">PLAY</span>
          <span className="text nav-projects">PROJECTS</span>
          <span className="text nav-art">ART</span>
          <span className="text nav-resume">RESUME</span>

          <span className="text top-name">Alicia Fu</span>
          <span className="text top-status"><span className="status-dot" /><span className="status-text">open to work!</span></span>
          <span className="text top-fav-games">FAVORITE GAMES</span>

          <span className="text card-name">Alicia Fu</span>
          <span className="text card-title">Game Designer</span>

          <span className="text stat-label-1">ALMA MATER</span>
          <span className="text stat-value-1">USC BFA Game Design</span>
          <span className="text stat-label-2">HONOR</span>
          <span className="text stat-value-2">LEVEL 5</span>
          <span className="text stat-label-3">FAVORITE CHAMP</span>
          <span className="text stat-value-3">SIVIR</span>
          <span className="text stat-label-4">LOCATION</span>
          <span className="text stat-value-4">LOS ANGELES, CA</span>
        </div>

        <img src="/queuepop.png" className="layer queue-pop" alt="" draggable={false} />
        <button
          className="accept-btn"
          onClick={() => setPage('profile')}
          aria-label="Accept"
        />
      </div>
    )
  }

  if (page === 'projects') {
    const maxScroll = selectedProject ? 400 : 800
    const handleWheel = (e) => {
      setProjectsScroll((prev) => Math.min(maxScroll, Math.max(0, prev + e.deltaY)))
    }
    const scrollPercent = maxScroll > 0 ? projectsScroll / maxScroll : 0

    return (
      <div className="page" style={{ '--page-scale': scale }} onWheel={handleWheel}>
        <img src="/scrollbg.png" className="layer fill-layer scrollbg" alt="" draggable={false} />
        <div className="projects-scrollable" style={{ transform: `translateY(-${projectsScroll}px)` }}>
          <img src="/projectbg.png" className="layer fill-layer" alt="" draggable={false} />

          {!selectedProject && (
            <>
              <span className="text projects-heading">GAME PROJECTS</span>

              <div className="project-card project-card-1" onClick={() => { setSelectedProject('thena'); setProjectsScroll(0) }}>
                <img src="/thena.png" className="project-card-img" alt="" draggable={false} />
                <img src="/thenahover.png" className="project-card-hover" alt="" draggable={false} />
              </div>
              <div className="project-card project-card-2" onClick={() => { setSelectedProject('sale'); setProjectsScroll(0) }}>
                <img src="/sale.png" className="project-card-img" alt="" draggable={false} />
                <img src="/salehover.png" className="project-card-hover" alt="" draggable={false} />
              </div>
              <div className="project-card project-card-3" onClick={() => { setSelectedProject('pvz'); setProjectsScroll(0) }}>
                <img src="/pvz.png" className="project-card-img" alt="" draggable={false} />
                <img src="/pvzhover.png" className="project-card-hover" alt="" draggable={false} />
              </div>
              <div className="project-card project-card-4" onClick={() => { setSelectedProject('smoke'); setProjectsScroll(0) }}>
                <img src="/smoke.png" className="project-card-img" alt="" draggable={false} />
                <img src="/smokehover.png" className="project-card-hover" alt="" draggable={false} />
              </div>
              <div className="project-card project-card-5" onClick={() => { setSelectedProject('chud'); setProjectsScroll(0) }}>
                <img src="/chud.png" className="project-card-img" alt="" draggable={false} />
                <img src="/chudhover.png" className="project-card-hover" alt="" draggable={false} />
              </div>
              <div className="project-card project-card-6" onClick={() => { setSelectedProject('poc'); setProjectsScroll(0) }}>
                <img src="/poc.png" className="project-card-img" alt="" draggable={false} />
                <img src="/pochover.png" className="project-card-hover" alt="" draggable={false} />
              </div>
            </>
          )}

          {selectedProject && (
            <div className="project-detail">
              <button className="back-btn" onClick={() => { setSelectedProject(null); setProjectsScroll(0) }}>
                <span className="back-arrow">&#9664;</span> BACK
              </button>
              <h1 className="project-detail-title">{projectData[selectedProject].title}</h1>
              {selectedProject === 'smoke' && (
                <div className="project-detail-links">
                  <a href="https://smokebreakgame.carrd.co/" target="_blank" rel="noopener noreferrer" className="project-link">Website</a>
                  <a href="https://store.steampowered.com/app/3564090/Smoke_Break/" target="_blank" rel="noopener noreferrer" className="project-link">Steam</a>
                </div>
              )}
              <p className="project-detail-desc">{projectData[selectedProject].description}</p>
            </div>
          )}
        </div>

        <img src="/base.png" className="layer base-layer projects-fixed" alt="" draggable={false} />
        <img src="/games.png" className="layer shift-right projects-fixed" alt="" draggable={false} />
        {!pawOpen && <img src="/gamescover.png" className="layer shift-right projects-fixed" alt="" draggable={false} />}
        <img src="/play.png" className="layer projects-fixed" alt="" draggable={false} />
        <img src="/toprighticon.png" className="layer shift-topright projects-fixed" alt="" draggable={false} />
        <img src="/socials.png" className="layer projects-fixed" alt="" draggable={false} />
        <img src="/resume.png" className="layer projects-fixed" alt="" draggable={false} />

        <a href="https://www.behance.net/xayah" target="_blank" rel="noopener noreferrer" className="behance-btn" />
        <a href="https://www.youtube.com/@04han" target="_blank" rel="noopener noreferrer" className="youtube-btn" />
        <a href="https://www.linkedin.com/in/hannfu/" target="_blank" rel="noopener noreferrer" className="linkedin-btn" />

        <img src="/paw.png" className={`paw ${pawOpen ? 'paw-open' : ''} ${pawAnimate ? 'paw-animate' : ''}`} alt="" draggable={false} onClick={() => { setPawAnimate(true); setPawOpen(!pawOpen) }} onTransitionEnd={() => setPawAnimate(false)} />

        {/* ── Text layers ── */}
        <img src="/projects hover.png" className="layer projectshover projectshover-active" alt="" draggable={false} />
        <span className="text projects-text nav-play" onClick={() => setPage('profile')}>PLAY</span>
        <span className="text projects-text nav-projects" onClick={() => { setSelectedProject(null); setProjectsScroll(0) }}>PROJECTS</span>
        <span className="text projects-text nav-art">ART</span>
        <span className="text projects-text nav-resume">RESUME</span>

        <span className="text projects-text top-name">Alicia Fu</span>
        <span className="text projects-text top-status" onClick={() => setStatusIndex((statusIndex + 1) % statusMessages.length)}><span className="status-dot" /><span className="status-text">{statusMessages[statusIndex]}</span></span>
        <span className="text projects-text top-fav-games">FAVORITE GAMES</span>

        <div className="topright-icon-btn" onClick={() => setPage('profile')} />

        <div className="scrollbar-track">
          <div className="scrollbar-thumb" style={{ top: `${scrollPercent * (100 - 20)}%` }} />
        </div>
      </div>
    )
  }

  return (
    <div className="page" style={{ '--page-scale': scale }}>
      <img src="/splash.png" className="layer fill-layer" alt="" draggable={false} />
      <img src="/blackedge.png" className="layer fill-layer blackedge" alt="" draggable={false} />
      <img src="/banner.png" className="layer" alt="" draggable={false} />
      <img src="/base.png" className="layer base-layer" alt="" draggable={false} />
      <img src="/games.png" className="layer shift-right" alt="" draggable={false} />
      {!pawOpen && <img src="/gamescover.png" className="layer shift-right" alt="" draggable={false} />}
      <img src="/play.png" className="layer" alt="" draggable={false} />
      <img src="/toprighticon.png" className="layer shift-topright" alt="" draggable={false} />
      <img src="/socials.png" className="layer" alt="" draggable={false} />
      <img src="/resume.png" className="layer" alt="" draggable={false} />
      <img src="/hoverbg.png" className={`layer ${uscHover ? '' : 'hover-hidden'}`} alt="" draggable={false} />
      <img src="/hoverbg.png" className={`layer shift-stat2 ${stat2Hover ? '' : 'hover-hidden'}`} alt="" draggable={false} />
      <img src="/profileicons.png" className="layer" alt="" draggable={false} />
      <img src="/bigicon.png" className="layer" alt="" draggable={false} />

      <img src="/paw.png" className={`paw ${pawOpen ? 'paw-open' : ''} ${pawAnimate ? 'paw-animate' : ''}`} alt="" draggable={false} onClick={() => { setPawAnimate(true); setPawOpen(!pawOpen) }} onTransitionEnd={() => setPawAnimate(false)} />

      <img src="/popup.png" className={`layer popup-usc ${uscHover ? 'popup-usc-visible' : ''}`} alt="" draggable={false} />
      <img src="/popup.png" className={`layer popup-stat2 ${stat2Hover ? 'popup-stat2-visible' : ''}`} alt="" draggable={false} />

      <a href="https://www.behance.net/xayah" target="_blank" rel="noopener noreferrer" className="behance-btn" />
      <a href="https://www.youtube.com/@04han" target="_blank" rel="noopener noreferrer" className="youtube-btn" />
      <a href="https://www.linkedin.com/in/hannfu/" target="_blank" rel="noopener noreferrer" className="linkedin-btn" />

      {/* Guide image - remove later */}
      <img src="/profile.png" className="layer guide" alt="" draggable={false} />

      {/* ── Text layers ── */}

      {/* Top nav */}
      <img src="/projects hover.png" className={`layer projectshover ${projectsHover ? 'projectshover-visible' : ''}`} alt="" draggable={false} />
      <span className="text nav-play">PLAY</span>
      <span className="text nav-projects" onClick={() => { setProjectsHover(false); setSelectedProject(null); setProjectsScroll(0); setPage('projects') }} onMouseEnter={() => setProjectsHover(true)} onMouseLeave={() => setProjectsHover(false)}>PROJECTS</span>
      <span className="text nav-art">ART</span>
      <span className="text nav-resume">RESUME</span>

      {/* Top right name */}
      <span className="text top-name">Alicia Fu</span>
      <span className="text top-status" onClick={() => setStatusIndex((statusIndex + 1) % statusMessages.length)}><span className="status-dot" /><span className="status-text">{statusMessages[statusIndex]}</span></span>
      <span className="text top-fav-games">FAVORITE GAMES</span>

      {/* Left card */}
      <span className="text card-name">Alicia Fu</span>
      <span className="text card-title">Game Designer</span>

      <div className="usc-logo-box" onMouseEnter={() => setUscHover(true)} onMouseLeave={() => setUscHover(false)} />

      {/* Honors */}
      <span className={`text honors-title ${uscHover ? 'honors-visible' : ''}`}>Summa Cum Laude</span>
      <span className={`text honors-gpa ${uscHover ? 'honors-visible' : ''}`}>Major GPA: 4.0</span>

      <div className="stat2-logo-box" onMouseEnter={() => setStat2Hover(true)} onMouseLeave={() => setStat2Hover(false)} />

      <span className={`text honors-title stat2-title ${stat2Hover ? 'honors-visible' : ''}`}>Very Honorable</span>
      <span className={`text honors-gpa stat2-gpa ${stat2Hover ? 'honors-visible' : ''}`}>Since 2018 :D</span>

      {/* Bottom stats labels */}
      <span className="text stat-label-1">ALMA MATER</span>
      <span className="text stat-value-1">USC BFA Game Design</span>
      <span className="text stat-label-2">HONOR</span>
      <span className="text stat-value-2">LEVEL 5</span>
      <span className="text stat-label-3">FAVORITE CHAMP</span>
      <span className="text stat-value-3">SIVIR</span>
      <span className="text stat-label-4">LOCATION</span>
      <span className="text stat-value-4">LOS ANGELES, CA</span>

      <div className="topright-icon-btn" />
    </div>
  )
}

export default App
