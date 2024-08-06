<script lang="ts">
  import { goto } from "$app/navigation";
  import api from "$lib/api";
  import Button from "$lib/elements/Button";
  import { player } from "$lib/stores/player";

  export let bonus = {} as any;

  let loading = false;
  $: slug = bonus?.type?.game?.slug;

  async function runGame() {
    if (
      (bonus.type.family_id === 101 || bonus.type.family_id === 102) &&
      $player.selected_currency_id !== bonus?.type?.currency_id
    ) {
      loading = true;
      await api.players.setCurrency(bonus?.type?.currency_id);
      await api.players.info();
      goto(`/game/${slug}`);
      loading = false;
    } else if ($player.selected_currency_id === bonus?.type?.currency_id) {
      goto(`/game/${slug}`);
    }
  }
</script>

<div class="fs-modal">
  <h2>
    You have been awarded {bonus.type.quantity} FS in
    <span>{bonus.type.game.name}</span>
  </h2>
  <div class="info">
    <p>
      Bet amount: <span
        >{parseFloat(bonus.type.bet_amount)}
        {bonus.type.currency_id === 3 ? "GBP" : "EUR"}</span
      >
    </p>
  </div>
  <img
    src={bonus.type.game?.file?.url}
    alt="game"
    style:width="270px"
    on:click={() => runGame()}
    on:keydown
  />
  <div style:max-width="270px" style:width="100%">
    <Button size="large" {loading} on:click={() => runGame()}>Play now</Button>
  </div>
</div>

<style lang="scss">
  .fs-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 600px;

    gap: 15px;
    padding: 15px;

    @media (max-width: 992px) {
      width: 100%;
    }
    & > h2 {
      font-size: 26px;
      & > span {
        color: var(--brand-primary);
      }
    }
    & > img {
      border-radius: 8px;
      cursor: pointer;
      &:hover {
        filter: brightness(1.1);
      }
    }
    & > .info {
      display: flex;
      flex-direction: column;
      align-items: center;

      font-weight: 600;
      font-size: 14px;
      & > p {
        & > span {
          color: var(--brand-primary);
        }
      }
    }
  }
</style>
