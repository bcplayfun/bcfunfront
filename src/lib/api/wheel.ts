import axios from "$lib/network/axios";
import Alert from "$lib/elements/Alert";

export default {
  async spin(wheel_type_id: number) {
    try {
      const res = await axios.post(`/wheel/spin`, {
        wheel_type_id: wheel_type_id,
      });
      return [res.data];
    } catch (error: any) {
      Alert.error(error?.response?.data?.message || "Something went wrong");
      return [null, error];
    }
  },
  async wheelSegments() {
    try {
      const res = await axios.get(`/wheels`);
      return [res.data];
    } catch (error: any) {
      Alert.error(error);
      return [null, error];
    }
  },
};
