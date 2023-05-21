import React from 'react'
import Card from "../../Card"

import { getTagPosts, getAllTags } from "../../ghost-client"

import { notFound } from 'next/navigation';

import type { PostsOrPages } from "@tryghost/content-api";


export async function generateStaticParams() {

  const allTags: any = await getAllTags()

  let allTagsItem: { slug: string }[] = []
  
// genrate the slug for static site

  allTags?.map((item: { slug: any; }) => {
    allTagsItem.push({
      slug: item.slug,
    })
  })

  return allTagsItem

}


async function Tag({ params }: { params: { slug: string }; }) {

  let tagPosts: PostsOrPages = await getTagPosts(params.slug)

// Handling 404 error

  if (tagPosts.length === 0) {
    notFound()
  }

  return (
    <aside aria-label="Related articles" className="py-8 lg:py-24 dark:bg-gray-800">
      
      <div className="px-4 mx-auto max-w-screen-xl">

        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
          More articles from {params.slug.split("-").join(" ")}
        </h2>

        <div className="container my-12 mx-auto grid grid-cols-1 gap-12 md:gap-12 lg:gap-12  lg:grid-cols-3  md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 ">
        
          {
            tagPosts.map(
              item => <Card key={item.uuid} item={item} />
            )
          }
        
        </div>

      </div>

    </aside>
  )

}

export default Tag