import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/users";


function LoginPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        try {
            setLoading(true)
            const response: any = await loginUser(values)
            if (!response.success) {
                throw new Error(response.error.message);
            }
            messageApi.open({
                type: "success",
                content: "Login Succesful",
                duration: 2,
                onClose: () => navigate("/"),
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
                Login
            </h1>
            <p className="text-sm font-semibold text-gray-500 mb-5">
                Welcome ! Enter Credentials to Login
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
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Password'
                    }]}>
                    <Input.Password placeholder="Strong Password" />

                </Form.Item>
                <Button htmlType="submit" block type="primary" className="" loading={loading} disabled={loading}>
                    Login
                </Button>
                <span className="text-sm font-semibold ">
                    Don't have an account?{" "} <Link to='/register'>Register</Link>
                </span>
                <span className="text-sm font-semibold ">
                    Forgot Password? <Link to='/forgot-password'>Reset</Link>
                </span>
            </Form>
        </div>
    </div>
}

export default LoginPage
