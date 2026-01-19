import { useState } from "react"
import { Menu } from "lucide-react"
import userGlobalStore, { type IUserGlobalStore } from "../global-store/user-store";
import Sidebar from "./sidebar";


function Header() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const userStore = userGlobalStore();
    const {user} = userStore as IUserGlobalStore;
    return (
        <div className="bg-black p-5 flex justify-between items-center">
            <h1 className="text-xl text-white font-bold">React Supabase</h1>
            <div className="flex items-center gap-5">
                <span className="text-sm text-white font-semibold">
                    {user?.name}
                </span>
                <Menu
                    className="text-white cursor-pointer"
                    onClick={() => setOpenSidebar(!openSidebar)}
                    size={15}
                />
            </div>
            {openSidebar && (
                <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            )}
        </div>
    )
}

export default Header