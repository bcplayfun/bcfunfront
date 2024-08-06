<script lang="ts">
  import "$lib/styles/root.scss";
  import AlertsWrapper from "$lib/elements/Alert/AlertsWrapper.svelte";
  import Modal, { closeModal } from "$lib/elements/Modal";
  import Header from "$lib/elements/Header";
  import Footer from "./Footer.svelte";
  import { goto } from "$app/navigation";
  import { navigating, page } from "$app/stores";
  import { openModal } from "$lib/elements/Modal";
  import { cfIpCountry, isLoggedIn, player } from "$lib/stores/player";
  import { writable } from "svelte/store";
  import api from "$lib/api";
  import { onMount } from "svelte";
  import { currencies } from "$lib/stores/static";
  import BottomMenu from "./BottomMenu.svelte";
  import third_parties from "$lib/third_parties";
  import NotificationWrapper, {
    createNotificationMessages,
    type Notification,
  } from "$lib/elements/Notification";
  import { providers } from "$lib/stores/providers";
  import { favoriteGames } from "$lib/stores/games";
  import { browser } from "$app/environment";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { comingTransaction } from "$lib/stores/payments";
  import ProfileWrapper from "$lib/elements/Profile/ProfileWrapper.svelte";
  import { isProfileVisible } from "$lib/stores/website";
  import { langStore } from "$lib/utils/page";
  import Cookies from "js-cookie";
  import Register from "$lib/elements/Modals/Register";
  import Alert from "$lib/elements/Alert";
  import { vipTypes } from "$lib/utils/vip";

  isLoggedIn.set($page.data.isLoggedIn);
  cfIpCountry.set($page.data.cfIpCountry);
  langStore.set($page.data.i18n.locale);

  // redep5
  const errorUrl = `/error`;
  const successUrl = `/success`;
  const emailUrl = `/email`;
  const gameUrl = `/game/`;
  const vipUrl = `/vip`;
  // const profileUrl = `/user/profile`;

  const savedPath = writable("");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  });

  $: if (browser && $navigating) {
    isProfileVisible.set(false);
    closeModal();
  }

  $: {
    if (
      browser &&
      ($navigating?.to?.url.pathname.startsWith("/user") ||
        $navigating?.to?.url.pathname.startsWith("/game")) &&
      !$isLoggedIn
    ) {
      savedPath.set($navigating?.to?.url.pathname);
      goto($navigating?.from?.url.pathname! + $navigating?.from?.url.search, {
        replaceState: false,
        noScroll: true,
      });
      openModal(
        Register,
        "Sign up",
        {
          onSuccess() {
            goto($savedPath);
          },
        },
        { type: "new" }
      );
    }
  }

  $: if (
    browser &&
    $page.url.searchParams.get("status") &&
    $page.url.searchParams.get("message")
  ) {
    if (
      $page.url.searchParams.get("status") === "canceled" ||
      $page.url.searchParams.get("status") === "failed"
    ) {
      Alert.error($page.url.searchParams.get("message")?.toString()!);
    }
    if ($page.url.searchParams.get("status") === "success") {
      Alert.success($page.url.searchParams.get("message")?.toString()!);
    }
  }

  $: if (
    browser &&
    !$isLoggedIn &&
    $page.url.searchParams.get("loginRedirectTo")
  ) {
    openModal(
      Register,
      "Sign up",
      {
        onSuccess() {
          goto(`/${$page.url.searchParams.get("loginRedirectTo")!.slice(1)}`);
        },
      },
      { type: "new" }
    );
  }

  $: if (browser && $page.url.searchParams.get("chat")) {
    third_parties.intercom.setLauncherVisible(true);
    third_parties.intercom.openChat();
  }

  $: if (
    browser &&
    $isLoggedIn &&
    $page.url.searchParams.get("loginRedirectTo")
  ) {
    goto(`/${$page.url.searchParams.get("loginRedirectTo")!.slice(1)}`);
  }

  onMount(async () => {
    if ($page.url.searchParams.get("btag")) {
      Cookies.set("btag", $page.url.searchParams.get("btag")!);
    }
    const [curr] = await api.staticData.currenciesList();
    const [prds] = await api.staticData.providersList();
    currencies.set(curr);
    providers.set(prds);
    isLoggedIn.subscribe(async (_isLoggedIn) => {
      if (_isLoggedIn) {
        await api.players.info();
        await showUnseenNotifications();
        api.games.getFavGames({ page: 1, limit: 100 }).then(([games]) => {
          favoriteGames.set(games);
        });
        api.levels.list().then(([types]) => {
          vipTypes.set(types);
        });
        third_parties.intercom.setUser({
          name: $player.username,
          user_hash: $player.intercom_hash,
          user_id: $player.id.toString(),
        });

        await getHistory();
      }
    });
  });

  async function showUnseenNotifications() {
    const [notifications, _] = await api.players.unseenNotifications();
    if (notifications && notifications.length > 0) {
      notifications.map((notification: Notification) => {
        createNotificationMessages(notification);
        api.players.notificationSeen(notification.notification_id);
      });
    }
  }

  async function getHistory() {
    const [res, err] = await api.players.getDeposits();
    if (!err) {
      if (res.find((tr: any) => tr.status == "not_confirmed")) {
        comingTransaction.set(true);
      }
    }
  }

  $: if (browser) {
    third_parties.intercom.initialize();
  }
</script>

<svelte:head>
  <meta
    name="twitter:title"
    content="BCFUN | Immersive Online Gaming Experience"
  />
  <!-- <meta name="twitter:description" content="Cool description" /> -->
  <meta
    property="og:title"
    content="BCFUN | Immersive Online Gaming Experience"
  />
  <!-- <meta
    property="og:description"
    content="Offering tour packages for individuals or groups."
  /> -->
  <meta
    name="twitter:image"
    content={"https://BCFUN.ams3.digitaloceanspaces.com/uploads/files/3jLIO2yrVlmsqXRI8iZIOiJDnNKBZhICWQbnENJp.png"}
  />
  <meta
    property="og:image"
    content={"https://BCFUN.ams3.digitaloceanspaces.com/uploads/files/3jLIO2yrVlmsqXRI8iZIOiJDnNKBZhICWQbnENJp.png"}
  />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<!-- {#if matches && $page.data.location.ip != "81.78.46.227" && $page.data.location.ip != "82.31.188.138" && $page.data.location.ip != "46.64.209.93"}
  <div class="unavailable">
    <img src={logo} alt="BCFUN logo" style:width="150px" />
    <h1>This Website Is Not Available For UK Users</h1>
  </div>
{:else} -->
<QueryClientProvider client={queryClient}>
  {#if !$page.url.pathname.includes(errorUrl) && !$page.url.pathname.includes(successUrl) && !$page.url.pathname.includes(emailUrl) && !$page.url.pathname.includes(vipUrl)}
    <div class="app">
      <Header />

      <main class:game={$page.url.pathname.includes(gameUrl)}>
        <slot />
      </main>

      {#if !$page.url.pathname.includes(gameUrl)}
        <Footer />
      {/if}
      <BottomMenu />

      <AlertsWrapper />
      <NotificationWrapper />
    </div>
  {:else}
    <main>
      <slot />
    </main>
  {/if}
  <ProfileWrapper />
  <Modal />
</QueryClientProvider>

<!-- {/if} -->

<style lang="scss">
  .unavailable {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 0 20px;
    text-align: center;
  }
  .app {
    height: 100%;
    display: flex;
    flex-direction: column;
    @media (max-width: 992px) {
      padding-bottom: 69.5px;
    }
    main {
      width: 100%;
      flex: 1 0 0;
      padding-top: 82px;
      display: flex;
      flex-direction: column;
      transition: 0.2s ease-in-out;

      // padding-left: 65px;
      /* &.shrink {
        width: calc(100% - 350px);
      } */
      &.game {
        flex: 1 0 0;
        display: initial;
        min-height: initial;
        padding-top: 50px;
        padding-left: 0;
      }
      @media (max-width: 992px) {
        padding-top: 80px;
        padding-left: 0;
      }
    }
  }
</style>
