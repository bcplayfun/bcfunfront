<script lang="ts">
  import api from "$lib/api";
  import Alert from "$lib/elements/Alert";
  import { openModal } from "$lib/elements/Modal";
  import type { Bonus, Freespin } from "$lib/types/bonuses";
  import { createEventDispatcher } from "svelte";
  import { generateState } from ".";
  import CancelBonus from "./CancelBonus.svelte";
  import BonusButton from "./BonusButton.svelte";
  import dayjs from "dayjs";
  import * as assets from "./assets";
  import { goto } from "$app/navigation";
  import { formatNumber, isJsonString } from "$lib/utils/string";
  import { currencies } from "$lib/stores/static";
  import { bonusBalance } from "$lib/stores/bonus";

  const dispatch = createEventDispatcher();

  export let bonus: Bonus;

  async function activateBonus() {
    const [res, _] = await api.bonuses.activate(bonus.id);
    if (res.status == 205) {
      voidFunc(bonus.type.name, "", bonus.id);
      return;
    }
    if (res) {
      Alert.success(res.data.response);
      dispatch("refetch");
    }
  }

  function voidFunc(
    activeTitle: string,
    inactiveTitle: string,
    bonusID: number
  ) {
    openModal(
      CancelBonus,
      "Bonus void",
      {
        activeTitle: activeTitle,
        inactiveTitle: inactiveTitle,
        bonusID: bonusID,
        cb: async (_: any) => {
          dispatch("refetch");
          await api.players.info();
          const [balance] = await api.bonuses.bonusBalance();
          if (balance) {
            bonusBalance.set(balance);
          } else {
            bonusBalance.set({});
          }
        },
      },
      { type: "new" }
    );
  }

  function calculateProgress() {
    if (bonus.bonus_balance && Object.keys(bonus.bonus_balance).length > 0) {
      let target = parseFloat(bonus.bonus_balance.target_wager_amount);
      let amount = parseFloat(bonus.bonus_balance.wager_amount);
      return (amount * 100) / target || 0;
    }
    return 0;
  }

  function getDate(freespin: Freespin | null, key: string): string {
    let unixTimestamp;
    if (key === "from") {
      unixTimestamp = parseInt(freespin?.valid_from!);
    } else {
      unixTimestamp = parseInt(freespin?.valid_until!);
    }
    if (unixTimestamp) {
      const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      return formattedDate;
    } else {
      return "";
    }
  }
</script>

<div class="bonus">
  <div class="top mb-8">
    <p class="name">
      {#if isJsonString(bonus.type.name)}
        {JSON.parse(bonus.type.name)["en"]}
      {:else}
        {bonus.type.name}
      {/if}
    </p>
    <p class="description">
      {#if isJsonString(bonus.type.description)}
        {@html JSON.parse(bonus.type.description)["en"]}
      {:else}
        {@html bonus.type.description}
      {/if}
    </p>
  </div>
  {#if generateState(bonus) === "wager"}
    <div class="item mb-4">
      <div class="key">Max. Bet</div>
      <div class="value">
        {parseFloat(bonus.type.max_bet)}
        {"EUR"}
      </div>
    </div>
  {/if}
  {#if bonus.type.family_id === 102 || bonus.type.family_id === 101}
    <div class="item mb-16">
      <div class="key">Bet amount</div>
      <div class="value">
        {parseFloat(bonus?.type?.bet_amount.toString()) || "0"}
        {bonus.type.currency_id === 3 ? "GBP" : "EUR"}
      </div>
    </div>
  {/if}
  {#if bonus.type.family_id !== 102 && bonus.type.family_id !== 101}
    <div class="item mb-16">
      <div class="key">Max. Bonus amount</div>
      <div class="value">
        {formatNumber(parseFloat(bonus.type.max_withdrawal))}
        {$currencies.find((curr) => bonus.type.currency_id == curr.id)?.name}
      </div>
    </div>
  {/if}
  <div class="bottom">
    <div class="left">
      <div class="availability">
        <img src={assets.clock} alt="clock" />
        <div class="paragraph">
          Active until:
          {dayjs(bonus.created_at).add(7, "days").format("YYYY-MM-DD")}
        </div>
      </div>
      <div class="tc" on:click={() => goto("/terms")} on:keydown>
        Terms & Conditions
      </div>
    </div>
    <div class="right">
      <BonusButton
        {bonus}
        key={generateState(bonus) === "deposit"
          ? formatNumber(parseFloat(bonus.type.min_deposit)) +
            " " +
            $currencies.find((curr) => bonus.type.currency_id == curr.id)?.name
          : ""}
        type={generateState(bonus)}
        {activateBonus}
      />
    </div>
  </div>
  <!-- bonus.type.family_id !== 102 &&  -->
  {#if generateState(bonus) === "wager" || generateState(bonus) === "freespin"}
    <div class="progress">
      <div class="title">Progress</div>
      <div class="bar">
        <div
          class="inner"
          style="width: {calculateProgress() > 100
            ? 100
            : calculateProgress()}%"
        >
          <span class="percent" class:full={calculateProgress() > 90}>
            {calculateProgress() > 100 ? 100 : calculateProgress().toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .bonus {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px;
    @media (max-width: 768px) {
      padding: 15px;
    }
    &:nth-of-type(1) {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-top: none;
    }
    &:last-of-type {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &:nth-child(odd) {
      background-color: var(--table-row-background-color);
    }
  }
  .top {
    display: flex;
    flex-direction: column;
    .name {
      font-size: 20px;
      font-weight: 700;
      line-height: 20px;
      color: var(--brand-primary);
      filter: brightness(1.2);
      @media (max-width: 992px) {
        font-size: 18px;
      }
    }
    .description {
      margin-top: 5px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
  .left {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: 1 0 0;
  }
  .right {
    max-width: 150px;
    width: 100%;
    @media (max-width: 992px) {
      max-width: 130px;
    }
  }
  .availability {
    flex: 1 0 0;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    img {
      width: 13px;
    }
    .divider {
      color: rgba(255, 255, 255, 0.5);
    }
    .paragraph {
      display: flex;
      gap: 3px;
    }
  }
  .tc {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.7);
    font-size: 13px;
    display: flex;
    align-items: center;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }

  .item {
    display: flex;
    align-items: center;
    gap: 6px;

    .key {
      font-size: 12px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.6);
    }
    .value {
      font-weight: 700;
      font-size: 15px;
    }
  }

  // .steps {
  //   width: 100%;
  //   margin-top: 30px;
  //   display: flex;
  //   flex-direction: column;
  //   .wrapper {
  //     position: relative;
  //     display: flex;
  //     margin-bottom: 10px;
  //     height: 18px;
  //     .step {
  //       position: absolute;
  //       z-index: 1;
  //       font-size: 12px;
  //       &:nth-of-type(1) {
  //         left: 0;
  //       }
  //       &:nth-of-type(2) {
  //         left: 25%;
  //         &:before {
  //           left: -20px;
  //         }
  //       }
  //       &:nth-of-type(3) {
  //         left: 50%;
  //         &:before {
  //           left: -11px;
  //         }
  //       }
  //       &:nth-of-type(4) {
  //         left: 75%;
  //         &:before {
  //           left: -17px;
  //         }
  //       }
  //       &:last-of-type {
  //         left: 100%;
  //         &:before {
  //           left: -59px;
  //         }
  //       }
  //       &:before {
  //         content: attr(data-name);
  //         position: absolute;
  //         top: 0;
  //       }
  //       &:after {
  //         content: "";
  //         position: absolute;
  //         width: 3px;
  //         height: 14px;
  //         background-color: white;
  //         border-radius: 8px;
  //         left: 0;
  //         top: 26px;
  //       }
  //     }
  //   }
  //   .bar {
  //     position: relative;
  //     width: 100%;
  //     height: 10px;
  //     .inner {
  //       position: absolute;
  //       height: 100%;
  //       background: var(--brand-primary);
  //     }
  //   }
  // }
  .progress {
    margin-top: 20px;

    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .bar {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100%;
      height: 10px;
      border-radius: 8px;
      box-shadow: 0 0 0 1px var(--table-border-color);
      .inner {
        position: absolute;
        height: 100%;
        background: var(--brand-primary);
        border-radius: 8px;
        .percent {
          font-size: 12px;
          right: -30px;
          position: absolute;
          top: -3.5px;
          &.full {
            right: 0px;
          }
        }
      }
    }
  }

  /* .bottom {
    margin: 15px 0 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tc {
      cursor: pointer;
      color: rgba(255, 255, 255, 0.7);
      font-size: 13px;
      display: flex;
      align-items: center;
    }
  } */
</style>
