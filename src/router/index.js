import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 

    {
      path: '/',
      redirect: '/mainPage' // Automatically redirect to mainPage on load
    },


    
    {
      path: '/mainPage',
      name: 'mainPage',
      component: () => import('../pages/mainPage.vue'),
      meta: {
       title: 'Головна',
      }
    },

    {
      path: '/basketPage',
      name: 'basketPage',
      component: () => import('../pages/basketPage.vue'),
      meta: {
       title: 'Корзина',
      }
    },



    
























  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
