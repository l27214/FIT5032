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

    // Handle Redirect Path
    setRedirectPath({ commit }, path) {
        commit('updateRedirectPath', path);
    },

    // Handle Toast Configuration
    setTriggerToast({ commit }, toastConfig) {
        commit('updateToastConfig', toastConfig);
    },

    // Handle Confirm Configuration
    setTriggerConfirm({ commit }, confirmConfig) {
        commit('updateConfirmConfig', confirmConfig);
    },
}