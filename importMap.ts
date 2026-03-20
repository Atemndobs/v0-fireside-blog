export const importMap = {
  '@payloadcms/next/utilities#RenderServerComponent': () =>
    import('@payloadcms/next/utilities').then((m) => m.RenderServerComponent),
  '@payloadcms/ui#Button': () => import('@payloadcms/ui').then((m) => m.Button),
  '@payloadcms/ui/fields/Text#TextField': () => import('@payloadcms/ui/fields/Text').then((m) => m.TextField),
  '@payloadcms/ui/fields/Textarea#TextareaField': () => import('@payloadcms/ui/fields/Textarea').then((m) => m.TextareaField),
  '@payloadcms/ui/fields/Email#EmailField': () => import('@payloadcms/ui/fields/Email').then((m) => m.EmailField),
  '@payloadcms/ui/fields/Number#NumberField': () => import('@payloadcms/ui/fields/Number').then((m) => m.NumberField),
  '@payloadcms/ui/fields/Relationship#RelationshipField': () => import('@payloadcms/ui/fields/Relationship').then((m) => m.RelationshipField),
  '@payloadcms/ui/fields/Select#SelectField': () => import('@payloadcms/ui/fields/Select').then((m) => m.SelectField),
  '@payloadcms/ui/fields/Upload#UploadField': () => import('@payloadcms/ui/fields/Upload').then((m) => m.UploadField),
  '@payloadcms/richtext-lexical/client#RichTextField': () => import('@payloadcms/richtext-lexical/client').then((m) => m.RichTextField),
}
