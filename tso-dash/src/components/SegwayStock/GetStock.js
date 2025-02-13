import { GraphQLClient } from 'graphql-request';

const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2024-10/graphql.json`;
const key = process.env.STOREFRONT_API;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': key,
  },
});


export async function getAllProducts() {
  try {
    const query = `
    {
      products(first: 70) {
        edges {
          node {
            id
            title
            description
            handle
            variants(first: 100) {
                edges {
                        node {
                        quantityAvailable
                        }
                    }
                }
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
    `;

    const data = await graphQLClient.request(query);
    console.log("Raw data from Shopify API:", data); 
    return data.products.edges; 
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array to avoid undefined
  }
}

export default getAllProducts;