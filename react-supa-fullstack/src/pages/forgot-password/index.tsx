import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import supabaseConfig from "../../config/supabase-config";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        try {
            setLoading(true)
            const response = await supabaseConfig.auth.resetPasswordForEmail(values.email, {
                redirectTo: `${window.location.origin}/reset-password`
            });
            if (response.error) {
                throw new Error(response.error.message);
            }
            messageApi.open({
                type: "success",
                content: "Password reset email sent. Please check your inbox.",
                duration: 2,
            });
            navigate("/login");

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
                Forgot Password
            </h1>
            <p className="text-sm font-semibold text-gray-500 mb-5">
                Enter your email to receive a reset link
            </p>
            <hr className="border-gray-300 my-5" />
            <Form onFinish={onFinish} layout="vertical" className="flex flex-col gap-5" autoComplete="off">
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{
                        required: true,
                        message: 'Please input your Email address'
                    }]}>
                    <Input placeholder="Email ID" />

                </Form.Item>
                <Button htmlType="submit" block type="primary" className="" loading={loading} disabled={loading}>
                    Send Reset Link
                </Button>
            </Form>
        </div>
    </div>
}

export default ForgotPassword
