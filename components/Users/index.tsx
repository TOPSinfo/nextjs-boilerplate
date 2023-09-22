import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Dropdown,
    Layout,
    Pagination,
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
import UserModal from "./UserModal";

type User = {};
type UserModalState = {
    id: string;
    firstName: string;
    email: string;
    phone: string;
    age: number;
};

const Users: React.FC = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.userReducer);
    const isLoading = useSelector(
        (state: RootState) => state.loaderReducer.loading
    );
    const [users, setUsers] = useState<User[] | []>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [editUser, setEditUser] = useState<UserModalState | {}>({});
    const handleEdit = () => {
        setIsEdit(true);
        setOpen(!open);
    };
    const handleCreate = () => {
        setOpen(!open);
        setIsEdit(false);
        setEditUser({});
    };

    useEffect(() => {
        if (userData) {
            setUsers(userData?.users);
        }
    }, [userData]);

    useEffect(() => {
        dispatch(fetchUsersRequest());
    }, [dispatch]);
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
                <div onClick={handleEdit}>
                    <EditFilled className="pr-[10px]" /> Edit
                </div>
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
                        <MoreOutlined
                            onClick={() => setEditUser(record)}
                            className="text-[24px] cursor-pointer"
                        />
                    </Space>
                </Dropdown>
            ),
        },
    ];

    return (
        <Layout.Content
            data-testid="users-component"
            className="bg-[#F0F2F5] pl-[200px] overflow-hidden"
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
                                onClick={handleCreate}
                            >
                                {" "}
                                Create Users
                            </Button>
                        </Col>
                    </Row>
                    {isLoading && <Loader />}
                    <Row>
                        <Col className="px-[15px] py-[15px]" span={24}>
                            {users.length > 0 && (
                                <>
                                    <Table
                                        columns={columns}
                                        pagination={false}
                                        dataSource={users}
                                    />
                                </>
                            )}{" "}
                            {userData && (
                                <Pagination
                                    className="text-right mt-[20px]"
                                    pageSize={userData?.limit}
                                    total={userData?.total}
                                    showSizeChanger={false}
                                    // add onchange for the get all data a/c to pagination
                                />
                            )}
                            {users.length === 0 && (
                                <div className="text-center">
                                    <Result
                                        status="404"
                                        title="No Users Found"
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>
                    <UserModal
                        open={open}
                        setOpen={setOpen}
                        userToEdit={editUser}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                    />
                </>
            </div>
        </Layout.Content>
    );
};

export default Users;
