declare module "simplebar-react" {
  import { ComponentType, HTMLAttributes, ReactNode } from "react";

  interface SimpleBarProps extends HTMLAttributes<HTMLDivElement> {
    autoHide?: boolean;
    forceVisible?: boolean | "x" | "y";
    direction?: "rtl" | "ltr";
    timeout?: number;
    clickOnTrack?: boolean;
    scrollbarMinSize?: number;
    scrollbarMaxSize?: number;
    children?: ReactNode;
  }

  const SimpleBar: ComponentType<SimpleBarProps>;
  export default SimpleBar;
}
