import Lilie from "@/components/Lilie";
import {
    IoNewspaper,
    IoPeople,
    IoImage,
    IoCalendarOutline,
    IoHelpCircle,
} from "react-icons/io5"
import { FaHouseChimney } from "react-icons/fa6"

export type Icons = 'Lilie' | 'None' | 'News' | 'People' | 'Image' | 'Calendar' | 'Help' | 'House'

export const getIconFromname = (iconsName: Icons, color?: string): React.JSX.Element | null =>  {
    switch (iconsName) {
        case "Lilie":
            return <Lilie color={color}/>;
        case "News":
            return <IoNewspaper />;
        case "People":
            return <IoPeople />;
        case "Image":
            return <IoImage />;
        case "Calendar":
            return <IoCalendarOutline />;
        case "Help":
            return <IoHelpCircle />;
        case "House":
            return <FaHouseChimney />;
        default:
            return null;
    }
}
