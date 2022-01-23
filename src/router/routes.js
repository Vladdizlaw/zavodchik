import VueRouter from "vue-router";
import StartScreen from "../components/StartScreen.vue";
import AnimalProperty from "../components/AnimalProperty.vue";
import MapScreen from "../components/MapScreen.vue";
import RegistrationScreen from "../components/RegistrationScreen.vue";
import ProfileUserScreen from "../components/ProfileUserScreen.vue";
import ProfileShowScreen from "../components/ProfileShowScreen.vue";
import SettingsScreen from "../components/SettingsScreen.vue";
export default new VueRouter({
    mode:'history' ,
    routes:[
        {
            path: '/',
            name:'start',
            component: StartScreen,
            
        },
        {
            path: '/search',
            name:'search',
            component: AnimalProperty,
            props:true
        },
        {
            path: '/map',
            name:'map',
            component: MapScreen,
            props:true
        },
        {
            path:'/registration',
            name:'registration',
            component: RegistrationScreen,
            props:true
        },
        {
            path:'/profile',
            name:'profile',
            component:ProfileUserScreen,
            props:true
        },
        {
            path:'/settings',
            name:'settings',
            component:SettingsScreen,
            props:true
        },
        {
            path:'/search-result',
            name:'searchResult',
            component:ProfileShowScreen,
            props:true
        }
    ]
})