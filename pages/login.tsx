import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import LoginComponent from '../components/LoginComponent';

const Login = () => {
  return (
    <div>
      <LoginComponent />
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Login;
