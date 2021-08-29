import React from 'react'

export const getStaticPath = (path) => {
    return `./${path}`;
};

export const isSnippetKey = (item) => (item.substring(0, 5) == "snip-")

export const getPathMixed = (item) => {
    if (item.substring(0, 5) == "snip-") {
        return getSnipPath(item);
    } else {
        return getPostPath(item);
    }
};

export const getPostPath = (item) => {
    return getStaticPath(`post/${item}`)
};

export const getSnipPath = (item) => {
    return getStaticPath(`post/${item}`)
};

export const getHashtagPath = (item) => {
    return getStaticPath(`?hashtag=${item}`);
};

export const galleryItemFunction = (icons, posts) => {
    return (item) => {
        const post = posts[item]
        if ('thumbnail' in post && post.thumbnail == 'none') {
            return null; 
        }
        if ('thumbnailLogo' in post && post.thumbnailLogo == 'none') {
            return {
                src: getStaticPath(`images/${item}.png`),
                logoSrc: null,
                link: getPathMixed(item),
                logoClassName: icons[item] ? icons[item] : "",
                titleElem: (<h3 className="absent-title">{posts[item].title}</h3>),
            };
        }
        return {
            src: getStaticPath(`images/${item}.png`),
            logoSrc: getStaticPath(`images/${item}-logo.png`),
            link: getPathMixed(item),
            logoClassName: icons[item] ? icons[item] : "",
        };
    }
};

