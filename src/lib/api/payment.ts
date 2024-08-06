import axios from "$lib/network/axios";
import Alert from "$lib/elements/Alert";

export default {
  async paymentInit(data: any) {
    try {
      const res = await axios.post(`/payment/fiat/bitolo`, { ...data });
      return [res.data.data];
    } catch (error: any) {
      Alert.error(error.response.data.response);
      return [null, error];
    }
  },
  async paymentInitCentPays(data: any) {
    try {
      const res = await axios.post(`/payment/fiat/centpays`, { ...data });
      return [res.data.data];
    } catch (error: any) {
      Alert.error(error.response.data.response);
      return [null, error];
    }
  },
  async paymentInitAifory(data: any) {
    try {
      const res = await axios.post(`/payment/fiat/aifory/trusted`, { ...data });
      return [res.data];
    } catch (error: any) {
      Alert.error(error.response.data.response);
      return [null, error];
    }
  },
  async paymentInitGate(data: any) {
    try {
      const res = await axios.post(`/payment/fiat/gate/init`, { ...data });
      return [res.data];
    } catch (error: any) {
      Alert.error(error.response.data.response);
      return [null, error];
    }
  },
  async paymentInitOmno(data: any) {
    try {
      const res = await axios.post(`/payment/fiat/omno/init`, { ...data });
      return [res.data];
    } catch (error: any) {
      Alert.error(error.response.data.response);
      return [null, error];
    }
  },
  async paymentInitPO(data: any) {
    try {
      const res = await axios.post(`/payment/fiat/payop/init`, { ...data });
      return [res.data];
    } catch (error: any) {
      Alert.error(error.response.data.response);
      return [null, error];
    }
  },
  async paymentInitPayAgency(data: any) {
    try {
      const res = await axios.post(`/payment/fiat/pay-agency/init`, {
        ...data,
      });
      return [res.data];
    } catch (error: any) {
      Alert.error(error.response.data.response);
      return [null, error];
    }
  },
};
