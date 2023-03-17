import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout2 from '../components/Layout2';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

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
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

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
    <Layout2 title="Create Account">
      <div className="flex justify-center pt-20 bg-slate bg-white">
        <form
          className="max-w-screen-sm bg-gray-200 shadow-2xl rounded-3xl px-8 pt-5 pb-5 mb-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-2xl font-bold text-orange-600">
            Create an Account with us
          </h1>
          <div className="mb-4 ">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="block w-full pl-10 py-2 text-base leading-5 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              id="name"
              autoFocus
              {...register('name', {
                required: 'Please enter name',
              })}
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>

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
              className="block w-full pl-10 py-2 text-base leading-5 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              id="email"
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
              className="block w-full pl-10 py-2 text-base leading-5 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              id="password"
              autoFocus
            ></input>
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="block w-full pl-10 py-2 text-base leading-5 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Please enter confirm password',
                validate: (value) => value === getValues('password'),
                minLength: {
                  value: 6,
                  message: 'confirm password is more than 5 chars',
                },
              })}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 ">
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === 'validate' && (
                <div className="text-red-500 ">Password do not match</div>
              )}
          </div>

          <div className="mb-4 ">
            <button className="rounded bg-sky-600 hover:bg-green-700 text-white font-bold py-2 px-4 w-full">
              Register
            </button>
          </div>
          <div className="mb-4 ">
            Already have an account? &nbsp;
            <span className="text-sky-600 hover:text-green-800">
              <Link href={`/login?redirect=${redirect || '/'}`}>Login</Link>
            </span>
          </div>
        </form>
      </div>
    </Layout2>
  );
}
