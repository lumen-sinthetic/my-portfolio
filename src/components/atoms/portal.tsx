"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  appendTo?: HTMLElement;
}

function Portal({ children, appendTo }: PortalProps) {
  if (typeof window === "undefined") return null;
  return createPortal(children, appendTo || document.body);
}

export default Portal;
