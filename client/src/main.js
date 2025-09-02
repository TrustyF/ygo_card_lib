import '/src/assets/base.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import LoadGif from '/cards/Card_loading.jpg'

const local_api = "/api";
const dev_mode = true;
const debug_mode = import.meta.env.DEV;

const curr_api = local_api

const app = createApp(App)

app.provide("curr_api", curr_api);
app.provide("dev_mode", dev_mode);
app.provide("debug_mode", debug_mode);
app.use(router)

app.use(VueLazyLoad, {
    preLoad: 1.3,
    loading: LoadGif,
    error: LoadGif,
    attempt: 2
})

app.mount('#app')

export default curr_api