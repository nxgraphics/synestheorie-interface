
/* 
NxEntity 3D

*/


var Entity3D = function( type/*, filename*/, pos ) { 

	this.CurrentTransform = { x: pos.x, y: pos.y, z: pos.z  };
	
	this.mObject3D = new Obj3D( type , pos );
	
	this.mSound3D = new Sound3D( type, pos, this.mObject3D.GetVideoElement() );
	
	this.mSound3D.SetPosition(pos);
	
	

	// PlayAnimation( this );
	
	this.Delete = function () {
		
		this.mSound3D.Delete();
		this.mObject3D.Delete();	
	}

/*
	this.SetPosition = function ( pos ) {
		
		//keep object in composition boundaries
		if( pos.x >= 0 && pos.x <= mSceneWidth ) { 
			if( pos.y >= 0 && pos.y <= mSceneHeight ) { 
			 this.mSound3D.SetPosition( pos );
			 this.mObject3D.SetPosition( pos );
			}
		}		
	}*/
	
	this.GetObjectPosition = function () {
		return this.mObject3D.GetPosition();			
	}
	
	this.GetSoundPosition = function () {
		return this.mSound3D.GetPosition();			
	}
	
	this.SetVisible = new function( visible ) {
		
	}
	
	this.SetAudible = new function( audible ) {
		
	}

}


Entity3D.prototype.SetPosition = function( pos ) {
	//keep object in composition boundaries
	if( pos.x >= 0 && pos.x <= mSceneWidth ) { 
		if( pos.y >= 0 && pos.y <= mSceneHeight ) { 
		 this.mSound3D.SetPosition( pos );
		 this.mObject3D.SetPosition( pos );
		}
	}
};


Entity3D.prototype.SetPresLoinFrequency = function( val ) {
	this.mSound3D.SetPresLoinFrequency( val );
};

Entity3D.prototype.SetSoundPlaybackRate = function( rate ) {
	this.mSound3D.SetPlaybackRate( rate );
};

Entity3D.prototype.SetVideoColor = function( r,g,b ) {
	this.mObject3D.SetColor( r,g,b );
};

Entity3D.prototype.SetSelected = function( selected ) {
	this.mObject3D.SetSelected( selected );
};

Entity3D.prototype.SetScale = function( x , y ) {
	this.mObject3D.SetScale( x , y );
};	

Entity3D.prototype.SetAudioGain = function( gain ) {
	this.mSound3D.SetAudioGain( gain );
};	

Entity3D.prototype.GetAudioGain = function() {
	return this.mSound3D.GetAudioGain();
};	
		


Entity3D.prototype.OnUpdate = function() {
		 
	var mCurrentX = this.CurrentTransform.x;
	var mCurrentY = this.CurrentTransform.y;
	var mCurrentZ = this.CurrentTransform.z;
 
	this.SetPosition( new THREE.Vector3( mCurrentX, mCurrentY, mCurrentZ ) );
	
	//var amount = 500 * ( 1000/ Math.abs(mCurrentZ) ); //(min frequence * max object distance / current distance)
	//this.mSound3D.SetPresLoinFrequency(  amount  ); not needed anymore
	this.mSound3D.SetPlaybackRate( mCurrentY * 2 / mSceneHeight  );		
	
	
	
	  
}

Entity3D.prototype.OnEntityMoved = function() {
	
	this.CurrentTransform.x = this.mObject3D.mesh1.position.x;
	this.CurrentTransform.y = this.mObject3D.mesh1.position.y;
	this.CurrentTransform.z = this.mObject3D.mesh1.position.z;
	  
	this.OnUpdate();

};

Entity3D.prototype.SetDisplacement = function( val ) {  
	this.mObject3D.SetDisplacement( val );
};

Entity3D.prototype.GetDisplacement = function() {  
	return this.mObject3D.GetDisplacement( );
};

Entity3D.prototype.Update = function() { // for video texture update
	this.mObject3D.Update();
};		