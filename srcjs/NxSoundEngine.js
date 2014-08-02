
/*
Sound Engine



*/

var SoundEngine = function() {
	
	// if (window.hasOwnProperty('AudioContext') && !window.hasOwnProperty('webkitAudioContext')) {
	//	window.webkitAudioContext = AudioContext;
	//	}
	
	 
	
	// Detect if the audio context is supported.
	window.AudioContext = ( window.AudioContext || window.webkitAudioContext || null );
	if (!AudioContext) { throw new Error("AudioContext not supported!"); } 
	// Create a new audio context.
	AudioCtx = new AudioContext();	
}