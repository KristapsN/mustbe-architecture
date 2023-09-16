export default {
  name: 'projects_images',
  type: 'document',
  title: 'Projects Images',
  fields: [
    {
      name: 'project_name',
      title: 'Project name',
      type: 'string',
    },
    {
      name: 'order_number',
      title: 'Order number',
      type: 'number',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
    }
  ]
}
