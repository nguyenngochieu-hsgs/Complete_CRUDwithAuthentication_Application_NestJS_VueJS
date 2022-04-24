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

    userProfile: {
        id: '',
        username: '',
    },

    tasks: [],
});

const getters = {
    isRegistered(state) {
        return state.registered;
    },

    isLoggedIn(state) {
        return state.loggedIn.success;
    },

    userProfile(state) {
        return state.userProfile;
    },

    tasks(state) {
        return state.tasks;
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
        console.log("RES : ",res);
        if (res.success) {

            const userProfile = await userService.getUserProfile();
            if (userProfile.id) {
                console.log("User Profile : ", userProfile);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userProfile", JSON.stringify(userProfile));
                commit('loginSuccess', userProfile);
                console.log("Login SUCCESSFULLY");
                return true;
            }
            else{
                commit('loginFailure');
                return false;
            }
        }
        else {
            commit('loginFailure');
            console.log("Login UNSUCESSFULLY");
            return false;
        }
    },

    async getTasks({commit}) {
        const res = await userService.getTasks();
        console.log("RES: ", res);
        if (res.success) {
            commit('getTaskSuccess', res.tasks);
            return res.tasks;
        }
        else {
            commit('getTaskFailure');
            console.log("Get Task Failed");
            return null;
        }
    },

    async createTask({commit}, task) {
        const res = await userService.createTask(task);
        console.log("create task res : ", res);
        if (res.success) {
            commit('createTaskSuccess', task);
            return true;
        }
        else{
            return false;
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

    loginSuccess(state, userProfile) {
        state.loggedIn.success = true;
        state.loggedIn.message = 'Register successfully !';
        state.userProfile.username = userProfile.username;
        state.userProfile.id = userProfile.id;
    },

    loginFailure(state) {
        state.loggedIn.success = false;
        state.loggedIn.message = 'Register unsuccessfully !';
    },

    loginReset(state) {
        state.loggedIn.success = false;
        state.loggedIn.message = '';
    },

    getTaskSuccess(state, tasks) {
        state.tasks = tasks;
    },

    createTaskSuccess(state, task) {
        console.log("TASK : ",task)
        state.tasks.push(task);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};