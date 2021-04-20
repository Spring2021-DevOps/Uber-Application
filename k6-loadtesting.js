import { check, sleep } from 'k6';
import http from 'k6/http';

export default function () {
  var r = http.get(`http://${__ENV.PY_HOST}:${__ENV.PY_PORT}/health`);
  check(r, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(5);
}


//k6 run -e PY_HOST=python_host -e PY_PORT=5000 --vus 10 --duration 30s k6-loadtesting.js