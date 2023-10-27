import nextMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkFrontmatter, remarkGfm],
        rehypePlugins: [],
    },
})

/** @type {import('next').NextConfig}*/
const nextConfig = {
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

    // Add any other Next.js config here.
}

export default withMDX(nextConfig)
