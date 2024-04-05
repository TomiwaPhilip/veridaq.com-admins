// "use server";

// import connectToDB from "../model/database";
// import User from "../utils/user";

// interface User {
//   onboarded: boolean;
//   verified: boolean;
// }

// export async function getUser(email: string): Promise<User | null> {
//   try {
//     connectToDB();
//     const user = await User.findOne({ email });
//     if (!user) {
//       throw new Error("User not found");
//     }
//     return { onboarded: user.onboarded, verified: user.verified };
//   } catch (error: any) {
//     throw new Error(`Failed to get user: ${error.message}`);
//   }
// }
