<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import * as assets from "$lib/assets/vip";
  import Button from "$lib/elements/Button";
  import LoadingOverlay from "$lib/elements/LoadingOverlay.svelte";
  import { openModal } from "$lib/elements/Modal";
  import Login from "$lib/elements/Modals/Login";
  import Register from "$lib/elements/Modals/Register";
  import { isLoggedIn, player } from "$lib/stores/player";
  import third_parties from "$lib/third_parties";
  import { calculateProgress } from "$lib/utils/vip";
  import { onMount } from "svelte";

  const data = [
    {
      img: assets.banner1,
      inner: assets.inner1,
      badge: assets.b1,
      title: "citizen",
      cashback: 6,
      weekly_freespins: 100,
      withdraw_limit_daily: false,
      wheel_ticket: "2x",
      personal_assistant: false,
      birthday_gift: false,
      special_bonuses: false,
      random_drop_cash: false,
      exclusive_trips: false,
    },
    {
      img: assets.banner2,
      inner: assets.inner2,
      badge: assets.b2,
      title: "warrior",
      cashback: 9,
      weekly_freespins: 150,
      withdraw_limit_daily: "+30%",
      wheel_ticket: "2x",
      personal_assistant: false,
      birthday_gift: false,
      special_bonuses: false,
      random_drop_cash: false,
      exclusive_trips: false,
    },
    {
      img: assets.banner3,
      inner: assets.inner3,
      badge: assets.b3,
      title: "hero",
      cashback: 10,
      weekly_freespins: 200,
      withdraw_limit_daily: "+50%",
      wheel_ticket: "3x",
      personal_assistant: false,
      birthday_gift: true,
      special_bonuses: false,
      random_drop_cash: false,
      exclusive_trips: false,
    },
    {
      img: assets.banner4,
      inner: assets.inner4,
      badge: assets.b4,
      title: "olympian",
      cashback: 13,
      weekly_freespins: 300,
      withdraw_limit_daily: "+70%",
      wheel_ticket: "4x",
      personal_assistant: true,
      birthday_gift: true,
      special_bonuses: true,
      random_drop_cash: false,
      exclusive_trips: false,
    },
    {
      img: assets.banner5,
      inner: assets.inner5,
      badge: assets.b5,
      title: "zeus",
      cashback: 25,
      weekly_freespins: 500,
      withdraw_limit_daily: "no limit",
      wheel_ticket: "5x",
      personal_assistant: true,
      birthday_gift: true,
      special_bonuses: true,
      random_drop_cash: true,
      exclusive_trips: true,
    },
  ];

  let i = 0;
  let types: any[] = [];
  let width = 0;

  let framesContainer: HTMLDivElement;
  let frames: HTMLDivElement[] = [];

  $: loading = $isLoggedIn;

  onMount(async () => {
    third_parties.intercom.setLauncherVisible(false);
    third_parties.intercom.hideChat();

    [types] = await api.levels.list();
  });

  function checkActive() {
    if (
      $player.level &&
      Object.keys($player.level).length > 0 &&
      types.length
    ) {
      if ($player.level.level_type_id === 0) {
        i = 0;
      } else {
        i = $player.level.level_type_id - 1;
      }
    }
    let activeX = frames[i].offsetLeft - frames[i].offsetWidth / 2;
    framesContainer.scrollTo(activeX, 0);

    loading = false;
  }

  $: if ($player.id && types.length && frames.length) {
    width = calculateProgress($player, types);
    checkActive();
  }

  function openSignIn() {
    openModal(Login, "Log in", {}, { type: "new" });
  }
  function openSignUp() {
    openModal(Register, "Sign up", {}, { type: "new" });
  }
</script>

<svelte:head>
  <title>BCFUN | Unleash Your Inner Zeus</title>
</svelte:head>

<LoadingOverlay {loading}>
  <div class="bg" style="background-image: url({data[i].img})">
    <div class="top container mx-auto">
      <div class="left">
        <div class="logo" on:click={() => goto("/")} on:keydown>
          <img src={assets.logo} alt="BCFUN logo" class="logo-desktop" />
        </div>
        <div class="back" on:click={() => goto("/")} on:keydown>
          <img src={assets.arrow} alt="" />
          Go back
        </div>
      </div>
    </div>
    <div class="progress">
      {#if $isLoggedIn}
        <img src={assets.progressStroke} alt="" class="stroke" />
        <img src={assets.progressBadge} alt="" class="badge" />
        <div class="line-cont">
          <div
            class="line"
            style:background-image="url({assets.progress})"
            style:width={width + "%"}
            data-percent={width.toFixed(2) + "%"}
            data-points={$player?.level?.total_point
              ? parseFloat($player?.level?.total_point).toFixed(2)
              : 0}
            class:end={width > 80}
          ></div>
        </div>
        {#if types.length && $player?.level?.level_type_id !== 5}
          <span class="total">
            to <span style:text-transform="uppercase" style:color="#F1CE5B">
              {$player?.level?.level_type_id
                ? types[$player.level.level_type_id].name
                : types[0].name}</span
            >:
            {$player?.level?.total_point
              ? parseFloat($player?.level?.total_point).toFixed(2)
              : 0}/{$player?.level?.level_type_id
              ? parseFloat(types[$player.level.level_type_id].level_point)
              : parseFloat(types[0].level_point)}
          </span>
        {/if}
      {:else}
        <div class="auth gap-12">
          <Button background="white" size="large" on:click={openSignIn}
            >{"Log in"}</Button
          >
          <Button background="green" size="large" on:click={openSignUp}
            >{"Sign up"}</Button
          >
        </div>
      {/if}
    </div>
    <div
      class="frames container mx-auto hide-scrollbar"
      bind:this={framesContainer}
    >
      {#each data as item, index}
        <div
          bind:this={frames[index]}
          class="frame"
          class:current={$player?.level?.level_type_id === index + 1}
          class:complete={$player?.level?.level_type_id > index + 1}
          on:click={() => (i = index)}
          on:keydown
        >
          <img src={assets.frame} alt="" class="frame-img" />
          <img src={item.inner} alt="" class="inner" />
          <div class="title">
            {item.title}
          </div>
          <div class="prizes">
            <div class="prize">
              <span>Cashback:</span>
              {item.cashback}%
            </div>
            <div class="prize">
              <span>Weekly freespins:</span>
              {item.weekly_freespins}
            </div>
            <div class="prize">
              <span>Withdraw limit:</span>
              {#if item.withdraw_limit_daily}
                {item.withdraw_limit_daily}
              {:else}
                <img src={assets.lock} alt="" />
              {/if}
            </div>
            <div class="prize">
              <span>Birthday gift:</span>
              {#if item.birthday_gift}
                <img src={assets.check} alt="" />
              {:else}
                <img src={assets.lock} alt="" />
              {/if}
            </div>
            <div class="prize">
              <span>New year gift:</span>
              {#if item.personal_assistant}
                <img src={assets.check} alt="" />
              {:else}
                <img src={assets.lock} alt="" />
              {/if}
            </div>
            <div class="prize">
              <span>Personal VIP host:</span>
              {#if item.personal_assistant}
                <img src={assets.check} alt="" />
              {:else}
                <img src={assets.lock} alt="" />
              {/if}
            </div>
            <div class="prize">
              <span>Cash drop:</span>
              {#if item.random_drop_cash}
                <img src={assets.check} alt="" />
              {:else}
                <img src={assets.lock} alt="" />
              {/if}
            </div>
            <div class="prize">
              <span>Exclusive trips:</span>
              {#if item.exclusive_trips}
                <img src={assets.check} alt="" />
              {:else}
                <img src={assets.lock} alt="" />
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</LoadingOverlay>

<style lang="scss">
  .bg {
    width: 100%;
    min-height: 100%;
    position: absolute;
    background-size: cover;
    background-position: center;
    top: 0;
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      top: 0;
      left: 0;
      // z-index: 1;
    }
  }

  .progress {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 2;
    margin: 60px auto 0;
    width: 500px;
    @media (max-width: 992px) {
      width: 300px;
    }
    .stroke {
      position: relative;
      z-index: 1;
      user-select: none;
      pointer-events: none;
    }
    .line-cont {
      position: absolute;
      height: 95%;
      top: 2.5%;
      width: calc(100% - 80px);
      left: 80px;
      @media (max-width: 992px) {
        left: 50px;
        width: calc(100% - 50px);
      }
      .line {
        position: absolute;
        background-position-x: -90px;
        width: 0;
        height: 100%;
        border-radius: 0 50px 50px 0;
        transition: 0.3s ease-in-out;
        cursor: pointer;
        &:after {
          content: attr(data-percent);
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(100%, -50%);
          font-weight: 700;
          font-style: italic;
          font-size: 15px;
          @media (max-width: 992px) {
            font-size: 12px;
          }
        }
        &:hover:after {
          content: attr(data-points);
        }
        &.end:after {
          transform: translate(0, -50%);
          right: 10px;
        }
      }
    }
    .total {
      position: absolute;
      font-size: 15px;
      font-weight: 800;
      font-style: italic;
      bottom: -30px;
      width: 100%;
      text-align: center;
      padding-left: 40px;
      @media (max-width: 992px) {
        font-size: 14px;
        bottom: -20px;
        padding-left: 25px;
      }
    }

    .badge {
      position: absolute;
      z-index: 1;
      width: 80px;
      top: -20px;
      left: 0;

      @media (max-width: 992px) {
        width: 50px;
        top: -13px;
      }
    }
    .auth {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
  .top {
    position: relative;
    display: flex;
    margin-top: 20px;
    z-index: 2;
    .left {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .logo {
      width: 60px;
      cursor: pointer;
      @media (max-width: 768px) {
        width: 50px;
      }
    }
    .back {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-weight: 500;
      @media (max-width: 768px) {
        gap: 5px;
      }
      img {
        width: 25px;
        @media (max-width: 768px) {
          width: 20px;
        }
      }
    }
  }
  .frames {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-top: 40px;
    margin-top: 70px;
    z-index: 2;
    position: relative;
    @media (max-width: 768px) {
      width: 100%;
      padding: 30px 15px 50px;
    }
    .frame {
      min-width: 250px;
      position: relative;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      @media (max-width: 992px) {
        min-width: 200px;
      }
      .frame-img {
        width: 100%;
        pointer-events: none;
        user-select: none;
      }
      &:hover {
        filter: brightness(1.1);
        .inner {
          opacity: 0.3;
        }

        &:not(.current) .title {
          opacity: 0;
        }
        .prizes {
          opacity: 1;
        }
        .badge {
          opacity: 0;
        }
      }
      &.complete {
        opacity: 0.7;
      }
      &.current {
        filter: brightness(1.1);
        .inner {
          opacity: 0.3;
        }

        .title {
          top: 70px;
          background-color: #1d803ab3;
          background-image: conic-gradient(
            from 1turn,
            rgba(88, 175, 16, 1),
            rgba(29, 128, 58, 1)
          );
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;

          @media (max-width: 992px) {
            top: 60px;
          }
        }
        .prizes {
          opacity: 1;
          padding-top: 30px;
        }
        .badge {
          opacity: 0;
        }
      }
      .inner {
        position: absolute;
        width: 90%;
        height: 90%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        user-select: none;
        transition: 0.3s ease-in-out;
      }
      .title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 28px;
        font-weight: 900;
        text-transform: uppercase;
        transition: 0.3s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 1);
        letter-spacing: 1.4px;
        @media (max-width: 992px) {
          font-size: 24px;
        }
        &.complete {
          display: none;
          &:after {
            content: "";
            position: absolute;
            width: 120%;
            height: 4px;
            background-color: white;
            transform: rotate(-10deg);
          }
        }
      }
      .prizes {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        text-align: center;
        transform: translate(-50%, -50%);
        font-size: 18px;
        opacity: 0;
        pointer-events: none;
        user-select: none;
        transition: 0.3s ease-in-out;
        display: flex;
        flex-direction: column;

        .prize {
          color: var(--cp-green-dark);
          font-weight: 700;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2px;
          @media (max-width: 992px) {
            font-size: 14px;
          }
          img {
            width: 20px;
            @media (max-width: 992px) {
              width: 12px;
            }
          }
          & > span {
            color: white;
            font-weight: 400;
          }
        }
      }
    }
  }
</style>
