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
  onMounted
  // getCurrentInstance
} from 'vue'
import { useRouter } from 'vue-router'
import AppFooter from '@/components/app-footer.vue'
import { storage } from '@/utils/storage.js'
export default {
  name: 'Index',
  components: {
    AppFooter
  },
  setup() {
    // const { ctx } = getCurrentInstance()
    // console.log(ctx.$router.currentRoute.value)
    const index = ref(0)
    const state = reactive({
      currentName: '',
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
          path: '/hot',
          name: 'Hot',
          icon: 'hot'
        },
        {
          title: '我的音乐',
          path: '/mine',
          name: 'Mine',
          icon: 'manager'
        }
      ]
    })
    // 进入页面，加载当前路由
    const readRouterCurrent = () => {
      if (!state.footerList || state.footerList.length <= 0) return
      let currentPath = ''
      const router = useRouter()
      state.footerList.forEach(item => {
        if (item.name == state.currentName) {
          currentPath = item.path
        }
      })
      if (currentPath) {
        router.replace(currentPath)
      } else {
        router.replace(state.footerList[0].path)
      }
    }
    onMounted(() => {
      state.currentName = storage('currentName') || 'Home'
      readRouterCurrent()
    })
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
