const setupAxiosInterceptors = (store, router, axiosInstance) => {
    // create an interceptor to add token to requests towards the API.
    axiosInstance.interceptors.request.use(config => {
        const token = store.state.token;
        if(token){
            config.headers['x-access-token'] = token
        }else{
            delete config.headers['x-access-token'] // remove token from default headers if we are logged out or no token exists in state
        }
        return config;
    }, err => {
        return Promise.reject(err);
    });

    axiosInstance.interceptors.response.use(response => {
        return response;
    }, err => {
        if(err.response && err.response.status === 401){
            return store.dispatch('logout').then(()=>{
                router.push({name: 'login'});
            });
        }else{
            return Promise.reject(err);
        }

    });
}
module.exports = {
    setupAxiosInterceptors
}