import Header from "./header";
import { useNavigate } from "react-router-dom"
import { getLoggedInUser } from "../services/users";
import type { ReactNode } from "react";
import { useState, useEffect} from "react";
import { message, Spin } from "antd";
import useUserStore from "../global-store/user-store";


function PrivateLayout({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);

    const getUser = async () => {
        try {
            setLoading(true);
            const response: any = await getLoggedInUser();
            if (!response.success) {
                throw new Error(response.error.message);
            }
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
        getUser();
    }, []);

    return (
        <div>
            {contextHolder}
            <Header />
            {loading &&(
             <div className="flex justify-center items-center h-96">
                <Spin  />
            </div> 
            )}
            {!loading && <div className="p-5">{children}</div>}
        </div>
    );
}
export default PrivateLayout;
