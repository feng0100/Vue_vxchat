import VueRouter from "vue-router";
import Vue from "vue";
import Chatting from "../components/views/Chatting";
import Setting from "../components/views/Setting";
import About from "../components/views/About";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";

Vue.use(VueRouter);
const routes = [
    {
        path:'',
        redirect:'/Login'
    },
    {
        path:'/Login',
        component:Login
    },
    {
        path:'/Home',
        component:Home,
        children:[
            {
                path:'',
                component:Chatting
            },
            {
                path:'Chatting',
                component:Chatting
            },
            {
                path:'About',
                component:About
            },
            {
                path:'Setting',
                component:Setting
            },
        ]
    }
]

const router = new VueRouter({
    routes,
    mode:'history'
})

export default router