import Vue from 'vue'
import Router from 'vue-router'
import player from '../components/player/index.vue'
import home from '../components/main/home/index.vue'
import local from '../components/main/local/index.vue'
import download from '../components/main/download/index.vue'
import collection from '../components/main/collection/index.vue'
import recentPlay from '../components/main/recentplay/index.vue'
import searchResults from '../components/main/search/index.vue'
import songlist from '../components/main/songlist/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      redirect: { name: 'home' },
      component: require('@/components/MainPage').default,
      meta: {keepAlive: true},
      children: [
        {
          path: 'home',
          name: 'home',
          component: home,
          meta: {keepAlive: true}
        }, {
          path: 'local',
          name: 'local',
          component: local,
          meta: {keepAlive: true}
        }, {
          path: 'download',
          name: 'download',
          component: download,
          meta: {keepAlive: true}
        }, {
          path: 'collection',
          name: 'collection',
          component: collection,
          meta: {keepAlive: true}
        }, {
          path: 'recentPlay',
          name: 'recentPlay',
          component: recentPlay,
          meta: {keepAlive: true}
        }, {
          path: '/searchResults/:keywords',
          name: 'searchResults',
          component: searchResults,
          meta: {keepAlive: true}
        }, {
          path: 'songlist',
          name: 'songlist',
          component: songlist,
          meta: {keepAlive: true}
        }
      ]
    },
    {
      path: '/player',
      name: 'player',
      component: player,
      meta: {keepAlive: true}
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
