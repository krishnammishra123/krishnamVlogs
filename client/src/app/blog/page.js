"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { fetchService } from "@/components/Services/Service.auth";
 

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        await fetchService().then((res) => {
          const reversedBlogs = res.data.details.reverse();
          setBlogs(reversedBlogs);
        }).catch((err) => {
          console.log(err);
       })
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, [setBlogs]);

  return (
    <>
      {blogs.map((bloges) => (
        <div className={styles.container} key={bloges._id}>
          <Link href={`/blog/${bloges._id}`} className={styles.container}>
            <div>
              <Image
                src={`http://localhost:3001/image/${bloges.image}`}
                alt=""
                width={400}
                height={250}
                priority={true}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>{bloges.title}</h1>
              <p className={styles.desc}>{bloges.desc}</p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Blog;
