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
}

const horseNames = [
  'Gülbatur', 'Şahbatur', 'Kırlangıç', 'Alkaranlık', 'Doru', 'Bozkır', 'Yıldırım', 'Demirkır', 'Şahmeran',
  'Ateşkanat', 'Karabey', 'Yekta', 'Aygırhan', 'Taykut', 'Akıncı', 'Kasırga', 'Şahruh', 'Hanbatur', 'Turan', 'Berksoy'
];

const horseColors = [
  '#160404', '#260402', '#380400', '#470700', '#570C00', '#661100', '#751700', '#851F00', '#942700', '#A33100',
  '#B33B00', '#C24700', '#D15400', '#E06100', '#F07000', '#FF8000', '#FF8F0F', '#FF9E1F', '#FFAB2E', '#FFB83D'
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
    }
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
    },

    startRace({ commit }, raceId: number) {
      commit('setIsRacing', true);
      commit('setCurrentRaceId', raceId);
    },

    endRace({ commit, state }, positions: { horseId: number; position: number }[]) {
      const result: RaceResult = {
        raceId: state.currentRaceId!,
        positions,
      };
      commit('addResult', result);
      commit('setIsRacing', false);
      commit('setCurrentRaceId', null);
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