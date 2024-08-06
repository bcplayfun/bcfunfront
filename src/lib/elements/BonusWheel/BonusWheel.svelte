<script lang="ts">
  // import GiftWheel from "./assets/GiftWheel.svelte";
  import {
    stroke,
    spin,
    wallet,
    wheel,
    light,
    lucky,
    super as superBtn,
    mega,
    sound,
    bannerBronze,
    tab,
    superSpin,
    megaSpin,
    bannerGold,
    bannerDiamond,
    ticket,
    strokeGold,
    strokeDiamond,
  } from "./assets/wheel";
  import { isLoggedIn, player } from "$lib/stores/player";
  import api from "$lib/api";
  import Countdown from "./Countdown.svelte";
  import { closeModal, openModal } from "../Modal";
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc.js";
  import CircleLoading from "../CircleLoading/CircleLoading.svelte";
  import Register from "../Modals/Register";
  import { go } from "../Profile";
  import { onDestroy, onMount } from "svelte";
  import Icon from "$lib/elements/BalanceSelect/Icon.svelte";
  import Button from "../Button";

  dayjs.extend(utc);

  export let tries: number = 0;
  export let cb: () => void;
  export let activeTab: number = 1;

  type Segment = {
    id: number;
    name: string;
    currency_id: number | null;
    amount: string;
    wheel_type_id: number;
  };

  let d: number = 0;
  let actualDeg: number = 0;
  let spinQ: number = 10;
  let spinDeg: number = 360;
  let symbolSegments: Array<Segment> = [];
  let winNr: number = 0;
  let displayText: string = "-";
  let isDisabled: boolean = false;
  let transitionTime: number = 4000;
  let isSpin: boolean = false;

  let startEndFunc: boolean = false;
  let isClicked: boolean = false;
  let isStart: boolean = false;
  let isDisplay: boolean = false;

  let active: boolean = false;

  let wheels: any = [];
  onMount(async () => {
    [wheels] = await api.wheel.wheelSegments();
    if ($isLoggedIn) {
      await api.players.info();
    }
    setInterval(() => {
      active = !active;
    }, 500);
  });

  $: symbolLength = symbolSegments.length;
  $: zoneSize = 360 / symbolLength;

  async function spinWheel() {
    startAudioAtTime(10.2, 10.5);
    await delay(300);
    isClicked = true;
    isStart = true;
    isDisplay = false;
    isDisabled = true;
    displayText = "-";
    startAudioAtTime(2, 9);
    const [res, err] = await api.wheel.spin(activeTab);
    if (!err) {
      isStart = false;
      generateWinNumber(res);
      let centerPos = zoneSize * winNr;
      d = spinQ * spinDeg + centerPos;
      isSpin = true;
      startEndFunc = true;
    }
  }
  function generateWinNumber(win: any) {
    symbolSegments.forEach((symbol, i) => {
      if (
        symbol.name === win.name &&
        symbol.wheel_type_id === win.wheel_type_id &&
        symbol.currency_id === win.currency_id
      ) {
        winNr = symbolLength - i;
      }
    });
  }

  $: if (wheels.length && activeTab) {
    symbolSegments = [
      ...wheels.find((w: any) => w.id === activeTab).wheels,
    ].reverse();
  }

  async function end() {
    await api.players.info();
    if (activeWheelInfo) {
      tries = activeWheelInfo?.total_tickets || 0;
    }
    cb();
    isDisplay = true;
    isClicked = false;
    isDisabled = false;
    actualDeg = d % spinDeg;
    isSpin = false;
    displayText = `${symbolSegments.find((s) => s.id === winNr)?.name}`;
    startEndFunc = false;
    await delay(5000);
  }

  let timer: ReturnType<typeof setTimeout>;
  $: {
    if (startEndFunc) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        end();
      }, transitionTime);
    }
  }

  $: isLocked =
    activeWheelInfo?.spin_date &&
    dayjs(activeWheelInfo?.spin_date).format("YYYY-MM-DD HH:mm:ss") >
      dayjs().utc().format("YYYY-MM-DD HH:mm:ss");

  function openRegister() {
    startAudioAtTime(10.2, 10.5);
    openModal(Register, "Sign up", {}, { type: "new" });
  }
  async function openProfile() {
    closeModal();
    go("dashboard", "my-account");
  }

  let activeWheelInfo: {
    wheel_type_id: number;
    total_tickets: number;
    spin_date: null | string;
  } | null = null;

  function getActiveWheelInfo(
    items:
      | {
          wheel_type_id: number;
          total_tickets: number;
          spin_date: null | string;
        }[]
      | null
  ): {
    wheel_type_id: number;
    total_tickets: number;
    spin_date: null | string;
  } | null {
    if (items) {
      return items.find((item) => item.wheel_type_id === activeTab) || null;
    }
    return null;
  }

  $: if (activeTab && $player?.wheel_spin) {
    activeWheelInfo = getActiveWheelInfo($player?.wheel_spin);
    tries = activeWheelInfo?.total_tickets || 0;
  }

  let audioElement: HTMLAudioElement;
  let intervalId: any;

  function startAudioAtTime(startTime: number, endTime: number) {
    if (audioElement) {
      audioElement.currentTime = startTime;

      audioElement.play();

      intervalId = setInterval(function () {
        if (!audioElement) {
          clearInterval(intervalId);
        }
        if (audioElement?.currentTime >= endTime) {
          audioElement.pause();
          clearInterval(intervalId);
        }
      }, 100);
    }
  }
  function delay(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  onDestroy(() => {
    clearInterval(intervalId);
  });

  function formatNumber(num: number) {
    let numStr = num.toString();

    let parts = numStr.split(".");
    let integerPart = parts[0];
    let decimalPart = parts[1] || "";

    let maxDigits = 6;

    if (decimalPart.length < maxDigits - integerPart.length) {
      decimalPart = decimalPart.padEnd(maxDigits - integerPart.length, "0");
    }

    if (decimalPart.length < 3) {
      decimalPart = decimalPart.padEnd(3, "0");
    }

    return integerPart + "." + decimalPart;
  }

  function chooseTab(type: number) {
    activeTab = type;
    actualDeg = 0;
  }

  const tabs = [
    { wheel_type_id: 1, img: tab },
    { wheel_type_id: 2, img: superSpin },
    { wheel_type_id: 3, img: megaSpin },
  ];
</script>

<audio src={sound} bind:this={audioElement}></audio>
<div class="fortune-wheel">
  <div class="tabs">
    {#each tabs as tab}
      <div
        class="tab tab-{tab.wheel_type_id}"
        class:active={tab.wheel_type_id === activeTab}
        class:disable={isDisabled}
        on:click={() => chooseTab(tab.wheel_type_id)}
        on:keydown
      >
        <img src={tab.img} alt="" width="70%" />
      </div>
    {/each}
  </div>
  <div class="close" on:click={closeModal} on:keydown>
    <span></span>
    <span></span>
  </div>
  <div class="bg-a"></div>
  <div class="bg-b"></div>
  <span class="tries tries-{activeTab}">
    {#if tries > 0}
      Deposit, spin, win <span>your luck awaits</span>
      <p>
        you have
        <span>{tries} tickets</span> left
      </p>
    {:else}
      Deposit, spin, win <span>your luck awaits</span>
      {#if activeTab === 1}
        <p>
          30 - 250 €/£ <span>= Lucky Spin</span>
        </p>
      {:else if activeTab === 2}
        <p>
          251 - 500 €/£ <span>= Super Spin</span>
          <span class="small">(or equivalent)</span>
        </p>
      {:else}
        <p>
          501+ €/£ <span>= Mega Spin</span>
        </p>
      {/if}
    {/if}
  </span>
  <div class={`fortune-wheel__container`}>
    <img
      class={`stroke`}
      src={activeTab === 1
        ? stroke
        : activeTab === 2
          ? strokeGold
          : strokeDiamond}
      alt="win stroke"
    />
    <div
      class="wheel-container"
      style={`${
        isStart
          ? "transition: all 2000ms linear; transform: rotate(3000deg); animation: blur 5s;"
          : isSpin
            ? `animation: blur 5s; transform: rotate(${d}deg); transition: all ${transitionTime}ms cubic-bezier(.35,.49,.1,.9)`
            : `transition: none; animation: none; transform: rotate(${actualDeg}deg)`
      }`}
    >
      {#each symbolSegments as symbol, i}
        <div class="prize" style:transform="rotate({i * zoneSize}deg)">
          {#if symbol.currency_id}
            <span class="amount">
              {formatNumber(parseFloat(symbol.amount))}
            </span>
            <div class="prize-icon">
              <Icon currencyId={symbol.currency_id} />
            </div>
          {:else}
            {symbol.name}
          {/if}
        </div>
      {/each}
      <img class={`wheel`} src={wheel} alt="bonus wheel" />
      <img class="light" class:active src={light} alt="bonus wheel frame" />
    </div>
    {#if !$isLoggedIn}
      <div class="btn" on:click={openRegister} on:keydown>
        <img class="btn-img" src={spin} alt="spin button" />
        <img
          src={activeTab === 1 ? lucky : activeTab === 2 ? superBtn : mega}
          alt="lucky spin"
          class="btn-text"
        />
      </div>
    {:else if tries == 0}
      <div class="btn" on:click={openProfile} on:keydown>
        <img class="btn-img" src={spin} alt="spin button" />
        <img src={wallet} alt="wallet icon" class="btn-text wallet" />
      </div>
    {:else if isLocked}
      <div class="btn disable">
        <img class="btn-img" src={spin} alt="spin button" />
        <img
          src={activeTab === 1 ? lucky : activeTab === 2 ? superBtn : mega}
          alt="lucky spin"
          class="btn-text"
        />
      </div>
    {:else}
      <div
        class="btn"
        class:disable={isDisabled}
        on:click={spinWheel}
        on:keydown
      >
        <img class="btn-img" src={spin} alt="spin button" />
        <img
          src={activeTab === 1 ? lucky : activeTab === 2 ? superBtn : mega}
          alt="lucky spin"
          class="btn-text"
        />
      </div>
    {/if}
    <img
      class="banner-img"
      src={activeTab === 1
        ? bannerBronze
        : activeTab === 2
          ? bannerGold
          : bannerDiamond}
      alt=""
    />
  </div>
  {#if !$isLoggedIn}
    <div class="btn-wrapper mt-40" style:width="250px">
      <Button size="large" on:click={openRegister} on:keydown
        >REGISTER NOW</Button
      >
    </div>
  {:else if tries == 0}
    <div class="btn-wrapper mt-40" style:width="250px">
      <Button size="large" on:click={openProfile} on:keydown>DEPOSIT</Button>
    </div>
  {:else if isLocked}
    {#key activeWheelInfo?.spin_date}
      <Countdown
        from={activeWheelInfo?.spin_date}
        dateFormat="YYYY-MM-DD HH:mm:ss"
        zone="utc"
        let:remaining
        let:loading
      >
        {#if loading}
          <div class="timer-wrap">
            <CircleLoading color="white" size="26px" />
          </div>
        {:else if !remaining.done}
          <div class="timer-wrap">
            Next spin awaits in
            <div class="timer">
              {#if !remaining.done}
                <span>{remaining.hours} :</span>
                <span>{remaining.minutes}</span><br />
                <span class="secs">{remaining.seconds}</span>
              {/if}
            </div>
          </div>
        {/if}
      </Countdown>
    {/key}
  {:else}
    <div class="btn-wrapper mt-40" style:width="250px">
      <Button disabled={isDisabled} size="large" on:click={spinWheel} on:keydown
        >SPIN</Button
      >
    </div>
  {/if}
</div>

<style lang="scss">
  .tabs {
    display: flex;
    gap: 5px;
    background-color: var(--layer-0);
    padding: 5px;
    margin-top: 40px;
    border-radius: 8px;
    .tab {
      position: relative;
      background-color: var(--dialog-background-color);
      width: 3.875rem;
      height: 3.875rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      user-select: none;
      cursor: pointer;
      &.locked {
        pointer-events: none;
      }
      .lock {
        position: absolute;
        width: 25px;
        height: 25px;
        z-index: 1;
      }
      &.disable {
        pointer-events: none;
      }
      img {
        filter: grayscale(1);
        pointer-events: none;
      }
      &-1.active {
        background-color: rgb(101, 49, 32);
      }
      &-2.active {
        background-color: rgb(235, 145, 6);
      }
      &-3.active {
        background-color: rgb(105, 14, 224);
      }
      &.active {
        img {
          filter: none;
        }
      }
    }
    .tickets {
      position: absolute;
      top: -20px;
      width: 50%;
    }
  }
  .bg-b {
    width: 12.5rem;
    height: 15rem;
    left: 0;
    opacity: 0.65;
    position: absolute;
    -webkit-filter: blur(26px);
    filter: blur(26px);
    background-image: radial-gradient(
      circle at 50% 50%,
      rgba(217, 21, 255, 0.6),
      rgba(0, 0, 0, 0) 75%
    );
    top: 50%;

    pointer-events: none;
  }
  .bg-a {
    width: 14.375rem;
    height: 16.5625rem;
    opacity: 0.65;
    -webkit-filter: blur(26px);
    filter: blur(26px);
    background-image: radial-gradient(
      circle at 50% 50%,
      rgba(7, 250, 218, 0.35),
      rgba(0, 0, 0, 0) 76%
    );
    position: absolute;
    top: 23%;
    right: 0;

    pointer-events: none;
  }
  .tries {
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    text-align: center;
    span:not(.small) {
      color: var(--brand-primary);
    }
    .small {
      font-size: 10px;
    }
  }
  .close {
    position: absolute;
    width: 25px;
    height: 25px;
    top: 10px;
    right: 10px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease;

    cursor: pointer;
    span {
      position: absolute;
      width: 100%;
      height: 2px;
      transform: rotate(45deg);
      border-radius: 2px;
      background-color: rgba(255, 255, 255, 0.8);
      transition: 0.2s ease;
      &:nth-of-type(2) {
        transform: rotate(135deg);
      }
    }
    &:hover {
      transform: rotate(90deg);
      span {
        background-color: rgba(255, 255, 255, 1);
      }
    }
  }
  .prize {
    position: absolute;
    height: 1.5rem;
    width: 5.5rem;
    top: 50%;
    left: 50%;
    line-height: 1.5rem;
    margin-top: -0.75rem;
    transform-origin: -3.8125rem center;
    margin-left: 3.875rem;
    color: #fff;
    font-size: 0.9375rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .amount {
      flex: auto;
    }
    &-icon {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  .timer-wrap {
    margin-top: 50px;
    padding-bottom: 25px;
    z-index: 11;
    font-size: 15px;
    font-weight: 400;
    user-select: none;
    line-height: 20px;
    min-width: 53px;
    text-transform: uppercase;
    height: 62.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    & span {
      font-weight: 500;
    }
    .secs {
      font-size: 24px;
      color: var(--yellow);
    }
  }
  .rule {
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 10px;
  }
  .banner-img {
    position: absolute;
    height: 5.3125rem;
    width: 21.25rem;
    left: 0.25rem;
    top: 19.625rem;
    pointer-events: none;
  }
  .fortune-wheel {
    position: relative;
    padding: 0 50px;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;

    height: 100%;

    @media (max-width: 992px) {
      width: 100%;
      margin: auto;
    }

    &__container {
      display: flex;
      align-items: center;
      flex-direction: column;
      position: relative;
      width: 21.75rem;
      height: 21.75rem;
      animation: open 0.4s ease;
      &.disabled {
        pointer-events: none;
      }
      .stroke {
        position: absolute;
        height: 5.59375rem;
        right: -1.90625rem;
        top: 8.0625rem;
        width: 10rem;
        transform-origin: left center;
        z-index: 9;
        pointer-events: none;
      }
      .wheel-container {
        user-select: none;
        pointer-events: none;
        .wheel {
          width: 100%;
          height: 100%;
        }
      }
      .light {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        pointer-events: none;
        &.active {
          transform: rotate(22.5deg);
        }
      }
      .btn {
        display: block;
        width: 6.5rem;
        height: 6.5rem;
        position: absolute;
        z-index: 10;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        user-select: none;

        &.disable {
          pointer-events: none;
        }
        &:hover {
          .btn-img {
            transition: transform 0.2s ease;
            transform: scale(1.1);
          }
        }
        &-text {
          position: absolute;
          width: 5.5rem;
          height: 3.5rem;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
          animation: pulse 2s infinite linear;
          &.wallet {
            width: 2rem;
            height: 2rem;
          }
        }
      }
    }
  }
  @keyframes open {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes blur {
    0% {
      filter: blur(1.5px);
    }
    60% {
      filter: blur(1.5px);
    }
    100% {
      filter: blur(0px);
    }
  }

  @keyframes pulse {
    0% {
      -webkit-transform: rotate(-5deg) scale3d(1, 1, 1);
      -ms-transform: rotate(-5deg) scale3d(1, 1, 1);
      transform: rotate(-5deg) scaleZ(1);
    }

    50% {
      -webkit-transform: rotate(0deg) scale3d(1.1, 1.1, 1.1);
      -ms-transform: rotate(0deg) scale3d(1.1, 1.1, 1.1);
      transform: rotate(0) scale3d(1.1, 1.1, 1.1);
    }

    to {
      -webkit-transform: rotate(-5deg) scale3d(1, 1, 1);
      -ms-transform: rotate(-5deg) scale3d(1, 1, 1);
      transform: rotate(-5deg) scaleZ(1);
    }
  }
</style>
