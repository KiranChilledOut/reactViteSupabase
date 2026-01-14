import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/users";




function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values: any) => {
        try {
            setLoading(true)
            const response: any = await registerUser(values)
            if(!response.success){
                throw new Error(response.error.message);
            }
            messageApi.open({
                type: "success",
                content: "Registration successful. Please check your Email to verify!",
                duration: 2,
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
                Register
            </h1>
            <p className="text-sm font-semibold text-gray-500 mb-5">
                Create an account to get started
            </p>
            <hr className="border-gray-300 my-5" />
            <Form onFinish={onFinish} layout="vertical" className="flex flex-col gap-5" autoComplete="off">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{
                        required: true,
                        message: 'Please input your name'
                    }]}>
                    <Input placeholder="Full Name" />

                </Form.Item>
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
                <Button htmlType="submit" block type="primary" className="mb-3" loading={loading} disabled={loading}>
                    Register
                </Button>
                <span className="text-sm font-semibold ">
                    Already have an account?{" "} <Link to='/login'>Login</Link>
                </span>
            </Form>
        </div>
    </div>
}

export default RegisterPage
