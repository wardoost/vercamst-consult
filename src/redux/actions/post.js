import loremIpsum from 'lorem-ipsum';

export const FETCH_POST = "FETCH_POST";

export function fetchPost(slug) {
  // Generate random posts
  const post = {
    id: String(slug),
    title: loremIpsum({count: 5, units: "words"}),
    body: loremIpsum({count: 10, units: "paragraphs", format: "html"}),
    slug: String(slug),
    createdAt : new Date()
  }

  // Skipping async loading with dummy data for now
  return {
    type: FETCH_POST + "_FULFILLED",
    payload: post
  }
}
