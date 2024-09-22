import { shallowMount } from '@vue/test-utils'
import HorseList from '@/components/HorseList.vue'
import { describe, it, expect } from 'vitest'
import { createStore } from 'vuex'

const createMockStore = () => createStore({
  state: {
    horses: [
      { id: 1, name: 'Horse 1', condition: 10, color: '#000000' },
      { id: 2, name: 'Horse 2', condition: 15, color: '#FFFFFF' }
    ]
  }
})

describe('HorseList.vue', () => {
  it('renders the horse list title', () => {
    const wrapper = shallowMount(HorseList, {
      global: {
        plugins: [createMockStore()]
      }
    })
    expect(wrapper.find('.title').text()).toBe('HORSE LIST (1-20)')
  })

  it('renders the table headers correctly', () => {
    const wrapper = shallowMount(HorseList, {
      global: {
        plugins: [createMockStore()]
      }
    })
    const headers = wrapper.findAll('th')
    expect(headers).toHaveLength(3)
    expect(headers[0].text()).toBe('NAME')
    expect(headers[1].text()).toBe('CONDITION')
    expect(headers[2].text()).toBe('COLOR')
  })

  it('renders the correct number of horse rows', () => {
    const wrapper = shallowMount(HorseList, {
      global: {
        plugins: [createMockStore()]
      }
    })
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(2)
  })

  it('displays horse information correctly', () => {
    const store = createMockStore()
    store.state.horses = [{ id: 1, name: 'Test Horse', condition: 10, color: '#FF0000' }]

    const wrapper = shallowMount(HorseList, {
      global: {
        plugins: [store]
      }
    })
    const row = wrapper.find('tbody tr')
    expect(row.find('td:nth-child(1)').text()).toBe('Test Horse')
    expect(row.find('td:nth-child(2)').text()).toBe('10')

    const colorStyle = row.find('td:nth-child(3) div').attributes('style')
    expect(colorStyle).toBeDefined()
    if (colorStyle) {
      expect(
        colorStyle.includes('background-color: #FF0000') ||
        colorStyle.includes('background-color: rgb(255, 0, 0)')
      ).toBe(true)
    }
  })
})
