// 1. Callback Version
function fetchDataCallback(callback) {
  setTimeout(() => {
    callback('Data fetched');
  }, 1000);
}

// 2. Promise Version
function fetchDataPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data fetched');
    }, 1000);
  });
}

// 3. Async/Await Version
async function fetchDataAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data fetched');
    }, 1000);
  });
}

// Testing all three versions
console.log('=== Q8: Async JavaScript Demo ===\n');

// Test Callback
console.log('1. Testing Callback Version...');
fetchDataCallback((data) => {
  console.log('Callback Result:', data);
  console.log('');
  
  // Test Promise
  console.log('2. Testing Promise Version...');
  fetchDataPromise().then(data => {
    console.log('Promise Result:', data);
    console.log('');
    
    // Test Async/Await
    console.log('3. Testing Async/Await Version...');
    (async () => {
      const data = await fetchDataAsync();
      console.log('Async/Await Result:', data);
    })();
  });
});