// components/Layout.tsx
import React, { useEffect, useState } from "react";
import { Affix, Skeleton } from "antd";
import Head from "next/head";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import { initializeAuthenticatedAxios } from "@/helpers/axios";
import { useRefreshToken } from "@/libs/hooks/useRefreshtoken";

interface LayoutProps {
    title?: string;
    children?: React.ReactNode; // Use React.ReactNode for children
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null); // Use boolean for isAuth
    const loginData = useSelector((state: RootState) => state.loginReducer);
    const session = useSession();

    const refreshToken = useRefreshToken();
    useEffect(() => {
        if (session?.data?.user) {
            console.log("data", session);
            initializeAuthenticatedAxios(session?.data, refreshToken);
        }
    }, [session?.data]);

    useEffect(() => {
        if (loginData?.isLoggedIn) {
            setIsAuth(true);
        } else if (loginData === null) {
            setIsAuth(null);
        } else {
            setIsAuth(false);
        }
    }, []);
    return (
        <>
            <Head>
                <title>{title}</title>
                {/* Add other meta tags here */}
            </Head>
            <main>
                {!isAuth && ( // Use boolean for conditional rendering when not logged in
                    <Affix offsetTop={0} className="app__affix-header">
                        <SkeletonHeader />
                    </Affix>
                )}
                {isAuth && ( // Use boolean for conditional rendering
                    <div>
                        <Affix offsetTop={0} className="app__affix-header">
                            <AppHeader />
                        </Affix>
                        <div>
                            {" "}
                            <Sidebar />
                            {children}{" "}
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

const SkeletonHeader: React.FC = () => {
    // Implement a skeleton loader for the header here
    return (
        <Skeleton.Input className="h-[62px]" block={true} active size="large" />
    );
};

export default Layout;
