import { getSinglePage, getAllPages } from "../../ghost-client"
import { notFound } from 'next/navigation';
import type { PostOrPage } from "@tryghost/content-api";
import "../../cards.min.css"

// genrate Static slug or params for blog

export async function generateStaticParams() {
  const pages:any = await getAllPages()

  return pages.map((post: { slug: any; }) => ({
    slug: post.slug,
  }));
}

async function Pages({ params }: { params: { slug: string }; }) {

// fetch single page
  const getPage:any = await getSinglePage(params.slug)

  // handle 404 error
  if (!getPage) {
    notFound()
  }

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 dark:bg-gray-900">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">

          <article className="mx-auto w-full max-w-3xl prose prose-xl prose-p:text-gray-800  dark:prose-p:text-gray-100 sm:prose-base prose-a:no-underline prose-blue dark:prose-invert">


            <h1 className="mb-14 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {getPage.title}
            </h1>

            <div dangerouslySetInnerHTML={{ __html: getPage?.html }}></div>

          </article>
        </div>
      </main>
    </>
  )

}
export default Pages