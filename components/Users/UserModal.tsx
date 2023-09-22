import { useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";

interface User {
    id: string;
    firstName: string;
    email: string;
    phone: string;
    age: number;
}

interface UserModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    setIsEdit: (value: boolean) => void;
    isEdit: boolean;
    onSave?: (user: User) => void;
    userToEdit?: User | {};
}

const UserModal: React.FC<UserModalProps> = ({
    open,
    setOpen,
    onSave,
    userToEdit,
    isEdit,
    setIsEdit,
}) => {
    const [form] = Form.useForm();

    const [initialValue, setInitialValue] = useState<User | {}>({
        id: "",
        firstName: "",
        email: "",
        phone: "",
    });
    const handleCancel = () => {
        setOpen(!open);
        form.resetFields();
        setIsEdit(false);
    };
    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            // onSave(values);
            form.resetFields();
        } catch (error) {
            console.error("Validation error:", error);
        }
    };
    useEffect(() => {
        if (
            typeof userToEdit !== "undefined" &&
            Object.keys(userToEdit).length > 0
        ) {
            console.log("in iffffff", userToEdit);
            setInitialValue(userToEdit);
            form.setFieldsValue(userToEdit);
        } else {
            console.log("user", userToEdit);
            setInitialValue({});
            form.setFieldsValue({});
        }
    }, [form, open, userToEdit]);

    return (
        <Modal
            open={open}
            title={isEdit ? "Edit User" : "Add User"}
            onCancel={handleCancel}
            onOk={handleSave}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button
                    key="save"
                    className="bg-[#3e79f7] hover:text-[#3e79f7] hover:bg-[#fff] text-[#fff] "
                    type="primary"
                    onClick={handleSave}
                >
                    Save
                </Button>,
            ]}
        >
            <Form form={form} initialValues={initialValue} layout="vertical">
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        { required: true, message: "First Name is required" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Email is required" },
                        {
                            type: "email",
                            message: "Please enter a valid email",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Age" name="age">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                        { required: true, message: "Phone Number is required" },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserModal;
