import { z } from "zod";

const updateTenantProfile = z.object({
  firstName: z
    .string({
      invalid_type_error: "firstName must be in String",
    })
    .optional(),
  lastName: z
    .string({
      invalid_type_error: "lastName must be in String",
    })
    .optional(),
  phoneNumber: z
    .string({
      invalid_type_error: "phoneNumber must be in String",
    })
    .optional(),
  dateOfBirth: z
    .string({
      invalid_type_error: "dateOfBirth must be in Date Type",
    })
    .optional(),
  presentAddress: z
    .string({
      invalid_type_error: "presentAddress must be in String",
    })
    .optional(),
  socialSecurityNumber: z
    .string({
      invalid_type_error: "socialSecurityNumber must be in String",
    })
    .optional(),
  drivingLicenseNumber: z
    .string({
      invalid_type_error: "drivingLicenseNumber must be in String",
    })
    .optional(),
  isCriminalRecord: z
    .boolean({
      invalid_type_error: "isCriminalRecord must be true or false",
    })
    .optional(),
  criminalRecordDescription: z
    .string({
      invalid_type_error: "criminalRecordDescription must be in String",
    })
    .optional(),
  CurrentEmployerOrBusinessName: z
    .string({
      invalid_type_error: "CurrentEmployerOrBusinessName must be in String",
    })
    .optional(),
  CurrentEmployerOrBusinessContactInfo: z
    .string({
      invalid_type_error: "CurrentEmployerOrBusinessContactInfo must be in String",
    })
    .optional(),
  JobTitle: z
    .string({
      invalid_type_error: "JobTitle must be in String",
    })
    .optional(),
  AnnualSalary: z
    .number({
      invalid_type_error: "AnnualSalary must be in Integer",
    })
    .optional(),
  OtherIncomeSource: z
    .string({
      invalid_type_error: "OtherIncomeSource must be in String",
    })
    .optional(),
  CurrentCreditScore: z
    .number({
      invalid_type_error: "CurrentCreditScore must be in Integer",
    })
    .optional(),
  isSmoker: z
    .boolean({
      invalid_type_error: "isSmoker must be in true or false",
    })
    .optional(),
  allergies: z
    .string({
      invalid_type_error: "allergies must be in String",
    })
    .optional(),
  isHaveOtherMember: z
    .boolean({
      invalid_type_error: "isHaveOtherMember must be true or false",
    })
    .optional(),
  numberOfMember: z
    .number({
      invalid_type_error: "numberOfMember must be in Integer",
    })
    .optional(),
  isWillingToSignLeasingAgreement: z
    .number({
      invalid_type_error: "isWillingToSignLeasingAgreement must be in Integer",
    })
    .optional(),
  isAnyExtraToMention: z
    .string({
      invalid_type_error: "isAnyExtraToMention must be in String",
    })
    .optional(),
  isPets: z
    .boolean({
      invalid_type_error: "isPets must be true or false",
    })
    .optional(),
  typeOfPets: z
    .string({
      invalid_type_error: "typeOfPets must be in String",
    })
    .optional(),
  isPetVaccinated: z
    .boolean({
      invalid_type_error: "isPetVaccinated must be true or false",
    })
    .optional(),
  prevLandlordName: z
    .string({
      invalid_type_error: "prevLandlordName must be in String",
    })
    .optional(),
  prevLandlordContactInfo: z
    .string({
      invalid_type_error: "prevLandlordContactInfo must be in String",
    })
    .optional(),
  lengthOfPrevTenancy: z
    .string({
      invalid_type_error: "lengthOfPrevTenancy must be in String",
    })
    .optional(),
  affordableRentAmount: z
    .number({
      invalid_type_error: "affordableRentAmount must be in Integer",
    })
    .optional(),
  leavingReason: z
    .string({
      invalid_type_error: "leavingReason must be in String",
    })
    .optional(),
  isAnyLatePaymentReason: z
    .string({
      invalid_type_error: "isAnyLatePaymentReason must be in String",
    })
    .optional(),
});

export const TenantsValidation = {
  updateTenantProfile,
};
