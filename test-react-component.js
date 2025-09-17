// Test React component behavior
const { useState, useEffect, useCallback } = require('react');

// Mock the useWorldData hook behavior
const mockUseWorldData = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadWorldData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5173/world_countries.json');
      if (!response.ok) {
        throw new Error(`Failed to load world countries data: ${response.status} ${response.statusText}`);
      }
      
      const worldData = await response.json();
      
      if (worldData && worldData.features && Array.isArray(worldData.features)) {
        setFeatures(worldData.features);
        setHasLoaded(true);
        console.log('✅ Data loaded in hook:', worldData.features.length, 'features');
      } else {
        throw new Error('Invalid data format: missing features array');
      }
    } catch (err) {
      console.error('❌ Error in hook:', err);
      setError(err instanceof Error ? err.message : 'Failed to load map data');
      setFeatures([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      console.log('🔄 Hook: Starting data load...');
      loadWorldData();
    }
  }, [hasLoaded, loadWorldData]);

  return { features, loading, error };
};

// Test the hook
console.log('🧪 Testing useWorldData hook...');
const { features, loading, error } = mockUseWorldData();

// Wait a bit for async operations
setTimeout(() => {
  console.log('📊 Hook result:');
  console.log('  - Loading:', loading);
  console.log('  - Error:', error);
  console.log('  - Features count:', features.length);
}, 2000);
