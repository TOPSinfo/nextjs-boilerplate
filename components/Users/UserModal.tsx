import { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    createUserRequest,
    updateUserRequest,
} from "@/redux/actions/user.action";
import { RootState } from "@/redux/store";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

interface User {
    image: string;
    id: string;
    firstName: string;
    email: string;
    phone: string;
    age: number | null;
}

interface UserModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    setIsEdit: (value: boolean) => void;
    isEdit: boolean;
    userToEdit?: User | {};
    setEditUser: (p: {}) => void;
    id: string;
}
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
const UserModal: React.FC<UserModalProps> = ({
    open,
    setOpen,
    userToEdit,
    isEdit,
    setIsEdit,
    setEditUser,
    id,
}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const isLoading = useSelector(
        (state: RootState) => state.loaderReducer.loading
    );
    const [previewImage, setPreviewImage] = useState<string | undefined>(
        undefined
    );
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    // form initialization
    const [initialValue, setInitialValue] = useState<User | {}>({
        firstName: "",
        email: "",
        phone: "",
        age: null,
        id: "",
        image: "",
    });

    // close the modal
    const handleCancel = () => {
        setOpen(!open);
        form.resetFields();
        setIsEdit(false);
        setInitialValue({
            firstName: "",
            email: "",
            phone: "",
            age: null,
            image: "",
            id: "",
        });
    };
    // saving the form
    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            console.log("values:", values, previewImage, fileList);
            values.image = fileList[0]?.thumbUrl
                ? fileList[0]?.thumbUrl
                : fileList[0]?.url;

            values.id = id;
            if (isEdit) {
                dispatch(updateUserRequest(values));
            } else {
                dispatch(createUserRequest(values));
            }
            setOpen(!open);
            form.resetFields();
        } catch (error) {
            console.error("Validation error:", error);
        }
    };
    // set form data
    useEffect(() => {
        if (
            typeof userToEdit !== "undefined" &&
            Object.keys(userToEdit).length > 0 &&
            isEdit
        ) {
            setInitialValue(userToEdit);
            setPreviewImage((userToEdit as User)?.image);
            setFileList([
                {
                    uid: (userToEdit as User).id,
                    name: (userToEdit as User).firstName,
                    url: (userToEdit as User).image,
                },
            ]);
            form.setFieldsValue(userToEdit);
        } else {
            setEditUser({});
            setInitialValue({
                firstName: "",
                email: "",
                phone: "",
                age: null,
                image: "",
                id: "",
            });
            form.setFieldsValue({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form, isEdit, open, setEditUser]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url ?? (file.preview as string));
    };

    const handleChange: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        setFileList(newFileList);
    };

    return (
        <Modal
            open={open}
            destroyOnClose={true}
            title={isEdit ? "Edit User" : "Add User"}
            onCancel={handleCancel}
            onOk={handleSave}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button
                    key="save"
                    loading={isLoading}
                    className="bg-[#3e79f7] hover:text-[#3e79f7] hover:bg-[#fff] text-[#fff] "
                    type="primary"
                    onClick={handleSave}
                >
                    Save
                </Button>,
            ]}
        >
            <Form
                preserve={false}
                form={form}
                autoComplete="off"
                initialValues={initialValue as {}}
                layout="vertical"
            >
                <Form.Item<User>
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
                </Form.Item>
                <p className="text-[14px] font-poppins text-left font-[400]">
                    FirstName <span className="text-red-600">*</span>
                </p>
                <Form.Item<User>
                    name="firstName"
                    rules={[
                        { required: true, message: "First Name is required" },
                    ]}
                >
                    <Input placeholder="Enter FirstName" />
                </Form.Item>
                <p className="text-[14px] font-poppins text-left font-[400]">
                    Email <span className="text-red-600">*</span>
                </p>
                <Form.Item<User>
                    name="email"
                    rules={[
                        { required: true, message: "Email is required" },
                        {
                            type: "email",
                            message: "Please enter a valid email",
                        },
                    ]}
                >
                    <Input placeholder="Enter Email" />
                </Form.Item>
                <p className="text-[14px] font-poppins text-left font-[400]">
                    Age
                </p>
                <Form.Item<User> name="age">
                    <Input placeholder="Enter Age" />
                </Form.Item>
                <p className="text-[14px] font-poppins text-left font-[400]">
                    Phone Number <span className="text-red-600">*</span>
                </p>
                <Form.Item<User>
                    name="phone"
                    rules={[
                        { required: true, message: "Phone Number is required" },
                    ]}
                >
                    <Input placeholder="Enter Phone Number" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserModal;
