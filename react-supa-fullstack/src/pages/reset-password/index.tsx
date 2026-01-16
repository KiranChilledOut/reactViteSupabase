import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import supabaseConfig from "../../config/supabase-config";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        try {
            if (values.password !== values.confirmPassword) {
                messageApi.error("Passwords do not match");
                return;
            }

            setLoading(true)
            const response = await supabaseConfig.auth.updateUser({
                password: values.password,
            });
            if (response.error) {
                throw new Error(response.error.message);
            }
            await supabaseConfig.auth.signOut();
            messageApi.open({
                type: "success",
                content: "Password reset successful. Please login with your new password.",
                duration: 3,
                onClose: () => navigate("/login"),
            });

        } catch (error: any) {
            messageApi.error(error.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    };
    return <div className="bg-gray-200 h-screen flex justify-center items-center">
        {contextHolder}
        <div className="bg-white border border-gray-300 shadow-sm p-5 rounded w-105 ">
            <h1 className="text-xl font-bold">
                Reset Password
            </h1>
            <p className="text-sm font-semibold text-gray-500 mb-5">
                Enter your Password to Reset
            </p>
            <hr className="border-gray-300 my-5" />
            <Form onFinish={onFinish} layout="vertical" className="flex flex-col gap-5" autoComplete="off">

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Password'
                    }]}>
                    <Input.Password placeholder="Strong Password" />

                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[{
                        required: true,
                        message: 'Password'
                    }]}>
                    <Input.Password placeholder="Confirm Password" />

                </Form.Item>
                <Button htmlType="submit" block type="primary" className="" loading={loading} disabled={loading}>
                    Reset Password
                </Button>
            </Form>
        </div>
    </div>
}

export default ResetPassword
