import { atom } from "recoil";

export const currentUser = atom({
  key: "selectedConversation",
  default: null,
});

export const sendMessage = atom({
  key: "messages",
  default: [],
});

export const searchTerm = atom({
  key: "search",
  default: "",
})