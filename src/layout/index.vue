<template>
  <div class="layout">
    <p-transition :name="'fade-transform'">
      <router-view :key="key"></router-view>
    </p-transition>
  </div>
</template>

<script>
import PTransition from '@/components/transition'
export default {
  name: 'layout',
  components: {
    PTransition
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scope>
.layout {
  height: 100%;
}
</style>
