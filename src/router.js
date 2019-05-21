import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import registro from './views/registro.vue'
import regproductos from './views/regproductos.vue'
import resultados from './views/resultados.vue'
import producto from './views/producto.vue'
import perfil from './views/perfil.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('./views/registro.vue')
    },
    {
      path: '/regproductos',
      name: 'regproductos',
      component: () => import('./views/regproductos.vue')
    },
    {
      path: '/resultados',
      name: 'resultados',
      component: () => import('./views/resultados.vue')
    },
    {
      path: '/producto',
      name: 'producto',
      component: () => import('./views/producto.vue')
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('./views/perfil.vue')
    }
    
  ]
})
