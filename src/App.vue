
<script lang="ts">

import pageStage from "./types";
import Auth from "./views/Auth.vue";

export default {

  name: "App",
  components: {
    Auth
  },

  data() {
    return {
      pageStage: pageStage.Auth
    }
  },

  created() {

  },

  methods: {
    checkHasJWT : async () => {
      
    }
  }
}

</script>

<template>
  <div id="app">
    <Auth/>
  </div>
</template>