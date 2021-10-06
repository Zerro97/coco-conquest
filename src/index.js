// Inject css into DOM using webpack
import './index.css';

// From Ecsy Library
import { world } from './app/App';

// Run!
function run() {	let imageObject = new Image(50, 50);
	// Compute delta and elapsed time
	var time = performance.now();
	var delta = time - lastTime;

	// Run all the systems
	world.execute(delta, time);

	lastTime = time;
	requestAnimationFrame(run);
}

var lastTime = performance.now();
run();    