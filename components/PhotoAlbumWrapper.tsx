'use client';

import PhotoAlbum from 'react-photo-album';
import 'react-photo-album/styles.css';
import { PhotoPlus, TagGroup } from '@/types';
import { useEffect, useState } from 'react';
import DynamicGalleryHeader from '@/components/DynamicGalleryHeader';
import NextPhotoRenderer from './NextPhotoRenderer';

const tagsInit: TagGroup[] = [
    {
        name: 'Jahr',
        tags: ['2018', '2017', '2016'],
        selectedTags: [],
    },
    {
        name: 'Aktion',
        tags: ['Lager', 'Jurtenaktion'],
        selectedTags: [],
    },
    {
        name: 'Gruppe',
        tags: ['Wölflinge', 'Jupfis', 'Pfadis', 'Rover', 'Leiter'],
        selectedTags: [],
    },
];

export default function PhotoAlbumWrapper({ photos }: { photos: PhotoPlus[] }) {
    const [mounted, setMounted] = useState(false);
    const [fileredPhotos, setFilteredPhotos] = useState<PhotoPlus[]>([]);
    const [tags, setTags] = useState<TagGroup[]>(tagsInit);

    useEffect(() => {
        if (!mounted) {
            // We use this to prevent hydration mismatch by ensuring the component is mounted on the client.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMounted(true);
            return;
        }

        const filtered = photos.filter((photo: PhotoPlus) =>
            tags.every(
                (group: TagGroup) =>
                    group.selectedTags == undefined ||
                    group.selectedTags.length == 0 ||
                    group.selectedTags.some((tag: string) => photo.tags!.includes(tag))
            )
        );

        setFilteredPhotos(filtered);
    }, [mounted, tags, photos]);

    return (
        <div>
            <DynamicGalleryHeader tags={tags} setTags={setTags} />
            <PhotoAlbum
                photos={fileredPhotos}
                layout="rows"
                render={{ image: NextPhotoRenderer }}
                sizes={{
                    size: '896px',
                    sizes: [
                        { viewport: '(max-width: 896px)', size: 'calc(100vw - 32px)' },
                        { viewport: '(max-width: 559px)', size: 'calc(100vw - 16px)' },
                    ],
                }}
            />
        </div>
    );
}
