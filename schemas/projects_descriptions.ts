export default {
  name: 'projects_descriptions',
  type: 'document',
  title: 'Projects Descriptions',
  fields: [
    {
      name: 'project_name',
      title: 'Project name (lv)',
      type: 'string',
    },
    {
      name: 'project_name_en',
      title: 'Project name (en)',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Project year',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address (lv)',
      type: 'string',
    },
    {
      name: 'address_en',
      title: 'Address (en)',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status (lv)',
      type: 'string',
    },
    {
      name: 'status_en',
      title: 'Status (en)',
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
              title: 'Title (lv)',
              type: 'string',
            },
            {
              name: 'title_en',
              title: 'Title (en)',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Content (lv)',
              type: 'string',
            },
            {
              name: 'content_en',
              title: 'Content (en)',
              type: 'string',
            },
          ],
        },
      ],
    }
  ]
}
