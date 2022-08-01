import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout2 from '../components/Layout2';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { favorites } = state;
  const { favoritesItems, paymentMethod } = favorites;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    favoritesItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: favoritesItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'FAVORITES_CLEAR_ITEMS' });
      Cookies.set(
        'favorites',
        JSON.stringify({
          ...favorites,
          favoritesItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout2 title="Place Order">
      <CheckoutWizard activeStep={2} />
      <div className="">
        <h1 className="mb-4 text-xl">Place Hire Order</h1>
        {favoritesItems.length === 0 ? (
          <div>
            Favorites is empty. <Link href="/">Go To Sign Translators</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <div className="card  p-5">
                <h2 className="mb-2 text-lg font-bold text-sky-600">
                  Payment Method
                </h2>
                <div>{paymentMethod}</div>
                <div className="pt-3 ">
                  <div className="rounded bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 w-16">
                    <Link href="/payment">Edit</Link>
                  </div>
                </div>
              </div>
              <div className="card overflow-x-auto p-5">
                <h2 className="mb-2 text-lg font-bold text-sky-600">
                  Sign Translators
                </h2>
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-left">Sign Translators</th>
                      <th className="p-5 text-right">Price</th>
                      <th className="p-5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favoritesItems.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td>
                          <Link href={`/translator/${item.slug}`}>
                            <a className="flex items-center">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              ></Image>
                              &nbsp;
                              {item.name}
                            </a>
                          </Link>
                        </td>
                        <td className="p-5 text-right">Ksh{item.price}</td>
                        <td className="p-5 text-right">Ksh {1 * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="rounded bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 w-16">
                  <Link href="/favorites">Edit</Link>
                </div>
              </div>
            </div>
            <div>
              <div className="card  p-5">
                <h2 className="mb-2 text-lg font-bold text-sky-600">
                  Hire Order Summary
                </h2>
                <ul>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Translator</div>
                      <div>Ksh {itemsPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Tax</div>
                      <div>Ksh {taxPrice}</div>
                    </div>
                  </li>
                  <li></li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Total</div>
                      <div>Ksh{totalPrice}</div>
                    </div>
                  </li>
                  <li>
                    <button
                      disabled={loading}
                      onClick={placeOrderHandler}
                      className="rounded bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 w-full"
                    >
                      {loading ? 'Loading...' : 'Place Order'}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout2>
  );
}

PlaceOrderScreen.auth = true;
