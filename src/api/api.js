import { request } from "../utils/http";

const baseURL = "http://api.valantis.store:40000";

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
