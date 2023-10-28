export default function Sidebar({ isOpen }: { isOpen: boolean}) {
    return (
        <div className={`bg-red-600 z-40 ${isOpen ? "h-[calc(100vh-56px)]" : "0px"} absolute min-w-full`}>

        </div>
    )
}