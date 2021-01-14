<template>
  <div>我的</div>
</template>
<script>
import { toRefs, reactive, computed, onMounted } from 'vue'
import { mapState, mapGetters, mapMutations, mapActions, useStore } from 'vuex'
export default {
  setup() {
    // const { ctx } = getCurrentInstance()
    // console.log(ctx.$router.currentRoute.value)
    const state = reactive({})
    let store = useStore(),
      username2 = computed(() => store.getters['user/username']),
      // mapState
      states = mapState('user', ['accessToken', 'rolename']),
      accessToken = computed(states.accessToken.bind({ $store: store })),
      rolename = computed(states.rolename.bind({ $store: store })),
      // mapGetters
      getters = mapGetters('user', ['username', 'avatar']),
      username = computed(getters.username.bind({ $store: store })),
      avatar = computed(getters.avatar.bind({ $store: store })),
      // mapMutations
      mutations = mapMutations('user', ['setUserList', 'setTotal']),
      setUserList = mutations.setUserList.bind({ $store: store }),
      setTotal = mutations.setTotal.bind({ $store: store }),
      // mapActions
      actions = mapActions('user', ['testActions']),
      testActions = actions.testActions.bind({ $store: store })
    onMounted(() => {
      // // mapState
      // console.log('mapState accessToken: ' + accessToken.value)
      // console.log('mapState rolename: ' + rolename.value)
      // // mapGetters
      // console.log('mapGetters username: ' + username.value)
      // console.log('mapGetters avatar:' + avatar.value)
      // // mapMutations
      // setUserList([{ name: 'abc' }])
      // console.log(store.getters['user/userList'])
      // // mapActions
      // testActions()
    })
    return {
      username2,
      accessToken,
      rolename,
      username,
      avatar,
      setUserList,
      setTotal,
      testActions,
      ...toRefs(state)
    }
  }
}
</script>
