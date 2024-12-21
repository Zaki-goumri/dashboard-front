"use client"

import SigninForm from "@/components/signinForm";
    import { useAtomValue } from "jotai";
    import { isAuthorizedAtom } from "@/lib/atom";
    import { Alert } from "@mui/material";

const Page = () => {
    const isAuthorized = useAtomValue(isAuthorizedAtom);
 return (
        <main className=" flex justify-around items-center flex-col ">
            {isAuthorized && <Alert severity="error" className="w-1/3 mt-5" >{isAuthorized}</Alert>}
            <SigninForm/>
        </main>
    );
}
export default Page;