import React from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { formatTimestamp } from "../../utils/helper";

const NoteCard = ({
  note,
  handleDelete,
  setOpenAddEditModal,
  fetchAllNotes,
  handlePin,
}) => {
  const { title, content, createdAt, isPinned, tags } = note;

  return (
    <div className='rounded-lg border border-slate-400 p-3 shadow hover:shadow-xl hover:scale-103 transition-all relative'>
      <p className='text-slate-500 text-sm py-1'>
        {formatTimestamp(createdAt)}
      </p>
      <h4 className='text-primary-dark text-base py-1'>{title}</h4>
      <p className='text-sm text-slate-600 py-1'>{content}</p>
      <div className='flex gap-3 text-xs pt-3 pb-2 flex-wrap justify-center'>
        {tags?.map((tag, index) => {
          return (
            <p
              key={index}
              className='bg-accent rounded-full px-3 py-1 text-light'
            >
              {tag}
            </p>
          );
        })}
      </div>
      <div className='flex items-center justify-around pt-3'>
        <MdOutlineEdit
          onClick={() =>
            setOpenAddEditModal({ isShown: true, type: "edit", data: note })
          }
          className='icon-btn'
        ></MdOutlineEdit>
        {isPinned ? (
          <TbPinnedFilled
            onClick={() => handlePin(note)}
            className='absolute right-4 top-4 icon-btn'
          ></TbPinnedFilled>
        ) : (
          <TbPinned
            onClick={() => handlePin(note)}
            className='absolute right-4 top-4 icon-btn'
          ></TbPinned>
        )}

        <MdDeleteOutline
          onClick={() => {
            handleDelete(note);
            fetchAllNotes();
          }}
          className='icon-btn'
        ></MdDeleteOutline>
      </div>
    </div>
  );
};

export default NoteCard;
