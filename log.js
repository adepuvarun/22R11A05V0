const axios = require('axios');

const Log = async (stack, level, packageName, message) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMnIxMWEwNXYwQGdjZXQuZWR1LmluIiwiZXhwIjoxNzU0MTE4ODU4LCJpYXQiOjE3NTQxMTc5NTgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJjMzQxMzkyYi02ZmU2LTQ2N2QtYTlmZS0zZDVlZDc2NWE4ZTYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhZGVwdSB2YXJ1biIsInN1YiI6ImJlMjk4NDc5LWU0OTYtNGI0NC05M2MyLWQ1NjVlYmFjY2YzNyJ9LCJlbWFpbCI6IjIycjExYTA1djBAZ2NldC5lZHUuaW4iLCJuYW1lIjoiYWRlcHUgdmFydW4iLCJyb2xsTm8iOiIyMnIxMWEwNXYwIiwiYWNjZXNzQ29kZSI6InpmVHF2ZyIsImNsaWVudElEIjoiYmUyOTg0NzktZTQ5Ni00YjQ0LTkzYzItZDU2NWViYWNjZjM3IiwiY2xpZW50U2VjcmV0Ijoid2JLVUdSUFFTaFl6VmVaWCJ9._-wZY4Jt4-28FYJxbWE-Ts4A7FYWXaYQlwKLFbqAqaE";

  try {
    await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      { stack, level, package: packageName, message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
};

module.exports = Log;