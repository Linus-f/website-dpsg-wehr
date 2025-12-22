import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/mdx-components';
import { Metadata } from 'next';

const filePath = path.join(process.cwd(), 'content/pages/gallerie.mdx');

export async function generateMetadata(): Promise<Metadata> {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: _data } = matter(fileContents);
    
    // Extract metadata from the frontmatter or the exported metadata object in MDX if needed.
    // Since the original MDX exported a metadata object, we can replicate that behavior or use frontmatter.
    // For now, let's stick to the static metadata defined in the original MDX or frontmatter.
    
    // Note: Parsing the export const metadata from MDX string manually is complex. 
    // It is cleaner to rely on the frontmatter or re-define it here.
    // Given the original file had frontmatter AND an export, let's use the frontmatter title if available, 
    // but the specific SEO tags might need to be hardcoded or moved to frontmatter completely.
    
    // Let's assume we want to match the original exactly:
    return {
        title: 'Fotos - DPSG Wehr',
        description: 'Einblicke in unsere Zeltlager, Gruppenstunden und Aktionen. Entdecke unsere Fotogallerie!',
        openGraph: {
            title: 'Fotos - DPSG Wehr',
            description: 'Einblicke in unsere Zeltlager, Gruppenstunden und Aktionen. Entdecke unsere Fotogallerie!',
            images: ['/images/logo.png'],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Fotos - DPSG Wehr',
            description: 'Einblicke in unsere Zeltlager, Gruppenstunden und Aktionen. Entdecke unsere Fotogallerie!',
            images: ['/images/logo.png'],
        }
    };
}

export default function GalleryPage() {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContents);

    return (
        <MDXRemote 
            source={content} 
            components={mdxComponents}
        />
    );
}
