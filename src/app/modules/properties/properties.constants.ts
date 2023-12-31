export const propertiesFilterableFields: string[] = [
  'propertyId',
  'searchTerm',
  'ownerId',
  // 'numOfBed',
  // 'numOfBath',
  'createdAt',
];

export const propertiesSearchableFields: string[] = ['address', 'description'];

export const propertiesRelationalFields: string[] = ['ownerId'];
export const propertiesRelationalFieldsMapper: { [key: string]: string } = {
  ownerId: 'ownerId',
};
