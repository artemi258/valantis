import { request } from "../utils/http";

const baseURL = "https://api.valantis.store:41000";

export const API = {
  getIds: (offset, limit) =>
    request(`${baseURL}`, "POST", {
      action: "get_ids",
      params: { offset, limit },
    }),
  getItems: (ids) =>
    request(`${baseURL}`, "POST", {
      action: "get_items",
      params: { ids },
    }),
  getIdsByFilter: (filter, data) =>
    request(`${baseURL}`, "POST", {
      action: "filter",
      params: { [filter]: data },
    }),
};
