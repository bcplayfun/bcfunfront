import axios from "$lib/network/axios";
import Alert from "$lib/elements/Alert";
import { player } from "$lib/stores/player";
import { isClient } from "$lib/utils/page";

export default {
  async info() {
    try {
      const res = await axios.get(`/player/info`);
      player.update((_player) => ({ ..._player, ...res.data }));
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async setCurrency(id: number) {
    try {
      const res = await axios.post(`/player/set/currency?currency_id=${id}`);
      player.update((_player) => ({ ..._player, ...res.data }));
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async updatePlayer(data: any) {
    try {
      const res = await axios.post(`/player/update`, data);
      // player.update((_player) => ({ ..._player, ...res.data }));
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async sendEmailVerify() {
    try {
      const res = await axios.post(`/player/send/confirm/email`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async confirmEmailVerify(code: string) {
    try {
      const res = await axios.post(`/player/confirm/email`, { code });
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async notificationSeen(notification_id: number) {
    try {
      const res = await axios.post(
        `/player/notification/mark/readable/${notification_id}`
      );
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async unseenNotifications() {
    try {
      const res = await axios.get(`/player/notification/list`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async addFavoriteGame(id: number) {
    try {
      const res = await axios.post(`/player/favorite/add/${id}`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async removeFavoriteGame(id: number) {
    try {
      const res = await axios.post(`/player/favorite/remove/${id}`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async addKycFile(data: any) {
    try {
      const res = await axios.post(`/player/kyc/add`, data);
      return [res.data];
    } catch (error: any) {
      // Alert.error(error);
      return [null, error];
    }
  },
  async getKycInfo() {
    try {
      const res = await axios.get(`/player/kyc/get`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async withdrawRequest(data: any) {
    try {
      const res = await axios.post(`/player/withdraw/add`, data);
      return [res.data];
    } catch (error: any) {
      Alert.error(
        error?.response?.data?.response ||
          "Something went wrong, contact support"
      );
      return [null, error];
    }
  },
  async lastPlayedGames() {
    try {
      let is_mobile: number;
      if (isClient && window.innerWidth > 992) {
        is_mobile = 0; //desktop
      } else {
        is_mobile = 1; //mobile
      }
      const res = await axios.get(`/player/last-played?is_mobile=${is_mobile}`);
      return [res.data];
    } catch (error: any) {
      // Alert.error(error);
      return [null, error];
    }
  },
  async getDeposits(limit = 10) {
    try {
      const res = await axios.get(`/player/deposits?limit=${limit}`);
      return [res.data];
    } catch (error: any) {
      // Alert.error(error);
      return [null, error];
    }
  },
  async getWithdraws(limit = 20) {
    try {
      const res = await axios.get(`/player/withdraw/list?limit=${limit}`);
      return [res.data];
    } catch (error: any) {
      // Alert.error(error);
      return [null, error];
    }
  },
  async sendFeedback(message: string) {
    try {
      const res = await axios.post(`/feedback/send`, { message });
      return [res.data];
    } catch (error: any) {
      // Alert.error(error);
      return [null, error];
    }
  },
  async setAddress(currency: string) {
    try {
      const res = await axios.post(`player/crypto/address/set/${currency}`);
      return [res.data];
    } catch (error: any) {
      Alert.error(
        error?.response?.data?.response ||
          "Something went wrong, contact support"
      );
      return [null, error];
    }
  },
  async cancelWithdraw(id: string) {
    try {
      const res = await axios.post(`player/withdraw/cancel/${id}`);
      return [res.data];
    } catch (error: any) {
      Alert.error("Something went wrong, contact support");
      return [null, error];
    }
  },
  async activatePromoCode(code: string) {
    try {
      const res = await axios.post(`player/promo-code/activate/${code}`);
      return [res.data];
    } catch (error: any) {
      Alert.error(
        error?.response?.data?.response ||
          "Something went wrong, contact support"
      );
      return [null, error];
    }
  },
  async cancelBonusBalanceStatus() {
    try {
      const res = await axios.post(`player/cancel-bonus-balance-status`);
      return [res.data];
    } catch (error: any) {
      // Alert.error(
      //   error?.response?.data?.response ||
      //     "Something went wrong, contact support"
      // );
      return [null, error];
    }
  },
};
