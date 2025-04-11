import React, { useState } from "react";
import { IoIosAdd, IoIosClose } from "react-icons/io";

const TagsInput = ({ allTags, setAllTags }) => {
  const [newTag, setNewTag] = useState("");
  // const [allTags, setAllTags] = useState([]);
  const [tagError, setTagError] = useState("");

  const addTag = () => {
    const tag = newTag.trim();
    if (tag && allTags.includes(tag)) {
      setTagError("Duplicate Tag!");
      return;
    }
    if (tag) {
      setAllTags([...allTags, tag]);
      setNewTag("");
    }
  };

  const addTagKeyPress = (e) => {
    if (e.key === "Enter" || e.code === "Space") {
      addTag();
    }
  };

  const removeTag = (targetTag) => {
    setAllTags(allTags.filter((tag) => tag !== targetTag));
  };
  return (
    <div>
      <label className='input-label'>Tags</label>
      <div className='flex gap-3'>
        {allTags?.length > 0 &&
          allTags.map((tag, index) => {
            return (
              <div
                key={index}
                className='flex gap-1 items-center justify-between text-xs capitalize px-2  rounded-full bg-accent text-light shadow-md'
              >
                {tag}
                <IoIosClose
                  className='w-5 h-5 hover:scale-105 active:scale-95 cursor-pointer'
                  onClick={() => removeTag(tag)}
                ></IoIosClose>
              </div>
            );
          })}
      </div>
      {tagError && <p className='text-xs text-red-600 my-3 pl-2'>{tagError}</p>}

      <div className='flex gap-2 mt-3'>
        <input
          type='text'
          placeholder='Enter Tag'
          className='w-[30%] text-sm bg-slate-200 outline-none rounded px-2 '
          value={newTag}
          onChange={({ target }) => {
            setNewTag(target.value);
            setTagError("");
          }}
          onKeyDown={addTagKeyPress}
        />
        <div
          className='bg-primary text-light p-1 rounded-md hover:scale-105 active:scale-95 transition cursor-pointer'
          onClick={() => addTag()}
        >
          <IoIosAdd className='w-6 h-6'></IoIosAdd>
        </div>
      </div>
    </div>
  );
};

export default TagsInput;
