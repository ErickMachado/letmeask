<template>
  <RouterView />
  <notifications position="bottom center" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style lang="scss">
@import './assets/scss/reset';
</style>
