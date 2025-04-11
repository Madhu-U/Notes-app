import axiosInstance from "./axios";

export const createNote = (data) => axiosInstance.post("/add-note", data);

export const getAllNotes = () => axiosInstance.get("/get-all-notes");

export const editNote = (id, data) =>
  axiosInstance.put(`/edit-note/${id}`, data);

export const deleteNote = (id) => axiosInstance.delete(`/delete-note/${id}`);

export const pinNote = (id, data) =>
  axiosInstance.put(`/update-note-pinned/${id}`, data);

export const searchNotes = (seachquery) =>
  axiosInstance.get("/search-notes", {
    params: { query: seachquery },
  });
