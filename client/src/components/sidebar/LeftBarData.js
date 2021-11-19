import { Send, StarBorder } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import PaymentIcon from "@mui/icons-material/Payment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const LeftBarData = (currentRoute) => [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon />,
    selected: currentRoute === "/dashboard",
  },
  {
    id: 2,
    title: "Courses",
    path: "/courses",
    icon: <EditIcon />,
    open: currentRoute === "/courses" || currentRoute === "/courses",
    submenu: [
      {
        id: 3,
        title: "Add Course",
        path: "/courses/create",
        icon: <AddCircleIcon />,
        selected: currentRoute === "/courses/create",
      },
      {
        id: 3,
        title: "Manage Courses",
        path: "/managecourses",
        icon: <ManageAccountsIcon />,
        selected: currentRoute === "/managecourses",
      },
    ],
  },
  {
    id: 3,
    title: "Students",
    path: "/",
    icon: <SupervisorAccountIcon />,
    open: currentRoute === "/students" || currentRoute === "/addstudent",
    submenu: [
      {
        id: 3,
        title: "Add Student",
        path: "/addstudent",
        icon: <AddCircleIcon />,
        selected: currentRoute === "/addstudent",
      },
      {
        id: 3,
        title: "Manage Students",
        path: "/managestudent",
        icon: <ManageAccountsIcon />,
        selected: currentRoute === "/managestudent",
      },
    ],
  },
  {
    id: 4,
    title: "Fees Structure",
    path: "/",
    icon: <PaymentIcon />,
  },
];
