import { TagGroup } from "@/types";
import { useId } from "react";
import Select, { ActionMeta, OnChangeValue } from "react-select";

interface Option {
    value: string;
    label: string;
}

export default function SelectWrapper({ options, tags, setTags }: { options: TagGroup, tags: TagGroup[], setTags: (tags: TagGroup[]) => void}) {
    const handleChange = (
        newValue: OnChangeValue<Option, true>,
        actionMeta: ActionMeta<Option>
    ) => {
        const newTags = tags.map((tagGroup: TagGroup) => {
            if (tagGroup.name == options.name) {
                return {
                    ...tagGroup,
                    selectedTags: newValue.map((option: Option) => option.value),
                };
            } else {
                return tagGroup;
            }
        });

        setTags(newTags);
    };

    return (
        <Select
            isMulti
            options={options.tags.map((tag: string) => ({ value: tag, label: tag }))}
            onChange={handleChange}
            //value={selectedTags.map((tag: string) => ({ value: tag, label: tag }))}
            placeholder={options.name}
            instanceId={useId()}
            className="my-react-select-container"
            classNamePrefix="my-react-select"
        />
    );
}