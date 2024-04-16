import Image from "next/image";
import Avatar from "@/components/Avatar";
import styles from './card.module.css'
import Link from "next/link";

interface Post {
  id: number;
  cover: string;
  title: string;
  slug: string;
  body: string;
  markdown: string;
  author: {
    id: number;
    name: string;
    username: string;
    avatar: string;
  };
}

interface CardPostProps {
  post: Post;
}

const CardPost: React.FC<CardPostProps> = ({ post }) => {
  return (
    <Link className={styles.link} href={`/posts/${post.slug}`}>
      <article className={styles.article}>
        <header>
          <figure className={styles.figure}>
            <Image src={post.cover} alt={`Capa do post: ${post.title}`} width={438} height={133} />
          </figure>
        </header>
        <section className={styles.section}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </section>
        <footer className={styles.footer}>
          <Avatar name={post.author.name} imageSrc={post.author.avatar} />
        </footer>
      </article>
    </Link>
  );
};

export default CardPost;
