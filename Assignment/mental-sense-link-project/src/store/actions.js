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
    cancelAuthorization({ commit }) {
        commit('grantAuthorization', false);
    }
}