"use client";

import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "../ui/badge";


const MultiSelect = ({ options,
    value,
    onChange,
    placeholder = "Select items...",
    disabled = false, }) => {

    const [open, setOpen] = useState(false);

    const handleUnselect = (item) => {
        onChange(value.filter((i) => i !== item));
    };

    const handleSelect = (item) => {
        if (value.includes(item)) {
            handleUnselect(item);
        } else {
            onChange([...value, item]);
        }
    };

    return (
        <>
            <Popover>
                <PopoverTrigger
                    className={cn(
                        "flex h-10 w-full transition-all items-center justify-between rounded-md border border-input bg-background text-sm",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "hover:bg-accent hover:text-accent-foreground overflow-hidden",
                    )}
                    disabled={disabled}
                    aria-expanded={open}
                >
                    <div className="flex justify-between flex-1 overflow-hidden">
                        <div
                            className="flex gap-1 flex-1 py-1 px-3 overflow-x-auto scrollbar-hide"
                        >
                            {value.length === 0 ? (
                                <span className="text-muted-foreground truncate">
                                    {placeholder}
                                </span>
                            ) : (
                                value.map((item) => {
                                    const option = options?.find((opt) => opt.value === item);
                                    return (
                                        <Badge key={item} variant="default" className="text-xs">
                                            {option?.label}
                                            <span className={"!h-4 !w-4 relative"}>
                                                <Image
                                                    src={option.logo}
                                                    alt={option.label}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </span>
                                            <span
                                                role="button"
                                                tabIndex={0}
                                                className="ml-1 hover:bg-destructive transition-all hover:text-destructive-foreground !rounded-sm p-1"
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" && handleUnselect(item)
                                                }
                                                onClick={() => handleUnselect(item)}
                                            >
                                                <X className="h-3 w-3" />
                                            </span>
                                        </Badge>
                                    );
                                })
                            )}
                        </div>
                        <hr className="border-l border-border h-6 mx-0.5 my-auto" />
                        <span
                            role="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen((prev) => !prev);
                            }}
                            tabIndex={0}
                            className={cn(
                                "p-1 mx-1.5 my-auto h-full outline-none",
                                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                "hover:bg-accent/50 rounded-sm cursor-pointer"
                            )}
                        >
                            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                        </span>
                    </div>
                </PopoverTrigger>
                <PopoverContent className={"p-0"} align="start">
                    <Command>
                        <CommandInput
                            placeholder="Type to search..."
                            className={"focus-visible:ring-0 focus-visible:outline-none"}
                        />
                        <CommandList>
                            <CommandGroup heading="Skills">
                                {options?.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={() => handleSelect(option.value)}
                                        className="cursor-pointer"
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value.includes(option.value)
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        {option.label}
                                        <CommandShortcut className={"!h-4 !w-4 relative"}>
                                            <Image
                                                src={option.logo}
                                                alt={option.label}
                                                fill
                                                className="object-contain"
                                            />
                                        </CommandShortcut>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default MultiSelect