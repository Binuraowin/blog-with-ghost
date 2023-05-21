
import { getPaginationPosts, getPosts } from "../../ghost-client"
import Card from '../../Card'
import PaginationItem from "../../pagination"
import type { Metadata } from "next";
import type { PostsOrPages } from "@tryghost/content-api";




// export async function generateStaticParams() {

//   const posts:PostsOrPages = await getPosts()
// console.log("pagination page file",posts.meta)
//   let paginationItem: any[] = []

//   for (let index = 1; index <= posts?.meta.pagination.pages; index++) {
//     paginationItem.push({
//       item: index,
//     })

//   }

//   return paginationItem

// }



export default async function Pagination({ params }: { params: { item: string }; }) {

  let getParams: number = Number.parseInt(params.item)
  console.log(getParams)

  const getPost: PostsOrPages = await getPaginationPosts(getParams)

  return (
    <>

      <main className="container my-12 mx-auto grid grid-cols-1 gap-2 md:gap-3 lg:gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">

        {
          getPost?.map(
            item => {
                console.log("second page",item)
              return <Card key={item.uuid} item={item} />
            })
        }
      </main>

      <PaginationItem item={getPost.meta.pagination} />

    </>
  )
}