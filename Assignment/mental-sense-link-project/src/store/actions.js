export default {
    openLoginModal({ commit }) {
        commit('toggleLoginModal', true);
    },
    closeLoginModal({ commit }) {
        commit('toggleLoginModal', false);
    },
    grantAuthorization({ commit }) {
        commit('grantAuthorization', true);
    },
    canCelAuthorization({ commit }) {
        commit('grantAuthorization', false);
    }
}