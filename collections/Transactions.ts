import type { CollectionConfig } from 'payload'

export const Transactions: CollectionConfig = {
  slug: 'transactions',
  admin: {
    useAsTitle: 'description',
    defaultColumns: ['date', 'type', 'amount', 'description', 'person'],
    listSearchableFields: ['description', 'notes'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Contribution', value: 'contribution' },
        { label: 'Expense', value: 'expense' },
      ],
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Amount in USD',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MMM d, yyyy',
        },
      },
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Shield (Editor)', value: 'shield-editor' },
        { label: 'Lumiere (Shorts)', value: 'lumiere-editor' },
        { label: 'Promotion', value: 'promotion' },
        { label: 'Guest Data', value: 'guest-data' },
        { label: 'Contribution', value: 'contribution' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'person',
      type: 'select',
      required: true,
      options: [
        { label: 'Atem', value: 'atem' },
        { label: 'Anyang', value: 'anyang' },
        { label: 'Eunice', value: 'eunice' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Optional notes or context',
      },
    },
    {
      name: 'isHistorical',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Imported from meeting notes (not manually entered)',
      },
    },
  ],
}
