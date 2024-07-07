<template>
  <div class="container">

    <header class="header">
      <headerComponent />
    </header>


    <main class="main">
      <RouterView />
    </main>



  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { RouterLink, RouterView, useRoute } from 'vue-router'

import headerComponent from './components/headerComponent.vue'
//import mainPage from '../src/components/mainPage.vue'

const store = useStore()
const route = useRoute()




onMounted(() => {
  store.dispatch('getGoodsFromApi')



})


</script>

<style scoped>
.container {}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: rgb(230, 226, 226);
  z-index: 9999999999999;
}

.main {
  margin-top: 100px;

}
</style>