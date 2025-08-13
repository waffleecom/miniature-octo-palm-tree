<template>
  <v-btn 
    icon 
    :title="$vuetify.theme.dark ? $t('theme.switchToLight') : $t('theme.switchToDark')"
    @click="toggleTheme"
  >
    <v-icon>
      {{ $vuetify.theme.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ThemeToggle',
  
  computed: {
    ...mapGetters(['getDarkTheme']),
  },

  methods: {
    async toggleTheme() {
      const newTheme = await this.$store.dispatch('toggleTheme')
      if (this.$vuetify) {
        this.$vuetify.theme.dark = newTheme
      }
    },
  },
}
</script>

<style scoped>
.v-btn {
  transition: transform 0.3s ease;
}

.v-btn:hover {
  transform: scale(1.1);
}
</style> 