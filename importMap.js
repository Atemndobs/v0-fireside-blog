export const importMap = {
  '@payloadcms/next/utilities': () => import('@payloadcms/next/utilities'),
  '@payloadcms/ui': () => import('@payloadcms/ui'),
  '@payloadcms/ui/fields/Text': () => import('@payloadcms/ui/fields/Text'),
  '@payloadcms/ui/fields/Textarea': () => import('@payloadcms/ui/fields/Textarea'),
  '@payloadcms/ui/fields/Number': () => import('@payloadcms/ui/fields/Number'),
  '@payloadcms/ui/fields/Email': () => import('@payloadcms/ui/fields/Email'),
  '@payloadcms/ui/fields/Relationship': () => import('@payloadcms/ui/fields/Relationship'),
  '@payloadcms/ui/fields/Select': () => import('@payloadcms/ui/fields/Select'),
  '@payloadcms/ui/fields/Upload': () => import('@payloadcms/ui/fields/Upload'),
  '@payloadcms/ui/fields/RichText': () => import('@payloadcms/ui/fields/RichText'),
  '@payloadcms/richtext-lexical/client': () => import('@payloadcms/richtext-lexical/client'),
}
