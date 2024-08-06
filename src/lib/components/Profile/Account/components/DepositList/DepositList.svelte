<script lang="ts">
  import api from "$lib/api";
  import Icon from "$lib/elements/BalanceSelect/Icon.svelte";
  import { currencies } from "$lib/stores/static";
  import { comingTransaction } from "$lib/stores/payments";
  import { browser } from "$app/environment";
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";

  dayjs.extend(utc);

  let loading = false;

  $: if (browser && $comingTransaction) {
    getHistory();
  } else if (browser) {
    getHistory();
  }

  let deposits: any = [];
  async function getHistory() {
    loading = true;
    const [res, err] = await api.players.getDeposits();
    if (!err) {
      deposits = res;
      if (deposits.find((d: any) => d.status === "not_confirmed")) {
        comingTransaction.set(true);
      }
    }
    loading = false;
  }
</script>

{#if deposits?.length && !loading}
  <div class="deposits mt-30">
    <div class="title">Last deposits</div>
    <div class="list">
      {#each deposits as tr}
        <div class="item">
          {#if $currencies.length > 0}
            <div class="logo" style:padding="0 0 0 10px">
              <div class="icon">
                <Icon
                  currencyId={$currencies.find((c) => tr.currency == c.name)
                    ?.id}
                />
              </div>
              <div class="name">
                {$currencies.find((c) => tr.currency == c.name)?.name}
              </div>
            </div>
          {/if}
          <div class="tr">
            <div class="td">
              <div class="key">ID:</div>
              <div class="val truncate">
                {tr.transaction_id}
              </div>
            </div>
            <div class="td">
              <div class="key">Status:</div>
              <div class="val {tr.status}">
                {tr.status === "not_confirmed" ? "pending" : tr.status}
              </div>
            </div>
          </div>
          <div class="tr">
            <div class="td">
              <div class="key">Amount:</div>
              <div class="val amount">
                +{parseFloat(tr.amount).toFixed(8)}
                {$currencies.find((c) => tr.currency == c.name)?.name}
              </div>
            </div>
            <div class="td">
              <div class="key">Created at:</div>
              <div class="val">
                {dayjs.utc(tr.created_at).local().format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .truncate {
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .deposits {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 15px;
      font-weight: 600;
    }
    .list {
      display: flex;
      flex-direction: column;
      gap: 8px;

      margin: 15px 0 0;
      .item {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 8px 12px;
        border-radius: 8px;
        background-color: var(--layer-0);
        gap: 20px;

        @include media.down(sm) {
          gap: 5px;
          padding: 5px 0px;
        }
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
          }
          .val {
            font-size: 13px;
            font-weight: 500;
            &.not_confirmed,
            &.pending {
              color: var(--yellow);
            }
            &.confirmed,
            &.amount,
            &.success,
            &.refunded {
              color: var(--green);
            }
            &.cancel,
            &.error,
            &.mispaid,
            &.dspend,
            &.voided,
            &.unconfirmed {
              color: var(--red);
            }
          }
        }
      }
    }
  }
</style>
