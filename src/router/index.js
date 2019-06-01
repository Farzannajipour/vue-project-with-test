import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Participate from '@/components/Participate'
import Gallery from '@/components/Gallery'
import Showcase from '@/components/Showcase'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      useEslint: false,
      redirect: 'participate',
      component: Home,
      children: [
        {
          path: 'participate',
          name: 'Participate',
          component: Participate
        },
        {
          path: 'gallery',
          name: 'Gallery',
          component: Gallery
        },
        {
          path: 'showcase',
          name: 'Showcase',
          component: Showcase
        }
      ]
    }
  ]
})
