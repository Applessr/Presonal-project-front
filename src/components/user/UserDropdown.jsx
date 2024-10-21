import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "../UserAvatar";
import useAuthStore from "../../store/auth-store";
import { motion } from "framer-motion";
import useProgressStore from "../../store/progress-store";

const UserDropdown = () => {
    const navigate = useNavigate();

    const actionLogout = useAuthStore((state) => state.actionLogout);
    const user = useAuthStore((state) => state.user);
    const clearProgress = useProgressStore((state) => state.clearProgress);

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return 'Buenos días, ';
        } else if (hour < 18) {
            return 'Buenas tardes, ';
        } else {
            return 'Buenas noches, ';
        }

    };
    console.log(user)

    const hdlLogout = () => {
        actionLogout();
        clearProgress();
        navigate('/');
    };

    return (
        <div className="relative">
            <div className="dropdown">
                <motion.div
                    whileHover={{ scale: [null, 1.2, 1.1] }}
                    transition={{ duration: 0.3 }}
                    tabIndex={0} role="button" className="m-1">
                    <UserAvatar />
                </motion.div>
                <ul tabIndex={0} className="-ml-24 dropdown-content text-gray-700 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li>
                        <span className="active:bg-[#22A094] text-center block px-4 py-2 text-lg hover:bg-gray-100">
                            {greeting() + '' + (user.user?.username || "Guest")}
                        </span>
                    </li>
                    <li>
                        <Link
                            to="/user/user-favorite"
                            className=" block px-4 py-2 hover:bg-gray-100"
                        >
                            รายการโปรด
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/user/user-edit-profile"
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            การตั้งค่า
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={hdlLogout}
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            ออกจากระบบ
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserDropdown;