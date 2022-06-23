<template>
  <div id="app" class="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import appHeader from '@/components/app-header'

export default {
  name: 'App',
  components: {
    appHeader
  }
}
</script>

<style lang="sass">

@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap')

.app
  display: grid
  grid-auto-rows: auto 1fr auto
  min-height: 100vh
</style>
