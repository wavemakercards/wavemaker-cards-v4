<template>
  <div class="wavemakerPopupBlackout" v-if="$root.$data.popup.name" @click="$root.$data.popup.name = null"></div>
  <Transition name="bounce">
    <div class="wavemakerPopup" v-if="$root.$data.popup.name" style="text-align: center;">
      <div style="text-align:right">
        <button class="clearInterfaceIconButton" @click="$root.$data.popup.name = null">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
          </svg>
        </button>
      </div>
      <ApiForm v-if="$root.$data.popup.name === 'ApiForm'" />
      <SettingsPopup v-if="$root.$data.popup.name === 'SettingsPopup'" />
      <GoogleDrive v-if="$root.$data.popup.name === 'GoogleDrive'" />
    </div>
  </Transition>
</template>
<script>
import ApiForm from '@/components/popups/ApiForm.vue'
import SettingsPopup from '@/components/popups/SettingsPopup.vue'
import GoogleDrive from '@/components/popups/GoogleDrive.vue'
export default {
  name: "PopupManager",
  components: {
    ApiForm,
    SettingsPopup,
    GoogleDrive
  }
}
</script>

<style>

</style>