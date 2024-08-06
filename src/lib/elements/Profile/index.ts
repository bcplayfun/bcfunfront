export { default } from "./ProfileWrapper.svelte";

import Account from "$lib/components/Profile/Account";
import Games from "$lib/components/Profile/Games";
import Support from "$lib/components/Profile/Support";
import Feedback from "$lib/components/Profile/Feedback";
import Withdrawals from "$lib/components/Profile/Withdrawals";
// import Notifications from "$lib/components/Profile/Notifications";
import Bonuses from "$lib/components/Profile/Bonuses";
import Settings from "$lib/components/Profile/Settings";
import Activate from "$lib/components/Profile/Activate";

import * as assets from "./assets";

import { writable } from "svelte/store";
import Navigation from "./components/Navigation.svelte";

export type ProfileNavKey =
  | "navigation"
  | "my-account"
  | "my-games"
  | "bonuses"
  // | "notifications"
  // | "transactions"
  | "settings"
  | "withdrawals"
  | "feedback"
  | "support"
  | "activate";
export const TEST_KEYS = [
  "navigation",
  "my-account",
  "my-games",
  "bonuses",
  "activate",
  // "notifications",
  // "transactions",
  "settings",
  "withdrawals",
  "feedback",
  "support",
];

type Additional = { icon?: any; label: string; bg?: string; mt?: string };

interface NavigationType extends Additional {
  key: "navigation";
}
interface AccountType extends Additional {
  key: "my-account";
}
interface GamesType extends Additional {
  key: "my-games";
}
interface WithdrawalsType extends Additional {
  key: "withdrawals";
}
interface BonusesType extends Additional {
  key: "bonuses";
}
interface ActivateType extends Additional {
  key: "activate";
}
// interface TransactionsType extends Additional {
//   key: "transactions";
// }
interface SettingsType extends Additional {
  key: "settings";
}
interface FeedbackType extends Additional {
  key: "feedback";
}
interface SupportType extends Additional {
  key: "support";
}

export type NavigationItem =
  | NavigationType
  | AccountType
  | GamesType
  | WithdrawalsType
  | BonusesType
  | ActivateType
  // | NotificationsType
  // | TransactionsType
  | SettingsType
  | FeedbackType
  | SupportType;

export const TABS = writable<NavigationItem[]>([
  {
    key: "navigation",
    label: "Navigation",
  },
  {
    key: "my-account",
    label: "My Account",
    icon: assets.MyAccount,
    bg: "#1fada2",
  },
  {
    key: "bonuses",
    label: "My Bonuses",
    icon: assets.Bonuses,
    bg: "#186cb8",
  },
  {
    key: "withdrawals",
    label: "Withdrawals",
    icon: assets.Withdrawals,
    bg: "#d96208",
  },
  {
    key: "activate",
    label: "Activate",
    icon: assets.Activate,
    bg: "#00BC3D",
  },
  // {
  //   key: "notifications",
  //   label: "Notifications",
  //   icon: assets.Notifications,
  //   bg: "#d99e08",
  // },
  // {
  //   key: "transactions",
  //   label: "Transactions",
  //   icon: assets.Transactions,
  //   bg: "#0671a1",
  // },
  {
    key: "my-games",
    label: "My games",
    icon: assets.Games,
    bg: "#6448ff",
    mt: "20",
  },
  {
    key: "settings",
    label: "Settings",
    icon: assets.Settings,
    bg: "#797979",
    mt: "20",
  },
  {
    key: "feedback",
    label: "Leave Feedback",
    icon: assets.Feedback,
    bg: "#797979",
  },
  {
    key: "support",
    label: "Support",
    icon: assets.Support,
    bg: "#797979",
  },
]);

export const TAB_KEY_TO_COMPONENT: Record<NavigationItem["key"], any> = {
  navigation: Navigation,
  "my-account": Account,
  "my-games": Games,
  withdrawals: Withdrawals,
  activate: Activate,
  bonuses: Bonuses,
  // notifications: Notifications,
  // transactions: Notifications,
  settings: Settings,
  feedback: Feedback,
  support: Support,
};

export const profileKeyStore = writable<any>({});

export function go(key: string, value: string, third: string = "") {
  const searchParams = new URLSearchParams(window.location.search);
  if (key === "dashboard" && searchParams.get("settings")) {
    searchParams.delete("settings");
  }
  searchParams.delete(key);
  searchParams.append(key, value);
  if (third.length) {
    searchParams.append(value, third);
  }
  var pageUrl = "?" + searchParams.toString();
  window.history.pushState("", "", pageUrl);
  const customEvent = new Event("pushstatechange", { bubbles: true });
  window.dispatchEvent(customEvent);
}
