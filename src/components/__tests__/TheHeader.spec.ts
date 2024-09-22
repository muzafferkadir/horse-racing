import { mount } from '@vue/test-utils';
import TheHeader from '@/components/TheHeader.vue';
import { describe, it, expect, vi } from 'vitest';
import { createStore } from 'vuex';

vi.mock('./TheLogo.vue', () => ({
  default: { template: '<div>Logo</div>' },
}));

const createMockStore = (state = {}) => {
  const store = createStore({
    state: {
      isRacing: false,
      isGenerated: false,
      programFinished: false,
      ...state,
    },
    actions: {
      generateProgram: vi.fn(),
      startProgram: vi.fn(),
    },
    mutations: {
      setIsRacing: vi.fn(),
    },
  });

  vi.spyOn(store, 'dispatch');
  vi.spyOn(store, 'commit');
  return store;
};

describe('TheHeader.vue', () => {
  it('generates program when generate button is clicked', async () => {
    const store = createMockStore();
    const wrapper = mount(TheHeader, { global: { provide: { store } } });
    await wrapper.find('#generate-program-button').trigger('click');
    expect(store.dispatch).toHaveBeenCalledWith('generateProgram');
  });

  it('sets isRacing when stop button is clicked', async () => {
    const store = createMockStore({ isGenerated: true, programStarted: true });
    const wrapper = mount(TheHeader, { global: { provide: { store } } });
    await wrapper.find('#start-race-button').trigger('click');
    expect(store.commit).toHaveBeenCalledWith('setIsRacing', true);
  });

  it('disables generate button when isRacing is true', () => {
    const store = createMockStore({ isRacing: true });
    const wrapper = mount(TheHeader, { global: { plugins: [store] } });
    expect(wrapper.find('#generate-program-button').attributes('disabled')).toBeDefined();
  });

  it('enables start/stop button when isGenerated is true and programFinished is false', () => {
    const store = createMockStore({ isGenerated: true, programFinished: false });
    const wrapper = mount(TheHeader, { global: { plugins: [store] } });
    expect(wrapper.find('#start-race-button').attributes('disabled')).toBeUndefined();
  });

  it('changes start/stop button text based on isRacing', async () => {
    const store = createMockStore();
    const wrapper = mount(TheHeader, { global: { plugins: [store] } });
    expect(wrapper.find('#start-race-button').text()).toBe('START');

    await wrapper.vm.$nextTick();
    store.state.isRacing = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('#start-race-button').text()).toBe('STOP');
  });
});
