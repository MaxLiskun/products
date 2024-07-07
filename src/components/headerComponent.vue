<template>
  <v-container class="header-container">
    <v-row justify="end" align="end">



      <v-col cols="12" align="end">


        <router-link v-if="isBasketPage" class="link" to="/mainPage">
          <font-awesome-icon class="basket-icon" icon="fa-solid fa-arrow-left" />
        </router-link>

        <router-link v-if="!isBasketPage" class="link" to="/basketPage">
          <font-awesome-icon class="basket-icon" icon="fa-sharp fa-basket-shopping" />
        </router-link>

        <div v-if="totalPrice > 0" class="total-price">{{ totalPrice }}$</div>
      </v-col>



    </v-row>
  </v-container>




</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { RouterLink, RouterView, useRoute } from 'vue-router'



const store = useStore()
const route = useRoute()


const totalPrice = computed(() => store.getters.getTotalPrice)
const isBasketPage = computed(() => route.path === '/basketPage')



</script>

<style scoped>
.header-container {
  height: 100px;
  width: 100%;

}


.basket-icon {
  font-size: 34px;
  color: black;
}
</style>