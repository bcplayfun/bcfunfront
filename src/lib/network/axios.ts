import { isLoggedIn } from "$lib/stores/player";
import Cookies from "js-cookie";
import axios, { type AxiosError, type AxiosResponse } from "axios";

import { get } from "svelte/store";
import { goto } from "$app/navigation";
import Alert from "$lib/elements/Alert";

const baseURL = import.meta.env.BC_API_URL;
// axios.interceptors.request.use(
//   (config) => {
//     config.baseURL = import.meta.env.API_URL;
//     console.log(import.meta.env.API_URL);
//     const token = localStorage.getItem("authToken");
// if (token) {
//   config.headers.Authorization = `Bearer ${token}`;
// }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

function createInterceptorConfig(url: string) {
  const urlInstance = axios.create({
    baseURL: `/${url}`,
  });

  urlInstance.interceptors.request.use(
    (config: any) => {
      const token: any = Cookies.get("auth");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      let URL = `${baseURL}/${url}/`;
      return {
        ...config,
        baseURL: URL,
        headers: {
          ...config.headers,
          accept: "application/json",
        },
      };
    },
    (error) => Promise.reject(error)
  );
  urlInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
  return urlInstance;
}

// /redep
export default createInterceptorConfig("api");

function responseInterceptor(response: AxiosResponse<any, any>) {
  let _isLoggedIn = false;
  if (!Cookies.get("auth")) {
    _isLoggedIn = false;
  } else {
    const auth: string | undefined = Cookies.get("auth");
    if (typeof auth === "string") {
      _isLoggedIn = true;
    }
  }
  if (_isLoggedIn != get(isLoggedIn)) {
    isLoggedIn.set(_isLoggedIn);
  }
  return response;
}

function errorInterceptor(error: AxiosError) {
  if (error && error?.response?.status) {
    if (error?.response?.status >= 500) {
      // console.error(error);
    }
    if (error?.response?.status == 401) {
      Alert.error("unauthorized");
      Cookies.remove("auth");
      isLoggedIn.set(false);
      goto("/");
    }
  }

  return Promise.reject(error);
}
