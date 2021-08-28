// This file is used to configure:
// - static-site generation
// - Document shell (index.html)
// - ...tons of other things!

// Get started at https://react-static.js.org

import path from 'path'
import { owner, title, desc, basePath, devBasePath } from './xlogconf.json'
import { icons } from './content/icons.json'
import React from 'react'
import {isSnippetKey, galleryItemFunction} from './src/libs/paths'

function filterPosts(sections, posts) {
    const res = {}
    Object.keys(sections).map((section, index) => {
        for(let value of sections[section]['posts']) res[value] = posts[value]; 
    })
    return res;
}

export default {
    basePath: basePath,
    devBasePath: devBasePath, 
    getSiteData: () => ({ 
        title: title, 
        owner: owner,
        desc: desc
    }), 
    getRoutes: async () => {
        var fs = require('fs')
        let { icons } = JSON.parse(fs.readFileSync('./content/icons.json', 'utf8'))
        let { posts, sections } = JSON.parse(fs.readFileSync('./content/posts.json', 'utf8'))
        const galleryItemFunctionInstance = galleryItemFunction(icons, posts)
        
        const postsLight = {}
        
        Object.keys(posts).forEach(key => {
            var post = Object.assign({}, posts[key]) 
            delete post['content']
            postsLight[key] = post
        })
        
        const projectPosts = filterPosts(sections.projects.sections, posts) 
        const blogPosts = filterPosts(sections.blog.sections, posts) 
        
        const children = [
            ...Object.keys(posts).map(key => {
                const renderer = isSnippetKey(key) ? 'snippet' : 'post' 
                return({
                  path: `/post/${key}`,
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
                      blogPosts, 
                      projectPosts, 
                      sections, 
                      icons
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
    [
      'react-static-plugin-file-watch-reload',
      {
        // example configuration
        paths: ['content/posts.json', 'xlogconf.json', 'content/icons.json'],
      },
    ],
  ],
  Document: ({Html, Head, Body, children, state, renderMeta}) => {
        
      let { desc, title } = state.siteData;


      var publicUrl = process.env.NODE_ENV === 'development' ? devBasePath : basePath; 

      console.log(publicUrl)
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
