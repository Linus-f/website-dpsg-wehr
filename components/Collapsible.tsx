import { useState } from 'react';
import { IoChevronDownOutline as ChevronDown } from 'react-icons/io5';

export default function Collapsible({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    return (
        <div className="mb-2">
            <div
                className="flex flex-row items-center text-gray-700 dark:text-gray-300"
                onClick={toggle}
            >
                <p className="mr-2">{label}</p>
                <div className={`${open ? '' : 'transform -rotate-90'}`}>
                    <ChevronDown />
                </div>
            </div>
            <div className="pt-2">{open && children}</div>
        </div>
    );
}
