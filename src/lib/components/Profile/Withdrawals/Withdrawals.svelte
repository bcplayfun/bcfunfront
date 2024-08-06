<script lang="ts">
  import { player } from "$lib/stores/player";
  import BalanceSelect from "../components/BalanceSelect";
  import type { Balance } from "$lib/types/player";
  import { currencyIdToCurrency } from "$lib/stores/static";
  import Input from "$lib/elements/Input";
  import api from "$lib/api";
  import Alert from "$lib/elements/Alert";

  import { closeModals } from "$lib/elements/Modal";
  import { CONFIRMATIONS_LIMITS, sortCurrencies } from "$lib/utils/currency";
  import {
    define,
    object,
    type Failure,
    Struct,
    validate,
    StructError,
  } from "superstruct";
  import { EMPTY_FAILURE } from "$lib/types/validation";
  import { mapErrors } from "$lib/utils/validation";
  import WithdrawList from "./components/WithdrawList/WithdrawList.svelte";
  import { go } from "$lib/elements/Profile";
  import Button from "$lib/elements/Button";

  let amount = "";
  let address = "";
  let fiatForm = {
    card_number: "",
    card_expiration_date: "",
  };

  let minimumWithdrawal = 0;

  let selectedBalance: Balance | undefined = undefined;
  let loaded = false;
  $: if ($player?.id && !loaded) {
    selectedBalance = $player.real_balances?.find(
      (balance) => balance.currency_id === $player.selected_currency_id
    );
    loaded = true;
  }

  $: if (selectedBalance) {
    minimumWithdrawal =
      CONFIRMATIONS_LIMITS[selectedBalance.currency.code].min_withdrawal;
  }

  let errors: Record<string, Failure> = { [""]: { ...EMPTY_FAILURE } };

  const CheckAmount = define("checkAmount", (value: any) => {
    if (!selectedBalance?.amount) {
      return false;
    }
    if (!parseFloat(value)) {
      return "Amount is not valid";
    }
    if (parseFloat(value) <= 0) {
      return "Amount cannot be less than 0";
    }
    if (parseFloat(amount) > parseFloat(selectedBalance?.amount!)) {
      return "Insufficient balance";
    }
    if (parseFloat(amount) < minimumWithdrawal) {
      return "Amount is less than min. amount";
    }
    if (amount === "") {
      return "Amount is required";
    }
    return true;
  });
  const CheckAddress = define("checkAddress", (value: any) => {
    if (value === "") {
      return "Address is required";
    }
    return true;
  });
  const CheckCardNumber = define("checkNumber", (value: any) => {
    if (value === "") {
      return "Number is required";
    }
    return true;
  });
  const CheckExpDate = define("checkExpDate", (value: any) => {
    if (value === "") {
      return "Expiration date is required";
    }
    return true;
  });

  const FiatStruct: Struct<any> = object({
    card_number: CheckCardNumber,
    card_expiration_date: CheckExpDate,
  });

  let loading = false;
  let refetch: boolean = false;
  async function onWithdraw() {
    const [amountError, _f] = validate(amount, CheckAmount);
    if (amountError instanceof StructError) {
      errors["amount"] = amountError.failures()[0];
      return;
    }
    if (selectedBalance?.currency.is_crypto) {
      const [addressError, _f] = validate(address, CheckAddress);
      if (addressError instanceof StructError) {
        errors["address"] = addressError.failures()[0];
        return;
      }
    } else {
      const [structError, _f] = validate(fiatForm, FiatStruct);
      if (structError instanceof StructError) {
        errors = mapErrors(structError.failures());
        return;
      }
    }

    errors = { [""]: { ...EMPTY_FAILURE } };

    if ($player.kyc_status == 0) {
      go("dashboard", "settings", "verification");
      closeModals();
      return;
    }
    loading = true;
    const [success, _] = await api.players.withdrawRequest({
      currency_id: selectedBalance?.currency_id,
      amount: amount,
      crypto_address: address,
      card_number: fiatForm.card_number,
      card_expiration_date: fiatForm.card_expiration_date,
    });

    if (success) {
      refetch = true;
      Alert.success("Withdraw request has successfully recieved.");
    }
    amount = "";
    address = "";
    fiatForm = {
      card_number: "",
      card_expiration_date: "",
    };
    loading = false;
  }

  function onBalanceSelect() {
    amount = "";
    address = "";
    fiatForm = {
      card_number: "",
      card_expiration_date: "",
    };
    errors = { [""]: { ...EMPTY_FAILURE } };
  }
</script>

<div class="component-title">Withdrawals</div>
<div class="withdraw">
  <div class="select-boxes">
    <BalanceSelect
      bind:selectedBalance
      balances={sortCurrencies(
        $player?.real_balances.filter((balance) => balance.currency.is_active),
        selectedBalance
      )}
      showAmount
      on:select={() => onBalanceSelect()}
    />
  </div>
  <div class="withdraw-inputs">
    <Input
      bind:value={amount}
      error={errors["amount"] && errors["amount"]}
      placeholder={"Enter withdraw amount"}
      allowWhitespaces={false}
    >
      <div class="min-amount">
        Minimum withdraw
        {minimumWithdrawal}
        {selectedBalance?.currency_id
          ? $currencyIdToCurrency[selectedBalance?.currency_id]?.code
          : ""}
      </div>
    </Input>
    {#if selectedBalance?.currency.is_crypto}
      <Input
        bind:value={address}
        error={errors["address"] && errors["address"]}
        placeholder={"Enter wallet address"}
        allowWhitespaces={false}
      />
    {:else}
      <div class="input-row">
        <Input
          bind:value={fiatForm.card_number}
          error={errors["card_number"] && errors["card_number"]}
          placeholder={"Card Number"}
          allowWhitespaces={false}
        />
        <Input
          bind:value={fiatForm.card_expiration_date}
          error={errors["card_expiration_date"] &&
            errors["card_expiration_date"]}
          placeholder={"Expiration Date"}
          allowWhitespaces={false}
        />
      </div>
    {/if}
    <Button type="submit" size="large" on:click={onWithdraw} {loading}
      >Withdraw</Button
    >
  </div>
  <!-- <WithdrawList bind:refetch /> -->
</div>

<style lang="scss">
  .withdraw {
    flex: 1 0 0;
    margin-top: 15px;
    padding-right: 15px;
    overflow: auto;
  }
  .select-boxes {
    display: flex;
    margin-bottom: 15px;
  }

  .withdraw-inputs {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .min-amount {
    color: var(--brand-primary);
    font-size: 12px;
    font-weight: 600;
    line-height: 120%;
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    right: 12px;
    bottom: -6px;
    background-color: var(--dialog-background-color);
    padding: 1px 5px;
    font-size: 10px;

    @include media.down(md) {
      font-size: 10px;
      gap: 4px;
      img {
        width: 13px;
      }
    }
  }
  .input-row {
    display: grid;
    gap: 15px;
    grid-template-columns: 1fr 0.6fr;
    @media (max-width: 556px) {
      display: flex;
      flex-direction: column;
    }
  }
  button {
    height: 48px;
    min-width: 150px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid #29292f;
    background: transparent;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    line-height: 120%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 0 15px;

    &:hover {
      filter: brightness(1.1);
      outline: 2px solid #29292f;
    }

    &.primary {
      background: var(--brand-primary);
    }
  }
</style>
