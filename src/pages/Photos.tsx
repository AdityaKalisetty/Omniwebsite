import { useEffect, useState } from 'react';
import PhotoCard from '../components/PhotoCard';
import FilterPanel from '../components/FilterPanel';
import '../styles/Photos.css';
import { fetchPhotos, getImageUrl } from '../services/strapi';
import type { Photo } from '../services/strapi';

interface PhotosProps {
    closeMenu: () => void;
}

interface Filters {
    orientation: string[];
    blackAndWhite: boolean;
    category: string[];
}

function Photos({ closeMenu }: PhotosProps) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        orientation: [],
        blackAndWhite: false,
        category: []
    });

    useEffect(() => {
        closeMenu();
    }, [closeMenu]);

    // Shuffle array function
    const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        const loadPhotos = async () => {
            setLoading(true);
            const data = await fetchPhotos();
            // Randomize the order of photos
            const shuffledPhotos = shuffleArray(data);
            setPhotos(shuffledPhotos);
            setLoading(false);
        };

        loadPhotos();
    }, []);

    // Filter toggle handlers
    const toggleOrientation = (orientation: string) => {
        setFilters(prev => ({
            ...prev,
            orientation: prev.orientation.includes(orientation)
                ? prev.orientation.filter(o => o !== orientation)
                : [...prev.orientation, orientation]
        }));
    };

    const toggleCategory = (category: string) => {
        setFilters(prev => ({
            ...prev,
            category: prev.category.includes(category)
                ? prev.category.filter(c => c !== category)
                : [...prev.category, category]
        }));
    };

    const toggleBlackAndWhite = () => {
        setFilters(prev => ({
            ...prev,
            blackAndWhite: !prev.blackAndWhite
        }));
    };

    const clearFilters = () => {
        setFilters({
            orientation: [],
            blackAndWhite: false,
            category: []
        });
        setSearchQuery('');
    };

    // Filter photos based on search query and filters
    const filteredPhotos = photos.filter(photo => {
        const title = photo.title?.toLowerCase() || '';
        const keywords = photo.keywords?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();

        // Search filter
        const matchesSearch = !searchQuery || title.includes(query) || keywords.includes(query);

        // Orientation filter
        const matchesOrientation = filters.orientation.length === 0 ||
            filters.orientation.some(o => keywords.includes(o.toLowerCase()));

        // Category filter
        const matchesCategory = filters.category.length === 0 ||
            filters.category.some(c => keywords.includes(c.toLowerCase()));

        // Black and white filter
        const matchesBlackAndWhite = !filters.blackAndWhite ||
            keywords.includes('black and white') || keywords.includes('b&w') || keywords.includes('monochrome');

        return matchesSearch && matchesOrientation && matchesCategory && matchesBlackAndWhite;
    });

    if (loading) {
        return (
            <div className="photos-container">
                <h1>Photos</h1>
                <p style={{ color: 'white', textAlign: 'center' }}>Loading photos...</p>
            </div>
        );
    }

    return (
        <div className="photos-container">
            <h1>Photos</h1>

            {/* Mobile search bar and filter button - shows only on mobile */}
            <div className='mobile-controls'>
                <div className='search-container mobile-search'>
                    <input
                        type="text"
                        className='search-input'
                        placeholder="Search photos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button className='search-clear' onClick={() => setSearchQuery('')}>
                            Clear
                        </button>
                    )}
                    {searchQuery && (
                        <p className='search-results'> Found {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''}</p>
                    )}
                </div>
                <button className='mobile-filter-btn' onClick={() => setIsFilterOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    Filters
                </button>
            </div>

            {/* Mobile filter overlay */}
            {isFilterOpen && (
                <div className='filter-overlay' onClick={() => setIsFilterOpen(false)}>
                    <div className='filter-overlay-content' onClick={(e) => e.stopPropagation()}>
                        <div className='filter-overlay-header'>
                            <h2>Filters</h2>
                            <button className='filter-overlay-close' onClick={() => setIsFilterOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <FilterPanel
                            filters={filters}
                            onToggleOrientation={toggleOrientation}
                            onToggleCategory={toggleCategory}
                            onToggleBlackAndWhite={toggleBlackAndWhite}
                            onClearFilters={clearFilters}
                            isMobile={true}
                        />
                        <button className='filter-overlay-apply' onClick={() => setIsFilterOpen(false)}>
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}

            <div className="photos-layout">
                <aside className="photos-filters">
                    <FilterPanel
                        filters={filters}
                        onToggleOrientation={toggleOrientation}
                        onToggleCategory={toggleCategory}
                        onToggleBlackAndWhite={toggleBlackAndWhite}
                        onClearFilters={clearFilters}
                    />
                </aside>
                <div className="photos-grid">
                    {filteredPhotos.map((photo, index) => (
                        <PhotoCard
                            key={photo.id}
                            image={getImageUrl(photo)}
                            title={photo.title}
                            photoId={photo.photoid}
                            index={index}
                        />
                    ))}
                </div>
                <aside className="photos-sidebar">
                    <div className='search-container'>
                        <h3>Search</h3>
                        <input
                            type="text"
                            className='search-input'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className='search-clear' onClick={() => setSearchQuery('')}>
                                Clear
                            </button>
                        )}
                        {searchQuery && (
                            <p className='search-results'> Found {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''}</p>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Photos;