<script lang="ts">
  import api from "$lib/api";
  import Alert from "$lib/elements/Alert";
  import Button from "$lib/elements/Button";
  import Arrow from "$lib/elements/Icons/Arrow.svelte";
  import UploadInput from "./UploadInput.svelte";
  import { player } from "$lib/stores/player";
  import LoadingOverlay from "$lib/elements/LoadingOverlay.svelte";

  type Level = {
    label: string;
    key: number;
    block: boolean | number;
    description: string;
    inputs: {
      name: string;
      key: string;
      required: boolean;
      type: number;
      file: FormData;
      error?: string;
    }[];
  };

  const levels: Level[] = [
    {
      label: "Level 1",
      key: 1,
      block: false,
      description:
        "Please upload your proof of identity. All documents must be laying on a flat surface with all 4 corners inside the frame. All information should be clear and identifiable.",
      inputs: [
        {
          name: "Proof of Identity (Front)",
          key: "front",
          required: true,
          type: 1,
          file: new FormData(),
        },
        {
          name: "Proof of Identity (Back)",
          key: "back",
          required: false,
          type: 2,
          file: new FormData(),
        },
      ],
    },
    {
      label: "Level 2",
      key: 2,
      block: 1,
      description:
        "Please upload your proof of address. All documents must be laying on a flat surface with all 4 corners inside the frame. All information should be clear and identifiable.",
      inputs: [
        {
          name: "Proof of Address",
          key: "proof",
          required: true,
          type: 3,
          file: new FormData(),
        },
      ],
    },
    {
      label: "Level 3",
      key: 3,
      block: 2,
      description:
        "Please upload supporting documentation for your Source of Funds. Document laying on a flat surface must show all 4 corners and all information should be clear and identifiable.",
      inputs: [
        {
          name: "Source of Funds",
          key: "source",
          required: true,
          type: 4,
          file: new FormData(),
        },
      ],
    },
  ];
  let errors = {} as any;
  let statuses = {} as any;
  let activeLevel: number = 0;
  function chooseLevel(i: number) {
    if (i < 0) {
      return;
    }
    if (i > 2) {
      return;
    }
    activeLevel = i;
  }
  async function submit(level: Level) {
    if (
      statuses.hasOwnProperty(level.key) &&
      statuses[level.key] === "locked"
    ) {
      Alert.error("Please complete the previous level.");
      return;
    }
    if (
      statuses.hasOwnProperty(level.key) &&
      statuses[level.key] === "reviewing"
    ) {
      // Alert.warning("Your request is under review.");
      return;
    }
    loading = true;
    level.inputs.forEach(async (input) => {
      let _data: { file_uuid?: string; type?: number } = {};
      if (input.required && !input.file.get("file")) {
        errors[input.key] = "Upload the required file";
        loading = false;
        return;
      }
      if (input.required && input.file.get("file")) {
        const [resFile, err] = await api.file.fileAdd(input.file);
        if (err) {
          Alert.error("The file could not be uploaded");
          loading = false;
          return;
        }
        _data = { file_uuid: resFile.uuid, type: input.type };

        const [_, _err] = await api.players.addKycFile(_data);
        if (_err) {
          Alert.error("Something went wrong, contact support");
          loading = false;
          return;
        }
        await getKYCDocuments();
        loading = false;
      }
    });
  }

  let documents: any[] | undefined = undefined;
  let loading: boolean = true;

  async function getKYCDocuments() {
    loading = true;
    [documents] = await api.players.getKycInfo();
    checkLevel();
    loading = false;
  }

  $: if ($player.id) {
    getKYCDocuments();
  }

  function checkLevel() {
    statuses = {};
    levels.map((level, i) => {
      level.inputs.forEach((input) => {
        if (input.required) {
          let prevDoc = documents!.find(
            (doc) =>
              doc.type ===
              levels[i - 1]?.inputs.find((input) => input.required)?.type
          );
          let pendingDoc = documents!.find(
            (document) => document.type === input.type && document.status === 1
          );
          let declinedDoc = documents!.find(
            (document) => document.type === input.type && document.status === 3
          );
          if (
            levels[i - 1] !== undefined &&
            !pendingDoc &&
            !prevDoc &&
            $player.kyc_status < level.key - 1
          ) {
            statuses[level.key] = "locked";
          }
          if (declinedDoc) {
            statuses[level.key] = "declined";
          }
          if (pendingDoc) {
            statuses[level.key] = "reviewing";
            chooseLevel(activeLevel + 1);
          }
          if ($player.kyc_status >= level.key) {
            statuses[level.key] = "confirmed";
            chooseLevel(activeLevel + 1);
          }
        }
      });
    });
  }
</script>

<div class="block">
  <LoadingOverlay {loading}>
    {#each levels as level, i}
      <div
        class="level"
        style:pointer-events={statuses[level.key] === "confirmed" ||
        statuses[level.key] === "reviewing"
          ? "none"
          : "auto"}
        style:order={i}
        on:click={() => {
          if (
            statuses[level.key] !== "confirmed" &&
            statuses[level.key] !== "reviewing"
          ) {
            chooseLevel(i);
          }
        }}
        on:keydown
      >
        <span class="d-flex items-center gap-10">
          {level.label}
          {#if statuses.hasOwnProperty(level.key)}
            <div class="badge badge-{statuses[level.key]}">
              {statuses[level.key]}
            </div>
          {/if}
        </span>
        {#if statuses[level.key] !== "confirmed" && statuses[level.key] !== "reviewing"}
          <Arrow direction={activeLevel === i ? "down" : "left"} />
        {/if}
      </div>
    {/each}
    {#if activeLevel !== null && statuses[levels[activeLevel]?.key] !== "confirmed" && statuses[levels[activeLevel]?.key] !== "reviewing"}
      <div class="body" style:order={activeLevel}>
        <div class="padding">
          <div class="title">Verification</div>
          {#if statuses[levels[activeLevel]?.key] === "locked" && levels[activeLevel].block}
            <div class="lock mt-10">
              Please complete level
              {levels[activeLevel].block === 1 ? "one" : "two"}
              verification first.
            </div>
          {/if}
          {#if statuses[levels[activeLevel].key] === "declined"}
            <div class="lock mt-10">
              Your request declined, please upload file again.
            </div>
          {/if}
          <div class="description mt-10">
            {levels[activeLevel].description}
          </div>
          <div class="inputs">
            {#each levels[activeLevel].inputs as input}
              <div class="input mt-10">
                <UploadInput
                  bind:input
                  error={errors.hasOwnProperty(input.key)
                    ? errors[input.key]
                    : ""}
                />
              </div>
            {/each}
          </div>
          <div class="accept">
            Following file types are accepted: .png, .jpg, .pdf
          </div>
        </div>
        <div class="bottom">
          <span> All data is safely stored and encrypted. </span>
          <Button on:click={() => submit(levels[activeLevel])}>Submit</Button>
        </div>
      </div>
    {/if}
  </LoadingOverlay>
</div>

<style lang="scss">
  .badge {
    font-size: 12px;
    font-weight: 500;
    color: white;
    padding: 3px 5px;
    border-radius: 8px;
    &-reviewing {
      background-color: var(--brand-primary);
    }
    &-confirmed {
      background-color: var(--green);
    }
    &-declined {
      background-color: var(--red);
    }
    &-locked {
      display: none;
    }
  }
  .block {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 30px 0 0;
    .level {
      position: relative;

      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      color: #9c9cab;
      font-size: 14px;
      font-weight: 300;
      line-height: 140%;

      background-color: #232c3b;
      border-radius: 8px;

      padding: 0 9px;
      height: 44px;
      min-height: 44px;

      cursor: pointer;

      &:hover {
        color: #fff;
      }
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background-color: #232c3b;
      border-radius: 8px;
      .padding {
        padding: 15px;
      }
      .title {
        font-size: 18px;
        font-weight: 500;
        color: white;
      }
      .lock {
        color: var(--yellow);
        font-size: 14px;
        font-weight: 500;
      }
      .description {
        font-size: 14px;
        color: var(--text-secondary);
        padding-bottom: 10px;
        border-bottom: 1px solid var(--brand-stroke);
      }
      .accept {
        font-size: 12px;
        color: var(--text-secondary);
        margin: 10px 0 0;
        text-align: center;
      }
      .bottom {
        border-top: 1px solid var(--brand-stroke);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        & > span {
          color: var(--text-secondary);
          font-size: 12px;
        }
        .confirmed {
          font-size: 14px;
          font-weight: 600;
          color: var(--green);
        }
      }
    }
  }
</style>
