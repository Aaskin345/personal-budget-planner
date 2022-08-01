import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './header.module.css';
import { useRouter } from 'next/router';

export default function Header() {
  const [test, setTest] = useState(false); // Defaults to `false`
  const router = useRouter();

  useEffect(() => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    if (router.pathname === '/') {
      setTest(true);
      header.classList.add('headerTest');
      nav.classList.add('menuTest');
    }
  }, []);

  useEffect(() => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    function checkScroll() {
      if (window.innerWidth <= 768) {
        header.classList.remove('headerTest');
        nav.classList.remove('menuTest');
      }
      if (window.scrollY === 0) {
        header.classList.add('headerTest');
        nav.classList.add('menuTest');
      }
    }
    if (test) {
      window.addEventListener('scroll', checkScroll);
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', checkScroll);
    }
  }, [test]);

  return (
    <header className={styles.header}>
      <h1>
        <Link href="/">
          <a>
            <span className="offscreen">Home</span>
          </a>
        </Link>
      </h1>
      <nav id="menu" className={styles.menu}>
        <ul>
          <li>
            <Link href="/mvg">
              <a>MVG</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
