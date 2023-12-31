export type IServiceProviderUpdateRequest = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  oldProfileImagePath?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhoneNumber?: string;
  companyEmailAddress?: string;
};
export type IServiceProviderFilterRequest = {
  searchTerm?: string | undefined;
  serviceProviderId?: string | undefined;
  createdAt?: string | undefined;
};
