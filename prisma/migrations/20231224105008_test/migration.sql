-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'PAUSED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('TENANT_SCREENING', 'MAINTENANCE_AND_REPAIR', 'CLEAING', 'PEST_CONTROL', 'LAWN_CARE', 'SECURITY_AND_SAFETY', 'INSURANCE', 'INSPECTION', 'MARKETING', 'TECHNOLOGY');

-- CreateEnum
CREATE TYPE "ServiceAvailabilityEnum" AS ENUM ('LOW_PRIORITY', 'MEDIUM_PRIORITY', 'HIGH_PRIORITY', 'ALL_PRIORITIES');

-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('SUPERADMIN', 'TENANT', 'PROPERTY_OWNER', 'SERVICE_PROVIDER');

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userStatus" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "role" "UserRoles" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "tenants" (
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "photo" TEXT,
    "phone" TEXT,
    "socialSecurityNumber" TEXT,
    "drivingLicenseNumber" TEXT,
    "presentAddress" TEXT,
    "isCriminalRecord" BOOLEAN,
    "criminalRecordDescription" TEXT,
    "CurrentEmployer" TEXT,
    "EmployerContactInfo" TEXT,
    "JobTitle" TEXT,
    "AnnualSalary" INTEGER,
    "OtherIncomeSource" TEXT,
    "CurrentCreditScore" INTEGER,
    "isSmoker" BOOLEAN,
    "allergies" TEXT,
    "isHaveOtherMember" BOOLEAN,
    "numberOfMember" INTEGER,
    "isPets" BOOLEAN,
    "typeOfPets" TEXT,
    "isPetVacinated" BOOLEAN,
    "isAgree" BOOLEAN,
    "comment" TEXT,
    "prevLandlordName" TEXT,
    "prevLandlordContactInfo" TEXT,
    "lengthOfPrevTenancy" TEXT,
    "affordableRentAmount" INTEGER,
    "leavingReason" TEXT,
    "isLatePaid" BOOLEAN,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("tenantId")
);

-- CreateTable
CREATE TABLE "propertyOwners" (
    "propertyOwnerId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "photo" TEXT,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "propertyOwners_pkey" PRIMARY KEY ("propertyOwnerId")
);

-- CreateTable
CREATE TABLE "serviceProviders" (
    "serviceProviderId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "photo" TEXT,
    "phone" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "serviceProviders_pkey" PRIMARY KEY ("serviceProviderId")
);

-- CreateTable
CREATE TABLE "Property" (
    "propertyId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "numOfBed" INTEGER NOT NULL DEFAULT 1,
    "numOfBath" INTEGER NOT NULL DEFAULT 1,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maintenanceCoveredTenant" TEXT NOT NULL,
    "maintenanceCoveredOwner" TEXT NOT NULL,
    "schools" TEXT NOT NULL,
    "universities" TEXT NOT NULL,
    "allowedPets" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("propertyId")
);

-- CreateTable
CREATE TABLE "Services" (
    "serviceId" TEXT NOT NULL,
    "servicePriceRange" TEXT NOT NULL,
    "serviceDescription" TEXT NOT NULL,
    "serviceLocation" TEXT NOT NULL,
    "serviceCancellationPolicy" TEXT NOT NULL,
    "serviceAvailability" "ServiceAvailabilityEnum" NOT NULL,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("serviceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_userId_key" ON "tenants"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "propertyOwners_userId_key" ON "propertyOwners"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "serviceProviders_userId_key" ON "serviceProviders"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Services_ownerId_key" ON "Services"("ownerId");

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyOwners" ADD CONSTRAINT "propertyOwners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceProviders" ADD CONSTRAINT "serviceProviders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "propertyOwners"("propertyOwnerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "serviceProviders"("serviceProviderId") ON DELETE SET NULL ON UPDATE CASCADE;
