import type { Failure } from "superstruct";

export const EMPTY_FAILURE: Failure = {
  value: "",
  key: "",
  type: "",
  refinement: "",
  message: "",
  branch: [],
  path: [],
};
