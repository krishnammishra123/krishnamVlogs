import React from 'react'
import styles from './page.module.css';
import Image from 'next/image';
import { getBlogService } from '@/components/Services/Service.auth';

  const getData = async (id) => {
  const res= await getBlogService(id)
     if (res) {
       return res;
     } else {
       return notFount();
     }
   };

const BlogPost = async({ params }) => {
  const res = await getData(params.id);
 
 
 
  return (
    <div>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{res.data.details.blog.title}</h1>
          <p className={styles.desc}>{res.data.details.blog.desc}</p>
          <div className={styles.author}>
            <Image
              src="https://images.pexels.com/photos/2103127/pexels-photo-2103127.jpeg"
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span>{res.data.details.user.name}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={`http://localhost:3001/image/${res.data.details.blog.image}`}
            alt=""
            fill={true}
            sizes="300px"
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p>{res.data.details.blog.content}</p>
      </div>
    </div>
  );
}

export default  BlogPost