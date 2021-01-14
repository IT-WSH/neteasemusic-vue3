<template>
  <router-view></router-view>
  <app-footer
    @click-item="clickItem"
    :currentName="currentName"
    :footerList="footerList"
  ></app-footer>
</template>
<script>
import {
  ref,
  toRefs,
  reactive,
  onMounted,
  watch,
  getCurrentInstance
} from 'vue'
import AppFooter from '@/components/app-footer.vue'
import { storage } from '@/utils/storage.js'
export default {
  components: {
    AppFooter
  },
  setup() {
    const { ctx } = getCurrentInstance()
    console.log(ctx.$router.currentRoute.value)
    const index = ref(0)
    const state = reactive({
      currentName: 'Home',
      transitionName: 'slide-right',
      footerList: [
        {
          title: '发现音乐',
          path: '/home',
          name: 'Home',
          icon: 'music'
        },
        {
          title: '热门音乐',
          path: '/test',
          name: 'Test',
          icon: 'hot'
        },
        {
          title: '我的音乐',
          path: '/about',
          name: 'About',
          icon: 'manager'
        }
      ]
    })
    onMounted(() => {
      state.currentName = storage('currentName') || 'Home'
    })
    watch(
      () => {
        return state.currentName
      },
      (newVal, preVal) => {
        console.log(newVal, preVal)
      }
    )
    const clickItem = data => {
      storage('currentName', data)
      state.currentName = data
    }
    return {
      index,
      ...toRefs(state),
      clickItem
    }
  }
}
</script>
