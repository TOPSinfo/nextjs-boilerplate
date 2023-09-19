import React from "react";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loader from "../Loader";
import { resetRequest } from "@/redux/actions/reset.action";
type User = {
    cnfPassword: string;
    password: string;
};

const ResetPassword: React.FC = () => {
    const dispatch = useDispatch();
    const resetData = useSelector((state: RootState) => state.resetReducer);

    const handleSubmit = (values: {
        password: string;
        cnfPassword: string;
    }) => {
        console.log(values, "handleSubmit");
        // toast.success("Password update successfully");
        // call login request method from action file
        dispatch(resetRequest(values.password, values.cnfPassword));
    };
    return (
        <div className=" h-screen bg-[url('/images/background.jpg')] flex items-center justify-center my-[0px] mx-auto">
            {resetData?.loading ? (
                <Loader />
            ) : (
                <Card
                    className="font-poppins w-[100%] max-w-[500px]"
                    bordered={false}
                >
                    <div className="my-4">
                        <div className="text-center">
                            <Typography className="text-[24px] font-[600]">
                                Reset Password
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
                                    <p className="text-[14px] mt-[10px] font-poppins text-left font-[400]">
                                        New Password{" "}
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
                                        <Input.Password placeholder="Enter new password" />
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
                                        <Input.Password placeholder="Enter confirm password" />
                                    </Form.Item>
                                </Col>

                                <Col xs={24}>
                                    <Form.Item>
                                        <Button
                                            htmlType="submit"
                                            className="mt-[15px] font-[600] w-[100%] bg-[#3e79f7] hover:bg-[#fff] text-[#fff] text-[14px]"
                                        >
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default ResetPassword;
