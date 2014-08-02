

/*
NxVideo3D
*/

var Obj3D = function( type, pos ) {
	
	//group = new THREE.Object3D();
	//group.position.y = 50;
	//scene.add( group );
 
	//function CreateVideoTexture(){
		
		this.videoElement = document.createElement( 'video' );
		this.videoElement.controls = true;
		
		this.videoElement.width = 426;
		this.videoElement.height = 240;
		// this.videoElement.volume	= 0; 
		this.videoElement.volume	= 1;
		this.videoElement.autoplay	= true;
		this.videoElement.loop	= true;
		// video.id = 'video';
		// video.type = ' video/ogg; codecs="theora, vorbis" ';
		this.videoElement.src = "videos/0"+ (type+1) +"_alpha.webm";
		this.videoElement.load(); // must call after setting/changing source
		this.videoElement.play();
		
		
		this.videoElement.playbackRate = 1.0;
		//this.videoElement.mozPreservesPitch = false;

		this.videoImage = document.createElement( 'canvas' );
		this.videoImage.width = 426;
		this.videoImage.height = 240;
	
		this.videoImageContext = this.videoImage.getContext( '2d' );
		// background color if no video present
		this.videoImageContext.fillStyle = '#000000';
		this.videoImageContext.fillRect( 0, 0, this.videoImage.width, this.videoImage.height );
	
		this.videoTexture = new THREE.Texture( this.videoImage );
		this.videoTexture.minFilter = THREE.LinearFilter;
		this.videoTexture.magFilter = THREE.LinearFilter;
		
	//	return this.videoTexture;						
		
	//}

	
	
		
	
	function CreateShaderMaterial() {

		return shaderMaterial;
		
	}
		
		
	
	function addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s ) {
	
			
		var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );	
		//geometry.computeTangents();							
		return geometry;
	
	
	}
	
	var extrudeSettings = { amount: 20, UVGenerator: BoundingUVGenerator };  
	extrudeSettings.bevelEnabled = true;
	extrudeSettings.bevelSegments = 2;
	extrudeSettings.steps = 2;
	
	
	var geo;
	switch (type)  { 
		case 0: 
			//geo = new THREE.SphereGeometry( 20, 32, 16 );
			var starPoints = [];
			starPoints.push( new THREE.Vector2 (   0,  50 ) );
			starPoints.push( new THREE.Vector2 (  10,  10 ) );
			starPoints.push( new THREE.Vector2 (  40,  10 ) );
			starPoints.push( new THREE.Vector2 (  20, -10 ) );
			starPoints.push( new THREE.Vector2 (  30, -50 ) );
			starPoints.push( new THREE.Vector2 (   0, -20 ) );
			starPoints.push( new THREE.Vector2 ( -30, -50 ) );
			starPoints.push( new THREE.Vector2 ( -20, -10 ) );
			starPoints.push( new THREE.Vector2 ( -40,  10 ) );
			starPoints.push( new THREE.Vector2 ( -10,  10 ) );
			var starShape = new THREE.Shape( starPoints );
			geo = addShape( starShape, extrudeSettings, 0xffee00, -180, 0, 0, 0, 0, 0, 1 );	 					

			break; 
		case 1: 
			geo = new THREE.SphereGeometry( 40, 32, 16 );
							
			break; 
		case 2: 
			var triangleShape = new THREE.Shape();
			triangleShape.moveTo(  80, 20 );
			triangleShape.lineTo(  40, 80 );
			triangleShape.lineTo( 120, 80 );
			triangleShape.lineTo(  80, 20 ); // close path
			geo = addShape( triangleShape, extrudeSettings, 0xffee00, -180, 0, 0, 0, 0, 0, 1 );
								
			break;
		case 3:

			
			var arcShape = new THREE.Shape();
			arcShape.moveTo( 50, 10 );
			arcShape.absarc( 10, 10, 40, 0, Math.PI*2, false );
			geo = addShape( arcShape, extrudeSettings, 0xffee00, -180, 0, 0, 0, 0, 0, 1 );			
			// geo = new THREE.CylinderGeometry( 25, 75, 100, 40, 5 );

			break;			
		case 4:
			var fishShape = new THREE.Shape();
			fishShape.moveTo(0,100);
			fishShape.quadraticCurveTo(-170, 0, 0, -100);
			fishShape.moveTo(4,-100);
			fishShape.quadraticCurveTo(-80, 0, 4, 100);
			geo = addShape( fishShape, extrudeSettings, 0xffee00, -180, 0, 0, 0, 0, 0, 1 );
			break;	
		case 5: 
			var triangleShape = new THREE.Shape();
			triangleShape.moveTo(  0, 100 );
			triangleShape.lineTo(  -100, 0 );
			triangleShape.lineTo( 0, -100 );
			triangleShape.lineTo(  100, 0 ); // close path
			triangleShape.lineTo(  0, 100 ); // close path
			geo = addShape( triangleShape, extrudeSettings, 0xffee00, -180, 0, 0, 0, 0, 0, 1 );
			break;	
		case 6: 
			var rectLength = 120, rectWidth = 20;
			var rectShape = new THREE.Shape();
			rectShape.moveTo( 0,0 );
			rectShape.lineTo( 0, rectWidth );
			rectShape.lineTo( rectLength, rectWidth );
			rectShape.lineTo( rectLength, 0 );
			rectShape.lineTo( 0, 0 );
			geo = addShape( rectShape, extrudeSettings, 0xffee00, -180, 0, 0, 0, 0, 0, 1 );
			break; 
		case 7: 
			var sqLength = 80;
			var squareShape = new THREE.Shape();
			squareShape.moveTo( 0,0 );
			squareShape.lineTo( 0, sqLength );
			squareShape.lineTo( sqLength, sqLength );
			squareShape.lineTo( sqLength, 0 );
			squareShape.lineTo( 0, 0 );	
			geo = addShape( squareShape, extrudeSettings, 0x0055ff, 150, 100, 0, 0, 0, 0, 1 );	
			break; 
		default:  
			 alert("No object bound to this type !");
	} 
 
 
	//  multi material
	//var materials = [
   //         new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( "images/spectrum.jpg") } ),
   //         new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( "images/spectrum.jpg")  } )
   // ];
	//this.MatSphere  = new THREE.MeshFaceMaterial(materials);
	
	

	// plane mode	
	geo = new THREE.PlaneGeometry(426, 240, 42, 24);
	geo.computeTangents();
	
	
	///
	
	var mDispTexture = new THREE.ImageUtils.loadTexture("images/shaders/rough.jpg");
	var mDiffTexture = this.videoTexture;//CreateVideoTexture();//new THREE.ImageUtils.loadTexture("images/menu_icon7.png");
	
	
	//var shader = THREE.ShaderLib[ "normalmap" ];
	// var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
	
	// uniforms[ "enableDisplacement" ].value = true;
	// uniforms[ "enableDiffuse" ].value = true;
	// uniforms[ "tDisplacement" ].value = mDiffTexture;//mDispTexture;
	// uniforms[ "tDiffuse" ].value = mDiffTexture;
	// uniforms[ "uDisplacementScale" ].value = 50;
	
	//var parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms, lights: true, wireframe: false };
	//var shaderMaterial = new THREE.ShaderMaterial( parameters ); 
	
	
	
	var ambient = 0xFFFFFF;
	var diffuse = 0xffffff;
	var specular = 0xff0000;
	var shininess = 20;
	var shader = THREE.ShaderLib[ "normalmap" ];
	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );
	
	this.uniforms[ "enableAO" ].value = false;
	this.uniforms[ "enableDiffuse" ].value = true;
	this.uniforms[ "enableSpecular" ].value = true;
	this.uniforms[ "enableReflection" ].value = false;
	this.uniforms[ "enableDisplacement" ].value = true;
	
	// this.uniforms[ "tNormal" ].value = THREE.ImageUtils.loadTexture("images/shaders/rough2.jpg" );
	//  this.uniforms[ "uNormalScale" ].value.set(1,1);
	this.uniforms[ "tDiffuse" ].value =   mDiffTexture  ;
	this.uniforms[ "tSpecular" ].value =  mDiffTexture  ;
	
	this.uniforms[ "tDisplacement" ].value = THREE.ImageUtils.loadTexture("images/shaders/displacement.jpg" );//mDiffTexture; 
	this.uniforms[ "uDisplacementBias" ].value = 0.2;//- 0.428408 ;
	this.uniforms[ "uDisplacementScale" ].value = 0;		  
	
	
	// this.uniforms[ "uPointLightPos"] = { type: "v3", value: new THREE.Vector3(0,0,0) },
	// this.uniforms[ "uPointLightColor" ] = {type: "c", value: new THREE.Color( rgbToHex(255,0,0 ) )};		  
	
	this.uniforms[ "uDiffuseColor" ].value.setHex( diffuse );
	this.uniforms[ "uSpecularColor" ].value.setHex( specular );
	this.uniforms[ "uAmbientColor" ].value.setHex( ambient );
	this.uniforms[ "uShininess" ].value = shininess;
	
	this.uniforms[ "uDiffuseColor" ].value.convertGammaToLinear();
	this.uniforms[ "uSpecularColor" ].value.convertGammaToLinear();
	this.uniforms[ "uAmbientColor" ].value.convertGammaToLinear(); 
	
	var standShaderParams = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms:  this.uniforms, lights: true, fog: false };
	var shaderMaterial = new THREE.ShaderMaterial( standShaderParams );	
	
	
	
	// ici faire l'interaction avec les objet rugueux
	
	
	
	
	///	

	
	this.MatSphere = shaderMaterial;//CreateShaderMaterial();
	this.MatSphere.opacity = 1.0;
	this.MatSphere.transparent = true;

	this.mesh1 = new THREE.Mesh( geo, this.MatSphere );
	this.mesh1.position.set( pos.x, pos.y, pos.z );
	var s = 1;
	this.mesh1.scale.set( s, s, s );							
	
	
	
	
	//this.MatSphere = CreateShaderMaterial();
	//this.MatSphere.opacity = 1.0;
	//this.MatSphere.transparent = false;

	//this.mesh1 = new THREE.Mesh( geo, this.MatSphere );
	//this.mesh1.position.set( pos.x, pos.y, pos.z );
	//var s = 1;
	//this.mesh1.scale.set( s, s, s );
	
	 
	
	
	scene.add( this.mesh1 );
	
	// for raycast
	objects.push( this.mesh1 );
	
	this.SetPosition = function ( pos ) {
		 this.mesh1.position.set( pos.x, pos.y, pos.z );		
	}
	 
	this.GetPosition = function () {
		return this.mesh1.position;
	}
	
	this.Delete = function () {
		scene.remove( this.mesh1 );	
	}	
	
	// this.Update = function( ) {
	
	//	if ( this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA ) 
	//	{
	//		this.videoImageContext.drawImage( this.videoElement, 0, 0 );
	//		if ( this.videoTexture ) 
	//			this.videoTexture.needsUpdate = true;
	//	}
	//} 		
	
}
			
function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
			
Obj3D.prototype.SetColor = function( r, g, b ) {
	// this.uniforms[ "uDiffuseColor" ].value.setHex( rgbToHex(r,g,b ) );
	// this.uniforms[ "uSpecularColor" ].value.setHex( rgbToHex(r,g,b ) );
	this.uniforms[ "uAmbientColor" ].value.setHex( rgbToHex(r,g,b ) );
	// this.uniforms[ "uDiffuseColor" ].value.convertGammaToLinear();
	// this.uniforms[ "uSpecularColor" ].value.convertGammaToLinear();
	this.uniforms[ "uAmbientColor" ].value.convertGammaToLinear(); 				
};
			
Obj3D.prototype.SetAmbient = function( r, g, b ) {
	 this.MatSphere.ambient.setHex( rgbToHex(r,g,b ) ); 
};

Obj3D.prototype.SetSpecular = function( r, g, b ) {
	 this.MatSphere.specular.setHex( rgbToHex(r,g,b ) ); 
};

Obj3D.prototype.SetShininess = function( shine ) {
	 this.MatSphere.shininess = shine;
};

Obj3D.prototype.SetSelected = function( selected ) {
	//this.MatSphere.color.setHex( rgbToHex(255,0,0 ) ); 
};

Obj3D.prototype.SetScale = function( x, y ) {

	this.mesh1.scale.set( x , y, 1 ); 
};			

Obj3D.prototype.SetDisplacement = function( value ) {
	 this.uniforms[ "uDisplacementScale" ].value = value;	 
};		


Obj3D.prototype.GetDisplacement = function( ) {
	 return this.uniforms[ "uDisplacementScale" ].value;	 
};		

Obj3D.prototype.GetVideoElement = function( selected ) {
	return this.videoElement;
};			

Obj3D.prototype.Update = function( ) {
	if ( this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA )  {
		this.videoImageContext.clearRect( 0, 0, this.videoImage.width, this.videoImage.height );//clear for transparency videos
		this.videoImageContext.drawImage( this.videoElement, 0, 0 );
		if ( this.videoTexture ) {
			this.videoTexture.needsUpdate = true;
		}
	}
};