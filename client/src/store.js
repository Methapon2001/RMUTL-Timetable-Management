import { writable } from "svelte/store";

export const roomStore = writable({
  data: [],
  limit: null,
  offset: null,
  total: null,
});

export const subjectStore = writable({
  data: [],
  limit: null,
  offset: null,
  total: null,
});

export const instructorStore = writable({
  data: [],
  limit: null,
  offset: null,
  total: null,
});

export const timetableStore = writable({
  data: [],
  limit: null,
  offset: null,
  total: null,
});
