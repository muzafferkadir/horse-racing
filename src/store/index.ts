import { createStore } from 'vuex';


interface Horse {
  id: number;
  color: string;
  condition: number;
  progress: number;
}

interface Run {
  distance: number;
  horses: number[];
}

interface State {
  horses: Horse[];
  raceSchedule: Run[];
  raceResults: number[][];
  currentRunHorses: Horse[];
  isRacing: boolean;
}

const store = createStore<State>({
  state: {
    horses: [],
    raceSchedule: [],
    raceResults: [],
    currentRunHorses: [],
    isRacing: false,
  },
  mutations: {
    setHorses(state, horses: Horse[]) {
      state.horses = horses;
    },
    setRaceSchedule(state, schedule: Run[]) {
      state.raceSchedule = schedule;
    },
    addRaceResult(state, result: number[]) {
      state.raceResults.push(result);
    },
    setCurrentRunHorses(state, horses: Horse[]) {
      state.currentRunHorses = horses;
    },
    updateHorseProgress(state, { horseId, progress }) {
      const horse = state.currentRunHorses.find(h => h.id === horseId);
      if (horse) {
        horse.progress = progress;
      }
    },
    setIsRacing(state, isRacing: boolean) {
      state.isRacing = isRacing;
    },
  },
  actions: {
    generateRace({ commit, state }) {
      const horses: Horse[] = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        condition: Math.floor(Math.random() * 100) + 1,
        progress: 0,
      }));

      commit('setHorses', horses);

      const distances = [1200, 1400, 1600, 1800, 2000, 2200];
      const schedule: Run[] = distances.map(distance => ({
        distance,
        horses: shuffleArray(horses.map(h => h.id)).slice(0, 10),
      }));

      commit('setRaceSchedule', schedule);
    },
    async startRace({ commit, state, dispatch }) {
      commit('setIsRacing', true);
      for (const run of state.raceSchedule) {
        await dispatch('runRace', run);
      }
      commit('setIsRacing', false);
    },
    async runRace({ commit, state }, run: Run) {
      const runHorses = state.horses.filter(h => run.horses.includes(h.id));
      commit('setCurrentRunHorses', runHorses.map(h => ({ ...h, progress: 0 })));

      const result: number[] = [];
      const interval = setInterval(() => {
        runHorses.forEach(horse => {
          const progress = Math.min(100, horse.progress + (horse.condition / 20));
          commit('updateHorseProgress', { horseId: horse.id, progress });
          if (progress === 100 && !result.includes(horse.id)) {
            result.push(horse.id);
          }
        });

        if (result.length === runHorses.length) {
          clearInterval(interval);
          commit('addRaceResult', result);
        }
      }, 100);

      return new Promise<void>(resolve => {
        const checkInterval = setInterval(() => {
          if (result.length === runHorses.length) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
      });
    },
  },
});

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default store;
