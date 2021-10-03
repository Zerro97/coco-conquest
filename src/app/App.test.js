import { hello } from './App';

test('A simple test to see if jest is working', () => {
	expect(hello()).toBe('Hello World');
	expect(hello()).not.toBe('Not hello');
});