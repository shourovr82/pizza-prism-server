export type ICustomerFilterRequest = {
  searchTerm?: string | undefined;
  factoryId?: string | undefined;
  styleNo?: string | undefined;
  profileId?: string | undefined;
  itemId?: string | undefined;
  startDate?: string | null; // Date range start
  endDate?: string | null;
};
