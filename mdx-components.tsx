import type { MDXComponents } from 'mdx/types';
import MDXImage from './components/MDXImage';
import Img from './components/Img';
import Acrostichon from './components/Acrostichon';
import GroupOverview from './components/GroupOverview';
import Calendar from './components/DynamicCalendar';
import Download from './components/Download';
import RecentPosts from './components/RecentPosts';

export const mdxComponents: MDXComponents = {
    img: (props) => <MDXImage {...props} />,
    MDXImage: (props: React.ComponentPropsWithoutRef<typeof MDXImage>) => <MDXImage {...props} />,
    Img: (props: React.ComponentPropsWithoutRef<typeof Img>) => <Img {...props} />,
    Acrostichon: (props: React.ComponentPropsWithoutRef<typeof Acrostichon>) => (
        <Acrostichon {...props} />
    ),
    GroupOverview: (props: React.ComponentPropsWithoutRef<typeof GroupOverview>) => (
        <GroupOverview {...props} />
    ),
    Calendar: () => <Calendar />,
    Download: (props: React.ComponentPropsWithoutRef<typeof Download>) => <Download {...props} />,
    RecentPosts: () => <RecentPosts />,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...mdxComponents,
        ...components,
    };
}
