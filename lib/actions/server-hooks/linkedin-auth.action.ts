"use server";

import axios from 'axios';

const redirectUri = "https://legendary-zebra-45v97xp5wr5fjprq-3000.app.github.dev/api/auth/linkedin-auth";
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID as string;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET as string;
const scope = 'openid profile email'; // Scopes for basic profile info, email address, and organization info

// Function to generate LinkedIn authorization URL with specified scopes
export async function getLinkedInAuthUrl(): Promise<string> {
    const baseUrl = 'https://www.linkedin.com/oauth/v2/authorization';
    const queryParams = new URLSearchParams({
      response_type: 'code',
      client_id: LINKEDIN_CLIENT_ID,
      redirect_uri: redirectUri,
      scope: scope,
      state: 'veridaq', // Optional, used for CSRF protection
    });
    console.log(`${baseUrl}?${queryParams}`)
    return `${baseUrl}?${queryParams}`;
  }


// Function to exchange authorization code for access token
export async function exchangeCodeForToken(code: string): Promise<string> {
  const url = 'https://www.linkedin.com/oauth/v2/accessToken';
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: LINKEDIN_CLIENT_ID,
    client_secret: LINKEDIN_CLIENT_SECRET,
  });
  const response = await axios.post(url, params.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data.access_token;
}

// Function to fetch user profile data from LinkedIn
export async function getUserProfile(accessToken: string): Promise<any> {
  const url = 'https://api.linkedin.com/v2/userinfo';
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Connection': 'Keep-Alive',
    },
  });
  return response.data;
}
