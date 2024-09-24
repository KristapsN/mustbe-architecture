export default {
  name: 'projects_descriptions',
  type: 'document',
  title: 'Projects Descriptions',
  fields: [
    {
      name: 'project_name',
      title: 'Project name',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Project year',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
    },
    {
      name: 'order_number',
      title: 'Order number',
      type: 'number',
    },
    {
      name: 'descriptions',
      type: 'array',
      title: 'Descriptions',
      of: [
        {
          title: 'Project description',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'string',
            },
          ],
        },
      ],
    }
  ]
}
