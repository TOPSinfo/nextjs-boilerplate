import { viewUsersRequest } from "@/redux/actions/user.action";
import { RootState } from "@/redux/store";
import { Card, Col, Layout, Row, Typography } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { ArrowLeftOutlined } from "@ant-design/icons";

type User = {
    firstName: string;
    lastname: string;
    email: string;
    gender: string;
    phone: string;
};

// user details page
const ViewUsers: React.FC = () => {
    const [userData, setUserData] = useState<User | null>(null);
    const router = useRouter();
    const dispatch = useDispatch();
    const userDetail = useSelector((state: RootState) => state.viewUserReducer);
    const isLoading = useSelector(
        (state: RootState) => state.loaderReducer.loading
    );

    // get the user id from params
    useEffect(() => {
        if (router.query.id) {
            dispatch(viewUsersRequest(router.query.id));
        }
    }, [dispatch, router.query.id]);

    useEffect(() => {
        if (userDetail?.user) {
            setUserData(userDetail.user);
        }
    }, [userDetail]);

    return (
        <>
            <Layout.Content
                data-testid="viewUser-component"
                className="bg-[#F0F2F5] pl-[200px] overflow-hidden"
            >
                <div className="bg-[#F0F2F5]">
                    <>
                        <Row>
                            <Col
                                className="flex items-center px-[15px] py-[15px]"
                                span={24}
                            >
                                <ArrowLeftOutlined
                                    onClick={() => router.push("/users")}
                                    className="text-[#1D1D1E] cursor-pointer text-[20px] mr-[10px] pb-[10px]"
                                />
                                <Typography.Title level={3}>
                                    Users Details
                                </Typography.Title>
                            </Col>
                        </Row>
                        {isLoading && <Loader />}
                        <Row>
                            <Col className="px-[15px] py-[15px]" span={24}>
                                <Card bordered={false}>
                                    <Row>
                                        <Col span={12}>
                                            <Typography className="text-[18px] font-[600]">
                                                Name
                                            </Typography>
                                            <Typography className="text-[16px]">
                                                {userData?.firstName}{" "}
                                                {userData?.lastname}
                                            </Typography>
                                        </Col>
                                        <Col span={12}>
                                            <Typography className="text-[18px] font-[600]">
                                                Email
                                            </Typography>
                                            <Typography className="text-[16px]">
                                                {userData?.email}
                                            </Typography>
                                        </Col>
                                    </Row>
                                    <Row className="my-[20px]">
                                        <Col span={12}>
                                            <Typography className="text-[18px] font-[600]">
                                                Phone Number
                                            </Typography>
                                            <Typography className="text-[16px]">
                                                {userData?.phone}
                                            </Typography>
                                        </Col>
                                        <Col span={12}>
                                            <Typography className="text-[18px] font-[600]">
                                                Gender
                                            </Typography>
                                            <Typography className="text-[16px]">
                                                {userData?.gender}
                                            </Typography>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </>
                </div>
            </Layout.Content>
        </>
    );
};

export default ViewUsers;
