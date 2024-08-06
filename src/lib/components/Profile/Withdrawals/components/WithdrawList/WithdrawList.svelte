<script lang="ts">
  import api from "$lib/api";
  import Icon from "$lib/elements/BalanceSelect/Icon.svelte";
  import { currencies } from "$lib/stores/static";
  import { browser } from "$app/environment";
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import players from "$lib/api/players";
  import Alert from "$lib/elements/Alert";

  dayjs.extend(utc);

  let loading = false;
  export let refetch: boolean = false;

  $: if (browser && refetch) {
    getHistory();
    refetch = false;
  } else if (browser) {
    getHistory();
  }

  let list: any = [];
  async function getHistory() {
    loading = true;
    const [res, err] = await api.players.getWithdraws();
    if (!err) {
      list = [...res];
    }
    loading = false;
  }

  async function cancel(id: number) {
    const [_, err] = await players.cancelWithdraw(id.toString());
    if (!err) {
      refetch = true;
      Alert.success("Your withdrawal canceled successfully.");
      await api.players.info();
    }
  }
</script>

{#if list.length}
  <div class="withdrawals">
    <div class="title">Last withdrawals</div>
    <div class="list">
      {#each list as tr}
        <div class="item">
          {#if $currencies.length > 0}
            <div class="logo" style:padding="0 0 0 10px">
              <div class="icon">
                <Icon
                  currencyId={$currencies.find(
                    (c) => tr.currency.name == c.name
                  )?.id}
                />
              </div>
              <div class="name">
                {$currencies.find((c) => tr.currency.name == c.name)?.name}
              </div>
            </div>
          {/if}
          <div class="tr" style:flex="1 0 0">
            <div class="td">
              <div class="key">Amount:</div>
              <div class="val amount">
                -{parseFloat(tr.amount).toFixed(8)}
              </div>
            </div>

            <div class="td">
              <div class="key">Status:</div>
              <div class="val {tr?.status?.name}">
                {tr.status?.name}
              </div>
            </div>
          </div>
          <div class="tr">
            <div class="td">
              <div class="key">Created at:</div>
              <div class="val">
                {dayjs.utc(tr.created_at).local().format("YYYY-MM-DD HH:mm")}
              </div>
            </div>
            {#if tr?.status?.name === "Pending"}
              <div class="td">
                <div class="val blue" on:click={() => cancel(tr.id)} on:keydown>
                  Cancel Withdraw
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .withdrawals {
    position: relative;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 15px;
      font-weight: 600;
    }
    .list {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 8px;

      margin: 15px 0 0;
      .item {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 8px 12px;
        border-radius: 8px;
        background-color: var(--layer-0);
        gap: 20px;
        .logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          .icon {
            width: 30px;
            height: 30px;
            gap: 10px;
          }
          .name {
            font-size: 14px;
            font-weight: 600;
          }
        }
        .tr {
          display: flex;
          flex-direction: column;
        }
        .td {
          display: flex;
          align-items: center;
          gap: 5px;
          .key {
            font-weight: 400;
            font-size: 12px;
            color: var(--gray);
            @include media.down(sm) {
              font-size: 10px;
            }
          }
          .val {
            font-size: 13px;
            font-weight: 500;
            @include media.down(sm) {
              font-size: 11px;
            }
            &.Pending {
              color: var(--yellow);
            }
            &.Canceled,
            &.amount {
              color: var(--red);
            }

            &.Success {
              color: var(--green);
            }
            &.blue {
              color: var(--brand-primary);
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
</style>
