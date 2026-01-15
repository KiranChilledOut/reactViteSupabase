import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabaseConfig from "../config/supabase-config";

function PublicLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        supabaseConfig.auth.getSession().then(({ data }) => {
            if (data.session && !location.pathname.includes('reset-password')) {
                navigate("/");
            }
        });
    }, [location]);
    return (
        <div>
            {children}
        </div>
    );
}
export default PublicLayout;