<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import Alert from "$lib/elements/Alert";
  import Button from "$lib/elements/Button";
  import Dropdown from "$lib/elements/Dropdown";
  import { isLoggedIn } from "$lib/stores/player";
  import { isProfileVisible } from "$lib/stores/website";
  import dayjs from "dayjs";
  import Cookies from "js-cookie";

  let isShow = false;
  let loading = false;
  let date: any = null;
  function generateToDate(val: string) {
    if (val === "1 Day") {
      date = dayjs().add(1, "day").format("YYYY-MM-DD HH:mm:ss");
    } else if (val === "1 Week") {
      date = dayjs().add(7, "day").format("YYYY-MM-DD HH:mm:ss");
    } else if (val === "1 Month") {
      date = dayjs().add(1, "month").format("YYYY-MM-DD HH:mm:ss");
    } else if (val === "1 Year") {
      date = dayjs().add(1, "year").format("YYYY-MM-DD HH:mm:ss");
    } else if (val === "Permanently") {
      date = dayjs().add(50, "year").format("YYYY-MM-DD HH:mm:ss");
    }
  }

  async function submit() {
    if (!date) {
      Alert.error("Please choose option");
      return;
    }
    loading = true;
    const [_s, errorS] = await api.auth.selfBlock(date);
    if (errorS) {
      loading = false;
      Alert.error("Something went wrong, please contact support");
      return;
    }
    const [_, error] = await api.auth.logout();
    if (!error) {
      isProfileVisible.set(false);
      Cookies.remove("auth");
      isLoggedIn.set(false);
      goto("/");
    }
  }
</script>

<div class="block">
  Set your limits, and play responsibly.In case you want to block your account,
  please contact to our support. Enjoy gaming responsibly.
  <!-- <Button
    transform="capitalize"
    background="transparent"
    on:click={() => {
      isShow = !isShow;
    }}>{isShow ? 'Hide' : "Show"}</Button
  > -->
</div>

<!-- {#if isShow}
  <div class="d-flex flex-column items-center justify-center">
    <div class="mt-10" />
    <Dropdown
      items={["1 Day", "1 Week", "1 Month", "1 Year", "Permanently"]}
      placeholder="Select option"
      value=""
      on:select={({ detail }) => generateToDate(detail)}
    />
    <div class="mt-10" />
    <Button
      {loading}
      on:click={() => {
        submit();
      }}>{'Submit'}</Button
    >
  </div>
{/if} -->

<style lang="scss">
  .block {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 30px 0 0;
    background-color: #232c3b;
    color: #9c9cab;
    padding: 10px;
    gap: 10px;
  }
</style>
