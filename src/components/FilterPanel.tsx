import '../styles/FilterPanel.css';

interface FilterPanelProps {
    filters: {
        orientation: string[];
        blackAndWhite: boolean;
        category: string[];
    };
    onToggleOrientation: (orientation: string) => void;
    onToggleCategory: (category: string) => void;
    onToggleBlackAndWhite: () => void;
    onClearFilters: () => void;
    isMobile?: boolean;
}

function FilterPanel({
    filters,
    onToggleOrientation,
    onToggleCategory,
    onToggleBlackAndWhite,
    onClearFilters,
    isMobile = false
}: FilterPanelProps) {

    const hasActiveFilters = filters.orientation.length > 0 ||
                            filters.category.length > 0 ||
                            filters.blackAndWhite;

    return (
        <div className="filter-panel">
            <div className="filter-header">
                {!isMobile && <h3>Filters</h3>}
                {hasActiveFilters && (
                    <button className={`clear-filters-btn ${isMobile ? 'mobile' : ''}`} onClick={onClearFilters}>
                        Clear All
                    </button>
                )}
            </div>

            {/* Orientation Filter */}
            <div className="filter-section">
                <h4>Orientation</h4>
                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={filters.orientation.includes('landscape')}
                        onChange={() => onToggleOrientation('landscape')}
                    />
                    <span>Landscape</span>
                </label>
                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={filters.orientation.includes('portrait')}
                        onChange={() => onToggleOrientation('portrait')}
                    />
                    <span>Portrait</span>
                </label>
            </div>

            {/* Category Filter */}
            <div className="filter-section">
                <h4>Category</h4>
                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={filters.category.includes('abstract')}
                        onChange={() => onToggleCategory('abstract')}
                    />
                    <span>Abstract</span>
                </label>
                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={filters.category.includes('nature')}
                        onChange={() => onToggleCategory('nature')}
                    />
                    <span>Nature</span>
                </label>
                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={filters.category.includes('sky')}
                        onChange={() => onToggleCategory('sky')}
                    />
                    <span>Sky</span>
                </label>
            </div>

            {/* Black & White Filter */}
            <div className="filter-section">
                <h4>Style</h4>
                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={filters.blackAndWhite}
                        onChange={onToggleBlackAndWhite}
                    />
                    <span>Black & White</span>
                </label>
            </div>
        </div>
    );
}

export default FilterPanel;

