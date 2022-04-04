import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaSearch } from 'react-icons/fa';
import Logo from '../assets/logo-black.svg';
import { useRef, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import useOutsideClick from '../hooks/useOutsideClick';

export interface NavProps {
  id?: string;
  user: {
    name: string;
    image: string;
  };
  tags?: {
    _id: string;
    text: string;
  }[];
  currentTag?: string;
}

const Nav: React.FC<NavProps> = ({ user, id, tags, currentTag }) => {
  const [userPopup, setUserPopup] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const userRef = useRef(null);
  useOutsideClick(userRef, () => setUserPopup(false));

  const search = (e: any) => {
    e.preventDefault();
    if (searchInput) router.push(`/s/${searchInput}`);
  };

  return (
    <div className={`${tags ? 'mb-8' : 'mb-0'} py-4`}>
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            width={180}
            height={60}
            className="cursor-pointer"
          />
        </Link>

        <form
          className="rounded-3xl h-10 bg-gray-200 flex transition-all w-full max-w-2xl mx-6 hover:shadow-md"
          onSubmit={search}
        >
          <button type="submit" className="group pl-4">
            <FaSearch className="fill-slate-500 group-hover:fill-slate-900" />
          </button>

          <input
            type="text"
            className=" bg-gray-200 p-2 outline-none rounded-r-3xl w-full"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
        <div className="flex">
          <Link href="/create">
            <a className="p-2 mr-10 border border-gray-300 rounded-md transition-all hover:border-gray-900">
              Submit a photo
            </a>
          </Link>
          <div className="flex items-center relative" ref={userRef}>
            <div
              className="mr-3 cursor-pointer"
              onClick={() => setUserPopup(!userPopup)}
            >
              <img
                src={user?.image}
                alt="userpic"
                className="rounded-full w-10 h-10 "
              />
            </div>
            {userPopup && (
              <div className="absolute top-12 right-0 w-52 border border-gray-300 p-2">
                <Link href={`/${id}`}>
                  <a className="block px-3 py-2 border-b border-b-gray-300 w-full hover:bg-gray-200">
                    {user?.name}
                  </a>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-2 bg-white rounded flex items-center text-md  w-full hover:bg-gray-200"
                >
                  <span className="mr-2">
                    <FcGoogle />
                  </span>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {tags && (
        <div className="flex mt-6 pl-4">
          <Link href="/">
            <a className="mr-4 text-lg border-gray-800 capitalize transition-colors cursor-pointer text-gray-700 hover:text-black">
              All
            </a>
          </Link>
          <Link href="/c/favorites">
            <a className="mr-4 text-lg pr-3 border-r border-gray-800 capitalize transition-colors cursor-pointer text-gray-700 hover:text-black">
              Favorites
            </a>
          </Link>
          {tags?.map((tag) => (
            <Link key={tag._id} href={`/c/${tag.text}`}>
              <a
                className={`mr-4 text-lg capitalize transition-colors cursor-pointer text-gray-700 ${
                  tag.text === currentTag ? 'border-b-2 border-black' : ''
                } hover:text-black`}
              >
                {tag.text}
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Nav;
