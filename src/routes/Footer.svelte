<script lang="ts">
  import dayjs from "dayjs";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import third_parties from "$lib/third_parties";
  import { langStore } from "$lib/utils/page";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  const footerMenu = [
    {
      name: "About Us",
      url: "/about",
    },
    {
      name: "Affiliates",
      url: "/affiliates",
    },
    {
      name: "Security & Privacy Policy",
      url: "/privacy",
    },
    {
      name: "Responsible Gambling",
      url: "/responsible",
    },
    {
      name: "Terms of Use",
      url: "/terms",
    },
    {
      name: "KYC Policy",
      url: "/kyc",
    },
    // {
    //   name: "Payment Options",
    //   url: "/payment-options",
    // },
  ];

  const handleChange = ({ currentTarget }: any) => {
    const { value } = currentTarget;

    document.cookie = `lang=${value} ;`;
    langStore.set(value);
  };

  let url =
    "https://egaming-costarica.com/seal_factory/data-33/is_valid/is_licensed/seal.js";
  onMount(() => {
    loadScript(url);
  });

  export function loadScript(src: string) {
    return new Promise((resolve, reject) => {
      if (browser) {
        const script = document.createElement("script");
        script.src = src;
        document.body.appendChild(script);
        script.addEventListener("load", () => resolve(script));
        script.addEventListener("error", () => reject(script));
      }
    });
  }
</script>

<footer>
  <div class="container mx-auto">
    <ul class="menu">
      {#each footerMenu as item}
        <li class={`${$page.url.pathname === item.url && "active"}`}>
          <a
            data-sveltekit-preload-data="hover"
            href={item.url}
            style:width="100%"
            style:height="100%"
            style:color="inherit"
            style:text-decoration="none"
          >
            {item.name}
          </a>
        </li>
      {/each}
    </ul>
    <div class="hint">
      <p class="text-center">
        Gambling can be addictive and you need to
        <span class="link" on:click={() => goto("/responsible")} on:keydown
          >play responsibly</span
        >. In case you have serious concerns about your gambling habits or have
        a family member affected by gambling addiction, please seek help
        <span
          class="link"
          on:click={() => third_parties.intercom.openChat()}
          on:keydown>here</span
        >
      </p>
    </div>
    <div class="license">
      <p>
        BCFUN is operated by Digital Fusion Corporation, a company registered,
        licensed and regulated in Costa Rica by the Gambling Commission under
        account number 1816700-2023. The registered office Digital Fusion
        Corporation is SAN JOSE- SAN JOSE MATA REDONDA, NEIGHBORHOOD LAS VEGAS.
      </p>
      <div id="apg-cr-seal" style:min-width="72px"></div>
    </div>
    <div class="bottom">
      <p>© {dayjs().year()} BCFUN. All rights reserved.</p>
      <p class="plus-18">+18</p>
    </div>
  </div>
</footer>

<style lang="scss">
  .plus-18 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 30px;
    color: white;
    font-weight: 400;
  }
  footer {
    margin-top: 50px;
    background-color: var(--cp-grey-dark-2);
    width: 100%;
    transition: 0.2s ease-in-out;
    &.shrink {
      width: calc(100% - 350px);
    }
    .menu {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      padding: 30px 0;
      border-bottom: 1px solid var(--cp-grey-light-2);
      li {
        color: var(--gray);
        transition: 0.3s ease-in-out;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        &.active,
        &:hover {
          color: white;
        }
      }
    }
    .hint {
      display: flex;
      color: var(--gray);
      padding: 20px 0;
      border-bottom: 1px solid var(--cp-grey-light-2);
    }
    .license {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      color: var(--gray);
      padding: 30px 0;
      border-bottom: 1px solid var(--cp-grey-light-2);
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--gray);
      padding: 30px 0 100px;
    }
  }
</style>
