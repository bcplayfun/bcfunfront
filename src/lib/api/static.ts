import axios from "$lib/network/axios";
import Alert from "$lib/elements/Alert";

export default {
  async currenciesList() {
    try {
      const res = await axios.get(`/currency/list`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
  async providersList() {
    try {
      const res = await axios.get(`/provider/list`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
};
