import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu()
  initSmoothScroll()
  initScrollAnimations()
  initMenuModal()
  initHeaderScroll()
  initMerchFlip()
  initCocktailCarousels()

  // Hide loader when everything is loaded
  const loader = document.getElementById('page-loader')
  if (loader) {
    loader.classList.add('fade-out')
    setTimeout(() => {
      loader.style.display = 'none'
    }, 500)
  }
})

function initMerchFlip(): void {
  const cards = document.querySelectorAll('.merch-card')
  cards.forEach(c => {
    const card = c as HTMLElement
    card.setAttribute('tabindex', '0')
    card.setAttribute('role', 'button')
    card.addEventListener('click', () => {
      card.classList.toggle('flipped')
    })
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        card.classList.toggle('flipped')
      }
    })
  })
}

function initMobileMenu(): void {
  const btn = document.getElementById('mobile-menu-btn')
  const menu = document.getElementById('mobile-menu')
  const links = menu?.querySelectorAll('.mobile-link')

  btn?.addEventListener('click', () => {
    const isOpen = menu?.classList.contains('opacity-100')
    if (isOpen) {
      menu?.classList.remove('opacity-100', 'pointer-events-auto')
      menu?.classList.add('pointer-events-none')
    } else {
      menu?.classList.add('opacity-100', 'pointer-events-auto')
      menu?.classList.remove('pointer-events-none')
    }
  })

  links?.forEach(link => {
    link.addEventListener('click', () => {
      menu?.classList.remove('opacity-100', 'pointer-events-auto')
      menu?.classList.add('pointer-events-none')
    })
  })
}

function initSmoothScroll(): void {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault()
      const href = anchor.getAttribute('href')
      if (!href) return
      
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })
}

function initScrollAnimations(): void {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll('.reveal-hidden').forEach(el => {
    el.classList.add('reveal-base')
    observer.observe(el)
  })
}

function initMenuModal(): void {
  const modal = document.getElementById('menu-modal')
  const overlay = document.getElementById('modal-overlay')
  const closeBtn = document.getElementById('modal-close')
  const menuBtns = document.querySelectorAll('.menu-btn')
  const modalTitle = document.getElementById('modal-title')
  const menuPdf = document.getElementById('menu-pdf') as HTMLIFrameElement
  const menuDownload = document.getElementById('menu-download') as HTMLAnchorElement

  const menuConfig: Record<string, { title: string; pdf: string }> = {
    food: { title: 'Меню блюд', pdf: './files/menus/bistroteka_food_menu_2026.pdf#view=FitH' },
    cocktails: { title: 'Коктейли', pdf: './files/menus/bistroteka_cocktail_menu_2026.pdf#view=FitH' },
    alcohol: { title: 'Алкоголь', pdf: './files/menus/bistroteka_alcohol_menu_2026.pdf#view=FitH' }
  }

  menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const menuType = btn.getAttribute('data-menu')
      if (menuType && modalTitle && menuPdf && menuDownload) {
        const config = menuConfig[menuType]
        modalTitle.textContent = config.title
        menuPdf.src = config.pdf
        menuDownload.href = config.pdf
      }
      modal?.classList.remove('hidden')
    })
  })

  const closeModal = () => {
    modal?.classList.add('hidden')
    if (menuPdf) menuPdf.src = ''
  }

  overlay?.addEventListener('click', closeModal)
  closeBtn?.addEventListener('click', closeModal)

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal()
  })
}

function initHeaderScroll(): void {
  const header = document.getElementById('header')

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY

    if (header) {
      if (currentScroll > 100) {
        header.classList.add('bg-bistro-bg')
        header.classList.remove('bg-bistro-bg/80')
      } else {
        header.classList.remove('bg-bistro-bg')
        header.classList.add('bg-bistro-bg/80')
      }
    }
  })
}

function initCocktailCarousels(): void {
  const ids = ['cocktail-carousel-1', 'cocktail-carousel-2']
  const directions = [1, -1]

  ids.forEach((id, i) => {
    const el = document.getElementById(id)
    if (!el) return

    const children = Array.from(el.children)
    if (children.length === 0) return

    const track = document.createElement('div')
    track.className = 'flex gap-4'
    track.style.willChange = 'transform'
    track.style.userSelect = 'none'

    const itemGap = 16
    const dims = { step: 0, total: 0, maxPos: 0 }
    const updateDims = () => {
      const w = children[0].getBoundingClientRect().width
      dims.step = w + itemGap
      dims.total = dims.step * children.length
      dims.maxPos = dims.total * 2
    }
    updateDims()

    children.forEach(child => track.appendChild(child))
    children.forEach(child => track.appendChild(child.cloneNode(true)))

    el.textContent = ''
    el.appendChild(track)
    el.style.overflow = 'hidden'
    el.style.touchAction = 'pan-y'

    const dir = directions[i]
    const speed = 0.4
    let isPaused = false
    let pauseTimeout: number | null = null
    let pos = dir === -1 ? dims.total : 0
    let isDragging = false
    let dragStartX = 0
    let dragStartPos = 0

    track.style.transform = `translateX(${-pos}px)`

    const pause = () => {
      isPaused = true
      if (pauseTimeout !== null) {
        clearTimeout(pauseTimeout)
        pauseTimeout = null
      }
    }

    const resume = () => {
      pauseTimeout = window.setTimeout(() => {
        isPaused = false
        pauseTimeout = null
      }, 300)
    }

    const onDragStart = (clientX: number) => {
      pause()
      isDragging = true
      dragStartX = clientX
      dragStartPos = pos
    }

    const onDragMove = (clientX: number) => {
      if (!isDragging) return
      pos = Math.max(0, Math.min(dims.maxPos, dragStartPos + (dragStartX - clientX)))
      track.style.transform = `translateX(${-pos}px)`
    }

    const onDragEnd = () => {
      if (!isDragging) return
      isDragging = false
      if (pos > dims.total) {
        pos -= dims.total
      } else if (pos < 0) {
        pos = 0
      }
      track.style.transform = `translateX(${-pos}px)`
      resume()
    }

    el.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true })
    el.addEventListener('touchmove', e => onDragMove(e.touches[0].clientX), { passive: true })
    el.addEventListener('touchend', onDragEnd, { passive: true })
    el.addEventListener('touchcancel', onDragEnd, { passive: true })

    el.addEventListener('mousedown', e => onDragStart(e.clientX))
    el.addEventListener('mousemove', e => { if (isDragging) e.preventDefault(); onDragMove(e.clientX) })
    el.addEventListener('mouseup', onDragEnd)
    el.addEventListener('mouseleave', onDragEnd)

    let resizeTimer: number | null = null
    window.addEventListener('resize', () => {
      if (resizeTimer) cancelAnimationFrame(resizeTimer)
      resizeTimer = requestAnimationFrame(() => {
        updateDims()
        if (pos > dims.total) pos = dims.total
        track.style.transform = `translateX(${-pos}px)`
      })
    })

    function tick() {
      if (!isPaused && !isDragging) {
        pos += speed * dir
        if (dir === 1 && pos >= dims.total) {
          pos = 0
        } else if (dir === -1 && pos <= 0) {
          pos = dims.total
        }
        track.style.transform = `translateX(${-pos}px)`
      }
      requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  })
}
