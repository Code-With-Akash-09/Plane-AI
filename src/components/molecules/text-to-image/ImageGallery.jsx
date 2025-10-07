"use client";

import Loading from "@/components/atoms/loading";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

const ImageGallery = ({ limit = 20, page = 1, setCount, className }) => {
    const { user } = useAuth();
    const supabase = createClient();

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const getImages = async () => {
        if (!user) return;
        setLoading(true);

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, count } = await supabase
            .from("AIImages")
            .select("*", { count: "exact" })
            .eq("uid", user.id)
            .order("created_at", { ascending: false })
            .range(from, to);

        setImages(data || []);
        setCount(count || 0);
        setLoading(false);
    };

    useEffect(() => {
        getImages();
    }, [user, page, limit]);

    if (loading) {
        return (
            <div className="flex size-full items-center justify-center">
                <Loading className="text-primary" />
            </div>
        )
    }

    if (!images?.length) {
        return (
            <div className="flex size-full items-center justify-center">
                <p className="text-neutral-500">No Images Found</p>
            </div>
        )
    }

    return (
        <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full h-fit ${className}`}
        >
            {images.map((card, i) => (
                <ImageCard
                    key={i}
                    download={true}
                    card={card}
                />
            ))}
        </div>
    );
};

export default ImageGallery;
