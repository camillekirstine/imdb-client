// src/api/seriesService.js
import backend from "./backendClient";

const DEFAULT_PAGE_SIZE = 20;

const buildQs = (obj = {}) => {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    qs.set(k, String(v));
  }
  return qs.toString();
};

const seriesService = {
  listSeries({ page = 1, pageSize = DEFAULT_PAGE_SIZE, genre, sort } = {}) {
    const qs = buildQs({ page, pageSize, type: "series", genre, sort });
    return backend.get(`/Movies?${qs}`);
  },

  // ✅ FIXED: use existing backend endpoint
  getSeries(tconst) {
    if (!tconst) {
      return Promise.reject(new Error("Missing series tconst"));
    }

    // This endpoint EXISTS and already works
    return backend.get(`/Movies/${tconst}`);
    // (or `/Titles/${tconst}` if that’s what your controller exposes)
  },

  getEpisode(tconst) {
    if (!tconst) {
      return Promise.reject(new Error("Missing episode tconst"));
    }
    return backend.get(`/Episodes/${tconst}`);
  },
};

export default seriesService;
