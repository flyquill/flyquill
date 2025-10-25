import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID, // Your Sanity project ID
    dataset: process.env.SANITY_DATASET || "production", // Your dataset (e.g., "production")
    apiVersion: "2024-01-01", // Use the latest API version
    useCdn: false, // Set to true for faster content delivery in production
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}