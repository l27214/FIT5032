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
    // Handle Authorization Function
    grantAuthorization({ commit }) {
        commit('grantAuthorization', true);
    },
    cancelAuthorization({ commit }) {
        commit('grantAuthorization', false);
    },
}