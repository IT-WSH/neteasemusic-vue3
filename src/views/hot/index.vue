<template>
  <div>热门音乐</div>
</template>
<script>
import { toRefs, reactive } from 'vue'
export default {
  setup() {
    // const { ctx } = getCurrentInstance()
    // console.log(ctx.$router.currentRoute.value)
    const state = reactive({})
    return {
      ...toRefs(state)
    }
  }
}
</script>
