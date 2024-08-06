import axios from "$lib/network/axios";
import Alert from "$lib/elements/Alert";

export default {
  async fileAdd(data: any) {
    try {
      const res = await axios.post(`/file/add`, data);
      return [res.data];
    } catch (error: any) {
      // Alert.error(error);
      return [null, error];
    }
  },
};
