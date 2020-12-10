<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
            v-model="drawer"
            absolute
            bottom
            temporary
            src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <v-list
              nav
              dense
              class="white--text"
      >
        <h2>Menu</h2>
        <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
        >
          <v-list-item link @click="$router.push({ name: 'login' })">

            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="$router.push({ name: 'products' })">
            <v-list-item-title>Product Master</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="$router.push({ name: 'customers' })">
            <v-list-item-title>Customer Master</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="$router.push({ name: 'payment' })">
            <v-list-item-title>Payment Master</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view class="view"></router-view>
    </v-main>
  </v-app>
</template>
<script>


export default {
  name: 'App',

  components: {

  },

  data: () => ({
    drawer: false,
    group: 0,
  }),
  watch: {
    group () {
      this.drawer = false
    },},

};
</script>
