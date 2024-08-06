import axios from "$lib/network/axios";
import Alert from "$lib/elements/Alert";

export default {
  async list() {
    try {
      const res = await axios.get(`/level/type/list`);
      return [res.data.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
};
