#!/usr/bin/env node

const http = require('http');

async function testEndpoint(method, path, headers = {}, body = null) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          console.log(`\n✓ ${method} ${path}`);
          console.log(`Status: ${res.statusCode}`);
          console.log(`Response: ${data.substring(0, 200)}`);
          resolve({ status: res.statusCode, data });
        } catch (e) {
          console.log(`Error parsing: ${e.message}`);
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', (e) => {
      console.log(`✗ ${method} ${path}: ${e.code || e.message}`);
      resolve({ error: e.message, code: e.code });
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('Testing endpoints on http://localhost:3000\n');

  // Wait for server to be ready
  let ready = false;
  for (let i = 0; i < 5; i++) {
    try {
      const res = await testEndpoint('GET', '/api/health');
      if (res.status === 200) {
        ready = true;
        break;
      }
    } catch (e) {}
    if (i < 4) await new Promise(r => setTimeout(r, 2000));
  }

  if (!ready) {
    console.log('✗ Server not responding');
    process.exit(1);
  }

  console.log('\nServer is responding!\n');

  // Test endpoints
  await testEndpoint('GET', '/api/health');
  await testEndpoint('POST', '/api/newsletter/subscribe', {}, { email: 'test@example.com' });
  await testEndpoint('GET', '/api/admin/products');
  await testEndpoint('OPTIONS', '/api/newsletter/subscribe');

  console.log('\n✓ Tests completed');
}

runTests().catch(e => {
  console.error('Test error:', e);
  process.exit(1);
});
