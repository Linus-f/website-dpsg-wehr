import nextMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeImageSize from 'rehype-img-size'

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkFrontmatter, remarkGfm],
        rehypePlugins: [[rehypeImageSize, { dir: 'public' }]],
    },
})

/** @type {import('next').NextConfig}*/
const nextConfig = {
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    images: {
        loader: "custom",
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        deviceSizes: [640, 750, 777, 828, 1080, 1200, 1920, 2048, 3840],
      },
      output: "export",
      transpilePackages: ["next-image-export-optimizer"],
      env: {
        nextImageExportOptimizer_imageFolderPath: "public/images",
        nextImageExportOptimizer_exportFolderPath: "out",
        nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
        nextImageExportOptimizer_quality: "75",
        nextImageExportOptimizer_storePicturesInWEBP: "true",
        nextImageExportOptimizer_generateAndUseBlurImages: "true",
      },
}

export default withMDX(nextConfig)
