import axios from "$lib/network/axios";
import Alert from "$lib/elements/Alert";

export default {
  async bonuses() {
    try {
      const res = await axios.get(`/player/active/bonuses`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async activate(id: number, confirm_cancel = 0) {
    try {
      const res = await axios.post(
        `/player/bonus/activation?bonus_id=${id}&confirm_cancel=${confirm_cancel}`
      );
      return [res];
    } catch (error: any) {
      Alert.error(error?.response?.data?.response?.message);
      return [null, error];
    }
  },
  async bonusBalance() {
    try {
      const res = await axios.get(`/player/bonus/balance`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async selectBonusBalance() {
    try {
      const res = await axios.post(`/player/set/bonus`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async getBonusTypesByGroup(group: string) {
    try {
      const res = await axios.get(`bonus-groups/${group}`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
};
