<template>
  <div
    class="input-block"
    :class="{
      'input_has-icon': icon,
      'input_has-error': error,
      input_disabled: disabled,
      'input_no-title': !title,
      light: light
    }"
  >
    <input
      v-restrict.number="{isNumber, negativeNumber, isFloat}"
      ref="input"
      class="input-block__input"
      type="text"
      :value="value"
      :disabled="disabled"
      @paste="handlePaste"
      @input="onInput"
      @blur="onBlur"
      @keyup.enter="handleEnter"
    >
    <svgicon
      v-if="icon"
      class="input-block__icon"
      :name="icon"
      :color="value.length ? '#0083ca' : '#dddddd'"
    />
    <svgicon
      v-if="icon && value"
      class="input-block__clear"
      name="cancel"
      height="12"
      width="12"
      color="#333"
      @click.native="clear"
    />
    <span
      class="input-block__title"
      :class="{input_hascontent: !!value || value === 0 }"
    >
      {{ title }}
    </span>
    <div v-if="error" class="input-block__error">{{ error }}</div>

    <Popper v-if="tooltip" trigger="hover">
      <div class="popper">
        {{ tooltip }}
      </div>
      <svgicon
        slot="reference"
        class="input-block__help"
        name="help"
        color="#0083ca"
      />
    </Popper>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Popper from 'vue-popperjs'
import variables from '../variables.scss'
import restrict from './restrict-directive'

@Component({
  name: 'TextInput',
  components: { Popper },
  directives: { restrict }
})
export default class TextInput extends Vue {
  @Prop({ default: 'text' }) readonly type!: string
  @Prop({ default: '' }) readonly value!: string | number
  @Prop({ default: '' }) readonly title!: string
  @Prop({ default: false }) readonly disabled!: boolean
  @Prop({ default: false }) readonly autofocus!: boolean
  @Prop({ default: '' }) readonly icon!: string
  @Prop({ default: '' }) readonly error!: string
  @Prop({ default: '' }) readonly tooltip!: string
  @Prop({ default: false }) readonly light!: boolean
  @Prop({ default: false }) readonly negativeNumber!: boolean
  @Prop({ default: true }) readonly enableClear!: boolean

  get isNumber() : boolean {
    return this.type === 'number' || this.type === 'integer' || this.type === 'float'
  }
  get isFloat() : boolean {
    return this.type === 'float'
  }

  mounted() {
    if (this.autofocus) {
      (this.$refs.input as HTMLInputElement).focus()
    }
  }

  onInput({ target: { value } } : { target: HTMLInputElement}) {
    let newValue : string | number | null = value.trim()

    if (this.isNumber) {
      newValue = parseInt(value) || null
    }

    if (this.isFloat) {
      newValue = parseFloat(value) || null
    }

    this.$emit('change', newValue)
  }

  handlePaste(event: any) {
    if (!this.isNumber) {
      return
    }

    event.preventDefault()

    const text = event.clipboardData.getData('text')
    const number = parseInt(text) || null

    this.$emit('change', number)
  }

  clear() {
    this.$emit('change', this.isNumber ? null : '')
  }

  onBlur() {
    this.$emit('blur', (this.$refs.input as HTMLInputElement).value)
  }

  handleEnter() {
    this.$emit('enter')
    ;(this.$refs.input as HTMLInputElement).blur()
  }
}
</script>

<style lang="scss">
@import '../variables.scss';

.input-block {
  position: relative;
  display: block;
  width: 100%;
  align-items: center;
  padding-top: 15px;
  font-family: OpenSans, sans-serif;

  &.light {
    margin-bottom: 0;

    .input-block__input {
      height: auto;
    }
  }
}

.input-block.input_no-title {
  padding-top: 0;
}

.input-block__icon {
  position: absolute;
  top: 8px;
  left: 12px;
}

.input-block__clear {
  position: absolute;
  top: 13px;
  right: 12px;
  cursor: pointer;
}

.input_no-title .input-block__icon {
  top: 8px;
}

.input-block__input {
  @include uikit_text;

  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 38px;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid $uikit_input-bg-color;
  background-color: $uikit_input-bg-color;
  background-image: none;
  border-radius: 4px;
  box-shadow: none !important;
  color: $uikit_text-color;
  font-size: 16px;
  line-height: 1.5;
  text-overflow: ellipsis;
  transition: border-color ease-in-out .15s;
  white-space: nowrap;

  &:disabled {
    opacity: .3;
    pointer-events: none;
    user-select: none;
  }

  &:focus {
    outline: 0 !important;
  }

  .title {
    color: #a0a6ad;
    letter-spacing: .3px;
  }
}

.input_has-icon .input-block__input {
  padding-right: 43px;
  padding-left: 43px;
}

.input_has-error .input-block__input {
  border-color: #e24640;
  color: #333;
}

.input-block__title {
  position: absolute;
  top: 30px;
  left: 0;
  color: #a0a6ad;
  cursor: text;
  font-family: OpenSans, sans-serif;
  font-size: 16px;
  letter-spacing: .3px;
  line-height: 1.5;
  pointer-events: none;
  transition: all .3s;
}

.input_has-icon .input-block__title {
  left: 30px;
}

.input_temporal .input-block__title {
  top: 0;
  left: 0;
  color: #333;
  font-size: 12px;
  font-weight: bold;
}

.input-block__title.input_hascontent {
  top: 0;
  left: 0;
  color: #333;
  font-size: 12px;
  font-weight: bold;
}

.input-block__input:focus + .input-block__title {
  top: 0;
  left: 0;
  color: #333;
  font-size: 12px;
  font-weight: bold;
}

.input-block__error {
  position: absolute;
  bottom: 1px;
  left: 0;
  color: #e24640;
  font-size: 12px;
  letter-spacing: .3px;
}

.input-block__help {
  position: absolute;
  top: 25px;
  right: 0;
}

.input_no-title .input-block__help {
  top: 16px;
}
</style>
