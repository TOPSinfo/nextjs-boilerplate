import React, { useCallback, useEffect, useState } from "react";
import {
    Button,
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
import {
    deleteUserRequest,
    fetchUsersRequest,
} from "@/redux/actions/user.action";
import UserModal from "./UserModal";
import swal from "sweetalert";
import { useRouter } from "next/router";

interface UserListProps {
    fetchUsers?: () => Promise<any[]>; // Define the prop type
}
type User = {};
type UserModalState = {
    id: string;
    firstName: string;
    email: string;
    phone: string;
    age: number;
};

const Users: React.FC<UserListProps> = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const userData = useSelector((state: RootState) => state.userReducer);
    const isLoading = useSelector(
        (state: RootState) => state.loaderReducer.loading
    );
    const [users, setUsers] = useState<User[] | []>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [id, setID] = useState<string>("");
    const [editUser, setEditUser] = useState<UserModalState | {}>({});

    // open the edit modal
    const handleEdit = () => {
        setIsEdit(true);
        setOpen(!open);
    };
    // open the add modal
    const handleCreate = () => {
        setOpen(!open);
        setIsEdit(false);
        setEditUser({});
    };

    // set the users list
    useEffect(() => {
        if (userData) {
            setUsers(userData?.users);
        }
    }, [userData]);

    // fetch the user data
    useEffect(() => {
        dispatch(fetchUsersRequest());
    }, [dispatch]);

    //delete the user
    const handleDelete = useCallback(() => {
        swal({
            title: "Are you sure you want to delete this user?",
            icon: "warning",
            buttons: [true, true],
            dangerMode: true,
        }).then(willDelete => {
            if (willDelete) {
                dispatch(deleteUserRequest(id));
            }
        });
    }, [dispatch, id]);

    // user actions
    const items: MenuProps["items"] = [
        {
            label: (
                <div onClick={() => router.push(`/users/${id}`)}>
                    <EyeOutlined className="pr-[10px]" /> View
                </div>
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
                <div onClick={handleDelete}>
                    <DeleteOutlined className="pr-[10px]" /> Delete
                </div>
            ),
            key: "delete",
        },
    ];
    // table header
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
            render: (_, record: any) => (
                <Dropdown
                    align={{ offset: [-90, -80] }}
                    menu={{ items }}
                    trigger={["click"]}
                >
                    <Space size="middle">
                        <MoreOutlined
                            onClick={() => {
                                setEditUser(record);
                                setID(record.id);
                            }}
                            className="text-[24px] cursor-pointer"
                        />
                    </Space>
                </Dropdown>
            ),
        },
    ];

    return (
        <Layout.Content
            data-testid="users-component" /* add test id for test cases */
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
                                        rowKey={"id"}
                                    />
                                </>
                            )}{" "}
                            {/* add pagination for all users */}
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
                    {/* add common modal for add & edit users */}
                    {open && (
                        <UserModal
                            open={open}
                            id={id}
                            setOpen={setOpen}
                            userToEdit={editUser}
                            isEdit={isEdit}
                            setIsEdit={setIsEdit}
                            setEditUser={setEditUser}
                        />
                    )}
                </>
            </div>
        </Layout.Content>
    );
};

export default Users;
