import Vue from 'vue';
import VueRouter from 'vue-router';


import Index from '../components/Index';
import Login from '../components/Login';
import Line from '../components/Line';
import Pie from '../components/Pie';
import Map from '../components/Map';
import Bar from '../components/Bar';
import Home from '../components/Home';
import Data from '../components/Data';
import DateData from '../components/Datedata';




Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index

        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/line',
            name: 'Line',
            component: Line
        },
        {
            path: '/pie',
            name: 'Pie',
            component: Pie
        },
        {
            path: '/map',
            name: 'Map',
            component: Map
        },
        {
            path: '/bar',
            name: 'Bar',
            component: Bar
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/data',
            name: 'Data',
            component: Data
        },
        {
            path: '/datedata',
            name: 'DateData',
            component: DateData
        }
    ]


});



export default router;