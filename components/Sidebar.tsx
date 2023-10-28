import { NavbarLinksGroup } from "./LinksGroup";

export default function Sidebar({ isOpen, toggle }: { isOpen: boolean, toggle: () => void}) {
    return (
        <div className={`z-30 ${isOpen ? "h-[calc(100vh-56px)]" : "0px"} absolute min-w-full bg-gray-100 dark:bg-gray-700 ${isOpen ? "visible" : "collapse"}`} onClick={toggle}>
            <div onClick={e => e.stopPropagation()}>
                <NavbarLinksGroup toggleSidebar={toggle}/>
            </div>
        </div>
    )
}