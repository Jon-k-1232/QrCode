DROP TABLE IF EXISTS public.qrs;
DROP TABLE IF EXISTS public.qrInformation;
DROP TABLE IF EXISTS public.userInformation;
DROP TABLE IF EXISTS public.login;

CREATE TABLE "qrs" (
	"qrId" INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	"userId" integer not NULL,
	"qrInformationId" integer not NULL,
	"url" varchar not NULL,
	"size" integer not NULL,
	"border" integer not NULL,
	"backgroundColor" varchar not NULL,
	"foregroundColor" varchar not NULL,
	"creationDate" timestamp not NULL,
	"isQrActive" bool not NULL
);

CREATE TABLE "qrInformation" (
	"qrInformationId" INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	"qrId" integer not NULL,
	"userId" integer not NULL,
	"numberOfTimesScanned" integer NULL,
	"lastAccessed" timestamp NULL,
	"creationDate" timestamp not NULL,
	"useCase" varchar not NULL,
	"companyName" varchar NULL,
	"firstName" varchar NULL,
	"lastName" varchar NULL,
	"phone" varchar NULL,
	"fax" varchar NULL,
	"street" varchar NULL,
	"city" varchar NULL,
	"zip" varchar NULL,
	"email" varchar NULL,
	"website" varchar NULL,
	"twitter" varchar NULL,
	"facebook" varchar NULL,
	"linkedIn" varchar NULL,
	"instagram" varchar NULL,
	"otherSocialMedia" varchar null,
	"isQrInformationActive" bool not NULL
);

CREATE TABLE "userInformation" (
	"userId" INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	"loginId" integer not NULL,
	"companyName" integer NULL,
	"firstName" integer NULL,
	"lastName" varchar NULL,
	"email" varchar NULL,
	"lastUpdatedDate" timestamp NULL,
	"creationDate" timestamp not NULL,
	"isUserActive" bool not NULL
);

CREATE TABLE "login" (
	"loginId" INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	"userName" varchar not NULL,
	"password" varchar not NULL,
	"creationDate" timestamp not NULL,
	"lastAccessed" timestamp NULL,
	"lastUpdated" timestamp NULL,
	"isLoginActive" bool not NULL
);
