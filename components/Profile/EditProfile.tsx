import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    Radio,
    Row,
    Typography,
} from "antd";
import moment from "moment";
import React from "react";
const { TextArea } = Input;

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
    console.log(formData);
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const data = {
                ...values,
                birth_date: values["birth_date"]?.format("YYYY-MM-DD"),
            };
            onSubmit(data);
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

                    <Col xs={24} md={12}>
                        <Typography>Birth Date</Typography>
                        <Form.Item<User>
                            name="birth_date"
                            rules={[
                                {
                                    required: true,
                                    message: "Birth Date is required",
                                },
                            ]}
                        >
                            <DatePicker
                                format="YYYY-MM-DD"
                                disabledDate={current => {
                                    const customDate =
                                        moment().format("YYYY-MM-DD");
                                    return (
                                        current &&
                                        current >
                                            moment(customDate, "YYYY-MM-DD")
                                    );
                                }}
                            />
                        </Form.Item>
                    </Col>

                    <Col className="pr-[10px]" xs={24} md={12}>
                        {" "}
                        <Typography>Gender</Typography>{" "}
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

                    <Col className="pr-[10px]" xs={24} md={12}>
                        <Typography>Address</Typography>
                        <Form.Item
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Address is required",
                                },
                            ]}
                        >
                            <TextArea
                                className="font-poppins"
                                placeholder="Enter Address"
                                rows={4}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        {" "}
                        <Typography>City</Typography>{" "}
                        <Form.Item
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: "City is required",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col className="pr-[10px]" xs={24} md={12}>
                        <Typography>State</Typography>
                        <Form.Item
                            name="state"
                            rules={[
                                {
                                    required: true,
                                    message: "State is required",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col className="pr-[10px]" xs={24} md={12}>
                        {" "}
                        <Typography>Zip</Typography>{" "}
                        <Form.Item
                            name="zip"
                            rules={[
                                {
                                    required: true,
                                    message: "Zip is required",
                                },
                                {
                                    pattern: /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
                                    message: "Only numbers are allowed",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Button
                            className="bg-[#3e79f7] hover:text-[#3e79f7] hover:bg-[#fff] text-[#fff] "
                            type="primary"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </Col>
                </Row>
                {/* Add other form fields here */}
            </Form>
        </Card>
    );
};
export default EditProfile;
