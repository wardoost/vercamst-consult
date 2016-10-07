import loremIpsum from 'lorem-ipsum';

export const FETCH_POSTS = "FETCH_POSTS";

export function fetchPosts() {
  return {
    type: FETCH_POSTS + "_FULFILLED",
    payload: [
      {
        title: loremIpsum({count: 5, units: 'words'}),
        body: loremIpsum({count: 5})
      },
      {
        title: loremIpsum({count: 3, units: 'words'}),
        body: loremIpsum({count: 7})
      },
      {
        title: loremIpsum({count: 2, units: 'words'}),
        body: loremIpsum({count: 8})
      }
    ]
  }
}
