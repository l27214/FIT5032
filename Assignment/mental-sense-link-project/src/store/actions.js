export default {
    // Handle Login Modal
    openLoginModal({ commit }) {
        commit('toggleLoginModal', true);
    },
    closeLoginModal({ commit }) {
        commit('toggleLoginModal', false);
    },
    // Handle Signup Modal
    openSignUpModal({ commit }) {
        commit('toggleSignUpModal', true);
    },
    closeSignUpModal({ commit }) {
        commit('toggleSignUpModal', false);
    },
    // Handle User Information
    updateUser({ commit }, user) {
        commit('setUser', user);
    },
    logout({ commit }) {
        commit('clearUser');
    }
}