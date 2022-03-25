import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLoggedIn: !!localStorage.getItem('isLoggedIn'),
        user: localStorage.getItem('user') || {},
        userToken: null,
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        },
        setIsLoggedIn(state, value){
            state.isLoggedIn = value;
            if(!value) localStorage.removeItem('isLoggedIn');
            else localStorage.setItem('isLoggedIn', 'true');
        },

        setUser(state, value){
            state.user = value;
            localStorage.setItem('user', JSON.stringify(value));
        }

    },

    actions:{
        login(context, user) {
            user.name = "Manolis";
            context.commit("setIsLoggedIn", true);
            context.commit("setUser", user);
        },

        logout(context){
            context.commit("setIsLoggedIn", false);
            context.commit("setUser", {});
        }
    }
});

export default store;