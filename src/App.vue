<template>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="Index">
      <component :is="Component" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" />
  </router-view>
</template>
<script>
import { toRefs, reactive, onMounted } from 'vue'
// import { useRoute } from 'vue-router'
import { storage } from '@/utils/storage.js'
export default {
  setup() {
    // const route = useRoute()
    const state = reactive({
      currentName: 'Home',
      transitionName: 'slide-right'
    })
    onMounted(() => {
      state.currentName = storage('currentName') || 'Home'
    })

    // watch(
    //   () => route.path,
    //   (newRoute, preRoute) => {
    //     console.log('监听到变化', newRoute + '<---' + preRoute)
    //   }
    // )
    const clickItem = data => {
      storage('currentName', data)
      state.currentName = data
    }
    return {
      ...toRefs(state),
      clickItem
    }
  }
}
</script>
