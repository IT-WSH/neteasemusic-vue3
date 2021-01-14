let state = {
    username: 'admin',
    total: 0,
    accessToken: 'admin',
    avatar: '随意设置',
    rolename: '随意设置',
    userList: [{ name: 'admin', age: 29 }]
  },
  getters = {
    accessToken: state => state.accessToken,
    username: state => state.username,
    rolename: state => state.rolename,
    avatar: state => state.avatar,
    userList: state => state.userList,
    total: state => state.total
  },
  mutations = {
    setAccessToken(state, accessToken) {
      // 设置accessToken
      state.accessToken = accessToken
    },
    setUsername(state, username) {
      // 设置用户名
      state.username = username
    },
    setRolename(state, rolename) {
      // 设置权限名
      state.rolename = rolename
    },
    setAvatar(state, avatar) {
      // 设置头像
      state.avatar = avatar
    },
    setUserList(state, list) {
      // 设置用户列表
      state.userList = list
    },
    setTotal(state, total) {
      state.total = total
    }
  },
  actions = {
    testActions({ commit }, num) {
      setTimeout(() => {
        commit('setTotal', num)
        console.log(num)
      }, 2000)
    }
  }
export default { state, getters, mutations, actions }
