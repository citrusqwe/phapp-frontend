import Image from 'next/image';
import React, { useEffect } from 'react';
import Logo from '../assets/logo.svg';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const LoginComponent = () => {
  const { data: session, status } = useSession();

  const userSignIn = () => {
    signIn();
  };

  return (
    <div className="flex justify-start item-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video loop muted autoPlay className="w-full h-full object-cover">
          <source src="/cover.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute flex flex-col justify-center 
        items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay"
        >
          <div className="p-5">
            <Image src={Logo} alt="logo" width={180} height={90} />
          </div>
          <div className="shadow-2xl">
            {session ? (
              <>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-2 bg-white rounded flex items-center text-md"
                >
                  <span className="mr-2">
                    <FcGoogle />
                  </span>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => userSignIn()}
                  className="px-3 py-2 bg-white rounded flex items-center text-md"
                >
                  <span className="mr-2">
                    <FcGoogle />
                  </span>
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
