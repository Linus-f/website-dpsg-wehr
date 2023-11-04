import { TagGroup } from "@/types";
import SelectWrapper from "./SelectWrapper";


export default function GalleryHeader({tags, setTags}: {tags: TagGroup[], setTags: (tags: TagGroup[]) => void}) {
    const dropdowns = tags.map((group: TagGroup) => (
        <SelectWrapper
            key={group.name}
            options={group}
            tags={tags}
            setTags={setTags}
        />
    ));

    return (
        <div className="mb-4 flex flex-row place-content-between gap-4">
            {dropdowns}
        </div>
    );
}

