import { Send, StarBorder } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import PaymentIcon from "@mui/icons-material/Payment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SchoolIcon from "@mui/icons-material/School";

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
    title: "Batch",
    path: "/batchgroup",
    icon: <SchoolIcon />,
    open: currentRoute === "/batchgroup" || currentRoute === "/batchgroup",
  },
  {
    id: 3,
    title: "Courses",
    path: "/coursegroup",
    icon: <EditIcon />,
    open: currentRoute === "/coursegroup" || currentRoute === "/coursegroup",
  },
  {
    id: 4,
    title: "Students",
    path: "/",
    icon: <SupervisorAccountIcon />,
    open: currentRoute === "/students" || currentRoute === "/addstudent",
    submenu: [
      {
        id: 3,
        title: "Create Student",
        path: "/createstudent",
        icon: <AddCircleIcon />,
        selected: currentRoute === "/createstudent",
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
    id: 5,
    title: "Fees Structure",
    path: "/",
    icon: <PaymentIcon />,
  },
];
