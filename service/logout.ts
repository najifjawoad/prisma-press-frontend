"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export const logout = async ()=>{
    const cookiesStore = await cookies();

    cookiesStore.delete("accessToken");
    cookiesStore.delete("refreshToken");
    revalidateTag("my-profile" , "max");
    // redirect("/login")
}