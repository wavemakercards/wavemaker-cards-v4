import { ref, onMounted } from 'vue'

export function usePWA() {
  const needRefresh = ref(false)
  const offlineReady = ref(false)
  const canInstall = ref(false)
  const installPrompt = ref(null)

  let updateSW = null

  // Handle PWA install prompt
  const handleBeforeInstallPrompt = (e) => {
    e.preventDefault()
    installPrompt.value = e
    canInstall.value = true
  }

  // Install PWA
  const installPWA = async () => {
    if (!installPrompt.value) return

    const result = await installPrompt.value.prompt()
    console.log('Install prompt result:', result)
    
    installPrompt.value = null
    canInstall.value = false
  }

  // Handle app installed
  const handleAppInstalled = () => {
    installPrompt.value = null
    canInstall.value = false
    console.log('PWA was installed')
  }

  // Update service worker
  const updateApp = async () => {
    if (updateSW) {
      await updateSW(true)
    }
  }

  // Close update prompt
  const closeUpdatePrompt = () => {
    needRefresh.value = false
  }

  onMounted(() => {
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Register service worker update handling
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // Listen for service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New update available
                needRefresh.value = true
              }
            })
          }
        })
      })

      // Handle service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATED') {
          needRefresh.value = true
        }
      })
    }

    // Check if app is standalone (installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      canInstall.value = false
    }
  })

  // Initialize Vite PWA plugin integration
  const initVitePWA = () => {
    // Wait for the PWA registration to be available
    const checkPWARegistration = () => {
      if (typeof window !== 'undefined' && window.__vite_plugin_pwa_sw_register__) {
        updateSW = window.__vite_plugin_pwa_sw_register__(true, {
          onNeedRefresh() {
            needRefresh.value = true
          },
          onOfflineReady() {
            offlineReady.value = true
          },
          onRegisterError(error) {
            console.error('SW registration error:', error)
          }
        })
      } else {
        // Retry after a short delay if not available yet
        setTimeout(checkPWARegistration, 100)
      }
    }
    checkPWARegistration()
  }

  return {
    needRefresh,
    offlineReady,
    canInstall,
    installPWA,
    updateApp,
    closeUpdatePrompt,
    initVitePWA
  }
}