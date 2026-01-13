import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

function RegisterPage() {
    const onFinish = (values: any) => { console.log("Received Form Values",values); };
    return <div className="bg-gray-200 h-screen flex justify-center items-center">
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
                    <Input.Password placeholder="Email ID" />

                </Form.Item>
                <Button htmlType="submit" block type="primary" className="mb-3">
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