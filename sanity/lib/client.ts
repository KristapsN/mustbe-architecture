import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})

export async function getStaticProps() {
  const main = await client.fetch(`*[_type == "main"]`);
  const intro = await client.fetch(`*[_type == "intro"]`);
  const projects_images = await client.fetch(`*[_type == "projects_images"]`);
  const projects_descriptions = await client.fetch(`*[_type == "projects_descriptions"]`);
  const about_us = await client.fetch(`*[_type == "about_us"]`);

  return {
    props: {
      main,
      intro,
      projects_images,
      projects_descriptions,
      about_us,
    }
  };
}