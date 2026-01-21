import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryPrinter = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/categories');
        console.log('Categories data:', response.data);
        setCategories(response.data.data || response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const printCategories = () => {
    console.log('=== ALL CATEGORIES ===');
    console.table(categories.map(cat => ({
      'Category ID': cat._id,
      'Name': cat.name,
      'Description': cat.description || 'No description',
      'Created At': new Date(cat.createdAt).toLocaleDateString()
    })));
    
    // Also print to alert for easy viewing
    const categoryList = categories.map(cat => 
      `${cat.name}: ${cat.description || 'No description'}`
    ).join('\n');
    
    alert(`Categories List:\n\n${categoryList}`);
  };

  if (loading) {
    return (
      <div className="p-6 bg-blue-50 rounded-lg">
        <p className="text-blue-700">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg">
        <p className="text-red-700">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Category Printer</h2>
        
        <div className="mb-6">
          <button 
            onClick={printCategories}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mr-4"
          >
            Print Categories to Console
          </button>
          
          <button 
            onClick={() => console.log('Raw categories data:', categories)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Log Raw Data
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-gray-800">{category.name}</h3>
              <p className="text-gray-600 mt-2">{category.description || 'No description available'}</p>
              <div className="mt-3 text-sm text-gray-500">
                <p>ID: {category._id}</p>
                <p>Created: {new Date(category.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No categories found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPrinter;