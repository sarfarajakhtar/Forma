import "@puckeditor/core/puck.css";
import type { ReactNode } from "react";

/** Puck editor chrome stylesheet is scoped to this test route segment. */
export default function PuckEditLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
