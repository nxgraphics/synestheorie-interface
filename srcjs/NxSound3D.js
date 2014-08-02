
/*
NxSound3D
*/



var Sound3D = function( type, pos, videoele ) {
 
 /*
	var filename;
	switch (type)  { 
		case 0: 
			filename = "sounds/Crystal-A01.ogg"; 
			break; 
		case 1: 
			filename = "sounds/Doum-A01.ogg";
			break; 
		case 2: 
			filename = "sounds/HoumSu-A01.ogg";
			break;
		case 3: 
			filename = "sounds/Huchuhu-A01.ogg";
			break;			
		case 4: 
			filename = "sounds/Parrll-A01.ogg";
			break;	
		case 5: 
			filename = "sounds/Todetode-A01.ogg";
			break;	
		case 6: 
			filename = "sounds/Touhoaouhoaou-A02.ogg";
			break;			
		case 7: 
			filename = "sounds/Trrodap-A01.ogg";
			break;	
			
		default:  
			 alert("No sound bound to this type !");
	} 	*/			
	


	this.mSoundPosition = new THREE.Vector3(pos.x,pos.y,pos.z);
	// Create an object with a sound source and a volume control.
	var sound = {};
	
	var useAudioFiles = false;
	
	if(  useAudioFiles ){ 
	
	 /* uncomment to use audio files */
	 this.source = AudioCtx.createBufferSource();
	 this.source.loop = true;
	 this.source.playbackRate.value = 1.0;	
	
	}else{ 
	
	 this.source = AudioCtx.createMediaElementSource(videoele);
	// this.source.playbackRate.value = 2.0;
	 //this.source.preservesPitch = false;	
	
	}
  

	sound.sourcestore = this.source; 
	//sound.volume = AudioCtx.createGain();
	//sound.volume.gain = 0;

/*
sound.panner = AudioCtx.createPanner();
//enum DistanceModelType { "linear", "inverse", "exponential" }; 
sound.panner.distanceModel =  "linear";//"inverse";//"linear";//"linear"; 
sound.panner.panningModel = "HRTF";
sound.panner.setPosition( pos.x, pos.y, pos.z);
sound.panner.rolloffFactor = 0.9;
// rolloffFactor - Describes how quickly the volume is reduced as source moves away from listener. The default value is 1. 
sound.panner.refDistance = 0.8;
// refDistance - A reference distance for reducing volume as source move further from the listener. The default value is 1.  
sound.panner.maxDistance = 2.0;
// maxDistance - The maximum distance between source and listener, after which the volume will not be reduced any further. The default value is 10000.
sound.panner.coneInnerAngle = 360;	
//  coneInnerAngle - A parameter for directional audio sources, this is an angle, inside of which there will be no volume reduction. The default value is 360. 
sound.panner.coneOuterAngle = 360;
// coneOuterAngle - A parameter for directional audio sources, this is an angle, outside of which the volume will be reduced to a constant value of coneOuterGain. The default value is 360. 
sound.panner.coneOuterGain = 0;
// coneOuterGain -  A parameter for directional audio sources, this is the amount of volume reduction outside of the coneOuterAngle. The default value is 0. 
sound.panner.setOrientation(0,0,1,0,1,0 );
sound.panner.setVelocity(0, 0, 0);
	 */
	 
				
	// 
	 
	 				
	//this.source.connect(sound.panner);//sound.source.connect(sound.panner);
	this.source.loop = true; //sound.source.loop = true;
	
 
	// Audio Pitch Shift Node
	//http://stackoverflow.com/questions/13309567/how-to-shift-modulate-audio-buffer-frequency-using-web-audio-api
	var nSamples = 4096 ;
	var fftFrameSize = 256;	
	this.shiftValue  = pos.y * 2 / mSceneHeight;
 
	if(AudioCtx.createScriptProcessor) { // check between mozilla and chrome
		this.StereoNode = AudioCtx.createScriptProcessor(nSamples, 1,2);
	} else if(AudioCtx.createJavaScriptNode) { 
		this.StereoNode= context.createJavaScriptNode(nSamples, 1,2);
	} else { console.log('this.processorNode Error : no plateform found '); }

	 this.StereoNodeLeftGain = 1.0;
	 this.StereoNodeRightGain = 1.0;
 
	// only process one in mono then copy to left right ?? 
	this.shifterLeft = new Pitchshift(fftFrameSize, AudioCtx.sampleRate, 'FFT');
	//this.shifterRight = new Pitchshift(fftFrameSize, AudioCtx.sampleRate, 'FFT');
 
	this.StereoNode.onaudioprocess = function( event ) {
			// Get left/right input and output arrays
			var outLeftArray = [];
			outLeftArray[0] = event.outputBuffer.getChannelData(0);
			var outRightArray = [];
			outRightArray[0] = event.outputBuffer.getChannelData(1);
			
			var inputLeftArray = [];
			inputLeftArray[0] = event.inputBuffer.getChannelData(0);
			//var inputRightArray = [];
			//inputRightArray[0] = event.inputBuffer.getChannelData(1);
			
			//process left
			var dataLeft = inputLeftArray[0];
			
			this.shifterLeft.process (this.shiftValue, dataLeft.length, 4, dataLeft);
			var out_dataLeft = outLeftArray[0];
			var out_dataRight = outRightArray[0];
			for (i = 0; i < out_dataLeft.length; ++i) {
				out_dataLeft[i] = this.shifterLeft.outdata[i] * this.StereoNodeLeftGain;
				out_dataRight[i] = this.shifterLeft.outdata[i] * this.StereoNodeRightGain;
				//if( out_dataLeft[i] > 1.0 ) out_dataLeft[i] = 1.0;
			}	
			//process right
			//var dataRight = inputRightArray[0];
			//this.shifterRight.process (this.shiftValue, dataRight.length, 4, dataRight);
			//var out_dataRight = outRightArray[0];
			//for (i = 0; i < out_dataRight.length; ++i) {
			//	out_dataRight[i] = this.shifterRight.outdata[i] * this.StereoNodeRightGain;
				//if( out_dataRight[i] > 1.0 ) out_dataRight[i] = 1.0;
			//}				
				
 
			
		}.bind(this);	
	
	 
	this.mainVolume = AudioCtx.createGain();
	this.mainVolume.gain.value = 1; 
	this.source.connect(this.StereoNode );
	this.StereoNode.connect(this.mainVolume); 
	this.mainVolume.connect (AudioCtx.destination); 	
 
	
	if( useAudioFiles ){  // Load a sound file using an ArrayBuffer XMLHttpRequest.
	
	var soundFileName = filename; 	
	
	var request = new XMLHttpRequest();
	request.open("GET", soundFileName, true);
	request.responseType = "arraybuffer";
	request.onload = function(e) {
	
	  // Create a buffer from the response ArrayBuffer.
	  var buffer = AudioCtx.createBuffer(this.response, false);
	  sound.buffer = buffer;
	
	  // Make the sound source use the buffer and start playing it.
	  sound.sourcestore.buffer = sound.buffer;
	  sound.sourcestore.start(AudioCtx.currentTime);// START NOW
	  
	  
	};
	request.send(); 
	
	}
	
 
	  

	  

	this.Delete = function () {

		//this.filterPresLoin.disconnect(this.mainVolume);
		this.StereoNode.disconnect(this.mainVolume);//this.filterPresLoin);
		this.mainVolume.disconnect(AudioCtx.destination);

		//this.filterPresLoin = null;
		this.StereoNode = null;
		this.mainVolume = null;

	}
	
	/*
	this.SetPosition = function ( pos ) {

		this.mSoundPosition = pos;	
 
		this.StereoNodeRightGain = (pos.x / mSceneWidth);
		this.StereoNodeLeftGain =  1.0 - this.StereoNodeRightGain;
 
		// console.log('setting sound position : X:' + pos.x + ' Y:' + pos.y + ' Z:'+pos.z);	
	}*/
	
	this.GetPosition = function () {
		return this.mSoundPosition;	
	}

	this.Setlooping = function ( loop ) {
		sound.source.loop = loop;	
	}
	
		

}

Sound3D.prototype.SetPosition = function( pos ) {
		this.mSoundPosition = pos;	
 
		this.StereoNodeRightGain = (pos.x / mSceneWidth);
		this.StereoNodeLeftGain =  1.0 - this.StereoNodeRightGain;
 
		// console.log('setting sound position : X:' + pos.x + ' Y:' + pos.y + ' Z:'+pos.z);
};

Sound3D.prototype.SetPlaybackRate = function( rate ) {
	//this.source.playbackRate.value = rate;
	this.shiftValue = rate;
};

Sound3D.prototype.SetPresLoinFrequency = function( val ) {
	//this.filterPresLoin.frequency.value = val;
};

Sound3D.prototype.SetAudioGain = function( gain ) {
	this.mainVolume.gain.value = gain; 
	console.log('set audio gain : ' + gain);
};	

Sound3D.prototype.GetAudioGain = function() {
	return this.mainVolume.gain.value ; 
};			
			