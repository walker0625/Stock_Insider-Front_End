import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    stockTradeInfos: [],
    statisticsInfos: [],
    selectedTraderInfos: [],
  },

  getters: {
    getStatisticsInfosCnt: (state) => {
      return state.statisticsInfos.length;
    },
    getSelectedTraderInfosCnt: (state) => {
      return state.selectedTraderInfos.length;
    },
  },

  mutations: {
    setStockTradeInfos: (state, payload) => {
      state.stockTradeInfos = payload;
    },

    setStatisticsInfos: (state, payload) => {
      state.statisticsInfos = payload;
    },

    setSelectedTraderInfos: (state, payload) => {
      state.selectedTraderInfos = payload.reverse();
    },
  },

  // 비동기 실행의 경우 / 비즈니스 로직 처리(commit 이전의 중복 검사 등)
  actions: {
    setStatisticsInfos: ({ commit }, payload) => {
      // 여기에 비즈니스 로직들 처리 후
      commit("setStatisticsInfos", payload);
    },
  },
});
