<template>
  <div class="textarea-wrap">
    <textarea
      v-model="text"
      class="textarea"
      rows="3"
      :placeholder="placeholder"
      @input="onInput"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'

const FOUND_TAGS = /(<(.)*?>)/ig
const FORBIDDEN = /(<|>|\/>)/ig

@Component({ name: 'TextArea' })
export default class TextArea extends Vue {
  @Prop({ default: '' }) readonly value!: string
  @Prop({ default: '' }) readonly placeholder!: string

  text : string = ''
  defaultText : string = '* Для переноса строки пользуйтесь "enter". Введённые HTML-теги будут удалены.'
  errorText : string = 'Внимание! Для переноса строки пользуйтесь "enter",' +
    ' текст внутри символов "<" и ">" будет удалён.'
  isError : boolean = false

  get infoText() : string {
    return this.isError ? this.errorText : this.defaultText
  }

  @Watch('value')
  onValueChanged(val: string) {
    if (this.text !== val) this.text = val
  }

  created() {
    this.text = this.value
  }

  onInput({ target } : { target : HTMLInputElement}) {
    this.isError = !!target.value.match(FORBIDDEN)

    let correctValue = this.removeTags(target.value)

    this.$emit('change', correctValue)
  }
  onChange({ target } : { target : HTMLInputElement}) {
    let correctValue = this.removeTags(target.value)

    this.$emit('change', correctValue)
    this.text = correctValue
  }
  removeTags(text: string) {
    return text.replace(FOUND_TAGS, '')
  }
}
</script>

<style lang="scss">
  @import '../variables.scss';

  .textarea-wrap {
    width: 100%;
  }

  .textarea {
    @include uikit_text;

    display: block;
    width: 100%;
    min-height: 44px;
    box-sizing: border-box;
    padding: 8px 12px;
    border: none;
    background: $uikit_input-bg-color;
    background-image: none;
    border-radius: 4px;
    box-shadow: none;
    color: $uikit_text-color;
    font-size: 16px;
    line-height: 1.5;
    resize: none;

    &:focus {
      outline: 0;
    }
  }
</style>
