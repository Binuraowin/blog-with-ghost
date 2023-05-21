import { getPosts } from "./ghost-client"
import Card from './Card'
import Pagination from "./pagination"

export default async function Home() {

  const getPost = await getPosts()
  // const AllPostForSerach = await getSearchPosts()
  console.log('here',getPost.meta.pagination)

  return (
    <>
      <main className="flex justify-center flex-col my-12 mx-auto max-h-full">
        <div className="container grid grid-cols-1 gap-2 md:gap-3 lg:gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
          {
            getPost?.map(
              item => {
                console.log("index page",item)
                return <Card key={item.uuid} item={item} />
              })
          }
        </div>
        <Pagination item={getPost.meta.pagination} />
      </main>
    </>
  )
}