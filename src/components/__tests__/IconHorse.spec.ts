import { shallowMount } from '@vue/test-utils'
import IconHorse from '@/components/icons/IconHorse.vue'
import { describe, expect, it } from 'vitest'

describe('IconHorse', () => {
  it('renders the horse icon', () => {
    const wrapper = shallowMount(IconHorse)
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('path').exists()).toBe(true)
  })
})
