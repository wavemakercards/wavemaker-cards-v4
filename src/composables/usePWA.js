import { ref, onMounted } from 'vue'

export function usePWA() {
  const needRefresh = ref(false)
  const offlineReady = ref(false)
  const canInstall = ref(false)
  const installPrompt = ref(null)

  let updateSW = null

  // Session storage keys for tracking shown prompts
  const SESSION_KEYS = {
    INSTALL_PROMPT_SHOWN: 'pwa_install_prompt_shown',
    UPDATE_PROMPT_SHOWN: 'pwa_update_prompt_shown',
    OFFLINE_PROMPT_SHOWN: 'pwa_offline_prompt_shown'
  }

  // Check if a prompt has been shown this session
  const hasPromptBeenShown = (key) => {
    return sessionStorage.getItem(key) === 'true'
  }

  // Mark a prompt as shown for this session
  const markPromptAsShown = (key) => {
    sessionStorage.setItem(key, 'true')
  }

  // Handle PWA install prompt
  const handleBeforeInstallPrompt = (e) => {
    e.preventDefault()
    installPrompt.value = e
    
    // Only show install prompt if not shown this session
    if (!hasPromptBeenShown(SESSION_KEYS.INSTALL_PROMPT_SHOWN)) {
      canInstall.value = true
    }
  }

  // Install PWA
  const installPWA = async () => {
    if (!installPrompt.value) return

    const result = await installPrompt.value.prompt()
    console.log('Install prompt result:', result)
    
    installPrompt.value = null
    canInstall.value = false
    markPromptAsShown(SESSION_KEYS.INSTALL_PROMPT_SHOWN)
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
    markPromptAsShown(SESSION_KEYS.UPDATE_PROMPT_SHOWN)
  }

  // Close install prompt
  const closeInstallPrompt = () => {
    canInstall.value = false
    markPromptAsShown(SESSION_KEYS.INSTALL_PROMPT_SHOWN)
  }

  // Close offline ready prompt
  const closeOfflinePrompt = () => {
    offlineReady.value = false
    markPromptAsShown(SESSION_KEYS.OFFLINE_PROMPT_SHOWN)
  }

  // Force update - clear all caches and reload
  const forceUpdate = async (options = {}) => {
    const {
      clearLocalStorage = false,
      clearSessionStorage = true,
      clearIndexedDB = false,
      clearCaches = true
    } = options

    try {
      console.log('Starting force update with options:', options)
      
      // Clear service worker caches
      if (clearCaches && 'caches' in window) {
        const cacheNames = await caches.keys()
        console.log('Clearing caches:', cacheNames)
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        )
      }

      // Unregister all service workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        console.log('Unregistering service workers:', registrations.length)
        await Promise.all(
          registrations.map(registration => registration.unregister())
        )
      }

      // Clear storage selectively
      if (clearLocalStorage) {
        localStorage.clear()
        console.log('LocalStorage cleared')
      }
      
      if (clearSessionStorage) {
        sessionStorage.clear()
        console.log('SessionStorage cleared')
      }
      
      // Clear IndexedDB if requested (careful - this contains user data!)
      if (clearIndexedDB && 'indexedDB' in window) {
        console.log('IndexedDB clearing requested (implement if needed)')
        // Implement selective IndexedDB clearing if needed
      }

      console.log('Force update complete, reloading...')
      
      // Force reload from server (bypass cache)
      if (window.location.reload) {
        window.location.reload(true)
      } else {
        // Fallback for browsers that don't support the reload parameter
        window.location.href = window.location.href + '?t=' + Date.now()
      }
      
    } catch (error) {
      console.error('Error during force update:', error)
      // Fallback: just reload the page
      window.location.reload(true)
    }
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
                // New update available - only show if not shown this session
                if (!hasPromptBeenShown(SESSION_KEYS.UPDATE_PROMPT_SHOWN)) {
                  needRefresh.value = true
                }
              }
            })
          }
        })
      })

      // Handle service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATED') {
          // Only show update prompt if not shown this session
          if (!hasPromptBeenShown(SESSION_KEYS.UPDATE_PROMPT_SHOWN)) {
            needRefresh.value = true
          }
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
            // Only show update prompt if not shown this session
            if (!hasPromptBeenShown(SESSION_KEYS.UPDATE_PROMPT_SHOWN)) {
              needRefresh.value = true
            }
          },
          onOfflineReady() {
            // Only show offline ready prompt if not shown this session
            if (!hasPromptBeenShown(SESSION_KEYS.OFFLINE_PROMPT_SHOWN)) {
              offlineReady.value = true
            }
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
    closeInstallPrompt,
    closeOfflinePrompt,
    forceUpdate,
    initVitePWA
  }
}