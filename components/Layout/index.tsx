// components/Layout.tsx
import { Affix } from "antd";
import Head from "next/head";
import AppHeader from "./AppHeader";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
    title: string;
    children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    const [isAuth, setIsAuth] = useState<string | null>("");

    useEffect(() => {
        const value: string | null = localStorage.getItem("isLoggedIn");
        setIsAuth(value);
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                {/* Add other meta tags here */}
            </Head>
            <main>
                {" "}
                {isAuth === "true" ? (
                    <Affix offsetTop={0} className="app__affix-header">
                        <AppHeader />
                    </Affix>
                ) : (
                    ""
                )}
                {isAuth === "true" ? (
                    <div className="flex">
                        <Sidebar />
                        {children}
                    </div>
                ) : (
                    <>{children}</>
                )}
            </main>
        </>
    );
};

export default Layout;
