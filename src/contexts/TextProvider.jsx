import { createContext, useContext } from "react";
import LangString from "../contexts/text/es_AR.json";

/**
 * @typedef {Object} WithChildren
 * @property {React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[]} children
 */

const baseTextContext = createContext(LangString);

export function useRegisterCardString() {
  return useContext(baseTextContext).public.components.registerCard;
}

export function useRenewalCardString() {
  return useContext(baseTextContext).public.components.renewalcard;
}
export function useUnRegisterCardString() {
  return useContext(baseTextContext).public.components.unregistercard;
}
export function useSuccessAEString() {
  return useContext(baseTextContext).public.fragments.successae;
}
export function useUnRegisterSuccessString() {
  return useContext(baseTextContext).public.fragments.unregistersuccess;
}
export function useErrorAEString() {
  return useContext(baseTextContext).public.fragments.errorae;
}
export function useDatePlanAEString() {
  return useContext(baseTextContext).public.fragments.dateplanae;
}
export function useFileUploadSectionString() {
  return useContext(baseTextContext).public.fragments.fileUploadSection;
}

export function useCommonsString() {
  return useContext(baseTextContext).public.components.commons;
}

export function useFooterString() {
  return [
    useContext(baseTextContext).public.components.footer,
    useContext(baseTextContext).assets.components.footer,
  ];
}

export function useLoginString() {
  return [
    useContext(baseTextContext).public.components.loginCard,
    useContext(baseTextContext).assets.components.loginCard,
  ];
}

export function useTopBarString() {
  return [
    useContext(baseTextContext).public.components.topbar,
    useContext(baseTextContext).assets.components.topbar,
  ];
}

export function useInfoDataCardString() {
  return useContext(baseTextContext).public.fragments.form.infodatacard;
}

export function useAddressDataCardString() {
  return useContext(baseTextContext).public.fragments.form.addressdatacard;
}

export function useExtraDataCardString() {
  return useContext(baseTextContext).public.fragments.form.extradatacard;
}
export function useFileAttachCardString() {
  return useContext(baseTextContext).public.fragments.form.fileattachcard;
}
export function useUserBadgeString() {
  return useContext(baseTextContext).public.fragments.userbadge;
}

export default {
  useRegisterCardString,
  useFileUploadSectionString,
  useFooterString,
  useLoginString,
  useTopBarString,
  useCommonsString,
  useRenewalCardString,
  useSuccessAEString,
  useErrorAEString,
  useDatePlanAEString,
  useInfoDataCardString,
  useAddressDataCardString,
  useExtraDataCardString,
  useFileAttachCardString,
  useUserBadgeString,
  useUnRegisterCardString,
  useUnRegisterSuccessString,
};
