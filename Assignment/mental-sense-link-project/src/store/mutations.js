export default {
    // Handle login modal state
    toggleLoginModal(state, payload) {
        state.isLoginModalOpen = payload;
    },
    // Handle Signup modal state
    toggleSignUpModal(state, payload) {
        state.isSignUpModalOpen = payload;
    },
    // Handle Forgot Password modal state
    toggleForgotPasswordModal(state, payload) {
        state.isForgotPasswordModalOpen = payload;
    },
    // Handle Redirect Path
    updateRedirectPath(state, payload) {
        state.redirectPath = payload;
    },
    // Handle Toast Configure
    updateToastConfig(state, payload) {
        state.toastConfig = payload;
    },
    // Handle Confirm Configure
    updateConfirmConfig(state, payload) {
        state.confirmConfig = payload;
    }
}