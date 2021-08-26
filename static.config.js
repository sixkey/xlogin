// This file is used to configure:
// - static-site generation
// - Document shell (index.html)
// - ...tons of other things!

// Get started at https://react-static.js.org

import path from 'path'
import { owner, title, desc, publicUrl } from './xlogconf.json'
import { posts, sections } from './content/posts.json'
import { icons, absent } from './content/icons.json'
import React from 'react'
import {isSnippetKey, galleryItemFunction} from './src/libs/paths'


export default {
    basePath: '~xkucerak',
    devBasePath: '', 
    getSiteData: () => ({ 
        title: title, 
        owner: owner,
        desc: desc,
        publicUrl: publicUrl
    }), 
    getRoutes: async () => {

    console.log(process.env.PUBLIC_URL)

    const galleryItemFunctionInstance = galleryItemFunction(icons, absent, posts)
    const postsLight = {}
        Object.keys(posts).forEach(key => {
            var post = Object.assign({}, posts[key]) 
            delete post['content']
            postsLight[key] = post
        })
    
    const children = [
        ...Object.keys(posts).map(key => {
            const renderer = isSnippetKey(key) ? 'snippet' : 'post' 
            return({
              path: `/${renderer}/${key}`,
              template: `src/containers/${renderer}`,
              getData: () => ({
                  posts: posts,
                  post: posts[key],
                  postid: key,
                  sections: sections, 
                  postImage: galleryItemFunctionInstance(key)
              }),
            })
        }),
        {
            path: '/', 
            template: `src/pages/index`, 
            getData: () => ({
                  posts: postsLight,
                  sections: sections, 
                  icons: icons, 
                  absent: absent
            })
        }, 
        {
            path: '404',
            template: 'src/pages/404', 
            getData: () => ({
                posts: postsLight, 
                sections: sections
            })
        }

    ]
    return children
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
  Document: ({Html, Head, Body, children, state, renderMeta}) => {
        
      let { desc, publicUrl, title } = state.siteData;

      return (
    <Html>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <base href={`${publicUrl}/`}/>
            <meta
              name="description"
              content={desc}
            />
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
            <script src="https://kit.fontawesome.com/883463fb2b.js" crossOrigin="anonymous"></script>
            <script src="https://polyfill.io/v3/polyfill.min.js?features=es6" crossOrigin="anonymous"></script>
            <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" crossOrigin="anonymous"></script>
            

            <link rel="apple-touch-icon" sizes="180x180" href={`${publicUrl}/apple-touch-icon.png`}/>
            <link rel="icon" type="image/png" sizes="32x32" href={`${publicUrl}/favicon-32x32.png`}/>
            <link rel="icon" type="image/png" sizes="16x16" href={`${publicUrl}/favicon-16x16.png`}/>
            <link rel="manifest" href={`${publicUrl}/site.webmanifest`}/>
            <link rel="mask-icon" href={`${publicUrl}/safari-pinned-tab.svg`} color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#ffffff"/>
            <title>{title}</title>
        </Head> 
        <Body> 
            {children}
        </Body>
    </Html> 
        
  )}
}
