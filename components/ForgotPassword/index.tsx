import React from "react";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { forgotRequest } from "@/redux/actions/forgot.action";
type User = {
    email: string;
};
// regex for validation of email
export const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (regex.test(email)) {
        return true;
    }
    return false;
};
const ForgotPassword: React.FC = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values: { email: string }) => {
        console.log(values, "test@gmail.com");
        // call login request method from action file
        dispatch(forgotRequest(values.email));
    };
    return (
        <div className=" h-screen bg-[url('/images/background.jpg')] flex items-center justify-center my-[0px] mx-auto">
            <Card
                className="font-poppins w-[100%] max-w-[500px]"
                bordered={false}
            >
                <div className="my-4">
                    <div className="text-center">
                        <Typography className="text-[24px] font-[600]">
                            Forgot Password?
                        </Typography>
                    </div>
                    <Form
                        name="basic"
                        aria-label="basic"
                        onFinish={handleSubmit}
                        autoComplete="off"
                    >
                        <Row>
                            <Col xs={24}>
                                <p className="text-[14px] font-poppins text-left font-[400]">
                                    Email{" "}
                                    <span className="text-red-600">*</span>
                                </p>
                                <Form.Item<User>
                                    name="email"
                                    rules={[
                                        {
                                            type: "email",
                                            message:
                                                "Please provide valid email!",
                                        },
                                        {
                                            required: true,
                                            message: "Email is required",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter email" />
                                </Form.Item>
                            </Col>

                            <Col xs={24}>
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        className="mt-[15px] font-[600] w-[100%] bg-[#3e79f7] hover:bg-[#fff] text-[#fff] text-[14px]"
                                    >
                                        Send
                                    </Button>
                                    <Typography className="text-[14px] text-center my-[10px] font-[400]">
                                        <Link
                                            className="text-[#4980FF]"
                                            href={"/"}
                                        >
                                            Back to Sign In
                                        </Link>
                                    </Typography>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Card>
        </div>
    );
};

export default ForgotPassword;
