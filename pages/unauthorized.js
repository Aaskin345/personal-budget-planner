import { useRouter } from 'next/router';
import React from 'react';
import Layout2 from '../components/Layout2';

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <div className="">
      <Layout2 title="Unauthorized Page">
        <h1 className="text-xl">Access Denied</h1>
        {message && <div className="mb-4 text-red-500">{message}</div>}
      </Layout2>
    </div>
  );
}
