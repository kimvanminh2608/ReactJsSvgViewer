import React from 'react';

const PropertyList = ({ mID, properties }) => {
    return (
        <div className="fixed top-0 right-0 w-1/4 h-full bg-white shadow-lg overflow-y-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Property List</h2>
            <div id="propertyContent">
                {Object.entries(properties).length === 0 ? (
                    <p>No properties available.</p>
                ) : (
                    Object.entries(properties).map(([key, value]) => (
                        <div key={key} className="mb-2">
                            <strong>{key}:</strong> {value}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PropertyList;