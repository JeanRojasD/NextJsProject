import logger from "@/logger";
import styles from './page.module.css'
import { remark } from 'remark';
import html from 'remark-html';
import Image from "next/image";
import Avatar from "@/components/Avatar";

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

async function getPostBySlug(slug: string): Promise<Post | {}> {
    const url = `http://localhost:3042/posts?slug=${slug}`
    const response = await fetch(url);
    if (!response.ok) {
        logger.error("Algo de errado com sua consulta");
        return {};
    }
    logger.info('Posts obtidos com sucesso');
    const data: Post[] = await response.json();
    if (data.length === 0) {
        return {};
    }
    const post = data[0];

    const processedContent = await remark()
        .use(html)
        .process(post.markdown);
    const contentHtml = processedContent.toString();

    post.markdown = contentHtml

    return post
}

const PagePost = async ({ params }: { params: { slug: string } }) => {
    const slug = params.slug;
    const post = await getPostBySlug(slug);
    return (
        <>
            <article className={styles.article}>
                <header>
                    <figure className={styles.figure}>
                        <Image src={(post as Post).cover} alt={`Capa do post: ${(post as Post).title}`} width={438} height={133} />
                    </figure>
                </header>
                <section className={styles.section}>
                    <h2>{(post as Post).title}</h2>
                    <p>{(post as Post).body}</p>
                </section>
                <footer className={styles.footer}>
                    <Avatar name={(post as Post).author.name} imageSrc={(post as Post).author.avatar} />
                </footer>
            </article>
            <h1 className={styles.h1}>Código:</h1>
            <div className={styles.code} dangerouslySetInnerHTML={{ __html: (post as Post).markdown }} />
        </>
    );
}

export default PagePost;
