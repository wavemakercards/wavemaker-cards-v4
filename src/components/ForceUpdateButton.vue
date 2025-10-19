<template>
  <button 
    @click="handleForceUpdate" 
    :disabled="isUpdating"
    class="interfaceBtn fullw text-left"
    :title="tooltip"
  >
    <div  :class="{ 'spinning': isUpdating }">
      <svg v-if="!isUpdating" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
      </svg>
      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
      </svg>
    </div>
    <span v-if="showText">{{ buttonText }}</span>
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePWA } from '@/composables/usePWA.js'

const props = defineProps({
  showText: {
    type: Boolean,
    default: true
  },
  buttonClass: {
    type: String,
    default: ''
  },
  confirmMessage: {
    type: String,
    default: 'This will clear all cached data and reload the app. Are you sure?'
  },
  updateOptions: {
    type: Object,
    default: () => ({
      clearLocalStorage: false,  // Preserve user settings
      clearSessionStorage: true, // Clear session data
      clearIndexedDB: false,     // Preserve user projects
      clearCaches: true          // Clear app caches
    })
  }
})

const { forceUpdate } = usePWA()
const isUpdating = ref(false)

const buttonText = computed(() => {
  return isUpdating.value ? 'Updating...' : 'Force Update'
})

const tooltip = computed(() => {
  return isUpdating.value 
    ? 'Clearing cache and reloading...' 
    : 'Clear all cached data and reload from server'
})

const handleForceUpdate = async () => {
  if (isUpdating.value) return
  
  const confirmed = confirm(props.confirmMessage)
  if (!confirmed) return
  
  isUpdating.value = true
  
  try {
    await forceUpdate(props.updateOptions)
  } catch (error) {
    console.error('Force update failed:', error)
    isUpdating.value = false
  }
}
</script>

<style scoped>
.force-update-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  min-height: 32px;
}

.force-update-btn:hover:not(:disabled) {
  background: #d32f2f;
  transform: translateY(-1px);
}

.force-update-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.force-update-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.force-update-icon.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Alternative styling options */
.force-update-btn.compact {
  padding: 4px 8px;
  font-size: 12px;
  min-height: 24px;
}

.force-update-btn.icon-only {
  padding: 8px;
  min-width: 32px;
  justify-content: center;
}

.force-update-btn.secondary {
  background: #757575;
}

.force-update-btn.secondary:hover:not(:disabled) {
  background: #616161;
}

.force-update-btn.outline {
  background: transparent;
  border: 1px solid #f44336;
  color: #f44336;
}

.force-update-btn.outline:hover:not(:disabled) {
  background: #f44336;
  color: white;
}

/* Integration with Wavemaker interface styles */
.force-update-btn.interfaceBtn {
  background: var(--button);
  color: var(--button-f);
  border: 1px solid var(--button);
  padding: 10px 15px;
  font-family: var(--sysfont);
  width: 100%;
  text-align: left;
  justify-content: flex-start;
}

.force-update-btn.interfaceBtn:hover:not(:disabled) {
  background: var(--button-hover);
  color: var(--button-hover-f);
  border-color: var(--button-hover);
}

.force-update-btn.interfaceBtn svg {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>