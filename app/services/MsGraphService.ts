import { config } from "@/config";
import { log } from "@/libraries/Log";
import {
  Client,
  PageCollection,
  PageIterator,
} from "@microsoft/microsoft-graph-client";
import axios from "axios";
import "isomorphic-fetch";
import qs from "qs";

export enum UserType {
  Member = "Member",
  Guest = "Guest",
}

interface UserMinParams {
  givenName: string;
  id: string;
  mail: string;
  surname: string;
}

interface ObjectParams {
  [key: string]: any;
}

interface UserParams {
  assignedLicenses: Array<ObjectParams>;
  country: string;
  createdDateTime: string;
  department: string;
  displayName: string;
  givenName?: string;
  id: string;
  jobTitle: string;
  mail: string;
  manager: string;
  surname?: string;
}

interface ProfileParams {
  assignedLicenses: Array<ObjectParams>;
  birthday: string;
  country: string | null;
  createdDateTime: string;
  department: string | null;
  directReports: Array<ObjectParams>;
  displayName: string;
  employeeHireDate: string;
  givenName: string;
  id: string;
  jobTitle: string | null;
  mail: string;
  mobilePhone: string | null;
  otherMails: Array<string>;
  surname: string;
  usageLocation: string;
  userType: UserType;
}

class MsGraph {
  async getToken() {
    const postData = {
      client_id: config.auth.microsoft.clientID,
      scope: config.auth.azure.scope,
      client_secret: config.auth.microsoft.clientSecret,
      grant_type: config.auth.azure.grantType,
    };

    try {
      const response = await axios.post(
        config.auth.azure.tokenEndpoint,
        qs.stringify(postData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      const token: string = response.data.access_token;
      return token;
    } catch (error) {
      log.error("Error creating MsGraph token", error);
      throw error;
    }
  }

  async getAuthenticatedClient(accessToken: string) {
    // Initialize Graph client
    const client: Client = Client.init({
      // Use the provided access token to authenticate
      // requests
      authProvider: done => {
        done(null, accessToken);
      },
    });

    return client;
  }

  async getUserByPk(pk: string) {
    try {
      const token: string = await this.getToken();
      const client: Client = await this.getAuthenticatedClient(token);

      const {
        assignedLicenses,
        birthday,
        country,
        createdDateTime,
        department,
        directReports,
        displayName,
        employeeHireDate,
        givenName,
        id,
        jobTitle,
        mail,
        mobilePhone,
        otherMails,
        surname,
        usageLocation,
        userType,
      }: ProfileParams = await client
        .api(`/users/${pk}`)
        .select(
          "assignedLicenses, birthday, country, createdDateTime, department, displayName, employeeHireDate, givenName, id, jobTitle, mail, mobilePhone, otherMails, surname, usageLocation, userType",
        )
        .expand("directReports")
        .get()
        .catch(error => {
          log.error("User not found", error);
        });

      const manager = await client
        .api(`/users/${pk}/manager`)
        .select("id, mail")
        .get()
        .catch(() => {
          console.log("Manager not found");
          return null;
        });

      const photoDetails = await client
        .api(`/users/${pk}/photos/96x96`)
        .get()
        .catch(() => {
          console.log("Photo details not found");
          return null;
        });

      const base64Photo = await client
        .api(`/users/${pk}/photos/96x96/$value`)
        .getStream()
        .then(stream => {
          const chunks = [];
          return new Promise((resolve, reject) => {
            stream.on("data", chunk => {
              chunks.push(chunk);
            });
            stream.on("error", reject);
            stream.on("finish", () => {
              resolve(Buffer.concat(chunks).toString("base64"));
            });
          });
        })
        .then(chuncks => String(chuncks))
        .catch(() => {
          console.log("Photo not found");
          return "";
        });

      const photoName: string = photoDetails
        ? `profilePicture_${id}_${photoDetails.id}`
        : "";
      const photoType: string = photoDetails
        ? photoDetails["@odata.mediaContentType"]
        : "";
      const externalManagerId: string = manager?.id ?? "";
      const externalManagerMail: string = manager?.mail ?? "";

      return {
        birthday,
        country: country ?? "",
        createdDateTime,
        department: department ?? "",
        displayName,
        employeeHireDate,
        externalManagerId,
        externalManagerMail,
        givenName,
        id,
        isActive: assignedLicenses.length > 0,
        isManager: directReports.length > 0,
        jobPosition: jobTitle ?? "",
        mail,
        mobilePhone: mobilePhone ?? "",
        otherMails,
        photo: {
          type: photoType,
          name: photoName,
          file: base64Photo,
        },
        surname,
        usageLocation,
        userType,
      };
    } catch (err) {
      return null;
    }
  }

  async getUserPictureByPk(pk: string) {
    try {
      const token: string = await this.getToken();
      const client: Client = await this.getAuthenticatedClient(token);

      const { id }: ProfileParams = await client
        .api(`/users/${pk}`)
        .select("id")
        .get()
        .catch(error => {
          log.error("User not found", error);
        });

      const photoDetails = await client
        .api(`/users/${pk}/photos/96x96`)
        .get()
        .catch(() => {
          console.log("Photo details not found");
          return null;
        });

      const base64Photo = await client
        .api(`/users/${pk}/photos/96x96/$value`)
        .getStream()
        .then(stream => {
          const chunks = [];
          return new Promise((resolve, reject) => {
            stream.on("data", chunk => {
              chunks.push(chunk);
            });
            stream.on("error", reject);
            stream.on("finish", () => {
              resolve(Buffer.concat(chunks).toString("base64"));
            });
          });
        })
        .then(chuncks => String(chuncks))
        .catch(() => {
          console.log("Photo not found");
          return "";
        });

      const photoName: string = photoDetails
        ? `profilePicture_${id}_${photoDetails.id}`
        : "";
      const photoType: string = photoDetails
        ? photoDetails["@odata.mediaContentType"]
        : "";

      return {
        type: photoType,
        name: photoName,
        file: base64Photo,
      };
    } catch (err) {
      return null;
    }
  }

  async getUserEmailByPk(pk: string) {
    try {
      const token: string = await this.getToken();
      const client: Client = await this.getAuthenticatedClient(token);

      const { userPrincipalName } = await client
        .api(`/users/${pk}`)
        .select("userPrincipalName")
        .get()
        .catch(error => {
          log.error("User not found", error);
        });

      return userPrincipalName;
    } catch (err) {
      return null;
    }
  }

  async getUsersId() {
    const token: string = await this.getToken();
    const client: Client = await this.getAuthenticatedClient(token);

    const response: PageCollection = await client
      .api("/users")
      .select("id, mail, givenName, surname")
      .filter("userType eq 'Member'")
      .get()
      .catch(error => {
        console.log(error);
      });

    const employees: Array<ObjectParams> = [];

    // A callback function to be called for every item in the collection. This call back should return boolean indicating whether not to continue the iteration process.
    const callback = data => {
      const { id, givenName, surname, mail }: UserMinParams = data;
      if (
        mail &&
        givenName &&
        surname &&
        mail.includes("@theksquaregroup.com")
      ) {
        employees.push({
          msId: id,
          msEmail: mail,
        });
      }

      return true;
    };

    // Creating a new page iterator instance with client a graph client instance, page collection response from request and callback
    const pageIterator: PageIterator = new PageIterator(
      client,
      response,
      callback,
    );

    // This iterates the collection until the nextLink is drained out.
    await pageIterator.iterate();

    return employees;
  }

  // Get Users from Graph
  async getUsers() {
    const token: string = await this.getToken();
    const client: Client = await this.getAuthenticatedClient(token);

    const response: PageCollection = await client
      .api("/users")
      .select(
        "id, displayName, givenName, surname, mail, assignedLicenses, department, country, createdDateTime, jobTitle",
      )
      .filter("userType eq 'Member'")
      .expand("manager")
      .top(999)
      .get()
      .catch(error => {
        console.log(error);
      });

    const employees: Array<ObjectParams> = [];

    // A callback function to be called for every item in the collection. This call back should return boolean indicating whether not to continue the iteration process.
    const callback = data => {
      const {
        id,
        displayName,
        givenName,
        surname,
        mail,
        assignedLicenses,
        department,
        country,
        manager,
        createdDateTime,
        jobTitle,
      }: UserParams = data;
      if (mail && givenName && surname) {
        if (mail.includes("@theksquaregroup.com")) {
          employees.push({
            msId: id,
            displayName,
            givenName,
            surname,
            department,
            country,
            email: mail,
            active: assignedLicenses.length > 0 ? true : false,
            manager,
            createdDateTime,
            jobTitle,
          });
        }
      }

      return true;
    };

    // Creating a new page iterator instance with client a graph client instance, page collection response from request and callback
    const pageIterator: PageIterator = new PageIterator(
      client,
      response,
      callback,
    );

    // This iterates the collection until the nextLink is drained out.
    await pageIterator.iterate();

    return employees;
  }

  async getUsersEmails(email: string) {
    const token: string = await this.getToken();
    const client: Client = await this.getAuthenticatedClient(token);

    const { value } = await client
      .api("/users")
      .select("mail, userPrincipalName")
      .filter(`userPrincipalName eq '${email}'`)
      .get()
      .catch(error => {
        console.log(error);
      });

    return value;
  }
}

const msGraph = new MsGraph();
export default msGraph;
