import React from 'react';
import styles from './page.module.css';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import { items } from './data';
  

const getData =  (cat) => {
  const data = items[cat]
  if (data) {
    return data;
  } else {
    return notFount();
  }
}

const Category = ({ params }) => {
  const data = getData(params.category);
  return (
    <div >
      <h1 className={styles.catTitle}>{params.category}</h1>
      {data.map((item) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
            <Button text="See More" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image src={item.image} alt="" className={styles.img} fill={true} sizes="300px" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default  Category