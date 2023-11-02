import { getPhotos } from "@/lib/photos";
import PhotoAlbumWrapper from "@/components/PhotoAlbumWrapper";

export default async function PhotoGallery() {
    const photos = await getPhotos();

    return (
        <PhotoAlbumWrapper photos={photos} />
    )
}