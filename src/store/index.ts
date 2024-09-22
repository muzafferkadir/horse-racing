import { createStore, Store } from 'vuex';
import type { State, Horse, Race, RaceResult } from '../../types/types';

const horseNames: string[] = [
  'Gülbatur', 'Şahbatur', 'Kırlangıç', 'Alkaranlık', 'Doru', 'Bozkır', 'Yıldırım', 'Demirkır', 'Şahmeran',
  'Ateşkanat', 'Karabey', 'Yekta', 'Aygırhan', 'Taykut', 'Akıncı', 'Kasırga', 'Şahruh', 'Hanbatur', 'Turan', 'Berksoy'
];

const horseColors: string[] = [
  '#160404', '#2a2a2a', '#5d3a37', '#4d4d4d', '#570C00', '#979797', '#751700', '#836969', '#942700', '#A33100',
  '#B33B00', '#c27b00', '#D15400', '#76541e', '#F07000', '#dcbf1e', '#cac7c3', '#efe55e', '#FFAB2E', '#ffa304'
];

const raceLengths: number[] = [1200, 1400, 1600, 1800, 2000, 2200];

const store: Store<State> = createStore<State>({
  state: {
    horses: [],
    races: [],
    results: [],
    isRacing: false,
    currentRaceId: null,
    isGenerated: false,
    programStarted: false,
    programFinished: false,
  },
  mutations: {
    setHorses(state: State, horses: Horse[]): void {
      state.horses = horses;
    },

    setRaces(state: State, races: Race[]): void {
      state.races = races;
    },

    addRace(state: State, race: Race): void {
      state.races.push(race);
    },

    setIsRacing(state: State, isRacing: boolean): void {
      state.isRacing = isRacing;
    },

    setCurrentRaceId(state: State, raceId: number | null): void {
      state.currentRaceId = raceId;
    },

    addResult(state: State, result: RaceResult): void {
      state.results.push(result);
    },

    setResults(state: State, results: RaceResult[]): void {
      state.results = results;
    },

    setIsGenerated(state: State, isGenerated: boolean): void {
      state.isGenerated = isGenerated;
    },

    setProgramStarted(state: State, programStarted: boolean): void {
      state.programStarted = programStarted;
    },

    setProgramFinished(state: State, programFinished: boolean): void {
      state.programFinished = programFinished;
    },

    nextRace(state: State): void {
      const currentRace = state.races.find((race: Race) => race.id === state.currentRaceId);
      const isNextRaceExists = state.races.some((race: Race) => race.id === (state.currentRaceId ?? 0) + 1);

      state.isRacing = false;
      if (currentRace && isNextRaceExists && state.currentRaceId !== null) {
        state.currentRaceId = state.currentRaceId + 1;
      } else {
        state.currentRaceId = null;
      }
      state.isRacing = true;
    },
  },
  actions: {
    initializeHorses({ commit }): void {
      const shuffledNames = [...horseNames].sort(() => 0.5 - Math.random());
      const shuffledColors = [...horseColors].sort(() => 0.5 - Math.random());

      const horses: Horse[] = shuffledNames.slice(0, 20).map((name, index) => ({
        id: index + 1,
        name,
        color: shuffledColors[index],
        condition: Math.floor(Math.random() * 100) + 1,
      }));
      commit('setHorses', horses);
    },

    generateProgram({ dispatch, commit, state }): void {
      commit('setRaces', []);
      commit('setResults', []);
      commit('setIsRacing', false);
      commit('setCurrentRaceId', null);
      commit('setProgramStarted', false);
      commit('setProgramFinished', false);

      dispatch('initializeHorses');

      raceLengths.forEach((length, index) => {
        const raceName = `Race ${index + 1}`;
        const raceDistance = length;
        const participants = state.horses
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);

        const race: Race = {
          id: state.races.length + 1,
          name: raceName,
          distance: raceDistance,
          participants: participants,
        };

        commit('addRace', race);
        commit('setIsGenerated', true);
      });

      if (!state.currentRaceId && state.races.length > 0) {
        commit('setCurrentRaceId', state.races[0].id);
      }
    },

    startProgram({ commit, state }): void {
      if (!state.isGenerated) {
        return;
      }

      if (!state.currentRaceId && state.races.length > 0) {
        commit('setCurrentRaceId', state.races[0].id);
      }

      commit('setProgramStarted', true);
      commit('setIsRacing', true);
    },
  },
  getters: {
    getHorseById: (state: State) => (id: number): Horse | undefined => {
      return state.horses.find(horse => horse.id === id);
    },

    getRaceById: (state: State) => (id: number): Race | undefined => {
      return state.races.find(race => race.id === id);
    },

    getResultByRaceId: (state: State) => (raceId: number): RaceResult | undefined => {
      return state.results.find(result => result.raceId === raceId);
    },
  },
});

export default store;