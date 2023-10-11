import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Layout, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Image from "next/image";
import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import EditProfile from "./EditProfile";
import {
    getProfileRequest,
    updateProfileRequest,
    uploadImageRequest,
} from "@/redux/actions/profile.action";
import dayjs from "dayjs";

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

type UserDocument = {
    user: {
        id: string | number;
        email: string;
        username: string;
    };
};

type Session = {
    data: UserDocument | null;
    status: string;
    update: () => void;
};

const Profile: React.FC = () => {
    const session: Session = useSession();
    const dispatch = useDispatch();
    const profileData = useSelector(
        (state: RootState) => state.getProfileReducer
    );
    const updateProfile = useSelector(
        (state: RootState) => state.updateProfileReducer
    );
    const profileImage = useSelector(
        (state: RootState) => state.updateImageReducer
    );
    const [editMode, setEditMode] = useState<boolean>(false);
    const [profile, setProfile] = useState<User | undefined>(undefined);
    const [profilePic, setProfilePic] = useState<string>("");
    const [formData, setFormData] = useState<User | undefined>(undefined);

    const handleEditMode = () => {
        setEditMode(!editMode);
    };
    const handleFormSubmit = useCallback((values: User) => {
        values._id = session?.data?.user?.id as string;
        // Submit the form data to update the user's profile
        console.log("Form data submitted:", values);
        dispatch(updateProfileRequest(values));
        setEditMode(!editMode); // Switch back to display mode after submitting
    }, []);

    useEffect(() => {
        if (session?.data) {
            dispatch(getProfileRequest(session?.data?.user?.id as string));
        }
    }, [session?.data]);

    useEffect(() => {
        console.log("profile request", profileData);
        if (profileData?.user) {
            setProfile(profileData?.user);
            if (session?.data) {
                session.data.user.email = profileData?.user?.email;
                session.data.user.username = profileData?.user?.username;
            }
            setFormData({
                ...profileData?.user,
                birth_date: profileData?.user.birth_date
                    ? dayjs(profileData?.user?.birth_date)
                    : undefined,
            });
            setProfilePic(profileData?.user?.profilePic);
        }
    }, [profileData]);

    useEffect(() => {
        console.log("update profile", updateProfile);
        if (updateProfile.user) {
            if (session?.data) {
                session.data.user.email = profileData?.user?.email;
                session.data.user.username = profileData?.user?.username;
            }
            session.update();
        }
    }, [updateProfile]);

    useEffect(() => {
        if (profileImage?.profile) {
            console.log("profileImageChanged", profileImage);
            setProfilePic(profileImage?.profile.imageUrl);
        }
    }, [profileImage?.profile]);

    const handleImageUpload = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                const profileImageData = {
                    profilePic: file,
                    _id: profile?._id as string,
                };

                // Perform an API request to upload the image and update the profilePic state
                // Replace 'uploadImageApi' with your actual API endpoint for uploading images
                dispatch(uploadImageRequest(profileImageData));
            }
        },
        [profilePic]
    );
    return (
        <Layout.Content className="bg-[#F0F2F5] pl-[80px] min-[992px]:pl-[200px] overflow-hidden overflow-hidden">
            <div className="bg-[#F0F2F5]">
                <Row>
                    <Col className="p-[25px]" xs={24}>
                        <div>
                            <Card
                                cover={
                                    <Image
                                        src="/images/profile-banner.png"
                                        className="relative"
                                        width={500}
                                        height={80}
                                        priority
                                        alt="background-image"
                                    />
                                }
                                bordered={true}
                            >
                                <div className="absolute bottom-[30px]">
                                    <Avatar
                                        className="w-[120px] h-[120px] relative"
                                        icon={
                                            <UserOutlined className="text-[50px] pt-[30px]" />
                                        }
                                        src={profilePic}
                                        alt="avatar"
                                    />
                                    <div>
                                        <div className="absolute cursor-pointer right-[4px] bg-[#3e79f7] rounded-3xl px-[10px] py-[7px] bottom-[10px]">
                                            <label
                                                className="cursor-pointer"
                                                htmlFor="profileID"
                                            >
                                                <CameraOutlined className="cursor-pointer text-[#fff]" />
                                            </label>
                                            <input
                                                type="file"
                                                id="profileID"
                                                accept="image/*"
                                                className="cursor-pointer"
                                                style={{ display: "none" }}
                                                onChange={handleImageUpload}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end items-center">
                                    {editMode ? (
                                        <Button
                                            className="bg-[#3e79f7] hover:text-[#3e79f7] hover:bg-[#fff] text-[#fff] "
                                            size="large"
                                            onClick={handleEditMode}
                                        >
                                            Cancel
                                        </Button>
                                    ) : (
                                        <Button
                                            className="bg-[#3e79f7] hover:text-[#3e79f7] hover:bg-[#fff] text-[#fff] "
                                            size="large"
                                            onClick={handleEditMode}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </div>
                            </Card>
                            {editMode ? (
                                <EditProfile
                                    formData={formData}
                                    onSubmit={handleFormSubmit}
                                />
                            ) : (
                                <Card>
                                    <Typography className="text-[22px] border-b mb-[20px] font-[800]">
                                        Update Your Information
                                    </Typography>
                                    <Row>
                                        <Col xs={24} md={12}>
                                            <Typography className="text-[18px] font-[600]">
                                                Username
                                            </Typography>
                                            <Typography>
                                                {profile?.username}
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Typography className="text-[18px] font-[600]">
                                                Email
                                            </Typography>
                                            <Typography>
                                                {profile?.email}
                                            </Typography>
                                        </Col>
                                    </Row>
                                    <Row className="mt-[20px]">
                                        <Col xs={24} md={12}>
                                            <Typography className="text-[18px] font-[600]">
                                                Birth Date
                                            </Typography>
                                            <Typography>
                                                {profile?.birth_date}
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Typography className="text-[18px] font-[600]">
                                                Gender
                                            </Typography>
                                            <Typography>
                                                {profile?.gender}
                                            </Typography>
                                        </Col>
                                    </Row>
                                    <Row className="mt-[20px]">
                                        <Col xs={24} md={12}>
                                            <Typography className="text-[18px] font-[600]">
                                                Address
                                            </Typography>
                                            <Typography>
                                                {profile?.address}
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Typography className="text-[18px] font-[600]">
                                                City
                                            </Typography>
                                            <Typography>
                                                {profile?.city}
                                            </Typography>
                                        </Col>
                                    </Row>
                                    <Row className="mt-[20px]">
                                        <Col xs={24} md={12}>
                                            <Typography className="text-[18px] font-[600]">
                                                State
                                            </Typography>
                                            <Typography>
                                                {profile?.state}
                                            </Typography>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Typography className="text-[18px] font-[600]">
                                                Zip
                                            </Typography>
                                            <Typography>
                                                {profile?.zip}
                                            </Typography>
                                        </Col>
                                    </Row>
                                </Card>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout.Content>
    );
};

export default Profile;
