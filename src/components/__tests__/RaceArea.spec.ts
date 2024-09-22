import { mount } from '@vue/test-utils';
import RaceArea from '@/components/RaceArea.vue';
import { describe, it, expect, vi } from 'vitest';
import { createStore } from 'vuex';

vi.mock('@/components/icons/IconHorse.vue', () => ({
  default: {
    props: ['color'],
    template: '<div>Horse Icon</div>',
  },
}));

const createMockStore = (state = {}) => {
  const store = createStore({
    state: {
      isRacing: false,
      programStarted: false,
      currentRaceId: 0,
      races: [],
      horses: [],
      results: [],
      ...state,
    },
    actions: {
      nextRace: vi.fn(),
    },
    mutations: {
      setIsRacing: vi.fn(),
      setProgramStarted: vi.fn(),
      setProgramFinished: vi.fn(),
      addResult: vi.fn(),
    },
  });

  vi.spyOn(store, 'dispatch');
  vi.spyOn(store, 'commit');

  return store;
};

describe('TheRace.vue', () => {
  it('displays the race information', () => {
    const store = createMockStore({
      currentRaceId: 1,
      races: [
        {
          id: 1,
          name: 'Race 1',
          distance: 1000,
          participants: [
            { id: 1, name: 'Horse 1', color: 'red', condition: 100 },
            { id: 2, name: 'Horse 2', color: 'blue', condition: 90 },
          ],
        },
      ],
    });
    const wrapper = mount(RaceArea, { global: { provide: { store } } });
    expect(wrapper.find('.race-title').text()).toContain('Race 1 (1000M)');
  });

  it('displays the horses in the race', () => {
    const store = createMockStore({
      currentRaceId: 1,
      races: [
        {
          id: 1,
          name: 'Race 1',
          distance: 1000,
          participants: [
            { id: 1, name: 'Horse 1', color: 'red', condition: 100 },
            { id: 2, name: 'Horse 2', color: 'blue', condition: 90 },
          ],
        },
      ],
    });
    const wrapper = mount(RaceArea, { global: { provide: { store } } });
    const horseElements = wrapper.findAll('.horse');
    expect(horseElements.length).toBe(2);
    expect(horseElements[0].find('.horse-id').text()).toBe('1');
    expect(horseElements[1].find('.horse-id').text()).toBe('2');
  });

  it('updates the horse positions during the race', async () => {
    const store = createMockStore({
      isRacing: true,
      currentRaceId: 1,
      races: [
        {
          id: 1,
          name: 'Race 1',
          distance: 1000,
          participants: [
            { id: 1, name: 'Horse 1', color: 'red', condition: 100 },
            { id: 2, name: 'Horse 2', color: 'blue', condition: 90 },
          ],
        },
      ],
    });
    const wrapper = mount(RaceArea, { global: { provide: { store } } });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.horse-sprite')[0].attributes('style')).toContain('translateX(0px)');
    expect(wrapper.findAll('.horse-sprite')[1].attributes('style')).toContain('translateX(0px)');

    // Simulate the race progressing
    store.state.isRacing = true;
    await wrapper.vm.$nextTick();

    // Check if the horses have moved
    const horse1Position = wrapper.findAll('.horse-sprite')[0].attributes('style')
    const horse2Position = wrapper.findAll('.horse-sprite')[1].attributes('style')
    expect(horse1Position).toContain('translateX(');
    expect(horse1Position).not.toEqual('translateX(0px)');
    expect(horse2Position).toContain('translateX(');
    expect(horse2Position).not.toEqual('translateX(0px)');
  });

  it('finishes the race and updates the results', async () => {
    const store = createMockStore({
      isRacing: false,
      currentRaceId: 1,
      races: [
        {
          id: 1,
          name: 'Race 1',
          distance: 1000,
          participants: [
            { id: 1, name: 'Horse 1', color: 'red', condition: 100 },
            { id: 2, name: 'Horse 2', color: 'blue', condition: 90 },
          ],
        },
      ],
    });
    const wrapper = mount(RaceArea, { global: { provide: { store } } });
    await wrapper.vm.$nextTick();

    store.commit('setIsRacing', true);
    await wrapper.vm.$nextTick();

    store.state.isRacing = true;
    await wrapper.vm.$nextTick();

    // expect participants length to be 2
    expect(wrapper.vm.currentRace.participants.length).toBe(2);
    expect(wrapper.vm.currentRace.participants[0].condition).toBe(100);
    expect(wrapper.vm.currentRace.participants[1].condition).toBe(90);

    // expect racePositions to be an object with keys 1 and 2
    expect(wrapper.vm.racePositions).toEqual({ '1': 10, '2': 9 });

    // wait to finish the race
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await wrapper.vm.$nextTick();

    // check addResult function to be called
    expect(store.commit).toHaveBeenCalledWith('addResult', {
      raceId: 1,
      positions: [{ horseId: 1, position: 1 }, { horseId: 2, position: 2 }]
    });
  })
});
