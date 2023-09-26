import { Col, Layout, Row, Typography } from "antd";
import React from "react";

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
                            <Col className="px-[15px] py-[15px]" span={12}>
                                <Typography.Title level={3}>
                                    Forms
                                </Typography.Title>
                            </Col>
                            <Col
                                className="px-[15px] py-[15px] flex justify-end"
                                span={12}
                            ></Col>
                        </Row>

                        <Row>
                            <Col
                                className="px-[15px] py-[15px]"
                                span={24}
                            ></Col>
                        </Row>
                    </>
                </div>
            </Layout.Content>
        </>
    );
};

export default Forms;
