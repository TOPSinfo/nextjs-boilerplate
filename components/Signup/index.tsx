import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Checkbox,
    Col,
    Form,
    Input,
    Radio,
    Row,
    Select,
    Typography,
} from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/router";
import { signupRequest } from "@/redux/actions/signup.action";
const { Option } = Select;
type User = {
    email: string;
    password: string;
    username: string;
    phone: string;
    gender: string;
    cnfPassword: string;
    agreement: boolean;
};
// for validation purposes in test cases
export const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (regex.test(email)) {
        return true;
    }
    return false;
};
const Signup: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const signupData = useSelector(
        (state: RootState) => state.signupReducer || {}
    );
    const [signupData, setSignupData] = useState("")

    // phone number prefix selector
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="91">+91</Option>
                <Option value="1">+1</Option>
            </Select>
        </Form.Item>
    );

    // Form Item layout for the agreement checkbox
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
        },
    };

    useEffect(() => {
        console.log("signupData", signupData);
        if (signupData?.user) {
            router.push("/");
        }
    }, [router, signupData]);

    const handleSubmit = (values: User) => {
        console.log(values, "test@gmail.com");
        // router.push("/");
        // call login request method from action file
        dispatch(signupRequest(values));
    };
    return (
        <div className="bg-[url('/images/background.jpg')] h-screen overflow-y-auto 2xl:pt-0 pt-[180px] flex items-center justify-center my-[0px] mx-auto">
            <Card
                className="font-poppins my-[20px] w-[100%] max-w-[500px]"
                bordered={false}
            >
                <div className="my-4">
                    <div className="text-center">
                        <Typography className="text-[24px] font-[600]">
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
                        initialValues={{ prefix: "91" }}
                        onFinish={handleSubmit}
                        autoComplete="off"
                    >
                        <Row>
                            <Col xs={24}>
                                <p className="text-[14px] font-poppins text-left font-[400]">
                                    Username{" "}
                                    <span className="text-red-600">*</span>
                                </p>
                                <Form.Item<User>
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Username is required",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter Username" />
                                </Form.Item>
                            </Col>
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
                                    <Input placeholder="Enter Email" />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <p className="text-[14px] font-poppins text-left font-[400]">
                                    Phone Number{" "}
                                    <span className="text-red-600">*</span>
                                </p>
                                <Form.Item<User>
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Phone number is required",
                                        },
                                    ]}
                                >
                                    <Input
                                        addonBefore={prefixSelector}
                                        placeholder="Enter Phone Number"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
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
                                <p className="text-[14px] mt-[10px] font-poppins text-left font-[400]">
                                    Password{" "}
                                    <span className="text-red-600">*</span>
                                </p>
                                <Form.Item<User>
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Password is required",
                                        },
                                        {
                                            min: 8,
                                            message:
                                                "Password must have a minimum length of 8",
                                        },
                                        {
                                            pattern: new RegExp(
                                                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
                                            ),
                                            message:
                                                "Password must contain at least one lowercase letter, uppercase letter, number, and special character",
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <p className="text-[14px] mt-[10px] font-poppins text-left font-[400]">
                                    Confirm Password{" "}
                                    <span className="text-red-600">*</span>
                                </p>
                                <Form.Item<User>
                                    name="cnfPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Confirm Password is required",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        "password"
                                                    ) === value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "Confirm Password did not matched!"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Confirm Password" />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item
                                    name="agreement"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value
                                                    ? Promise.resolve()
                                                    : Promise.reject(
                                                          new Error(
                                                              "You have to accept the agreement"
                                                          )
                                                      ),
                                        },
                                    ]}
                                    {...tailFormItemLayout}
                                >
                                    <Checkbox>
                                        I have read the Agreement of Terms &
                                        Policies
                                    </Checkbox>
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        data-testid="form"
                                        className="mt-[15px] font-[600] w-[100%] bg-[#3e79f7] hover:bg-[#fff] text-[#fff] text-[14px]"
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
