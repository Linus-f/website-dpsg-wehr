import { useState } from 'react';
import { Collapse, ThemeIcon } from '@mantine/core';
import { navigationLinks, NavigationLinkGroup } from '@/lib/config';

import {
    IoChevronDownOutline as ChevronDown,
} from "react-icons/io5";
import Link from 'next/link';
import { getIconFromname } from '@/lib/icons';

export function LinksGroup({ navigationLinks, toggleSidebar }: { navigationLinks: NavigationLinkGroup, toggleSidebar: () => void}) {
  const { label, Icon, link, links } = navigationLinks;
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(false);
  const items = (hasLinks ? links : []).map((link) => (
        <Link className='font-medium flex flex-row items-center px-4 py-3 ml-4 border-l border-solid border-gray-200 dark:border-gray-500 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            href={link.link}
            key={link.label}
            onClick={toggleSidebar}>
              <div className='w-4 h-4 mr-2'>
                {getIconFromname(link.Icon, link.color)}
              </div>
              {link.label}
        </Link>
  ));

  const hasIcon = Icon !== undefined

  const onGroupClick = () => {
    if (hasLinks) {
      setOpened((o) => !o);
    } else {
        toggleSidebar();
    }
  }

  return (
    <>
      <Link href={hasLinks ? "" : link} onClick={onGroupClick}>
        <div className='font-medium block w-full hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded mb-2'>
        <div className='flex flex-row justify-between gap-0 items-center'>
          <div className='flex items-center'>
            <ThemeIcon variant="light" size={30}>
                {hasIcon && <Icon className='w-5 h-5' />}
            </ThemeIcon>
            <div className='ml-4 text-lg'>{label}</div>
          </div>
          {hasLinks && (
            <div className={`text-gray-600 dark:text-white ${opened ? '' : 'transform -rotate-90'}`}>
              <ChevronDown/>
            </div>
          )}
        </div>
        </div>
      </Link>
      {hasLinks ? <Collapse in={opened} className="mb-2">{items}</Collapse> : null}
    </>
  );
}

export function NavbarLinksGroup({ toggleSidebar }: { toggleSidebar: () => void}) {
  const groups = navigationLinks.map((group) => {
    return (
        <div key={group.label}>
            <LinksGroup navigationLinks={group} toggleSidebar={toggleSidebar} />
        </div>
  )});

  return (
    <div className='m-4'>
      {groups}
    </div>
  );
}