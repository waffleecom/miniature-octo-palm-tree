export const state = () => ({
  drawerMobile: false,
  darkTheme: false,
})

export const getters = {
  getDrawerMobile: (state) => {
    return state.drawerMobile
  },
  getDarkTheme: (state) => {
    return state.darkTheme
  },
}

export const mutations = {
  setDrawerMobile(state, bool) {
    state.drawerMobile = bool
  },
  setDarkTheme(state, bool) {
    state.darkTheme = bool
  },
}

export const actions = {
  toggleTheme({ commit, state }) {
    const newTheme = !state.darkTheme
    commit('setDarkTheme', newTheme)
    
    // Persist theme preference in localStorage
    if (process.client) {
      localStorage.setItem('ghosteshop-theme', newTheme ? 'dark' : 'light')
    }
    
    return newTheme
  },
  
  initTheme({ commit }) {
    if (process.client) {
      // Check localStorage first
      const savedTheme = localStorage.getItem('ghosteshop-theme')
      if (savedTheme) {
        const isDark = savedTheme === 'dark'
        commit('setDarkTheme', isDark)
        return isDark
      }
      
      // Fall back to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      commit('setDarkTheme', prefersDark)
      return prefersDark
    }
    return false
  },
}