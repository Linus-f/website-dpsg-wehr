import SidebarWrapper from './SidebarWrapper';

export default function LayoutBody({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 flex flex-col relative">
            <SidebarWrapper />
            <main className="max-w-4xl w-full mx-0 px-2 sm:px-4 md:mx-auto my-12 md:my-20 flex-1">
                {children}
            </main>
        </div>
    );
}