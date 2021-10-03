const path = require('path');

module.exports = {
	rootDir: path.join(process.cwd(), 'src'),
	collectCoverage: true,
	coverageDirectory: '../coverage/',
	verbose: true
};