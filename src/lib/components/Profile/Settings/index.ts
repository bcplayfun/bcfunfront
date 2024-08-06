export { default } from "./Settings.svelte";

import Navigation from "./components/Navigation.svelte";
import Personal from "./components/Personal/Personal.svelte";
import ChangePassword from "./components/Change/ChangePassword.svelte";
import Responsible from "./components/Responsible/Responsible.svelte";
import Verification from "./components/Verification/Verification.svelte";

import * as assets from "./assets";

import { writable } from "svelte/store";

export type SettingsNavKey =
  | "navigation"
  | "personal-information"
  | "verification"
  | "change-password"
  | "responsible-gaming";
export const TEST_KEYS = [
  "navigation",
  "personal-information",
  "verification",
  "change-password",
  "responsible-gaming",
];

type Additional = { icon?: any; label: string; bg?: string; mt?: string };

interface NavigationType extends Additional {
  key: "navigation";
}
interface PersonalType extends Additional {
  key: "personal-information";
}
interface VerifyType extends Additional {
  key: "verification";
}
interface ChangePasswordType extends Additional {
  key: "change-password";
}
interface ResponsibleType extends Additional {
  key: "responsible-gaming";
}
export type NavigationItem =
  | NavigationType
  | PersonalType
  | VerifyType
  | ChangePasswordType
  | ResponsibleType;

export const TABS = writable<NavigationItem[]>([
  {
    key: "navigation",
    label: "Settings",
  },
  {
    key: "personal-information",
    label: "Personal Information",
    icon: assets.MyAccount,
  },
  {
    key: "verification",
    label: "Verification",
    icon: assets.VerificationIcon,
  },
  {
    key: "change-password",
    label: "Change Password",
    icon: assets.KeyIcon,
  },
  {
    key: "responsible-gaming",
    label: "Responsible Gaming",
    icon: assets.ResponsibleIcon,
  },
]);

export const TAB_KEY_TO_COMPONENT: Record<NavigationItem["key"], any> = {
  navigation: Navigation,
  "personal-information": Personal,
  verification: Verification,
  "change-password": ChangePassword,
  "responsible-gaming": Responsible,
};
