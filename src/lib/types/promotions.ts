export type Promotion = {
  id: number;
  url: string;
  title: string;
  description: string;
  action_title: string;
  action_url: string;
};

export const EMPTY_PROMOTION = {
  id: 0,
  url: "",
  title: "",
  description: "",
  action_title: "",
  action_url: "",
};
