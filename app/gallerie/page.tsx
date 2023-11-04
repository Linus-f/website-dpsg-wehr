import { getPhotos } from "@/lib/photos";
import PhotoAlbumWrapper from "@/components/PhotoAlbumWrapper";

export default async function PhotoGallery() {
    const photos = await getPhotos();
<<<<<<< HEAD
    
=======
    const tags: string[] = [];

>>>>>>> 6d5042fb7078bd2190523e0f5154ab76eed736e5
    return (
        <PhotoAlbumWrapper photos={photos} />
    );
}