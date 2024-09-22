import { mount } from '@vue/test-utils'
import RaceInfo from '@/components/RaceInfo.vue'
import { describe, it, expect } from 'vitest'
import { createStore } from 'vuex'

const createMockStore = () => createStore({
  state: {
    races: [
      { id: 1, distance: 1000, participants: [{ id: 1, name: 'Horse 1' }, { id: 2, name: 'Horse 2' }] },
      { id: 2, distance: 1500, participants: [{ id: 3, name: 'Horse 3' }, { id: 4, name: 'Horse 4' }] }
    ],
    horses: [
      { id: 1, name: 'Horse 1' },
      { id: 2, name: 'Horse 2' },
      { id: 3, name: 'Horse 3' },
      { id: 4, name: 'Horse 4' }
    ],
    results: [
      { raceId: 1, positions: [{ position: 1, horseId: 2 }, { position: 2, horseId: 1 }] },
      { raceId: 2, positions: [{ position: 1, horseId: 4 }, { position: 2, horseId: 3 }] }
    ]
  }
})

describe('RaceInfo.vue', () => {
  it('renders the program and results titles', () => {
    const wrapper = mount(RaceInfo, {
      global: {
        plugins: [createMockStore()]
      }
    })
    expect(wrapper.find('.title-program').text()).toBe('PROGRAM')
    expect(wrapper.find('.title-results').text()).toBe('RESULTS')
  })

  it('renders the correct number of races', () => {
    const wrapper = mount(RaceInfo, {
      global: {
        plugins: [createMockStore()]
      }
    })
    const races = wrapper.findAll('.races')
    expect(races).toHaveLength(2)
  })

  it('displays race information correctly', () => {
    const wrapper = mount(RaceInfo, {
      global: {
        plugins: [createMockStore()]
      }
    })
    const raceInfo = wrapper.find('.races')
    expect(raceInfo.find('.title-race').text()).toBe('RACE 1 (1000M)')
  })

  it('displays correct number of participants for each race', () => {
    const wrapper = mount(RaceInfo, {
      global: {
        plugins: [createMockStore()]
      }
    })
    const firstRaceParticipants = wrapper.findAll('.races')[0].find('.program-table').findAll('tbody tr')
    expect(firstRaceParticipants).toHaveLength(2)
  })

  it('displays correct race results', async () => {
    const wrapper = mount(RaceInfo, {
      global: {
        plugins: [createMockStore()]
      }
    })
    await wrapper.vm.$nextTick()
    const firstRaceResults = wrapper.findAll('.races')[0].findAll('table')[1].findAll('tbody tr')
    expect(firstRaceResults).toHaveLength(2)
    expect(firstRaceResults[0].findAll('td')[0].text()).toBe('1')
    expect(firstRaceResults[0].findAll('td')[1].text()).toBe('Horse 2')
  })

  it('handles unknown horse gracefully', async () => {
    const store = createMockStore()
    store.state.results[0].positions[0].horseId = 999
    const wrapper = mount(RaceInfo, {
      global: {
        plugins: [store]
      }
    })
    await wrapper.vm.$nextTick()
    const firstRaceResults = wrapper.findAll('.races')[0].findAll('table')[1].findAll('tbody tr')
    expect(firstRaceResults[0].findAll('td')[1].text()).toBe('Unknown Horse')
  })
})
