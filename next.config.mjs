import nextMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkFrontmatter],
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
