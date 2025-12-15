import backend from "./backendClient";

function getUserId() {
  const raw = localStorage.getItem("user");
  if (!raw) throw new Error("User not logged in");
  const user = JSON.parse(raw);
  return user.userId;
}

export const bookmarkService = {
  getAll() {
    return backend.get("/Bookmarks");
  },

  addTitle(tconst) {
    return backend.post("/Bookmarks", {
      userId: getUserId(),
      tconst: tconst,
      nconst: null,        // 🚨 MUST be null
    });
  },

  addPerson(nconst) {
    return backend.post("/Bookmarks", {
      userId: getUserId(),
      tconst: null,        // 🚨 MUST be null
      nconst: nconst,
    });
  },

  remove(bookmarkId) {
    return backend.delete(`/Bookmarks/${bookmarkId}`);
  },
};
