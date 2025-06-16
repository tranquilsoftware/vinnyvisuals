export interface ImageItem {
    id: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    title?: string;
    description?: string;
}

export interface SkeletonItem {
    id: string;
}

export interface InfiniteImageGalleryProps {
    images: ImageItem[];
    columns?: number;
    gap?: string;
    batchSize?: number;
    onLoadMore?: () => Promise<ImageItem[]>;
    hasMore?: boolean;
    isLoading?: boolean;
    skeletonCount?: number;
}

export const LOAD_IMAGE_COUNT = 12; // Number of images to load per batch
