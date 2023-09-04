import '/src/assets/base.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

const local_api = "http://localhost:5000";
const server_api = "https://ttt-trustyfox.pythonanywhere.com";
const dev_mode = import.meta.env.DEV;
const edit_mode = true


const app = createApp(App)

app.provide("curr_api", dev_mode ? local_api : server_api);
app.provide("dev_mode", dev_mode);
app.provide("edit_mode", edit_mode);
app.provide("card_size", [168, 246]);
app.use(router)


app.mount('#app')
