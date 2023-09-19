import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
    DashboardOutlined,
    FormOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// components/Layout.tsx
const Sidebar: React.FC = () => {
    const router = useRouter();
    const [path, setPath] = useState<string>("");
    const handleClick: MenuProps["onClick"] = e => {
        console.log(e, "e");
        router.push(e.key);
    };
    useEffect(() => {
        if (typeof window !== "undefined") {
            setPath(window.location.pathname);
        }
    }, []);

    console.log("path", path);
    return (
        <div>
            <Layout.Sider
                className="sidebar"
                breakpoint={"lg"}
                theme="light"
                collapsedWidth={0}
                trigger={null}
            >
                <Menu
                    mode="inline"
                    className="h-[90vh] overflow-auto	"
                    items={[
                        {
                            label: "Dashboard",
                            key: "/dashboard",
                            icon: <DashboardOutlined />,
                        },
                        {
                            label: "Users",
                            key: "/users",
                            icon: <UserOutlined />,
                        },
                        {
                            label: "Forms",
                            key: "/forms",
                            icon: <FormOutlined />,
                        },
                    ]}
                    defaultSelectedKeys={["/dashboard"]}
                    onClick={handleClick}
                ></Menu>
            </Layout.Sider>
        </div>
    );
};

export default Sidebar;
