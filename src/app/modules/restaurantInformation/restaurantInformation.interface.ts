export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  role?: string | undefined;
  userStatus?: string | undefined;
  email?: string | undefined;
};
export type IRestaurantCreateOrUpdateRequest = {
  oldLogoPath?: string;
  restaurantName: string;
  restaurantEmail: string;
  restaurantSecondaryEmail: string;
  contactNumber: string;
  emergencyContactNumber: string;
  restaurantFacebook?: string;
  restaurantInstagram?: string;
  restaurantDescription: string;
};
