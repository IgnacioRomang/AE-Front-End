import { createContext, useContext } from "react";
import LangString from "../contexts/text/es_AR.json";

/**
 * @typedef {Object} WithChildren
 * @property {React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[]} children
 */

const baseTextContext = createContext(LangString);

export function useRootFAQString() {
  return useContext(baseTextContext).public.root.faq;
}

export function useRootFooterString() {
  return useContext(baseTextContext).public.root.footer;
}

export function useRootTopbarString() {
  return useContext(baseTextContext).public.root.topbar;
}

export function useCommonsButtonString() {
  return useContext(baseTextContext).public.commons.button;
}

export function useCommonsFieldString() {
  return useContext(baseTextContext).public.commons.field;
}

export function useCommonsTextString() {
  return useContext(baseTextContext).public.commons.text;
}

export function useRegisterCardString() {
  return useContext(baseTextContext).public.components.registerCard;
}

export default {
  useRegisterCardString,
};
