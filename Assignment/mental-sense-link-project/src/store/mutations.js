export default {
    toggleLoginModal(state, payload) {
        state.isLoginModalOpen = payload;
    },
    toggleSignUpModal(state, payload) {
        state.isSignUpModalOpen = payload;
    },
    setUser(state, user) {
        state.user = user;
        sessionStorage.setItem('loginUserInfo', JSON.stringify(user));
    },
    clearUser(state) {
        state.user = null;
        sessionStorage.removeItem('loginUserInfo');
    }
}