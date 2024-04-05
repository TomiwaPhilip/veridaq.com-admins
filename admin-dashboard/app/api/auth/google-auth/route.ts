import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

import { getGoogleAccessToken, getGoogleUserInfo } from "@/lib/actions/server-hooks/google-auth.action";
import connectToDB from '@/lib/model/database';
import Role from '@/lib/utils/roleSchema';
import Organization from "@/lib/utils/adminSchema";
import { saveSession } from '@/lib/utils';


export async function GET(req: NextApiRequest, res: NextApiResponse) {

    if(!req.url) {
        return new Response("No request query found!", { status: 401})
    }
    const urlSearchParams = new URLSearchParams(req.url.split('?')[1]);
    const code = urlSearchParams.get('code');

  // Check if code is undefined
  if (!code) {
    return new Response("No code is provided", { status: 401 });
  }

  try {
    // Exchange the authorization code for an access token
    const accessToken = await getGoogleAccessToken(code);

    if(!accessToken) {
        return new Response("No access token provided", { status: 401 });
    }
    // Use the access token to retrieve user information from Google
    const userInfo = await getGoogleUserInfo(accessToken);

    try {
      // Connect to the database
      connectToDB();
        
      // Destructure the relevant properties from userInfo with optional chaining and nullish coalescing
      const { email, given_name, family_name, picture } = userInfo ?? {};
    
      // Check if the user already exists in the Role collection with the correct login type
      const existingUser = await Role.findOne({ email: email });

      if (existingUser) {
        // User exists, obtain the organization ID from the existing user's organization field
        const organizationId = existingUser.organization;

        // Create session data
        let sessionData = {
          userId: existingUser._id,
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          image: '', // Initialize image as an empty string
          isOnboarded: false,
          isVerified: false,
          role: existingUser.role,
          orgId: organizationId,
          isLoggedIn: true
        };

        // Retrieve organization details
        const existingOrg = await Organization.findById(organizationId);

        if (existingOrg) {
          // If organization exists, update session data with organization's image
          sessionData.image = existingOrg.image;
          sessionData.isOnboarded = existingOrg.onboarded;
          sessionData.isVerified = existingOrg.verified;
        }

        if (existingUser.loginType === 'google') {
          // User exists with the correct login type (Google), proceed with login
          console.log("User found with correct login type (Google), proceeding with login");

          // Save session
          await saveSession(sessionData);

          // Redirect to the dashboard or appropriate page
          return NextResponse.redirect(new URL('/dashboard', req.url));
        } else if (existingUser.loginType === "email") {
          // User exists with the correct login type (email), proceed with login
          console.log("User found with correct login type (email), proceeding with login");

          // Save session
          await saveSession(sessionData);

          // Redirect to the dashboard or appropriate page
          return NextResponse.redirect(new URL('/dashboard', req.url));
        } else {
          // User exists with a different login type, redirect to error page
          console.log("User found with incorrect login type, redirecting to error page");

          // Redirect to error page with appropriate error message
          return NextResponse.redirect(new URL('/error', req.url));
        }
      } else {
        // User does not exist, create a new organization and role with the received email

        // Check if the organization already exists based on the received email
        let organization = await Organization.findOne({ email: email });

        // If the organization doesn't exist, create a new one
        if (!organization) {
          console.log("Organization not found, creating new organization");
        
          organization = await Organization.create({
            email: email,
            adminFirstName: given_name,
            adminLastName: family_name
          });
        } else {
          console.log("Organization found, using existing organization");
        }

        // Obtain the organization ID
        const organizationId = organization._id;

        // Create a new role for the user with the received email
        const newRole = await Role.create({
          email: email,
          firstName: given_name,
          lastName: family_name,
          role: 'admin', // or whatever default role you want to assign
          loginType: 'google', // or the appropriate login type
          organization: organizationId
        });

        // Create session data
        const sessionData = {
          userId: newRole._id,
          email: newRole.email,
          firstName: newRole.firstName,
          lastName: newRole.lastName,
          image: organization.image,
          isOnboarded: organization.onboarded,
          isVerified: organization.verified,
          role: newRole.role,
          orgId: organizationId,
          isLoggedIn: true
        };

        // Save session
        await saveSession(sessionData);

        // Redirect to the dashboard or appropriate page
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error:', error);
      return Response.json({ error: 'Internal Server Error', status: 500 });
    }    
    
  } catch (error) {
    // Handle any errors that occur during the authentication process
    console.error('Error:', error);
    return Response.json({ error: 'Internal Server Error', status: 500 });
}}
