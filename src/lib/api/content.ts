import axios from "$lib/network/axios";
import Alert from "$lib/elements/Alert";

export default {
  async contentByGroupName(name: string, lang: string = "en") {
    try {
      const res = await axios.get(
        `/content/list?lang=${lang}&group_name=${name}`
      );
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
};
