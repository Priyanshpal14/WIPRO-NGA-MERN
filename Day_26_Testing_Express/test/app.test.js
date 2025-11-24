// here in app.test we will write tests for our express app via mocha, chai and supertest
//Step 1: import required modules like chai, supertest and our app
//Step 2: write test cases inside describe and it blocks
//Step 3: use supertest to make requests to our app and chai for assertions
//Step 4: run the tests using mocha
//Step 5: verify the output
//Step 6: make sure all tests pass successfully

const chai = require('chai');
const request = require('supertest');
const app = require('../app'); // import the express app
const expect = chai.expect; // chai expect for assertions
// describe block for grouping related tests
describe('GET /', () => {
    it('should return Hello World!', (done) => {
        request(app)    
            .get('/')
            .end((err, res) => {
                expect(res.status).to.equal(200); // assert status code
                expect(res.text).to.equal('Hello World!'); // assert response text
                done();
            }
        );
    });
});
//In above code we have written a simple test case to check if the root route (/) returns "Hello World!" with a 200 status code. We used supertest to make a GET request to the app and chai to assert the response. The tests can be run using the command "npm test" as defined in package.json.

//Further  testing can be done for following : 
// 1. Testing other routes and endpoints
// 2. Testing with different HTTP methods (POST, PUT, DELETE, etc.)
// 3. Testing with various input data and query parameters
// 4. Testing error handling and edge cases
// 5. Integration testing with databases or external services
// 6. Performance testing for response times and load handling.

// Testing for specific routes includes following steps :
// 1. Define the route in your Express app (e.g., /api/users).
// 2. Write test cases using supertest to make requests to that route.
// 3. Use chai assertions to verify the response status, body, and headers.( most commonly used assertions are to check for status codes, response body content, and headers)
// 4. Test different scenarios such as valid inputs, invalid inputs, and edge cases.
// 5. Run the tests and ensure they pass successfully.

// Example for testing a specific route /api/users
describe('GET /api/users', () => {
    it('should return a list of users', (done) => {
        request(app)
            .get('/api/users')  
            .end((err, res) => {
                expect(res.status).to.equal(200); // assert status code
                expect(res.body).to.be.an('array'); // assert response body is an array
                done();
            }
        );
    });
});
// In this example, we are testing the /api/users route to ensure it returns a list of users with a 200 status code and that the response body is an array.

// Example for testing a middleware that adds a custom header
describe('Middleware Test', () => {
    it('should add a custom header', (done) => {    
        request(app)
            .get('/some-route') // route that uses the middleware
            .end((err, res) => {
                expect(res.headers).to.have.property('x-custom-header'); // assert custom header exists
                done();
            }
        );
    }   
    );
});
// In this example, we are testing a middleware that adds a custom header (x-custom-header) to the response. 
// We make a request to a route that uses the middleware and assert that the custom header is present in the response headers.