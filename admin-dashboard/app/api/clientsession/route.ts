import { NextApiRequest } from "next";
import getSession from "@/lib/actions/server-hooks/getsession.action";

export async function GET(){
    try {
        const session = await getSession()
        const isLoggedIn = session.isLoggedIn;
        const firstName = session.firstName;
        const lastName = session.lastName;
        const image = session.image;
        const email = session.email;
        const userId = session.userId;

        console.log(isLoggedIn, firstName, lastName, image, email, userId)

        return Response.json({isLoggedIn, firstName, lastName, image, email, userId}, {status: 200})
    } catch (error: any) {
        console.error("An Error occured", error);
        return Response.json("An error occured while retriving user session", {status: 500})
    }
}