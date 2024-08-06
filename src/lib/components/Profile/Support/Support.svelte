<script lang="ts">
  const tabs = [
    {
      title: "Registration and Log In",
      questions: [
        {
          title: "What is BCFUN?",
          answer:
            "BCFUN is an online gaming platform offering a wide range of casino games, slots, and live dealer experiences for players worldwide.",
        },
        {
          title: "How do I create an account?",
          answer:
            "To register, simply click on the ''Sign up'' button on our homepage and follow the instructions. Ensure you provide accurate details for a smooth gaming experience.",
        },
        {
          title: "I've forgotten my password. What should I do?",
          answer:
            "Click on the 'Forgot Password' link on the login page and follow the instructions. If you encounter any issues, please email support@BCFUN.com for assistance.",
        },
        {
          title: "Are my personal details safe with BCFUN?",
          answer:
            "Absolutely. We use state-of-the-art encryption technology to ensure your personal and financial details remain confidential and secure.",
        },
        {
          title: "How do I deposit funds?",
          answer:
            "After logging in, navigate to the 'Deposit' section. Choose your preferred payment method and follow the on-screen instructions.",
        },
        {
          title: "How long do withdrawals take?",
          answer:
            "Withdrawal times vary based on the payment method. Typically, e-wallet withdrawals are processed within 24 hours, while bank transfers may take 3-5 business days.",
        },
        {
          title: "Are there any deposit or withdrawal fees?",
          answer:
            "This depends on your chosen payment method. Any applicable fees will be clearly indicated during the transaction process.",
        },
        {
          title: "Can I play BCFUN games on my mobile?",
          answer:
            "Yes! BCFUN is optimized for mobile play, allowing you to enjoy your favorite games on the go.",
        },
        {
          title: "How do the BCFUN mini-games work?",
          answer:
            "Mini-games are quick, simplified versions of traditional casino games. They offer a faster playtime and can be accessed from the main game lobby.",
        },
        {
          title: "I'm experiencing technical issues. Who can help?",
          answer:
            " If you're facing technical problems, we recommend using our live chat feature for immediate assistance. Alternatively, you can email our support team at support@BCFUN.com with a detailed description of the issue, and we'll assist you promptly.",
        },
        {
          title: "How can I contact customer support?",
          answer:
            "For real-time support, click on the 'Live Chat' button available on our website. If you prefer, you can also reach our support team by emailing support@BCFUN.com. We aim to respond to all queries within 24 hours.",
        },
        {
          title: "How can I get in touch with customer support?",
          answer:
            "You can reach our support team by emailing support@BCFUN.com. We aim to respond to all queries within 24 hours.",
        },
        {
          title: "Are the games on BCFUN fair?",
          answer:
            "Absolutely. We use certified Random Number Generators (RNG) to ensure fair play across all our games.",
        },
        {
          title: "Do you offer any promotions or bonuses?",
          answer:
            "Yes! We frequently offer bonuses, promotions, and special events for our players. Keep an eye on your inbox and our promotions page for the latest offers.",
        },
        {
          title: "I have suggestions for the platform. How can I share them?",
          answer:
            "We always appreciate feedback from our players. If you have suggestions or ideas, please send them to support@BCFUN.com.",
        },
      ],
    },
  ];
  let activeTab: number = 0;
  let openedQuestions: number[] = [0];
  function chooseTab(i: number) {
    activeTab = i;
    openedQuestions = [0];
  }
  function openQuestion(i: number) {
    if (openedQuestions.includes(i)) {
      openedQuestions = openedQuestions.filter((num) => num != i);
      return;
    }
    openedQuestions = [...openedQuestions, i];
  }
</script>

<div class="component-title">Support</div>

<div class="tabs">
  <div class="header" style="display: none;">
    {#each tabs as tab, i}
      <div
        class="item {i == activeTab && 'active'}"
        on:click={() => chooseTab(i)}
        on:keydown={() => chooseTab(i)}
      >
        {tab.title}
      </div>
    {/each}
  </div>
  <div class="body">
    {#each tabs[activeTab].questions as question, i}
      <div class="question">
        <div
          class="title"
          on:click={() => openQuestion(i)}
          on:keydown={() => openQuestion(i)}
        >
          {question.title}
        </div>
        <div class="answer {openedQuestions.includes(i) && 'open'}">
          {@html question.answer}
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .tabs {
    flex: 1 0 0;
    margin: 30px 0 0;
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    .header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      .item {
        font-weight: 600;
        display: inline-flex;
        height: 40px;
        padding: 0 15px;
        font-size: 13px;
        text-transform: uppercase;
        text-decoration: none;
        color: var(--tab-text-color);
        border-radius: 8px;
        background-color: var(--tab-bg-color);
        cursor: pointer;
        align-items: center;
        white-space: nowrap;
        transition-duration: 0.2s;
        transition-property: background-color;
        transition-timing-function: ease-in-out;
        @media (max-width: 768px) {
          font-size: 11px;
          padding: 0 10px;
        }
        &:hover,
        &.active {
          color: var(--tab-hover-text-color);
          background-color: var(--tab-hover-bg-color);
        }
      }
    }
    .body {
      width: 100%;
      display: flex;
      flex-direction: column;
      .question {
        color: var(--text-color-primary);
        background-color: var(--panel-background-color-secondary);
        border-radius: 8px;
        margin-bottom: 15px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .title {
          display: flex;
          padding: 5px 25px;
          min-height: 50px;
          font-size: 15px;
          font-weight: 600;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          @media (max-width: 768px) {
            font-size: 13px;
            padding: 5px 15px;
          }
        }
        .answer {
          padding: 15px 25px;
          border-top: 1px solid var(--accordion-border-color);
          overflow: hidden;
          display: none;
          font-size: 14px;
          color: var(--text-secondary);
          @media (max-width: 768px) {
            font-size: 12px;
            padding: 10px 15px;
          }
          &.open {
            display: block;
          }
        }
      }
    }
  }
</style>
