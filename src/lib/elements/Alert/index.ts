import { writable } from "svelte/store";

type Alert = {
  id: number;
  description: string;
  type: AlertType;
  config: Config;
};

type Config = {
  timeout: number;
  dismissible: boolean;
};

const DEFAULT_CONFIG: Config = {
  timeout: 4000,
  dismissible: true,
};

export const alerts = writable<Alert[]>([]);

export const dismissAlert = (id: number) => {
  alerts.update((all) => all.filter((t) => t.id !== id));
};

type AlertType = "error" | "success" | "warning";

export default {
  success(description: string, config = DEFAULT_CONFIG) {
    createNotification(description, "success", config);
  },
  error(description: string, config = DEFAULT_CONFIG) {
    createNotification(description, "error", config);
  },
  warning(description: string, config = DEFAULT_CONFIG) {
    createNotification(description, "warning", config);
  },
};

function createNotification(
  description: string,
  type: AlertType,
  config: Config
) {
  // TODO: make better id
  const id = Math.floor(Math.random() * 10000);

  const alert = {
    id,
    description,
    type,
    config,
  };

  alerts.update((all) => [...all, alert]);

  if (alert.config.timeout) {
    setTimeout(() => dismissAlert(id), alert.config.timeout);
  }
}
