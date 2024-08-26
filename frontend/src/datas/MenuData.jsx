import { RiDashboard2Fill } from "react-icons/ri";
import { MdOutlineInventory } from "react-icons/md";
// import { PiTrolleyFill } from "react-icons/pi";
import { IoMdListBox } from "react-icons/io";
import { BiSolidBarChartAlt2 } from "react-icons/bi";



export const TopNavlink = [

    {
        "id":1,
        "title":"Dashboard",
        "link":"/",
        "icon":<RiDashboard2Fill/>
    },
    {
        "id":2,
        "title":"Projects",
        "link":"projects",
        subMenu: [
            { title: 'Projects', link: 'projects' },
            { title: 'Sub Home 2', link: '/sub-home-2' },
        ],
        "icon":<MdOutlineInventory/>
    }
];