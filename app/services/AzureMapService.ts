import { cleanText } from "@/utils/General";
import MsGraph, { UserType } from "./MsGraphService";

interface FindAzureUser {
  msEmail: string;
  msId: string;
}

interface UserNameProps {
  displayName: string;
  givenName: string;
  surname: string;
}

interface FullNameProps {
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName?: string;
}

interface PhotoParams {
  type: string;
  name: string;
  file: string;
}

interface ParamsFromAzure {
  birthday: string;
  country: string;
  createdDateTime: string;
  department: string;
  displayName: string;
  employeeHireDate: string;
  externalManagerId: string;
  externalManagerMail: string;
  givenName: string;
  id: string;
  isActive: boolean;
  isManager: boolean;
  jobPosition: string;
  mail: string;
  mobilePhone: string;
  otherMails: Array<string>;
  photo: PhotoParams;
  surname: string;
  usageLocation: string;
  userType: UserType;
}

const getUserNameProps = ({
  displayName,
  givenName,
  surname,
}: UserNameProps) => {
  const displayNameFormated = cleanText(displayName);
  const givenNameFormated = cleanText(givenName);
  const surnameFormated = cleanText(surname);

  const [name, surName = ""] = displayNameFormated.split(" ");
  const [firstName = name, ...middleNameArray] = givenNameFormated.split(" ");
  const [lastName = surName, ...secondLastNameArray] = surnameFormated.split(
    " ",
  );

  const middleName =
    middleNameArray.length > 0 ? middleNameArray.join(" ") : "";
  const secondLastName =
    secondLastNameArray.length > 0 ? secondLastNameArray.join(" ") : "";

  return { firstName, middleName, lastName, secondLastName };
};

const getFullName = ({
  firstName,
  middleName,
  lastName,
  secondLastName,
}: FullNameProps): string => {
  const fullName = `${firstName ?? ""} ${middleName ?? ""} ${lastName ??
    ""} ${secondLastName ?? ""}`;

  return cleanText(fullName);
};

export const findAzureUser = async ({ msEmail, msId }: FindAzureUser) => {
  const jobEmail = msEmail.toLowerCase();
  const existingUserInAzure =
    (await MsGraph.getUserByPk(msId)) ?? (await MsGraph.getUserByPk(jobEmail));

  if (!existingUserInAzure) {
    return null;
  }

  const {
    displayName,
    givenName,
    id,
    surname,
  }: ParamsFromAzure = existingUserInAzure;

  const { firstName, middleName, lastName, secondLastName } = getUserNameProps({
    displayName,
    givenName,
    surname,
  });

  const fullName = getFullName({
    firstName,
    middleName,
    lastName,
    secondLastName,
  });

  return { id, firstName, lastName, fullName };
};
