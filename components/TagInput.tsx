import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FcCloseUpMode } from 'react-icons/fc';
import { searchCategories } from '../client';

type tagType = {
  _id: string;
  text: string;
};

const TagInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tags, setTags] = useState<tagType[]>([]);
  const [inputTags, setInputTags] = useState<string[]>([]);

  const handleChangeInput = async (e: any) => {
    setSearchValue(e.target.value);
    try {
      const searchedTags = await searchCategories(e.target.value.toLowerCase());
      setTags(searchedTags);
    } catch (error) {
      console.log(error);
    }
  };

  const addTag = (e: any) => {
    const text = e.target.textContent;
    if (inputTags.includes(text)) return;
    setInputTags([...inputTags, text]);
    setSearchValue('');
    setTags([]);
  };

  const deleteTag = (idx: number) => {
    const filteredInputTags = inputTags.filter((_, i) => i !== idx);
    setInputTags(filteredInputTags);
  };

  return (
    <>
      <div className="mt-4 px-4 py-1 border border-gray-500 rounded-md transition-all w-full hover:border-gray-900">
        <div className="flex items-center flex-wrap">
          {inputTags.length > 0 && (
            <div className="mr-2 flex">
              {inputTags.map((tag: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center mr-2 p-1 bg-gray-200 rounded-md group transition-all"
                >
                  {tag}
                  <span
                    className="inline-block w-4 h-4 cursor-pointer"
                    onClick={() => deleteTag(i)}
                  >
                    <AiOutlineClose className="fill-gray-700 group-hover:fill-gray-900" />
                  </span>
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            placeholder="Add a tag"
            onChange={handleChangeInput}
            value={searchValue}
            className="px-4 py-2 outline-none grow"
          />
        </div>
      </div>
      {tags?.length > 0 && (
        <div className="border border-gray-500 mt-1 w-full py-2 rounded-md">
          <div>
            {tags.map((tag) => (
              <div
                key={tag._id}
                className="transtion-all py-1 w-full hover:bg-gray-200 px-4"
                onClick={addTag}
              >
                {tag.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TagInput;
