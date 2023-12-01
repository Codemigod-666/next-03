import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import Login from './components/login'
import Register from './components/register'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [user, setUser] = useState(null);
  // useEffect(() => {
    // const fetchUsers = async () => {
    //   try {
    //     const response = await fetch('/api/users');
    //     const data = await response.json();
    //     setUsers(data);
    //   } catch (error) {
    //     console.error('Error fetching users:', error);
    //   }
    // };

    // fetchUsers();
  // }, []);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      // If user data exists, parse it and set the user state
      setUser(storedUser);
    }
  }, []);

  return (
    <>
    {
      user !== null ? <Login user={user} setUser={setUser} /> : <Register user={user} setUser={setUser} />
    }
    </>
  )
}