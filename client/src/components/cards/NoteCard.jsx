import React, { useState } from "react";
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
  const [showFullContent, setShowFullContent] = useState(false);
  const charLimit = 80;

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  const displayedContent =
    content.length > 80 && !showFullContent
      ? `${content.slice(0, charLimit)} ....`
      : content;

  return (
    <div className='rounded-lg border border-slate-400 p-3 shadow hover:shadow-xl hover:shadow-xl transition-all relative'>
      <p className='text-slate-500 text-sm py-1'>
        {formatTimestamp(createdAt)}
      </p>
      <h4 className='text-primary-dark text-base py-1'>{title}</h4>
      <p className='text-sm text-slate-600 py-1 mb-3'>
        {displayedContent}
        {content.length > charLimit && (
          <span
            onClick={toggleContent}
            className='ml-1 text-xs font-medium rounded-full bg-slate-400 px-2 hover:shadow-lg text-light cursor-pointer transition-all'
          >
            {showFullContent ? "less" : "more"}
          </span>
        )}
      </p>
      <div className='flex gap-4 text-xs pt-3 pb-2 flex-wrap '>
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
      <div className='flex items-center justify-end'>
        <div className='flex gap-7 absolute right-4 bottom-4'>
          <MdOutlineEdit
            onClick={() =>
              setOpenAddEditModal({ isShown: true, type: "edit", data: note })
            }
            className='icon-btn'
          ></MdOutlineEdit>
          <MdDeleteOutline
            onClick={() => {
              handleDelete(note);
              fetchAllNotes();
            }}
            className='icon-btn'
          ></MdDeleteOutline>
        </div>

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
      </div>
    </div>
  );
};

export default NoteCard;
