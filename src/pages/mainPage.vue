<template>


  <v-container>
    <v-row v-if="goods">
      <v-col v-for="good in goods" :key="good.id" cols="12" xs="6" sm="4" md="3" lg="2" xl="2">
        <v-card class="mx-auto" max-width="344" style="max-width: 344px;">
          <v-img width="300" height="225" aspect-ratio="16/9" cover :src="good.images[0]"></v-img>
          <v-card-title>{{ good.brand }}</v-card-title>
          <v-card-subtitle>{{ good.category }}</v-card-subtitle>
          <v-card-actions>
            <v-btn v-if="!addedGoodsId.includes(good.id)" color="green-lighten-1" class="border rounded" text @click="addGood(good)">Buy</v-btn>
            <font-awesome-icon v-else class="basket-icon" icon="fa-sharp fa-basket-shopping" />
            <div class="good-price">{{ good.price }} $</div>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-text>{{ good.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="loader" align="center" justify="center">
      <v-col cols="1" align="center" justify="center" class="text-center">
        <v-progress-circular v-if="!goods" :size="50" color="primary" indeterminate></v-progress-circular>
      </v-col>
    </v-row>
    <RouterView />
  </v-container>


</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref, reactive, onMounted, watch, computed, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const goods = computed(() => store.getters.getGoods);
const addedGoodsId = computed(() => store.getters.getAddedGoodsId);

const addGood = (good) => {
  store.commit('addGood', good);
  store.commit('addGoodsId')
  store.dispatch('countPrice');
};




onMounted(() => {
  store.commit('updateAddedGoods');
  store.commit('updateTotalPrice');
  store.dispatch('countPrice');
  store.commit('addGoodsId')
  

});
</script>

<style scoped>
.good-price {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: end;
  font-weight: bold;
}
</style>