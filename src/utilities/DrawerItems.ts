import { DrawerItem, Role } from '@/types/general';
import { FiSettings, FiUsers, FiGrid } from 'react-icons/fi';

export const drawerItems = (role: Role): DrawerItem[] => {
    const roleMenus: DrawerItem[] = [];

    // Default menu items available for all roles
    const defaultMenus: DrawerItem[] = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: FiSettings
        },
    ];

    // Admin-specific menu items
    if (role === "admin")
    {
        roleMenus.push(
            {
                title: "User Management",
                path: "/admin/user-management",
                icon: FiUsers
            },
            {
                title: "Trip Management",
                path: "/admin/trip-management",
                icon: FiGrid
            }
        );
    }

    // Combine default and role-specific menu items
    return [...roleMenus, ...defaultMenus];
};
