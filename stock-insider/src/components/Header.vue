<template>
  <v-app-bar absolute dark src="@/assets/vue.jpg">
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <router-link to="/">
      <v-img
        class="ml-3"
        src="@/assets/mainLogo.png"
        max-height="50"
        max-width="150"
      ></v-img>
    </router-link>

    <v-spacer></v-spacer>

    <v-btn
      class="blue darken-1"
      rounded
      router
      :to="{ name: 'detail', params: { traderName: 'COOK TIMOTHY D' } }"
      exact
    >
      <v-icon class="mr-1">mdi-apple</v-icon>
      COOK TIMOTHY D
    </v-btn>

    <v-btn
      class="ml-5 blue darken-1"
      rounded
      router
      :to="{ name: 'detail', params: { traderName: 'Pichai Sundar' } }"
      exact
    >
      <v-icon class="mr-1">mdi-google</v-icon>
      PICHAI SUNDAR
    </v-btn>

    <v-btn
      class="ml-5 blue darken-1"
      rounded
      router
      :to="{ name: 'detail', params: { traderName: 'Nadella Satya' } }"
      exact
    >
      <v-icon class="mr-1">mdi-microsoft-windows</v-icon>
      NADELLA SATYA
    </v-btn>

    <v-btn
      class="ml-5 blue darken-1"
      rounded
      router
      :to="{ name: 'detail', params: { traderName: 'Musk Elon' } }"
      exact
    >
      <v-icon class="mr-1">mdi-car-electric</v-icon>
      MUSK ELON
    </v-btn>

    <v-btn
      class="ml-5 blue darken-1"
      rounded
      router
      :to="{ name: 'detail', params: { traderName: 'Zuckerberg Mark' } }"
      exact
    >
      <v-icon class="mr-1">mdi-facebook</v-icon>
      ZUCKERBERG MARK
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn class="ml-7 blue darken-1" rounded @click="$router.push('/')">
      <v-icon class="mr-1">mdi-home</v-icon>
      MAIN
    </v-btn>

    <v-btn
      class="ml-5 blue darken-1"
      rounded
      @click="$router.push({ name: 'about' })"
    >
      <v-icon class="mr-1">mdi-magnify</v-icon>
      ABOUT
    </v-btn>
  </v-app-bar>
</template>
