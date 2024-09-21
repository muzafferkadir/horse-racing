import { createStore } from 'vuex';

interface Horse {
  id: number;
  color: string;
  condition: number;
  name: string;
}

interface Race {
  id: number;
  name: string;
  distance: number;
  participants: Horse[];
}

interface RaceResult {
  raceId: number;
  positions: { horseId: number; position: number }[];
}

interface State {
  horses: Horse[];
  races: Race[];
  results: RaceResult[];
  isRacing: boolean;
  currentRaceId: number | null;
  isGenerated: boolean;
  programStarted: boolean;
}

const horseNames = [
  'Gülbatur', 'Şahbatur', 'Kırlangıç', 'Alkaranlık', 'Doru', 'Bozkır', 'Yıldırım', 'Demirkır', 'Şahmeran',
  'Ateşkanat', 'Karabey', 'Yekta', 'Aygırhan', 'Taykut', 'Akıncı', 'Kasırga', 'Şahruh', 'Hanbatur', 'Turan', 'Berksoy'
];

const horseColors = [
  '#160404', '#2a2a2a', '#5d3a37', '#4d4d4d', '#570C00', '#979797', '#751700', '#836969', '#942700', '#A33100',
  '#B33B00', '#c27b00', '#D15400', '#76541e', '#F07000', '#dcbf1e', '#cac7c3', '#efe55e', '#FFAB2E', '#ffa304'
];

const raceLengths = [1200, 1400, 1600, 1800, 2000, 2200];

const store = createStore<State>({
  state: {
    horses: [],
    races: [],
    results: [],
    isRacing: false,
    currentRaceId: null,
    isGenerated: false,
    programStarted: false,
  },
  mutations: {
    setHorses(state, horses: Horse[]) {
      state.horses = horses;
    },

    setRaces(state, races: Race[]) {
      state.races = races;
    },

    addRace(state, race: Race) {
      state.races.push(race);
    },

    setIsRacing(state, isRacing: boolean) {
      state.isRacing = isRacing;
    },

    setCurrentRaceId(state, raceId: number | null) {
      state.currentRaceId = raceId;
    },

    addResult(state, result: RaceResult) {
      state.results.push(result);
    },

    setResults(state, results: RaceResult[]) {
      state.results = results;
    },

    setIsGenerated(state, isGenerated: boolean) {
      state.isGenerated = isGenerated;
    },

    setProgramStarted(state, programStarted: boolean) {
      state.programStarted = programStarted;
    },

    nextRace(state) {
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
    initializeHorses({ commit }) {
      const shuffledNames = [...horseNames].sort(() => 0.5 - Math.random());
      const shuffledColors = [...horseColors].sort(() => 0.5 - Math.random());

      const horses: Horse[] = shuffledNames.slice(0, 20).map((name, index) => ({
        id: index + 1,
        name,
        color: shuffledColors[index],
        condition: Math.floor(Math.random() * 21) + 80,
      }));
      commit('setHorses', horses);
    },

    generateProgram({ dispatch, commit, state }) {
      commit('setRaces', []);
      commit('setResults', []);
      commit('setIsRacing', false);
      commit('setCurrentRaceId', null);
      commit('setProgramStarted', false);

      dispatch('initializeHorses');

      raceLengths.forEach((length, index) => {
        const raceName = `Race ${index + 1}`;
        const raceDistance = length;
        const participants = state.horses
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);

        const race = {
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

    startProgram({ commit, state }) {
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
    getHorseById: (state) => (id: number) => {
      return state.horses.find(horse => horse.id === id);
    },

    getRaceById: (state) => (id: number) => {
      return state.races.find(race => race.id === id);
    },

    getResultByRaceId: (state) => (raceId: number) => {
      return state.results.find(result => result.raceId === raceId);
    },
  },
});

export default store;