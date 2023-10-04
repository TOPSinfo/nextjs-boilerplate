import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    Radio,
    Layout,
    Row,
    Col,
    Typography,
    Select,
    Card,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    createUserRequest,
    updateUserRequest,
    viewUsersRequest,
} from "@/redux/actions/user.action";
import { RootState } from "@/redux/store";
import type { UploadFile } from "antd/es/upload/interface";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

interface User {
    image: string;
    id: string;
    firstName: string;
    lastname: string;
    gender: string;
    email: string;
    phone: string;
    age: number | null;
}

const { Option } = Select;
interface CreateUserProps {
    edit?: boolean;
}
const CreateUsers: React.FC<CreateUserProps> = ({ edit }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const router = useRouter();

    const isLoading = useSelector(
        (state: RootState) => state.loaderReducer.loading
    );
    const userData = useSelector(
        (state: RootState) => state.viewUserReducer.user
    );

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    // form initialization
    const [initialValue, setInitialValue] = useState<User | object>({
        firstName: "",
        lastname: "",
        email: "",
        phone: "",
        gender: "",
        id: "",
        prefix: "+91",
    });
    const [id, setId] = useState<string | string[]>("");
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="+91">+91</Option>
                <Option value="+1">+1</Option>
            </Select>
        </Form.Item>
    );

    useEffect(() => {
        if (router?.query?.id) {
            dispatch(viewUsersRequest(router?.query?.id));
            setId(router?.query?.id);
        }
    }, [router]);

    useEffect(() => {
        const prefixData = userData?.phone.includes(" ")
            ? userData?.phone.split(" ")[0]
            : "";
        const phoneNumber = userData?.phone.includes(" ")
            ? userData?.phone.split(" ")[1]
            : userData?.phone;
        const userEditData = {
            firstName: userData?.firstName,
            lastname: userData?.lastname,
            email: userData?.email,
            phone: phoneNumber,
            gender: userData?.gender,
            id: userData?._id,
            prefix: prefixData,
        };
        setInitialValue(userEditData);
        form.setFieldsValue(userEditData);
    }, [userData]);

    // reset the form
    const handleCancel = () => {
        form.resetFields();
    };
    // saving the form
    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            values.phone = values.prefix.concat(" ", values.phone);
            console.log("values:", values, fileList, setFileList);
            if (edit) {
                values.id = id;
                dispatch(updateUserRequest(values));
            } else {
                dispatch(createUserRequest(values));
            }

            form.resetFields();
        } catch (error) {
            console.error("Validation error:", error);
        }
    };
    // set form data

    return (
        <Layout.Content
            data-testid="create-user-component" /* add test id for test cases */
            className="bg-[#F0F2F5] pl-[80px] min-[992px]:pl-[200px] overflow-hidden"
        >
            <div className="bg-[#F0F2F5]">
                <Row>
                    <Col
                        className="flex items-center px-[15px] py-[15px]"
                        span={12}
                    >
                        <ArrowLeftOutlined
                            onClick={() => router.push("/users")}
                            className="text-[#1D1D1E] cursor-pointer text-[20px] mr-[10px] pb-[10px]"
                        />
                        <Typography.Title level={3}>
                            {edit ? "Edit User" : "Create User"}
                        </Typography.Title>
                    </Col>
                </Row>
                <Card className="mx-[15px] my-[15px]">
                    <Form
                        preserve={false}
                        form={form}
                        autoComplete="off"
                        initialValues={initialValue as object}
                        layout="vertical"
                    >
                        <Row>
                            {/* <Form.Item<User>
                    rules={[{ required: true, message: "Image is required" }]}
                >
                    <>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            maxCount={1}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </>
                </Form.Item> */}
                            <Col className="pr-[15px]" xs={24} md={12}>
                                <p className="text-[14px] font-poppins text-left font-[400]">
                                    FirstName{" "}
                                    <span className="text-red-600">*</span>
                                </p>
                                <Form.Item<User>
                                    name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "First Name is required",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter FirstName" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <p className="text-[14px] font-poppins text-left font-[400]">
                                    Lastname{" "}
                                    <span className="text-red-600">*</span>
                                </p>
                                <Form.Item<User>
                                    name="lastname"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Last Name is required",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter Lastname" />
                                </Form.Item>
                            </Col>
                            <Col className="pr-[15px]" xs={24} md={12}>
                                <p className="text-[14px] font-poppins text-left font-[400]">
                                    Email{" "}
                                    <span className="text-red-600">*</span>
                                </p>
                                <Form.Item<User>
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Email is required",
                                        },
                                        {
                                            type: "email",
                                            message:
                                                "Please enter a valid email",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter Email" />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <p className="text-[14px] font-poppins text-left font-[400]">
                                    Phone Number{" "}
                                    <span className="text-red-600">*</span>
                                </p>
                                <Form.Item<User>
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Phone Number is required",
                                        },
                                    ]}
                                >
                                    <Input
                                        addonBefore={prefixSelector}
                                        placeholder="Enter Phone Number"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24}>
                                <p className="text-[14px] font-poppins text-left font-[400]">
                                    Gender{" "}
                                    <span className="text-red-600">*</span>
                                </p>
                                <Form.Item<User>
                                    name="gender"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Gender is required",
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value="female"> Female </Radio>
                                        <Radio value="male"> Male </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item>
                                    <div className="flex justify-end">
                                        <Button
                                            onClick={handleCancel}
                                            className="mt-[15px] mr-[20px] w-[150px] bg-[#ffffff] hover:bg-[#3e79f7] font-[600] text-[#3e79f7] hover:!text-[#ffffff] text-[14px]"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            loading={isLoading}
                                            onClick={handleSave}
                                            htmlType="submit"
                                            className="mt-[15px] w-[150px] bg-[#3e79f7] hover:bg-[#fff] font-[600] text-[#fff] text-[14px]"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        </Layout.Content>
    );
};

export default CreateUsers;
