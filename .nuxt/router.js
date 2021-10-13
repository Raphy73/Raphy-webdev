import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4135fed4 = () => interopDefault(import('../pages/autres.vue' /* webpackChunkName: "pages/autres" */))
const _495f02f4 = () => interopDefault(import('../pages/git-github.vue' /* webpackChunkName: "pages/git-github" */))
const _fd6018d2 = () => interopDefault(import('../pages/html-css.vue' /* webpackChunkName: "pages/html-css" */))
const _2027c6a3 = () => interopDefault(import('../pages/javascript.vue' /* webpackChunkName: "pages/javascript" */))
const _1255afbf = () => interopDefault(import('../pages/cours-autres/conception-objet.vue' /* webpackChunkName: "pages/cours-autres/conception-objet" */))
const _346c110a = () => interopDefault(import('../pages/cours-html-css/animations-css.vue' /* webpackChunkName: "pages/cours-html-css/animations-css" */))
const _7e95f553 = () => interopDefault(import('../pages/cours-html-css/sass.vue' /* webpackChunkName: "pages/cours-html-css/sass" */))
const _1a7e97f8 = () => interopDefault(import('../pages/cours-autres/cours-conception-objet-damien/_slug.vue' /* webpackChunkName: "pages/cours-autres/cours-conception-objet-damien/_slug" */))
const _ba346030 = () => interopDefault(import('../pages/cours-html-css/cours-animations-css/_slug.vue' /* webpackChunkName: "pages/cours-html-css/cours-animations-css/_slug" */))
const _a6e9cd9e = () => interopDefault(import('../pages/cours-html-css/cours-sass/_slug.vue' /* webpackChunkName: "pages/cours-html-css/cours-sass/_slug" */))
const _3bb0a2e8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/autres",
    component: _4135fed4,
    name: "autres"
  }, {
    path: "/git-github",
    component: _495f02f4,
    name: "git-github"
  }, {
    path: "/html-css",
    component: _fd6018d2,
    name: "html-css"
  }, {
    path: "/javascript",
    component: _2027c6a3,
    name: "javascript"
  }, {
    path: "/cours-autres/conception-objet",
    component: _1255afbf,
    name: "cours-autres-conception-objet"
  }, {
    path: "/cours-html-css/animations-css",
    component: _346c110a,
    name: "cours-html-css-animations-css"
  }, {
    path: "/cours-html-css/sass",
    component: _7e95f553,
    name: "cours-html-css-sass"
  }, {
    path: "/cours-autres/cours-conception-objet-damien/:slug?",
    component: _1a7e97f8,
    name: "cours-autres-cours-conception-objet-damien-slug"
  }, {
    path: "/cours-html-css/cours-animations-css/:slug?",
    component: _ba346030,
    name: "cours-html-css-cours-animations-css-slug"
  }, {
    path: "/cours-html-css/cours-sass/:slug?",
    component: _a6e9cd9e,
    name: "cours-html-css-cours-sass-slug"
  }, {
    path: "/",
    component: _3bb0a2e8,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}