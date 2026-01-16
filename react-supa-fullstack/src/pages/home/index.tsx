import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLoggedInUser } from "../../services/users"
import { Button, message, Spin } from "antd"
import supabaseConfig from "../../config/supabase-config"



function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const onLogout = async () => {
    try {
      const logoutResponse = await supabaseConfig.auth.signOut();
      if (logoutResponse.error) {
        throw new Error(logoutResponse.error.message);
      }
      messageApi.open({
        type: "success",
        content: "Logout Succesful",
        duration: 2,
        onClose: () => navigate("/login"),
      });
    } catch (error: any) {
      messageApi.error(error.message || "Something went wrong during logout");
    }
  }
  const getUSer = async () => {
    try {
      setLoading(true);
      const response = await getLoggedInUser();
      setUser(response.data);
    } catch (error: any) {
      messageApi.error(error.message || "Please login to continue");
      navigate('/login');
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUSer();
  }, []);


  return (
    <div className="p-5 flex flex-col gap-5">
      {contextHolder}
      <h1>Home</h1>
      {loading && (
        <div className="flex justify-center items-center h-96">
          <Spin size="large" />
        </div>
      )}
      {user && (
        <div>
          <h2 className="text-lg font-semibold">Welcome, {user.id}!</h2>
          <p className="text-gray-600">User Name: {user.name}</p>
          <p className="text-gray-600">Email: {user.email}</p>
          <Button type="primary" onClick={onLogout}>Logout</Button>
        </div>
      )}
    </div>
  )

}
export default HomePage;