export default [
  {
    name: 'Test',
    path: '/test',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/test/index.vue')
  },
  {
    name: 'Playlist',
    path: '/playlist',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/playlist/index.vue')
  }
]
