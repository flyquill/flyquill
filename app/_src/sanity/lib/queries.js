// src/sanity/lib/queries.ts
export const POSTS_QUERY = `
    *[_type == "post"] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage {
        asset -> {
            _id,
            url
        }
        },
        author -> {
        name,
        image {
            asset -> {
            _id,
            url
            }
        }
        },
        categories[] -> {
        title
        }
    }`;