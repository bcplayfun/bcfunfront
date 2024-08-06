import type { ModalType } from "../store";
import BottomUp from "./BottomUp.svelte";
import Default from "./Default.svelte";
import Right from "./Right.svelte";
import Blank from "./Blank.svelte";
import New from "./New.svelte";
import Promotion from "./Promotion.svelte";

export default function getModalLayout(type: ModalType) {
  switch (type) {
    case "blank":
      return Blank;
    case "default":
      return Default;
    case "bottom-up":
      return BottomUp;
    case "right":
      return Right;
    case "new":
      return New;
    case "promotion":
      return Promotion;
    default:
      console.error("Unknown modal layout");
      return Default;
  }
}
