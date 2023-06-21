"use client"
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css";
import { ForgotPasswordValidate } from '@/components/Validation/Validation';
import { useRouter } from 'next/navigation';
import { ForgotAuth, ForgotPasswordAuth } from '@/components/Services/Service.auth';

const ForgotPassword = ({params}) => {
   const [error, setError] = useState({});
   const [password, setPassword] = useState("");
   const [mistake, setMistake] = useState("");
   const [errors, setErrors] = useState("");
   const router = useRouter();
  const { id, token } =  params;
  
  
  useEffect(() => {
    const userValid = async () => {
      try {
         const res = await ForgotAuth(id, token);
        const data = await res.json();
        if (res.status === 400 || !data) {
           router.push("/dashboard/login");
        } else {
          console.log("user valid");
        }
      } catch (err) {
        console.log(err);
      }
    };
    userValid();
  }, []);

  
  const handleSubmit = async(e) => {
    e.preventDefault()
    const validate = await ForgotPasswordValidate(password);
    setError(validate);
    if (Object.keys(validate).length === 0) {
      const userdetails ={password};
            await  ForgotPasswordAuth(userdetails,id,token).then((res) => {
                setMistake(res.data.message);
                setPassword("");
            }).catch((err) => {
                if (err.response.status === 400 || err.response.status === 500) {
                    setErrors(err.response.data.message);
                }  
         })
    }
}

  return (
    <div>
      <div className={styles.container}>
        <h1>Set NewPassword</h1>
        <h2>Please You can Set Newpassword here.</h2>
        {mistake ? <p className={styles.message}>{mistake}</p> : ""}
        <form onSubmit={handleSubmit}  className={styles.form}>
          <input
            type="password"
            placeholder="Enter Your New Password"
            value={password}
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={styles.err}>{error.password}</p>}
          <button className={styles.button}> Set Password</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword