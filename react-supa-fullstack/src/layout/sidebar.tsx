import { Drawer } from "antd"
import { Home, User2, List, LogOut } from "lucide-react";

function Sidebar({ openSidebar, setOpenSidebar }: { openSidebar: boolean, setOpenSidebar: (open: boolean) => void }) {
    const menuItems = [
        {
            name: "Home",
            icon: <Home />,
            path: "/"
        },
        {
            name: "Profile",
            icon: <User2 />,
            path: "/profile"
        },
        {
            name: "Transactions",
            icon: <List />,
            path: "/list"
        }
    ];
    return (
        <Drawer
            open={openSidebar}
            onClose={() => setOpenSidebar(false)}
            closable
        >sidebar
        </Drawer>
    )
}

export default Sidebar