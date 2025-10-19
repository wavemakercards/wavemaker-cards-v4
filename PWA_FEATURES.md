# PWA Features Implementation

This document explains the PWA (Progressive Web App) features implemented in Wavemaker Cards v4.

## Features

### 1. Install Prompt
- Automatically detects when the app can be installed
- Shows a friendly install prompt with app icon and description
- Allows users to install the app to their home screen/desktop
- Hides the prompt once the app is installed

### 2. Update Notifications
- Detects when a new version of the app is available
- Shows an update notification with the option to update immediately or later
- Handles the service worker update process automatically
- Refreshes the app with the latest version after update

### 3. Offline Ready Notification
- Notifies users when the app is ready to work offline
- Indicates that the app has been cached successfully

## Implementation Details

### Vite Configuration
The `vite.config.js` has been updated to use:
- `registerType: "prompt"` - This enables manual update prompts instead of automatic updates
- Enhanced manifest with additional PWA metadata

### Components
- `src/composables/usePWA.js` - Contains all PWA logic and state management
- `src/components/PWAPrompt.vue` - UI component for install and update prompts
- Integrated into `App.vue` for global availability

### How it Works

1. **Install Prompt**: 
   - Listens for the `beforeinstallprompt` event
   - Shows custom install UI when conditions are met
   - Handles the installation process

2. **Update Detection**:
   - Monitors service worker updates
   - Shows update notification when new version is available
   - Allows user to choose when to update

3. **Offline Support**:
   - Caches app resources for offline use
   - Notifies when offline functionality is ready

## User Experience

- **Non-intrusive**: Prompts appear as elegant notifications in the bottom-right corner
- **Mobile-responsive**: Adapts to different screen sizes
- **Dark theme support**: Automatically adapts to user's theme preference
- **Accessible**: Clear messaging and intuitive controls

## Testing

To test the PWA features:

1. **Development**: Run `npm run dev` - PWA features are enabled in development
2. **Production**: Build and serve the app (`npm run build && npm run preview`)
3. **Install Prompt**: Visit in a supported browser (Chrome, Edge, Safari on iOS 14.3+)
4. **Update Testing**: Deploy a new version and revisit the app

## Browser Support

- **Install**: Chrome, Edge, Safari (iOS 14.3+), Samsung Internet
- **Updates**: All modern browsers with service worker support
- **Offline**: All browsers with service worker support

## Customization

The PWA prompts can be customized by modifying:
- `src/components/PWAPrompt.vue` - UI styling and messaging
- `src/composables/usePWA.js` - Behavior and timing
- `vite.config.js` - Manifest properties and PWA settings