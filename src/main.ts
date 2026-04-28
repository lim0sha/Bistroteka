import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu()
  initSmoothScroll()
  initScrollAnimations()
  initMenuModal()
  initHeaderScroll()
})

function initMobileMenu(): void {
  const btn = document.getElementById('mobile-menu-btn')
  const menu = document.getElementById('mobile-menu')
  const links = menu?.querySelectorAll('.mobile-link')

  btn?.addEventListener('click', () => {
    menu?.classList.toggle('hidden')
  })

  links?.forEach(link => {
    link.addEventListener('click', () => {
      menu?.classList.add('hidden')
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
    food: { title: 'Меню блюд', pdf: 'src/assets/files/menus/bistroteka_food_menu_2026.pdf' },
    cocktails: { title: 'Коктейли', pdf: 'src/assets/files/menus/bistroteka_cocktail_menu_2026.pdf' },
    alcohol: { title: 'Алкоголь', pdf: 'src/assets/files/menus/bistroteka_alcohol_menu_2026.pdf' }
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
