import type { MDXComponents } from 'mdx/types'
import MDXImage from './components/MDXImage'
import Img from './components/Img'
import Acrostichon from './components/Acrostichon'
import GroupOverview from './components/GroupOverview'
import Calendar from './components/DynamicCalendar'
import Download from './components/Download'
import RecentPosts from './components/RecentPosts'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        img: (props) => (
            <MDXImage {...props} />
        ),
        MDXImage: (props: any) => (
            <MDXImage {...props} />
        ),
        Img: (props: any) => (
            <Img {...props} />
        ),
        Acrostichon: (props: any) => (
            <Acrostichon {...props} />
        ),
        GroupOverview: (props: any) => (
            <GroupOverview {...props} />
        ),
        Calendar: (props: any) => (
            <Calendar {...props} />
        ),
        Download: (props: any) => (
            <Download {...props} />
        ),
        RecentPosts: (props: any) => (
            <RecentPosts {...props} />
        ),
        ...components,
    }
}
