export type IPropertyOwnerUpdateRequest = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  oldProfileImagePath?: string;
};

export type IPropertyOwnerFilterRequest = {
  searchTerm?: string | undefined;
  propertyOwnerId?: string | undefined;
  createdAt?: string | undefined;
};
