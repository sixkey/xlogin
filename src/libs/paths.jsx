export const getStaticPath = (path) => {
    return `${path}`;
};

export const getPathMixed = (item) => {
    if (item.substring(0, 5) == "snip-") {
        return getSnipPath(item.substring(5));
    } else {
        return getPostPath(item);
    }
};

export const getHashtagPath = (item) => {
    return getStaticPath(`?hashtag=${item}`);
};

export const getPostPath = (item) => {
    return getStaticPath(`?type=post&id=${item}`);
};

export const getSnipPath = (item) => {
    return getStaticPath(`?type=snippet&id=${item}`);
};
