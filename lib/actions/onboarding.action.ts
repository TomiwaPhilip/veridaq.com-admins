// "use server";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// import connectToDB from "../model/database";
// import User from "../utils/user";

// interface Params {
//   firstName: string;
//   lastName: string;
//   middleName: string;
//   streetAddress: string;
//   city: string;
//   country: string;
//   image: string;
// }

// export async function updateUser({
//   firstName,
//   lastName,
//   middleName,
//   streetAddress,
//   city,
//   country,
//   image,
// }: Params) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || !session.user) {
//       throw new Error("Unauthorized");
//     }

//     const email = session.user.email;

//     // Connect to the database
//     connectToDB();

//     // Update the user in the database
//     await User.findOneAndUpdate(
//       { email: email },
//       {
//         firstName,
//         lastName,
//         middleName,
//         streetAddress,
//         city,
//         country,
//         image,
//         onboarded: true,
//       },
//       // Upsert means both updating and inserting
//       { upsert: true },
//     );
//   } catch (error: any) {
//     throw new Error(`Failed to create/update user: ${error.message}`);
//   }
// }
