import axios from 'axios';

const STRAPI_URL = 'https://omnigraphy-backend-production.up.railway.app';

// Strapi v5 structure (flattened)
export interface Photo {
    id: number;
    documentId?: string;
    title: string;
    photoid: string;
    keywords: string;
    image?: {
        id?: number;
        url?: string;
        formats?: {
            small?: { url: string };
            medium?: { url: string };
            thumbnail?: { url: string };
        };
    } | null;
}

export interface PhotosResponse {
    data: Photo[];
}

export const fetchPhotos = async (): Promise<Photo[]> => {
    try {
        console.log('Fetching photos from:', `${STRAPI_URL}/api/photos?populate=*`);
        const response = await axios.get<PhotosResponse>(
            `${STRAPI_URL}/api/photos?populate=*`
        );
        console.log('Strapi response:', response.data);
        return response.data.data || [];
    } catch (error) {
        console.error('Error fetching photos:', error);
        if (axios.isAxiosError(error)) {
            console.error('Response data:', error.response?.data);
            console.error('Response status:', error.response?.status);
        }
        return [];
    }
};

export const searchPhotos = async (query: string): Promise<Photo[]> => {
    try {
        const response = await axios.get<PhotosResponse>(
            `${STRAPI_URL}/api/photos?populate=*`
        );
        const allPhotos = response.data.data;

        // Filter photos by searching in title, photoid, and keywords
        const searchTerm = query.toLowerCase();
        return allPhotos.filter(photo => {
            const title = photo.title.toLowerCase();
            const photoid = photo.photoid.toLowerCase();
            const keywords = photo.keywords?.toLowerCase() || '';

            return title.includes(searchTerm) ||
                   photoid.includes(searchTerm) ||
                   keywords.includes(searchTerm);
        });
    } catch (error) {
        console.error('Error searching photos:', error);
        return [];
    }
};

export const fetchPhotosByKeyword = async (keyword: string): Promise<Photo[]> => {
    try {
        console.log(`Fetching photos with keyword: "${keyword}"`);
        const response = await axios.get<PhotosResponse>(
            `${STRAPI_URL}/api/photos?populate=*`
        );
        const allPhotos = response.data.data;

        // Filter photos that have the keyword in their keywords field
        const searchTerm = keyword.toLowerCase();
        const filtered = allPhotos.filter(photo => {
            const keywords = photo.keywords?.toLowerCase() || '';
            return keywords.includes(searchTerm);
        });

        console.log(`Found ${filtered.length} photos with keyword "${keyword}"`);
        return filtered;
    } catch (error) {
        console.error('Error fetching photos by keyword:', error);
        return [];
    }
};

export const getImageUrl = (photo: Photo): string => {
    // Check if photo exists
    if (!photo) {
        console.error('Invalid photo object:', photo);
        return '';
    }

    // Check if image data exists (Strapi v5 flattened structure)
    if (!photo.image?.url) {
        console.warn('Photo missing image:', photo.title || 'Unknown');
        return ''; // Return empty string or a placeholder image URL
    }

    const imageUrl = photo.image.url;
    // If URL is relative, prepend Strapi URL
    if (imageUrl.startsWith('/')) {
        return `${STRAPI_URL}${imageUrl}`;
    }
    return imageUrl;
};