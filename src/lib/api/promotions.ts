import axios from "$lib/network/axios";
import Alert from "$lib/elements/Alert";

export default {
  async promotionsList() {
    try {
      const res = await axios.get(`/promotion/list`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
};
