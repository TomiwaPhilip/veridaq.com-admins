import connectToDB from "../model/database";
import getSession from "./server-hooks/getsession.action";
import Admin from "../utils/adminSchema";
import { sendTeamInvite } from "../utils";

interface RoleInterface {
  firstName: string;
  lastName: string;
  designation: string;
  role: string;
  email: string;
  image: string;
}
export async function updateOrgRole(params: RoleInterface) {
  try {
    const session = await getSession();
    // Connect To Db
    connectToDB();

    const role = new Admin({
      adminFirstName: params.firstName,
      adminLastName: params.lastName,
      email: params.email,
      designation: params.designation,
      role: params.role,
      image: params.image,
    });

    await role.save();

    const data = await sendTeamInvite({
      firstName: params.firstName,
      email: params.email,
    });
    if (data) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error role details in DB", error);
    throw new Error("Error role details in DB");
  }
}
