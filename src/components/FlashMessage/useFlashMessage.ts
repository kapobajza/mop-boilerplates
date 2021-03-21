import { useContext } from "react";

import FlashMessageContext from "./context";

export default function () {
  const context = useContext(FlashMessageContext);
  return context;
}
