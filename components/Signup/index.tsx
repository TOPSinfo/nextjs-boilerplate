import React, { useEffect } from "react";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import Link from "next/link";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "@/redux/actions/login.action";
import { RootState } from "../../redux/store";
type User = {
    email: string;
    password: string;
};

export const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (regex.test(email)) {
        return true;
    }
    return false;
};
const Signup: React.FC = () => {
    const dispatch = useDispatch();
    const loginData = useSelector((state: RootState) => state.loginReducer);
    useEffect(() => {
        console.log("isLoggedIn", loginData?.isLoggedIn, loginData?.error);
        if (loginData?.error) {
            toast.error(loginData?.error);
        } else if (loginData?.isLoggedIn) {
            // show sucess message after login
            toast.success("Login Successfully");
        }
    }, [loginData]);

    const handleSubmit = (values: { email: string; password: string }) => {
        console.log(values, "test@gmail.com");
        // toast.success("Login Successfully");
        // call login request method from action file
        dispatch(loginRequest(values.email, values.password));
    };
    return (
        <div className=" h-screen bg-[url('/images/background.jpg')] flex items-center justify-center my-[0px] mx-auto">
            <Card
                className="font-poppins w-[100%] max-w-[500px]"
                bordered={false}
            >
                <div className="my-4">
                    <div className="text-center">
                        <Typography className="text-[24px] font-[500]">
                            Signup
                        </Typography>
                        <Typography className="text-[16px] my-[10px] font-[400]">
                           Already have an account?{" "}
                            <Link className="text-[#3e79f7]" href={"/"}>
                                Sign In
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
                                    Email
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
                                    Password
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
                                        className="mt-[15px] w-[100%] bg-[#3e79f7] hover:bg-[#fff] text-[#fff] text-[14px]"
                                    >
                                        Sign Up
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Card>
        </div>
    );
};

export default Signup;
