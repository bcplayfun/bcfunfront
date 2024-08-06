/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

type User = {
  name: string;
  user_hash: string;
  user_id: string;
};

import { isClient } from "$lib/utils/page";

export default {
  initialize() {
    const APP_ID = "qweqweqw";

    window.intercomSettings = {
      app_id: APP_ID,
    };
    (function () {
      const w = window;
      const ic = w.Intercom;
      if (typeof ic === "function") {
        ic("reattach_activator");
        ic("update", w.intercomSettings);
      } else {
        const d = document;
        const i = function (...args) {
          i.c(args);
        };
        i.q = [];
        i.c = function (args) {
          i.q.push(args);
        };
        w.Intercom = i;
        const l = function () {
          const s = d.createElement("script");
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://widget.intercom.io/widget/" + APP_ID;
          const x = d.getElementsByTagName("script")[0];
          x.parentNode.insertBefore(s, x);
        };
        if (document.readyState === "complete") {
          l();
        } else if (w.attachEvent) {
          w.attachEvent("onload", l);
        } else {
          w.addEventListener("load", l, false);
        }
      }
    })();
  },
  setLauncherVisible(visible: boolean) {
    window.Intercom("update", {
      hide_default_launcher: !visible,
    });
  },
  toggleVisibility(downMD: boolean, isAsideMenuExtended: boolean) {
    if (isClient) {
      if (downMD) {
        if (isAsideMenuExtended) {
          this.setLauncherVisible(true);
        } else {
          this.setLauncherVisible(false);
        }
      } else {
        this.setLauncherVisible(true);
      }
    }
  },
  setUser({ name, user_hash, user_id }: User) {
    if (isClient) {
      window.Intercom("update", {
        name,
        user_hash,
        user_id,
      });
    }
  },
  openChat() {
    if (isClient) {
      window.Intercom("show");
    }
  },
  hideChat() {
    if (isClient) {
      window.Intercom("hide");
    }
  },
};
