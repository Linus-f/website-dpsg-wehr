import Lilie from "@/components/Lilie"

export type Icons = 'Lilie' | 'None'

export const getIconFromname = (iconsName: Icons, color?: string): JSX.Element | null =>  {
    switch (iconsName) {
        case "Lilie":
            return <Lilie color={color}/>;
        case "None":
        default:
            return null;
    }
}