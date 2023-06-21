"use client";
import { postBlogValidate } from "@/components/Validation/Validation";
import styles from "./page.module.css";
import {
  UserHomeAuth,
  blogAuth,
  deleteBlog,
  fetchBlogService,
} from "@/components/Services/Service.auth";
import { LoginProvider } from "@/loginContext/LoginContext";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";

const isBrowser = typeof window !== "undefined";

const Dashboard = () => {
  const { logindata, setLogindata } = useContext(LoginProvider);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const role = isBrowser ? localStorage.getItem("role") : null;
  const router = useRouter();
  const fileInputRef = useRef();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = isBrowser ? localStorage.getItem("token") : null;
        await UserHomeAuth(token)
          .then((res) => {
            setLogindata(res.data.ValidUserOne);
            console.log("User verified");
          })
          .catch((err) => {
            console.log(err);
            router.push("/dashboard/login");
          });
      } catch (err) {
        console.log(err);
        router.push("/dashboard/login");
      }
    };
    verifyUser();
  }, [setLogindata, router]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = isBrowser ? localStorage.getItem("token") : null;
        await fetchBlogService(token)
          .then((res) => {
            const reversedBlogs = res.data.details.reverse();
            setBlogs(reversedBlogs);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (showAll) {
      setDisplayedBlogs(blogs);
    } else {
      const numBlogsToShow = 4; // Change this number as per your requirement
      setDisplayedBlogs(blogs.slice(0, numBlogsToShow));
    }
  }, [blogs, showAll]);



const handleSubmit = async (e) => {
  e.preventDefault();
  const validate = await postBlogValidate(title, desc, image, content);
  setError(validate);
  if (Object.keys(validate).length === 0) {
    try {
      const token = isBrowser ? localStorage.getItem("token") : null;
      const userid = isBrowser ? localStorage.getItem("userid") : null;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("content", content);
      formData.append("userid", userid);
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      };
      console.log(formData);
      const res = await blogAuth(formData, config);
      console.log(res.data);
      setBlogs((prevBlogs) => [res.data.details, ...prevBlogs]);
      setTitle("");
      setDesc("");
      setImage(null);
      fileInputRef.current.value = "";
      setContent("");
    } catch (err) {
      console.log(err);
    }
  }
};


  const handleSeeMore = () => {
    setShowAll(true);
  };

  const handleSeeLess = () => {
    setShowAll(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id)
        .then((res) => {
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {logindata && role === "user" ? (
        <div className={styles.container}>
          <div className={styles.posts}>
            <h1>Your Post</h1>
            {displayedBlogs.map((blog) => (
              <div className={styles.post} key={blog._id}>
                <div className={styles.imgContainer}>
                  <NextImage
                    src={`http://localhost:3001/image/${blog.image}`}
                    alt="Blog Image"
                    width={260}
                    height={150}
                    priority={true}
                    className={styles.img}
                  />
                </div>
                <h2>{blog.title}</h2>
                <span
                  className={styles.delete}
                  onClick={() => handleDelete(blog._id)}
                >
                  {" "}
                  X
                </span>
              </div>
            ))}
            {!showAll && blogs.length > displayedBlogs.length && (
              <button onClick={handleSeeMore} className={styles.seeMore}>
                See More
              </button>
            )}
            {showAll && (
              <button onClick={handleSeeLess} className={styles.seeMore}>
                See Less
              </button>
            )}
          </div>

          <form className={styles.new} onSubmit={handleSubmit}>
            <h1>Add New Post</h1>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />
            {error && <span className={styles.span}>{error.title}</span>}
            <input
              type="text"
              placeholder="Desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className={styles.input}
            />
            {error && <span className={styles.span}>{error.desc}</span>}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              placeholder="Image"
              onChange={(e) => setImage(e.target.files[0] || null)}
              className={styles.input}
            />
            {error && <span className={styles.span}>{error.image}</span>}
            <textarea
              placeholder="Content"
              className={styles.textArea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            {error && <span className={styles.span}>{error.content}</span>}
            <button className={styles.button} type="submit">
              Send
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Dashboard;
