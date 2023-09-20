import React from "react";
import { Card, Col, Layout, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loader from "../Loader";
import { Line } from "react-chartjs-2";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineController,
    LineElement,
} from "chart.js";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineController);
Chart.register(LineElement);

interface PieChartProps {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        borderColor: string;
    }[];
}
const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const resetData = useSelector((state: RootState) => state.resetReducer);
    const chartData: PieChartProps = {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
            {
                label: "Monthly Sales",
                data: [100, 150, 200, 250, 300],
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
            },
        ],
    };
    return (
        <Layout.Content className="bg-[#F0F2F5] overflow-hidden">
            <div className="bg-[#F0F2F5]">
                {resetData?.loading ? (
                    <Loader />
                ) : (
                    <>
                        <Row>
                            <Col
                                className="px-[8px] py-[8px]"
                                xs={24}
                                md={8}
                                lg={8}
                            >
                                <Card bordered>
                                    <Typography.Title level={5}>
                                        Revenue
                                    </Typography.Title>
                                    <Typography.Title
                                        className="!mt-[10px] !text-[#3e79f7]"
                                        level={3}
                                    >
                                        $260.25
                                    </Typography.Title>
                                </Card>
                            </Col>
                            <Col
                                className="px-[8px] py-[8px]"
                                xs={24}
                                md={8}
                                lg={8}
                            >
                                <Card bordered>
                                    <Typography.Title level={5}>
                                        Sales
                                    </Typography.Title>
                                    <Typography.Title
                                        className="!mt-[10px] !text-[#3e79f7]"
                                        level={3}
                                    >
                                        $230
                                    </Typography.Title>
                                </Card>
                            </Col>
                            <Col
                                className="px-[8px] py-[8px]"
                                xs={24}
                                md={8}
                                lg={8}
                            >
                                <Card bordered={true}>
                                    <Typography.Title level={5}>
                                        Costs
                                    </Typography.Title>
                                    <Typography.Title
                                        className="!mt-[10px] !text-[#3e79f7]"
                                        level={3}
                                    >
                                        $230
                                    </Typography.Title>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="px-[8px] py-[8px]" xs={24}>
                                {" "}
                                <Card bordered={true}>
                                    <Typography.Title level={4}>
                                        Unique Visitors
                                    </Typography.Title>
                                    <div
                                    // style={{ width: "300px", height: "300px" }}
                                    >
                                        <Line
                                            options={{
                                                maintainAspectRatio: false,
                                            }}
                                            data={chartData}
                                        />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="px-[8px] py-[8px]" xs={24}>
                                {" "}
                                <Card bordered={true}>
                                    <Typography.Title level={4}>
                                        Unique Visitors
                                    </Typography.Title>
                                    <div
                                    // style={{ width: "300px", height: "300px" }}
                                    >
                                        <Line
                                            options={{
                                                maintainAspectRatio: false,
                                            }}
                                            data={chartData}
                                        />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </Layout.Content>
    );
};

export default Dashboard;
