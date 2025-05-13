# API Tests

This directory contains unit tests for the API utility functions used in the application.

## Overview

The tests cover:

1. `createUser.ts` - Function for registering new users
2. `loginUser.ts` - Function for authenticating users
3. `extractLoginResponse.ts` - Utility for processing JWT tokens

## Setup

To run these tests, you need to install the required dependencies:

```bash
npm install --save-dev axios-mock-adapter
```

## Running the Tests

To run all the API tests:

```bash
npm test -- src/tests/api
```

To run specific test files:

```bash
# Test user creation
npm test -- src/tests/api/createUser.test.ts

# Test user login
npm test -- src/tests/api/loginUser.test.ts

# Test JWT token extraction
npm test -- src/tests/api/extractLoginResponse.test.ts
```

## Test Approach

### Mocks

These tests use mock implementations for external dependencies:

- `axios-mock-adapter` for mocking HTTP requests
- Jest mock functions for `jwtDecode`, store dispatch, etc.
- Mock implementations of environment variables

### Test Scenarios

Each API utility is tested for:

1. **Happy Path**: When the API call is successful
2. **Error Handling**: When the API returns an error status
3. **Network Failures**: When a network error occurs
4. **Data Validation**: Ensuring the correct data is sent to and processed from the API

### Key Test Assertions

- Verify that the correct API endpoints are called with proper data
- Confirm that error handling works as expected
- Ensure that JWT tokens are properly processed
- Verify that the Redux store is updated correctly on successful login
- Confirm that sensitive fields (like confirmPassword) are not sent to the API
