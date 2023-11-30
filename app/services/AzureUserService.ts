import { config } from "@/config";
import { User } from "@/db/models/User/model/User";
import { AuthType } from "@/db/models/User/types/AuthType";
import { InvalidMicrosoftAccount } from "@/errors/azure/InvalidMicrosoftAccount";
import { findAzureUser } from "./AzureMapService";

interface UserParams {
  email: string;
  msId: string;
}

interface AzureUser extends Partial<User> {
  uid_azure: string;
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

  const uid_azure = azureUser.id;
  const firstName = azureUser.firstName;
  const lastName = azureUser.lastName;
  const fullName = azureUser.fullName;

  const newUser: AzureUser = {
    authType: AuthType.Microsoft,
    email,
    firstName,
    isActive: true,
    isEmailConfirmed: true,
    lastName,
    uid_azure,
    name: fullName,
    password: config.email.defaultPassword,
  };
  const user: User = await User.create(newUser);
  return user;
};
