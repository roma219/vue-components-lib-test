<template>
  <div id="app">
    <Loader color="#000"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Loader from './components/Loader'

@Component({
  components: {
    Loader
  }
})
export default class App extends Vue {}
</script>
