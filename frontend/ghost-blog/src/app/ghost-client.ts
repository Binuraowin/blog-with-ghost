// ghost-client.ts

import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.GHOST_URL as string,
  key: process.env.GHOST_KEY as string,
  version: "v5.0"
});

export async function getNavigation() {
  return await api.settings.browse()
}
export async function getPosts() {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 1
    })
    .catch(err => {
      throw new Error(err)
    });
}
export async function getSinglePost(postSlug: string) {
  return await api.posts
    .read({
      slug: postSlug
    }, { include: ["tags", "authors"] })
    .catch(err => {
      console.error(err);
    });
}
// export async function generateStaticParams() {

//   // fetch All posts

//   const posts = await getPosts()
  
//   // return the slug 
  
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
  
// }


// return all posts realted to tag slug
export async function getTagPosts(tagSlug: string) {

  return await api.posts.browse({ filter: `tag:${tagSlug}`, include: 'count.posts' })
    .catch(err => {
      throw new Error(err)
    });
  ;

}

export async function getAllTags() {
  return await api.tags.browse({
    limit: "all"
  }).catch(err => {
    console.log(err)
  })
}

// get author meta Data

export async function getSingleAuthor(authorSlug: string) {
  return await api.authors
    .read({
      slug: authorSlug
    }, { include: ["count.posts"] })
    .catch(err => {
      console.log(err)
    });

}

// get author related posts

export async function getSingleAuthorPosts(authorSlug: string) {
  return await api.posts.browse({ filter: `authors:${authorSlug}` })
    .catch(err => {
      console.log(err)
    })
};

// get All author from Ghost CMS for generateStaticParams

export async function getAllAuthors() {

  return await api.authors
    .browse({
      limit: "all"
    })
    .catch(err => {
      throw new Error(err)
    });

}


export async function generateStaticParams() {

  const allAuthor: any[] = await getAllAuthors()


  let allAuthorItem: { slug: string }[] = []

  allAuthor.map(item => {
    allAuthorItem.push({
      slug: item.slug,
    })
  })
  return allAuthorItem

}

// fetch all pages

export async function getAllPages() {
  return await api.pages
    .browse({
      limit: "all"
    })
    .catch(err => {
      console.error(err);
    });
}


// single page data 

export async function getSinglePage(pageSlug: string) {
  return await api.pages
    .read({
      slug: pageSlug
    }, { include: ["tags"] })
    .catch(err => {
      console.error(err);
    });
}

// 
export async function getPaginationPosts(page: number) {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      limit: 1,
      page: page
    })
    .catch(err => {
      throw new Error(err)
    });
}