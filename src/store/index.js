import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLoggedIn: !!localStorage.getItem('isLoggedIn'),
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
        token: localStorage.getItem('token')  || null,
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

        setUser(state, user){
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        
        setToken(state, token){
            state.token = token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['x-access-token'] = token;
        }

    },

    actions:{
        login(context, data) {
            context.commit("setIsLoggedIn", true);
            context.commit("setUser", data.user);
            context.commit('setToken', data.token);
        },

        logout(context){
            context.commit("setIsLoggedIn", false);
            context.commit("setUser", {});
            context.commit("setToken", null);
        }
    }
});

export default store;