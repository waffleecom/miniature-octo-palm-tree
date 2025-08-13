export default function ({ app, store }) {
  // Initialize theme as early as possible
  if (process.client) {
    // Function to apply theme once Vuetify is ready
    const applyTheme = (isDark) => {
      store.commit('setDarkTheme', isDark)
      if (app.$vuetify) {
        app.$vuetify.theme.dark = isDark
      }
    }

    // Check localStorage first
    const savedTheme = localStorage.getItem('ghosteshop-theme')
    if (savedTheme) {
      const isDark = savedTheme === 'dark'
      applyTheme(isDark)
    } else {
      // Fall back to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(prefersDark)
      // Save the system preference
      localStorage.setItem('ghosteshop-theme', prefersDark ? 'dark' : 'light')
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      // Only apply system preference if user hasn't manually set a theme recently
      const savedTheme = localStorage.getItem('ghosteshop-theme')
      if (!savedTheme) {
        const isDark = e.matches
        applyTheme(isDark)
      }
    })
  }
} 