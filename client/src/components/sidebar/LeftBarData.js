import { Send, StarBorder } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import PaymentIcon from "@mui/icons-material/Payment";

export const LeftBarData = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    title: "Student",
    path: "/",
    icon: <SupervisorAccountIcon />,
    submenu: [
      {
        id: 3,
        title: "All Student",
        path: "/",
        icon: <StarBorder />,
      },
      {
        id: 3,
        title: "New Students",
        path: "/addstudent",
        icon: <AddCircleIcon />,
      },
    ],
  },
  {
    id: 3,
    title: "Courses",
    path: "/",
    icon: <EditIcon />,
  },
  {
    id: 4,
    title: "Fees Structure",
    path: "/",
    icon: <PaymentIcon />,
  },
];
