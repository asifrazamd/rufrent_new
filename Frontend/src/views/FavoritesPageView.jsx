// FavoritesPage.js
import React from 'react';
import PropertyCard from './PropertyCardView';
import Navbar from './Navbar';
import favoriteProperties from '../models/favoritesModel';
import tailwindStyles from '../utils/tailwindStyles';

const FavoritesPage = () => {
    // Sample data for favorite properties

    return (
        <div className={`${tailwindStyles.mainBackground} min-h-screen`}>
            <Navbar/>
            <main className="container mx-auto p-4 mt-20">
                <div className="flex flex-wrap justify-center">
                    {favoriteProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default FavoritesPage;