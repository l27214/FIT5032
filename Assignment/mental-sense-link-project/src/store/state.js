export default {
    isLoginModalOpen: false,
    isSignUpModalOpen: false,
    user: JSON.parse(sessionStorage.getItem('loginUserInfo')) || null,
}