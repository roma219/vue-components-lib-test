import TextInput from './TextInput.vue'
import { shallowMount } from '@vue/test-utils'

describe('TextInput.vue', () => {
  it('Props.title when passed', () => {
    const title = 'TextInput title'
    const wrapper = shallowMount(TextInput, { propsData: { title } })

    expect(wrapper.props().title).toMatch(title)
    expect(wrapper.find('.input-block__title').html()).toContain(title)
  })

  it('Props.value when passed', () => {
    const value = 'Value placeholder'
    const wrapper = shallowMount(TextInput, { propsData: { value } })

    expect(wrapper.props().value).toMatch(value)
    expect((wrapper.find('input').element as HTMLInputElement).value).toMatch(
      value
    )
  })

  it('Props.disabled when passed', () => {
    const disabled = true
    const wrapper = shallowMount(TextInput, { propsData: { disabled } })

    expect(wrapper.props().disabled).toEqual(true)
    expect(wrapper.classes()).toContain('input_disabled')
  })

  it('Props.error when passed', () => {
    const error = 'some error'
    const wrapper = shallowMount(TextInput, { propsData: { error } })

    expect(wrapper.find('.input-block__error').html()).toContain(error)
    expect(wrapper.classes()).toContain('input_has-error')
  })

  it('Props.title when not passed', () => {
    const title = ''
    const wrapper = shallowMount(TextInput, { propsData: { title } })

    expect(wrapper.classes()).toContain('input_no-title')
  })

  it('Event.change on input', () => {
    const value = 'Value placeholder'
    const wrapper = shallowMount(TextInput, { propsData: { value } })

    wrapper.find('input').setValue('new value')
    expect(wrapper.emitted().change[0]).toEqual(['new value'])
  })

  it('Event.change on input type number', () => {
    const type = 'number'
    const value = 10
    const newValue = 20
    const wrapper = shallowMount(TextInput, { propsData: { type, value } })

    wrapper.find('input').setValue(newValue)
    expect(wrapper.emitted().change[0]).toEqual([newValue])
  })
})
