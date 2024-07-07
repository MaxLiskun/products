

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import index from './style/index.css'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
    components,
    directives,
  })




/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret,faImage,faBars,faBolt,faHome,faBook,faBookOpen, 
  faList, faShop, faXmark, faArrowRightFromBracket, 
  faUser, faVolumeHigh, faSquare, 
  faPaperPlane, faChevronUp, faChevronDown, faChevronRight, faChevronLeft,
  faBasketShopping, faArrowLeft
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret,faImage,faBars,
  faBolt,faHome,faBook,faBookOpen, 
  faList, faShop, faXmark, faArrowRightFromBracket, 
  faUser, faVolumeHigh, faSquare, faPaperPlane,
  faChevronUp,faChevronDown, faChevronRight, faChevronLeft,faBasketShopping, faArrowLeft)
//================================================================


const app = createApp(App)
app.use(store)
app.use(router)
app.use(vuetify)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')

