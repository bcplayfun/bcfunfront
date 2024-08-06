<script lang="ts">
  import { player } from "$lib/stores/player";
  import * as assets from "../assets";
</script>

<div class="player">
  <div class="avatar">
    <img src={assets.user} alt="" width="15px" />
  </div>
  <div class="username">
    {$player.username}
  </div>
</div>

<style lang="scss">
  .player {
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    .info {
      display: flex;
      flex-direction: column;
      .username {
        color: #fff;

        font-size: 18px;
        font-weight: 700;
        line-height: 133%;
        letter-spacing: -0.09px;
        font-weight: 700;
      }
    }
  }
  .verify {
    padding: 14px 18px 7px;
    display: flex;
    gap: 10px;
  }

  .avatar {
    position: relative;
    width: 50px;
    height: 50px;
    background: var(--layer-1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
