import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React from "react";

type User = {
    _id: string;
    username: string;
    email: string;
    birth_date: string;
    address: string;
    gender: string;
    state: string;
    city: string;
    zip: string;
    profilePic: string;
};

const EditProfile: React.FC<{
    formData: User | undefined;
    onSubmit: (values: User) => void;
}> = ({ formData, onSubmit }) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values);
        } catch (error) {
            console.error("Form validation failed:", error);
        }
    };

    return (
        <Card>
            <Form form={form} onFinish={handleSubmit} initialValues={formData}>
                <Row className="justify-between">
                    <Col className="pr-[10px]" xs={24} md={12}>
                        {" "}
                        <Typography>Username</Typography>{" "}
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Username is required",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Typography>Email</Typography>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Email is required",
                                },
                                {
                                    type: "email",
                                    message: "Please provide valid email",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                {/* Add other form fields here */}
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form>
        </Card>
    );
};
export default EditProfile;
