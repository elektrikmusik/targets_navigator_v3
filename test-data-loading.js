// Simple test script to check data loading
const testDataLoading = async () => {
  console.log('🔍 Testing data loading...');
  
  try {
    const response = await fetch('http://localhost:5173/world_countries.json');
    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Data loaded successfully');
    console.log('📊 Data type:', data.type);
    console.log('📊 Features count:', data.features?.length || 0);
    console.log('📊 Data size:', JSON.stringify(data).length, 'characters');
    
    // Check first few features
    if (data.features && data.features.length > 0) {
      console.log('🔍 First feature:', {
        type: data.features[0].type,
        properties: data.features[0].properties,
        hasGeometry: !!data.features[0].geometry
      });
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error loading data:', error);
    return { success: false, error: error.message };
  }
};

// Run the test
testDataLoading().then(result => {
  console.log('🏁 Test completed:', result);
});
