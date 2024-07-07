<template>

  <v-container v-if="getAddedGoods.length">
    <v-row>

      <!-- goods -->
      <v-col cols="" xs="" sm="" md="" lg="" xl="" align="center" justify="center">
        <v-container>

          <v-row class="border mt-6" v-if="getAddedGoods" v-for="el in getAddedGoods ">

            <!-- img -->
            <v-col cols="3" xs="" sm="" md="" lg="" xl="" align="center" justify="center">
              <v-img aspect-ratio="16/9" cover :src=el.good.images[0]></v-img>
            </v-col>

            <!-- description -->
            <v-col cols="3">
              <v-container>
                <v-row>
                  <v-col align="center" justify="center">
                    <!-- goor-brand -->
                    <div class="good-brand"> {{ el.good.brand }} </div>
                    <!-- good.category -->
                    <div class="good-category">{{ el.good.category }} </div>
                    <!-- good.price -->
                    <div class="good-price">
                      {{ el.good.price }} $
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <!-- + / -  -->
            <v-col cols="" xs="12" sm="12" md="" lg="" xl="" align="center" justify="center">
              <v-container>
                <v-row>
                  <v-btn @click="minusOne(el.good)" class="bg-green">-</v-btn>
                  <div class="good-counter"> {{ el.quantity }} </div>
                  <v-btn @click="plusOne(el.good)" class="bg-green">+</v-btn>
                </v-row>
              </v-container>

            </v-col>

          </v-row>
        </v-container>

      </v-col>

      <!-- order -->
      <v-col cols="" xs="12" sm="12" md="" lg="" xl="" align="center" justify="center">
        <v-card class="mx-auto" max-width="344" title="Order information">
          <v-container>
            <v-text-field v-model="first" color="primary" label="First name" variant="underlined"></v-text-field>

            <v-text-field v-model="last" color="primary" label="Last name" variant="underlined"></v-text-field>

            <v-text-field v-model="address" color="primary" label="Address" variant="underlined"></v-text-field>

            <v-text-field v-model="phone" color="primary" label="Phone" variant="underlined"></v-text-field>


          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn @click="makeOrder" class="oreder-btn">
              Order
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>

    </v-row>

    <!-- total -->
    <v-row>
      <v-col v-if="totalPrice > 0"><strong>TOTAL: {{ totalPrice }}$</strong></v-col>
    </v-row>

  </v-container>

  <!-- else if empty -->
  <v-container v-if="!getAddedGoods.length && !orderComplete">
    <v-row>
      <v-col>
        <h1>
          You have no added products...
        </h1>
      </v-col>
    </v-row>
  </v-container>

  <!-- if order complite -->
  <v-container v-if="orderComplete">
    <v-row>
      <v-col>
        <h2>
          Your order has been successfully completed
        </h2>
      </v-col>
    </v-row>
  </v-container>
  <RouterView />
</template>

//-------------------------------------------------------
<script setup>
import router from '@/router'
import { RouterLink, RouterView } from 'vue-router'
import { ref, reactive, onMounted, watch, computed, onBeforeUnmount, } from 'vue'
import { useStore } from 'vuex'
//================================
const store = useStore()

const getAddedGoods = computed(() => store.getters.getAddedGoods);
const totalPrice = computed(() => store.getters.getTotalPrice)




const plusOne = (good) => {
  store.dispatch('plusOne', good)
}

const minusOne = (good) => {
  store.dispatch('minusOne', good)
}



const first = ref('')
const last = ref('')
const address = ref('')
const phone = ref('')

const orderComplete = ref(false)


const makeOrder = () => {
  orderComplete.value = true
  const newUser = {
    firstName: first.value,
    lastName: last.value,
    address: address.value,
    phone: phone.value,
  }

  store.dispatch('makeOrder', newUser)

  setTimeout(() => {
    orderComplete.value = false
    router.push('/mainPage');
  }, 1500);

}
onMounted(async () => {
  store.commit('updateAddedGoods');
  store.commit('updateTotalPrice');
  store.dispatch('countPrice');
  store.commit('addGoodsId')
})
</script>
<style scoped>
.good-counter {
  margin: 10px;
  font-weight: bold;
}

.oreder-btn {
  background-color: green;
  color: rgb(255, 255, 255);
}
</style>