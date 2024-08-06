export { default } from "./NotificationWrapper.svelte";
import { type Writable, writable } from "svelte/store";

export type Notification = {
  notification_id: number;
  template: Template;
};

export type Template = {
  title: string;
  description: string;
  action_url?: string;
  action_title?: string;
  url?: string;
};

export const notificationMessages: Writable<Notification[]> = writable([]);

export const dismissNotificationMessage = (id: number) => {
  notificationMessages.update((all) =>
    all.filter((t: Notification) => t.notification_id !== id)
  );
};

export const createNotificationMessages = (notification: Notification) => {
  const id = notification.notification_id;

  const notificationMessage: Notification = {
    notification_id: id,
    template: notification.template,
  };

  notificationMessages.update((all: Notification[]) => [
    ...all,
    notificationMessage,
  ]);
};
