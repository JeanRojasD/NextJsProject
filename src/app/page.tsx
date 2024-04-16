import CardPost from "@/components/CardPost";
import logger from "@/logger";
import styles from './page.module.css'
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

interface Pagination {
  first?: number | null;
  prev?: number | null;
  next?: number | null;
  last?: number | null;
  pages?: number;
  items?: number;
}


interface PostsResponse {
  pagination: Pagination;
  data: Post[];
}

interface SearchParams {
  page?: string;
}


async function getAllPosts(page: number): Promise<PostsResponse> {
  const response = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=6`);
  if (!response.ok) {
    logger.error("Algo de errado com sua consulta");
    return { pagination: {}, data: [] };
  }
  logger.info('Posts obtidos com sucesso');
  const responseData = await response.json();

  const pagination: Pagination = {
    first: responseData.first || 1,
    prev: responseData.prev || null,
    next: responseData.next || null,
    last: responseData.last || 1,
    pages: responseData.pages || 1,
    items: responseData.items || 0
  };

  const data: Post[] = responseData.data || [];

  return { pagination, data };
}


export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  let currentPage: number;
  if (typeof searchParams.page === 'string') {
    currentPage = parseInt(searchParams.page);
  } else {
    currentPage = searchParams.page || 1;
  }
  const { pagination, data: posts } = await getAllPosts(currentPage);

  return (
    <main className={styles.main}>
      {posts.map(post => (
        <CardPost key={post.id} post={post} />
      ))}
      <div className={styles.pagination}>
        <div className={styles.pagination_options}>
          {pagination.prev && <Link className={styles.link} href={`/?page=${pagination.prev}`}>Página anterior</Link>}
          {pagination.next && <Link className={styles.link} href={`/?page=${pagination.next}`}>Próxima página </Link>}
        </div>
      </div>
    </main>
  );
}
