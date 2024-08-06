import Alert from "$lib/elements/Alert";
import { closeAllModals } from "$lib/elements/Modal";
import axios from "$lib/network/axios";
import { clearPlayer, isLoggedIn, player } from "$lib/stores/player";
import type {
  LoginForm,
  RegistrationForm,
  ChangePassword,
} from "$lib/types/player";
import Cookies from "js-cookie";

export default {
  async login(data: LoginForm) {
    try {
      const res = await axios.post(`/player/login`, { ...data });
      if (res.data.token) {
        Cookies.set("auth", res.data.token);
        isLoggedIn.set(true);
        closeAllModals();
      }
      return [res];
    } catch (error: any) {
      if (error?.response?.status === 406) {
        Alert.error(error?.response?.data?.message);
      } else {
        Alert.error("Invalid credentials.");
      }
      return [null, error];
    }
  },
  async register(
    data: RegistrationForm,
    btag: string | null,
    currency_id: number | undefined,
    bonus_type_id: number | undefined
  ) {
    try {
      const res = await axios.post(`/player/register`, {
        ...data,
        b_tag: btag,
        selected_currency_id: currency_id,
        bonus_type_id: bonus_type_id,
      });
      return [res.data];
    } catch (error: any) {
      Alert.error(error.response.data.message);
      return [null, error];
    }
  },
  async logout() {
    try {
      const res = await axios.post(`/player/logout`);
      clearPlayer();
      return [res.data];
    } catch (error: any) {
      Alert.error(error.response.data.message);
      return [null, error];
    }
  },
  async changePassword(data: ChangePassword) {
    try {
      const res = await axios.post(`/player/password/change`, data);
      return [res.data];
    } catch (error: any) {
      Alert.error(error.response.data.message);
      return [null, error];
    }
  },
  async requestNewPassword(data: any) {
    try {
      const res = await axios.post(`/player/password/send`, data);
      return [res.data];
    } catch (error: any) {
      Alert.error(error.response.data.message);
      return [null, error];
    }
  },
  async forgotPassword(data: any) {
    try {
      const res = await axios.post(`/player/password/forgot`, data);
      return [res.data];
    } catch (error: any) {
      Alert.error(error.response.data.message || error.response.data.response);
      return [null, error];
    }
  },
  async checkEmailUsername(val: string) {
    try {
      const res = await axios.get(`player/check/email-username/${val}`);
      return [res.data.response];
    } catch (error: any) {
      Alert.error(error.response.data.message || error.response.data.response);
      return [null, error];
    }
  },
  async sendMessage(message: string) {
    try {
      const res = await axios.post(`chat/send`, { message });
      return [res.data.response];
    } catch (error: any) {
      Alert.error(error.response.data.message || error.response.data.response);
      return [null, error];
    }
  },
  async messages() {
    try {
      const res = await axios.get(`chat/list`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error.response.data.message || error.response.data.response);
      return [null, error];
    }
  },
  async selfBlock(val: string) {
    try {
      const res = await axios.post(`player/block?banned_to=${val}`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error.response.data.message || error.response.data.response);
      return [null, error];
    }
  },
};
