import React from "react";
import Head from "next/head";
import { Button, Col, Row, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

const Custom404: React.FC = () => {
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>404</title>
                {/* Add other meta tags here */}
            </Head>

            <div className="h-screen bg-white">
                <div className="flex justify-between items-center h-[100%] px-8 pb-4 pt-1">
                    <div className="container mx-auto">
                        <Row>
                            <Col xs={24} sm={24} md={12}>
                                <Typography className="font-poppins text-[#1a3353] font-bold text-[48px] mb-4 display-4">
                                    {" "}
                                    Page not Found{" "}
                                </Typography>
                                <Typography className="text-[18px] text-[#72849a] mb-4">
                                    We`ve noticed you lost your way, no worries,
                                    we will help you to found the correct path.
                                </Typography>
                                <Button
                                    onClick={() => router.back()}
                                    className="bg-[#3e79f7] text-[16px] text-[#fff] hover:text-[#3e79f7] hover:border-[#3e79f7]  hover:bg-[#fff] w-[130px] h-[50px]"
                                >
                                    {" "}
                                    Go Back{" "}
                                </Button>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <Image
                                    src={"/images/404.png"}
                                    alt="404"
                                    width={450}
                                    height={450}
                                    priority
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Custom404;
