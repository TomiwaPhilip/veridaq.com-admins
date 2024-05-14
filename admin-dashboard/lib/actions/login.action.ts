"use server";

import { redirect } from "next/navigation";
import getSession from "@/lib/actions/server-hooks/getsession.action";
import { getGoogleAuthUrl } from "@/lib/actions/server-hooks/google-auth.action";
import VerificationToken from "../utils/emailTokenSchema";
import { generateToken, sendVerificationRequest, verifyToken } from "../utils";
import connectToDB from "../model/database";
import Role from "@/lib/utils/roleSchema";
import Admin from "@/lib/utils/adminSchema";
import { saveSession } from "@/lib/utils";
import { getLinkedInAuthUrl } from "./server-hooks/linkedin-auth.action";

export async function signIn(email: string) {
  console.log("I want to send emails");
  try {
    connectToDB();

    // Generate token and URL for verification
    const { token, generatedAt, expiresIn } = generateToken();

    const url = `https://organic-enigma-r475wrq4j6gvhpp9w-3000.app.github.dev/auth/verify?token=${token}`;

    // Send email with resend.dev
    await sendVerificationRequest({ url: url, email: email });

    console.log("Email sent!");

    // Save email address, verification token, and expiration time in the database
    const save = await VerificationToken.create({
      token: token,
      email: email,
      createdAt: generatedAt, // Since generated in the function, set current time
      expiresAt: expiresIn,
    });

    if (save) {
      console.log("saved token to DB");
    }

    // Return a response
    return true;
  } catch (error) {
    return false;
  }
}

export async function verifyUserToken(token: string): Promise<boolean> {
  try {
    connectToDB();

    const existingToken = await VerificationToken.findOne({ token: token });

    if (!existingToken) {
      console.log("Token not found in DB");
      return false; // Token not found in the database
    }

    // Check if the token has expired
    const currentTime = new Date();
    const createdAt = existingToken.createdAt;
    const expiresIn = existingToken.expiresAt;
    const timeDifference = currentTime.getTime() - createdAt.getTime(); // Time difference in milliseconds
    const minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Convert milliseconds to minutes
    if (minutesDifference > 5) {
      console.log("Token has expired");
      // If the token has expired, delete the token document from the database
      await VerificationToken.findOneAndDelete({ token: token });
      return false; // Token has expired
    }

    const email = existingToken.email;

    try {
      // Check if the user already exists in the Role collection with the correct login type
      const existingUser = await Admin.findOne({ email: email });

      if (existingUser) {
        // User exists, obtain the organization ID from the existing user's organization field

        // Create session data
        let sessionData = {
          userId: existingUser._id.toString(),
          email: existingUser.email,
          firstName: existingUser.adminFirstName,
          lastName: existingUser.adminLastName,
          image: existingUser.image, // Initialize image as an empty string
          role: existingUser.role,
          isLoggedIn: true,
        };

        // Save session
        await saveSession(sessionData);

        // If the token is valid, delete the token document from the database
        await VerificationToken.findOneAndDelete({ token: token });

        // Redirect to the dashboard or appropriate page
        return true;
      } else {
        // User does not exist, hence, return false for unauthorized users
        return false;
      }
    } catch (error: any) {
      console.error("Error logging user in", error.message);
      return false;
    }
  } catch (error: any) {
    console.error("Error verifying token:", error.message);
    return false;
  }
}

export const signOut = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/auth/signin");
};

let googleAuthUrl: string;
export async function handleGoogleLogin() {
  try {
    // Get the Google OAuth URL
    googleAuthUrl = await getGoogleAuthUrl();
  } catch (error) {
    console.error("Error:", error);
    // Handle error
  } finally {
    // Redirect the user to the Google OAuth URL
    redirect(googleAuthUrl);
  }
}

let linkedinAuthUrl: string;
export async function handleLinkedInLogin() {
  try {
    // Get the Google OAuth URL
    linkedinAuthUrl = await getLinkedInAuthUrl();
  } catch (error) {
    console.error("Error:", error);
    // Handle error
  } finally {
    // Redirect the user to the Google OAuth URL
    redirect(linkedinAuthUrl);
  }
}
