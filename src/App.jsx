import { useState, useEffect, useRef, useCallback } from 'react'
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
    title: 'PLANTS VS ZOMBIES 3: EVOLVED',
    description: 'Wrote design documents for new and returning Plants from the PVZ Franchise\nDesigned 5+ new plants and merges of previously existing plants\nModernized older plants from previous installations\nDesigned and pitched engineering feature request for upcoming plant\nIterated and implemented feedback on plant balance\nPlayed and observed weekly playtests and logged bugs\nParticipated in art and animation meetings to provide feedback on new designs',
  },
  smoke: {
    title: 'SMOKE BREAK!',
    description: 'Worked with marketing director to create 50+ posts across multiple social media platforms, (Tiktok, Instagram, Twitter), leading to 25,000+ views and 1,000 total plays\nStoryboarded trailer and provided feedback during development\nCreated .carrd website and recorded/edited gifs to show gameplay features',
  },
  chud: {
    title: 'CHUD',
    description: 'Coming soon',
  },
  sale: {
    title: 'SALEBLAZERS\nMULTIPLAYER SHOPKEEPING GAME',
    description: 'Wrote, and implemented complex dialogue trees, scripted with Lua\nRedesigned existing areas and adjusted props to align with new story direction and game fantasy\nWrote and adjusted previous Unity editor tools to work with updated game systems\nImplemented and tested idle voice barks and NPC conversation voicelines\nDesigned and implemented unique Quest NPC and integrated with voice and dialogue to match story tone\nHelped other designer with miscellaneous tasks as needed:\nUpdating prefabs, creating new items\nAdding unique interaction text to create immersion\nCreated documentation for tasks created by new systems',
  },
  thena: {
    title: 'THENA, MANIFESTATION OF THE GRAIL',
    description: 'Designer, Artist - Fan champion based on Athene\'s Unholy Grail',
  },
  poc: {
    title: 'POC',
    description: 'Coming soon',
  },
}

function App() {
  const [page, setPage] = useState('start')
  const [pawOpen, setPawOpen] = useState(true)
  const [pawAnimate, setPawAnimate] = useState(false)
  const [uscHover, setUscHover] = useState(false)
  const [stat2Hover, setStat2Hover] = useState(false)
  const [stat4Hover, setStat4Hover] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)
  const [projectsHover, setProjectsHover] = useState(false)
  const [projectsScroll, setProjectsScroll] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [copiedShow, setCopiedShow] = useState(false)
  const [dragging, setDragging] = useState(false)
  const scrollTrackRef = useRef(null)
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
          <span className="text nav-resume" onClick={() => window.open('/Resume.pdf', '_blank')}>RESUME</span>

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
          <span className="text stat-label-4">SKILLS</span>
          <span className="text stat-value-4">GAME DESIGNER</span>
        </div>

        <img src="/queuepop.png" className="layer queue-pop" alt="" draggable={false} />
        <button
          className="accept-btn"
          onClick={() => {
            const audio = new Audio('/queuepop.mp4')
            audio.play()
            setTimeout(() => setPage('profile'), 500)
          }}
          aria-label="Accept"
        />
      </div>
    )
  }

  if (page === 'projects') {
    const maxScroll = selectedProject === 'sale' ? 2500 : selectedProject === 'smoke' ? 2500 : selectedProject === 'thena' ? 2800 : selectedProject ? 400 : 800
    const handleWheel = (e) => {
      setProjectsScroll((prev) => Math.min(maxScroll, Math.max(0, prev + e.deltaY)))
    }
    const scrollPercent = maxScroll > 0 ? projectsScroll / maxScroll : 0

    const handleScrollbarDrag = (e) => {
      if (!scrollTrackRef.current) return
      e.preventDefault()
      const updateScroll = (clientY) => {
        const rect = scrollTrackRef.current.getBoundingClientRect()
        const clickY = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height))
        setProjectsScroll(Math.round(clickY * maxScroll))
      }
      updateScroll(e.clientY)
      setDragging(true)
      const onMove = (ev) => { ev.preventDefault(); updateScroll(ev.clientY) }
      const onUp = () => { setDragging(false); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    }

    return (
      <div className={`page ${dragging ? 'no-select' : ''}`} style={{ '--page-scale': scale }} onWheel={handleWheel}>
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
              {selectedProject === 'sale' && (
                <div className="project-detail-links">
                  <a href="https://store.steampowered.com/app/1522820/Saleblazers/" target="_blank" rel="noopener noreferrer" className="project-link sale-link">Steam Link</a>
                </div>
              )}
              <p className="project-detail-desc">{projectData[selectedProject].description}</p>
              {selectedProject === 'thena' && (
                <div className="project-detail-links">
                  <a href="https://docs.google.com/document/d/18vUcQwLs3NbqY4v0i9Shs0ShFW2iDUrP5Vk6_hZonz8/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="project-link sale-link">Design Documents</a>
                </div>
              )}
              {selectedProject === 'smoke' && (
                <div className="project-detail-images">
                  <div className="project-detail-image-block">
                    <img src="/projectimages/smoke1.png" className="project-detail-img" alt="" draggable={false} />
                  </div>
                  <div className="project-detail-image-block">
                    <img src="/projectimages/smoke2.png" className="project-detail-img" alt="" draggable={false} />
                  </div>
                  <div className="project-detail-image-block">
                    <img src="/projectimages/smoke1.gif" className="project-detail-img" alt="" draggable={false} />
                  </div>
                  <div className="project-detail-image-block">
                    <img src="/projectimages/smoke2.gif" className="project-detail-img" alt="" draggable={false} />
                  </div>
                  <div className="project-detail-image-block">
                    <img src="/projectimages/smoke3.gif" className="project-detail-img" alt="" draggable={false} />
                  </div>
                </div>
              )}
              {selectedProject === 'thena' && (
                <div className="project-detail-images">
                  <div className="thena-ability-block">
                    <div className="thena-ability-row">
                      <img src="/projectimages/thena1.png" className="thena-ability-icon" alt="" draggable={false} />
                      <p className="thena-ability-text">Passive: The Unholy Grail{"\n"}Thena gains stacks of <span className="tc-red">Blood Charges</span> when she <span className="tc-blue">damages</span> an enemy champion. When she heals or shields an ally, all <span className="tc-red">Blood Charges</span> are consumed and <span className="tc-green">heal</span> an additional amount, unaffected by healing reduction. Additionally, if 3 or more <span className="tc-red">Blood Charges</span> are consumed at once, the ally gains <span className="tc-yellow">bonus movement speed</span>.{"\n\n"}While above 2 stacks of <span className="tc-red">Blood Charges</span>, Thena gains <span className="tc-yellow">bonus movement speed</span>.</p>
                    </div>
                    <img src="/projectimages/thena1.5.png" className="project-detail-img" alt="" draggable={false} />
                  </div>
                  <div className="thena-ability-block">
                    <div className="thena-ability-row">
                      <img src="/projectimages/thena2.png" className="thena-ability-icon" alt="" draggable={false} />
                      <p className="thena-ability-text">Q: Scarlet Pulse{"\n"}Thena channels briefly before sending out a pulse of energy that passes through all enemies it hits <span className="tc-blue">damaging</span> them. If the first enemy hit is a champion, Scarlet Pulse grants 2 stacks of <span className="tc-red">Blood Charges</span>, rather than 1.</p>
                    </div>
                    <img src="/projectimages/thena2.5.png" className="project-detail-img" alt="" draggable={false} />
                  </div>
                  <div className="thena-ability-block">
                    <div className="thena-ability-row">
                      <img src="/projectimages/thena3.png" className="thena-ability-icon" alt="" draggable={false} />
                      <p className="thena-ability-text">W: Bloodied Grasp{"\n"}Thena targets a location, spawning a hellzone that <span className="tc-blue">damages</span> enemies. Enemies caught in the center are briefly slowed, and grant 2 stacks of <span className="tc-red">Blood Charges</span>.</p>
                    </div>
                    <img src="/projectimages/thena3.5.png" className="project-detail-img" alt="" draggable={false} />
                  </div>
                  <div className="thena-ability-block">
                    <div className="thena-ability-row">
                      <img src="/projectimages/thena4.png" className="thena-ability-icon" alt="" draggable={false} />
                      <p className="thena-ability-text">E: Consecrated Protection{"\n"}Thena casts a shield on an ally, which instantly explodes, dealing <span className="tc-blue">magic damage</span> to nearby enemies, and gaining a <span className="tc-red">Blood Charge</span> for each enemy hit.</p>
                    </div>
                    <img src="/projectimages/thena4.5.png" className="project-detail-img" alt="" draggable={false} />
                  </div>
                  <div className="thena-ability-block">
                    <div className="thena-ability-row">
                      <img src="/projectimages/thena5.png" className="thena-ability-icon" alt="" draggable={false} />
                      <p className="thena-ability-text">R: Blessing of the Blood Goddess{"\n"}Thena places a mark on an ally, instantly <span className="tc-green">healing</span> them. The mark ticks every 0.5 seconds, <span className="tc-green">healing</span> the ally an additional amount. All of Thena's abilities grant double <span className="tc-red">Blood Charges</span> while the mark is still active.</p>
                    </div>
                    <img src="/projectimages/thena5.5.png" className="project-detail-img" alt="" draggable={false} />
                  </div>
                  <p className="thena-playstyle">{"Playstyle notes:\nAs most enchanters, Thena needs great positioning and spacing to get the most out of her abilities. She needs to weave in autos and abilities to gain Blood Charges, which grant her movespeed to better position in a fight. In the downtime between her E and ticks between her ult, she should be continuously trying to hit enemies to maximize the amount of healing she grants to her allies. She is designed solely to have synergy with Echoes of Helia, as she does not have teamwide buffs to benefit greatly from Shurelyas, nor enough crowd control to build Imperial Mandate. Moonstone can be an option to double her Blood Charge healing, though it may not be consistent enough to mandate this item.\nSome balance challenges may revolve around how often she can gain Blood Charges, especially during her ult. Because of its short duration between ticks, it may be difficult to get a lot of healing out of this ability. She can likely use one rotation of abilities as well as autos during the entire duration, but combined with the low base heal, especially at earlier levels, it may not feel rewarding enough."}</p>
                </div>
              )}
              {selectedProject === 'pvz' && (
                <p className="project-detail-note">Game is still in development</p>
              )}
              {selectedProject === 'sale' && (
                <div className="project-detail-images">
                  <div className="project-detail-image-block">
                    <img src="/projectimages/sale1.png" className="project-detail-img" alt="" draggable={false} />
                    <p className="project-detail-caption">Reworked village area to be more homely and include farms</p>
                  </div>
                  <div className="project-detail-image-block">
                    <img src="/projectimages/sale2.png" className="project-detail-img" alt="" draggable={false} />
                    <p className="project-detail-caption">Redesigned and setdressed enemy outposts to tell a story of gunpowder production</p>
                  </div>
                  <div className="project-detail-image-block">
                    <img src="/projectimages/sale3.png" className="project-detail-img" alt="" draggable={false} />
                    <p className="project-detail-caption">Sculpted and redesigned swamp area to be more clear for new players while retaining eery mood</p>
                  </div>
                </div>
              )}
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
        <span className="text projects-text nav-resume" onClick={() => window.open('/Resume.pdf', '_blank')}>RESUME</span>

        <span className="text projects-text top-name">Alicia Fu</span>
        <span className="text projects-text top-status" onClick={() => setStatusIndex((statusIndex + 1) % statusMessages.length)}><span className="status-dot" /><span className="status-text">{statusMessages[statusIndex]}</span></span>
        <span className="text projects-text top-fav-games">FAVORITE GAMES</span>

        <div className="topright-icon-btn" onClick={() => setPage('profile')} />

        <div className="scrollbar-track" ref={scrollTrackRef} onMouseDown={handleScrollbarDrag}>
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
      <img src="/hoverbg.png" className={`layer shift-stat4 ${stat4Hover ? '' : 'hover-hidden'}`} alt="" draggable={false} />
      <img src="/profileicons.png" className="layer" alt="" draggable={false} />
      <img src="/bigicon.png" className="layer" alt="" draggable={false} />

      <img src="/paw.png" className={`paw ${pawOpen ? 'paw-open' : ''} ${pawAnimate ? 'paw-animate' : ''}`} alt="" draggable={false} onClick={() => { setPawAnimate(true); setPawOpen(!pawOpen) }} onTransitionEnd={() => setPawAnimate(false)} />

      <img src="/popup.png" className={`layer popup-usc ${uscHover ? 'popup-usc-visible' : ''}`} alt="" draggable={false} />
      <img src="/popup.png" className={`layer popup-stat2 ${stat2Hover ? 'popup-stat2-visible' : ''}`} alt="" draggable={false} />
      <img src="/popup.png" className={`layer popup-stat4 ${stat4Hover ? 'popup-stat4-visible' : ''}`} alt="" draggable={false} />
      <div className="stat4-logo-box" onMouseEnter={() => setStat4Hover(true)} onMouseLeave={() => setStat4Hover(false)} />
      <span className={`text stat4-popup-text ${stat4Hover ? 'honors-visible' : ''}`}>{"Unity, Python, Lua\nTrello, Jira, Figma"}</span>

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
      <span className="text nav-resume" onClick={() => window.open('/Resume.pdf', '_blank')}>RESUME</span>

      {/* Top right name */}
      <span className="text top-name">Alicia Fu</span>
      <span className="text top-status" onClick={() => setStatusIndex((statusIndex + 1) % statusMessages.length)}><span className="status-dot" /><span className="status-text">{statusMessages[statusIndex]}</span></span>
      <button className="about-me-btn" onClick={() => setAboutOpen(true)}>ABOUT ME</button>
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
      <span className="text stat-label-4">SKILLS</span>
      <span className="text stat-value-4">GAME DESIGNER</span>

      <div className="topright-icon-btn" />

      {aboutOpen && (
        <>
          <div className="about-overlay" onClick={() => setAboutOpen(false)} />
          <div className="about-box">
            <button className="about-close" onClick={() => setAboutOpen(false)}>&times;</button>
            <h2 className="about-title">About Me</h2>
            <p className="about-text">{"Hi! I'm Alicia or Han, a Game Designer located in southern California. I graduated from the University of Southern California in December 2025 with a BFA in Interactive Media and Game Design. I've been making games for 7 years, and I enjoy character, mechanics, and narrative design!\n\nMy most played game of all time is League of Legends, and in my free time I enjoy drawing, video editing, playing with my cat, and cheering on Caps in LEC!\n\nContact me:\n"}<span className="about-email" onClick={() => { navigator.clipboard.writeText('hanxfu@gmail.com'); setCopiedShow(true); setTimeout(() => setCopiedShow(false), 1500) }}>hanxfu@gmail.com</span>{copiedShow && <span className="copied-popup">Copied to clipboard!</span>}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default App
