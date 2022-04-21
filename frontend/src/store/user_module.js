import {userService} from "@/services/user.service";

const state = () => ({
    registered: {
        message: '',
        success: false,
    },
    loggedIn: {
        message: '',
        success: false,
    },
});

const getters = {
    isRegistered(state) {
        return state.registered;
    }
};

const actions = {
    registerReset({ commit }){
        commit('registerReset');
    },

    async register({ commit }, user){
        const res = await userService.register(user);
        if (res.success) {
            commit('registerSuccess');
        }
        else {
            commit('registerFailure');
        }
    },

    async login({commit}, user){
        const res = await userService.login(user);
        if (res.success) {
            commit('loginSuccess');
            console.log("Login SUCCESSFULLY");
        }
        else {
            commit('loginFailure');
            console.log("Login UNSUCESSFULLY");
        }
    }
};

const mutations = {
    registerSuccess(state) {
        state.registered.success = true;
        state.registered.message = 'Register successfully !';
    },

    registerFailure(state) {
        state.registered.success = false;
        state.registered.message = 'Register unsuccessfully !';
    },

    registerReset(state) {
        state.registered.success = false;
        state.registered.message = '';
    },

    loginSuccess(state) {
        state.loggedIn.success = true;
        state.loggedIn.message = 'Register successfully !';
    },

    loginFailure(state) {
        state.loggedIn.success = false;
        state.loggedIn.message = 'Register unsuccessfully !';
    },

    loginReset(state) {
        state.loggedIn.success = false;
        state.loggedIn.message = '';
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};