<template>
  <v-app-bar v-if="!$vuetify.breakpoint.mobile" app>
    <v-img src="/favicon.ico" max-width="32px" class="mr-1 mb-1" />
    <v-toolbar-title class="font-weight-black">Ghost eShop</v-toolbar-title>

    <v-btn
      nuxt
      :active-class="
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
      text
      >{{ $t('header.home') }}</v-btn
    >
    <v-menu left bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          :class="
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
              ? 'v-btn--active'
              : ''
          "
          nuxt
          v-bind="attrs"
          text
          v-on="on"
          >{{ $t('header.games') }} <v-icon>mdi-menu-down</v-icon></v-btn
        >
      </template>

      <v-list>
        <v-list-item
          v-for="gamet in gamestypes"
          :key="gamet.name"
          :to="!gamet.page.startsWith('http') ? localePath('/' + gamet.page) : null"
          :href="gamet.page.startsWith('http') ? gamet.page : null"
          :target="gamet.page.startsWith('http') ? '_blank' : null"
        >
          <v-list-item-title>{{ gamet.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      nuxt
      target="_blank"
      href="https://forms.gle/oeExF7qWyDTjwSfe9"
      text
      >{{ $t('header.request') }}</v-btn
    >
    <v-spacer></v-spacer>
    <v-badge bordered color="green" dot overlap>
      <v-btn
        color="green"
        nuxt
        target="_blank"
        href="https://boosty.to/ghostland"
        text
        ><v-icon>mdi-currency-usd</v-icon> {{ $t('header.donate') }}</v-btn
      >
    </v-badge>
    <ThemeToggle />
    <v-menu left bottom>
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-earth</v-icon>
        </v-btn>
      </template>

      <v-list v-model="listLang">
        <v-list-item
          v-for="item in lang"
          :key="item.lang"
          :to="switchLocalePath(item.lang)"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      listLang: null,
      lang: [
        {
          name: this.$t('header.english'),
          lang: 'en',
        },
        {
          name: this.$t('header.french'),
          lang: 'fr',
        },
        {
          name: this.$t('header.spanish'),
          lang: 'es',
        },
        {
          name: this.$t('header.japanese'),
          lang: 'jp',
        },
      ],
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
