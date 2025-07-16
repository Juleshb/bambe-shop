import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from './utils/axios';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'flowbite-react';
import Footer from "./navs/Footer";
import Nav from "./navs/Nav";
import InquiryForm from "./InquiryForm";
import featuredProperty from "./assets/nn2.jpg";
import PropertiesMapView from './PropertiesMapView';

const PropertyListing = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', or 'map'
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 8,
        totalItems: 0
    });
    const [filters, setFilters] = useState({
        propertyType: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        sortBy: 'newest',
        status: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showInquiryModal, setShowInquiryModal] = useState(false);

    useEffect(() => {
        fetchProperties();
        fetchCategories();
        loadFavorites();
    }, [pagination.currentPage, filters, pagination.itemsPerPage]);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const params = {
                page: pagination.currentPage,
                limit: pagination.itemsPerPage,
                ...filters
            };

            // Add search query if provided
            if (searchQuery.trim()) {
                params.search = searchQuery.trim();
            }

            // Remove empty filters
            Object.keys(params).forEach(key => {
                if (params[key] === '' || params[key] === null || params[key] === undefined) {
                    delete params[key];
                }
            });

            const response = await axiosInstance.get('/api/listings/pagination', { params });
            
            if (response.data && response.data.data) {
                setProperties(response.data.data);
                setPagination({
                    ...pagination,
                    totalPages: response.data.pagination?.totalPages || 1,
                    totalItems: response.data.pagination?.totalItems || 0
                });
            } else {
                // Fallback to regular listings endpoint
                const fallbackResponse = await axiosInstance.get('/api/listings');
                setProperties(fallbackResponse.data || []);
                setPagination({
                    ...pagination,
                    totalPages: 1,
                    totalItems: fallbackResponse.data?.length || 0
                });
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
            // Fallback to regular listings endpoint
            try {
                const fallbackResponse = await axiosInstance.get('/api/listings');
                setProperties(fallbackResponse.data || []);
            } catch (fallbackError) {
                console.error('Fallback error:', fallbackError);
                setProperties([]);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/api/propertycategories');
            setCategories(response.data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const loadFavorites = () => {
        const savedFavorites = localStorage.getItem('propertyFavorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    };

    const toggleFavorite = (propertyId) => {
        const newFavorites = favorites.includes(propertyId)
            ? favorites.filter(id => id !== propertyId)
            : [...favorites, propertyId];
        
        setFavorites(newFavorites);
        localStorage.setItem('propertyFavorites', JSON.stringify(newFavorites));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPagination({ ...pagination, currentPage: 1 });
        fetchProperties();
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPagination({ ...pagination, currentPage: newPage });
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
        setPagination({ ...pagination, currentPage: 1 });
    };

    const clearFilters = () => {
        setFilters({
            propertyType: '',
            category: '',
            minPrice: '',
            maxPrice: '',
            location: '',
            bedrooms: '',
            bathrooms: '',
            sortBy: 'newest',
            status: ''
        });
        setSearchQuery('');
        setPagination({ ...pagination, currentPage: 1 });
    };

    const handleInquiryClick = (property) => {
        setSelectedProperty(property);
        setShowInquiryModal(true);
    };

    const handleInquirySuccess = () => {
        setShowInquiryModal(false);
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'new': return 'bg-[#38B496] text-white';
            case 'sold': return 'bg-red-500 text-white';
            case 'pending': return 'bg-yellow-500 text-white';
            case 'rented': return 'bg-blue-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const formatPrice = (price) => {
        if (!price) return 'Price on request';
        return `RWF ${parseInt(price).toLocaleString()}`;
    };

    const displayedProperties = showFavoritesOnly
        ? properties.filter(p => favorites.includes(p.id))
        : properties;

    // Add this function to handle map navigation
    const handleMapView = () => {
        navigate('/map-search', { 
            state: { 
                properties: displayedProperties,
                filters: filters,
                searchQuery: searchQuery
            }
        });
    };

    if (loading && properties.length === 0) {
        return (
            <>
                <Nav />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#38B496] mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading properties...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Nav />
            <div className="min-h-screen bg-gray-50">
                {/* Header Section */}
                <section className="bg-gradient-to-r from-[#38B496] to-[#F15C26] py-16 mt-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center text-white"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Find Your Perfect Property
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                                Discover amazing properties in Rwanda's most desirable locations
                            </p>
                            
                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                                <div className="flex bg-white rounded-full shadow-lg overflow-hidden">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by location, property type, or keywords..."
                                        className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-500 focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-[#F15C26] hover:bg-[#e04a1a] text-white px-8 py-4 transition-colors duration-300 flex items-center"
                                    >
                                        <Icon icon="mdi:magnify" className="mr-2" />
                                        Search
                                    </button>
                                </div>
                            </form>
                            <button
                                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                                className={`mt-4 px-8 py-3 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 relative overflow-hidden ${
                                    showFavoritesOnly 
                                        ? 'bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 text-white shadow-2xl' 
                                        : 'bg-gradient-to-r from-white/90 to-white/95 text-emerald-600 hover:from-white hover:to-white border-2 border-emerald-400/30 backdrop-blur-sm'
                                }`}
                                style={{
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: showFavoritesOnly 
                                        ? '0 20px 40px -10px rgba(16, 185, 129, 0.5), 0 10px 20px -5px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                                        : '0 10px 30px -10px rgba(255, 255, 255, 0.4), 0 5px 15px -5px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                                }}
                            >
                                <div className="flex items-center justify-center relative z-10">
                                    <Icon 
                                        icon={showFavoritesOnly ? "mdi:heart" : "mdi:heart-outline"} 
                                        className={`mr-3 text-xl transition-all duration-300 ${
                                            showFavoritesOnly ? 'animate-pulse' : 'hover:scale-110'
                                        }`} 
                                    />
                                    <span className="font-bold tracking-wide">
                                        {showFavoritesOnly ? 'Show All Properties' : 'Show Favorites'}
                                    </span>
                                </div>
                                {showFavoritesOnly && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                                )}
                                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent ${
                                    showFavoritesOnly ? 'animate-pulse' : 'opacity-0 hover:opacity-100'
                                } transition-opacity duration-300`}></div>
                            </button>
                        </motion.div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Filter Section */}
                    <motion.div 
                        className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Filters & Search</h2>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="flex items-center text-[#38B496] hover:text-[#2e9c81] transition-colors"
                                    >
                                        <Icon icon="mdi:filter" className="mr-2" />
                                        {showFilters ? 'Hide' : 'Show'} Filters
                                    </button>
                                    <button
                                        onClick={clearFilters}
                                        className="text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>

                            {/* Quick Filters */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                <select
                                    name="sortBy"
                                    value={filters.sortBy}
                                    onChange={handleFilterChange}
                                    className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="oldest">Oldest First</option>
                                </select>

                                <select
                                    name="propertyType"
                                    value={filters.propertyType}
                                    onChange={handleFilterChange}
                                    className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
                                >
                                    <option value="">All Types</option>
                                    <option value="house">House</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="villa">Villa</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="land">Land</option>
                                </select>

                                <select
                                    name="category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                    className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category.category_id} value={category.category_id}>
                                            {category.category_name}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="text"
                                    name="location"
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                    placeholder="Location"
                                    className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
                                />

                                <input
                                    type="number"
                                    name="minPrice"
                                    value={filters.minPrice}
                                    onChange={handleFilterChange}
                                    placeholder="Min Price"
                                    className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
                                />

                                <input
                                    type="number"
                                    name="maxPrice"
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                    placeholder="Max Price"
                                    className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
                                />
                            </div>
                        </div>

                        {/* Advanced Filters */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-t border-gray-100"
                                >
                                    <div className="p-6">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div>
                                                <label className="block text-base font-semibold text-gray-800 text-gray-700 mb-2">Bedrooms</label>
                                                <select
                                                    name="bedrooms"
                                                    value={filters.bedrooms}
                                                    onChange={handleFilterChange}
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
                                                >
                                                    <option value="">Any</option>
                                                    <option value="1">1+</option>
                                                    <option value="2">2+</option>
                                                    <option value="3">3+</option>
                                                    <option value="4">4+</option>
                                                    <option value="5">5+</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-base font-semibold text-gray-800 text-gray-700 mb-2">Bathrooms</label>
                                                <select
                                                    name="bathrooms"
                                                    value={filters.bathrooms}
                                                    onChange={handleFilterChange}
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
                                                >
                                                    <option value="">Any</option>
                                                    <option value="1">1+</option>
                                                    <option value="2">2+</option>
                                                    <option value="3">3+</option>
                                                    <option value="4">4+</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-base font-semibold text-gray-800 text-gray-700 mb-2">Status</label>
                                                <select
                                                    name="status"
                                                    value={filters.status}
                                                    onChange={handleFilterChange}
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
                                                >
                                                    <option value="">Any Status</option>
                                                    <option value="new">New</option>
                                                    <option value="sold">Sold</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="rented">Rented</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-base font-semibold text-gray-800 text-gray-700 mb-2">Items per page</label>
                                                <select
                                                    value={pagination.itemsPerPage}
                                                    onChange={(e) => {
                                                        setPagination({
                                                            ...pagination,
                                                            itemsPerPage: parseInt(e.target.value),
                                                            currentPage: 1
                                                        });
                                                    }}
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
                                                >
                                                    <option value={8}>8 per page</option>
                                                    <option value={12}>12 per page</option>
                                                    <option value={16}>16 per page</option>
                                                    <option value={24}>24 per page</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Results Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {pagination.totalItems} Properties Found
                            </h3>
                            {(Object.values(filters).some(value => value !== '' && value !== 'newest') || searchQuery) && (
                                <span className="text-sm text-gray-500">
                                    (Filtered results)
                                </span>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#38B496] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                            >
                                <Icon icon="mdi:view-grid" className="text-lg" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#38B496] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                            >
                                <Icon icon="mdi:view-list" className="text-lg" />
                            </button>
                            <button
                                onClick={handleMapView}
                                className="p-2 rounded-lg transition-colors bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-[#F15C26]"
                            >
                                <Icon icon="mdi:map" className="text-lg" />
                            </button>
                        </div>
                    </div>

                    {/* Properties Grid/List */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={viewMode}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={
                                viewMode === 'grid' 
                                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                                    : 'space-y-4'
                            }
                        >
                            {displayedProperties.map((property, index) => (
                                <motion.div
                                    key={property.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className={
                                        viewMode === 'grid'
                                            ? 'bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100'
                                            : 'bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100'
                                    }
                                >
                                    {viewMode === 'grid' ? (
                                        // Grid View
                                        <>
                                            <div className="relative overflow-hidden">
                                                <img
                                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                                    src={property.images?.length > 0 ? `http://localhost:4800${property.images[0].url}` : featuredProperty}
                                                    alt={property.name || property.title}
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <span className={`px-2 py-1 text-xs rounded-full font-medium shadow-lg ${getStatusColor(property.status)}`}>
                                                        {property.status || "New"}
                                                    </span>
                                                </div>
                                                <div className="absolute top-3 right-3">
                                                    <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-2 py-1 text-xs rounded-full font-semibold shadow-lg">
                                                        {formatPrice(property.price)}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => toggleFavorite(property.id)}
                                                    className={`absolute top-3 right-3 mt-8 p-2 rounded-full shadow-lg transition-all duration-300 ${
                                                        favorites.includes(property.id)
                                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                                            : 'bg-white/95 text-gray-600 hover:bg-white hover:text-red-500'
                                                    }`}
                                                >
                                                    <Icon 
                                                        icon={favorites.includes(property.id) ? "mdi:heart" : "mdi:heart-outline"} 
                                                        className="text-lg" 
                                                    />
                                                </button>
                                            </div>
                                            
                                            <div className="p-5">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#38B496] transition-colors line-clamp-1">
                                                    {property.name || property.title}
                                                </h3>
                                                
                                                <div className="flex items-center text-gray-600 mb-3">
                                                    <Icon icon="mdi:map-marker" className="mr-1 text-[#38B496] text-sm" />
                                                    <span className="text-sm">{property.location}</span>
                                                </div>
                                                
                                                <div className="grid grid-cols-3 gap-2 mb-4">
                                                    <div className="flex items-center justify-center bg-gray-50 rounded-lg py-2 px-1">
                                                        <Icon icon="mdi:bed" className="mr-1 text-[#38B496] text-xs" />
                                                        <span className="text-xs font-medium text-gray-700">{property.bedrooms || 0}</span>
                                                    </div>
                                                    <div className="flex items-center justify-center bg-gray-50 rounded-lg py-2 px-1">
                                                        <Icon icon="mdi:shower" className="mr-1 text-[#38B496] text-xs" />
                                                        <span className="text-xs font-medium text-gray-700">{property.bathrooms || 0}</span>
                                                    </div>
                                                    <div className="flex items-center justify-center bg-gray-50 rounded-lg py-2 px-1">
                                                        <Icon icon="mdi:ruler-square" className="mr-1 text-[#38B496] text-xs" />
                                                        <span className="text-xs font-medium text-gray-700">{property.area || 0}m²</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex justify-between items-center">
                                                    <div className="flex flex-col">
                                                        <span className="text-lg font-bold text-[#38B496]">
                                                            {formatPrice(property.price)}
                                                        </span>
                                                        <span className="text-xs text-gray-500">{property.listing_type || 'Property'}</span>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                            <Link 
                                                                to={`/listing/${property.id}`} 
                                                                className="bg-[#38B496] hover:bg-[#2e9c81] text-white px-3 py-2 rounded-lg text-base font-semibold text-gray-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                                                            >
                                                                View
                                                                <Icon icon="mdi:arrow-right" className="ml-1 text-xs" />
                                                            </Link>
                                                        </motion.div>
                                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                            <button
                                                                onClick={() => handleInquiryClick(property)}
                                                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-base font-semibold text-gray-800 transition-all duration-300 flex items-center"
                                                            >
                                                                <Icon icon="mdi:email" className="text-xs" />
                                                            </button>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        // List View
                                        <div className="flex">
                                            <div className="relative w-48 h-32 flex-shrink-0">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={property.images?.length > 0 ? `http://localhost:4800${property.images[0].url}` : featuredProperty}
                                                    alt={property.name || property.title}
                                                />
                                                <div className="absolute top-2 left-2">
                                                    <span className={`px-2 py-1 text-xs rounded-full font-medium shadow-lg ${getStatusColor(property.status)}`}>
                                                        {property.status || "New"}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => toggleFavorite(property.id)}
                                                    className={`absolute top-2 right-2 p-1.5 rounded-full shadow-lg transition-all duration-300 ${
                                                        favorites.includes(property.id)
                                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                                            : 'bg-white/95 text-gray-600 hover:bg-white hover:text-red-500'
                                                    }`}
                                                >
                                                    <Icon 
                                                        icon={favorites.includes(property.id) ? "mdi:heart" : "mdi:heart-outline"} 
                                                        className="text-sm" 
                                                    />
                                                </button>
                                            </div>
                                            
                                            <div className="flex-1 p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#38B496] transition-colors">
                                                        {property.name || property.title}
                                                    </h3>
                                                    <span className="text-lg font-bold text-[#38B496]">
                                                        {formatPrice(property.price)}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center text-gray-600 mb-3">
                                                    <Icon icon="mdi:map-marker" className="mr-1 text-[#38B496]" />
                                                    <span className="text-sm">{property.location}</span>
                                                </div>
                                                
                                                <div className="flex items-center space-x-6 mb-3">
                                                    <div className="flex items-center">
                                                        <Icon icon="mdi:bed" className="mr-1 text-[#38B496]" />
                                                        <span className="text-sm">{property.bedrooms || 0} Beds</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Icon icon="mdi:shower" className="mr-1 text-[#38B496]" />
                                                        <span className="text-sm">{property.bathrooms || 0} Baths</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Icon icon="mdi:ruler-square" className="mr-1 text-[#38B496]" />
                                                        <span className="text-sm">{property.area || 0}m²</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Icon icon="mdi:calendar" className="mr-1 text-[#38B496]" />
                                                        <span className="text-sm">{new Date(property.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-500">{property.listing_type || 'Property'}</span>
                                                    <div className="flex space-x-2">
                                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                            <Link 
                                                                to={`/listing/${property.id}`} 
                                                                className="bg-[#38B496] hover:bg-[#2e9c81] text-white px-4 py-2 rounded-lg text-base font-semibold text-gray-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                                                            >
                                                                View Details
                                                                <Icon icon="mdi:arrow-right" className="ml-1" />
                                                            </Link>
                                                        </motion.div>
                                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                            <button
                                                                onClick={() => handleInquiryClick(property)}
                                                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-base font-semibold text-gray-800 transition-all duration-300 flex items-center"
                                                            >
                                                                <Icon icon="mdi:email" className="mr-1" />
                                                                Inquiry
                                                            </button>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* No Properties Found */}
                    {!loading && properties.length === 0 && (
                        <motion.div 
                            className="text-center py-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Icon icon="mdi:home-search" className="mx-auto text-6xl text-gray-300 mb-4" />
                            <h3 className="text-2xl font-medium text-gray-700 mb-2">No Properties Found</h3>
                            <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
                            <button
                                onClick={clearFilters}
                                className="bg-[#38B496] hover:bg-[#2e9c81] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </motion.div>
                    )}

                    {/* Pagination Controls - Only Show if Multiple Pages */}
                    {pagination.totalPages > 1 && (
                        <motion.div 
                            className="flex justify-center mt-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <nav className="flex items-center space-x-2 bg-white rounded-xl shadow-lg p-2">
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={pagination.currentPage === 1}
                                    className={`p-2 rounded-lg transition-colors ${
                                        pagination.currentPage === 1 
                                            ? 'text-gray-400 cursor-not-allowed' 
                                            : 'text-[#38B496] hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon icon="mdi:chevron-left" className="text-xl" />
                                </button>

                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (pagination.totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (pagination.currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                                        pageNum = pagination.totalPages - 4 + i;
                                    } else {
                                        pageNum = pagination.currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`w-10 h-10 rounded-lg transition-all ${
                                                pagination.currentPage === pageNum 
                                                    ? 'bg-[#38B496] text-white shadow-md' 
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                                    <span className="px-2 text-gray-500">...</span>
                                )}

                                {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                                    <button
                                        onClick={() => handlePageChange(pagination.totalPages)}
                                        className={`w-10 h-10 rounded-lg transition-all ${
                                            pagination.currentPage === pagination.totalPages 
                                                ? 'bg-[#38B496] text-white shadow-md' 
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {pagination.totalPages}
                                    </button>
                                )}

                                <button
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    className={`p-2 rounded-lg transition-colors ${
                                        pagination.currentPage === pagination.totalPages 
                                            ? 'text-gray-400 cursor-not-allowed' 
                                            : 'text-[#38B496] hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon icon="mdi:chevron-right" className="text-xl" />
                                </button>
                            </nav>
                        </motion.div>
                    )}
                </div>

                {/* Inquiry Modal */}
                <Modal show={showInquiryModal} onClose={() => setShowInquiryModal(false)} size="lg">
                    <Modal.Header>
                        <div className="flex items-center">
                            <Icon icon="mdi:email" className="mr-2 text-[#38B496]" />
                            {selectedProperty && `Inquire about ${selectedProperty.name || selectedProperty.title}`}
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <InquiryForm
                            propertyId={selectedProperty?.id}
                            propertyName={selectedProperty?.name || selectedProperty?.title}
                            onSuccess={handleInquirySuccess}
                            className="p-0"
                        />
                    </Modal.Body>
                </Modal>
            </div>
            <Footer />
        </>
    );
};

export default PropertyListing;