import { getPhotos } from "@/lib/photos";
import PhotoAlbumWrapper from "@/components/PhotoAlbumWrapper";

export default async function PhotoGallery() {
    const photos = await getPhotos();
    const tags: string[] = ["1", "2"];

    return (
        <PhotoAlbumWrapper photos={photos} tags={tags}/>
    )
}