export const mutations = {
  SET_USER_LANG(state, payload) {
    state.setUserLang = payload;
  },
};

export const getters = {
  getLanguage: (state) => state.setUserLang,
};

export const state = () => ({
  setUserLang: '',
});
