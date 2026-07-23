import { splotlightBorder } from "./spotlight-border";
import { mouseFollowerRun } from "./mouse-follower";

/**
 * Wires up the mouse-follower glow and, optionally, the spotlight border
 * for a section identified by `selector` (its DOM id, without "#").
 */
export const initSectionEffects = ({
  selector,
  spotlight = true,
}: {
  selector: string;
  spotlight?: boolean;
}) => {
  if (spotlight) splotlightBorder({ selector });
  mouseFollowerRun({ selector });
};
