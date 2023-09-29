import React, { useEffect } from "react";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/router";
import { loginRequest } from "@/redux/actions/login.action";

type User = {
    email: string;
    password: string;
};
// regex for validating email in test cases
export const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (regex.test(email)) {
        return true;
    }
    return false;
};
const Login: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const loginData = useSelector((state: RootState) => state.loginReducer);
    useEffect(() => {
        console.log("isLoggedIn", loginData);
        if (loginData?.isLoggedIn) {
            // redirect to dashboard page after login
            router.push("/dashboard");
        }
    }, [loginData, router]);

    const handleSubmit = (values: { email: string; password: string }) => {
        console.log(values, "test@gmail.com");
        dispatch(loginRequest(values.email, values.password));
    };
    return (
        <div
            data-testid="login-component"
            className=" h-screen bg-[url('/images/background.jpg')] flex items-center justify-center my-[0px] mx-auto"
        >
            <Card
                className="font-poppins w-[100%] max-w-[500px]"
                bordered={false}
            >
                <div className="my-4">
                    <div className="text-center">
                        <Typography className="text-[24px] font-[600]">
                            Login
                        </Typography>
                        <Typography className="text-[16px] my-[10px] font-[400]">
                            Don`t have an account yet?{" "}
                            <Link className="text-[#3e79f7]" href={"/signup"}>
                                Sign Up
                            </Link>
                        </Typography>
                    </div>
                    <Form
                        name="basic"
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
                                <p className="text-[14px] mt-[10px] font-poppins text-left font-[400]">
                                    Password{" "}
                                    <span className="text-red-600">*</span>
                                </p>
                                <Form.Item<User>
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Password is required!",
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        className="mt-[15px] w-[100%] bg-[#3e79f7] hover:bg-[#fff] font-[600] text-[#fff] text-[14px]"
                                    >
                                        Sign In
                                    </Button>
                                    <Link
                                        className="text-[#3e79f7]"
                                        href="/forgot-password"
                                    >
                                        Forgot Password?
                                    </Link>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Card>
        </div>
    );
};

export default Login;
