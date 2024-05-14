import React from "react";

import SettingsPage from "@/components/pages/Settings";
import getSession from "@/lib/actions/server-hooks/getsession.action";

export default async function Page(){
    const session = await getSession()

    if(session?.role !== "Admin") {
        return (
            <div className="font-bold text-center mt-[12rem]">
                <p> You are not authorized to view this page. Contact your organization Admin.</p>
            </div>
        )
    }
    return (
        <SettingsPage />
    )
}