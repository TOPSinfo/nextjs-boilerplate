import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
    DashboardOutlined,
    FormOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// components/Layout.tsx
const Sidebar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick: MenuProps["onClick"] = e => {
        router.push(e.key);
    };
    return (
        <div>
            <Layout.Sider
                className="sidebar"
                data-testid="sidebar"
                breakpoint={"lg"}
                theme="light"
                collapsedWidth={0}
                trigger={null}
            >
                <Menu
                    mode="inline"
                    data-testid="ant-menu"
                    className="h-[90vh] overflow-auto	"
                    items={[
                        {
                            label: "Dashboard",
                            title: "Dashboard",
                            key: "/dashboard",
                            icon: <DashboardOutlined />,
                        },
                        {
                            label: "Users",
                            title: "Users",
                            key: "/users",
                            icon: <UserOutlined />,
                        },
                        {
                            label: "Forms",
                            key: "/forms",
                            icon: <FormOutlined />,
                        },
                    ]}
                    defaultSelectedKeys={[pathname]}
                    onClick={handleClick}
                ></Menu>
            </Layout.Sider>
        </div>
    );
};

export default Sidebar;
