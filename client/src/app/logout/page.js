"use client";
import { LoginProvider } from '@/loginContext/LoginContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

const Logout = () => {
  const router = useRouter();
    const { setLogindata } = useContext(LoginProvider);
  
        useEffect(() => {
         localStorage.removeItem("token");
         localStorage.removeItem("role");
          localStorage.removeItem("userid");
          setLogindata(false);
          router.push("/dashboard/login");
        }, [])
  
 return null;
}

export default Logout