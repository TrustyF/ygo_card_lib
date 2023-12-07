import '/src/assets/base.css'

import {createApp, provide, ref} from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import LoadGif from '/assets/Card_loading.jpg'

const local_api = "http://192.168.1.11:5000";
const server_api = "https://ygo-TrustyFox.pythonanywhere.com";
const dev_mode = import.meta.env.DEV;
// const dev_mode = false;
const edit_mode = true
const curr_api = dev_mode ? local_api : server_api

const app = createApp(App)

app.provide("curr_api", curr_api);
app.provide("dev_mode", dev_mode);
app.provide("edit_mode", edit_mode);
app.use(router)

app.use(VueLazyLoad, {
    preLoad: 1.3,
    loading: LoadGif,
    error: LoadGif,
    attempt: 2
})

app.mount('#app')

export default curr_api