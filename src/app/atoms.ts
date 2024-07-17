import { atom } from "recoil";

import { Track } from "./types";

export const selectedGpxAtom = atom<Track | null>({
  key: "selectedGpx",
  default: null,
});

export const sidePanelAtom = atom<boolean>({
  key: "sidePanel",
  default: false,
});
