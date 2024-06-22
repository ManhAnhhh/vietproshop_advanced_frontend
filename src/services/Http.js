import axios from "axios";
import { loggedOut } from "../redux-setup/reducers/auth";
import { jwtDecode } from "jwt-decode";
import { BASE_API } from "../shared/constants/app";
import { store } from "../redux-setup/store";
const Http = axios.create({
    baseURL: BASE_API,
});

Http.interceptors.request.use(
    function (config) {
        const Auth = store.getState().Auth;
        const token = Auth.login.currentCustomer?.accessToken;
        if(token) {
            const decoded = jwtDecode(token);
            if (decoded.exp < new Date() / 1000) {
                store.dispatch(loggedOut());
            }
        }
    
        // Do something before request is sent
        config.headers["token"] = `Bearer ${token}`;
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default Http;
