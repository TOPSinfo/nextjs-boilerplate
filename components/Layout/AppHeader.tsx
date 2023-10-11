import { Dropdown, Layout, Typography } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { logout } from "@/redux/actions/login.action";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

const { Header } = Layout;

const AppHeader = () => {
    const dispatch = useDispatch();
    const session = useSession();
    const [profile, setProfile] = useState<string>("");
    const [profilePic, setProfilePic] = useState<string>("");

    const items: MenuProps["items"] = [
        {
            label: (
                <Link href="/profile">
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
        if (session?.data) {
            const data = session?.data?.user?.username;
            setProfile(data);
            setProfilePic(session?.data?.user?.profilePic);
        }
    }, [session?.data]);
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
                                className="inline-block rounded-[25px]"
                                width={50}
                                height={50}
                                src={profilePic}
                                alt="logo"
                                priority
                            />{" "}
                        </div>
                        <div className="flex justify-center items-center">
                            <Typography className="text-center capitalize pl-[10px] font-poppins text-[16px] align-middle	">
                                {profile}
                            </Typography>
                        </div>
                    </div>
                </Dropdown>
            </Header>
        </>
    );
};

export default AppHeader;
