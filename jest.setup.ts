// jest.setup.js
import '@testing-library/jest-dom';

// Make Jest globals available
global.jest = jest;
global.describe = describe;
global.it = it;
global.test = test;
global.expect = expect;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.beforeAll = beforeAll;
global.afterAll = afterAll;
