const { deterministicPartitionKey } = require('./file-containing-function');

describe('deterministicPartitionKey', () => {
  test('returns a string', () => {
    const result = deterministicPartitionKey({});
    expect(typeof result).toBe('string');
  });

  test('returns a default key if event is falsy', () => {
    const result = deterministicPartitionKey(null);
    expect(result).toBe('O');
  });

  test('returns a hash if event is provided', () => {
    const event = { name: 'John' };
    const result = deterministicPartitionKey(event);
    expect(result).not.toBe('O');
  });

  test('returns a string hash if candidate is not a string', () => {
    const event = { data: Buffer.from('hello') };
    const result = deterministicPartitionKey(event);
    expect(typeof result).toBe('string');
  });

  test('returns a hash if candidate length is too long', () => {
    const event = { data: 'a'.repeat(300) };
    const result = deterministicPartitionKey(event);
    expect(result.length).toBe(128);
  });
});
