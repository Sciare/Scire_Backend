import { config } from "@/config";
import { User } from "@/db/models/User/model/User";
import { AuthType } from "@/db/models/User/types/AuthType";
import { InvalidMicrosoftAccount } from "@/errors/azure/InvalidMicrosoftAccount";
import { findAzureUser } from "./AzureMapService";

interface UserParams {
  email: string;
  msId: string;
}

export const createUserFromAzure = async ({
  email,
  msId,
}: UserParams): Promise<User> => {
  const azureUser = await findAzureUser({
    msEmail: email,
    msId,
  });

  if (!azureUser) {
    throw new InvalidMicrosoftAccount();
  }

  //const azureId = azureUser.id;
  const firstName = azureUser.firstName;
  const lastName = azureUser.lastName;
  const fullName = azureUser.fullName;

  const newUser: Partial<User> = {
    authType: AuthType.Microsoft,
    email,
    firstName,
    isActive: true,
    isEmailConfirmed: true,
    lastName,
    //azureId,
    name: fullName,
    password: config.email.defaultPassword, // for Ms and Google, we don't use the password field
  };
  const user: User = await User.create(newUser);
  return user;
};
