import Lilie from "@/components/Lilie";

export type Icons = 'Lilie' | 'None' | 'News' | 'People' | 'Image' | 'Calendar' | 'Help' | 'House'

export const getIconFromname = (iconsName: Icons, color?: string): React.JSX.Element | null =>  {

    switch (iconsName) {

        case "Lilie":

            return <Lilie color={color}/>;

        case "News":

            return (

                <svg fill="currentColor" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">

                    <use href="#icon-news" />

                </svg>

            );

        case "People":

            return (

                <svg fill="currentColor" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">

                    <use href="#icon-people" />

                </svg>

            );

        case "Image":

            return (

                <svg fill="currentColor" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">

                    <use href="#icon-image" />

                </svg>

            );

        case "Calendar":

            return (

                <svg stroke="currentColor" fill="none" strokeWidth="32" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">

                    <use href="#icon-calendar" />

                </svg>

            );

        case "Help":

            return (

                <svg fill="currentColor" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">

                    <use href="#icon-help" />

                </svg>

            );

        case "House":

            return (

                <svg fill="currentColor" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">

                    <use href="#icon-house" />

                </svg>

            );

        default:

            return null;

    }

}
