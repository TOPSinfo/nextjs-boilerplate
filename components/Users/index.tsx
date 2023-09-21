import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Dropdown,
    Layout,
    Result,
    Row,
    Space,
    Table,
    Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import type { ColumnsType } from "antd/es/table";

import Loader from "../Loader";
import {
    DeleteOutlined,
    EditFilled,
    EyeOutlined,
    MoreOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { fetchUsersRequest } from "@/redux/actions/user.action";
interface DataType {
    key: string;
    firstName: string;
    age: number;
    phone: string;
    email: string;
}
type User = {};

const items: MenuProps["items"] = [
    {
        label: (
            <>
                <EyeOutlined className="pr-[10px]" /> View
            </>
        ),
        key: "view",
    },
    {
        type: "divider",
    },
    {
        label: (
            <>
                <EditFilled className="pr-[10px]" /> Edit
            </>
        ),
        key: "edit",
    },
    {
        type: "divider",
    },
    {
        label: (
            <>
                <DeleteOutlined className="pr-[10px]" /> Delete
            </>
        ),
        key: "delete",
    },
];
const Users: React.FC = () => {
    const userData = useSelector((state: RootState) => state.userReducer);
    const [users, setUsers] = useState<User[] | []>([]);
    const dispatch = useDispatch();
    const columns: ColumnsType<User> = [
        {
            title: "Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Dropdown
                    align={{ offset: [-90, -80] }}
                    menu={{ items }}
                    trigger={["click"]}
                >
                    <Space size="middle">
                        <MoreOutlined className="text-[24px] cursor-pointer" />
                    </Space>
                </Dropdown>
            ),
        },
    ];

    useEffect(() => {
        if (userData && userData?.users) {
            console.log("data ======>: ", userData?.users);
            setUsers(userData?.users);
        }
    }, [userData]);

    useEffect(() => {
        dispatch(fetchUsersRequest());
    }, [dispatch]);
    return (
        <Layout.Content
            data-testid="users-component"
            className="bg-[#F0F2F5] w-[calc(100vw- 200px)] pl-[200px] overflow-hidden"
        >
            <div className="bg-[#F0F2F5]">
                <>
                    <Row>
                        <Col className="px-[15px] py-[15px]" span={12}>
                            <Typography.Title level={3}>Users</Typography.Title>
                        </Col>
                        <Col
                            className="px-[15px] py-[15px] flex justify-end"
                            span={12}
                        >
                            <Button
                                className="bg-[#3e79f7] hover:text-[#3e79f7] hover:bg-[#fff] text-[#fff] "
                                size="large"
                                icon={<PlusOutlined />}
                            >
                                {" "}
                                Create Users
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-[15px] py-[15px]" span={24}>
                            {users.length > 0 && (
                                <Table columns={columns} dataSource={users} />
                            )}{" "}
                            {users.length === 0 && (
                                <div className="text-center">
                                    <Result status="404" title="No Users Found" />
                                </div>
                            )}
                        </Col>
                    </Row>
                </>
            </div>
        </Layout.Content>
    );
};

export default Users;
