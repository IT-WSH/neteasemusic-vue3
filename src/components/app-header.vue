<template>
  <div class="header" :style="{ backgroundColor: backgroundColor }">
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      :left-arrow="leftArrow"
      :border="border"
      :fixed="fixed"
      :placeholder="placeholder"
      :safe-area-inset-top="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left v-if="!leftArrow">
        <slot name="left"></slot>
      </template>
      <template #title v-if="!title">
        <slot name="title"></slot>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { navBar } from 'vant'
import { useRouter } from 'vue-router'
export default {
  name: 'AppHeader',
  components: {
    [navBar.name]: navBar
  },
  props: {
    title: String,
    leftText: String,
    rightText: String,
    leftArrow: {
      type: Boolean,
      default: true
    },
    border: Boolean,
    placeholder: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: '#BB2C08'
    }
  },
  setup(props, ctx) {
    const { back } = useRouter()

    const onClickLeft = () => {
      if (props.leftArrow) {
        back(1)
      }
      ctx.emit('clickLeft')
    }
    const onClickRight = () => {
      ctx.emit('clickRight')
    }
    return {
      onClickLeft,
      onClickRight
    }
  }
}
</script>
<style scoped lang="scss">
.header {
  background: #bb2c08;
}
/deep/.van-nav-bar {
  background: transparent;
}
</style>
