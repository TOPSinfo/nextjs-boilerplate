import { Dropdown, Layout, Typography } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { logout } from "@/redux/actions/login.action";
import Link from "next/link";
import { useDispatch } from "react-redux";

const { Header } = Layout;
interface User {
    username: string;
    email: string;
}
const AppHeader = () => {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState<User | null>(null);
    const items: MenuProps["items"] = [
        {
            label: (
                <Link href="/dashboard">
                    <Typography>Profile</Typography>
                </Link>
            ),
            key: "0",
        },
        {
            type: "divider",
        },
        {
            label: (
                <a
                    onClick={() => {
                        dispatch(logout());
                    }}
                >
                    Logout
                </a>
            ),
            key: "1",
        },
    ];
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user") as string);
        setProfile(data);
    }, []);
    return (
        <>
            <Header
                data-testid="app-header"
                className="bg-[#fff] border-b flex justify-between"
            >
                <div className="pt-[15px]">
                    {" "}
                    <Image
                        width={150}
                        height={66}
                        src={"/images/logo-header.png"}
                        alt="logo-header"
                        priority
                    />{" "}
                </div>
                <Dropdown menu={{ items }} trigger={["click"]}>
                    <div
                        data-testid="profile-dropdown"
                        onClick={e => e.preventDefault()}
                        className="flex justify-center cursor-pointer items-center"
                    >
                        <div className="text-center">
                            {" "}
                            <Image
                                className="inline-block"
                                width={50}
                                height={50}
                                src={"/images/avatar.png"}
                                alt="logo"
                                priority
                            />{" "}
                        </div>
                        <div className="flex justify-center items-center">
                            <Typography className="text-center capitalize pl-[10px] font-poppins text-[16px] align-middle	">
                                {profile?.username}
                            </Typography>
                        </div>
                    </div>
                </Dropdown>
            </Header>
        </>
    );
};

export default AppHeader;
