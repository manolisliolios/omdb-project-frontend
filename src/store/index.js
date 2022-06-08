import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLoggedIn: !!localStorage.getItem('isLoggedIn'),
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
        token: localStorage.getItem('token')  || null,
        count: 0,
        bookmarks: []
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
        },

        setBookmarks(state, bookmarks){
            state.bookmarks = bookmarks;
        },

        addBookmark(state, bookmark){
            state.bookmarks.push(bookmark);
        },

        removeBookmark(state, bookmark){
            state.bookmarks = state.bookmarks.filter(x => x !== bookmark);
        }

    },

    actions:{

        init(context){
console.log('fetching');
            if(!context.state.isLoggedIn) return;
            return context.dispatch('fetchUserBookmarks');
        },

        fetchUserBookmarks(context){
            axios.get(process.env.VUE_APP_API_URL + '/bookmarks', {headers:{'x-access-token': context.state.token}}).then(res=>{
                return context.dispatch('setBookmarks', res.data);
            }).catch(()=>{});
        },

        setBookmarks(context, data){
            context.commit("setBookmarks", data);
        },

        addBookmark(context, bookmark){
          context.commit('addBookmark', bookmark);
        },

        removeBookmark(context, bookmark){
            context.commit('removeBookmark', bookmark);
        },

        login(context, data) {
            context.commit("setIsLoggedIn", true);
            context.commit("setUser", data.user);
            context.commit('setToken', data.token);
            return context.dispatch('fetchUserBookmarks');
        },

        logout(context){
            context.commit("setIsLoggedIn", false);
            context.commit("setUser", {});
            context.commit("setToken", null);
            context.commit("setBookmarks", []);
        }
    }
});

export default store;