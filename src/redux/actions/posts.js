import loremIpsum from 'lorem-ipsum';

export const FETCH_POSTS = "FETCH_POSTS";

export function fetchPosts() {
  // Generate random posts
  const posts = [];
  for (var i = 0; i < 9; i++) {
    posts.push({
      id: String(i),
      title: loremIpsum({count: 5, units: 'words'}),
      body: loremIpsum({count: 5}),
      slug: String(i),
      createdAt : new Date()
    })
  }

  // Skipping async loading with dummy data for now
  return {
    type: FETCH_POSTS + "_FULFILLED",
    payload: posts
  }
}
