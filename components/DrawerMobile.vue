<template>
  <v-navigation-drawer
    v-if="$vuetify.breakpoint.mobile"
    v-model="drawerMobile"
    app
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Ghost eShop </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        nuxt
        :active-class="
          $route.fullPath === '/games' ||
          $route.fullPath === '/games/' ||
          $route.fullPath === '/dsgames' ||
          $route.fullPath === '/dsgames/' ||
          $route.fullPath === '/wiiu' ||
          $route.fullPath === '/wiiu/' ||
          $route.fullPath === '/fr/games' ||
          $route.fullPath === '/fr/games/' ||
          $route.fullPath === '/fr/dsgames' ||
          $route.fullPath === '/fr/dsgames/' ||
          $route.fullPath === '/fr/wiiu' ||
          $route.fullPath === '/fr/wiiu/' ||
          $route.fullPath === '/jp/games' ||
          $route.fullPath === '/jp/games/' ||
          $route.fullPath === '/jp/dsgames' ||
          $route.fullPath === '/jp/dsgames/' ||
          $route.fullPath === '/jp/wiiu' ||
          $route.fullPath === '/jp/wiiu/' ||
          $route.fullPath === '/es/games' ||
          $route.fullPath === '/es/games/' ||
          $route.fullPath === '/es/dsgames' ||
          $route.fullPath === '/es/dsgames/' ||
          $route.fullPath === '/es/wiiu' ||
          $route.fullPath === '/es/wiiu/'
            ? 'noActive'
            : ''
        "
        :to="localePath('/')"
      >
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('header.home') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group>
        <template #activator>
          <v-list-item-icon>
            <v-icon>mdi-gamepad-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t('header.games') }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="gamet in gamestypes"
          :key="gamet.name"
          :to="!gamet.page.startsWith('http') ? localePath('/' + gamet.page) : null"
          :href="gamet.page.startsWith('http') ? gamet.page : null"
          :target="gamet.page.startsWith('http') ? '_blank' : null"
          link
          style="padding-left: 20px"
        >
          <v-list-item-icon style="margin-right: 15px">
            <v-icon>mdi-arrow-right-bottom</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ gamet.name }}</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item
        nuxt
        target="_blank"
        href="https://forms.gle/oeExF7qWyDTjwSfe9"
      >
        <v-list-item-icon>
          <v-icon>mdi-file-document-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('header.request') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      listLang: null,
      gamestypes: [
        {
          name: '3DS',
          page: 'games',
        },
        {
          name: 'NDS',
          page: 'dsgames',
        },
        {
          name: 'WiiU',
          page: 'wiiu',
        },
        {
          name: 'Switch',
          page: 'https://nx.ghostland.at',
        },
      ],
    }
  },
  computed: {
    drawerMobile: {
      get() {
        return this.$store.getters.getDrawerMobile
      },
      set(value) {
        return this.$store.commit('setDrawerMobile', value)
      },
    },
  },
}
</script>

<style scoped>
.v-btn {
  margin-left: 10px;
}

.noActive::before {
  opacity: 0 !important;
}
</style>
