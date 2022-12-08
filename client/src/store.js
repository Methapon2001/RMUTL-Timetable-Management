import { writable } from "svelte/store";

export const roomStore = writable({
  data: [],
  limit: null,
  offset: null,
  total: null,
});