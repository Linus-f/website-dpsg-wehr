import type { MDXComponents } from 'mdx/types'
import MDXImage from './components/MDXImage'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        img: (props) => (
            <MDXImage {...props} />
        ),
        ...components,
    }
}
