// This file is used to configure:
// - static-site generation
// - Document shell (index.html)
// - ...tons of other things!

// Get started at https://react-static.js.org

import path from 'path'

export default {
  getRoutes: async () => {
    const posts = []
    return [
      {
        path: '/post',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          template: 'src/components/PostPage',
          getData: () => ({
            post,
          }),
        })),
      }
    ]
  },
  plugins: [
    [
        require.resolve('react-static-plugin-source-filesystem'),
        {
          location: path.resolve('./src/pages'),
        },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}
