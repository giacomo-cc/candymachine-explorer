<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Candy Machine Explorer</v-toolbar-title>

      <v-spacer />

      <v-btn href="https://github.com/thegreat-vanderlinde/candymachine-explorer" target="_blank" icon>
        <v-icon>fab fa-github</v-icon>
      </v-btn>

      <v-btn href="https://twitter.com/vanderlinde____" target="_blank" icon>
        <v-icon>fab fa-twitter</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
