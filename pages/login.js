import Link from 'next/link';
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
      router.push(redirect || '/budgetty');
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
          className="max-w-screen-sm bg-gray-100 shadow-2xl rounded-3xl px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-2xl font-bold text-orange-600">Login</h1>
          <div className="mb-4 rounded-md shadow-sm -space-y-px">
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
              className="w-full bg-blue-400"
              id="email"
              autoFocus
            ></input>
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-4 rounded-md shadow-sm -space-y-px">
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
              className="w-full bg-blue-400"
              id="password"
              autoFocus
            ></input>
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-4 ">
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Login
            </button>
          </div>
          <div className="mb-4 ">
            Don&apos;t have an account? &nbsp;
            <span className="text-sky-600 hover:text-green-700">
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
