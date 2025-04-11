import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import TagsInput from "../TagsInput";
import { createNote, editNote } from "../../api/notes";
import { toast } from "react-toastify";

const AddEditCard = ({
  openAddEditModal,
  setOpenAddEditModal,
  fetchAllNotes,
}) => {
  const editTitle = openAddEditModal.data?.title;
  const editContent = openAddEditModal.data?.content;
  const editTags = openAddEditModal.data?.tags;

  const [title, setTitle] = useState(editTitle || "");
  const [content, setContent] = useState(editContent || "");
  const [tags, setTags] = useState(editTags || []);

  // Add new Note
  const addNewNote = async () => {
    try {
      const response = await createNote({ title, content, tags });
      if (response.data && response.data.note) {
        setOpenAddEditModal({ ...openAddEditModal, isShown: false });
        toast.success("New Note added");
        fetchAllNotes();
      }
    } catch (error) {
      console.log("Unexpected error. Please try again." + error);
    }
  };

  // Edit Note
  const updateNote = async () => {
    try {
      const noteId = openAddEditModal.data._id;
      const response = await editNote(noteId, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        setOpenAddEditModal({ ...openAddEditModal, isShown: false });
        toast.success("Note Updated");
        fetchAllNotes();
      }
    } catch (error) {
      console.log("Unexpected error. Please try again." + error);
    }
  };

  return (
    <div className='relative'>
      <form
        className='flex flex-col gap-3 rounded-md'
        onSubmit={(e) => {
          e.preventDefault();
          openAddEditModal.type === "add" ? addNewNote() : updateNote();
        }}
      >
        <h2 className='text-primary-dark text-xl uppercase font-medium tracking-wider'>
          {openAddEditModal.type} Note
        </h2>
        <label className='input-label' htmlFor='title'>
          Title
        </label>
        <input
          type='text'
          className='text-2xl p-1 text-primary-dark outline-none bg-slate-200'
          placeholder='Enter the title'
          id='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <label className='input-label' htmlFor='content'>
          Content
        </label>
        <textarea
          id='content'
          cols={10}
          placeholder='Enter the Content'
          className='text-primary-dark outline-none bg-slate-200 w-full h-[10rem] p-3'
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></textarea>

        <TagsInput allTags={tags} setAllTags={setTags}></TagsInput>
        <button type='submit' className='input-btn'>
          {openAddEditModal.type === "add" ? "Add" : "Update"}
        </button>
      </form>
      <IoIosClose
        className='w-10 h-10 cursor-pointer hover:scale-110 text-slate-500 absolute -top-5 -right-5'
        onClick={(prev) => setOpenAddEditModal({ ...prev, isShown: false })}
      ></IoIosClose>
    </div>
  );
};

export default AddEditCard;
