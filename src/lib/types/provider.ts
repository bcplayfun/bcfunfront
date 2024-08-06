type File = {
  uuid: string;
  url: string;
  type: string;
};

export type Provider = {
  id: number;
  name: string;
  count: number;
  file: File | null;
};

export const EMPTY_PROVIDER = {
  id: 0,
  name: "",
  count: 0,
  file: {
    uuid: "",
    url: "",
    type: "",
  },
};
