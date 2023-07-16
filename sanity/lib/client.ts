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

  return {
    props: {
      main,
      intro
    }
  };
}