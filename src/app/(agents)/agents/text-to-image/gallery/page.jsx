"use client";

import AgentsHeader from "@/components/atoms/agents/AgentsHeader";
import ImageGallery from "@/components/molecules/text-to-image/ImageGallery";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const Limits = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "40", value: "40" },
    { label: "60", value: "60" },
    { label: "80", value: "80" },
    { label: "100", value: "100" },
];

const page = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const isMobile = useIsMobile();

    const totalPages = Math.ceil(count / limit) || 1;

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="flex-grow h-full px-4 py-4 w-full overflow-hidden">
            <div className="flex w-full h-full flex-col max-w-7xl mx-auto gap-4 md:gap-6">
                <AgentsHeader
                    title="Image Gallery"
                    description="Review and analyze your past images."
                />
                <div className={cn("flex flex-grow overflow-y-auto min-h-40 max-h-[calc(100vh-210px)] md:max-h-full w-full", isMobile ? "scrollbar-hide" : "scrollbar pr-3")}>
                    <ImageGallery
                        limit={limit}
                        page={page}
                        setCount={setCount}
                    />
                </div>

                <div className="flex justify-between items-center flex-grow-0 w-full rounded-2xl">
                    <div className="flex items-center gap-3">
                        <Select
                            value={String(limit)}
                            onValueChange={(value) => {
                                setLimit(Number(value));
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="w-20 border border-neutral-700 bg-transparent text-sm">
                                <SelectValue placeholder="Select limit" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-900 border-neutral-700 text-white !min-w-20">
                                <SelectGroup>
                                    {Limits.map((opt, i) => (
                                        <SelectItem key={i} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className="px-3 py-1 border border-neutral-700 rounded-md text-sm disabled:opacity-50"
                            variant="outline"
                        >
                            <ArrowLeft />
                        </Button>

                        <span className="text-sm text-neutral-400">
                            Page {page} of {totalPages}
                        </span>

                        <Button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className="px-3 py-1 border border-neutral-700 rounded-md text-sm disabled:opacity-50"
                            variant="outline"
                        >
                            <ArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
