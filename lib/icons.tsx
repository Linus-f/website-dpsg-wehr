import Lilie from "@/components/Lilie";

export type Icons = 'Lilie' | 'None'

export const getIconFromname = (iconsName: Icons, color?: string): React.JSX.Element | null =>  {
    switch (iconsName) {
        case "Lilie":
            return <Lilie color={color}/>;
        default:
            return null;
    }
}