export default {
    toggleLoginModal(state, payload) {
        state.isLoginModalOpen = payload;
    },
    toggleSignUpModal(state, payload) {
        state.isSignUpModalOpen = payload;
    },
    grantAuthorization(state, authorizationState) {
        state.isAuthenticated = authorizationState;
    },
}