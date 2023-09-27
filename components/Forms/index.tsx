import {
    Button,
    Card,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    Layout,
    Radio,
    Row,
    Select,
    Typography,
} from "antd";
import moment from "moment";
import React from "react";
const { Option } = Select;
const { TextArea } = Input;
// type of user
type User = {
    email: string;
    password: string;
    username: string;
    phone: string;
    address: string;
    technology: string[];
    birth_date: any | string;
    gender: string;
    skills: string[];
    cnfPassword: string;
    agreement: boolean;
};
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
// submit values
const handleSubmit = (values: User) => {
    const data = {
        ...values,
        birth_date: values["birth_date"].format("YYYY-MM-DD"),
    };
    console.log("values: ", data);
};
// example of all type of fields
const Forms: React.FC = () => {
    return (
        <>
            <Layout.Content
                data-testid="forms-component"
                className="bg-[#F0F2F5] pl-[200px] overflow-hidden"
            >
                <div className="bg-[#F0F2F5]">
                    <>
                        <Row>
                            <Col className="px-[15px] py-[15px]" span={24}>
                                <Typography.Title level={3}>
                                    Forms
                                </Typography.Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col
                                className="px-[15px] flex justify-center py-[15px]"
                                span={24}
                            >
                                <Card className="max-w-[450px]">
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
                                                    <span className="text-red-600">
                                                        *
                                                    </span>
                                                </p>
                                                <Form.Item<User>
                                                    name="username"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Username is required",
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Enter Username" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24}>
                                                <p className="text-[14px] font-poppins text-left font-[400]">
                                                    Email{" "}
                                                    <span className="text-red-600">
                                                        *
                                                    </span>
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
                                                            message:
                                                                "Email is required",
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Enter Email" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24}>
                                                <p className="text-[14px] font-poppins text-left font-[400]">
                                                    Phone Number{" "}
                                                    <span className="text-red-600">
                                                        *
                                                    </span>
                                                </p>
                                                <Form.Item<User>
                                                    name="phone"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Phone number is required",
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        addonBefore={
                                                            prefixSelector
                                                        }
                                                        placeholder="Enter Phone Number"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24}>
                                                <p className="text-[14px] font-poppins text-left font-[400]">
                                                    Address{" "}
                                                    <span className="text-red-600">
                                                        *
                                                    </span>
                                                </p>
                                                <Form.Item<User>
                                                    name="address"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Address is required",
                                                        },
                                                    ]}
                                                >
                                                    <TextArea
                                                        placeholder="Enter Address"
                                                        rows={4}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24}>
                                                <p className="text-[14px] font-poppins text-left font-[400]">
                                                    Gender{" "}
                                                    <span className="text-red-600">
                                                        *
                                                    </span>
                                                </p>
                                                <Form.Item<User>
                                                    name="gender"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Gender is required",
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group>
                                                        <Radio value="female">
                                                            {" "}
                                                            Female{" "}
                                                        </Radio>
                                                        <Radio value="male">
                                                            {" "}
                                                            Male{" "}
                                                        </Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24}>
                                                <p className="text-[14px] font-poppins text-left font-[400]">
                                                   Technology Stack {" "}
                                                </p>
                                                <Form.Item<User> name="technology">
                                                    <Select
                                                        mode="multiple"
                                                        data-testid="select-multiple"
                                                        placeholder="Please select technology"
                                                    >
                                                        <Option data-testid="val1" value="mern">
                                                            MERN STACK
                                                        </Option>
                                                        <Option data-testid="val2" value="mean">
                                                            MEAN STACK
                                                        </Option>
                                                        <Option data-testid="val3" value="full_stack">
                                                            FULL STACK
                                                        </Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24}>
                                                <p className="text-[14px] font-poppins text-left font-[400]">
                                                    Birth Date{" "}
                                                </p>
                                                <Form.Item<User> name="birth_date">
                                                    <DatePicker
                                                        format="YYYY-MM-DD"
                                                        disabledDate={current => {
                                                            let customDate =
                                                                moment().format(
                                                                    "YYYY-MM-DD"
                                                                );
                                                            return (
                                                                current &&
                                                                current >
                                                                    moment(
                                                                        customDate,
                                                                        "YYYY-MM-DD"
                                                                    )
                                                            );
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24}>
                                                <p className="text-[14px] mt-[10px] font-poppins text-left font-[400]">
                                                    Skills{" "}
                                                </p>
                                                <Form.Item<User> name="skills">
                                                    <Checkbox.Group>
                                                        <Row>
                                                            <Col span={8}>
                                                                <Checkbox
                                                                    value="React JS"
                                                                    style={{
                                                                        lineHeight:
                                                                            "32px",
                                                                    }}
                                                                >
                                                                    React JS
                                                                </Checkbox>
                                                            </Col>
                                                            <Col span={8}>
                                                                <Checkbox
                                                                    value="Node JS"
                                                                    style={{
                                                                        lineHeight:
                                                                            "32px",
                                                                    }}
                                                                >
                                                                    Node JS
                                                                </Checkbox>
                                                            </Col>
                                                            <Col span={8}>
                                                                <Checkbox
                                                                    value="Angular"
                                                                    style={{
                                                                        lineHeight:
                                                                            "32px",
                                                                    }}
                                                                >
                                                                    Angular
                                                                </Checkbox>
                                                            </Col>
                                                            <Col span={8}>
                                                                <Checkbox
                                                                    value="React Native"
                                                                    style={{
                                                                        lineHeight:
                                                                            "32px",
                                                                    }}
                                                                >
                                                                    React Native
                                                                </Checkbox>
                                                            </Col>
                                                            <Col span={8}>
                                                                <Checkbox
                                                                    value="MongoDB"
                                                                    style={{
                                                                        lineHeight:
                                                                            "32px",
                                                                    }}
                                                                >
                                                                    MongoDB
                                                                </Checkbox>
                                                            </Col>
                                                            <Col span={8}>
                                                                <Checkbox
                                                                    value="Next JS"
                                                                    style={{
                                                                        lineHeight:
                                                                            "32px",
                                                                    }}
                                                                >
                                                                    Next JS
                                                                </Checkbox>
                                                            </Col>
                                                        </Row>
                                                    </Checkbox.Group>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24}>
                                                <p className="text-[14px] mt-[10px] font-poppins text-left font-[400]">
                                                    Password{" "}
                                                    <span className="text-red-600">
                                                        *
                                                    </span>
                                                </p>
                                                <Form.Item<User>
                                                    name="password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Password is required",
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
                                                    <span className="text-red-600">
                                                        *
                                                    </span>
                                                </p>
                                                <Form.Item<User>
                                                    name="cnfPassword"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Confirm Password is required",
                                                        },
                                                        ({
                                                            getFieldValue,
                                                        }) => ({
                                                            validator(
                                                                _,
                                                                value
                                                            ) {
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
                                                            validator: (
                                                                _,
                                                                value
                                                            ) =>
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
                                                        I have read the
                                                        Agreement of Terms &
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
                                                        Submit
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    </>
                </div>
            </Layout.Content>
        </>
    );
};

export default Forms;
