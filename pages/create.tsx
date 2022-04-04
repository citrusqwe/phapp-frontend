import React, { useEffect, useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import {
  AiOutlineClose,
  AiOutlineCloudUpload,
  AiOutlineDelete,
} from 'react-icons/ai';
import {
  createPin,
  deleteImageFromAssets,
  searchCategories,
  uploadImage,
} from '../client';
import { SanityImageAssetDocument } from '@sanity/client';
import { useRouter } from 'next/router';

type tagType = {
  _id: string;
  text: string;
};

const Create: NextPage = ({ user, id }: any) => {
  const [imageError, setImageError] = useState(false);
  const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument | null>(
    null
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [tags, setTags] = useState<tagType[]>([]);
  const [inputTags, setInputTags] = useState<{ _key: string; text: string }[]>(
    []
  );
  const [tagsError, setTagsError] = useState(false);
  const [descrInputValue, setDescrInputValue] = useState('');
  const router = useRouter();

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
    setInputTags([...inputTags, { _key: text, text: text }]);
    setSearchValue('');
    setTags([]);
  };

  const deleteTag = (idx: number) => {
    const filteredInputTags = inputTags.filter((_, i) => i !== idx);
    setInputTags(filteredInputTags);
  };

  const imageUpload = async (e: any) => {
    const selectedFile = e.target.files[0];
    selectedFile.type.includes('image');

    if (selectedFile.type.includes('image')) {
      setImageError(false);
      setImageLoading(true);
      const uploadedImage = await uploadImage(selectedFile);
      setImageLoading(false);
      setImageAsset(uploadedImage as SanityImageAssetDocument);
    } else {
      setImageError(true);
      setImageLoading(false);
    }
  };

  const imageDelete = async () => {
    deleteImageFromAssets(imageAsset?._id as string);
    setImageAsset(null);
  };

  const savePin = async () => {
    if (!imageAsset) setImageError(true);
    if (inputTags.length <= 0) setTagsError(true);

    if (imageAsset && inputTags.length > 0) {
      const doc = {
        _type: 'pin',
        tags: inputTags,
        description: descrInputValue,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: id,
        postedBy: {
          _type: 'postedBy',
          _ref: id,
        },
      };
      const newDoc = await createPin(doc);

      setImageError(false);
      setTagsError(false);

      router.push('/');
    }
  };

  // useEffect(() => {
  //   if (inputTags.length <= 0) {
  //     setTagsError(true);
  //   } else {
  //     setTagsError(false);
  //   }
  //   if (!imageAsset) {
  //     setImageError(true);
  //   } else {
  //     setImageError(false);
  //   }
  // }, [inputTags, imageAsset]);

  return (
    <Layout user={user}>
      <div className="max-w-3xl mx-auto mt-14">
        <div
          className={`${
            imageError ? 'bg-red-300' : 'bg-white'
          } max-w-md  rounded-xl border border-transparent transition-all flex justify-center mx-auto hover:border-gray-900`}
        >
          {imageLoading && (
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
          {!imageAsset ? (
            <label>
              <div className="flex flex-col items-center h-full justify-center cursor-pointer ">
                {!imageLoading && (
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                name="upload-image"
                onChange={(e) => imageUpload(e)}
                className="w-0 h-0"
              />
            </label>
          ) : (
            <div className="relative h-full w-full">
              <img
                src={imageAsset?.url}
                alt="uploaded-pic"
                className="h-full w-full rounded-xl"
              />
              <button
                type="button"
                className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                onClick={() => imageDelete()}
              >
                <AiOutlineDelete />
              </button>
            </div>
          )}
        </div>
        <div className="mt-10 mb-10">
          <form className="flex flex-col items-center">
            <div
              className={`mt-4 px-4 py-1 border ${
                tagsError ? 'border-red-400' : 'border-gray-500'
              } rounded-md transition-all w-full hover:${
                tagsError ? 'border-red-700' : 'border-gray-900'
              }`}
            >
              <div className="flex items-center flex-wrap">
                {inputTags.length > 0 && (
                  <div className="mr-2 flex">
                    {inputTags.map((tag: { text: string }, i: number) => (
                      <div
                        key={i}
                        className="flex items-center mr-2 p-1 bg-gray-200 rounded-md group transition-all"
                      >
                        {tag.text}
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
            <input
              className="mt-4 px-4 py-2 border border-gray-500 rounded-md transition-all w-full hover:border-gray-900"
              type="text"
              placeholder="Description(optional)"
              onChange={(e) => setDescrInputValue(e.target.value)}
            />
          </form>
        </div>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md w-40 transition-colors disabled:bg-gray-200 hover:bg-gray-700"
          onClick={savePin}
          disabled={imageLoading}
        >
          Save
        </button>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  return {
    props: {
      user: session?.user,
      id: session?.id,
    },
  };
}

export default Create;
