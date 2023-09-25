// components/Layout.tsx
import { Affix, Skeleton } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";

interface LayoutProps {
    title: string;
    children: React.ReactNode; // Use React.ReactNode for children
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null); // Use boolean for isAuth

    useEffect(() => {
        const value = localStorage.getItem("isLoggedIn");
        setIsAuth(value === "true" ? true : value === null ? null : false); // Use boolean value
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
