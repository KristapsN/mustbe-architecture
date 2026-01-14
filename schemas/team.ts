export default {
  name: 'team',
  type: 'document',
  title: 'Team',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'contact_title_lv',
      title: 'Contact Title (lv)',
      type: 'string',
    },
    {
      name: 'contact_title_en',
      title: 'Contact Title (en)',
      type: 'string',
    },
    {
      name: 'contact_subtitle_lv',
      title: 'Contact Subtitle (lv)',
      type: 'string',
    },
    {
      name: 'contact_subtitle_en',
      title: 'Contact Subtitle (en)',
      type: 'string',
    },
  ]
}