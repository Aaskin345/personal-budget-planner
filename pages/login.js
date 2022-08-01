import Link from 'next/link';
//import React from 'react';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';

import { useForm } from 'react-hook-form';
import Layout2 from '../components/Layout2';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout2 title="Login">
      <div className="flex justify-center pt-20">
        <form
          className="max-w-screen-sm bg-white shadow-2xl rounded-3xl px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-2xl font-bold text-sky-600">Login</h1>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Please enter email',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: 'Please enter valid email',
                },
              })}
              className="w-full"
              id="email"
              autoFocus
            ></input>
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Please enter password',
                minLength: {
                  value: 6,
                  message: 'password is more than 5 chars',
                },
              })}
              className="w-full"
              id="password"
              autoFocus
            ></input>
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-4 ">
            <button className="rounded bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 w-full">
              Login
            </button>
          </div>
          <div className="mb-4 ">
            Don&apos;t have an account? &nbsp;
            <span className="text-sky-600 hover:text-sky-800">
              <Link href={`/register?redirect=${redirect || '/'}`}>
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </Layout2>
  );
}
