<template>
  <div class="loader">
    <div class="bounce-one" :style="{'background-color': color}"/>
    <div class="bounce-two" :style="{'background-color': color}"/>
    <div class="bounce-three" :style="{'background-color': color}"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'Loader' })
export default class Loader extends Vue {
  @Prop({ default: '#ffffff' }) readonly color!: string
}
</script>

<style lang="scss" scoped>
.loader {
  position: absolute;
  margin: 0 auto;
  text-align: center;
}

.loader > div {
  display: inline-block;
  width: 9px;
  height: 9px;
  margin-right: 5px;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  background-color: #fff;
  border-radius: 100%;

  &:last-child {
    margin: 0;
  }
}

.loader .bounce-one {
  -webkit-animation-delay: -.32s;
  animation-delay: -.32s;
}

.loader .bounce-two {
  -webkit-animation-delay: -.16s;
  animation-delay: -.16s;
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
