import React from 'react'
import styles from "./page.module.css";
import Image from 'next/image';
import Button from "@/components/Button/Button";

const About = () => {
  return (
    <div>
      <div className={styles.imgContainer}>
        <Image
          src="https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          fill={true}
          alt=""
          className={styles.img}
        />
        <div className={styles.imgText}>
          <h1>KrishnamBlog Website</h1>
          <h2>Discover Beautiful Destinations in India and Around the World</h2>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1>Who Are We?</h1>
          <p className={styles.desc}>
            Passionate Travel Enthusiasts Sharing Inspiring Journeys At
            KrishnamBlog, we are a team of dedicated travel enthusiasts who are
            deeply passionate about exploring the world. Our mission is to
            inspire and empower fellow travelers to embark on their own
            extraordinary journeys. With years of travel experience under our
            belts, we have set out on a quest to uncover the hidden gems,
            lesser-known destinations, and unique cultural experiences that make
            each place truly remarkable. Through our blog, we aim to share our
            personal travel stories, insights, and expert advice to help you
            create unforgettable memories on your travels. Whether you're
            seeking breathtaking landscapes, captivating history, thrilling
            adventures, or immersive cultural encounters, our team is here to
            guide and inspire you every step of the way. Join us as we delve
            into the depths of diverse landscapes, immerse ourselves in local
            traditions, and connect with fellow travelers from around the globe.
            We invite you to embark on this journey with us and let the magic of
            travel ignite your wanderlust. Welcome to Krishnam, where we
            celebrate the beauty and joy of exploring our extraordinary world.
            <br />
            <br />
            <span className={styles.who}>
              "Join the KrishnamBlog family and let the stories of our travels
              awaken your sense of wonder, enrich your knowledge, and fuel your
              passion for discovering the unknown".
            </span>
          </p>
        </div>
        <div className={styles.item}>
          <h1>What We Do?</h1>
          <p className={styles.desc}>
            Welcome to KrishnamBlog , your ultimate guide to exploring new and
            enchanting places across India and around the world. Join us on a
            virtual journey as we uncover hidden gems, share travel tips, and
            inspire your wanderlust. Whether you're seeking serene landscapes,
            vibrant cultures, or thrilling adventures, Krishnam is your go-to
            resource for discovering the best destinations and creating
            unforgettable travel experiences. Get ready to embark on a
            captivating exploration of the world's wonders through our engaging
            stories, stunning photography, and expert travel advice.
            <br />
            <br /> 
            <span className={styles.whoiam}>
              - With our in-depth knowledge of new places to visit, we strive to
              be your go-to resource for travel inspiration and planning.
              Whether you're seeking serene beaches, breathtaking mountains,
              vibrant cities, or cultural landmarks, we curate a collection of
              destinations that will captivate your imagination.
              <br />
              <br /> - But KrishnamBlog is not just about discovering new
              places; we also invite you to become a part of our travel
              community. Share your own travel stories, insights, and
              recommendations with fellow adventurers. We believe that everyone
              has a unique perspective to offer, and by joining forces, we can
              create a diverse and vibrant community that fuels our passion for
              exploration.
              <br />
              <br /> - In addition to being a platform for travel enthusiasts,
              KrishnamBlog also offers a space for you to showcase your own
              experiences through our blog. Share your journey, tips, and
              recommendations with our readers and inspire others to embark on
              their own adventures. We believe that travel is not only about the
              places we visit but also about the connections we make and the
              stories we share.
            </span>
          </p>
          <Button url="/contact" text="Contact" />
        </div>
      </div>
    </div>
  );
}

export default About