export default {
    toggleLoginModal(state, payload) {
        state.isLoginModalOpen = payload;
    },
    grantAuthorization(state, authorizationState) {
        state.isAuthenticated = authorizationState;
    }
}