export default [
  {
    name: 'Test',
    path: '/test',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/test/index.vue')
  }
]
