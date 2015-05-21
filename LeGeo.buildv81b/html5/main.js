
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_DATABUFFER_IMPLEMENTED="1";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CONFIG="debug";
CFG_HOST="winnt";
CFG_HTML5_WEBAUDIO_ENABLED="1";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_SPINE_ATLAS_ROTATE="0";
CFG_SPINE_DEBUG_RENDER="1";
CFG_TARGET="html5";
CFG_TEST="spineboy";
CFG_TEXT_FILES="*.atlas|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[banana.png];type=image/png;width=128;height=128;\n[bounding_boxes_skeleton.png];type=image/png;width=256;height=256;\n[events_skeleton.png];type=image/png;width=256;height=256;\n[faithful32x32.png];type=image/png;width=512;height=512;\n[goblins-ffd.png];type=image/png;width=256;height=512;\n[ik_skeleton.png];type=image/png;width=512;height=256;\n[mesh_skeleton.png];type=image/png;width=512;height=256;\n[powerup.png];type=image/png;width=512;height=256;\n[project/arm.png];type=image/png;width=367;height=168;\n[project/smile.png];type=image/png;width=128;height=128;\n[project/test.png];type=image/png;width=128;height=128;\n[simple_mesh_skeleton.png];type=image/png;width=256;height=256;\n[skeleton_mesh_rect.png];type=image/png;width=256;height=256;\n[skinned_mesh_skeleton.png];type=image/png;width=256;height=256;\n[smile_skeleton.png];type=image/png;width=256;height=256;\n[spineboy.png];type=image/png;width=1024;height=1024;\n[spines/spineboy.png];type=image/png;width=512;height=256;\n[mojo_font.png];type=image/png;width=864;height=13;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript Monkey runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Monkey Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function debugLog( str ){
	if( window.console!=undefined ) window.console.log( str );
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Monkey Exception"; 
}


function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBDisplayMode( width,height ){
	this.width=width;
	this.height=height;
}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "monkeystate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "monkeystate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.GetDeviceWidth=function(){
	return 0;
}

BBGame.prototype.GetDeviceHeight=function(){
	return 0;
}

BBGame.prototype.SetDeviceWindow=function( width,height,flags ){
}

BBGame.prototype.GetDisplayModes=function(){
	return new Array();
}

BBGame.prototype.GetDesktopMode=function(){
	return null;
}

BBGame.prototype.SetSwapInterval=function( interval ){
}

BBGame.prototype.PathToFilePath=function( path ){
	return "";
}

//***** js Game *****

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Monkey Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}


function BBHtml5Game( canvas ){
	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){
		this._gl=this._canvas.getContext( "webgl" );
		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl" );
		if( !this._gl ) this.Die( "Can't create WebGL" );
		gl=this._gl;
	}
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;
	if( this._suspended ) return;
	
	var game=this;
	var seq=game._timerSeq;
	
	var maxUpdates=4;
	var updateRate=this._updateRate;
	
	if( !updateRate ){

		var reqAnimFrame=(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
	
		if( reqAnimFrame ){
			function animate(){
				if( seq!=game._timerSeq ) return;
	
				game.UpdateGame();
				if( seq!=game._timerSeq ) return;
	
				reqAnimFrame( animate );
				game.RenderGame();
			}
			reqAnimFrame( animate );
			return;
		}
		
		maxUpdates=1;
		updateRate=60;
	}
	
	var updatePeriod=1000.0/updateRate;
	var nextUpdate=0;

	function timeElapsed(){
		if( seq!=game._timerSeq ) return;
		
		if( !nextUpdate ) nextUpdate=Date.now();
		
		for( var i=0;i<maxUpdates;++i ){
		
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			nextUpdate+=updatePeriod;
			var delay=nextUpdate-Date.now();
			
			if( delay>0 ){
				setTimeout( timeElapsed,delay );
				game.RenderGame();
				return;
			}
		}
		nextUpdate=0;
		setTimeout( timeElapsed,0 );
		game.RenderGame();
	}

	setTimeout( timeElapsed,0 );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "monkey://data/" )!=0 ) return "";
	path=path.slice(14);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "monkey:" )!=0 ){
		return path;
	}else if( path.indexOf( "monkey://data/" )==0 ) {
		return "data/"+path.slice( 14 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

BBHtml5Game.prototype.GetDeviceWidth=function(){
	return this._canvas.width;
}

BBHtml5Game.prototype.GetDeviceHeight=function(){
	return this._canvas.height;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	BBGame.prototype.RenderGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var xscale=1;
	var yscale=1;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}
	
	canvas.onclick=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		eatEvent( e );
		return;
	}
	
	canvas.oncontextmenu=function( e ){
		return false;
	}
	
	canvas.ontouchstart=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}
	}
	
	canvas.onblur=function( e ){
		for( var i=0;i<256;++i ) game.KeyEvent( BBGameEvent.KeyUp,i );
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}
	
	canvas.updateSize=function(){
		xscale=canvas.width/canvas.clientWidth;
		yscale=canvas.height/canvas.clientHeight;
		game.RenderGame();
	}
	
	canvas.updateSize();
	
	canvas.focus();
	
	game.StartGame();

	game.RenderGame();
}


function BBMonkeyGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBMonkeyGame.prototype=extend_class( BBHtml5Game );

BBMonkeyGame.Main=function( canvas ){

	var game=new BBMonkeyGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}


// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

// ***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	game.IncLoading();

	var image=new Image();
	image.onload=function(){ game.DecLoading(); }
	image.onerror=function(){ game.DecLoading(); }
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;	
	this.gc.globalAlpha=this.alpha;	
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<2 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawPoly2=function( verts,surface,srx,srcy ){
	if( verts.length<4 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=4;i<verts.length;i+=4 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

// ***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

// ***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
}

if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

//print( "Using WebAudio!" );

// ***** WebAudio *****

var wa=null;

// ***** WebAudio gxtkSample *****

var gxtkSample=function(){
	this.waBuffer=null;
	this.state=0;
}

gxtkSample.prototype.Load=function( path ){
	if( this.state ) return false;

	var req=new XMLHttpRequest();
	
	req.open( "get",BBGame.Game().PathToUrl( path ),true );
	req.responseType="arraybuffer";
	
	var abuf=this;
	
	req.onload=function(){
		wa.decodeAudioData( req.response,function( buffer ){
			//success!
			abuf.waBuffer=buffer;
			abuf.state=1;
		},function(){
			abuf.state=-1;
		} );
	}
	
	req.onerror=function(){
		abuf.state=-1;
	}
	
	req.send();
	
	this.state=2;
			
	return true;
}

gxtkSample.prototype.Discard=function(){
}

// ***** WebAudio gxtkChannel *****

var gxtkChannel=function(){
	this.buffer=null;
	this.flags=0;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.waSource=null;
	this.waPan=wa.create
	this.waGain=wa.createGain();
	this.waGain.connect( wa.destination );
	this.waPanner=wa.createPanner();
	this.waPanner.rolloffFactor=0;
	this.waPanner.connect( this.waGain );
	this.startTime=0;
	this.offset=0;
	this.state=0;
}

// ***** WebAudio gxtkAudio *****

var gxtkAudio=function(){

	if( !wa ){
		window.AudioContext=window.AudioContext || window.webkitAudioContext;
		wa=new AudioContext();
	}
	
	this.okay=true;
	this.music=null;
	this.musicState=0;
	this.musicVolume=1;
	this.channels=new Array();
	for( var i=0;i<32;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.Suspend=function(){
	if( this.MusicState()==1 ) this.music.pause();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=1 ) continue;
		this.PauseChannel( i );
		chan.state=5;
	}
}

gxtkAudio.prototype.Resume=function(){
	if( this.MusicState()==1 ) this.music.play();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=5 ) continue;
		chan.state=2;
		this.ResumeChannel( i );
	}
}

gxtkAudio.prototype.LoadSample=function( path ){

	var sample=new gxtkSample();
	if( !sample.Load( BBHtml5Game.Html5Game().PathToUrl( path ) ) ) return null;
	
	return sample;
}

gxtkAudio.prototype.PlaySample=function( buffer,channel,flags ){

	if( buffer.state!=1 ) return;

	var chan=this.channels[channel];
	
	if( chan.state ){
		chan.waSource.onended=null
		chan.waSource.stop( 0 );
	}
	
	chan.buffer=buffer;
	chan.flags=flags;

	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}

	chan.offset=0;	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0 );

	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){

	var chan=this.channels[channel];
	if( !chan.state ) return;
	
	if( chan.state==1 ){
		chan.waSource.onended=null;
		chan.waSource.stop( 0 );
		chan.waSource=null;
	}

	chan.state=0;
}

gxtkAudio.prototype.PauseChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=1 ) return;
	
	chan.offset=(chan.offset+(wa.currentTime-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
	
	chan.waSource.onended=null;
	chan.waSource.stop( 0 );
	chan.waSource=null;
	
	chan.state=2;
}

gxtkAudio.prototype.ResumeChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=2 ) return;
	
	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=chan.buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(chan.flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}
	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0,chan.offset );

	chan.state=1;
}

gxtkAudio.prototype.ChannelState=function( channel ){
	return this.channels[channel].state & 3;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];

	chan.volume=volume;
	
	chan.waGain.gain.value=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];

	chan.pan=pan;
	
	var sin=Math.sin( pan*3.14159265359/2 );
	var cos=Math.cos( pan*3.14159265359/2 );
	
	chan.waPanner.setPosition( sin,0,-cos );
}

gxtkAudio.prototype.SetRate=function( channel,rate ){

	var chan=this.channels[channel];

	if( chan.state==1 ){
		//update offset for pause/resume
		var time=wa.currentTime;
		chan.offset=(chan.offset+(time-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
		chan.startTime=time;
	}

	chan.rate=rate;
	
	if( chan.waSource ) chan.waSource.playbackRate.value=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	if( this.musicState ) this.music.pause();
	this.music=new Audio( BBGame.Game().PathToUrl( path ) );
	this.music.loop=(flags&1)!=0;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.StopMusic=function(){
	if( !this.musicState ) return;
	this.music.pause();
	this.music=null;
	this.musicState=0;
}

gxtkAudio.prototype.PauseMusic=function(){
	if( this.musicState!=1 ) return;
	this.music.pause();
	this.musicState=2;
}

gxtkAudio.prototype.ResumeMusic=function(){
	if( this.musicState!=2 ) return;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.MusicState=function(){
	if( this.musicState==1 && this.music.ended && !this.music.loop ){
		this.music=null;
		this.musicState=0;
	}
	return this.musicState;
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.musicVolume=volume;
	if( this.musicState ) this.music.volume=volume;
}

}else{

//print( "Using OldAudio!" );

// ***** gxtkChannel class *****

var gxtkChannel=function(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

// ***** gxtkAudio class *****

var gxtkAudio=function(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
		if( !this.okay ) this.channels[i].state=-1;
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ){
			if( chan.audio.ended && !chan.audio.loop ){
				chan.state=0;
			}else{
				chan.audio.pause();
				chan.state=3;
			}
		}
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==3 ){
			chan.audio.play();
			chan.state=1;
		}
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return null;

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];

	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;

	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	if( chan.state==3 ) return 1;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state>0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

// ***** gxtkSample class *****

//function gxtkSample( audio ){
var gxtkSample=function( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
//			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
//				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

}


function BBThread(){
	this.result=null;
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.result=null;
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Result=function(){
	return this.result;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}


function BBAsyncImageLoaderThread(){
	this._running=false;
}

BBAsyncImageLoaderThread.prototype.Start=function(){

	var thread=this;

	thread._surface=null;
	thread._result=false;
	thread._running=true;

	var image=new Image();

	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread._result=true;
		thread._running=false;
	}
	
	image.onerror=function( e ){
		thread._running=false;
	}
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}

BBAsyncImageLoaderThread.prototype.IsRunning=function(){
	return this._running;
}



function BBAsyncSoundLoaderThread(){
	this._running=false;
}
  
if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	var req=new XMLHttpRequest();
	req.open( "get",BBGame.Game().PathToUrl( this._path ),true );
	req.responseType="arraybuffer";
	
	req.onload=function(){
		//load success!
		wa.decodeAudioData( req.response,function( buffer ){
			//decode success!
			thread._sample=new gxtkSample();
			thread._sample.waBuffer=buffer;
			thread._sample.state=1;
			thread._result=true;
			thread._running=false;
		},function(){	
			//decode fail!
			thread._running=false;
		} );
	}
	
	req.onerror=function(){
		//load fail!
		thread._running=false;
	}
	
	req.send();
}
	
}else{
 
BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var audio=new Audio();
	if( !audio ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	audio.src=BBGame.Game().PathToUrl( this._path );
	audio.preload='auto';	
	
	var success=function( e ){
		thread._sample=new gxtkSample( audio );
		thread._result=true;
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	var error=function( e ){
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	audio.addEventListener( 'canplaythrough',success,false );
	audio.addEventListener( 'error',error,false );
	
	//voodoo fix for Chrome!
	var timer=setInterval( function(){ if( !thread._running ) clearInterval( timer ); },200 );
	
	audio.load();
}

}
  
BBAsyncSoundLoaderThread.prototype.IsRunning=function(){
	return this._running;
}


function BBDataBuffer(){
	this.arrayBuffer=null;
	this.length=0;
}

BBDataBuffer.tbuf=new ArrayBuffer(4);
BBDataBuffer.tbytes=new Int8Array( BBDataBuffer.tbuf );
BBDataBuffer.tshorts=new Int16Array( BBDataBuffer.tbuf );
BBDataBuffer.tints=new Int32Array( BBDataBuffer.tbuf );
BBDataBuffer.tfloats=new Float32Array( BBDataBuffer.tbuf );

BBDataBuffer.prototype._Init=function( buffer ){
	this.arrayBuffer=buffer;
	this.length=buffer.byteLength;
	this.bytes=new Int8Array( buffer );	
	this.shorts=new Int16Array( buffer,0,this.length/2 );	
	this.ints=new Int32Array( buffer,0,this.length/4 );	
	this.floats=new Float32Array( buffer,0,this.length/4 );
}

BBDataBuffer.prototype._New=function( length ){
	if( this.arrayBuffer ) return false;
	
	var buf=new ArrayBuffer( length );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._Load=function( path ){
	if( this.arrayBuffer ) return false;
	
	var buf=BBGame.Game().LoadData( path );
	if( !buf ) return false;
	
	this._Init( buf );
	return true;
}

BBDataBuffer.prototype._LoadAsync=function( path,thread ){

	var buf=this;
	
	var xhr=new XMLHttpRequest();
	xhr.open( "GET",BBGame.Game().PathToUrl( path ),true );
	xhr.responseType="arraybuffer";
	
	xhr.onload=function(e){
		if( this.status==200 || this.status==0 ){
			buf._Init( xhr.response );
			thread.result=buf;
		}
		thread.running=false;
	}
	
	xhr.onerror=function(e){
		thread.running=false;
	}
	
	xhr.send();
}


BBDataBuffer.prototype.GetArrayBuffer=function(){
	return this.arrayBuffer;
}

BBDataBuffer.prototype.Length=function(){
	return this.length;
}

BBDataBuffer.prototype.Discard=function(){
	if( this.arrayBuffer ){
		this.arrayBuffer=null;
		this.length=0;
	}
}

BBDataBuffer.prototype.PokeByte=function( addr,value ){
	this.bytes[addr]=value;
}

BBDataBuffer.prototype.PokeShort=function( addr,value ){
	if( addr&1 ){
		BBDataBuffer.tshorts[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		return;
	}
	this.shorts[addr>>1]=value;
}

BBDataBuffer.prototype.PokeInt=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tints[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.ints[addr>>2]=value;
}

BBDataBuffer.prototype.PokeFloat=function( addr,value ){
	if( addr&3 ){
		BBDataBuffer.tfloats[0]=value;
		this.bytes[addr]=BBDataBuffer.tbytes[0];
		this.bytes[addr+1]=BBDataBuffer.tbytes[1];
		this.bytes[addr+2]=BBDataBuffer.tbytes[2];
		this.bytes[addr+3]=BBDataBuffer.tbytes[3];
		return;
	}
	this.floats[addr>>2]=value;
}

BBDataBuffer.prototype.PeekByte=function( addr ){
	return this.bytes[addr];
}

BBDataBuffer.prototype.PeekShort=function( addr ){
	if( addr&1 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		return BBDataBuffer.tshorts[0];
	}
	return this.shorts[addr>>1];
}

BBDataBuffer.prototype.PeekInt=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tints[0];
	}
	return this.ints[addr>>2];
}

BBDataBuffer.prototype.PeekFloat=function( addr ){
	if( addr&3 ){
		BBDataBuffer.tbytes[0]=this.bytes[addr];
		BBDataBuffer.tbytes[1]=this.bytes[addr+1];
		BBDataBuffer.tbytes[2]=this.bytes[addr+2];
		BBDataBuffer.tbytes[3]=this.bytes[addr+3];
		return BBDataBuffer.tfloats[0];
	}
	return this.floats[addr>>2];
}

function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<152>";
	if((bb_app__app)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<152>";
		error("App has already been created");
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<153>";
	bb_app__app=this;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<154>";
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<155>";
	bb_app__game.SetDelegate(bb_app__delegate);
	pop_err();
	return this;
}
c_App.prototype.p_OnResize=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnCreate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnResume=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnRender=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnClose=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<177>";
	bb_app_EndApp();
	pop_err();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<181>";
	this.p_OnClose();
	pop_err();
	return 0;
}
function c_MyApp(){
	c_App.call(this);
	this.m_timestamp=0;
	this.m_banana=null;
	this.implments={c_SpineEntityCallback:1};
}
c_MyApp.prototype=extend_class(c_App);
c_MyApp.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<68>";
	c_App.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<68>";
	pop_err();
	return this;
}
c_MyApp.prototype.p_OnCreate=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<91>";
	bb_app_SetUpdateRate(60);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<92>";
	this.m_timestamp=bb_app_Millisecs();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<93>";
	bb_LeGeo_sndJump=bb_audio_LoadSound("jump.mp3");
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<94>";
	bb_LeGeo_sndHitBlock=bb_audio_LoadSound("Wall_Hit.mp3");
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<98>";
	bb_audio_PlayMusic("Army_Strong.mp3",1);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<101>";
	bb_LeGeo_imgWorld=bb_graphics_LoadImage2("faithful32x32.png",32,32,256,c_Image.m_DefaultFlags);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<109>";
	this.m_banana=c_SpineMojoImageAttachment.m_new.call(new c_SpineMojoImageAttachment,"banana_attachment","monkey://data/banana.png");
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<112>";
	bb_LeGeo_spineDragon=bb_spinemojo_LoadMojoSpineEntity("monkey://data/goblins-ffd.json");
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<113>";
	bb_LeGeo_spineDragon.p_SetAnimation2("walk",true);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<115>";
	bb_LeGeo_spineDragon.p_SetSkin2("goblingirl");
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<117>";
	bb_LeGeo_spineDragon.p_SetScale2(0.4);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<118>";
	bb_LeGeo_spineDragon.p_SetSpeed(0.3);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<121>";
	bb_LeGeo_spineDragon.p_SetDebug(false,false);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<122>";
	bb_LeGeo_spineDragon.p_SetCallback(this);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<123>";
	bb_LeGeo_spineDragon.p_SetSnapToPixels(false);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<124>";
	bb_LeGeo_spineDragon.p_SetIgnoreRootPosition(false);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<125>";
	bb_LeGeo_spineDragon.p_SetFlip(true,false);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<127>";
	bb_LeGeo_spineDragon.p_SetAlpha(0.0);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<130>";
	try{
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<135>";
		bb_LeGeo_spineTest=bb_spinemojo_LoadMojoSpineEntity("monkey://data/spineboy.json");
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<136>";
		bb_LeGeo_spineTest.p_SetAnimation2("stand",true);
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<137>";
		bb_LeGeo_spineTest.p_SetScale2(0.1);
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<138>";
		bb_LeGeo_spineTest.p_SetSpeed(0.5);
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<197>";
		bb_LeGeo_spineTest.p_SetDebug(false,false);
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<198>";
		bb_LeGeo_spineTest.p_SetCallback(this);
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<199>";
		bb_LeGeo_spineTest.p_SetSnapToPixels(false);
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<200>";
		bb_LeGeo_spineTest.p_SetIgnoreRootPosition(false);
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<201>";
		bb_LeGeo_spineTest.p_SetFlip(false,false);
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<202>";
		bb_LeGeo_spineTest.p_SetPosition(((bb_app_DeviceWidth()/2)|0),((bb_app_DeviceHeight()/2)|0));
	}catch(_eek_){
		if(t_exception=object_downcast(_eek_,c_SpineException)){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<205>";
			error("Exception: "+(t_exception.p_ToString()));
		}else{
			throw _eek_;
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<209>";
	pop_err();
	return 0;
}
c_MyApp.prototype.p_OnRender=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<214>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<236>";
	bb_LeGeo_drawmap();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<237>";
	bb_LeGeo_p.p_draw();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<242>";
	bb_LeGeo_spineDragon.p_Render();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<243>";
	bb_LeGeo_spineTest.p_Render();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<265>";
	pop_err();
	return 0;
}
c_MyApp.prototype.p_OnUpdate=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<276>";
	if((bb_input_KeyHit(27))!=0){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<276>";
		this.p_OnClose();
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<279>";
	var t_newTimestamp=bb_app_Millisecs();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<280>";
	var t_deltaInt=t_newTimestamp-this.m_timestamp;
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<281>";
	var t_deltaFloat=(t_deltaInt)/1000.0;
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<282>";
	this.m_timestamp=t_newTimestamp;
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<289>";
	bb_LeGeo_spineTest.p_Update(t_deltaFloat);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<290>";
	bb_LeGeo_spineDragon.p_Update(t_deltaFloat);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<303>";
	if(bb_LeGeo_spineTest.p_PointInside(bb_input_MouseX(),bb_input_MouseY(),2)){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<304>";
		bb_LeGeo_spineTest.p_SetColor(255,0,0);
	}else{
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<306>";
		bb_LeGeo_spineTest.p_SetColor(255,255,255);
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<311>";
	bb_LeGeo_p.p_update();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<312>";
	bb_LeGeo_alignmap();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<320>";
	pop_err();
	return 0;
}
c_MyApp.prototype.p_OnSpineEntityAnimationComplete=function(t_entity,t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<78>";
	var t_1=t_entity;
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<79>";
	if(t_1==bb_LeGeo_spineTest){
	}
	pop_err();
}
c_MyApp.prototype.p_OnSpineEntityEvent=function(t_entity,t_event,t_intValue,t_floatValue,t_stringValue){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<85>";
	print("SpineEvent: "+t_event+" int:"+String(t_intValue)+" float:"+String(t_floatValue)+" string:"+t_stringValue);
	pop_err();
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<65>";
	pop_err();
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<75>";
	this.m__graphics=(new gxtkGraphics);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<76>";
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<77>";
	bb_graphics_SetFont(null,32);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<79>";
	this.m__audio=(new gxtkAudio);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<80>";
	bb_audio_SetAudioDevice(this.m__audio);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<82>";
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<83>";
	bb_input_SetInputDevice(this.m__input);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<85>";
	bb_app_ValidateDeviceWindow(false);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<87>";
	bb_app_EnumDisplayModes();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<89>";
	bb_app__app.p_OnCreate();
	pop_err();
}
c_GameDelegate.prototype.SuspendGame=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<93>";
	bb_app__app.p_OnSuspend();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<94>";
	this.m__audio.Suspend();
	pop_err();
}
c_GameDelegate.prototype.ResumeGame=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<98>";
	this.m__audio.Resume();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<99>";
	bb_app__app.p_OnResume();
	pop_err();
}
c_GameDelegate.prototype.UpdateGame=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<103>";
	bb_app_ValidateDeviceWindow(true);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<104>";
	this.m__input.p_BeginUpdate();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<105>";
	bb_app__app.p_OnUpdate();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<106>";
	this.m__input.p_EndUpdate();
	pop_err();
}
c_GameDelegate.prototype.RenderGame=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<110>";
	bb_app_ValidateDeviceWindow(true);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<111>";
	var t_mode=this.m__graphics.BeginRender();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<112>";
	if((t_mode)!=0){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<112>";
		bb_graphics_BeginRender();
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<113>";
	if(t_mode==2){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<113>";
		bb_app__app.p_OnLoading();
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<113>";
		bb_app__app.p_OnRender();
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<114>";
	if((t_mode)!=0){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<114>";
		bb_graphics_EndRender();
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<115>";
	this.m__graphics.EndRender();
	pop_err();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<119>";
	this.m__input.p_KeyEvent(t_event,t_data);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<120>";
	if(t_event!=1){
		pop_err();
		return;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<121>";
	var t_1=t_data;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<122>";
	if(t_1==432){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<123>";
		bb_app__app.p_OnClose();
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<124>";
		if(t_1==416){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<125>";
			bb_app__app.p_OnBack();
		}
	}
	pop_err();
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<130>";
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<134>";
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<138>";
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
	pop_err();
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<142>";
	this.m__graphics.DiscardGraphics();
	pop_err();
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<55>";
	c_MyApp.m_new.call(new c_MyApp);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<56>";
	pop_err();
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<63>";
	bb_graphics_device=t_dev;
	pop_err();
	return 0;
}
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<70>";
	pop_err();
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<114>";
	dbg_object(this).m_tx=t_tx;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<115>";
	dbg_object(this).m_ty=t_ty;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<116>";
	dbg_object(this).m_flags=dbg_object(this).m_flags&-2;
	pop_err();
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<197>";
	this.m_flags=t_iflags;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<199>";
	if((this.m_flags&2)!=0){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<200>";
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<200>";
		var t_=this.m_frames;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<200>";
		var t_2=0;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<200>";
		while(t_2<t_.length){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<200>";
			var t_f=dbg_array(t_,t_2)[dbg_index];
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<200>";
			t_2=t_2+1;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<201>";
			dbg_object(t_f).m_x+=1;
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<203>";
		this.m_width-=2;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<206>";
	if((this.m_flags&4)!=0){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<207>";
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<207>";
		var t_3=this.m_frames;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<207>";
		var t_4=0;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<207>";
		while(t_4<t_3.length){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<207>";
			var t_f2=dbg_array(t_3,t_4)[dbg_index];
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<207>";
			t_4=t_4+1;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<208>";
			dbg_object(t_f2).m_y+=1;
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<210>";
		this.m_height-=2;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<213>";
	if((this.m_flags&1)!=0){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<214>";
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<217>";
	if(this.m_frames.length==1 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_x==0 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<218>";
		this.m_flags|=65536;
	}
	pop_err();
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<143>";
	if((this.m_surface)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<143>";
		error("Image already initialized");
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<144>";
	this.m_surface=t_surf;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<146>";
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<147>";
	this.m_height=this.m_surface.Height();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<149>";
	this.m_frames=new_object_array(t_nframes);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<150>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<151>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<154>";
	this.p_ApplyFlags(t_iflags);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<155>";
	pop_err();
	return this;
}
c_Image.prototype.p_Init2=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<159>";
	if((this.m_surface)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<159>";
		error("Image already initialized");
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<160>";
	this.m_surface=t_surf;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<161>";
	this.m_source=t_src;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<163>";
	this.m_width=t_iwidth;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<164>";
	this.m_height=t_iheight;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<166>";
	this.m_frames=new_object_array(t_nframes);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<168>";
	var t_ix=t_x;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<168>";
	var t_iy=t_y;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<170>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<171>";
		if(t_ix+this.m_width>t_srcw){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<172>";
			t_ix=0;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<173>";
			t_iy+=this.m_height;
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<175>";
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<176>";
			error("Image frame outside surface");
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<178>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy);
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<179>";
		t_ix+=this.m_width;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<182>";
	this.p_ApplyFlags(t_iflags);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<183>";
	pop_err();
	return this;
}
c_Image.prototype.p_Width=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<81>";
	pop_err();
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<85>";
	pop_err();
	return this.m_height;
}
c_Image.prototype.p_GrabImage=function(t_x,t_y,t_width,t_height,t_nframes,t_flags){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<109>";
	if(this.m_frames.length!=1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<109>";
		pop_err();
		return null;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<110>";
	var t_=(c_Image.m_new.call(new c_Image)).p_Init2(this.m_surface,t_x,t_y,t_width,t_height,t_nframes,t_flags,this,dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_x,dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_y,dbg_object(this).m_width,dbg_object(this).m_height);
	pop_err();
	return t_;
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_firstChar=0;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
	this.m_matrixStack=new_number_array(192);
}
c_GraphicsContext.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<29>";
	pop_err();
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<40>";
	if((this.m_matDirty)!=0){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<41>";
		bb_graphics_renderDevice.SetMatrix(dbg_object(bb_graphics_context).m_ix,dbg_object(bb_graphics_context).m_iy,dbg_object(bb_graphics_context).m_jx,dbg_object(bb_graphics_context).m_jy,dbg_object(bb_graphics_context).m_tx,dbg_object(bb_graphics_context).m_ty);
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<42>";
		this.m_matDirty=0;
	}
	pop_err();
	return 0;
}
var bb_graphics_context=null;
function bb_data_FixDataPath(t_path){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/data.monkey<7>";
	var t_i=t_path.indexOf(":/",0);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/data.monkey<8>";
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/data.monkey<8>";
		pop_err();
		return t_path;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/data.monkey<9>";
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/data.monkey<9>";
		pop_err();
		return t_path;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/data.monkey<10>";
	var t_="monkey://data/"+t_path;
	pop_err();
	return t_;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<23>";
	dbg_object(this).m_x=t_x;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<24>";
	dbg_object(this).m_y=t_y;
	pop_err();
	return this;
}
c_Frame.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<18>";
	pop_err();
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<239>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<240>";
	if((t_surf)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<240>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<244>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<245>";
	if((t_surf)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<245>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init2(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<548>";
	if(!((t_font)!=null)){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<549>";
		if(!((dbg_object(bb_graphics_context).m_defaultFont)!=null)){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<550>";
			dbg_object(bb_graphics_context).m_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<552>";
		t_font=dbg_object(bb_graphics_context).m_defaultFont;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<553>";
		t_firstChar=32;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<555>";
	dbg_object(bb_graphics_context).m_font=t_font;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<556>";
	dbg_object(bb_graphics_context).m_firstChar=t_firstChar;
	pop_err();
	return 0;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/audio.monkey<22>";
	bb_audio_device=t_dev;
	pop_err();
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHitPut=0;
	this.m__keyHitQueue=new_number_array(33);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<26>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<27>";
		dbg_array(this.m__joyStates,t_i)[dbg_index]=c_JoyState.m_new.call(new c_JoyState);
	}
	pop_err();
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<237>";
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		pop_err();
		return;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<238>";
	dbg_array(this.m__keyHit,t_key)[dbg_index]+=1;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<239>";
	dbg_array(this.m__keyHitQueue,this.m__keyHitPut)[dbg_index]=t_key;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<240>";
	this.m__keyHitPut+=1;
	pop_err();
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<189>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<190>";
		var t_state=dbg_array(this.m__joyStates,t_i)[dbg_index];
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<191>";
		if(!BBGame.Game().PollJoystick(t_i,dbg_object(t_state).m_joyx,dbg_object(t_state).m_joyy,dbg_object(t_state).m_joyz,dbg_object(t_state).m_buttons)){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<191>";
			break;
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<192>";
		for(var t_j=0;t_j<32;t_j=t_j+1){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<193>";
			var t_key=256+t_i*32+t_j;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<194>";
			if(dbg_array(dbg_object(t_state).m_buttons,t_j)[dbg_index]){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<195>";
				if(!dbg_array(this.m__keyDown,t_key)[dbg_index]){
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<196>";
					dbg_array(this.m__keyDown,t_key)[dbg_index]=true;
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<197>";
					this.p_PutKeyHit(t_key);
				}
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<200>";
				dbg_array(this.m__keyDown,t_key)[dbg_index]=false;
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_EndUpdate=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<207>";
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<208>";
		dbg_array(this.m__keyHit,dbg_array(this.m__keyHitQueue,t_i)[dbg_index])[dbg_index]=0;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<210>";
	this.m__keyHitPut=0;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<211>";
	this.m__charGet=0;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<212>";
	this.m__charPut=0;
	pop_err();
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<111>";
	var t_1=t_event;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<112>";
	if(t_1==1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<113>";
		if(!dbg_array(this.m__keyDown,t_data)[dbg_index]){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<114>";
			dbg_array(this.m__keyDown,t_data)[dbg_index]=true;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<115>";
			this.p_PutKeyHit(t_data);
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<116>";
			if(t_data==1){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<117>";
				dbg_array(this.m__keyDown,384)[dbg_index]=true;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<118>";
				this.p_PutKeyHit(384);
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<119>";
				if(t_data==384){
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<120>";
					dbg_array(this.m__keyDown,1)[dbg_index]=true;
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<121>";
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<124>";
		if(t_1==2){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<125>";
			if(dbg_array(this.m__keyDown,t_data)[dbg_index]){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<126>";
				dbg_array(this.m__keyDown,t_data)[dbg_index]=false;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<127>";
				if(t_data==1){
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<128>";
					dbg_array(this.m__keyDown,384)[dbg_index]=false;
				}else{
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<129>";
					if(t_data==384){
						err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<130>";
						dbg_array(this.m__keyDown,1)[dbg_index]=false;
					}
				}
			}
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<133>";
			if(t_1==3){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<134>";
				if(this.m__charPut<this.m__charQueue.length){
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<135>";
					dbg_array(this.m__charQueue,this.m__charPut)[dbg_index]=t_data;
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<136>";
					this.m__charPut+=1;
				}
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<142>";
	var t_2=t_event;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<143>";
	if(t_2==4){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<144>";
		this.p_KeyEvent(1,1+t_data);
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<145>";
		if(t_2==5){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<146>";
			this.p_KeyEvent(2,1+t_data);
			pop_err();
			return;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<148>";
			if(t_2==6){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<152>";
	this.m__mouseX=t_x;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<153>";
	this.m__mouseY=t_y;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<154>";
	dbg_array(this.m__touchX,0)[dbg_index]=t_x;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<155>";
	dbg_array(this.m__touchY,0)[dbg_index]=t_y;
	pop_err();
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<159>";
	var t_3=t_event;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<160>";
	if(t_3==7){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<161>";
		this.p_KeyEvent(1,384+t_data);
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<162>";
		if(t_3==8){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<163>";
			this.p_KeyEvent(2,384+t_data);
			pop_err();
			return;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<165>";
			if(t_3==9){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<169>";
	dbg_array(this.m__touchX,t_data)[dbg_index]=t_x;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<170>";
	dbg_array(this.m__touchY,t_data)[dbg_index]=t_y;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<171>";
	if(t_data==0){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<172>";
		this.m__mouseX=t_x;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<173>";
		this.m__mouseY=t_y;
	}
	pop_err();
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<178>";
	var t_4=t_event;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<179>";
	if(t_4==10){
	}else{
		pop_err();
		return;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<183>";
	this.m__accelX=t_x;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<184>";
	this.m__accelY=t_y;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<185>";
	this.m__accelZ=t_z;
	pop_err();
}
c_InputDevice.prototype.p_KeyHit=function(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<52>";
	if(t_key>0 && t_key<512){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<52>";
		pop_err();
		return dbg_array(this.m__keyHit,t_key)[dbg_index];
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<53>";
	pop_err();
	return 0;
}
c_InputDevice.prototype.p_MouseX=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<69>";
	pop_err();
	return this.m__mouseX;
}
c_InputDevice.prototype.p_MouseY=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<73>";
	pop_err();
	return this.m__mouseY;
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<47>";
	if(t_key>0 && t_key<512){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<47>";
		pop_err();
		return dbg_array(this.m__keyDown,t_key)[dbg_index];
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<48>";
	pop_err();
	return false;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/inputdevice.monkey<14>";
	pop_err();
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/input.monkey<22>";
	bb_input_device=t_dev;
	pop_err();
	return 0;
}
var bb_app__devWidth=0;
var bb_app__devHeight=0;
function bb_app_ValidateDeviceWindow(t_notifyApp){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<57>";
	var t_w=bb_app__game.GetDeviceWidth();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<58>";
	var t_h=bb_app__game.GetDeviceHeight();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<59>";
	if(t_w==bb_app__devWidth && t_h==bb_app__devHeight){
		pop_err();
		return;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<60>";
	bb_app__devWidth=t_w;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<61>";
	bb_app__devHeight=t_h;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<62>";
	if(t_notifyApp){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<62>";
		bb_app__app.p_OnResize();
	}
	pop_err();
}
function c_DisplayMode(){
	Object.call(this);
	this.m__width=0;
	this.m__height=0;
}
c_DisplayMode.m_new=function(t_width,t_height){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<192>";
	this.m__width=t_width;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<193>";
	this.m__height=t_height;
	pop_err();
	return this;
}
c_DisplayMode.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<189>";
	pop_err();
	return this;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map.prototype.p_Contains=function(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<25>";
	var t_=this.p_FindNode(t_key)!=null;
	pop_err();
	return t_;
}
c_Map.prototype.p_RotateLeft=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<223>";
					this.p_RotateLeft(t_node);
				}
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<227>";
				this.p_RotateRight(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<239>";
					this.p_RotateRight(t_node);
				}
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<243>";
				this.p_RotateLeft(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map.prototype.p_Set=function(t_key,t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<45>";
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<53>";
		this.p_InsertFixup(t_node);
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map.prototype.p_Insert=function(t_key,t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<146>";
	var t_=this.p_Set(t_key,t_value);
	pop_err();
	return t_;
}
function c_IntMap(){
	c_Map.call(this);
}
c_IntMap.prototype=extend_class(c_Map);
c_IntMap.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<534>";
	c_Map.m_new.call(this);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<534>";
	pop_err();
	return this;
}
c_IntMap.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack.m_new2=function(t_data){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/stack.monkey<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/stack.monkey<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/stack.monkey<67>";
	if(this.m_length==this.m_data.length){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/stack.monkey<68>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/stack.monkey<70>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/stack.monkey<71>";
	this.m_length+=1;
	pop_err();
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/stack.monkey<79>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/stack.monkey<80>";
		this.p_Push(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/stack.monkey<75>";
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack.prototype.p_ToArray=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/stack.monkey<18>";
	var t_t=new_object_array(this.m_length);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/stack.monkey<19>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/stack.monkey<20>";
		dbg_array(t_t,t_i)[dbg_index]=dbg_array(this.m_data,t_i)[dbg_index];
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/stack.monkey<22>";
	pop_err();
	return t_t;
}
function c_Node(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
var bb_app__displayModes=[];
var bb_app__desktopMode=null;
function bb_app_DeviceWidth(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<263>";
	pop_err();
	return bb_app__devWidth;
}
function bb_app_DeviceHeight(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<267>";
	pop_err();
	return bb_app__devHeight;
}
function bb_app_EnumDisplayModes(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<33>";
	var t_modes=bb_app__game.GetDisplayModes();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<34>";
	var t_mmap=c_IntMap.m_new.call(new c_IntMap);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<35>";
	var t_mstack=c_Stack.m_new.call(new c_Stack);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<36>";
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<37>";
		var t_w=dbg_object(dbg_array(t_modes,t_i)[dbg_index]).width;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<38>";
		var t_h=dbg_object(dbg_array(t_modes,t_i)[dbg_index]).height;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<39>";
		var t_size=t_w<<16|t_h;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<40>";
		if(t_mmap.p_Contains(t_size)){
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<42>";
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,dbg_object(dbg_array(t_modes,t_i)[dbg_index]).width,dbg_object(dbg_array(t_modes,t_i)[dbg_index]).height);
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<43>";
			t_mmap.p_Insert(t_size,t_mode);
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<44>";
			t_mstack.p_Push(t_mode);
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<47>";
	bb_app__displayModes=t_mstack.p_ToArray();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<48>";
	var t_mode2=bb_app__game.GetDesktopMode();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<49>";
	if((t_mode2)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<50>";
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,dbg_object(t_mode2).width,dbg_object(t_mode2).height);
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<52>";
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app_DeviceWidth(),bb_app_DeviceHeight());
	}
	pop_err();
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<312>";
	dbg_object(bb_graphics_context).m_ix=t_ix;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<313>";
	dbg_object(bb_graphics_context).m_iy=t_iy;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<314>";
	dbg_object(bb_graphics_context).m_jx=t_jx;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<315>";
	dbg_object(bb_graphics_context).m_jy=t_jy;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<316>";
	dbg_object(bb_graphics_context).m_tx=t_tx;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<317>";
	dbg_object(bb_graphics_context).m_ty=t_ty;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<318>";
	dbg_object(bb_graphics_context).m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<319>";
	dbg_object(bb_graphics_context).m_matDirty=1;
	pop_err();
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<308>";
	bb_graphics_SetMatrix(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<254>";
	dbg_object(bb_graphics_context).m_color_r=t_r;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<255>";
	dbg_object(bb_graphics_context).m_color_g=t_g;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<256>";
	dbg_object(bb_graphics_context).m_color_b=t_b;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<257>";
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<271>";
	dbg_object(bb_graphics_context).m_alpha=t_alpha;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<272>";
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	pop_err();
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<280>";
	dbg_object(bb_graphics_context).m_blend=t_blend;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<281>";
	bb_graphics_renderDevice.SetBlend(t_blend);
	pop_err();
	return 0;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<289>";
	dbg_object(bb_graphics_context).m_scissor_x=t_x;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<290>";
	dbg_object(bb_graphics_context).m_scissor_y=t_y;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<291>";
	dbg_object(bb_graphics_context).m_scissor_width=t_width;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<292>";
	dbg_object(bb_graphics_context).m_scissor_height=t_height;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<293>";
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	pop_err();
	return 0;
}
function bb_graphics_BeginRender(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<225>";
	bb_graphics_renderDevice=bb_graphics_device;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<226>";
	dbg_object(bb_graphics_context).m_matrixSp=0;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<227>";
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<228>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<229>";
	bb_graphics_SetAlpha(1.0);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<230>";
	bb_graphics_SetBlend(0);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<231>";
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	pop_err();
	return 0;
}
function bb_graphics_EndRender(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<235>";
	bb_graphics_renderDevice=null;
	pop_err();
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<259>";
	error("");
	pop_err();
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<224>";
	bb_app__updateRate=t_hertz;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<225>";
	bb_app__game.SetUpdateRate(t_hertz);
	pop_err();
}
function bb_app_Millisecs(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/app.monkey<233>";
	var t_=bb_app__game.Millisecs();
	pop_err();
	return t_;
}
function c_Sound(){
	Object.call(this);
	this.m_sample=null;
}
c_Sound.m_new=function(t_sample){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/audio.monkey<32>";
	dbg_object(this).m_sample=t_sample;
	pop_err();
	return this;
}
c_Sound.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/audio.monkey<29>";
	pop_err();
	return this;
}
function bb_audio_LoadSound(t_path){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/audio.monkey<47>";
	var t_sample=bb_audio_device.LoadSample(bb_data_FixDataPath(t_path));
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/audio.monkey<48>";
	if((t_sample)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/audio.monkey<48>";
		var t_=c_Sound.m_new.call(new c_Sound,t_sample);
		pop_err();
		return t_;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/audio.monkey<49>";
	pop_err();
	return null;
}
var bb_LeGeo_sndJump=null;
var bb_LeGeo_sndHitBlock=null;
function bb_audio_PlayMusic(t_path,t_flags){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/audio.monkey<85>";
	var t_=bb_audio_device.PlayMusic(bb_data_FixDataPath(t_path),t_flags);
	pop_err();
	return t_;
}
var bb_LeGeo_imgWorld=null;
function c_SpineAttachment(){
	Object.call(this);
	this.m_Name="";
	this.m_Type=0;
}
c_SpineAttachment.m_new=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachment.monkey<11>";
	if(t_name.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachment.monkey<11>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"name cannot be empty.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachment.monkey<12>";
	this.m_Name=t_name;
	pop_err();
	return this;
}
c_SpineAttachment.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachment.monkey<6>";
	pop_err();
	return this;
}
function c_SpineRegionAttachment(){
	c_SpineAttachment.call(this);
	this.m_RenderObject=null;
	this.m_Path="";
	this.m_X=.0;
	this.m_Y=.0;
	this.m_ScaleX=1.0;
	this.m_ScaleY=1.0;
	this.m_Rotation=.0;
	this.m_Width=.0;
	this.m_Height=.0;
	this.m_RegionOriginalWidth=.0;
	this.m_RegionOriginalHeight=.0;
	this.m_RegionOffsetX=.0;
	this.m_RegionOffsetY=.0;
	this.m_RegionWidth=.0;
	this.m_RegionHeight=.0;
	this.m_Offset=new_number_array(8);
	this.m_R=.0;
	this.m_G=.0;
	this.m_B=.0;
	this.m_A=.0;
	this.m_UVs=new_number_array(8);
}
c_SpineRegionAttachment.prototype=extend_class(c_SpineAttachment);
c_SpineRegionAttachment.m_new=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<45>";
	c_SpineAttachment.m_new.call(this,t_name);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<46>";
	this.m_Type=0;
	pop_err();
	return this;
}
c_SpineRegionAttachment.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<7>";
	c_SpineAttachment.m_new2.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<7>";
	pop_err();
	return this;
}
c_SpineRegionAttachment.prototype.p_UpdateOffset=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<73>";
	var t_regionScaleX=this.m_Width/this.m_RegionOriginalWidth*this.m_ScaleX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<74>";
	var t_regionScaleY=this.m_Height/this.m_RegionOriginalHeight*this.m_ScaleY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<75>";
	var t_localX=-this.m_Width/2.0*this.m_ScaleX+this.m_RegionOffsetX*t_regionScaleX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<76>";
	var t_localY=-this.m_Height/2.0*this.m_ScaleY+this.m_RegionOffsetY*t_regionScaleY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<77>";
	var t_localX2=t_localX+this.m_RegionWidth*t_regionScaleX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<78>";
	var t_localY2=t_localY+this.m_RegionHeight*t_regionScaleY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<82>";
	var t_cos=Math.cos((this.m_Rotation)*D2R);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<83>";
	var t_sin=Math.sin((this.m_Rotation)*D2R);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<85>";
	var t_localXCos=t_localX*t_cos+this.m_X;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<86>";
	var t_localXSin=t_localX*t_sin;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<87>";
	var t_localYCos=t_localY*t_cos+this.m_Y;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<88>";
	var t_localYSin=t_localY*t_sin;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<89>";
	var t_localX2Cos=t_localX2*t_cos+this.m_X;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<90>";
	var t_localX2Sin=t_localX2*t_sin;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<91>";
	var t_localY2Cos=t_localY2*t_cos+this.m_Y;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<92>";
	var t_localY2Sin=t_localY2*t_sin;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<94>";
	dbg_array(this.m_Offset,0)[dbg_index]=t_localXCos-t_localYSin;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<95>";
	dbg_array(this.m_Offset,1)[dbg_index]=t_localYCos+t_localXSin;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<96>";
	dbg_array(this.m_Offset,2)[dbg_index]=t_localXCos-t_localY2Sin;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<97>";
	dbg_array(this.m_Offset,3)[dbg_index]=t_localY2Cos+t_localXSin;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<98>";
	dbg_array(this.m_Offset,4)[dbg_index]=t_localX2Cos-t_localY2Sin;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<99>";
	dbg_array(this.m_Offset,5)[dbg_index]=t_localY2Cos+t_localX2Sin;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<100>";
	dbg_array(this.m_Offset,6)[dbg_index]=t_localX2Cos-t_localYSin;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<101>";
	dbg_array(this.m_Offset,7)[dbg_index]=t_localYCos+t_localX2Sin;
	pop_err();
}
c_SpineRegionAttachment.prototype.p_ComputeWorldVertices=function(t_bone,t_worldVertices){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<105>";
	var t_x=dbg_object(dbg_object(t_bone).m_Skeleton).m_X+dbg_object(t_bone).m_WorldX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<106>";
	var t_y=dbg_object(dbg_object(t_bone).m_Skeleton).m_Y+dbg_object(t_bone).m_WorldY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<107>";
	var t_m00=dbg_object(t_bone).m_M00;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<108>";
	var t_m01=dbg_object(t_bone).m_M01;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<109>";
	var t_m10=dbg_object(t_bone).m_M10;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<110>";
	var t_m11=dbg_object(t_bone).m_M11;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<112>";
	dbg_array(t_worldVertices,0)[dbg_index]=dbg_array(this.m_Offset,0)[dbg_index]*t_m00+dbg_array(this.m_Offset,1)[dbg_index]*t_m01+t_x;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<113>";
	dbg_array(t_worldVertices,1)[dbg_index]=dbg_array(this.m_Offset,0)[dbg_index]*t_m10+dbg_array(this.m_Offset,1)[dbg_index]*t_m11+t_y;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<114>";
	dbg_array(t_worldVertices,2)[dbg_index]=dbg_array(this.m_Offset,2)[dbg_index]*t_m00+dbg_array(this.m_Offset,3)[dbg_index]*t_m01+t_x;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<115>";
	dbg_array(t_worldVertices,3)[dbg_index]=dbg_array(this.m_Offset,2)[dbg_index]*t_m10+dbg_array(this.m_Offset,3)[dbg_index]*t_m11+t_y;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<116>";
	dbg_array(t_worldVertices,4)[dbg_index]=dbg_array(this.m_Offset,4)[dbg_index]*t_m00+dbg_array(this.m_Offset,5)[dbg_index]*t_m01+t_x;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<117>";
	dbg_array(t_worldVertices,5)[dbg_index]=dbg_array(this.m_Offset,4)[dbg_index]*t_m10+dbg_array(this.m_Offset,5)[dbg_index]*t_m11+t_y;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<118>";
	dbg_array(t_worldVertices,6)[dbg_index]=dbg_array(this.m_Offset,6)[dbg_index]*t_m00+dbg_array(this.m_Offset,7)[dbg_index]*t_m01+t_x;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<119>";
	dbg_array(t_worldVertices,7)[dbg_index]=dbg_array(this.m_Offset,6)[dbg_index]*t_m10+dbg_array(this.m_Offset,7)[dbg_index]*t_m11+t_y;
	pop_err();
}
c_SpineRegionAttachment.prototype.p_SetUVs=function(t_u,t_v,t_u2,t_v2,t_rotate){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<51>";
	if(t_rotate){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<52>";
		dbg_array(this.m_UVs,2)[dbg_index]=t_u;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<53>";
		dbg_array(this.m_UVs,3)[dbg_index]=t_v2;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<54>";
		dbg_array(this.m_UVs,4)[dbg_index]=t_u;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<55>";
		dbg_array(this.m_UVs,5)[dbg_index]=t_v;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<56>";
		dbg_array(this.m_UVs,6)[dbg_index]=t_u2;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<57>";
		dbg_array(this.m_UVs,7)[dbg_index]=t_v;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<58>";
		dbg_array(this.m_UVs,0)[dbg_index]=t_u2;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<59>";
		dbg_array(this.m_UVs,1)[dbg_index]=t_v2;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<61>";
		dbg_array(this.m_UVs,0)[dbg_index]=t_u;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<62>";
		dbg_array(this.m_UVs,1)[dbg_index]=t_v2;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<63>";
		dbg_array(this.m_UVs,2)[dbg_index]=t_u;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<64>";
		dbg_array(this.m_UVs,3)[dbg_index]=t_v;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<65>";
		dbg_array(this.m_UVs,4)[dbg_index]=t_u2;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<66>";
		dbg_array(this.m_UVs,5)[dbg_index]=t_v;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<67>";
		dbg_array(this.m_UVs,6)[dbg_index]=t_u2;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineregionattachment.monkey<68>";
		dbg_array(this.m_UVs,7)[dbg_index]=t_v2;
	}
	pop_err();
}
function c_SpineMojoImageAttachment(){
	c_SpineRegionAttachment.call(this);
}
c_SpineMojoImageAttachment.prototype=extend_class(c_SpineRegionAttachment);
c_SpineMojoImageAttachment.m_new=function(t_name,t_path){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimageattachment.monkey<8>";
	c_SpineRegionAttachment.m_new.call(this,t_name);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimageattachment.monkey<9>";
	this.m_Type=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimageattachment.monkey<10>";
	this.m_RenderObject=(c_SpineMojoImageRenderObject.m_new2.call(new c_SpineMojoImageRenderObject,t_path,0.0,0.0));
	pop_err();
	return this;
}
c_SpineMojoImageAttachment.m_new2=function(t_name,t_image){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimageattachment.monkey<14>";
	c_SpineRegionAttachment.m_new.call(this,t_name);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimageattachment.monkey<15>";
	this.m_Type=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimageattachment.monkey<16>";
	this.m_RenderObject=(c_SpineMojoImageRenderObject.m_new.call(new c_SpineMojoImageRenderObject,t_image,0.0,0.0));
	pop_err();
	return this;
}
c_SpineMojoImageAttachment.m_new3=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimageattachment.monkey<6>";
	c_SpineRegionAttachment.m_new2.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimageattachment.monkey<6>";
	pop_err();
	return this;
}
function c_SpineException(){
	ThrowableObject.call(this);
	this.m_message="";
}
c_SpineException.prototype=extend_class(ThrowableObject);
c_SpineException.m_new=function(t_message){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineexceptions.monkey<10>";
	dbg_object(this).m_message=t_message;
	pop_err();
	return this;
}
c_SpineException.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineexceptions.monkey<6>";
	pop_err();
	return this;
}
c_SpineException.prototype.p_ToString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineexceptions.monkey<14>";
	pop_err();
	return this.m_message;
}
function c_SpineArgumentNullException(){
	c_SpineException.call(this);
}
c_SpineArgumentNullException.prototype=extend_class(c_SpineException);
c_SpineArgumentNullException.m_new=function(t_message){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineexceptions.monkey<19>";
	c_SpineException.m_new2.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineexceptions.monkey<20>";
	dbg_object(this).m_message=t_message;
	pop_err();
	return this;
}
c_SpineArgumentNullException.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineexceptions.monkey<18>";
	c_SpineException.m_new2.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineexceptions.monkey<18>";
	pop_err();
	return this;
}
function c_SpineAttachmentType(){
	Object.call(this);
}
c_SpineAttachmentType.m_FromString=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachmenttype.monkey<13>";
	var t_1=t_name.toLowerCase();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachmenttype.monkey<14>";
	if(t_1=="region"){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachmenttype.monkey<15>";
		pop_err();
		return 0;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachmenttype.monkey<16>";
		if(t_1=="boundingbox"){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachmenttype.monkey<17>";
			pop_err();
			return 1;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachmenttype.monkey<18>";
			if(t_1=="mesh"){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachmenttype.monkey<19>";
				pop_err();
				return 2;
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachmenttype.monkey<20>";
				if(t_1=="skinnedmesh"){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachmenttype.monkey<21>";
					pop_err();
					return 3;
				}
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineattachmenttype.monkey<23>";
	pop_err();
	return -1;
}
function c_SpineMojoImageRenderObject(){
	Object.call(this);
	this.m_image=null;
	this.implments={c_SpineRenderObject:1};
}
c_SpineMojoImageRenderObject.m_new=function(t_image,t_handleX,t_handleY){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimagerenderobject.monkey<28>";
	dbg_object(this).m_image=t_image;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimagerenderobject.monkey<29>";
	dbg_object(this).m_image.p_SetHandle(t_handleX,t_handleY);
	pop_err();
	return this;
}
c_SpineMojoImageRenderObject.m_new2=function(t_path,t_handleX,t_handleY){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimagerenderobject.monkey<33>";
	dbg_object(this).m_image=bb_graphics_LoadImage(t_path,1,c_Image.m_DefaultFlags);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimagerenderobject.monkey<34>";
	dbg_object(this).m_image.p_SetHandle(t_handleX,t_handleY);
	pop_err();
	return this;
}
c_SpineMojoImageRenderObject.m_new3=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimagerenderobject.monkey<6>";
	pop_err();
	return this;
}
c_SpineMojoImageRenderObject.prototype.p_width=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimagerenderobject.monkey<12>";
	var t_=this.m_image.p_Width();
	pop_err();
	return t_;
}
c_SpineMojoImageRenderObject.prototype.p_height=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimagerenderobject.monkey<16>";
	var t_=this.m_image.p_Height();
	pop_err();
	return t_;
}
c_SpineMojoImageRenderObject.prototype.p_Draw=function(t_verts){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimagerenderobject.monkey<39>";
	bb_graphics_DrawPoly2(t_verts,this.m_image,0);
	pop_err();
}
c_SpineMojoImageRenderObject.prototype.p_Draw2=function(t_x,t_y,t_angle,t_scaleX,t_scaleY,t_atlasScale){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoimagerenderobject.monkey<43>";
	bb_graphics_DrawImage2(this.m_image,t_x,t_y,t_angle,t_scaleX*t_atlasScale,t_scaleY*t_atlasScale,0);
	pop_err();
}
function c_SpineEntity(){
	Object.call(this);
	this.m_atlas=null;
	this.m_data=null;
	this.m_skeleton=null;
	this.m_slotWorldBounding=[];
	this.m_slotWorldVertices=[];
	this.m_slotWorldVerticesLength=[];
	this.m_slotWorldTriangles=[];
	this.m_slotWorldTrianglesLength=[];
	this.m_slotWorldHull=[];
	this.m_slotWorldHullLength=[];
	this.m_slotWorldX=[];
	this.m_slotWorldY=[];
	this.m_slotWorldRotation=[];
	this.m_slotWorldScaleX=[];
	this.m_slotWorldScaleY=[];
	this.m_slotWorldR=[];
	this.m_slotWorldG=[];
	this.m_slotWorldB=[];
	this.m_slotWorldAlpha=[];
	this.m_animation=null;
	this.m_mixAnimation=null;
	this.m_mixAmount=.0;
	this.m_looping=false;
	this.m_finished=false;
	this.m_playing=false;
	this.m_events=c_List2.m_new.call(new c_List2);
	this.m_callback=null;
	this.m_dirty=true;
	this.m_dirtyPose=true;
	this.m_scaleX=1.0;
	this.m_scaleY=1.0;
	this.m_speed=1.0;
	this.m_debugHideImages=false;
	this.m_debugHull=false;
	this.m_debugSlots=false;
	this.m_debugBones=false;
	this.m_debugBounding=false;
	this.m_debugMesh=false;
	this.m_snapToPixels=false;
	this.m_ignoreRootPosition=false;
	this.m_x=0.0;
	this.m_y=0.0;
	this.m_rendering=false;
	this.m_updating=false;
	this.m_rotation=0.0;
	this.m_dirtyBounding=true;
	this.m_atlasScale=1.0;
	this.m_bounding=new_number_array(8);
	this.m_lastTime=.0;
}
c_SpineEntity.m_new=function(t_skeletonPath,t_atlasPath,t_atlasDir,t_fileLoader,t_atlasLoader,t_textureLoader){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<94>";
	var t_atlasFile=t_fileLoader.p_Load(t_atlasPath);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<95>";
	this.m_atlas=t_atlasLoader.p_Load2(t_atlasFile,t_atlasDir,t_textureLoader);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<96>";
	t_atlasFile.p_Close();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<99>";
	var t_skeletonFile=t_fileLoader.p_Load(t_skeletonPath);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<100>";
	var t_skeletonJson=c_SpineSkeletonJson.m_new.call(new c_SpineSkeletonJson,this.m_atlas,t_skeletonFile);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<101>";
	this.m_data=t_skeletonJson.p_ReadSkeletonData();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<104>";
	this.m_skeleton=c_SpineSkeleton.m_new.call(new c_SpineSkeleton,this.m_data);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<105>";
	this.m_skeleton.p_SetToSetupPose();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<108>";
	var t_index=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<109>";
	var t_total=dbg_object(this.m_data).m_Slots.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<110>";
	this.m_slotWorldBounding=new_array_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<111>";
	this.m_slotWorldVertices=new_array_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<112>";
	this.m_slotWorldVerticesLength=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<113>";
	this.m_slotWorldTriangles=new_array_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<114>";
	this.m_slotWorldTrianglesLength=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<115>";
	this.m_slotWorldHull=new_array_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<116>";
	this.m_slotWorldHullLength=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<117>";
	this.m_slotWorldX=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<118>";
	this.m_slotWorldY=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<119>";
	this.m_slotWorldRotation=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<120>";
	this.m_slotWorldScaleX=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<121>";
	this.m_slotWorldScaleY=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<122>";
	this.m_slotWorldR=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<123>";
	this.m_slotWorldG=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<124>";
	this.m_slotWorldB=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<125>";
	this.m_slotWorldAlpha=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<128>";
	for(t_index=0;t_index<t_total;t_index=t_index+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<129>";
		dbg_array(this.m_slotWorldBounding,t_index)[dbg_index]=new_number_array(8);
	}
	pop_err();
	return this;
}
c_SpineEntity.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<13>";
	pop_err();
	return this;
}
c_SpineEntity.prototype.p_GetAnimation=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1311>";
	if(this.m_animation==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1311>";
		pop_err();
		return "";
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1312>";
	pop_err();
	return dbg_object(this.m_animation).m_Name;
}
c_SpineEntity.prototype.p_GetAnimation2=function(t_id){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1317>";
	var t_=this.m_data.p_FindAnimation(t_id);
	pop_err();
	return t_;
}
c_SpineEntity.prototype.p_OnProcessEvents=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<482>";
	if(this.m_events.p_IsEmpty()==false){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<484>";
		var t_node=this.m_events.p_FirstNode();
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<485>";
		var t_event=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<486>";
		while((t_node)!=null){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<488>";
			t_event=t_node.p_Value();
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<491>";
			if((this.m_callback)!=null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<491>";
				this.m_callback.p_OnSpineEntityEvent(this,dbg_object(dbg_object(t_event).m_Data).m_Name,dbg_object(t_event).m_IntValue,dbg_object(t_event).m_FloatValue,dbg_object(t_event).m_StringValue);
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<494>";
			t_node=t_node.p_NextNode();
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<498>";
		this.m_events.p_Clear();
	}
	pop_err();
}
c_SpineEntity.prototype.p_SetAnimation=function(t_animation,t_looping){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1242>";
	this.m_mixAnimation=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1243>";
	this.m_mixAmount=0.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1246>";
	dbg_object(this).m_animation=t_animation;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1247>";
	dbg_object(this.m_skeleton).m_Time=0.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1248>";
	dbg_object(this).m_looping=t_looping;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1249>";
	this.m_finished=false;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1250>";
	this.m_playing=true;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1253>";
	if((t_animation)!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1254>";
		this.m_skeleton.p_SetToSetupPose();
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1255>";
		t_animation.p_Apply2(this.m_skeleton,dbg_object(this.m_skeleton).m_Time,dbg_object(this.m_skeleton).m_Time,this.m_events,t_looping);
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1258>";
		this.p_OnProcessEvents();
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1262>";
	this.m_dirty=true;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1263>";
	this.m_dirtyPose=true;
	pop_err();
}
c_SpineEntity.prototype.p_SetAnimation2=function(t_name,t_looping){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1236>";
	this.p_SetAnimation(this.p_GetAnimation2(t_name),t_looping);
	pop_err();
}
c_SpineEntity.prototype.p_GetSkin=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1224>";
	if(dbg_object(this.m_skeleton).m_Skin==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1224>";
		pop_err();
		return "";
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1225>";
	pop_err();
	return dbg_object(dbg_object(this.m_skeleton).m_Skin).m_Name;
}
c_SpineEntity.prototype.p_GetSkin2=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1230>";
	var t_=this.m_data.p_FindSkin(t_name);
	pop_err();
	return t_;
}
c_SpineEntity.prototype.p_SetSkin=function(t_skin){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1213>";
	if(t_skin==null){
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1217>";
		this.m_skeleton.p_SetSkin(t_skin);
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1218>";
		this.m_skeleton.p_SetToSetupPose();
	}
	pop_err();
}
c_SpineEntity.prototype.p_SetSkin2=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1208>";
	this.p_SetSkin(this.p_GetSkin2(t_name));
	pop_err();
}
c_SpineEntity.prototype.p_SetScale=function(t_scaleX,t_scaleY){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1371>";
	if(t_scaleX==dbg_object(this).m_scaleX && t_scaleY==dbg_object(this).m_scaleY){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1372>";
	dbg_object(this).m_scaleX=t_scaleX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1373>";
	dbg_object(this).m_scaleY=t_scaleY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1374>";
	this.m_dirty=true;
	pop_err();
}
c_SpineEntity.prototype.p_SetScale2=function(t_scaleXY){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1379>";
	if(t_scaleXY==this.m_scaleX && t_scaleXY==this.m_scaleY){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1380>";
	this.m_scaleX=t_scaleXY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1381>";
	this.m_scaleY=t_scaleXY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1382>";
	this.m_dirty=true;
	pop_err();
}
c_SpineEntity.prototype.p_SetSpeed=function(t_speed){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1287>";
	dbg_object(this).m_speed=t_speed;
	pop_err();
}
c_SpineEntity.prototype.p_SetDebug=function(t_all,t_hideImages){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<856>";
	this.m_debugHideImages=t_hideImages;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<857>";
	this.m_debugHull=t_all;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<858>";
	this.m_debugSlots=t_all;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<859>";
	this.m_debugBones=t_all;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<860>";
	this.m_debugBounding=t_all;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<861>";
	this.m_debugMesh=t_all;
	pop_err();
}
c_SpineEntity.prototype.p_SetDebug2=function(t_hideImages,t_hull,t_slots,t_bones,t_bounding,t_mesh){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<868>";
	this.m_debugHideImages=t_hideImages;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<869>";
	this.m_debugHull=t_hull;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<870>";
	this.m_debugSlots=t_slots;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<871>";
	this.m_debugBones=t_bones;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<872>";
	this.m_debugBounding=t_bounding;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<873>";
	this.m_debugMesh=t_mesh;
	pop_err();
}
c_SpineEntity.prototype.p_SetCallback=function(t_callback){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<2325>";
	dbg_object(this).m_callback=t_callback;
	pop_err();
}
c_SpineEntity.prototype.p_SetSnapToPixels=function(t_snapToPixels){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<2309>";
	dbg_object(this).m_snapToPixels=t_snapToPixels;
	pop_err();
}
c_SpineEntity.prototype.p_SetIgnoreRootPosition=function(t_ignoreRootPosition){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<2314>";
	dbg_object(this).m_ignoreRootPosition=t_ignoreRootPosition;
	pop_err();
}
c_SpineEntity.prototype.p_SetFlip=function(t_flipX,t_flipY){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1422>";
	if(t_flipX==dbg_object(this.m_skeleton).m_FlipX && t_flipY==dbg_object(this.m_skeleton).m_FlipY){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1423>";
	dbg_object(this.m_skeleton).m_FlipX=t_flipX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1424>";
	dbg_object(this.m_skeleton).m_FlipY=t_flipY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1425>";
	this.m_dirty=true;
	pop_err();
}
c_SpineEntity.prototype.p_SetAlpha=function(t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1144>";
	dbg_object(this.m_skeleton).m_A=t_alpha;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1147>";
	this.m_dirty=true;
	pop_err();
}
c_SpineEntity.prototype.p_SetPosition=function(t_x,t_y){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1333>";
	if(t_x==dbg_object(this).m_x && t_y==dbg_object(this).m_y){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1334>";
	dbg_object(this).m_x=t_x;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1335>";
	dbg_object(this).m_y=t_y;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1336>";
	this.m_dirty=true;
	pop_err();
}
c_SpineEntity.prototype.p_SetPosition2=function(t_xy){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1341>";
	if(t_xy==this.m_x && t_xy==this.m_y){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1342>";
	this.m_x=t_xy;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1343>";
	this.m_y=t_xy;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1344>";
	this.m_dirty=true;
	pop_err();
}
c_SpineEntity.prototype.p_OnCalculateWorldHull=function(t_index,t_hullLength){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<345>";
	dbg_array(this.m_slotWorldHullLength,t_index)[dbg_index]=t_hullLength;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<346>";
	if(t_hullLength>dbg_array(this.m_slotWorldHull,t_index)[dbg_index].length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<346>";
		dbg_array(this.m_slotWorldHull,t_index)[dbg_index]=new_number_array(t_hullLength);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<348>";
	var t_hull=dbg_array(this.m_slotWorldHull,t_index)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<349>";
	var t_vertices=dbg_array(this.m_slotWorldVertices,t_index)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<350>";
	for(var t_vertIndex=0;t_vertIndex<t_hullLength;t_vertIndex=t_vertIndex+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<351>";
		dbg_array(t_hull,t_vertIndex)[dbg_index]=dbg_array(t_vertices,t_vertIndex)[dbg_index];
	}
	pop_err();
}
c_SpineEntity.prototype.p_OnCalculateWorldColor=function(t_slot,t_index){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<338>";
	dbg_array(this.m_slotWorldR,t_index)[dbg_index]=((dbg_object(this.m_skeleton).m_R*dbg_object(t_slot).m_R*255.0)|0);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<339>";
	dbg_array(this.m_slotWorldG,t_index)[dbg_index]=((dbg_object(this.m_skeleton).m_G*dbg_object(t_slot).m_G*255.0)|0);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<340>";
	dbg_array(this.m_slotWorldB,t_index)[dbg_index]=((dbg_object(this.m_skeleton).m_B*dbg_object(t_slot).m_B*255.0)|0);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<341>";
	dbg_array(this.m_slotWorldAlpha,t_index)[dbg_index]=dbg_object(this.m_skeleton).m_A*dbg_object(t_slot).m_A;
	pop_err();
}
c_SpineEntity.prototype.p_OnCalculateWorldTriangles=function(t_out,t_vertices,t_triangles,t_uvs,t_rendererObject){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<356>";
	var t_vertIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<357>";
	var t_total=t_triangles.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<358>";
	var t_triangleOffset=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<359>";
	var t_vertOffset=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<361>";
	for(var t_triangleIndex=0;t_triangleIndex<t_total;t_triangleIndex=t_triangleIndex+3){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<363>";
		for(t_vertIndex=0;t_vertIndex<3;t_vertIndex=t_vertIndex+1){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<364>";
			t_vertOffset=dbg_array(t_triangles,t_triangleIndex+t_vertIndex)[dbg_index]*2;
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<367>";
			dbg_array(t_out,t_triangleOffset)[dbg_index]=dbg_array(t_vertices,t_vertOffset)[dbg_index];
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<368>";
			dbg_array(t_out,t_triangleOffset+1)[dbg_index]=dbg_array(t_vertices,t_vertOffset+1)[dbg_index];
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<375>";
			dbg_array(t_out,t_triangleOffset+2)[dbg_index]=(t_rendererObject.p_width())/1.0*dbg_array(t_uvs,t_vertOffset)[dbg_index];
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<376>";
			dbg_array(t_out,t_triangleOffset+3)[dbg_index]=(t_rendererObject.p_height())/1.0*dbg_array(t_uvs,t_vertOffset+1)[dbg_index];
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<379>";
			t_triangleOffset+=4;
		}
	}
	pop_err();
}
c_SpineEntity.prototype.p_OnCalculate=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<154>";
	this.m_dirty=false;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<157>";
	var t_rootBone=this.m_skeleton.p_RootBone();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<158>";
	if((t_rootBone)!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<159>";
		var t_length=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<160>";
		var t_oldRootX=dbg_object(t_rootBone).m_X;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<161>";
		var t_oldRootY=dbg_object(t_rootBone).m_Y;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<162>";
		var t_oldRootScaleX=dbg_object(t_rootBone).m_ScaleX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<163>";
		var t_oldRootScaleY=dbg_object(t_rootBone).m_ScaleY;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<164>";
		var t_oldRootRotation=dbg_object(t_rootBone).m_Rotation;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<167>";
		if(this.m_ignoreRootPosition){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<168>";
			dbg_object(t_rootBone).m_X=this.m_x;
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<169>";
			dbg_object(t_rootBone).m_Y=this.m_y;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<171>";
			dbg_object(t_rootBone).m_X=t_oldRootX+this.m_x;
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<172>";
			dbg_object(t_rootBone).m_Y=t_oldRootY+this.m_y;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<174>";
		dbg_object(t_rootBone).m_ScaleX=t_oldRootScaleX*this.m_scaleX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<175>";
		dbg_object(t_rootBone).m_ScaleY=t_oldRootScaleY*this.m_scaleY;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<176>";
		dbg_object(t_rootBone).m_Rotation=t_oldRootRotation+this.m_rotation;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<179>";
		this.m_skeleton.p_UpdateWorldTransform();
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<182>";
		var t_slot=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<183>";
		var t_attachment=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<184>";
		var t_bone=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<185>";
		var t_totalSlots=dbg_object(this.m_skeleton).m_Slots.length;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<187>";
		for(var t_index=0;t_index<t_totalSlots;t_index=t_index+1){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<188>";
			t_slot=dbg_array(dbg_object(this.m_skeleton).m_Slots,t_index)[dbg_index];
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<189>";
			t_attachment=t_slot.p_Attachment();
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<191>";
			if(t_attachment==null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<191>";
				continue;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<194>";
			var t_1=dbg_object(t_attachment).m_Type;
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<195>";
			if(t_1==1){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<196>";
				var t_box=object_downcast((t_attachment),c_SpineBoundingBoxAttachment);
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<199>";
				t_length=dbg_object(t_box).m_Vertices.length;
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<200>";
				dbg_array(this.m_slotWorldVerticesLength,t_index)[dbg_index]=t_length;
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<201>";
				if(t_length>dbg_array(this.m_slotWorldVertices,t_index)[dbg_index].length){
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<201>";
					dbg_array(this.m_slotWorldVertices,t_index)[dbg_index]=new_number_array(t_length);
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<202>";
				t_box.p_ComputeWorldVertices(dbg_object(t_slot).m_Bone,dbg_array(this.m_slotWorldVertices,t_index)[dbg_index]);
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<205>";
				this.p_OnCalculateWorldHull(t_index,t_length);
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<207>";
				if(t_1==0){
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<208>";
					var t_region=object_downcast((t_attachment),c_SpineRegionAttachment);
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<209>";
					t_bone=dbg_object(t_slot).m_Bone;
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<212>";
					t_length=8;
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<213>";
					dbg_array(this.m_slotWorldVerticesLength,t_index)[dbg_index]=t_length;
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<214>";
					if(t_length>dbg_array(this.m_slotWorldVertices,t_index)[dbg_index].length){
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<214>";
						dbg_array(this.m_slotWorldVertices,t_index)[dbg_index]=new_number_array(t_length);
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<215>";
					t_region.p_ComputeWorldVertices(dbg_object(t_slot).m_Bone,dbg_array(this.m_slotWorldVertices,t_index)[dbg_index]);
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<218>";
					dbg_array(this.m_slotWorldX,t_index)[dbg_index]=dbg_object(t_bone).m_WorldX+dbg_object(t_region).m_X*dbg_object(t_bone).m_M00+dbg_object(t_region).m_Y*dbg_object(t_bone).m_M01;
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<219>";
					dbg_array(this.m_slotWorldY,t_index)[dbg_index]=dbg_object(t_bone).m_WorldY+dbg_object(t_region).m_X*dbg_object(t_bone).m_M10+dbg_object(t_region).m_Y*dbg_object(t_bone).m_M11;
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<220>";
					dbg_array(this.m_slotWorldRotation,t_index)[dbg_index]=dbg_object(t_bone).m_WorldRotation+dbg_object(t_region).m_Rotation;
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<221>";
					dbg_array(this.m_slotWorldScaleX,t_index)[dbg_index]=dbg_object(t_bone).m_WorldScaleX*dbg_object(t_region).m_ScaleX;
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<222>";
					dbg_array(this.m_slotWorldScaleY,t_index)[dbg_index]=dbg_object(t_bone).m_WorldScaleY*dbg_object(t_region).m_ScaleY;
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<225>";
					if(dbg_object(this.m_skeleton).m_FlipX){
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<226>";
						dbg_array(this.m_slotWorldScaleX,t_index)[dbg_index]=-dbg_array(this.m_slotWorldScaleX,t_index)[dbg_index];
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<227>";
						dbg_array(this.m_slotWorldRotation,t_index)[dbg_index]=-dbg_array(this.m_slotWorldRotation,t_index)[dbg_index];
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<229>";
					if(dbg_object(this.m_skeleton).m_FlipY){
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<230>";
						dbg_array(this.m_slotWorldScaleY,t_index)[dbg_index]=-dbg_array(this.m_slotWorldScaleY,t_index)[dbg_index];
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<231>";
						dbg_array(this.m_slotWorldRotation,t_index)[dbg_index]=-dbg_array(this.m_slotWorldRotation,t_index)[dbg_index];
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<235>";
					this.p_OnCalculateWorldColor(t_slot,t_index);
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<238>";
					t_length=8;
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<239>";
					dbg_array(this.m_slotWorldHullLength,t_index)[dbg_index]=t_length;
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<240>";
					if(t_length>dbg_array(this.m_slotWorldHull,t_index)[dbg_index].length){
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<240>";
						dbg_array(this.m_slotWorldHull,t_index)[dbg_index]=new_number_array(t_length);
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<241>";
					dbg_array(dbg_array(this.m_slotWorldHull,t_index)[dbg_index],0)[dbg_index]=dbg_array(dbg_array(this.m_slotWorldVertices,t_index)[dbg_index],0)[dbg_index];
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<242>";
					dbg_array(dbg_array(this.m_slotWorldHull,t_index)[dbg_index],1)[dbg_index]=dbg_array(dbg_array(this.m_slotWorldVertices,t_index)[dbg_index],1)[dbg_index];
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<243>";
					dbg_array(dbg_array(this.m_slotWorldHull,t_index)[dbg_index],2)[dbg_index]=dbg_array(dbg_array(this.m_slotWorldVertices,t_index)[dbg_index],2)[dbg_index];
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<244>";
					dbg_array(dbg_array(this.m_slotWorldHull,t_index)[dbg_index],3)[dbg_index]=dbg_array(dbg_array(this.m_slotWorldVertices,t_index)[dbg_index],3)[dbg_index];
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<246>";
					dbg_array(dbg_array(this.m_slotWorldHull,t_index)[dbg_index],4)[dbg_index]=dbg_array(dbg_array(this.m_slotWorldVertices,t_index)[dbg_index],4)[dbg_index];
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<247>";
					dbg_array(dbg_array(this.m_slotWorldHull,t_index)[dbg_index],5)[dbg_index]=dbg_array(dbg_array(this.m_slotWorldVertices,t_index)[dbg_index],5)[dbg_index];
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<248>";
					dbg_array(dbg_array(this.m_slotWorldHull,t_index)[dbg_index],6)[dbg_index]=dbg_array(dbg_array(this.m_slotWorldVertices,t_index)[dbg_index],6)[dbg_index];
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<249>";
					dbg_array(dbg_array(this.m_slotWorldHull,t_index)[dbg_index],7)[dbg_index]=dbg_array(dbg_array(this.m_slotWorldVertices,t_index)[dbg_index],7)[dbg_index];
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<251>";
					if(t_1==2){
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<252>";
						var t_mesh=object_downcast((t_attachment),c_SpineMeshAttachment);
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<255>";
						t_length=dbg_object(t_mesh).m_Vertices.length;
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<256>";
						dbg_array(this.m_slotWorldVerticesLength,t_index)[dbg_index]=t_length;
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<257>";
						if(t_length==0){
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<258>";
							dbg_array(this.m_slotWorldTrianglesLength,t_index)[dbg_index]=0;
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<259>";
							continue;
						}
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<262>";
						if(t_length>dbg_array(this.m_slotWorldVertices,t_index)[dbg_index].length){
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<262>";
							dbg_array(this.m_slotWorldVertices,t_index)[dbg_index]=new_number_array(t_length);
						}
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<263>";
						t_mesh.p_ComputeWorldVertices2(t_slot,dbg_array(this.m_slotWorldVertices,t_index)[dbg_index]);
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<266>";
						t_length=((dbg_object(t_mesh).m_Triangles.length/3)|0)*12;
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<267>";
						dbg_array(this.m_slotWorldTrianglesLength,t_index)[dbg_index]=t_length;
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<268>";
						if(t_length>dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index].length){
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<268>";
							dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index]=new_number_array(t_length);
						}
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<273>";
						this.p_OnCalculateWorldTriangles(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],dbg_array(this.m_slotWorldVertices,t_index)[dbg_index],dbg_object(t_mesh).m_Triangles,dbg_object(t_mesh).m_RegionUVs,dbg_object(t_mesh).m_RenderObject);
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<277>";
						this.p_OnCalculateWorldColor(t_slot,t_index);
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<281>";
						this.p_OnCalculateWorldHull(t_index,dbg_object(t_mesh).m_HullLength);
					}else{
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<283>";
						if(t_1==3){
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<284>";
							var t_mesh2=object_downcast((t_attachment),c_SpineSkinnedMeshAttachment);
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<288>";
							t_length=0;
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<289>";
							var t_v=0;
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<290>";
							var t_n=dbg_object(t_mesh2).m_Bones.length;
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<291>";
							var t_nn=0;
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<292>";
							while(t_v<t_n){
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<293>";
								t_nn=dbg_array(dbg_object(t_mesh2).m_Bones,t_v)[dbg_index]+t_v;
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<294>";
								t_v+=t_nn-(t_v+1)+2;
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<295>";
								t_length+=2;
							}
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<298>";
							dbg_array(this.m_slotWorldVerticesLength,t_index)[dbg_index]=t_length;
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<299>";
							if(t_length==0){
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<300>";
								dbg_array(this.m_slotWorldTrianglesLength,t_index)[dbg_index]=0;
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<301>";
								continue;
							}
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<304>";
							if(t_length>dbg_array(this.m_slotWorldVertices,t_index)[dbg_index].length){
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<304>";
								dbg_array(this.m_slotWorldVertices,t_index)[dbg_index]=new_number_array(t_length);
							}
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<305>";
							t_mesh2.p_ComputeWorldVertices2(t_slot,dbg_array(this.m_slotWorldVertices,t_index)[dbg_index]);
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<308>";
							t_length=((dbg_object(t_mesh2).m_Triangles.length/3)|0)*12;
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<309>";
							dbg_array(this.m_slotWorldTrianglesLength,t_index)[dbg_index]=t_length;
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<310>";
							if(t_length>dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index].length){
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<310>";
								dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index]=new_number_array(t_length);
							}
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<314>";
							this.p_OnCalculateWorldTriangles(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],dbg_array(this.m_slotWorldVertices,t_index)[dbg_index],dbg_object(t_mesh2).m_Triangles,dbg_object(t_mesh2).m_RegionUVs,dbg_object(t_mesh2).m_RenderObject);
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<318>";
							this.p_OnCalculateWorldColor(t_slot,t_index);
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<321>";
							this.p_OnCalculateWorldHull(t_index,dbg_object(t_mesh2).m_HullLength);
						}
					}
				}
			}
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<326>";
		dbg_object(t_rootBone).m_X=t_oldRootX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<327>";
		dbg_object(t_rootBone).m_Y=t_oldRootY;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<328>";
		dbg_object(t_rootBone).m_ScaleX=t_oldRootScaleX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<329>";
		dbg_object(t_rootBone).m_ScaleY=t_oldRootScaleY;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<330>";
		dbg_object(t_rootBone).m_Rotation=t_oldRootRotation;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<333>";
		this.m_dirtyBounding=true;
	}
	pop_err();
}
c_SpineEntity.prototype.p_Calculate=function(t_force){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<817>";
	if(this.m_dirtyPose){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<818>";
		this.m_dirtyPose=false;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<819>";
		this.m_skeleton.p_SetToSetupPose();
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<820>";
		this.m_dirty=true;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<823>";
	if(t_force || this.m_dirty){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<823>";
		this.p_OnCalculate();
	}
	pop_err();
}
c_SpineEntity.prototype.p_OnCalculateBounding=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<386>";
	this.m_dirtyBounding=false;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<388>";
	var t_minX=999999999.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<389>";
	var t_minY=999999999.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<390>";
	var t_maxX=-999999999.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<391>";
	var t_maxY=-999999999.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<392>";
	var t_slot=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<393>";
	var t_attachment=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<394>";
	var t_vertices=[];
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<395>";
	var t_total=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<398>";
	for(var t_index=0;t_index<dbg_object(this.m_skeleton).m_Slots.length;t_index=t_index+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<400>";
		t_slot=dbg_array(dbg_object(this.m_skeleton).m_Slots,t_index)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<403>";
		t_attachment=t_slot.p_Attachment();
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<404>";
		if(t_attachment==null){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<404>";
			continue;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<406>";
		t_total=dbg_array(this.m_slotWorldVerticesLength,t_index)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<407>";
		if(t_total<6){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<407>";
			continue;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<408>";
		t_vertices=dbg_array(this.m_slotWorldBounding,t_index)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<411>";
		bb_spinefunctions_SpineGetPolyBounding(dbg_array(this.m_slotWorldVertices,t_index)[dbg_index],t_vertices,t_total);
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<416>";
		if(dbg_array(t_vertices,0)[dbg_index]<t_minX){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<416>";
			t_minX=dbg_array(t_vertices,0)[dbg_index];
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<417>";
		if(dbg_array(t_vertices,0)[dbg_index]>t_maxX){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<417>";
			t_maxX=dbg_array(t_vertices,0)[dbg_index];
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<418>";
		if(dbg_array(t_vertices,1)[dbg_index]<t_minY){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<418>";
			t_minY=dbg_array(t_vertices,1)[dbg_index];
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<419>";
		if(dbg_array(t_vertices,1)[dbg_index]>t_maxY){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<419>";
			t_maxY=dbg_array(t_vertices,1)[dbg_index];
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<420>";
		if(dbg_array(t_vertices,4)[dbg_index]<t_minX){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<420>";
			t_minX=dbg_array(t_vertices,4)[dbg_index];
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<421>";
		if(dbg_array(t_vertices,4)[dbg_index]>t_maxX){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<421>";
			t_maxX=dbg_array(t_vertices,4)[dbg_index];
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<422>";
		if(dbg_array(t_vertices,5)[dbg_index]<t_minY){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<422>";
			t_minY=dbg_array(t_vertices,5)[dbg_index];
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<423>";
		if(dbg_array(t_vertices,5)[dbg_index]>t_maxY){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<423>";
			t_maxY=dbg_array(t_vertices,5)[dbg_index];
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<428>";
	dbg_array(this.m_bounding,0)[dbg_index]=t_minX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<429>";
	dbg_array(this.m_bounding,1)[dbg_index]=t_minY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<430>";
	dbg_array(this.m_bounding,2)[dbg_index]=t_maxX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<431>";
	dbg_array(this.m_bounding,3)[dbg_index]=t_minY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<432>";
	dbg_array(this.m_bounding,4)[dbg_index]=t_maxX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<433>";
	dbg_array(this.m_bounding,5)[dbg_index]=t_maxY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<434>";
	dbg_array(this.m_bounding,6)[dbg_index]=t_minX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<435>";
	dbg_array(this.m_bounding,7)[dbg_index]=t_maxY;
	pop_err();
}
c_SpineEntity.prototype.p_CalculateBounding=function(t_force){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<828>";
	if(t_force || this.m_dirtyBounding){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<829>";
		this.p_Calculate(false);
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<830>";
		this.p_OnCalculateBounding();
	}
	pop_err();
}
c_SpineEntity.prototype.p_OnRender=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<504>";
	var t_index=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<505>";
	var t_subIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<506>";
	var t_triangleIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<507>";
	var t_slot=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<508>";
	var t_attachment=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<509>";
	var t_rendererObject=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<510>";
	var t_total=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<511>";
	var t_verts=new_number_array(12);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<512>";
	var t_length=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<516>";
	this.p_Calculate(false);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<520>";
	if(this.m_debugHideImages==false){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<522>";
		t_total=dbg_object(this.m_skeleton).m_DrawOrder.length;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<523>";
		for(t_index=0;t_index<t_total;t_index=t_index+1){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<525>";
			t_slot=dbg_array(dbg_object(this.m_skeleton).m_DrawOrder,t_index)[dbg_index];
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<526>";
			t_attachment=t_slot.p_Attachment();
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<529>";
			if(t_attachment==null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<529>";
				continue;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<532>";
			var t_2=dbg_object(t_attachment).m_Type;
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<533>";
			if(t_2==2){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<534>";
				var t_mesh=object_downcast((t_attachment),c_SpineMeshAttachment);
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<535>";
				t_rendererObject=dbg_object(t_mesh).m_RenderObject;
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<538>";
				bb_graphics_SetColor((dbg_array(this.m_slotWorldR,t_index)[dbg_index]),(dbg_array(this.m_slotWorldG,t_index)[dbg_index]),(dbg_array(this.m_slotWorldB,t_index)[dbg_index]));
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<539>";
				bb_graphics_SetAlpha(dbg_array(this.m_slotWorldAlpha,t_index)[dbg_index]);
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<542>";
				t_length=dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index].length;
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<543>";
				if(this.m_snapToPixels){
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<544>";
					for(t_triangleIndex=0;t_triangleIndex<t_length;t_triangleIndex=t_triangleIndex+12){
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<545>";
						for(t_subIndex=0;t_subIndex<12;t_subIndex=t_subIndex+1){
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<546>";
							dbg_array(t_verts,t_subIndex)[dbg_index]=dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_triangleIndex+t_subIndex)[dbg_index];
						}
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<548>";
						dbg_array(t_verts,0)[dbg_index]=((dbg_array(t_verts,0)[dbg_index])|0);
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<549>";
						dbg_array(t_verts,1)[dbg_index]=((dbg_array(t_verts,1)[dbg_index])|0);
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<550>";
						dbg_array(t_verts,4)[dbg_index]=((dbg_array(t_verts,4)[dbg_index])|0);
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<551>";
						dbg_array(t_verts,5)[dbg_index]=((dbg_array(t_verts,5)[dbg_index])|0);
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<552>";
						dbg_array(t_verts,8)[dbg_index]=((dbg_array(t_verts,8)[dbg_index])|0);
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<553>";
						dbg_array(t_verts,9)[dbg_index]=((dbg_array(t_verts,9)[dbg_index])|0);
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<554>";
						t_rendererObject.p_Draw(t_verts);
					}
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<557>";
					for(t_triangleIndex=0;t_triangleIndex<t_length;t_triangleIndex=t_triangleIndex+12){
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<558>";
						for(t_subIndex=0;t_subIndex<12;t_subIndex=t_subIndex+1){
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<559>";
							dbg_array(t_verts,t_subIndex)[dbg_index]=dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_triangleIndex+t_subIndex)[dbg_index];
						}
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<561>";
						t_rendererObject.p_Draw(t_verts);
					}
				}
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<565>";
				if(t_2==0){
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<566>";
					var t_region=object_downcast((t_attachment),c_SpineRegionAttachment);
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<569>";
					bb_graphics_SetColor((dbg_array(this.m_slotWorldR,t_index)[dbg_index]),(dbg_array(this.m_slotWorldG,t_index)[dbg_index]),(dbg_array(this.m_slotWorldB,t_index)[dbg_index]));
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<570>";
					bb_graphics_SetAlpha(dbg_array(this.m_slotWorldAlpha,t_index)[dbg_index]);
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<573>";
					if(this.m_snapToPixels){
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<574>";
						dbg_object(t_region).m_RenderObject.p_Draw2(((dbg_array(this.m_slotWorldX,t_index)[dbg_index])|0),((dbg_array(this.m_slotWorldY,t_index)[dbg_index])|0),dbg_array(this.m_slotWorldRotation,t_index)[dbg_index],dbg_array(this.m_slotWorldScaleX,t_index)[dbg_index],dbg_array(this.m_slotWorldScaleY,t_index)[dbg_index],dbg_object(this).m_atlasScale);
					}else{
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<576>";
						dbg_object(t_region).m_RenderObject.p_Draw2(dbg_array(this.m_slotWorldX,t_index)[dbg_index],dbg_array(this.m_slotWorldY,t_index)[dbg_index],dbg_array(this.m_slotWorldRotation,t_index)[dbg_index],dbg_array(this.m_slotWorldScaleX,t_index)[dbg_index],dbg_array(this.m_slotWorldScaleY,t_index)[dbg_index],dbg_object(this).m_atlasScale);
					}
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<579>";
					if(t_2==3){
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<580>";
						var t_mesh2=object_downcast((t_attachment),c_SpineSkinnedMeshAttachment);
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<581>";
						t_rendererObject=dbg_object(t_mesh2).m_RenderObject;
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<584>";
						bb_graphics_SetColor((dbg_array(this.m_slotWorldR,t_index)[dbg_index]),(dbg_array(this.m_slotWorldG,t_index)[dbg_index]),(dbg_array(this.m_slotWorldB,t_index)[dbg_index]));
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<585>";
						bb_graphics_SetAlpha(dbg_array(this.m_slotWorldAlpha,t_index)[dbg_index]);
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<588>";
						t_length=dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index].length;
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<589>";
						if(this.m_snapToPixels){
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<590>";
							for(t_triangleIndex=0;t_triangleIndex<t_length;t_triangleIndex=t_triangleIndex+12){
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<591>";
								for(t_subIndex=0;t_subIndex<12;t_subIndex=t_subIndex+1){
									err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<592>";
									dbg_array(t_verts,t_subIndex)[dbg_index]=dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_triangleIndex+t_subIndex)[dbg_index];
								}
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<594>";
								dbg_array(t_verts,0)[dbg_index]=((dbg_array(t_verts,0)[dbg_index])|0);
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<595>";
								dbg_array(t_verts,1)[dbg_index]=((dbg_array(t_verts,1)[dbg_index])|0);
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<596>";
								dbg_array(t_verts,4)[dbg_index]=((dbg_array(t_verts,4)[dbg_index])|0);
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<597>";
								dbg_array(t_verts,5)[dbg_index]=((dbg_array(t_verts,5)[dbg_index])|0);
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<598>";
								dbg_array(t_verts,8)[dbg_index]=((dbg_array(t_verts,8)[dbg_index])|0);
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<599>";
								dbg_array(t_verts,9)[dbg_index]=((dbg_array(t_verts,9)[dbg_index])|0);
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<600>";
								t_rendererObject.p_Draw(t_verts);
							}
						}else{
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<603>";
							for(t_triangleIndex=0;t_triangleIndex<t_length;t_triangleIndex=t_triangleIndex+12){
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<604>";
								for(t_subIndex=0;t_subIndex<12;t_subIndex=t_subIndex+1){
									err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<605>";
									dbg_array(t_verts,t_subIndex)[dbg_index]=dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_triangleIndex+t_subIndex)[dbg_index];
								}
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<607>";
								t_rendererObject.p_Draw(t_verts);
							}
						}
					}
				}
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<621>";
	t_total=dbg_object(this.m_skeleton).m_Slots.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<624>";
	if((t_total)!=0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<625>";
		if(this.m_debugBounding){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<625>";
			this.p_CalculateBounding(false);
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<628>";
	for(t_index=0;t_index<t_total;t_index=t_index+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<630>";
		t_slot=dbg_array(dbg_object(this.m_skeleton).m_Slots,t_index)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<631>";
		t_attachment=t_slot.p_Attachment();
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<634>";
		if(t_attachment==null){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<634>";
			continue;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<636>";
		var t_3=dbg_object(t_attachment).m_Type;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<637>";
		if(t_3==1 || t_3==2 || t_3==3 || t_3==0){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<639>";
			if(this.m_debugMesh){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<640>";
				t_length=dbg_array(this.m_slotWorldTrianglesLength,t_index)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<641>";
				if(t_length>0){
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<642>";
					bb_graphics_SetColor(0.0,229.0,255.0);
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<643>";
					if(this.m_snapToPixels){
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<644>";
						for(t_subIndex=0;t_subIndex<t_length;t_subIndex=t_subIndex+12){
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<645>";
							bb_graphics_DrawLine(((dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex)[dbg_index])|0),((dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+1)[dbg_index])|0),((dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+4)[dbg_index])|0),((dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+5)[dbg_index])|0));
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<646>";
							bb_graphics_DrawLine(((dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+4)[dbg_index])|0),((dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+5)[dbg_index])|0),((dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+8)[dbg_index])|0),((dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+9)[dbg_index])|0));
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<647>";
							bb_graphics_DrawLine(((dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+8)[dbg_index])|0),((dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+9)[dbg_index])|0),((dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex)[dbg_index])|0),((dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+1)[dbg_index])|0));
						}
					}else{
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<650>";
						for(t_subIndex=0;t_subIndex<t_length;t_subIndex=t_subIndex+12){
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<651>";
							bb_graphics_DrawLine(dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex)[dbg_index],dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+1)[dbg_index],dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+4)[dbg_index],dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+5)[dbg_index]);
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<652>";
							bb_graphics_DrawLine(dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+4)[dbg_index],dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+5)[dbg_index],dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+8)[dbg_index],dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+9)[dbg_index]);
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<653>";
							bb_graphics_DrawLine(dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+8)[dbg_index],dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+9)[dbg_index],dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex)[dbg_index],dbg_array(dbg_array(this.m_slotWorldTriangles,t_index)[dbg_index],t_subIndex+1)[dbg_index]);
						}
					}
				}
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<660>";
			if(this.m_debugHull){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<661>";
				t_length=dbg_array(this.m_slotWorldHullLength,t_index)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<662>";
				if(t_length>0){
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<663>";
					bb_graphics_SetColor(255.0,0.0,0.0);
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<664>";
					bb_spinefunctions_SpineDrawLinePoly(dbg_array(this.m_slotWorldHull,t_index)[dbg_index],dbg_array(this.m_slotWorldHullLength,t_index)[dbg_index],this.m_snapToPixels);
				}
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<669>";
			if(this.m_debugBounding){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<670>";
				bb_graphics_SetColor(128.0,0.0,255.0);
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<671>";
				bb_spinefunctions_SpineDrawLinePoly(dbg_array(this.m_slotWorldBounding,t_index)[dbg_index],-1,this.m_snapToPixels);
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<677>";
	if(this.m_debugBones){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<678>";
		var t_bone=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<679>";
		var t_size=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<682>";
		bb_graphics_SetColor(0.0,0.0,0.0);
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<683>";
		bb_graphics_SetAlpha(1.0);
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<684>";
		t_length=dbg_object(this.m_skeleton).m_Bones.length;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<685>";
		for(t_index=0;t_index<t_length;t_index=t_index+1){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<686>";
			t_bone=dbg_array(dbg_object(this.m_skeleton).m_Bones,t_index)[dbg_index];
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<687>";
			bb_graphics_DrawLine(dbg_object(t_bone).m_WorldX,dbg_object(t_bone).m_WorldY,dbg_object(dbg_object(t_bone).m_Data).m_Length*dbg_object(t_bone).m_M00+dbg_object(t_bone).m_WorldX,dbg_object(dbg_object(t_bone).m_Data).m_Length*dbg_object(t_bone).m_M10+dbg_object(t_bone).m_WorldY);
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<691>";
		for(t_index=0;t_index<t_length;t_index=t_index+1){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<692>";
			t_bone=dbg_array(dbg_object(this.m_skeleton).m_Bones,t_index)[dbg_index];
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<694>";
			if(t_index==0){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<697>";
				bb_graphics_SetColor(0.0,0.0,0.0);
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<698>";
				t_size=8;
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<699>";
				bb_graphics_DrawLine(dbg_object(t_bone).m_WorldX-(t_size),dbg_object(t_bone).m_WorldY-(t_size),dbg_object(t_bone).m_WorldX+(t_size),dbg_object(t_bone).m_WorldY-(t_size));
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<700>";
				bb_graphics_DrawLine(dbg_object(t_bone).m_WorldX+(t_size),dbg_object(t_bone).m_WorldY-(t_size),dbg_object(t_bone).m_WorldX+(t_size),dbg_object(t_bone).m_WorldY+(t_size));
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<701>";
				bb_graphics_DrawLine(dbg_object(t_bone).m_WorldX+(t_size),dbg_object(t_bone).m_WorldY+(t_size),dbg_object(t_bone).m_WorldX-(t_size),dbg_object(t_bone).m_WorldY+(t_size));
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<702>";
				bb_graphics_DrawLine(dbg_object(t_bone).m_WorldX-(t_size),dbg_object(t_bone).m_WorldY+(t_size),dbg_object(t_bone).m_WorldX-(t_size),dbg_object(t_bone).m_WorldY-(t_size));
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<703>";
				bb_graphics_DrawLine(dbg_object(t_bone).m_WorldX,dbg_object(t_bone).m_WorldY-(t_size)+2.0,dbg_object(t_bone).m_WorldX,dbg_object(t_bone).m_WorldY+(t_size)+2.0);
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<704>";
				bb_graphics_DrawLine(dbg_object(t_bone).m_WorldX-(t_size)+2.0,dbg_object(t_bone).m_WorldY,dbg_object(t_bone).m_WorldX+(t_size)+2.0,dbg_object(t_bone).m_WorldY);
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<708>";
				bb_graphics_SetColor(0.0,0.0,255.0);
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<710>";
				t_size=4;
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<711>";
				bb_graphics_DrawLine(dbg_object(t_bone).m_WorldX-(t_size),dbg_object(t_bone).m_WorldY-(t_size),dbg_object(t_bone).m_WorldX+(t_size),dbg_object(t_bone).m_WorldY-(t_size));
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<712>";
				bb_graphics_DrawLine(dbg_object(t_bone).m_WorldX+(t_size),dbg_object(t_bone).m_WorldY-(t_size),dbg_object(t_bone).m_WorldX+(t_size),dbg_object(t_bone).m_WorldY+(t_size));
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<713>";
				bb_graphics_DrawLine(dbg_object(t_bone).m_WorldX+(t_size),dbg_object(t_bone).m_WorldY+(t_size),dbg_object(t_bone).m_WorldX-(t_size),dbg_object(t_bone).m_WorldY+(t_size));
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<714>";
				bb_graphics_DrawLine(dbg_object(t_bone).m_WorldX-(t_size),dbg_object(t_bone).m_WorldY+(t_size),dbg_object(t_bone).m_WorldX-(t_size),dbg_object(t_bone).m_WorldY-(t_size));
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<722>";
	if(this.m_debugBounding){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<723>";
		bb_graphics_SetColor(128.0,0.0,255.0);
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<724>";
		bb_spinefunctions_SpineDrawLinePoly(this.m_bounding,-1,this.m_snapToPixels);
	}
	pop_err();
}
c_SpineEntity.prototype.p_Render=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<846>";
	if(this.m_rendering || this.m_updating){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<847>";
	this.m_rendering=true;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<848>";
	this.p_OnRender();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<849>";
	this.m_rendering=false;
	pop_err();
}
c_SpineEntity.prototype.p_StopAnimation=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1292>";
	if(this.m_playing){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1293>";
		this.m_playing=false;
	}
	pop_err();
}
c_SpineEntity.prototype.p_OnUpdate2=function(t_delta){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<440>";
	if(((this.m_animation)!=null) && this.m_playing){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<442>";
		this.m_lastTime=dbg_object(this.m_skeleton).m_Time;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<443>";
		if(t_delta!=0.0){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<443>";
			this.m_skeleton.p_Update(t_delta*this.m_speed);
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<446>";
		this.m_skeleton.p_SetBonesToSetupPose();
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<449>";
		this.m_animation.p_Apply2(this.m_skeleton,this.m_lastTime,dbg_object(this.m_skeleton).m_Time,this.m_events,this.m_looping);
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<452>";
		if((this.m_mixAnimation)!=null){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<452>";
			this.m_mixAnimation.p_Mix(this.m_skeleton,this.m_lastTime,dbg_object(this.m_skeleton).m_Time,this.m_looping,this.m_events,this.m_mixAmount);
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<455>";
		this.m_dirty=true;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<458>";
		this.p_OnProcessEvents();
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<461>";
		if(dbg_object(this.m_skeleton).m_Time>=dbg_object(this.m_animation).m_Duration){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<462>";
			if(this.m_looping==false){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<463>";
				this.p_StopAnimation();
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<464>";
				this.m_finished=true;
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<467>";
				if((this.m_callback)!=null){
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<467>";
					this.m_callback.p_OnSpineEntityAnimationComplete(this,dbg_object(this.m_animation).m_Name);
				}
			}
		}
	}
	pop_err();
}
c_SpineEntity.prototype.p_Update=function(t_delta){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<837>";
	if(this.m_updating || this.m_rendering){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<838>";
	this.m_updating=true;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<839>";
	this.p_OnUpdate2(t_delta);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<840>";
	this.m_updating=false;
	pop_err();
}
c_SpineEntity.prototype.p_PointInside=function(t_x,t_y,t_precision){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<944>";
	this.p_CalculateBounding(false);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<947>";
	if(bb_spinefunctions_SpinePointInRect2(t_x,t_y,this.m_bounding)==false){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<947>";
		pop_err();
		return false;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<948>";
	if(t_precision<1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<948>";
		pop_err();
		return true;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<951>";
	var t_slot=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<954>";
	for(var t_index=dbg_object(this.m_skeleton).m_DrawOrder.length-1;t_index>=0;t_index=t_index+-1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<956>";
		t_slot=dbg_array(dbg_object(this.m_skeleton).m_DrawOrder,t_index)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<957>";
		if(t_slot.p_Attachment()==null){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<957>";
			continue;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<959>";
		if(bb_spinefunctions_SpinePointInRect2(t_x,t_y,dbg_array(this.m_slotWorldBounding,t_index)[dbg_index])){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<960>";
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<961>";
			if(bb_spinefunctions_SpinePointInPoly(t_x,t_y,dbg_array(this.m_slotWorldHull,t_index)[dbg_index],dbg_array(this.m_slotWorldHullLength,t_index)[dbg_index])){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<961>";
				pop_err();
				return true;
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<966>";
	pop_err();
	return false;
}
c_SpineEntity.prototype.p_SetColor=function(t_r,t_g,t_b){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1134>";
	dbg_object(this.m_skeleton).m_R=(t_r)/255.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1135>";
	dbg_object(this.m_skeleton).m_G=(t_g)/255.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1136>";
	dbg_object(this.m_skeleton).m_B=(t_b)/255.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineentity.monkey<1139>";
	this.m_dirty=true;
	pop_err();
}
function bb_filepath_ExtractDir(t_path){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<10>";
	var t_i=t_path.lastIndexOf("/");
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<11>";
	if(t_i==-1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<11>";
		t_i=t_path.lastIndexOf("\\");
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<12>";
	if(t_i!=-1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<12>";
		var t_=t_path.slice(0,t_i);
		pop_err();
		return t_;
	}
	pop_err();
	return "";
}
function bb_filepath_StripExt(t_path){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<16>";
	var t_i=t_path.lastIndexOf(".");
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<17>";
	if(t_i!=-1 && t_path.indexOf("/",t_i+1)==-1 && t_path.indexOf("\\",t_i+1)==-1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<17>";
		var t_=t_path.slice(0,t_i);
		pop_err();
		return t_;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<18>";
	pop_err();
	return t_path;
}
function bb_filepath_StripDir(t_path){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<3>";
	var t_i=t_path.lastIndexOf("/");
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<4>";
	if(t_i==-1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<4>";
		t_i=t_path.lastIndexOf("\\");
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<5>";
	if(t_i!=-1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<5>";
		var t_=t_path.slice(t_i+1);
		pop_err();
		return t_;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<6>";
	pop_err();
	return t_path;
}
function bb_filepath_StripAll(t_path){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/filepath.monkey<28>";
	var t_=bb_filepath_StripDir(bb_filepath_StripExt(t_path));
	pop_err();
	return t_;
}
function c_SpineMojoFileLoader(){
	Object.call(this);
	this.implments={c_SpineFileLoader:1};
}
c_SpineMojoFileLoader.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofileloader.monkey<6>";
	pop_err();
	return this;
}
c_SpineMojoFileLoader.prototype.p_Load=function(t_path){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofileloader.monkey<8>";
	var t_file=c_SpineMojoFile.m_new.call(new c_SpineMojoFile);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofileloader.monkey<9>";
	t_file.p_Load(t_path);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofileloader.monkey<10>";
	var t_=(t_file);
	pop_err();
	return t_;
}
var bb_spinemojo_spineMojoFileLoader=null;
function c_SpineMojoAtlasLoader(){
	Object.call(this);
	this.implments={c_SpineAtlasLoader:1};
}
c_SpineMojoAtlasLoader.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasloader.monkey<6>";
	pop_err();
	return this;
}
c_SpineMojoAtlasLoader.prototype.p_Load2=function(t_file,t_dir,t_textureLoader){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasloader.monkey<8>";
	var t_atlas=c_SpineMojoAtlas.m_new.call(new c_SpineMojoAtlas);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasloader.monkey<9>";
	t_atlas.p_Load2(t_file,t_dir,t_textureLoader);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasloader.monkey<10>";
	var t_=(t_atlas);
	pop_err();
	return t_;
}
var bb_spinemojo_spineMojoAtlasLoader=null;
function c_SpineMojoTextureLoader(){
	Object.call(this);
	this.implments={c_SpineTextureLoader:1};
}
c_SpineMojoTextureLoader.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotextureloader.monkey<6>";
	pop_err();
	return this;
}
c_SpineMojoTextureLoader.prototype.p_Load=function(t_path){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotextureloader.monkey<8>";
	var t_texture=c_SpineMojoTexture.m_new.call(new c_SpineMojoTexture);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotextureloader.monkey<9>";
	t_texture.p_Load(t_path);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotextureloader.monkey<10>";
	var t_=(t_texture);
	pop_err();
	return t_;
}
var bb_spinemojo_spineMojoTextureLoader=null;
function c_SpineSkeletonJson(){
	Object.call(this);
	this.m_attachmentLoader=null;
	this.m_file=null;
	this.m_Scale=.0;
}
c_SpineSkeletonJson.m_new=function(t_atlas,t_file){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<23>";
	if(t_file==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<23>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"file loader cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<26>";
	dbg_object(this).m_attachmentLoader=(c_SpineAtlasAttachmentLoader.m_new.call(new c_SpineAtlasAttachmentLoader,t_atlas));
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<27>";
	dbg_object(this).m_file=t_file;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<30>";
	this.m_Scale=1.0;
	pop_err();
	return this;
}
c_SpineSkeletonJson.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<6>";
	pop_err();
	return this;
}
c_SpineSkeletonJson.prototype.p_GetBool=function(t_jsonObject,t_name,t_defaultValue){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<448>";
	var t_result=t_jsonObject.p_GetItem2(t_name,"");
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<449>";
	if(t_result==""){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<449>";
		pop_err();
		return t_defaultValue;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<450>";
	var t_=t_result=="true";
	pop_err();
	return t_;
}
c_SpineSkeletonJson.m_ToColor=function(t_hex,t_colorIndex){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<454>";
	if(t_hex.length!=8){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<454>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"Color hexidecimal length must be 8, recieved: "+t_hex);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<456>";
	var t_val=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<457>";
	var t_offset=t_colorIndex*2;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<458>";
	t_hex=t_hex.toUpperCase();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<459>";
	for(var t_i=t_offset;t_i<t_offset+2;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<460>";
		t_val*=16;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<461>";
		if(dbg_charCodeAt(t_hex,t_i)>=48 && dbg_charCodeAt(t_hex,t_i)<=57){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<462>";
			t_val+=dbg_charCodeAt(t_hex,t_i)-48;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<464>";
			t_val+=dbg_charCodeAt(t_hex,t_i)-55;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<468>";
	var t_=(t_val)/255.0;
	pop_err();
	return t_;
}
c_SpineSkeletonJson.prototype.p_GetFloatArray=function(t_jsonObject,t_name,t_scale){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<409>";
	var t_list=object_downcast((t_jsonObject.p_GetItem(t_name)),c_JSONArray);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<410>";
	if(t_list==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<410>";
		pop_err();
		return [];
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<413>";
	var t_total=dbg_object(t_list).m_values.p_Count();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<414>";
	var t_values=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<415>";
	if(t_scale==1.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<416>";
		var t_i=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<417>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<417>";
		var t_=t_list.p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<417>";
		while(t_.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<417>";
			var t_listItem=t_.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<418>";
			dbg_array(t_values,t_i)[dbg_index]=t_listItem.p_ToFloat();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<419>";
			t_i+=1;
		}
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<422>";
		var t_i2=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<423>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<423>";
		var t_2=t_list.p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<423>";
		while(t_2.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<423>";
			var t_listItem2=t_2.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<424>";
			dbg_array(t_values,t_i2)[dbg_index]=t_listItem2.p_ToFloat()*t_scale;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<425>";
			t_i2+=1;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<428>";
	pop_err();
	return t_values;
}
c_SpineSkeletonJson.prototype.p_GetIntArray=function(t_jsonObject,t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<432>";
	var t_list=object_downcast((t_jsonObject.p_GetItem(t_name)),c_JSONArray);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<433>";
	if(t_list==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<433>";
		pop_err();
		return [];
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<436>";
	var t_total=dbg_object(t_list).m_values.p_Count();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<437>";
	var t_values=new_number_array(t_total);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<439>";
	var t_i=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<440>";
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<440>";
	var t_=t_list.p_ObjectEnumerator();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<440>";
	while(t_.p_HasNext()){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<440>";
		var t_listItem=t_.p_NextObject();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<441>";
		dbg_array(t_values,t_i)[dbg_index]=t_listItem.p_ToInt();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<442>";
		t_i+=1;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<444>";
	pop_err();
	return t_values;
}
c_SpineSkeletonJson.prototype.p_ReadAttachment=function(t_skin,t_name,t_jsonAttachment){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<245>";
	var t_jsonItem=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<246>";
	var t_color="";
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<248>";
	t_jsonItem=t_jsonAttachment.p_GetItem("name");
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<249>";
	if(t_jsonItem!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<249>";
		t_name=t_jsonItem.p_ToString();
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<251>";
	var t_type=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<252>";
	t_jsonItem=t_jsonAttachment.p_GetItem("type");
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<253>";
	if(t_jsonItem!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<253>";
		t_type=c_SpineAttachmentType.m_FromString(t_jsonItem.p_ToString());
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<255>";
	var t_path=t_name;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<256>";
	t_jsonItem=t_jsonAttachment.p_GetItem("path");
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<257>";
	if(t_jsonItem!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<257>";
		t_path=t_jsonItem.p_ToString();
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<259>";
	var t_1=t_type;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<260>";
	if(t_1==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<261>";
		var t_region=this.m_attachmentLoader.p_NewRegionAttachment(t_skin,t_name,t_path);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<262>";
		if(t_region==null){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<263>";
			pop_err();
			return null;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<266>";
		dbg_object(t_region).m_Path=t_path;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<267>";
		dbg_object(t_region).m_X=t_jsonAttachment.p_GetItem4("x",0.0)*this.m_Scale;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<268>";
		dbg_object(t_region).m_Y=t_jsonAttachment.p_GetItem4("y",0.0)*this.m_Scale;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<269>";
		dbg_object(t_region).m_ScaleX=t_jsonAttachment.p_GetItem4("scaleX",1.0);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<270>";
		dbg_object(t_region).m_ScaleY=t_jsonAttachment.p_GetItem4("scaleY",1.0);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<271>";
		dbg_object(t_region).m_Rotation=t_jsonAttachment.p_GetItem4("rotation",0.0);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<272>";
		dbg_object(t_region).m_Width=t_jsonAttachment.p_GetItem4("width",32.0)*this.m_Scale;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<273>";
		dbg_object(t_region).m_Height=t_jsonAttachment.p_GetItem4("height",32.0)*this.m_Scale;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<274>";
		t_region.p_UpdateOffset();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<276>";
		t_jsonItem=t_jsonAttachment.p_GetItem("color");
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<277>";
		if(t_jsonItem!=null){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<278>";
			t_color=t_jsonItem.p_ToString();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<279>";
			dbg_object(t_region).m_R=c_SpineSkeletonJson.m_ToColor(t_color,0);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<280>";
			dbg_object(t_region).m_G=c_SpineSkeletonJson.m_ToColor(t_color,1);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<281>";
			dbg_object(t_region).m_B=c_SpineSkeletonJson.m_ToColor(t_color,2);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<282>";
			dbg_object(t_region).m_A=c_SpineSkeletonJson.m_ToColor(t_color,3);
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<285>";
		var t_=(t_region);
		pop_err();
		return t_;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<287>";
		if(t_1==2){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<288>";
			var t_mesh=this.m_attachmentLoader.p_NewMeshAttachment(t_skin,t_name,t_path);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<289>";
			if(t_mesh==null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<290>";
				pop_err();
				return null;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<293>";
			dbg_object(t_mesh).m_Path=t_path;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<294>";
			dbg_object(t_mesh).m_Vertices=this.p_GetFloatArray(t_jsonAttachment,"vertices",this.m_Scale);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<295>";
			dbg_object(t_mesh).m_Triangles=this.p_GetIntArray(t_jsonAttachment,"triangles");
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<296>";
			dbg_object(t_mesh).m_RegionUVs=this.p_GetFloatArray(t_jsonAttachment,"uvs",1.0);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<297>";
			t_mesh.p_UpdateUVs();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<299>";
			t_jsonItem=t_jsonAttachment.p_GetItem("color");
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<300>";
			if(t_jsonItem!=null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<301>";
				t_color=t_jsonItem.p_ToString();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<302>";
				dbg_object(t_mesh).m_R=c_SpineSkeletonJson.m_ToColor(t_color,0);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<303>";
				dbg_object(t_mesh).m_G=c_SpineSkeletonJson.m_ToColor(t_color,1);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<304>";
				dbg_object(t_mesh).m_B=c_SpineSkeletonJson.m_ToColor(t_color,2);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<305>";
				dbg_object(t_mesh).m_A=c_SpineSkeletonJson.m_ToColor(t_color,3);
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<308>";
			dbg_object(t_mesh).m_HullLength=t_jsonAttachment.p_GetItem3("hull",0)*2;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<310>";
			t_jsonItem=t_jsonAttachment.p_GetItem("edges");
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<311>";
			if(t_jsonItem!=null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<311>";
				dbg_object(t_mesh).m_Edges=this.p_GetIntArray(t_jsonAttachment,"edges");
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<313>";
			dbg_object(t_mesh).m_Width=t_jsonAttachment.p_GetItem4("width",0.0)*this.m_Scale;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<314>";
			dbg_object(t_mesh).m_Height=t_jsonAttachment.p_GetItem4("height",0.0)*this.m_Scale;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<316>";
			var t_2=(t_mesh);
			pop_err();
			return t_2;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<318>";
			if(t_1==3){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<319>";
				var t_mesh2=this.m_attachmentLoader.p_NewSkinnedMeshAttachment(t_skin,t_name,t_path);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<320>";
				if(t_mesh2==null){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<321>";
					pop_err();
					return null;
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<324>";
				dbg_object(t_mesh2).m_Path=t_path;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<325>";
				var t_uvs=this.p_GetFloatArray(t_jsonAttachment,"uvs",1.0);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<327>";
				var t_vertices=this.p_GetFloatArray(t_jsonAttachment,"vertices",1.0);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<328>";
				var t_verticesCount=t_vertices.length;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<329>";
				var t_bonesCount=0;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<330>";
				var t_meshBonesCount=0;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<331>";
				var t_meshWeightsCount=0;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<332>";
				var t_i=0;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<333>";
				var t_nn=0;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<335>";
				t_i=0;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<336>";
				while(t_i<t_verticesCount){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<337>";
					t_bonesCount=((dbg_array(t_vertices,t_i)[dbg_index])|0);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<338>";
					t_meshBonesCount+=t_bonesCount+1;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<339>";
					t_meshWeightsCount+=t_bonesCount*3;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<340>";
					t_i+=1+t_bonesCount*4;
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<343>";
				var t_bones=new_number_array(t_meshBonesCount);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<344>";
				var t_weights=new_number_array(t_meshWeightsCount);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<345>";
				var t_b=0;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<346>";
				var t_w=0;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<348>";
				t_i=0;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<349>";
				while(t_i<t_verticesCount){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<350>";
					t_bonesCount=((dbg_array(t_vertices,t_i)[dbg_index])|0);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<351>";
					t_i+=1;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<353>";
					dbg_array(t_bones,t_b)[dbg_index]=t_bonesCount;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<354>";
					t_b+=1;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<356>";
					t_nn=t_i+t_bonesCount*4;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<357>";
					while(t_i<t_nn){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<358>";
						dbg_array(t_bones,t_b)[dbg_index]=((dbg_array(t_vertices,t_i)[dbg_index])|0);
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<360>";
						dbg_array(t_weights,t_w)[dbg_index]=dbg_array(t_vertices,t_i+1)[dbg_index]*this.m_Scale;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<361>";
						dbg_array(t_weights,t_w+1)[dbg_index]=dbg_array(t_vertices,t_i+2)[dbg_index]*this.m_Scale;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<362>";
						dbg_array(t_weights,t_w+2)[dbg_index]=dbg_array(t_vertices,t_i+3)[dbg_index];
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<364>";
						t_i+=4;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<365>";
						t_b+=1;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<366>";
						t_w+=3;
					}
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<370>";
				dbg_object(t_mesh2).m_Bones=t_bones;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<371>";
				dbg_object(t_mesh2).m_Weights=t_weights;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<372>";
				dbg_object(t_mesh2).m_Triangles=this.p_GetIntArray(t_jsonAttachment,"triangles");
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<373>";
				dbg_object(t_mesh2).m_RegionUVs=t_uvs;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<374>";
				t_mesh2.p_UpdateUVs();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<376>";
				t_jsonItem=t_jsonAttachment.p_GetItem("color");
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<377>";
				if(t_jsonItem!=null){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<378>";
					t_color=t_jsonItem.p_ToString();
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<379>";
					dbg_object(t_mesh2).m_R=c_SpineSkeletonJson.m_ToColor(t_color,0);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<380>";
					dbg_object(t_mesh2).m_G=c_SpineSkeletonJson.m_ToColor(t_color,1);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<381>";
					dbg_object(t_mesh2).m_B=c_SpineSkeletonJson.m_ToColor(t_color,2);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<382>";
					dbg_object(t_mesh2).m_A=c_SpineSkeletonJson.m_ToColor(t_color,3);
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<385>";
				dbg_object(t_mesh2).m_HullLength=t_jsonAttachment.p_GetItem3("hull",0)*2;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<387>";
				t_jsonItem=t_jsonAttachment.p_GetItem("edges");
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<388>";
				if(t_jsonItem!=null){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<388>";
					dbg_object(t_mesh2).m_Edges=this.p_GetIntArray(t_jsonAttachment,"edges");
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<390>";
				dbg_object(t_mesh2).m_Width=t_jsonAttachment.p_GetItem4("width",0.0)*this.m_Scale;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<391>";
				dbg_object(t_mesh2).m_Height=t_jsonAttachment.p_GetItem4("height",0.0)*this.m_Scale;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<393>";
				var t_3=(t_mesh2);
				pop_err();
				return t_3;
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<395>";
				if(t_1==1){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<396>";
					var t_box=this.m_attachmentLoader.p_NewBoundingBoxAttachment(t_skin,t_name);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<397>";
					if(t_box==null){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<398>";
						pop_err();
						return null;
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<401>";
					dbg_object(t_box).m_Vertices=this.p_GetFloatArray(t_jsonAttachment,"vertices",this.m_Scale);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<402>";
					var t_4=(t_box);
					pop_err();
					return t_4;
				}
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<405>";
	pop_err();
	return null;
}
c_SpineSkeletonJson.prototype.p_ReadCurve=function(t_timeline,t_frameIndex,t_jsonTimelineFrame){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<908>";
	var t_jsonItem=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<910>";
	t_jsonItem=t_jsonTimelineFrame.p_GetItem("curve");
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<911>";
	if(t_jsonItem==null){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<913>";
	var t_4=t_jsonItem.p_ToString();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<914>";
	if(t_4=="stepped"){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<915>";
		t_timeline.p_SetStepped(t_frameIndex);
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<917>";
		var t_jsonArray=object_downcast((t_jsonItem),c_JSONArray);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<918>";
		if(t_jsonArray!=null){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<920>";
			var t_curve=dbg_object(t_jsonArray).m_values.p_ToArray();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<921>";
			t_timeline.p_SetCurve(t_frameIndex,(dbg_array(t_curve,0)[dbg_index].p_ToFloat()),(dbg_array(t_curve,1)[dbg_index].p_ToFloat()),(dbg_array(t_curve,2)[dbg_index].p_ToFloat()),(dbg_array(t_curve,3)[dbg_index].p_ToFloat()));
		}
	}
	pop_err();
}
c_SpineSkeletonJson.prototype.p_ReadAnimation=function(t_name,t_jsonAnimation,t_skeletonData){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<473>";
	var t_timelines=[];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<474>";
	var t_timelineCount=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<476>";
	var t_duration=0.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<478>";
	var t_index=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<479>";
	var t_jsonGroupObject=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<480>";
	var t_jsonGroupArray=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<481>";
	var t_jsonBone=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<482>";
	var t_jsonTimeline=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<483>";
	var t_jsonTimelineFrameDataItem=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<484>";
	var t_jsonTimelineFrame=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<485>";
	var t_boneName="";
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<486>";
	var t_boneIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<487>";
	var t_timelineName="";
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<488>";
	var t_frameIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<489>";
	var t_timelineScale=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<490>";
	var t_slotIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<491>";
	var t_slotName="";
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<494>";
	t_jsonGroupObject=object_downcast((t_jsonAnimation.p_GetItem("slots")),c_JSONObject);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<495>";
	if(t_jsonGroupObject!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<496>";
		var t_jsonSlot=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<497>";
		var t_c="";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<499>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<499>";
		var t_=t_jsonGroupObject.p_Names().p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<499>";
		while(t_.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<499>";
			t_slotName=t_.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<500>";
			t_jsonSlot=object_downcast((t_jsonGroupObject.p_GetItem(t_slotName)),c_JSONObject);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<501>";
			if(t_jsonSlot==null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<501>";
				continue;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<503>";
			t_slotIndex=t_skeletonData.p_FindSlotIndex(t_slotName);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<505>";
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<505>";
			var t_2=t_jsonSlot.p_Names().p_ObjectEnumerator();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<505>";
			while(t_2.p_HasNext()){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<505>";
				t_timelineName=t_2.p_NextObject();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<506>";
				t_jsonTimeline=object_downcast((t_jsonSlot.p_GetItem(t_timelineName)),c_JSONArray);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<508>";
				var t_22=t_timelineName;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<509>";
				if(t_22=="color"){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<510>";
					var t_timeline=c_SpineColorTimeline.m_new.call(new c_SpineColorTimeline,dbg_object(t_jsonTimeline).m_values.p_Count());
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<511>";
					dbg_object(t_timeline).m_SlotIndex=t_slotIndex;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<513>";
					t_frameIndex=0;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<514>";
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<514>";
					var t_3=t_jsonTimeline.p_ObjectEnumerator();
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<514>";
					while(t_3.p_HasNext()){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<514>";
						t_jsonTimelineFrameDataItem=t_3.p_NextObject();
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<516>";
						t_jsonTimelineFrame=object_downcast((t_jsonTimelineFrameDataItem),c_JSONObject);
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<519>";
						t_c=t_jsonTimelineFrame.p_GetItem2("color","");
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<520>";
						t_timeline.p_SetFrame(t_frameIndex,t_jsonTimelineFrame.p_GetItem4("time",0.0),c_SpineSkeletonJson.m_ToColor(t_c,0),c_SpineSkeletonJson.m_ToColor(t_c,1),c_SpineSkeletonJson.m_ToColor(t_c,2),c_SpineSkeletonJson.m_ToColor(t_c,3));
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<521>";
						this.p_ReadCurve((t_timeline),t_frameIndex,t_jsonTimelineFrame);
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<522>";
						t_frameIndex+=1;
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<525>";
					if(t_timelineCount>=t_timelines.length){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<525>";
						t_timelines=resize_object_array(t_timelines,t_timelines.length*2+10);
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<526>";
					dbg_array(t_timelines,t_timelineCount)[dbg_index]=(t_timeline);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<527>";
					t_timelineCount+=1;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<529>";
					t_duration=bb_math_Max2(t_duration,dbg_array(dbg_object(t_timeline).m_Frames,t_timeline.p_FrameCount()*5-5)[dbg_index]);
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<531>";
					if(t_22=="attachment"){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<532>";
						var t_timeline2=c_SpineAttachmentTimeline.m_new.call(new c_SpineAttachmentTimeline,dbg_object(t_jsonTimeline).m_values.p_Count());
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<533>";
						dbg_object(t_timeline2).m_SlotIndex=t_slotIndex;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<535>";
						t_frameIndex=0;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<536>";
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<536>";
						var t_4=t_jsonTimeline.p_ObjectEnumerator();
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<536>";
						while(t_4.p_HasNext()){
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<536>";
							t_jsonTimelineFrameDataItem=t_4.p_NextObject();
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<538>";
							t_jsonTimelineFrame=object_downcast((t_jsonTimelineFrameDataItem),c_JSONObject);
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<541>";
							t_timeline2.p_SetFrame2(t_frameIndex,t_jsonTimelineFrame.p_GetItem4("time",0.0),t_jsonTimelineFrame.p_GetItem2("name",""));
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<542>";
							t_frameIndex+=1;
						}
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<545>";
						if(t_timelineCount>=t_timelines.length){
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<545>";
							t_timelines=resize_object_array(t_timelines,t_timelines.length*2+10);
						}
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<546>";
						dbg_array(t_timelines,t_timelineCount)[dbg_index]=(t_timeline2);
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<547>";
						t_timelineCount+=1;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<549>";
						t_duration=bb_math_Max2(t_duration,dbg_array(dbg_object(t_timeline2).m_Frames,t_timeline2.p_FrameCount()-1)[dbg_index]);
					}else{
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<551>";
						throw c_SpineException.m_new.call(new c_SpineException,"Invalid type:timeline For a slot: "+t_timelineName+" ("+t_slotName+")");
					}
				}
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<559>";
	t_jsonGroupObject=object_downcast((t_jsonAnimation.p_GetItem("bones")),c_JSONObject);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<560>";
	if(t_jsonGroupObject!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<561>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<561>";
		var t_5=t_jsonGroupObject.p_Names().p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<561>";
		while(t_5.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<561>";
			t_boneName=t_5.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<562>";
			t_jsonBone=object_downcast((t_jsonGroupObject.p_GetItem(t_boneName)),c_JSONObject);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<563>";
			if(t_jsonBone==null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<563>";
				continue;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<565>";
			t_boneIndex=t_skeletonData.p_FindBoneIndex(t_boneName);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<566>";
			if(t_boneIndex==-1){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<566>";
				throw c_SpineException.m_new.call(new c_SpineException,"Bone not found: "+t_boneName);
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<568>";
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<568>";
			var t_6=t_jsonBone.p_Names().p_ObjectEnumerator();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<568>";
			while(t_6.p_HasNext()){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<568>";
				t_timelineName=t_6.p_NextObject();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<569>";
				t_jsonTimeline=object_downcast((t_jsonBone.p_GetItem(t_timelineName)),c_JSONArray);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<570>";
				if(t_jsonTimeline==null){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<570>";
					continue;
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<572>";
				var t_32=t_timelineName;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<573>";
				if(t_32=="rotate"){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<574>";
					var t_timeline3=c_SpineRotateTimeline.m_new.call(new c_SpineRotateTimeline,dbg_object(t_jsonTimeline).m_values.p_Count());
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<575>";
					dbg_object(t_timeline3).m_BoneIndex=t_boneIndex;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<577>";
					t_frameIndex=0;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<578>";
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<578>";
					var t_7=t_jsonTimeline.p_ObjectEnumerator();
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<578>";
					while(t_7.p_HasNext()){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<578>";
						t_jsonTimelineFrameDataItem=t_7.p_NextObject();
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<580>";
						t_jsonTimelineFrame=object_downcast((t_jsonTimelineFrameDataItem),c_JSONObject);
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<583>";
						t_timeline3.p_SetFrame3(t_frameIndex,t_jsonTimelineFrame.p_GetItem4("time",0.0),t_jsonTimelineFrame.p_GetItem4("angle",0.0));
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<584>";
						this.p_ReadCurve((t_timeline3),t_frameIndex,t_jsonTimelineFrame);
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<585>";
						t_frameIndex+=1;
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<589>";
					if(t_timelineCount>=t_timelines.length){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<589>";
						t_timelines=resize_object_array(t_timelines,t_timelines.length*2+10);
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<590>";
					dbg_array(t_timelines,t_timelineCount)[dbg_index]=(t_timeline3);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<591>";
					t_timelineCount+=1;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<593>";
					t_duration=bb_math_Max2(t_duration,dbg_array(dbg_object(t_timeline3).m_Frames,t_timeline3.p_FrameCount()*2-2)[dbg_index]);
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<595>";
					if(t_32=="translate" || t_32=="scale"){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<596>";
						var t_timeline4=null;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<597>";
						t_timelineScale=1.0;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<599>";
						if(t_timelineName=="scale"){
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<600>";
							t_timeline4=(c_SpineScaleTimeline.m_new.call(new c_SpineScaleTimeline,dbg_object(t_jsonTimeline).m_values.p_Count()));
						}else{
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<602>";
							t_timeline4=c_SpineTranslateTimeline.m_new.call(new c_SpineTranslateTimeline,dbg_object(t_jsonTimeline).m_values.p_Count());
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<603>";
							t_timelineScale=this.m_Scale;
						}
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<605>";
						dbg_object(t_timeline4).m_BoneIndex=t_boneIndex;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<607>";
						t_frameIndex=0;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<608>";
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<608>";
						var t_8=t_jsonTimeline.p_ObjectEnumerator();
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<608>";
						while(t_8.p_HasNext()){
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<608>";
							t_jsonTimelineFrameDataItem=t_8.p_NextObject();
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<610>";
							t_jsonTimelineFrame=object_downcast((t_jsonTimelineFrameDataItem),c_JSONObject);
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<613>";
							t_timeline4.p_SetFrame4(t_frameIndex,t_jsonTimelineFrame.p_GetItem4("time",0.0),t_jsonTimelineFrame.p_GetItem4("x",0.0)*t_timelineScale,t_jsonTimelineFrame.p_GetItem4("y",0.0)*t_timelineScale);
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<614>";
							this.p_ReadCurve((t_timeline4),t_frameIndex,t_jsonTimelineFrame);
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<615>";
							t_frameIndex+=1;
						}
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<618>";
						if(t_timelineCount>=t_timelines.length){
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<618>";
							t_timelines=resize_object_array(t_timelines,t_timelines.length*2+10);
						}
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<619>";
						dbg_array(t_timelines,t_timelineCount)[dbg_index]=(t_timeline4);
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<620>";
						t_timelineCount+=1;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<622>";
						t_duration=bb_math_Max2(t_duration,dbg_array(dbg_object(t_timeline4).m_Frames,t_timeline4.p_FrameCount()*3-3)[dbg_index]);
					}else{
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<624>";
						throw c_SpineException.m_new.call(new c_SpineException,"Invalid type:timeline For a bone: "+t_timelineName+" ("+t_boneName+")");
					}
				}
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<631>";
	t_jsonGroupArray=object_downcast((t_jsonAnimation.p_GetItem("ik")),c_JSONArray);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<632>";
	if(t_jsonGroupArray!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<633>";
		var t_jsonIkConstraint=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<634>";
		var t_bendPositive=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<636>";
		var t_timeline5=c_SpineIkConstraintTimeline.m_new.call(new c_SpineIkConstraintTimeline,dbg_object(t_jsonGroupArray).m_values.p_Count());
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<637>";
		t_frameIndex=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<639>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<639>";
		var t_9=t_jsonGroupArray.p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<639>";
		while(t_9.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<639>";
			t_jsonTimelineFrameDataItem=t_9.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<640>";
			t_jsonIkConstraint=object_downcast((t_jsonTimelineFrameDataItem),c_JSONObject);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<642>";
			if(this.p_GetBool(t_jsonTimelineFrame,"bendPositive",true)){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<643>";
				t_bendPositive=1;
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<645>";
				t_bendPositive=-1;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<647>";
			t_timeline5.p_SetFrame5(t_frameIndex,t_jsonTimelineFrame.p_GetItem4("time",0.0),t_jsonTimelineFrame.p_GetItem4("mix",1.0),t_bendPositive);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<648>";
			this.p_ReadCurve((t_timeline5),t_frameIndex,t_jsonTimelineFrame);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<649>";
			t_frameIndex+=1;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<652>";
		if(t_timelineCount>=t_timelines.length){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<652>";
			t_timelines=resize_object_array(t_timelines,t_timelines.length*2+10);
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<653>";
		dbg_array(t_timelines,t_timelineCount)[dbg_index]=(t_timeline5);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<654>";
		t_timelineCount+=1;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<656>";
		t_duration=bb_math_Max2(t_duration,dbg_array(dbg_object(t_timeline5).m_Frames,t_timeline5.p_FrameCount()*3-3)[dbg_index]);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<660>";
	t_jsonGroupObject=object_downcast((t_jsonAnimation.p_GetItem("ffd")),c_JSONObject);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<661>";
	if(t_jsonGroupObject!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<662>";
		var t_skin=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<663>";
		var t_jsonFfdGroup=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<664>";
		var t_jsonSlotGroup=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<665>";
		var t_jsonMeshArray=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<666>";
		var t_jsonMeshDataItem=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<667>";
		var t_jsonMesh=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<668>";
		var t_jsonMeshVertices=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<669>";
		var t_jsonMeshVerticesItem=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<670>";
		var t_slotKey="";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<671>";
		var t_meshKey="";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<672>";
		var t_timeline6=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<673>";
		var t_attachment=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<674>";
		var t_vertexCount=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<675>";
		var t_vertices=[];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<676>";
		var t_start=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<677>";
		var t_i=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<679>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<679>";
		var t_10=t_jsonGroupObject.p_Names().p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<679>";
		while(t_10.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<679>";
			var t_ffdKey=t_10.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<680>";
			t_jsonFfdGroup=object_downcast((t_jsonGroupObject.p_GetItem(t_ffdKey)),c_JSONObject);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<681>";
			if(t_jsonFfdGroup==null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<681>";
				continue;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<683>";
			t_skin=t_skeletonData.p_FindSkin(t_ffdKey);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<685>";
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<685>";
			var t_11=t_jsonFfdGroup.p_Names().p_ObjectEnumerator();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<685>";
			while(t_11.p_HasNext()){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<685>";
				t_slotKey=t_11.p_NextObject();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<686>";
				t_jsonSlotGroup=object_downcast((t_jsonFfdGroup.p_GetItem(t_slotKey)),c_JSONObject);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<687>";
				if(t_jsonSlotGroup==null){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<687>";
					continue;
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<689>";
				t_slotIndex=t_skeletonData.p_FindSlotIndex(t_slotKey);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<691>";
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<691>";
				var t_12=t_jsonSlotGroup.p_Names().p_ObjectEnumerator();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<691>";
				while(t_12.p_HasNext()){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<691>";
					t_meshKey=t_12.p_NextObject();
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<692>";
					t_jsonMeshArray=object_downcast((t_jsonSlotGroup.p_GetItem(t_meshKey)),c_JSONArray);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<694>";
					t_attachment=t_skin.p_GetAttachment(t_slotIndex,t_meshKey);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<695>";
					if(t_attachment==null){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<695>";
						throw c_SpineException.m_new.call(new c_SpineException,"FFD attachment not found: "+t_meshKey);
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<697>";
					t_timeline6=c_SpineFFDTimeline.m_new.call(new c_SpineFFDTimeline,dbg_object(t_jsonMeshArray).m_values.p_Count());
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<698>";
					dbg_object(t_timeline6).m_SlotIndex=t_slotIndex;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<699>";
					dbg_object(t_timeline6).m_Attachment=t_attachment;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<701>";
					if(dbg_object(t_attachment).m_Type==2){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<702>";
						t_vertexCount=dbg_object(object_downcast((t_attachment),c_SpineMeshAttachment)).m_Vertices.length;
					}else{
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<704>";
						t_vertexCount=((dbg_object(object_downcast((t_attachment),c_SpineSkinnedMeshAttachment)).m_Weights.length/3)|0)*2;
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<707>";
					t_frameIndex=0;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<708>";
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<708>";
					var t_13=t_jsonMeshArray.p_ObjectEnumerator();
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<708>";
					while(t_13.p_HasNext()){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<708>";
						t_jsonMeshDataItem=t_13.p_NextObject();
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<709>";
						t_jsonMesh=object_downcast((t_jsonMeshDataItem),c_JSONObject);
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<711>";
						t_jsonMeshVertices=object_downcast((t_jsonMesh.p_GetItem("vertices")),c_JSONArray);
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<712>";
						if(t_jsonMeshVertices==null){
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<713>";
							if(dbg_object(t_attachment).m_Type==2){
								err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<714>";
								t_vertices=dbg_object(object_downcast((t_attachment),c_SpineMeshAttachment)).m_Vertices;
							}else{
								err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<716>";
								t_vertices=new_number_array(t_vertexCount);
							}
						}else{
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<719>";
							t_vertices=new_number_array(t_vertexCount);
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<720>";
							t_start=t_jsonMesh.p_GetItem3("offset",0);
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<722>";
							t_i=0;
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<723>";
							if(this.m_Scale==1.0){
								err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<724>";
								err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<724>";
								var t_14=t_jsonMeshVertices.p_ObjectEnumerator();
								err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<724>";
								while(t_14.p_HasNext()){
									err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<724>";
									t_jsonMeshVerticesItem=t_14.p_NextObject();
									err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<725>";
									dbg_array(t_vertices,t_i+t_start)[dbg_index]=t_jsonMeshVerticesItem.p_ToFloat();
									err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<726>";
									t_i+=1;
								}
							}else{
								err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<729>";
								err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<729>";
								var t_15=t_jsonMeshVertices.p_ObjectEnumerator();
								err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<729>";
								while(t_15.p_HasNext()){
									err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<729>";
									t_jsonMeshVerticesItem=t_15.p_NextObject();
									err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<730>";
									dbg_array(t_vertices,t_i+t_start)[dbg_index]=t_jsonMeshVerticesItem.p_ToFloat()*this.m_Scale;
									err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<731>";
									t_i+=1;
								}
							}
							err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<735>";
							if(dbg_object(t_attachment).m_Type==2){
								err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<736>";
								var t_meshVertices=dbg_object(object_downcast((t_attachment),c_SpineMeshAttachment)).m_Vertices;
								err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<737>";
								for(t_i=0;t_i<t_vertexCount;t_i=t_i+1){
									err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<738>";
									dbg_array(t_vertices,t_i)[dbg_index]+=dbg_array(t_meshVertices,t_i)[dbg_index];
								}
							}
						}
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<743>";
						t_timeline6.p_SetFrame6(t_frameIndex,t_jsonMesh.p_GetItem4("time",0.0),t_vertices);
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<744>";
						this.p_ReadCurve((t_timeline6),t_frameIndex,t_jsonMesh);
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<745>";
						t_frameIndex+=1;
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<748>";
					if(t_timelineCount>=t_timelines.length){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<748>";
						t_timelines=resize_object_array(t_timelines,t_timelines.length*2+10);
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<749>";
					dbg_array(t_timelines,t_timelineCount)[dbg_index]=(t_timeline6);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<750>";
					t_timelineCount+=1;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<752>";
					t_duration=bb_math_Max2(t_duration,dbg_array(dbg_object(t_timeline6).m_Frames,t_timeline6.p_FrameCount()-1)[dbg_index]);
				}
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<759>";
	t_jsonGroupArray=object_downcast((t_jsonAnimation.p_GetItem("draworder")),c_JSONArray);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<760>";
	if(t_jsonGroupArray!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<761>";
		var t_jsonOrder=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<762>";
		var t_jsonOffsetDataItem=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<763>";
		var t_jsonOffsetArray=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<764>";
		var t_jsonOffsetTotal=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<765>";
		var t_jsonOffset=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<766>";
		var t_originalIndex=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<767>";
		var t_unchangedIndex=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<768>";
		var t_offset=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<773>";
		var t_slotsCount=dbg_object(t_skeletonData).m_slotsCount;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<776>";
		var t_timeline7=c_SpineDrawOrderTimeline.m_new.call(new c_SpineDrawOrderTimeline,dbg_object(t_jsonGroupArray).m_values.p_Count());
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<777>";
		t_frameIndex=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<780>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<780>";
		var t_16=t_jsonGroupArray.p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<780>";
		while(t_16.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<780>";
			t_jsonTimelineFrameDataItem=t_16.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<781>";
			t_jsonOrder=object_downcast((t_jsonTimelineFrameDataItem),c_JSONObject);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<783>";
			var t_drawOrder=[];
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<786>";
			t_jsonOffsetArray=object_downcast((t_jsonOrder.p_GetItem("offsets")),c_JSONArray);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<787>";
			if(t_jsonOffsetArray!=null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<788>";
				t_jsonOffsetTotal=dbg_object(t_jsonOffsetArray).m_values.p_Count();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<791>";
				t_drawOrder=new_number_array(t_slotsCount);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<792>";
				for(t_slotIndex=t_slotsCount-1;t_slotIndex>=0;t_slotIndex=t_slotIndex+-1){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<793>";
					dbg_array(t_drawOrder,t_slotIndex)[dbg_index]=-1;
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<797>";
				var t_unchanged=new_number_array(t_slotsCount-t_jsonOffsetTotal);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<799>";
				t_originalIndex=0;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<800>";
				t_unchangedIndex=0;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<803>";
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<803>";
				var t_17=t_jsonOffsetArray.p_ObjectEnumerator();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<803>";
				while(t_17.p_HasNext()){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<803>";
					t_jsonOffsetDataItem=t_17.p_NextObject();
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<804>";
					t_jsonOffset=object_downcast((t_jsonOffsetDataItem),c_JSONObject);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<807>";
					t_slotName=(t_jsonOffset.p_GetItem("slot").p_ToString());
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<808>";
					t_slotIndex=t_skeletonData.p_FindSlotIndex(t_slotName);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<811>";
					if(t_slotIndex==-1){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<811>";
						throw c_SpineException.m_new.call(new c_SpineException,"Slot not found: "+t_slotName);
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<814>";
					while(t_originalIndex!=t_slotIndex){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<815>";
						dbg_array(t_unchanged,t_unchangedIndex)[dbg_index]=t_originalIndex;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<816>";
						t_unchangedIndex+=1;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<817>";
						t_originalIndex+=1;
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<821>";
					t_offset=t_jsonOffset.p_GetItem3("offset",0);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<824>";
					dbg_array(t_drawOrder,t_originalIndex+t_offset)[dbg_index]=t_originalIndex;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<825>";
					t_originalIndex+=1;
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<829>";
				while(t_originalIndex<t_slotsCount){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<830>";
					dbg_array(t_unchanged,t_unchangedIndex)[dbg_index]=t_originalIndex;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<831>";
					t_unchangedIndex+=1;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<832>";
					t_originalIndex+=1;
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<836>";
				for(t_index=t_slotsCount-1;t_index>=0;t_index=t_index+-1){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<837>";
					if(dbg_array(t_drawOrder,t_index)[dbg_index]==-1){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<838>";
						t_unchangedIndex-=1;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<839>";
						dbg_array(t_drawOrder,t_index)[dbg_index]=dbg_array(t_unchanged,t_unchangedIndex)[dbg_index];
					}
				}
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<845>";
			t_timeline7.p_SetFrame7(t_frameIndex,t_jsonOrder.p_GetItem4("time",0.0),t_drawOrder);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<848>";
			t_frameIndex+=1;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<852>";
		if(t_timelineCount>=t_timelines.length){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<852>";
			t_timelines=resize_object_array(t_timelines,t_timelines.length*2+10);
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<853>";
		dbg_array(t_timelines,t_timelineCount)[dbg_index]=(t_timeline7);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<854>";
		t_timelineCount+=1;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<857>";
		t_duration=bb_math_Max2(t_duration,dbg_array(dbg_object(t_timeline7).m_Frames,t_timeline7.p_FrameCount()-1)[dbg_index]);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<861>";
	t_jsonGroupArray=object_downcast((t_jsonAnimation.p_GetItem("events")),c_JSONArray);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<862>";
	if(t_jsonGroupArray!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<863>";
		var t_eventName="";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<864>";
		var t_jsonEvent=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<865>";
		var t_event=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<866>";
		var t_eventData=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<868>";
		var t_timeline8=c_SpineEventTimeline.m_new.call(new c_SpineEventTimeline,dbg_object(t_jsonGroupArray).m_values.p_Count());
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<869>";
		t_frameIndex=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<871>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<871>";
		var t_18=t_jsonGroupArray.p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<871>";
		while(t_18.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<871>";
			t_jsonTimelineFrameDataItem=t_18.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<872>";
			t_jsonEvent=object_downcast((t_jsonTimelineFrameDataItem),c_JSONObject);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<875>";
			t_eventName=(t_jsonEvent.p_GetItem("name").p_ToString());
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<876>";
			t_eventData=t_skeletonData.p_FindEvent(t_eventName);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<877>";
			if(t_eventData==null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<877>";
				throw c_SpineException.m_new.call(new c_SpineException,"Event not found: "+t_eventName);
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<880>";
			t_event=c_SpineEvent.m_new.call(new c_SpineEvent,t_eventData);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<881>";
			dbg_object(t_event).m_IntValue=t_jsonEvent.p_GetItem3("int",dbg_object(t_eventData).m_IntValue);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<882>";
			dbg_object(t_event).m_FloatValue=t_jsonEvent.p_GetItem4("float",dbg_object(t_eventData).m_FloatValue);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<883>";
			dbg_object(t_event).m_StringValue=t_jsonEvent.p_GetItem2("string",dbg_object(t_eventData).m_StringValue);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<886>";
			t_timeline8.p_SetFrame8(t_frameIndex,t_jsonEvent.p_GetItem4("time",0.0),t_event);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<889>";
			t_frameIndex+=1;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<893>";
		if(t_timelineCount>=t_timelines.length){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<893>";
			t_timelines=resize_object_array(t_timelines,t_timelines.length*2+10);
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<894>";
		dbg_array(t_timelines,t_timelineCount)[dbg_index]=(t_timeline8);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<895>";
		t_timelineCount+=1;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<898>";
		t_duration=bb_math_Max2(t_duration,dbg_array(dbg_object(t_timeline8).m_Frames,t_timeline8.p_FrameCount()-1)[dbg_index]);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<902>";
	if(t_timelineCount<t_timelines.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<902>";
		t_timelines=resize_object_array(t_timelines,t_timelineCount);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<904>";
	t_skeletonData.p_AddAnimation(c_SpineAnimation.m_new.call(new c_SpineAnimation,t_name,t_timelines,t_duration));
	pop_err();
}
c_SpineSkeletonJson.prototype.p_ReadSkeletonData=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<35>";
	var t_skeletonData=c_SpineSkeletonData.m_new.call(new c_SpineSkeletonData);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<36>";
	dbg_object(t_skeletonData).m_Name=bb_spinefunctions_SpineExtractFilenameWithoutExtension(this.m_file.p_path());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<38>";
	var t_jsonRoot=object_downcast((c_JSONData.m_ReadJSON(this.m_file.p_ReadAll())),c_JSONObject);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<39>";
	if(t_jsonRoot==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<39>";
		throw c_SpineException.m_new.call(new c_SpineException,"Invalid JSON.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<41>";
	var t_jsonGroupArray=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<42>";
	var t_jsonGroupObject=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<43>";
	var t_jsonName="";
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<44>";
	var t_jsonObjectDataItem=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<45>";
	var t_jsonObject=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<46>";
	var t_jsonItem=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<47>";
	var t_jsonChildArray=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<49>";
	var t_boneName="";
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<50>";
	var t_boneData=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<53>";
	t_jsonItem=t_jsonRoot.p_GetItem("skeleton");
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<54>";
	if(t_jsonItem!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<55>";
		t_jsonObject=object_downcast((t_jsonItem),c_JSONObject);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<56>";
		dbg_object(t_skeletonData).m_Hash=t_jsonObject.p_GetItem2("hash","");
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<57>";
		dbg_object(t_skeletonData).m_Version=t_jsonObject.p_GetItem2("version","");
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<58>";
		dbg_object(t_skeletonData).m_Width=t_jsonObject.p_GetItem4("width",0.0);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<59>";
		dbg_object(t_skeletonData).m_Height=t_jsonObject.p_GetItem4("height",0.0);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<63>";
	t_jsonGroupArray=object_downcast((t_jsonRoot.p_GetItem("bones")),c_JSONArray);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<64>";
	if(t_jsonGroupArray!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<65>";
		var t_boneParentData=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<68>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<68>";
		var t_=t_jsonGroupArray.p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<68>";
		while(t_.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<68>";
			t_jsonObjectDataItem=t_.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<69>";
			t_jsonObject=object_downcast((t_jsonObjectDataItem),c_JSONObject);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<70>";
			if(t_jsonObject==null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<70>";
				continue;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<72>";
			t_boneParentData=null;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<74>";
			t_jsonItem=t_jsonObject.p_GetItem("parent");
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<75>";
			if(t_jsonItem!=null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<76>";
				t_boneName=t_jsonItem.p_ToString();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<77>";
				t_boneParentData=t_skeletonData.p_FindBone(t_boneName);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<78>";
				if(t_boneParentData==null){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<78>";
					throw c_SpineException.m_new.call(new c_SpineException,"Parent not:bone found: "+t_boneName);
				}
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<81>";
			t_boneData=c_SpineBoneData.m_new.call(new c_SpineBoneData,t_jsonObject.p_GetItem2("name",""),t_boneParentData);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<82>";
			dbg_object(t_boneData).m_Length=t_jsonObject.p_GetItem4("length",0.0)*this.m_Scale;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<83>";
			dbg_object(t_boneData).m_X=t_jsonObject.p_GetItem4("x",0.0)*this.m_Scale;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<84>";
			dbg_object(t_boneData).m_Y=t_jsonObject.p_GetItem4("y",0.0)*this.m_Scale;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<85>";
			dbg_object(t_boneData).m_Rotation=t_jsonObject.p_GetItem4("rotation",0.0);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<86>";
			dbg_object(t_boneData).m_ScaleX=t_jsonObject.p_GetItem4("scaleX",1.0);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<87>";
			dbg_object(t_boneData).m_ScaleY=t_jsonObject.p_GetItem4("scaleY",1.0);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<88>";
			dbg_object(t_boneData).m_InheritScale=this.p_GetBool(t_jsonObject,"inheritScale",true);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<89>";
			dbg_object(t_boneData).m_InheritRotation=this.p_GetBool(t_jsonObject,"inheirtRotation",true);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<90>";
			t_skeletonData.p_AddBone(t_boneData);
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<95>";
	t_jsonGroupArray=object_downcast((t_jsonRoot.p_GetItem("ik")),c_JSONArray);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<96>";
	if(t_jsonGroupArray!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<97>";
		var t_ikConstraintData=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<98>";
		var t_targetName="";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<100>";
		var t_bones=new_object_array(10);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<101>";
		var t_bonesCount=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<103>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<103>";
		var t_2=t_jsonGroupArray.p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<103>";
		while(t_2.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<103>";
			t_jsonObjectDataItem=t_2.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<104>";
			t_jsonObject=object_downcast((t_jsonObjectDataItem),c_JSONObject);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<105>";
			if(t_jsonObject==null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<105>";
				continue;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<107>";
			t_ikConstraintData=c_SpineIkConstraintData.m_new.call(new c_SpineIkConstraintData,t_jsonObject.p_GetItem2("name",""));
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<109>";
			t_jsonChildArray=object_downcast((t_jsonObject.p_GetItem("bones")),c_JSONArray);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<110>";
			t_bonesCount=0;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<111>";
			if(t_jsonChildArray!=null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<112>";
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<112>";
				var t_3=t_jsonChildArray.p_ObjectEnumerator();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<112>";
				while(t_3.p_HasNext()){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<112>";
					t_boneName=(t_3.p_NextObject().p_ToString());
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<113>";
					t_boneData=t_skeletonData.p_FindBone(t_boneName);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<114>";
					if(t_boneData==null){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<114>";
						throw c_SpineException.m_new.call(new c_SpineException,"IK bone found: "+t_boneName);
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<116>";
					if(t_bonesCount==t_bones.length){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<116>";
						t_bones=resize_object_array(t_bones,t_bonesCount*2+10);
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<117>";
					dbg_array(t_bones,t_bonesCount)[dbg_index]=t_boneData;
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<118>";
					t_bonesCount+=1;
				}
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<122>";
			if(t_bonesCount>0){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<122>";
				dbg_object(t_ikConstraintData).m_Bones=t_bones.slice(0,t_bonesCount);
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<124>";
			t_targetName=t_jsonObject.p_GetItem2("target","");
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<125>";
			dbg_object(t_ikConstraintData).m_Target=t_skeletonData.p_FindBone(t_targetName);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<126>";
			if(dbg_object(t_ikConstraintData).m_Target==null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<126>";
				throw c_SpineException.m_new.call(new c_SpineException,"Target bone not found: "+t_targetName);
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<129>";
			if(this.p_GetBool(t_jsonObject,"bendPositive",true)){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<130>";
				dbg_object(t_ikConstraintData).m_BendDirection=1;
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<132>";
				dbg_object(t_ikConstraintData).m_BendDirection=-1;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<134>";
			t_skeletonData.p_AddIkConstraint(t_ikConstraintData);
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<139>";
	var t_slotName="";
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<140>";
	var t_slotData=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<141>";
	var t_color="";
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<142>";
	t_jsonGroupArray=object_downcast((t_jsonRoot.p_GetItem("slots")),c_JSONArray);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<143>";
	if(t_jsonGroupArray!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<145>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<145>";
		var t_4=t_jsonGroupArray.p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<145>";
		while(t_4.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<145>";
			t_jsonObjectDataItem=t_4.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<147>";
			t_jsonObject=object_downcast((t_jsonObjectDataItem),c_JSONObject);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<148>";
			if(t_jsonObject==null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<148>";
				continue;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<151>";
			t_slotName=t_jsonObject.p_GetItem2("name","");
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<152>";
			t_boneName=t_jsonObject.p_GetItem2("bone","");
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<153>";
			t_boneData=t_skeletonData.p_FindBone(t_boneName);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<155>";
			if(t_boneData==null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<155>";
				throw c_SpineException.m_new.call(new c_SpineException,"Slot bone not found: "+t_boneName);
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<156>";
			t_slotData=c_SpineSlotData.m_new.call(new c_SpineSlotData,t_slotName,t_boneData);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<158>";
			t_jsonItem=t_jsonObject.p_GetItem("color");
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<159>";
			if(t_jsonItem!=null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<160>";
				t_color=t_jsonItem.p_ToString();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<161>";
				dbg_object(t_slotData).m_R=c_SpineSkeletonJson.m_ToColor(t_color,0);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<162>";
				dbg_object(t_slotData).m_G=c_SpineSkeletonJson.m_ToColor(t_color,1);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<163>";
				dbg_object(t_slotData).m_B=c_SpineSkeletonJson.m_ToColor(t_color,2);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<164>";
				dbg_object(t_slotData).m_A=c_SpineSkeletonJson.m_ToColor(t_color,3);
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<167>";
			t_jsonItem=t_jsonObject.p_GetItem("attachment");
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<168>";
			if(t_jsonItem!=null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<168>";
				dbg_object(t_slotData).m_AttachmentName=t_jsonItem.p_ToString();
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<170>";
			t_jsonItem=t_jsonObject.p_GetItem("additive");
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<171>";
			if(t_jsonItem!=null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<171>";
				dbg_object(t_slotData).m_AdditiveBlending=t_jsonItem.p_ToBool();
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<173>";
			t_skeletonData.p_AddSlot(t_slotData);
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<178>";
	var t_skin=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<179>";
	var t_slotIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<180>";
	var t_attachment=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<181>";
	var t_attachmentName="";
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<182>";
	var t_eventData=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<183>";
	var t_jsonSlot=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<184>";
	var t_jsonAttachment=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<187>";
	t_jsonGroupObject=object_downcast((t_jsonRoot.p_GetItem("skins")),c_JSONObject);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<188>";
	if(t_jsonGroupObject!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<189>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<189>";
		var t_5=t_jsonGroupObject.p_Names().p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<189>";
		while(t_5.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<189>";
			t_jsonName=t_5.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<191>";
			t_jsonObject=object_downcast((t_jsonGroupObject.p_GetItem(t_jsonName)),c_JSONObject);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<192>";
			t_skin=c_SpineSkin.m_new.call(new c_SpineSkin,t_jsonName);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<195>";
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<195>";
			var t_6=t_jsonObject.p_Names().p_ObjectEnumerator();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<195>";
			while(t_6.p_HasNext()){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<195>";
				t_slotName=t_6.p_NextObject();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<196>";
				t_jsonSlot=object_downcast((t_jsonObject.p_GetItem(t_slotName)),c_JSONObject);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<197>";
				t_slotIndex=t_skeletonData.p_FindSlotIndex(t_slotName);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<200>";
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<200>";
				var t_7=t_jsonSlot.p_Names().p_ObjectEnumerator();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<200>";
				while(t_7.p_HasNext()){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<200>";
					t_attachmentName=t_7.p_NextObject();
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<201>";
					t_jsonAttachment=object_downcast((t_jsonSlot.p_GetItem(t_attachmentName)),c_JSONObject);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<203>";
					t_attachment=this.p_ReadAttachment(t_skin,t_attachmentName,t_jsonAttachment);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<204>";
					t_skin.p_AddAttachment(t_slotIndex,t_attachmentName,t_attachment);
				}
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<208>";
			t_skeletonData.p_AddSkin(t_skin);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<209>";
			if(dbg_object(t_skin).m_Name=="default"){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<209>";
				dbg_object(t_skeletonData).m_DefaultSkin=t_skin;
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<214>";
	t_jsonGroupObject=object_downcast((t_jsonRoot.p_GetItem("events")),c_JSONObject);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<215>";
	if(t_jsonGroupObject!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<216>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<216>";
		var t_8=t_jsonGroupObject.p_Names().p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<216>";
		while(t_8.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<216>";
			t_jsonName=t_8.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<218>";
			t_jsonObject=object_downcast((t_jsonGroupObject.p_GetItem(t_jsonName)),c_JSONObject);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<219>";
			t_eventData=c_SpineEventData.m_new.call(new c_SpineEventData,t_jsonName);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<220>";
			dbg_object(t_eventData).m_IntValue=t_jsonObject.p_GetItem3("int",0);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<221>";
			dbg_object(t_eventData).m_FloatValue=t_jsonObject.p_GetItem4("float",0.0);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<222>";
			dbg_object(t_eventData).m_StringValue=t_jsonObject.p_GetItem2("string","");
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<225>";
			t_skeletonData.p_AddEvent(t_eventData);
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<230>";
	t_jsonGroupObject=object_downcast((t_jsonRoot.p_GetItem("animations")),c_JSONObject);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<231>";
	if(t_jsonGroupObject!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<232>";
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<232>";
		var t_9=t_jsonGroupObject.p_Names().p_ObjectEnumerator();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<232>";
		while(t_9.p_HasNext()){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<232>";
			t_jsonName=t_9.p_NextObject();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<234>";
			t_jsonObject=object_downcast((t_jsonGroupObject.p_GetItem(t_jsonName)),c_JSONObject);
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<235>";
			this.p_ReadAnimation(t_jsonName,t_jsonObject,t_skeletonData);
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<239>";
	t_skeletonData.p_TrimArrays();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletonjson.monkey<241>";
	pop_err();
	return t_skeletonData;
}
function c_SpineAtlasAttachmentLoader(){
	Object.call(this);
	this.m_atlas=null;
	this.implments={c_SpineAttachmentLoader:1};
}
c_SpineAtlasAttachmentLoader.m_new=function(t_atlas){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<13>";
	if(t_atlas==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<13>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"atlas cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<14>";
	dbg_object(this).m_atlas=t_atlas;
	pop_err();
	return this;
}
c_SpineAtlasAttachmentLoader.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<6>";
	pop_err();
	return this;
}
c_SpineAtlasAttachmentLoader.prototype.p_NewRegionAttachment=function(t_skin,t_name,t_path){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<18>";
	var t_region=this.m_atlas.p_FindRegion(t_path);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<19>";
	if(t_region==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<19>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"Region not found in atlas: "+t_path+" (region attachment: "+t_name+")");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<21>";
	var t_attachment=c_SpineRegionAttachment.m_new.call(new c_SpineRegionAttachment,t_name);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<22>";
	dbg_object(t_attachment).m_RenderObject=t_region.p_rendererObject();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<23>";
	t_attachment.p_SetUVs(t_region.p_u(),t_region.p_v(),t_region.p_u22(),t_region.p_v22(),t_region.p_rotate());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<24>";
	dbg_object(t_attachment).m_RegionOffsetX=t_region.p_offsetX();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<25>";
	dbg_object(t_attachment).m_RegionOffsetY=t_region.p_offsetY();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<26>";
	dbg_object(t_attachment).m_RegionWidth=(t_region.p_width());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<27>";
	dbg_object(t_attachment).m_RegionHeight=(t_region.p_height());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<28>";
	dbg_object(t_attachment).m_RegionOriginalWidth=(t_region.p_originalWidth());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<29>";
	dbg_object(t_attachment).m_RegionOriginalHeight=(t_region.p_originalHeight());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<30>";
	pop_err();
	return t_attachment;
}
c_SpineAtlasAttachmentLoader.prototype.p_NewMeshAttachment=function(t_skin,t_name,t_path){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<34>";
	var t_region=this.m_atlas.p_FindRegion(t_path);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<35>";
	if(t_region==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<35>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"Region not found in atlas: "+t_path+" (region attachment: "+t_name+")");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<37>";
	var t_attachment=c_SpineMeshAttachment.m_new.call(new c_SpineMeshAttachment,t_name);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<38>";
	dbg_object(t_attachment).m_RenderObject=t_region.p_rendererObject();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<39>";
	dbg_object(t_attachment).m_RegionU=t_region.p_u();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<40>";
	dbg_object(t_attachment).m_RegionV=t_region.p_v();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<41>";
	dbg_object(t_attachment).m_RegionU2=t_region.p_u22();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<42>";
	dbg_object(t_attachment).m_RegionV2=t_region.p_v22();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<43>";
	dbg_object(t_attachment).m_RegionRotate=t_region.p_rotate();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<44>";
	dbg_object(t_attachment).m_RegionOffsetX=t_region.p_offsetX();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<45>";
	dbg_object(t_attachment).m_RegionOffsetY=t_region.p_offsetY();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<46>";
	dbg_object(t_attachment).m_RegionWidth=(t_region.p_width());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<47>";
	dbg_object(t_attachment).m_RegionHeight=(t_region.p_height());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<48>";
	dbg_object(t_attachment).m_RegionOriginalWidth=(t_region.p_originalWidth());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<49>";
	dbg_object(t_attachment).m_RegionOriginalHeight=(t_region.p_originalHeight());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<50>";
	pop_err();
	return t_attachment;
}
c_SpineAtlasAttachmentLoader.prototype.p_NewSkinnedMeshAttachment=function(t_skin,t_name,t_path){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<54>";
	var t_region=this.m_atlas.p_FindRegion(t_path);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<55>";
	if(t_region==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<55>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"Region not found in atlas: "+t_path+" (region attachment: "+t_name+")");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<57>";
	var t_attachment=c_SpineSkinnedMeshAttachment.m_new.call(new c_SpineSkinnedMeshAttachment,t_name);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<58>";
	dbg_object(t_attachment).m_RenderObject=t_region.p_rendererObject();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<59>";
	dbg_object(t_attachment).m_RegionU=t_region.p_u();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<60>";
	dbg_object(t_attachment).m_RegionV=t_region.p_v();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<61>";
	dbg_object(t_attachment).m_RegionU2=t_region.p_u22();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<62>";
	dbg_object(t_attachment).m_RegionV2=t_region.p_v22();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<63>";
	dbg_object(t_attachment).m_RegionRotate=t_region.p_rotate();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<64>";
	dbg_object(t_attachment).m_RegionOffsetX=t_region.p_offsetX();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<65>";
	dbg_object(t_attachment).m_RegionOffsetY=t_region.p_offsetY();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<66>";
	dbg_object(t_attachment).m_RegionWidth=(t_region.p_width());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<67>";
	dbg_object(t_attachment).m_RegionHeight=(t_region.p_height());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<68>";
	dbg_object(t_attachment).m_RegionOriginalWidth=(t_region.p_originalWidth());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<69>";
	dbg_object(t_attachment).m_RegionOriginalHeight=(t_region.p_originalHeight());
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<70>";
	pop_err();
	return t_attachment;
}
c_SpineAtlasAttachmentLoader.prototype.p_NewBoundingBoxAttachment=function(t_skin,t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineatlasattachmentloader.monkey<74>";
	var t_=c_SpineBoundingBoxAttachment.m_new.call(new c_SpineBoundingBoxAttachment,t_name);
	pop_err();
	return t_;
}
function c_SpineSkeletonData(){
	Object.call(this);
	this.m_Name="";
	this.m_Hash="";
	this.m_Version="";
	this.m_Width=.0;
	this.m_Height=.0;
	this.m_bonesCount=0;
	this.m_Bones=[];
	this.m_ikConstraintsCount=0;
	this.m_IkConstraints=[];
	this.m_slotsCount=0;
	this.m_Slots=[];
	this.m_skinsCount=0;
	this.m_Skins=[];
	this.m_DefaultSkin=null;
	this.m_eventsCount=0;
	this.m_Events=[];
	this.m_animationsCount=0;
	this.m_Animations=[];
}
c_SpineSkeletonData.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<6>";
	pop_err();
	return this;
}
c_SpineSkeletonData.prototype.p_FindBone=function(t_boneName){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<33>";
	if(t_boneName.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<33>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"boneName cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<35>";
	var t_bone=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<36>";
	for(var t_i=0;t_i<this.m_bonesCount;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<37>";
		t_bone=dbg_array(this.m_Bones,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<38>";
		if(dbg_object(t_bone).m_Name==t_boneName){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<38>";
			pop_err();
			return t_bone;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<40>";
	pop_err();
	return null;
}
c_SpineSkeletonData.prototype.p_AddBone=function(t_bone){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<154>";
	if(t_bone==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<154>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"bone cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<157>";
	if(this.m_bonesCount>=this.m_Bones.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<157>";
		this.m_Bones=resize_object_array(this.m_Bones,this.m_Bones.length*2+10);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<160>";
	dbg_array(this.m_Bones,this.m_bonesCount)[dbg_index]=t_bone;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<161>";
	this.m_bonesCount+=1;
	pop_err();
}
c_SpineSkeletonData.prototype.p_AddIkConstraint=function(t_ikConstraint){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<209>";
	if(t_ikConstraint==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<209>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"ikConstraint cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<212>";
	if(this.m_ikConstraintsCount>=this.m_IkConstraints.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<212>";
		this.m_IkConstraints=resize_object_array(this.m_IkConstraints,this.m_IkConstraints.length*2+10);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<215>";
	dbg_array(this.m_IkConstraints,this.m_ikConstraintsCount)[dbg_index]=t_ikConstraint;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<216>";
	this.m_ikConstraintsCount+=1;
	pop_err();
}
c_SpineSkeletonData.prototype.p_AddSlot=function(t_slot){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<165>";
	if(t_slot==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<165>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"slot cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<168>";
	if(this.m_slotsCount>=this.m_Slots.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<168>";
		this.m_Slots=resize_object_array(this.m_Slots,this.m_Slots.length*2+10);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<171>";
	dbg_array(this.m_Slots,this.m_slotsCount)[dbg_index]=t_slot;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<172>";
	this.m_slotsCount+=1;
	pop_err();
}
c_SpineSkeletonData.prototype.p_FindSlotIndex=function(t_slotName){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<71>";
	if(t_slotName.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<71>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"slotName cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<73>";
	var t_slot=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<74>";
	for(var t_i=0;t_i<this.m_slotsCount;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<75>";
		t_slot=dbg_array(this.m_Slots,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<76>";
		if(dbg_object(t_slot).m_Name==t_slotName){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<76>";
			pop_err();
			return t_i;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<78>";
	pop_err();
	return -1;
}
c_SpineSkeletonData.prototype.p_AddSkin=function(t_skin){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<187>";
	if(t_skin==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<187>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"skin cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<190>";
	if(this.m_skinsCount>=this.m_Skins.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<190>";
		this.m_Skins=resize_object_array(this.m_Skins,this.m_Skins.length*2+10);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<193>";
	dbg_array(this.m_Skins,this.m_skinsCount)[dbg_index]=t_skin;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<194>";
	this.m_skinsCount+=1;
	pop_err();
}
c_SpineSkeletonData.prototype.p_AddEvent=function(t_event){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<176>";
	if(t_event==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<176>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"event cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<179>";
	if(this.m_eventsCount>=this.m_Events.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<179>";
		this.m_Events=resize_object_array(this.m_Events,this.m_Events.length*2+10);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<182>";
	dbg_array(this.m_Events,this.m_eventsCount)[dbg_index]=t_event;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<183>";
	this.m_eventsCount+=1;
	pop_err();
}
c_SpineSkeletonData.prototype.p_FindBoneIndex=function(t_boneName){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<45>";
	if(t_boneName.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<45>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"boneName cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<47>";
	var t_bone=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<48>";
	for(var t_i=0;t_i<this.m_bonesCount;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<49>";
		t_bone=dbg_array(this.m_Bones,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<50>";
		if(dbg_object(t_bone).m_Name==t_boneName){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<50>";
			pop_err();
			return t_i;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<52>";
	pop_err();
	return -1;
}
c_SpineSkeletonData.prototype.p_FindSkin=function(t_skinName){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<85>";
	if(t_skinName.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<85>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"skinName cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<87>";
	var t_skin=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<88>";
	for(var t_i=0;t_i<this.m_skinsCount;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<89>";
		t_skin=dbg_array(this.m_Skins,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<90>";
		if(dbg_object(t_skin).m_Name==t_skinName){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<90>";
			pop_err();
			return t_skin;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<92>";
	pop_err();
	return null;
}
c_SpineSkeletonData.prototype.p_FindEvent=function(t_eventDataName){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<99>";
	if(t_eventDataName.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<99>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"eventDataName cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<101>";
	var t_event=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<102>";
	for(var t_i=0;t_i<this.m_eventsCount;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<103>";
		t_event=dbg_array(this.m_Events,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<104>";
		if(dbg_object(t_event).m_Name==t_eventDataName){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<104>";
			pop_err();
			return t_event;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<106>";
	pop_err();
	return null;
}
c_SpineSkeletonData.prototype.p_AddAnimation=function(t_animation){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<198>";
	if(t_animation==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<198>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"animation cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<201>";
	if(this.m_animationsCount>=this.m_Animations.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<201>";
		this.m_Animations=resize_object_array(this.m_Animations,this.m_Animations.length*2+10);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<204>";
	dbg_array(this.m_Animations,this.m_animationsCount)[dbg_index]=t_animation;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<205>";
	this.m_animationsCount+=1;
	pop_err();
}
c_SpineSkeletonData.prototype.p_TrimArrays=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<145>";
	if(this.m_bonesCount<this.m_Bones.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<145>";
		this.m_Bones=resize_object_array(this.m_Bones,this.m_bonesCount);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<146>";
	if(this.m_slotsCount<this.m_Slots.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<146>";
		this.m_Slots=resize_object_array(this.m_Slots,this.m_slotsCount);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<147>";
	if(this.m_skinsCount<this.m_Skins.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<147>";
		this.m_Skins=resize_object_array(this.m_Skins,this.m_skinsCount);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<148>";
	if(this.m_eventsCount<this.m_Events.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<148>";
		this.m_Events=resize_object_array(this.m_Events,this.m_eventsCount);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<149>";
	if(this.m_animationsCount<this.m_Animations.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<149>";
		this.m_Animations=resize_object_array(this.m_Animations,this.m_animationsCount);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<150>";
	if(this.m_ikConstraintsCount<this.m_IkConstraints.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<150>";
		this.m_IkConstraints=resize_object_array(this.m_IkConstraints,this.m_ikConstraintsCount);
	}
	pop_err();
}
c_SpineSkeletonData.prototype.p_FindAnimation=function(t_animationName){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<113>";
	if(t_animationName.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<113>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"animationName cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<115>";
	var t_animation=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<116>";
	for(var t_i=0;t_i<this.m_animationsCount;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<117>";
		t_animation=dbg_array(this.m_Animations,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<118>";
		if(dbg_object(t_animation).m_Name==t_animationName){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<118>";
			pop_err();
			return t_animation;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeletondata.monkey<120>";
	pop_err();
	return null;
}
function bb_spinefunctions_SpineExtractFilenameWithoutExtension(t_path){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<18>";
	var t_i=t_path.lastIndexOf(".");
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<19>";
	if(t_i!=-1 && t_path.indexOf("/",t_i+1)==-1 && t_path.indexOf("\\",t_i+1)==-1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<19>";
		t_path=t_path.slice(0,t_i);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<22>";
	t_i=t_path.lastIndexOf("/");
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<23>";
	if(t_i==-1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<23>";
		t_i=t_path.lastIndexOf("\\");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<24>";
	if(t_i!=-1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<24>";
		t_path=t_path.slice(t_i+1);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<27>";
	pop_err();
	return t_path;
}
function c_JSONData(){
	Object.call(this);
}
c_JSONData.m_GetJSONObject=function(t_tokeniser){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<131>";
	var t_jsonObject=c_JSONObject.m_new.call(new c_JSONObject);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<132>";
	var t_data1=null;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<133>";
	var t_data2=null;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<136>";
	t_data1=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<137>";
	if(dbg_object(t_data1).m_dataType==9 && dbg_object(dbg_object(object_downcast((t_data1),c_JSONNonData)).m_value).m_tokenType==2){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<139>";
		var t_=(t_jsonObject);
		pop_err();
		return t_;
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<142>";
	do{
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<143>";
		if(dbg_object(t_data1).m_dataType!=5){
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<144>";
			var t_2=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected item name, got "+(t_data1.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			pop_err();
			return t_2;
		}
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<147>";
		t_data2=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<149>";
		if(dbg_object(t_data2).m_dataType!=9){
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<150>";
			var t_3=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ':', got "+(t_data2.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			pop_err();
			return t_3;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<152>";
			if(dbg_object(dbg_object(object_downcast((t_data2),c_JSONNonData)).m_value).m_tokenType!=6){
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<153>";
				var t_4=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ':', got "+(dbg_object(object_downcast((t_data2),c_JSONNonData)).m_value.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
				pop_err();
				return t_4;
			}
		}
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<157>";
		t_data2=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<159>";
		if(dbg_object(t_data2).m_dataType==-1){
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<160>";
			pop_err();
			return t_data2;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<161>";
			if(dbg_object(t_data2).m_dataType==9){
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<162>";
				var t_5=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected item value, got "+(dbg_object(object_downcast((t_data2),c_JSONNonData)).m_value.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
				pop_err();
				return t_5;
			}
		}
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<165>";
		t_jsonObject.p_AddItem(dbg_object(object_downcast((t_data1),c_JSONString)).m_value,t_data2);
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<166>";
		t_data2=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<168>";
		if(dbg_object(t_data2).m_dataType!=9){
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<169>";
			var t_6=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '}', got "+(t_data2.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			pop_err();
			return t_6;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<171>";
			if(dbg_object(dbg_object(object_downcast((t_data2),c_JSONNonData)).m_value).m_tokenType==2){
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<172>";
				break;
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<173>";
				if(dbg_object(dbg_object(object_downcast((t_data2),c_JSONNonData)).m_value).m_tokenType!=0){
					err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<174>";
					var t_7=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '}', got "+(dbg_object(object_downcast((t_data2),c_JSONNonData)).m_value.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
					pop_err();
					return t_7;
				}
			}
		}
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<177>";
		t_data1=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	}while(!(false));
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<180>";
	var t_8=(t_jsonObject);
	pop_err();
	return t_8;
}
c_JSONData.m_GetJSONArray=function(t_tokeniser){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<184>";
	var t_jsonArray=c_JSONArray.m_new.call(new c_JSONArray);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<185>";
	var t_data=null;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<188>";
	t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<189>";
	if(dbg_object(t_data).m_dataType==9 && dbg_object(dbg_object(object_downcast((t_data),c_JSONNonData)).m_value).m_tokenType==4){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<190>";
		var t_=(t_jsonArray);
		pop_err();
		return t_;
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<193>";
	do{
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<194>";
		if(dbg_object(t_data).m_dataType==9){
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<195>";
			var t_2=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected data value, got "+(t_data.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			pop_err();
			return t_2;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<196>";
			if(dbg_object(t_data).m_dataType==-1){
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<197>";
				pop_err();
				return t_data;
			}
		}
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<199>";
		t_jsonArray.p_AddItem2(t_data);
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<201>";
		t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<203>";
		if(dbg_object(t_data).m_dataType==9){
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<204>";
			var t_token=dbg_object(object_downcast((t_data),c_JSONNonData)).m_value;
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<205>";
			if(dbg_object(t_token).m_tokenType==0){
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<206>";
				t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<207>";
				continue;
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<208>";
				if(dbg_object(t_token).m_tokenType==4){
					err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<209>";
					break;
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<211>";
					var t_3=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '], got "+(t_token.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
					pop_err();
					return t_3;
				}
			}
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<214>";
			var t_4=(c_JSONDataError.m_new.call(new c_JSONDataError,"Expected ',' or '], got "+(t_data.p_ToString()),t_tokeniser.p_GetCurrentSectionString(20,20)));
			pop_err();
			return t_4;
		}
	}while(!(false));
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<218>";
	var t_5=(t_jsonArray);
	pop_err();
	return t_5;
}
c_JSONData.m_HexCharToInt=function(t_char){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<331>";
	if(t_char>=48 && t_char<=57){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<332>";
		var t_=t_char-48;
		pop_err();
		return t_;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<333>";
		if(t_char>=65 && t_char<=70){
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<334>";
			var t_2=t_char-55;
			pop_err();
			return t_2;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<335>";
			if(t_char>=97 && t_char<=102){
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<336>";
				var t_3=t_char-87;
				pop_err();
				return t_3;
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<338>";
	pop_err();
	return 0;
}
c_JSONData.m_UnEscapeUnicode=function(t_hexString){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<342>";
	var t_charCode=0;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<343>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<344>";
		t_charCode<<=4;
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<345>";
		t_charCode+=c_JSONData.m_HexCharToInt(dbg_charCodeAt(t_hexString,t_i));
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<347>";
	var t_=String.fromCharCode(t_charCode);
	pop_err();
	return t_;
}
c_JSONData.m_UnEscapeJSON=function(t_input){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<287>";
	var t_escIndex=t_input.indexOf("\\",0);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<289>";
	if(t_escIndex==-1){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<290>";
		pop_err();
		return t_input;
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<293>";
	var t_copyStartIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<294>";
	var t_retString=c_StringBuilder.m_new.call(new c_StringBuilder,t_input.length);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<296>";
	while(t_escIndex!=-1){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<297>";
		t_retString.p_AddString(t_input.slice(t_copyStartIndex,t_escIndex));
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<298>";
		var t_2=dbg_charCodeAt(t_input,t_escIndex+1);
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<299>";
		if(t_2==110){
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<300>";
			t_retString.p_AddString("\n");
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<301>";
			if(t_2==34){
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<302>";
				t_retString.p_AddString("\"");
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<303>";
				if(t_2==116){
					err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<304>";
					t_retString.p_AddString("\t");
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<305>";
					if(t_2==92){
						err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<306>";
						t_retString.p_AddString("\\");
					}else{
						err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<307>";
						if(t_2==47){
							err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<308>";
							t_retString.p_AddString("/");
						}else{
							err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<309>";
							if(t_2==114){
								err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<310>";
								t_retString.p_AddString("\r");
							}else{
								err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<311>";
								if(t_2==102){
									err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<312>";
									t_retString.p_AddString(String.fromCharCode(12));
								}else{
									err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<313>";
									if(t_2==98){
										err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<314>";
										t_retString.p_AddString(String.fromCharCode(8));
									}else{
										err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<315>";
										if(t_2==117){
											err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<316>";
											t_retString.p_AddString(c_JSONData.m_UnEscapeUnicode(t_input.slice(t_escIndex+2,t_escIndex+6)));
											err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<317>";
											t_escIndex+=4;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<319>";
		t_copyStartIndex=t_escIndex+2;
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<320>";
		t_escIndex=t_input.indexOf("\\",t_copyStartIndex);
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<323>";
	if(t_copyStartIndex<t_input.length){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<324>";
		t_retString.p_AddString(t_input.slice(t_copyStartIndex));
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<327>";
	var t_=t_retString.p_ToString();
	pop_err();
	return t_;
}
c_JSONData.m_GetJSONDataItem=function(t_tokeniser){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<104>";
	var t_token=t_tokeniser.p_NextToken();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<106>";
	var t_1=dbg_object(t_token).m_tokenType;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<107>";
	if(t_1==1){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<108>";
		var t_=c_JSONData.m_GetJSONObject(t_tokeniser);
		pop_err();
		return t_;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<109>";
		if(t_1==3){
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<110>";
			var t_2=c_JSONData.m_GetJSONArray(t_tokeniser);
			pop_err();
			return t_2;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<111>";
			if(t_1==10){
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<112>";
				var t_3=(c_JSONString.m_new.call(new c_JSONString,(object_downcast((dbg_object(t_token).m_value),c_StringObject).p_ToString()),false));
				pop_err();
				return t_3;
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<113>";
				if(t_1==11){
					err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<114>";
					var t_4=(c_JSONFloat.m_new.call(new c_JSONFloat,object_downcast((dbg_object(t_token).m_value),c_FloatObject).p_ToFloat()));
					pop_err();
					return t_4;
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<115>";
					if(t_1==12){
						err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<116>";
						var t_5=(c_JSONFloat.m_new2.call(new c_JSONFloat,object_downcast((dbg_object(t_token).m_value),c_StringObject).p_ToString()));
						pop_err();
						return t_5;
					}else{
						err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<117>";
						if(t_1==13){
							err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<118>";
							var t_6=(c_JSONInteger.m_new.call(new c_JSONInteger,(object_downcast((dbg_object(t_token).m_value),c_IntObject).p_ToInt())));
							pop_err();
							return t_6;
						}else{
							err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<119>";
							if(t_1==7){
								err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<120>";
								var t_7=(c_JSONBool.m_new.call(new c_JSONBool,true));
								pop_err();
								return t_7;
							}else{
								err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<121>";
								if(t_1==8){
									err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<122>";
									var t_8=(c_JSONBool.m_new.call(new c_JSONBool,false));
									pop_err();
									return t_8;
								}else{
									err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<123>";
									if(t_1==9){
										err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<124>";
										var t_9=(c_JSONNull.m_new.call(new c_JSONNull));
										pop_err();
										return t_9;
									}else{
										err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<126>";
										var t_10=(c_JSONNonData.m_new.call(new c_JSONNonData,t_token));
										pop_err();
										return t_10;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
c_JSONData.m_ReadJSON=function(t_jsonString){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<71>";
	var t_tokeniser=c_JSONTokeniser.m_new.call(new c_JSONTokeniser,t_jsonString,false);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<73>";
	var t_data=c_JSONData.m_GetJSONDataItem(t_tokeniser);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<75>";
	if(t_data==null){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<76>";
		var t_=(c_JSONDataError.m_new.call(new c_JSONDataError,"Unknown JSON error.",t_tokeniser.p_GetCurrentSectionString(20,20)));
		pop_err();
		return t_;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<77>";
		if(dbg_object(t_data).m_dataType==-1){
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<78>";
			print(t_data.p_ToString());
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<79>";
			if(dbg_object(t_data).m_dataType!=1 && dbg_object(t_data).m_dataType!=2){
				err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<80>";
				var t_2=(c_JSONDataError.m_new.call(new c_JSONDataError,"JSON Document malformed. Root node is not an object or an array",t_tokeniser.p_GetCurrentSectionString(20,20)));
				pop_err();
				return t_2;
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<83>";
	pop_err();
	return t_data;
}
function c_JSONDataItem(){
	Object.call(this);
	this.m_dataType=7;
}
c_JSONDataItem.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<366>";
	pop_err();
	return this;
}
c_JSONDataItem.prototype.p_ToString=function(){
}
c_JSONDataItem.prototype.p_ToInt=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<371>";
	print("Unsupported conversion to Int for "+this.p_ToString());
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<372>";
	pop_err();
	return -1;
}
c_JSONDataItem.prototype.p_ToFloat=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<376>";
	print("Unsupported conversion to Float for "+this.p_ToString());
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<377>";
	pop_err();
	return -1.0;
}
c_JSONDataItem.prototype.p_ToBool=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<381>";
	print("Unsupported conversion to Bool for "+this.p_ToString());
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<382>";
	pop_err();
	return false;
}
function c_JSONTokeniser(){
	Object.call(this);
	this.m_silent=false;
	this.m_jsonString="";
	this.m_stringIndex=0;
	this.m_char=0;
}
c_JSONTokeniser.prototype.p_NextChar=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<197>";
	if(this.m_stringIndex>=this.m_jsonString.length){
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<198>";
		this.m_char=0;
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<199>";
		pop_err();
		return this.m_char;
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<201>";
	this.m_char=dbg_charCodeAt(this.m_jsonString,this.m_stringIndex);
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<202>";
	this.m_stringIndex+=1;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<203>";
	pop_err();
	return this.m_char;
}
c_JSONTokeniser.m_new=function(t_jsonString,t_silent){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<120>";
	dbg_object(this).m_silent=t_silent;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<121>";
	dbg_object(this).m_jsonString=t_jsonString;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<122>";
	this.p_NextChar();
	pop_err();
	return this;
}
c_JSONTokeniser.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<108>";
	pop_err();
	return this;
}
c_JSONTokeniser.prototype.p_SkipWhitespace=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<252>";
	var t_index=this.m_stringIndex;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<253>";
	while(this.m_char<=32 && this.m_char!=0){
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<254>";
		this.p_NextChar();
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<256>";
	var t_=this.m_stringIndex-t_index;
	pop_err();
	return t_;
}
c_JSONTokeniser.prototype.p_GetCurrentSectionString=function(t_backwards,t_forwards){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<126>";
	var t_="Section: "+this.m_jsonString.slice(bb_math_Max(this.m_stringIndex-t_backwards,0),bb_math_Min(this.m_stringIndex+t_forwards,this.m_jsonString.length));
	pop_err();
	return t_;
}
c_JSONTokeniser.prototype.p_ParseFailure=function(t_description){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<290>";
	if(this.m_silent){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<293>";
	print("JSON parse error at index: "+String(this.m_stringIndex));
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<294>";
	print(t_description);
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<295>";
	print(this.p_GetCurrentSectionString(20,20));
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<296>";
	this.m_stringIndex=this.m_jsonString.length;
	pop_err();
}
c_JSONTokeniser.prototype.p_SkipComments=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<260>";
	var t_index=this.m_stringIndex;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<261>";
	if(this.m_char==47){
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<262>";
		this.p_NextChar();
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<263>";
		if(this.m_char==47){
			err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<264>";
			while(this.m_char!=13 && this.m_char!=10 && this.m_char!=0){
				err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<265>";
				this.p_NextChar();
			}
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<267>";
			if(this.m_char==42){
				err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<268>";
				do{
					err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<269>";
					this.p_NextChar();
					err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<270>";
					if(this.m_char==42){
						err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<271>";
						this.p_NextChar();
						err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<272>";
						if(this.m_char==47){
							err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<273>";
							break;
						}
					}
					err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<276>";
					if(this.m_char==0){
						err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<277>";
						this.p_ParseFailure("Unterminated comment");
						err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<278>";
						break;
					}
				}while(!(false));
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<282>";
				this.p_ParseFailure("Unrecognised comment opening");
			}
		}
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<284>";
		this.p_NextChar();
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<286>";
	var t_=this.m_stringIndex-t_index;
	pop_err();
	return t_;
}
c_JSONTokeniser.prototype.p_SkipIgnored=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<243>";
	var t_ignoredCount=0;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<244>";
	do{
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<245>";
		t_ignoredCount=0;
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<246>";
		t_ignoredCount+=this.p_SkipWhitespace();
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<247>";
		t_ignoredCount+=this.p_SkipComments();
	}while(!(t_ignoredCount==0));
	pop_err();
}
c_JSONTokeniser.prototype.p_IsDigit=function(t_char){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<239>";
	var t_=t_char>=48 && t_char<=58;
	pop_err();
	return t_;
}
c_JSONTokeniser.prototype.p_ParseInteger=function(t_str){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<230>";
	var t_=parseInt((t_str),10);
	pop_err();
	return t_;
}
c_JSONTokeniser.prototype.p_ParseNumberToken=function(t_firstChar){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<207>";
	var t_index=this.m_stringIndex-1;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<210>";
	while(this.m_char!=32 && this.m_char!=44 && this.m_char!=125 && this.m_char!=93 && this.m_char!=0){
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<211>";
		this.p_NextChar();
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<213>";
	if(this.m_char==0){
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<214>";
		this.p_ParseFailure("Unterminated Number");
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<215>";
		var t_=c_JSONToken.m_CreateToken4(-1,null);
		pop_err();
		return t_;
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<218>";
	var t_numberString=this.m_jsonString.slice(t_index,this.m_stringIndex-1);
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<220>";
	if(t_numberString.indexOf(".",0)!=-1 || t_numberString.indexOf("e",0)!=-1 || t_numberString.indexOf("E",0)!=-1){
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<221>";
		var t_2=c_JSONToken.m_CreateToken3(12,t_numberString);
		pop_err();
		return t_2;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<223>";
		var t_value=this.p_ParseInteger(t_numberString);
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<224>";
		var t_3=c_JSONToken.m_CreateToken2(13,t_value);
		pop_err();
		return t_3;
	}
}
c_JSONTokeniser.prototype.p_NextToken=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<130>";
	var t_retToken=null;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<131>";
	this.p_SkipIgnored();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<133>";
	var t_2=this.m_char;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<135>";
	if(t_2==123){
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<136>";
		t_retToken=c_JSONToken.m_CreateToken3(1,"{");
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<137>";
		if(t_2==125){
			err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<138>";
			t_retToken=c_JSONToken.m_CreateToken3(2,"}");
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<139>";
			if(t_2==91){
				err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<140>";
				t_retToken=c_JSONToken.m_CreateToken3(3,"[");
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<141>";
				if(t_2==93){
					err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<142>";
					t_retToken=c_JSONToken.m_CreateToken3(4,"]");
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<143>";
					if(t_2==44){
						err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<144>";
						t_retToken=c_JSONToken.m_CreateToken3(0,",");
					}else{
						err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<145>";
						if(t_2==58){
							err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<146>";
							t_retToken=c_JSONToken.m_CreateToken3(6,":");
						}else{
							err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<147>";
							if(t_2==116){
								err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<148>";
								if(string_compare(this.m_jsonString.slice(this.m_stringIndex,this.m_stringIndex+3),"rue")==0){
									err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<149>";
									this.m_stringIndex+=3;
									err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<150>";
									t_retToken=c_JSONToken.m_CreateToken3(7,"true");
								}
							}else{
								err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<152>";
								if(t_2==102){
									err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<153>";
									if(string_compare(this.m_jsonString.slice(this.m_stringIndex,this.m_stringIndex+4),"alse")==0){
										err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<154>";
										this.m_stringIndex+=4;
										err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<155>";
										t_retToken=c_JSONToken.m_CreateToken3(8,"false");
									}
								}else{
									err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<157>";
									if(t_2==110){
										err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<158>";
										if(string_compare(this.m_jsonString.slice(this.m_stringIndex,this.m_stringIndex+3),"ull")==0){
											err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<159>";
											this.m_stringIndex+=3;
											err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<160>";
											t_retToken=c_JSONToken.m_CreateToken3(9,"null");
										}
									}else{
										err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<162>";
										if(t_2==34){
											err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<163>";
											var t_startIndex=this.m_stringIndex;
											err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<164>";
											var t_endIndex=this.m_jsonString.indexOf("\"",this.m_stringIndex);
											err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<165>";
											while(t_endIndex!=-1 && dbg_charCodeAt(this.m_jsonString,t_endIndex-1)==92){
												err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<166>";
												t_endIndex=this.m_jsonString.indexOf("\"",t_endIndex+1);
											}
											err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<168>";
											if(t_endIndex==-1){
												err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<169>";
												this.p_ParseFailure("Unterminated string");
											}
											err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<172>";
											t_retToken=c_JSONToken.m_CreateToken3(10,this.m_jsonString.slice(t_startIndex,t_endIndex));
											err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<173>";
											this.m_stringIndex=t_endIndex+1;
										}else{
											err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<177>";
											if(this.m_char==45 || this.p_IsDigit(this.m_char)){
												err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<178>";
												var t_=this.p_ParseNumberToken(this.m_char);
												pop_err();
												return t_;
											}else{
												err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<179>";
												if(this.m_char==0){
													err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<180>";
													t_retToken=null;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<184>";
	if(t_retToken==null){
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<185>";
		this.p_ParseFailure("Unknown token, char: "+String.fromCharCode(this.m_char));
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<186>";
		t_retToken=c_JSONToken.m_CreateToken4(-1,null);
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<188>";
		this.p_NextChar();
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<190>";
	pop_err();
	return t_retToken;
}
function c_ASCIICodes(){
	Object.call(this);
}
function c_JSONToken(){
	Object.call(this);
	this.m_tokenType=0;
	this.m_value=null;
}
c_JSONToken.m_new=function(t_tokenType,t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<54>";
	dbg_object(this).m_tokenType=t_tokenType;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<55>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_JSONToken.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<30>";
	pop_err();
	return this;
}
c_JSONToken.m_reusableToken=null;
c_JSONToken.m_CreateToken=function(t_tokenType,t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<61>";
	dbg_object(c_JSONToken.m_reusableToken).m_tokenType=t_tokenType;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<62>";
	dbg_object(c_JSONToken.m_reusableToken).m_value=(c_FloatObject.m_new2.call(new c_FloatObject,t_value));
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<63>";
	pop_err();
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.m_CreateToken2=function(t_tokenType,t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<67>";
	dbg_object(c_JSONToken.m_reusableToken).m_tokenType=t_tokenType;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<68>";
	dbg_object(c_JSONToken.m_reusableToken).m_value=(c_IntObject.m_new.call(new c_IntObject,t_value));
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<69>";
	pop_err();
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.m_CreateToken3=function(t_tokenType,t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<73>";
	dbg_object(c_JSONToken.m_reusableToken).m_tokenType=t_tokenType;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<74>";
	dbg_object(c_JSONToken.m_reusableToken).m_value=(c_StringObject.m_new3.call(new c_StringObject,t_value));
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<75>";
	pop_err();
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.m_CreateToken4=function(t_tokenType,t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<79>";
	dbg_object(c_JSONToken.m_reusableToken).m_tokenType=t_tokenType;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<80>";
	dbg_object(c_JSONToken.m_reusableToken).m_value=t_value;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<81>";
	pop_err();
	return c_JSONToken.m_reusableToken;
}
c_JSONToken.prototype.p_GetValueString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<89>";
	var t_1=this.m_tokenType;
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<90>";
	if(t_1==11){
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<91>";
		var t_=""+(object_downcast((this.m_value),c_FloatObject).p_ToString());
		pop_err();
		return t_;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<92>";
		if(t_1==13){
			err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<93>";
			var t_2=""+(object_downcast((this.m_value),c_IntObject).p_ToString());
			pop_err();
			return t_2;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<94>";
			if(t_1==9){
				err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<95>";
				pop_err();
				return "NULL";
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<97>";
				if((this.m_value)!=null){
					err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<98>";
					var t_3=(object_downcast((this.m_value),c_StringObject).p_ToString());
					pop_err();
					return t_3;
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<100>";
					pop_err();
					return "Null value";
				}
			}
		}
	}
}
c_JSONToken.prototype.p_ToString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/tokeniser.monkey<85>";
	var t_="JSONToken - type: "+String(this.m_tokenType)+", value: "+this.p_GetValueString();
	pop_err();
	return t_;
}
function bb_math_Max(t_x,t_y){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<56>";
	if(t_x>t_y){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<56>";
		pop_err();
		return t_x;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<57>";
	pop_err();
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<83>";
	if(t_x>t_y){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<83>";
		pop_err();
		return t_x;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<84>";
	pop_err();
	return t_y;
}
function bb_math_Min(t_x,t_y){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<51>";
	if(t_x<t_y){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<51>";
		pop_err();
		return t_x;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<52>";
	pop_err();
	return t_y;
}
function bb_math_Min2(t_x,t_y){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<78>";
	if(t_x<t_y){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<78>";
		pop_err();
		return t_x;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<79>";
	pop_err();
	return t_y;
}
function c_FloatObject(){
	Object.call(this);
	this.m_value=.0;
}
c_FloatObject.m_new=function(t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<59>";
	dbg_object(this).m_value=(t_value);
	pop_err();
	return this;
}
c_FloatObject.m_new2=function(t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<63>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_FloatObject.m_new3=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<55>";
	pop_err();
	return this;
}
c_FloatObject.prototype.p_ToString=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<75>";
	var t_=String(this.m_value);
	pop_err();
	return t_;
}
c_FloatObject.prototype.p_ToFloat=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<71>";
	pop_err();
	return this.m_value;
}
function c_IntObject(){
	Object.call(this);
	this.m_value=0;
}
c_IntObject.m_new=function(t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<27>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_IntObject.m_new2=function(t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<31>";
	dbg_object(this).m_value=((t_value)|0);
	pop_err();
	return this;
}
c_IntObject.m_new3=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<23>";
	pop_err();
	return this;
}
c_IntObject.prototype.p_ToString=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<43>";
	var t_=String(this.m_value);
	pop_err();
	return t_;
}
c_IntObject.prototype.p_ToInt=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<35>";
	pop_err();
	return this.m_value;
}
function c_StringObject(){
	Object.call(this);
	this.m_value="";
}
c_StringObject.m_new=function(t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<92>";
	dbg_object(this).m_value=String(t_value);
	pop_err();
	return this;
}
c_StringObject.m_new2=function(t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<96>";
	dbg_object(this).m_value=String(t_value);
	pop_err();
	return this;
}
c_StringObject.m_new3=function(t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<100>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_StringObject.m_new4=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<88>";
	pop_err();
	return this;
}
c_StringObject.prototype.p_ToString=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/boxes.monkey<104>";
	pop_err();
	return this.m_value;
}
function c_JSONObject(){
	c_JSONDataItem.call(this);
	this.m_values=c_StringMap.m_new.call(new c_StringMap);
}
c_JSONObject.prototype=extend_class(c_JSONDataItem);
c_JSONObject.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<663>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<664>";
	this.m_dataType=1;
	pop_err();
	return this;
}
c_JSONObject.prototype.p_AddItem=function(t_name,t_dataItem){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<684>";
	this.m_values.p_Set2(t_name,t_dataItem);
	pop_err();
}
c_JSONObject.prototype.p_GetItem=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<692>";
	var t_=this.m_values.p_Get(t_name);
	pop_err();
	return t_;
}
c_JSONObject.prototype.p_GetItem2=function(t_name,t_defaultValue){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<696>";
	var t_item=this.m_values.p_Get(t_name);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<697>";
	if(t_item!=null){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<698>";
		var t_=(t_item.p_ToString());
		pop_err();
		return t_;
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<700>";
	pop_err();
	return t_defaultValue;
}
c_JSONObject.prototype.p_GetItem3=function(t_name,t_defaultValue){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<704>";
	var t_item=this.m_values.p_Get(t_name);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<705>";
	if(t_item!=null){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<706>";
		var t_=(t_item.p_ToInt());
		pop_err();
		return t_;
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<708>";
	pop_err();
	return t_defaultValue;
}
c_JSONObject.prototype.p_GetItem4=function(t_name,t_defaultValue){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<712>";
	var t_item=this.m_values.p_Get(t_name);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<713>";
	if(t_item!=null){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<714>";
		var t_=(t_item.p_ToFloat());
		pop_err();
		return t_;
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<716>";
	pop_err();
	return t_defaultValue;
}
c_JSONObject.prototype.p_GetItem5=function(t_name,t_defaultValue){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<720>";
	var t_item=this.m_values.p_Get(t_name);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<721>";
	if(t_item!=null){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<722>";
		var t_=(t_item.p_ToBool());
		pop_err();
		return t_;
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<724>";
	pop_err();
	return t_defaultValue;
}
c_JSONObject.prototype.p_Names=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<775>";
	var t_=this.m_values.p_Keys();
	pop_err();
	return t_;
}
c_JSONObject.prototype.p_ToString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<750>";
	var t_retString=c_StringBuilder.m_new.call(new c_StringBuilder,this.m_values.p_Count()*5+5);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<751>";
	var t_first=true;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<753>";
	t_retString.p_AddString("{");
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<755>";
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<755>";
	var t_=this.m_values.p_ObjectEnumerator();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<755>";
	while(t_.p_HasNext()){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<755>";
		var t_v=t_.p_NextObject();
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<756>";
		if(t_first){
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<757>";
			t_first=false;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<759>";
			t_retString.p_AddString(",");
		}
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<761>";
		t_retString.p_AddString("\"");
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<762>";
		t_retString.p_AddString(t_v.p_Key());
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<763>";
		t_retString.p_AddString("\":");
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<764>";
		t_retString.p_AddString(t_v.p_Value().p_ToString());
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<766>";
	t_retString.p_AddString("}");
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<767>";
	var t_2=t_retString.p_ToString();
	pop_err();
	return t_2;
}
function c_JSONDataType(){
	Object.call(this);
}
function c_JSONNonData(){
	c_JSONDataItem.call(this);
	this.m_value=null;
}
c_JSONNonData.prototype=extend_class(c_JSONDataItem);
c_JSONNonData.m_new=function(t_token){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<408>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<409>";
	this.m_dataType=9;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<410>";
	this.m_value=t_token;
	pop_err();
	return this;
}
c_JSONNonData.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<405>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<405>";
	pop_err();
	return this;
}
c_JSONNonData.prototype.p_ToString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<414>";
	pop_err();
	return "Non Data";
}
function c_JSONDataError(){
	c_JSONDataItem.call(this);
	this.m_value="";
}
c_JSONDataError.prototype=extend_class(c_JSONDataItem);
c_JSONDataError.m_new=function(t_errorDescription,t_location){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<395>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<396>";
	this.m_dataType=-1;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<397>";
	this.m_value=t_errorDescription+"\nJSON Location: "+t_location;
	pop_err();
	return this;
}
c_JSONDataError.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<392>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<392>";
	pop_err();
	return this;
}
c_JSONDataError.prototype.p_ToString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<401>";
	pop_err();
	return this.m_value;
}
function c_JSONString(){
	c_JSONDataItem.call(this);
	this.m_value="";
	this.m_jsonReady="";
}
c_JSONString.prototype=extend_class(c_JSONDataItem);
c_JSONString.m_new=function(t_value,t_isMonkeyString){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<489>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<490>";
	this.m_dataType=5;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<491>";
	if(!t_isMonkeyString){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<492>";
		dbg_object(this).m_value=c_JSONData.m_UnEscapeJSON(t_value);
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<493>";
		this.m_jsonReady="\""+t_value+"\"";
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<495>";
		dbg_object(this).m_value=t_value;
	}
	pop_err();
	return this;
}
c_JSONString.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<481>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<481>";
	pop_err();
	return this;
}
c_JSONString.prototype.p_ToString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<507>";
	pop_err();
	return this.m_value;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map2.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<223>";
					this.p_RotateLeft2(t_node);
				}
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<227>";
				this.p_RotateRight2(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<239>";
					this.p_RotateRight2(t_node);
				}
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<243>";
				this.p_RotateLeft2(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map2.prototype.p_Set2=function(t_key,t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<45>";
	t_node=c_Node2.m_new.call(new c_Node2,t_key,t_value,-1,t_parent);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<53>";
		this.p_InsertFixup2(t_node);
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map2.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map2.prototype.p_Get=function(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
c_Map2.prototype.p_Keys=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<113>";
	var t_=c_MapKeys.m_new.call(new c_MapKeys,this);
	pop_err();
	return t_;
}
c_Map2.prototype.p_FirstNode=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<125>";
	if(!((this.m_root)!=null)){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<125>";
		pop_err();
		return null;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<127>";
	var t_node=this.m_root;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<128>";
	while((dbg_object(t_node).m_left)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<129>";
		t_node=dbg_object(t_node).m_left;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<131>";
	pop_err();
	return t_node;
}
c_Map2.prototype.p_Count=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<17>";
	if((this.m_root)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<17>";
		var t_=this.m_root.p_Count2(0);
		pop_err();
		return t_;
	}
	pop_err();
	return 0;
}
c_Map2.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<121>";
	var t_=c_NodeEnumerator.m_new.call(new c_NodeEnumerator,this.p_FirstNode());
	pop_err();
	return t_;
}
function c_StringMap(){
	c_Map2.call(this);
}
c_StringMap.prototype=extend_class(c_Map2);
c_StringMap.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<551>";
	c_Map2.m_new.call(this);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node2(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node2.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node2.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
c_Node2.prototype.p_NextNode=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<385>";
	var t_node=null;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<386>";
	if((this.m_right)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<387>";
		t_node=this.m_right;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<388>";
		while((dbg_object(t_node).m_left)!=null){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<389>";
			t_node=dbg_object(t_node).m_left;
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<391>";
		pop_err();
		return t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<393>";
	t_node=this;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<394>";
	var t_parent=dbg_object(this).m_parent;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).m_right){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<396>";
		t_node=t_parent;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<397>";
		t_parent=dbg_object(t_parent).m_parent;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<399>";
	pop_err();
	return t_parent;
}
c_Node2.prototype.p_Count2=function(t_n){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<371>";
	if((this.m_left)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<371>";
		t_n=this.m_left.p_Count2(t_n);
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<372>";
	if((this.m_right)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<372>";
		t_n=this.m_right.p_Count2(t_n);
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<373>";
	var t_=t_n+1;
	pop_err();
	return t_;
}
c_Node2.prototype.p_Key=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<377>";
	pop_err();
	return this.m_key;
}
c_Node2.prototype.p_Value=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<381>";
	pop_err();
	return this.m_value;
}
function c_JSONArray(){
	c_JSONDataItem.call(this);
	this.m_values=c_List.m_new.call(new c_List);
}
c_JSONArray.prototype=extend_class(c_JSONDataItem);
c_JSONArray.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<554>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<555>";
	this.m_dataType=2;
	pop_err();
	return this;
}
c_JSONArray.prototype.p_AddItem2=function(t_dataItem){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<575>";
	this.m_values.p_AddLast(t_dataItem);
	pop_err();
}
c_JSONArray.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<621>";
	var t_=this.m_values.p_ObjectEnumerator();
	pop_err();
	return t_;
}
c_JSONArray.prototype.p_ToString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<601>";
	var t_retString=c_StringBuilder.m_new.call(new c_StringBuilder,this.m_values.p_Count()*2+5);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<602>";
	var t_first=true;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<604>";
	t_retString.p_AddString("[");
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<606>";
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<606>";
	var t_=this.m_values.p_ObjectEnumerator();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<606>";
	while(t_.p_HasNext()){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<606>";
		var t_v=t_.p_NextObject();
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<607>";
		if(t_first){
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<608>";
			t_first=false;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<610>";
			t_retString.p_AddString(",");
		}
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<612>";
		t_retString.p_AddString(t_v.p_ToString());
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<615>";
	t_retString.p_AddString("]");
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<617>";
	var t_2=t_retString.p_ToString();
	pop_err();
	return t_2;
}
function c_List(){
	Object.call(this);
	this.m__head=(c_HeadNode.m_new.call(new c_HeadNode));
}
c_List.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_List.prototype.p_AddLast=function(t_data){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<108>";
	var t_=c_Node3.m_new.call(new c_Node3,this.m__head,dbg_object(this.m__head).m__pred,t_data);
	pop_err();
	return t_;
}
c_List.m_new2=function(t_data){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<13>";
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[dbg_index];
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<14>";
		this.p_AddLast(t_t);
	}
	pop_err();
	return this;
}
c_List.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<186>";
	var t_=c_Enumerator.m_new.call(new c_Enumerator,this);
	pop_err();
	return t_;
}
c_List.prototype.p_Count=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<41>";
	var t_n=0;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<41>";
	var t_node=dbg_object(this.m__head).m__succ;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<42>";
	while(t_node!=this.m__head){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<43>";
		t_node=dbg_object(t_node).m__succ;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<44>";
		t_n+=1;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<46>";
	pop_err();
	return t_n;
}
c_List.prototype.p_ToArray=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<19>";
	var t_arr=new_object_array(this.p_Count());
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<19>";
	var t_i=0;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<20>";
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<20>";
	var t_=this.p_ObjectEnumerator();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<20>";
	while(t_.p_HasNext()){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<20>";
		var t_t=t_.p_NextObject();
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<21>";
		dbg_array(t_arr,t_i)[dbg_index]=t_t;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<22>";
		t_i+=1;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<24>";
	pop_err();
	return t_arr;
}
function c_Node3(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node3.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<261>";
	this.m__succ=t_succ;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<262>";
	this.m__pred=t_pred;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<263>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<264>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<265>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node3.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<258>";
	pop_err();
	return this;
}
function c_HeadNode(){
	c_Node3.call(this);
}
c_HeadNode.prototype=extend_class(c_Node3);
c_HeadNode.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<310>";
	c_Node3.m_new2.call(this);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<311>";
	this.m__succ=(this);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<312>";
	this.m__pred=(this);
	pop_err();
	return this;
}
function c_StringBuilder(){
	Object.call(this);
	this.m_retStrings=[];
	this.m_index=0;
}
c_StringBuilder.m_new=function(t_initialSize){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<39>";
	if(t_initialSize<1){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<40>";
		t_initialSize=1;
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<42>";
	this.m_retStrings=new_string_array(t_initialSize);
	pop_err();
	return this;
}
c_StringBuilder.prototype.p_AddString=function(t_add){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<46>";
	if(this.m_index==this.m_retStrings.length){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<47>";
		this.m_retStrings=resize_string_array(this.m_retStrings,this.m_retStrings.length*2);
	}
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<49>";
	dbg_array(this.m_retStrings,this.m_index)[dbg_index]=t_add;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<50>";
	this.m_index+=1;
	pop_err();
}
c_StringBuilder.prototype.p_ToString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<54>";
	if(this.m_index<2){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<55>";
		pop_err();
		return dbg_array(this.m_retStrings,0)[dbg_index];
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<57>";
		var t_=this.m_retStrings.slice(0,this.m_index).join("");
		pop_err();
		return t_;
	}
}
function c_JSONFloat(){
	c_JSONDataItem.call(this);
	this.m_value=.0;
	this.m_unparsedStr="";
	this.m_unparsed=false;
}
c_JSONFloat.prototype=extend_class(c_JSONDataItem);
c_JSONFloat.m_new=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<423>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<424>";
	this.m_dataType=3;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<425>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_JSONFloat.m_new2=function(t_unparsedStr){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<431>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<432>";
	this.m_dataType=3;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<433>";
	dbg_object(this).m_unparsedStr=t_unparsedStr;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<434>";
	dbg_object(this).m_unparsed=true;
	pop_err();
	return this;
}
c_JSONFloat.m_new3=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<418>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<418>";
	pop_err();
	return this;
}
c_JSONFloat.prototype.p_Parse=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<438>";
	if(this.m_unparsed){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<439>";
		this.m_value=parseFloat(this.m_unparsedStr);
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<440>";
		this.m_unparsed=false;
	}
	pop_err();
}
c_JSONFloat.prototype.p_ToInt=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<445>";
	this.p_Parse();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<446>";
	var t_=((this.m_value)|0);
	pop_err();
	return t_;
}
c_JSONFloat.prototype.p_ToFloat=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<450>";
	this.p_Parse();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<451>";
	pop_err();
	return this.m_value;
}
c_JSONFloat.prototype.p_ToString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<455>";
	this.p_Parse();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<456>";
	var t_=String(this.m_value);
	pop_err();
	return t_;
}
function c_JSONInteger(){
	c_JSONDataItem.call(this);
	this.m_value=0;
}
c_JSONInteger.prototype=extend_class(c_JSONDataItem);
c_JSONInteger.m_new=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<463>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<464>";
	this.m_dataType=4;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<465>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_JSONInteger.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<460>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<460>";
	pop_err();
	return this;
}
c_JSONInteger.prototype.p_ToInt=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<469>";
	pop_err();
	return this.m_value;
}
c_JSONInteger.prototype.p_ToFloat=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<473>";
	var t_=(this.m_value);
	pop_err();
	return t_;
}
c_JSONInteger.prototype.p_ToString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<477>";
	var t_=String(this.m_value);
	pop_err();
	return t_;
}
function c_JSONBool(){
	c_JSONDataItem.call(this);
	this.m_value=false;
}
c_JSONBool.prototype=extend_class(c_JSONDataItem);
c_JSONBool.m_new=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<515>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<516>";
	this.m_dataType=6;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<517>";
	dbg_object(this).m_value=t_value;
	pop_err();
	return this;
}
c_JSONBool.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<512>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<512>";
	pop_err();
	return this;
}
c_JSONBool.prototype.p_ToBool=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<521>";
	pop_err();
	return this.m_value;
}
c_JSONBool.prototype.p_ToString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<525>";
	if(this.m_value){
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<526>";
		pop_err();
		return "True";
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<528>";
		pop_err();
		return "False";
	}
}
function c_JSONNull(){
	c_JSONDataItem.call(this);
}
c_JSONNull.prototype=extend_class(c_JSONDataItem);
c_JSONNull.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<542>";
	c_JSONDataItem.m_new.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<542>";
	pop_err();
	return this;
}
c_JSONNull.prototype.p_ToString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<546>";
	this.m_dataType=7;
	err_info="C:/MonkeyX_Projects/MODULES/json/jsondata.monkey<547>";
	pop_err();
	return "NULL";
}
function c_SpineBoneData(){
	Object.call(this);
	this.m_Name="";
	this.m_Parent=null;
	this.m_Length=.0;
	this.m_X=.0;
	this.m_Y=.0;
	this.m_Rotation=.0;
	this.m_ScaleX=1.0;
	this.m_ScaleY=1.0;
	this.m_InheritScale=true;
	this.m_InheritRotation=true;
}
c_SpineBoneData.m_new=function(t_name,t_parent){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebonedata.monkey<21>";
	if(t_name.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebonedata.monkey<21>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"name cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebonedata.monkey<22>";
	this.m_Name=t_name;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebonedata.monkey<23>";
	this.m_Parent=t_parent;
	pop_err();
	return this;
}
c_SpineBoneData.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebonedata.monkey<6>";
	pop_err();
	return this;
}
function c_Enumerator(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator.m_new=function(t_list){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<326>";
	this.m__list=t_list;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<327>";
	this.m__curr=dbg_object(dbg_object(t_list).m__head).m__succ;
	pop_err();
	return this;
}
c_Enumerator.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<323>";
	pop_err();
	return this;
}
c_Enumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<331>";
	while(dbg_object(dbg_object(this.m__curr).m__succ).m__pred!=this.m__curr){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<332>";
		this.m__curr=dbg_object(this.m__curr).m__succ;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<334>";
	var t_=this.m__curr!=dbg_object(this.m__list).m__head;
	pop_err();
	return t_;
}
c_Enumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<338>";
	var t_data=dbg_object(this.m__curr).m__data;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<339>";
	this.m__curr=dbg_object(this.m__curr).m__succ;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<340>";
	pop_err();
	return t_data;
}
function c_SpineIkConstraintData(){
	Object.call(this);
	this.m_Name="";
	this.m_Bones=[];
	this.m_Target=null;
	this.m_BendDirection=1;
	this.m_Mix=1.0;
}
c_SpineIkConstraintData.m_new=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraintdata.monkey<14>";
	if(t_name.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraintdata.monkey<14>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"name cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraintdata.monkey<15>";
	this.m_Name=t_name;
	pop_err();
	return this;
}
c_SpineIkConstraintData.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraintdata.monkey<6>";
	pop_err();
	return this;
}
function c_SpineSlotData(){
	Object.call(this);
	this.m_Name="";
	this.m_BoneData=null;
	this.m_R=1.0;
	this.m_G=1.0;
	this.m_B=1.0;
	this.m_A=1.0;
	this.m_AttachmentName="";
	this.m_AdditiveBlending=false;
}
c_SpineSlotData.m_new=function(t_name,t_boneData){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslotdata.monkey<17>";
	if(t_name.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslotdata.monkey<17>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"name cannot be empty.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslotdata.monkey<18>";
	if(t_boneData==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslotdata.monkey<18>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"boneData cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslotdata.monkey<19>";
	this.m_Name=t_name;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslotdata.monkey<20>";
	this.m_BoneData=t_boneData;
	pop_err();
	return this;
}
c_SpineSlotData.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslotdata.monkey<6>";
	pop_err();
	return this;
}
function c_SpineSkin(){
	Object.call(this);
	this.m_Name="";
	this.m_attachments=[];
}
c_SpineSkin.m_new=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<13>";
	if(t_name.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<13>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"name cannot be empty.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<14>";
	this.m_Name=t_name;
	pop_err();
	return this;
}
c_SpineSkin.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<7>";
	pop_err();
	return this;
}
c_SpineSkin.prototype.p_AddAttachment=function(t_slotIndex,t_name,t_attachment){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<18>";
	if(t_attachment==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<18>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"attachment cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<20>";
	if(t_slotIndex>=this.m_attachments.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<20>";
		this.m_attachments=resize_object_array(this.m_attachments,t_slotIndex+1);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<22>";
	if(dbg_array(this.m_attachments,t_slotIndex)[dbg_index]==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<22>";
		dbg_array(this.m_attachments,t_slotIndex)[dbg_index]=c_StringMap2.m_new.call(new c_StringMap2);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<24>";
	dbg_array(this.m_attachments,t_slotIndex)[dbg_index].p_Insert2(t_name,t_attachment);
	pop_err();
}
c_SpineSkin.prototype.p_GetAttachment=function(t_slotIndex,t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<29>";
	if(this.m_attachments.length<=t_slotIndex || dbg_array(this.m_attachments,t_slotIndex)[dbg_index]==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<29>";
		pop_err();
		return null;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<30>";
	var t_=dbg_array(this.m_attachments,t_slotIndex)[dbg_index].p_ValueForKey(t_name);
	pop_err();
	return t_;
}
c_SpineSkin.prototype.p_AttachAll=function(t_skeleton,t_oldSkin){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<63>";
	var t_name="";
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<64>";
	var t_slot=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<65>";
	var t_attachments=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<66>";
	var t_attachment=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<68>";
	var t_length=dbg_object(t_oldSkin).m_attachments.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<69>";
	for(var t_slotIndex=0;t_slotIndex<t_length;t_slotIndex=t_slotIndex+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<70>";
		t_slot=dbg_array(dbg_object(t_skeleton).m_Slots,t_slotIndex)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<72>";
		t_attachments=dbg_array(dbg_object(t_oldSkin).m_attachments,t_slotIndex)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<73>";
		if((t_attachments)!=null){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<74>";
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<74>";
			var t_=t_attachments.p_Keys().p_ObjectEnumerator();
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<74>";
			while(t_.p_HasNext()){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<74>";
				t_name=t_.p_NextObject();
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<75>";
				t_attachment=t_attachments.p_ValueForKey(t_name);
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<76>";
				if(t_slot.p_Attachment()==t_attachment){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<77>";
					t_attachment=this.p_GetAttachment(t_slotIndex,t_name);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<78>";
					if((t_attachment)!=null){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<78>";
						t_slot.p_Attachment2(t_attachment);
					}
				}
			}
		}
	}
	pop_err();
}
c_SpineSkin.prototype.p_ToString=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskin.monkey<58>";
	pop_err();
	return this.m_Name;
}
function c_SpineEventData(){
	Object.call(this);
	this.m_Name="";
	this.m_IntValue=0;
	this.m_FloatValue=.0;
	this.m_StringValue="";
}
c_SpineEventData.m_new=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineeventdata.monkey<13>";
	if(t_name.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineeventdata.monkey<13>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"name cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineeventdata.monkey<14>";
	dbg_object(this).m_Name=t_name;
	pop_err();
	return this;
}
c_SpineEventData.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineeventdata.monkey<6>";
	pop_err();
	return this;
}
function c_MapKeys(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys.m_new=function(t_map){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<503>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_MapKeys.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<500>";
	pop_err();
	return this;
}
c_MapKeys.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<507>";
	var t_=c_KeyEnumerator.m_new.call(new c_KeyEnumerator,this.m_map.p_FirstNode());
	pop_err();
	return t_;
}
function c_KeyEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator.m_new=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<459>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_KeyEnumerator.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<456>";
	pop_err();
	return this;
}
c_KeyEnumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<463>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_KeyEnumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<467>";
	var t_t=this.m_node;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<468>";
	this.m_node=this.m_node.p_NextNode();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<469>";
	pop_err();
	return dbg_object(t_t).m_key;
}
function c_SpineMeshAttachment(){
	c_SpineAttachment.call(this);
	this.m_Path="";
	this.m_Vertices=[];
	this.m_Triangles=[];
	this.m_RegionUVs=[];
	this.m_RegionU2=.0;
	this.m_RegionU=.0;
	this.m_RegionV2=.0;
	this.m_RegionV=.0;
	this.m_UVs=[];
	this.m_RegionRotate=false;
	this.m_R=1.0;
	this.m_G=1.0;
	this.m_B=1.0;
	this.m_A=1.0;
	this.m_HullLength=0;
	this.m_Edges=[];
	this.m_Width=.0;
	this.m_Height=.0;
	this.m_RenderObject=null;
	this.m_RegionOffsetX=.0;
	this.m_RegionOffsetY=.0;
	this.m_RegionWidth=.0;
	this.m_RegionHeight=.0;
	this.m_RegionOriginalWidth=.0;
	this.m_RegionOriginalHeight=.0;
}
c_SpineMeshAttachment.prototype=extend_class(c_SpineAttachment);
c_SpineMeshAttachment.prototype.p_UpdateUVs=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<47>";
	var t_width=this.m_RegionU2-this.m_RegionU;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<48>";
	var t_height=this.m_RegionV2-this.m_RegionV;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<50>";
	if(this.m_UVs.length!=this.m_RegionUVs.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<51>";
		this.m_UVs=new_number_array(this.m_RegionUVs.length);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<54>";
	var t_total=this.m_UVs.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<55>";
	if(this.m_RegionRotate){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<56>";
		for(var t_i=0;t_i<t_total;t_i=t_i+2){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<57>";
			dbg_array(this.m_UVs,t_i)[dbg_index]=this.m_RegionU+dbg_array(this.m_RegionUVs,t_i+1)[dbg_index]*t_width;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<58>";
			dbg_array(this.m_UVs,t_i+1)[dbg_index]=this.m_RegionV+t_height-dbg_array(this.m_RegionUVs,t_i)[dbg_index]*t_height;
		}
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<61>";
		for(var t_i2=0;t_i2<t_total;t_i2=t_i2+2){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<62>";
			dbg_array(this.m_UVs,t_i2)[dbg_index]=this.m_RegionU+dbg_array(this.m_RegionUVs,t_i2)[dbg_index]*t_width;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<63>";
			dbg_array(this.m_UVs,t_i2+1)[dbg_index]=this.m_RegionV+dbg_array(this.m_RegionUVs,t_i2+1)[dbg_index]*t_height;
		}
	}
	pop_err();
}
c_SpineMeshAttachment.prototype.p_ComputeWorldVertices2=function(t_slot,t_worldVertices){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<69>";
	var t_x=dbg_object(dbg_object(dbg_object(t_slot).m_Bone).m_Skeleton).m_X+dbg_object(dbg_object(t_slot).m_Bone).m_WorldX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<70>";
	var t_y=dbg_object(dbg_object(dbg_object(t_slot).m_Bone).m_Skeleton).m_Y+dbg_object(dbg_object(t_slot).m_Bone).m_WorldY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<71>";
	var t_m00=dbg_object(dbg_object(t_slot).m_Bone).m_M00;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<72>";
	var t_m01=dbg_object(dbg_object(t_slot).m_Bone).m_M01;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<73>";
	var t_m10=dbg_object(dbg_object(t_slot).m_Bone).m_M10;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<74>";
	var t_m11=dbg_object(dbg_object(t_slot).m_Bone).m_M11;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<76>";
	var t_verticesCount=this.m_Vertices.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<78>";
	if(dbg_object(t_slot).m_AttachmentVerticesCount==t_verticesCount){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<79>";
		this.m_Vertices=dbg_object(t_slot).m_AttachmentVertices;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<82>";
	var t_vx=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<83>";
	var t_vy=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<84>";
	for(var t_i=0;t_i<t_verticesCount;t_i=t_i+2){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<85>";
		t_vx=dbg_array(this.m_Vertices,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<86>";
		t_vy=dbg_array(this.m_Vertices,t_i+1)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<87>";
		dbg_array(t_worldVertices,t_i)[dbg_index]=t_vx*t_m00+t_vy*t_m01+t_x;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<88>";
		dbg_array(t_worldVertices,t_i+1)[dbg_index]=t_vx*t_m10+t_vy*t_m11+t_y;
	}
	pop_err();
}
c_SpineMeshAttachment.m_new=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<42>";
	c_SpineAttachment.m_new.call(this,t_name);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<43>";
	this.m_Type=2;
	pop_err();
	return this;
}
c_SpineMeshAttachment.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<7>";
	c_SpineAttachment.m_new2.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spinemeshattachment.monkey<7>";
	pop_err();
	return this;
}
function c_SpineSkinnedMeshAttachment(){
	c_SpineAttachment.call(this);
	this.m_Path="";
	this.m_Bones=[];
	this.m_Weights=[];
	this.m_Triangles=[];
	this.m_RegionUVs=[];
	this.m_RegionU2=.0;
	this.m_RegionU=.0;
	this.m_RegionV2=.0;
	this.m_RegionV=.0;
	this.m_UVs=[];
	this.m_RegionRotate=false;
	this.m_R=1.0;
	this.m_G=1.0;
	this.m_B=1.0;
	this.m_A=1.0;
	this.m_HullLength=0;
	this.m_Edges=[];
	this.m_Width=.0;
	this.m_Height=.0;
	this.m_RenderObject=null;
	this.m_RegionOffsetX=.0;
	this.m_RegionOffsetY=.0;
	this.m_RegionWidth=.0;
	this.m_RegionHeight=.0;
	this.m_RegionOriginalWidth=.0;
	this.m_RegionOriginalHeight=.0;
}
c_SpineSkinnedMeshAttachment.prototype=extend_class(c_SpineAttachment);
c_SpineSkinnedMeshAttachment.prototype.p_UpdateUVs=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<48>";
	var t_width=this.m_RegionU2-this.m_RegionU;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<49>";
	var t_height=this.m_RegionV2-this.m_RegionV;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<51>";
	if(this.m_UVs.length!=this.m_RegionUVs.length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<52>";
		this.m_UVs=new_number_array(this.m_RegionUVs.length);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<55>";
	if(this.m_RegionRotate){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<56>";
		for(var t_i=0;t_i<this.m_UVs.length;t_i=t_i+2){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<57>";
			dbg_array(this.m_UVs,t_i)[dbg_index]=this.m_RegionU+dbg_array(this.m_RegionUVs,t_i+1)[dbg_index]*t_width;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<58>";
			dbg_array(this.m_UVs,t_i+1)[dbg_index]=this.m_RegionV+t_height-dbg_array(this.m_RegionUVs,t_i)[dbg_index]*t_height;
		}
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<61>";
		for(var t_i2=0;t_i2<this.m_UVs.length;t_i2=t_i2+2){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<62>";
			dbg_array(this.m_UVs,t_i2)[dbg_index]=this.m_RegionU+dbg_array(this.m_RegionUVs,t_i2)[dbg_index]*t_width;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<63>";
			dbg_array(this.m_UVs,t_i2+1)[dbg_index]=this.m_RegionV+dbg_array(this.m_RegionUVs,t_i2+1)[dbg_index]*t_height;
		}
	}
	pop_err();
}
c_SpineSkinnedMeshAttachment.prototype.p_ComputeWorldVertices2=function(t_slot,t_worldVertices){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<69>";
	var t_skeleton=dbg_object(dbg_object(t_slot).m_Bone).m_Skeleton;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<70>";
	var t_skeletonBones=dbg_object(t_skeleton).m_Bones;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<71>";
	var t_x=dbg_object(t_skeleton).m_X;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<72>";
	var t_y=dbg_object(t_skeleton).m_Y;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<74>";
	var t_bone=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<75>";
	var t_vx=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<76>";
	var t_vy=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<77>";
	var t_weight=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<78>";
	var t_wx=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<79>";
	var t_wy=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<80>";
	var t_nn=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<81>";
	var t_w=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<82>";
	var t_v=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<83>";
	var t_b=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<84>";
	var t_n=this.m_Bones.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<86>";
	if(dbg_object(t_slot).m_AttachmentVerticesCount==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<88>";
		while(t_v<t_n){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<89>";
			t_wx=0.0;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<90>";
			t_wy=0.0;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<92>";
			t_nn=dbg_array(this.m_Bones,t_v)[dbg_index]+t_v;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<93>";
			t_v+=1;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<94>";
			while(t_v<=t_nn){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<95>";
				t_bone=dbg_array(t_skeletonBones,dbg_array(this.m_Bones,t_v)[dbg_index])[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<96>";
				t_vx=dbg_array(this.m_Weights,t_b)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<97>";
				t_vy=dbg_array(this.m_Weights,t_b+1)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<98>";
				t_weight=dbg_array(this.m_Weights,t_b+2)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<99>";
				t_wx+=(t_vx*dbg_object(t_bone).m_M00+t_vy*dbg_object(t_bone).m_M01+dbg_object(t_bone).m_WorldX)*t_weight;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<100>";
				t_wy+=(t_vx*dbg_object(t_bone).m_M10+t_vy*dbg_object(t_bone).m_M11+dbg_object(t_bone).m_WorldY)*t_weight;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<103>";
				t_v+=1;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<104>";
				t_b+=3;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<107>";
			dbg_array(t_worldVertices,t_w)[dbg_index]=t_wx+t_x;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<108>";
			dbg_array(t_worldVertices,t_w+1)[dbg_index]=t_wy+t_y;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<111>";
			t_w+=2;
		}
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<114>";
		var t_ffd=dbg_object(t_slot).m_AttachmentVertices;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<115>";
		var t_f=0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<118>";
		while(t_v<t_n){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<119>";
			t_wx=0.0;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<120>";
			t_wy=0.0;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<122>";
			t_nn=dbg_array(this.m_Bones,t_v)[dbg_index]+t_v;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<123>";
			t_v+=1;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<126>";
			while(t_v<=t_nn){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<127>";
				t_bone=dbg_array(t_skeletonBones,dbg_array(this.m_Bones,t_v)[dbg_index])[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<128>";
				t_vx=dbg_array(this.m_Weights,t_b)[dbg_index]+dbg_array(t_ffd,t_f)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<129>";
				t_vy=dbg_array(this.m_Weights,t_b+1)[dbg_index]+dbg_array(t_ffd,t_f+1)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<130>";
				t_weight=dbg_array(this.m_Weights,t_b+2)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<131>";
				t_wx+=(t_vx*dbg_object(t_bone).m_M00+t_vy*dbg_object(t_bone).m_M01+dbg_object(t_bone).m_WorldX)*t_weight;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<132>";
				t_wy+=(t_vx*dbg_object(t_bone).m_M10+t_vy*dbg_object(t_bone).m_M11+dbg_object(t_bone).m_WorldY)*t_weight;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<135>";
				t_v+=1;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<136>";
				t_b+=3;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<137>";
				t_f+=2;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<140>";
			dbg_array(t_worldVertices,t_w)[dbg_index]=t_wx+t_x;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<141>";
			dbg_array(t_worldVertices,t_w+1)[dbg_index]=t_wy+t_y;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<144>";
			t_w+=2;
		}
	}
	pop_err();
}
c_SpineSkinnedMeshAttachment.m_new=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<43>";
	c_SpineAttachment.m_new.call(this,t_name);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<44>";
	this.m_Type=3;
	pop_err();
	return this;
}
c_SpineSkinnedMeshAttachment.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<7>";
	c_SpineAttachment.m_new2.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineskinnedmeshattachment.monkey<7>";
	pop_err();
	return this;
}
function c_SpineBoundingBoxAttachment(){
	c_SpineAttachment.call(this);
	this.m_Vertices=[];
}
c_SpineBoundingBoxAttachment.prototype=extend_class(c_SpineAttachment);
c_SpineBoundingBoxAttachment.prototype.p_ComputeWorldVertices=function(t_bone,t_worldVertices){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<17>";
	var t_x=dbg_object(dbg_object(t_bone).m_Skeleton).m_X+dbg_object(t_bone).m_WorldX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<18>";
	var t_y=dbg_object(dbg_object(t_bone).m_Skeleton).m_Y+dbg_object(t_bone).m_WorldY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<19>";
	var t_m00=dbg_object(t_bone).m_M00;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<20>";
	var t_m01=dbg_object(t_bone).m_M01;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<21>";
	var t_m10=dbg_object(t_bone).m_M10;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<22>";
	var t_m11=dbg_object(t_bone).m_M11;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<24>";
	var t_px=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<25>";
	var t_py=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<26>";
	for(var t_i=0;t_i<this.m_Vertices.length;t_i=t_i+2){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<27>";
		t_px=dbg_array(this.m_Vertices,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<28>";
		t_py=dbg_array(this.m_Vertices,t_i+1)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<29>";
		dbg_array(t_worldVertices,t_i)[dbg_index]=t_px*t_m00+t_py*t_m01+t_x;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<30>";
		dbg_array(t_worldVertices,t_i+1)[dbg_index]=t_px*t_m10+t_py*t_m11+t_y;
	}
	pop_err();
}
c_SpineBoundingBoxAttachment.m_new=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<11>";
	c_SpineAttachment.m_new.call(this,t_name);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<12>";
	this.m_Type=1;
	pop_err();
	return this;
}
c_SpineBoundingBoxAttachment.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<7>";
	c_SpineAttachment.m_new2.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/attachments/spineboundingboxattachment.monkey<7>";
	pop_err();
	return this;
}
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map3.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map3.prototype.p_RotateLeft3=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map3.prototype.p_RotateRight3=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map3.prototype.p_InsertFixup3=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<223>";
					this.p_RotateLeft3(t_node);
				}
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<227>";
				this.p_RotateRight3(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<239>";
					this.p_RotateRight3(t_node);
				}
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<243>";
				this.p_RotateLeft3(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map3.prototype.p_Set3=function(t_key,t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<45>";
	t_node=c_Node4.m_new.call(new c_Node4,t_key,t_value,-1,t_parent);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<53>";
		this.p_InsertFixup3(t_node);
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map3.prototype.p_Insert2=function(t_key,t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<146>";
	var t_=this.p_Set3(t_key,t_value);
	pop_err();
	return t_;
}
c_Map3.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map3.prototype.p_Get=function(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
c_Map3.prototype.p_ValueForKey=function(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<151>";
	var t_=this.p_Get(t_key);
	pop_err();
	return t_;
}
c_Map3.prototype.p_Keys=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<113>";
	var t_=c_MapKeys2.m_new.call(new c_MapKeys2,this);
	pop_err();
	return t_;
}
c_Map3.prototype.p_FirstNode=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<125>";
	if(!((this.m_root)!=null)){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<125>";
		pop_err();
		return null;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<127>";
	var t_node=this.m_root;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<128>";
	while((dbg_object(t_node).m_left)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<129>";
		t_node=dbg_object(t_node).m_left;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<131>";
	pop_err();
	return t_node;
}
function c_StringMap2(){
	c_Map3.call(this);
}
c_StringMap2.prototype=extend_class(c_Map3);
c_StringMap2.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<551>";
	c_Map3.m_new.call(this);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap2.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node4(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node4.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node4.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
c_Node4.prototype.p_NextNode=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<385>";
	var t_node=null;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<386>";
	if((this.m_right)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<387>";
		t_node=this.m_right;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<388>";
		while((dbg_object(t_node).m_left)!=null){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<389>";
			t_node=dbg_object(t_node).m_left;
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<391>";
		pop_err();
		return t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<393>";
	t_node=this;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<394>";
	var t_parent=dbg_object(this).m_parent;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).m_right){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<396>";
		t_node=t_parent;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<397>";
		t_parent=dbg_object(t_parent).m_parent;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<399>";
	pop_err();
	return t_parent;
}
function c_SpineCurveTimeline(){
	Object.call(this);
	this.m_curves=new_number_array(0);
	this.implments={c_SpineTimeline:1};
}
c_SpineCurveTimeline.m_new=function(t_frameCount){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<121>";
	this.m_curves=new_number_array((t_frameCount-1)*19);
	pop_err();
	return this;
}
c_SpineCurveTimeline.prototype.p_SetStepped=function(t_frameIndex){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<136>";
	dbg_array(this.m_curves,t_frameIndex*19)[dbg_index]=1.0;
	pop_err();
}
c_SpineCurveTimeline.prototype.p_SetCurve=function(t_frameIndex,t_cx1,t_cy1,t_cx2,t_cy2){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<143>";
	var t_subdiv1=0.10000000000000001;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<144>";
	var t_subdiv2=t_subdiv1*t_subdiv1;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<145>";
	var t_subdiv3=t_subdiv2*t_subdiv1;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<146>";
	var t_pre1=3.0*t_subdiv1;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<147>";
	var t_pre2=3.0*t_subdiv2;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<148>";
	var t_pre4=6.0*t_subdiv2;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<149>";
	var t_pre5=6.0*t_subdiv3;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<150>";
	var t_tmp1x=-t_cx1*2.0+t_cx2;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<151>";
	var t_tmp1y=-t_cy1*2.0+t_cy2;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<152>";
	var t_tmp2x=(t_cx1-t_cx2)*3.0+1.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<153>";
	var t_tmp2y=(t_cy1-t_cy2)*3.0+1.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<154>";
	var t_dfx=t_cx1*t_pre1+t_tmp1x*t_pre2+t_tmp2x*t_subdiv3;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<155>";
	var t_dfy=t_cy1*t_pre1+t_tmp1y*t_pre2+t_tmp2y*t_subdiv3;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<156>";
	var t_ddfx=t_tmp1x*t_pre4+t_tmp2x*t_pre5;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<157>";
	var t_ddfy=t_tmp1y*t_pre4+t_tmp2y*t_pre5;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<158>";
	var t_dddfx=t_tmp2x*t_pre5;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<159>";
	var t_dddfy=t_tmp2y*t_pre5;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<161>";
	var t_i=t_frameIndex*19;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<162>";
	dbg_array(this.m_curves,t_i)[dbg_index]=2.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<163>";
	t_i+=1;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<165>";
	var t_x=t_dfx;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<166>";
	var t_y=t_dfy;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<168>";
	var t_n=t_i+19-1;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<169>";
	for(t_i=t_i;t_i<t_n;t_i=t_i+2){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<170>";
		dbg_array(this.m_curves,t_i)[dbg_index]=t_x;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<171>";
		dbg_array(this.m_curves,t_i+1)[dbg_index]=t_y;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<172>";
		t_dfx+=t_ddfx;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<173>";
		t_dfy+=t_ddfy;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<174>";
		t_ddfx+=t_dddfx;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<175>";
		t_ddfy+=t_dddfy;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<176>";
		t_x+=t_dfx;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<177>";
		t_y+=t_dfy;
	}
	pop_err();
}
c_SpineCurveTimeline.prototype.p_FrameCount=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<126>";
	var t_=((this.m_curves.length/19)|0)+1;
	pop_err();
	return t_;
}
c_SpineCurveTimeline.prototype.p_Apply=function(t_skeleton,t_lastTime,t_time,t_events,t_alpha){
}
c_SpineCurveTimeline.prototype.p_GetCurvePercent=function(t_frameIndex,t_percent){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<182>";
	var t_i=t_frameIndex*19;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<183>";
	var t_type=dbg_array(this.m_curves,t_i)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<185>";
	if(t_type==0.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<185>";
		pop_err();
		return t_percent;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<186>";
	if(t_type==1.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<186>";
		pop_err();
		return 0.0;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<188>";
	t_i+=1;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<189>";
	var t_x=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<190>";
	var t_start=t_i;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<191>";
	var t_n=t_i+19-1;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<192>";
	for(t_i=t_i;t_i<t_n;t_i=t_i+2){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<193>";
		t_x=dbg_array(this.m_curves,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<194>";
		if(t_x>=t_percent){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<195>";
			var t_prevX=.0;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<196>";
			var t_prevY=.0;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<198>";
			if(t_i==t_start){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<199>";
				t_prevX=0.0;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<200>";
				t_prevY=0.0;
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<202>";
				t_prevX=dbg_array(this.m_curves,t_i-2)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<203>";
				t_prevY=dbg_array(this.m_curves,t_i-1)[dbg_index];
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<206>";
			var t_=t_prevY+(dbg_array(this.m_curves,t_i+1)[dbg_index]-t_prevY)*(t_percent-t_prevX)/(t_x-t_prevX);
			pop_err();
			return t_;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<210>";
	var t_y=dbg_array(this.m_curves,t_i-1)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<211>";
	var t_2=t_y+(1.0-t_y)*(t_percent-t_x)/(1.0-t_x);
	pop_err();
	return t_2;
}
function c_SpineColorTimeline(){
	c_SpineCurveTimeline.call(this);
	this.m_Frames=[];
	this.m_SlotIndex=0;
	this.implments={c_SpineTimeline:1};
}
c_SpineColorTimeline.prototype=extend_class(c_SpineCurveTimeline);
c_SpineColorTimeline.m_new=function(t_frameCount){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<365>";
	c_SpineCurveTimeline.m_new.call(this,t_frameCount);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<366>";
	this.m_Frames=new_number_array(t_frameCount*5);
	pop_err();
	return this;
}
c_SpineColorTimeline.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<354>";
	c_SpineCurveTimeline.m_new.call(this,0);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<354>";
	pop_err();
	return this;
}
c_SpineColorTimeline.prototype.p_SetFrame=function(t_frameIndex,t_time,t_r,t_g,t_b,t_a){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<371>";
	t_frameIndex*=5;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<372>";
	dbg_array(this.m_Frames,t_frameIndex)[dbg_index]=t_time;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<373>";
	dbg_array(this.m_Frames,t_frameIndex+1)[dbg_index]=t_r;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<374>";
	dbg_array(this.m_Frames,t_frameIndex+2)[dbg_index]=t_g;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<375>";
	dbg_array(this.m_Frames,t_frameIndex+3)[dbg_index]=t_b;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<376>";
	dbg_array(this.m_Frames,t_frameIndex+4)[dbg_index]=t_a;
	pop_err();
}
c_SpineColorTimeline.prototype.p_Apply=function(t_skeleton,t_lastTime,t_time,t_events,t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<380>";
	if(t_time<dbg_array(this.m_Frames,0)[dbg_index]){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<382>";
	var t_r=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<383>";
	var t_g=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<384>";
	var t_b=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<385>";
	var t_a=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<387>";
	if(t_time>=dbg_array(this.m_Frames,this.m_Frames.length-5)[dbg_index]){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<388>";
		var t_i=this.m_Frames.length-1;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<389>";
		t_r=dbg_array(this.m_Frames,t_i-3)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<390>";
		t_g=dbg_array(this.m_Frames,t_i-2)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<391>";
		t_b=dbg_array(this.m_Frames,t_i-1)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<392>";
		t_a=dbg_array(this.m_Frames,t_i)[dbg_index];
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<395>";
		var t_frameIndex=c_SpineAnimation.m_BinarySearch(this.m_Frames,t_time,5);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<396>";
		var t_lastFrameR=dbg_array(this.m_Frames,t_frameIndex-4)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<397>";
		var t_lastFrameG=dbg_array(this.m_Frames,t_frameIndex-3)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<398>";
		var t_lastFrameB=dbg_array(this.m_Frames,t_frameIndex-2)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<399>";
		var t_lastFrameA=dbg_array(this.m_Frames,t_frameIndex-1)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<400>";
		var t_frameTime=dbg_array(this.m_Frames,t_frameIndex)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<401>";
		var t_percent=1.0-(t_time-t_frameTime)/(dbg_array(this.m_Frames,t_frameIndex+-5)[dbg_index]-t_frameTime);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<402>";
		t_percent=this.p_GetCurvePercent(((t_frameIndex/5)|0)-1,bb_math_Max2(0.0,bb_math_Min2(1.0,t_percent)));
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<404>";
		t_r=t_lastFrameR+(dbg_array(this.m_Frames,t_frameIndex+1)[dbg_index]-t_lastFrameR)*t_percent;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<405>";
		t_g=t_lastFrameG+(dbg_array(this.m_Frames,t_frameIndex+2)[dbg_index]-t_lastFrameG)*t_percent;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<406>";
		t_b=t_lastFrameB+(dbg_array(this.m_Frames,t_frameIndex+3)[dbg_index]-t_lastFrameB)*t_percent;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<407>";
		t_a=t_lastFrameA+(dbg_array(this.m_Frames,t_frameIndex+4)[dbg_index]-t_lastFrameA)*t_percent;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<410>";
	var t_slot=dbg_array(dbg_object(t_skeleton).m_Slots,this.m_SlotIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<411>";
	if(t_alpha<1.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<412>";
		dbg_object(t_slot).m_R+=(t_r-dbg_object(t_slot).m_R)*t_alpha;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<413>";
		dbg_object(t_slot).m_G+=(t_g-dbg_object(t_slot).m_G)*t_alpha;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<414>";
		dbg_object(t_slot).m_B+=(t_b-dbg_object(t_slot).m_B)*t_alpha;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<415>";
		dbg_object(t_slot).m_A+=(t_a-dbg_object(t_slot).m_A)*t_alpha;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<417>";
		dbg_object(t_slot).m_R=t_r;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<418>";
		dbg_object(t_slot).m_G=t_g;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<419>";
		dbg_object(t_slot).m_B=t_b;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<420>";
		dbg_object(t_slot).m_A=t_a;
	}
	pop_err();
}
function c_SpineAttachmentTimeline(){
	Object.call(this);
	this.m_Frames=[];
	this.m_AttachmentNames=[];
	this.m_SlotIndex=0;
	this.implments={c_SpineTimeline:1};
}
c_SpineAttachmentTimeline.m_new=function(t_frameCount){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<431>";
	this.m_Frames=new_number_array(t_frameCount);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<432>";
	this.m_AttachmentNames=new_string_array(t_frameCount);
	pop_err();
	return this;
}
c_SpineAttachmentTimeline.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<425>";
	pop_err();
	return this;
}
c_SpineAttachmentTimeline.prototype.p_SetFrame2=function(t_frameIndex,t_time,t_attachmentName){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<441>";
	dbg_array(this.m_Frames,t_frameIndex)[dbg_index]=t_time;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<442>";
	dbg_array(this.m_AttachmentNames,t_frameIndex)[dbg_index]=t_attachmentName;
	pop_err();
}
c_SpineAttachmentTimeline.prototype.p_FrameCount=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<436>";
	var t_=this.m_Frames.length;
	pop_err();
	return t_;
}
c_SpineAttachmentTimeline.prototype.p_Apply=function(t_skeleton,t_lastTime,t_time,t_events,t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<446>";
	if(t_time<dbg_array(this.m_Frames,0)[dbg_index]){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<449>";
		t_time=999999999.0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<450>";
		t_events=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<451>";
		t_alpha=0.0;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<452>";
		if(t_lastTime>t_time){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<453>";
			t_lastTime=-1.0;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<456>";
	var t_frameIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<457>";
	if(t_time>=dbg_array(this.m_Frames,this.m_Frames.length-1)[dbg_index]){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<458>";
		t_frameIndex=this.m_Frames.length-1;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<460>";
		t_frameIndex=c_SpineAnimation.m_BinarySearch2(this.m_Frames,t_time)-1;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<463>";
	if(dbg_array(this.m_Frames,t_frameIndex)[dbg_index]<=t_lastTime){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<467>";
	var t_attachmentName=dbg_array(this.m_AttachmentNames,t_frameIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<468>";
	if(t_attachmentName.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<469>";
		dbg_array(dbg_object(t_skeleton).m_Slots,this.m_SlotIndex)[dbg_index].p_Attachment2(null);
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<471>";
		dbg_array(dbg_object(t_skeleton).m_Slots,this.m_SlotIndex)[dbg_index].p_Attachment2(t_skeleton.p_GetAttachment(this.m_SlotIndex,t_attachmentName));
	}
	pop_err();
}
function c_SpineRotateTimeline(){
	c_SpineCurveTimeline.call(this);
	this.m_Frames=[];
	this.m_BoneIndex=0;
	this.implments={c_SpineTimeline:1};
}
c_SpineRotateTimeline.prototype=extend_class(c_SpineCurveTimeline);
c_SpineRotateTimeline.m_new=function(t_frameCount){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<223>";
	c_SpineCurveTimeline.m_new.call(this,t_frameCount);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<224>";
	this.m_Frames=new_number_array(t_frameCount*2);
	pop_err();
	return this;
}
c_SpineRotateTimeline.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<215>";
	c_SpineCurveTimeline.m_new.call(this,0);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<215>";
	pop_err();
	return this;
}
c_SpineRotateTimeline.prototype.p_SetFrame3=function(t_frameIndex,t_time,t_angle){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<229>";
	t_frameIndex*=2;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<230>";
	dbg_array(this.m_Frames,t_frameIndex)[dbg_index]=t_time;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<231>";
	dbg_array(this.m_Frames,t_frameIndex+1)[dbg_index]=t_angle;
	pop_err();
}
c_SpineRotateTimeline.prototype.p_Apply=function(t_skeleton,t_lastTime,t_time,t_events,t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<235>";
	if(t_time<dbg_array(this.m_Frames,0)[dbg_index]){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<237>";
	var t_bone=dbg_array(dbg_object(t_skeleton).m_Bones,this.m_BoneIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<238>";
	var t_amount=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<241>";
	if(t_time>=dbg_array(this.m_Frames,this.m_Frames.length-2)[dbg_index]){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<242>";
		t_amount=dbg_object(dbg_object(t_bone).m_Data).m_Rotation+dbg_array(this.m_Frames,this.m_Frames.length-1)[dbg_index]-dbg_object(t_bone).m_Rotation;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<243>";
		while(t_amount>180.0){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<244>";
			t_amount=t_amount-360.0;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<246>";
		while(t_amount<-180.0){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<247>";
			t_amount=t_amount+360.0;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<249>";
		dbg_object(t_bone).m_Rotation+=t_amount*t_alpha;
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<254>";
	var t_frameIndex=c_SpineAnimation.m_BinarySearch(this.m_Frames,t_time,2);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<255>";
	var t_lastFrameValue=dbg_array(this.m_Frames,t_frameIndex-1)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<256>";
	var t_frameTime=dbg_array(this.m_Frames,t_frameIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<257>";
	var t_percent=1.0-(t_time-t_frameTime)/(dbg_array(this.m_Frames,t_frameIndex+-2)[dbg_index]-t_frameTime);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<259>";
	t_percent=this.p_GetCurvePercent((t_frameIndex>>1)-1,bb_math_Max2(0.0,bb_math_Min2(1.0,t_percent)));
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<261>";
	t_amount=dbg_array(this.m_Frames,t_frameIndex+1)[dbg_index]-t_lastFrameValue;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<262>";
	while(t_amount>180.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<263>";
		t_amount=t_amount-360.0;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<265>";
	while(t_amount<-180.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<266>";
		t_amount=t_amount+360.0;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<268>";
	t_amount=dbg_object(dbg_object(t_bone).m_Data).m_Rotation+(t_lastFrameValue+t_amount*t_percent)-dbg_object(t_bone).m_Rotation;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<269>";
	while(t_amount>180.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<270>";
		t_amount=t_amount-360.0;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<272>";
	while(t_amount<-180.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<273>";
		t_amount=t_amount+360.0;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<276>";
	dbg_object(t_bone).m_Rotation+=t_amount*t_alpha;
	pop_err();
}
function c_SpineTranslateTimeline(){
	c_SpineCurveTimeline.call(this);
	this.m_Frames=[];
	this.m_BoneIndex=0;
	this.implments={c_SpineTimeline:1};
}
c_SpineTranslateTimeline.prototype=extend_class(c_SpineCurveTimeline);
c_SpineTranslateTimeline.m_new=function(t_frameCount){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<289>";
	c_SpineCurveTimeline.m_new.call(this,t_frameCount);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<290>";
	this.m_Frames=new_number_array(t_frameCount*3);
	pop_err();
	return this;
}
c_SpineTranslateTimeline.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<280>";
	c_SpineCurveTimeline.m_new.call(this,0);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<280>";
	pop_err();
	return this;
}
c_SpineTranslateTimeline.prototype.p_SetFrame4=function(t_frameIndex,t_time,t_x,t_y){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<295>";
	t_frameIndex*=3;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<296>";
	dbg_array(this.m_Frames,t_frameIndex)[dbg_index]=t_time;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<297>";
	dbg_array(this.m_Frames,t_frameIndex+1)[dbg_index]=t_x;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<298>";
	dbg_array(this.m_Frames,t_frameIndex+2)[dbg_index]=t_y;
	pop_err();
}
c_SpineTranslateTimeline.prototype.p_Apply=function(t_skeleton,t_lastTime,t_time,t_events,t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<302>";
	if(t_time<dbg_array(this.m_Frames,0)[dbg_index]){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<304>";
	var t_bone=dbg_array(dbg_object(t_skeleton).m_Bones,this.m_BoneIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<306>";
	if(t_time>=dbg_array(this.m_Frames,this.m_Frames.length-3)[dbg_index]){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<307>";
		dbg_object(t_bone).m_X+=(dbg_object(dbg_object(t_bone).m_Data).m_X+dbg_array(this.m_Frames,this.m_Frames.length-2)[dbg_index]-dbg_object(t_bone).m_X)*t_alpha;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<308>";
		dbg_object(t_bone).m_Y+=(dbg_object(dbg_object(t_bone).m_Data).m_Y+dbg_array(this.m_Frames,this.m_Frames.length-1)[dbg_index]-dbg_object(t_bone).m_Y)*t_alpha;
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<313>";
	var t_frameIndex=c_SpineAnimation.m_BinarySearch(this.m_Frames,t_time,3);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<314>";
	var t_lastFrameX=dbg_array(this.m_Frames,t_frameIndex-2)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<315>";
	var t_lastFrameY=dbg_array(this.m_Frames,t_frameIndex-1)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<316>";
	var t_frameTime=dbg_array(this.m_Frames,t_frameIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<317>";
	var t_percent=1.0-(t_time-t_frameTime)/(dbg_array(this.m_Frames,t_frameIndex+-3)[dbg_index]-t_frameTime);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<318>";
	t_percent=this.p_GetCurvePercent(((t_frameIndex/3)|0)-1,bb_math_Max2(0.0,bb_math_Min2(1.0,t_percent)));
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<320>";
	dbg_object(t_bone).m_X+=(dbg_object(dbg_object(t_bone).m_Data).m_X+t_lastFrameX+(dbg_array(this.m_Frames,t_frameIndex+1)[dbg_index]-t_lastFrameX)*t_percent-dbg_object(t_bone).m_X)*t_alpha;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<321>";
	dbg_object(t_bone).m_Y+=(dbg_object(dbg_object(t_bone).m_Data).m_Y+t_lastFrameY+(dbg_array(this.m_Frames,t_frameIndex+2)[dbg_index]-t_lastFrameY)*t_percent-dbg_object(t_bone).m_Y)*t_alpha;
	pop_err();
}
function c_SpineScaleTimeline(){
	c_SpineTranslateTimeline.call(this);
	this.implments={c_SpineTimeline:1};
}
c_SpineScaleTimeline.prototype=extend_class(c_SpineTranslateTimeline);
c_SpineScaleTimeline.m_new=function(t_frameCount){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<327>";
	c_SpineTranslateTimeline.m_new.call(this,t_frameCount);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<328>";
	this.m_Frames=new_number_array(t_frameCount*3);
	pop_err();
	return this;
}
c_SpineScaleTimeline.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<325>";
	c_SpineTranslateTimeline.m_new2.call(this);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<325>";
	pop_err();
	return this;
}
c_SpineScaleTimeline.prototype.p_Apply=function(t_skeleton,t_lastTime,t_time,t_events,t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<332>";
	if(t_time<dbg_array(this.m_Frames,0)[dbg_index]){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<334>";
	var t_bone=dbg_array(dbg_object(t_skeleton).m_Bones,this.m_BoneIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<335>";
	if(t_time>=dbg_array(this.m_Frames,this.m_Frames.length-3)[dbg_index]){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<336>";
		dbg_object(t_bone).m_ScaleX+=(dbg_object(dbg_object(t_bone).m_Data).m_ScaleX-1.0+dbg_array(this.m_Frames,this.m_Frames.length-2)[dbg_index]-dbg_object(t_bone).m_ScaleX)*t_alpha;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<337>";
		dbg_object(t_bone).m_ScaleY+=(dbg_object(dbg_object(t_bone).m_Data).m_ScaleY-1.0+dbg_array(this.m_Frames,this.m_Frames.length-1)[dbg_index]-dbg_object(t_bone).m_ScaleY)*t_alpha;
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<342>";
	var t_frameIndex=c_SpineAnimation.m_BinarySearch(this.m_Frames,t_time,3);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<343>";
	var t_lastFrameX=dbg_array(this.m_Frames,t_frameIndex-2)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<344>";
	var t_lastFrameY=dbg_array(this.m_Frames,t_frameIndex-1)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<345>";
	var t_frameTime=dbg_array(this.m_Frames,t_frameIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<346>";
	var t_percent=1.0-(t_time-t_frameTime)/(dbg_array(this.m_Frames,t_frameIndex+-3)[dbg_index]-t_frameTime);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<347>";
	t_percent=this.p_GetCurvePercent(((t_frameIndex/3)|0)-1,bb_math_Max2(0.0,bb_math_Min2(1.0,t_percent)));
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<349>";
	dbg_object(t_bone).m_ScaleX+=(dbg_object(dbg_object(t_bone).m_Data).m_ScaleX-1.0+t_lastFrameX+(dbg_array(this.m_Frames,t_frameIndex+1)[dbg_index]-t_lastFrameX)*t_percent-dbg_object(t_bone).m_ScaleX)*t_alpha;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<350>";
	dbg_object(t_bone).m_ScaleY+=(dbg_object(dbg_object(t_bone).m_Data).m_ScaleY-1.0+t_lastFrameY+(dbg_array(this.m_Frames,t_frameIndex+2)[dbg_index]-t_lastFrameY)*t_percent-dbg_object(t_bone).m_ScaleY)*t_alpha;
	pop_err();
}
function c_SpineIkConstraintTimeline(){
	c_SpineCurveTimeline.call(this);
	this.m_Frames=[];
	this.m_IkConstraintIndex=0;
	this.implments={c_SpineTimeline:1};
}
c_SpineIkConstraintTimeline.prototype=extend_class(c_SpineCurveTimeline);
c_SpineIkConstraintTimeline.m_new=function(t_frameCount){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<663>";
	c_SpineCurveTimeline.m_new.call(this,t_frameCount);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<664>";
	this.m_Frames=new_number_array(t_frameCount*3);
	pop_err();
	return this;
}
c_SpineIkConstraintTimeline.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<652>";
	c_SpineCurveTimeline.m_new.call(this,0);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<652>";
	pop_err();
	return this;
}
c_SpineIkConstraintTimeline.prototype.p_SetFrame5=function(t_frameIndex,t_time,t_mix,t_bendDirection){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<669>";
	t_frameIndex*=3;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<670>";
	dbg_array(this.m_Frames,t_frameIndex)[dbg_index]=t_time;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<671>";
	dbg_array(this.m_Frames,t_frameIndex+1)[dbg_index]=t_mix;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<672>";
	dbg_array(this.m_Frames,t_frameIndex+2)[dbg_index]=(t_bendDirection);
	pop_err();
}
c_SpineIkConstraintTimeline.prototype.p_Apply=function(t_skeleton,t_lastTime,t_time,t_firedEvents,t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<676>";
	if(t_time<dbg_array(this.m_Frames,0)[dbg_index]){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<678>";
	var t_ikConstraint=dbg_array(dbg_object(t_skeleton).m_IkConstraints,this.m_IkConstraintIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<680>";
	if(t_time>=dbg_array(this.m_Frames,this.m_Frames.length-3)[dbg_index]){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<681>";
		dbg_object(t_ikConstraint).m_Mix+=(dbg_array(this.m_Frames,this.m_Frames.length-2)[dbg_index]-dbg_object(t_ikConstraint).m_Mix)*t_alpha;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<682>";
		dbg_object(t_ikConstraint).m_BendDirection=((dbg_array(this.m_Frames,this.m_Frames.length-1)[dbg_index])|0);
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<687>";
	var t_frameIndex=c_SpineAnimation.m_BinarySearch(this.m_Frames,t_time,3);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<688>";
	var t_prevFrameMix=dbg_array(this.m_Frames,t_frameIndex-2)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<689>";
	var t_frameTime=dbg_array(this.m_Frames,t_frameIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<690>";
	var t_percent=1.0-(t_time-t_frameTime)/(dbg_array(this.m_Frames,t_frameIndex+-3)[dbg_index]-t_frameTime);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<691>";
	t_percent=this.p_GetCurvePercent(((t_frameIndex/3)|0)-1,bb_math_Max2(0.0,bb_math_Min2(1.0,t_percent)));
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<693>";
	var t_mix=t_prevFrameMix+(dbg_array(this.m_Frames,t_frameIndex+1)[dbg_index]-t_prevFrameMix)*t_percent;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<694>";
	dbg_object(t_ikConstraint).m_Mix+=(t_mix-dbg_object(t_ikConstraint).m_Mix)*t_alpha;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<695>";
	dbg_object(t_ikConstraint).m_BendDirection=((dbg_array(this.m_Frames,t_frameIndex+2)[dbg_index])|0);
	pop_err();
}
function c_SpineFFDTimeline(){
	c_SpineCurveTimeline.call(this);
	this.m_Frames=[];
	this.m_FrameVertices=[];
	this.m_SlotIndex=0;
	this.m_Attachment=null;
	this.implments={c_SpineTimeline:1};
}
c_SpineFFDTimeline.prototype=extend_class(c_SpineCurveTimeline);
c_SpineFFDTimeline.m_new=function(t_frameCount){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<582>";
	c_SpineCurveTimeline.m_new.call(this,t_frameCount);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<583>";
	this.m_Frames=new_number_array(t_frameCount);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<584>";
	this.m_FrameVertices=new_array_array(t_frameCount);
	pop_err();
	return this;
}
c_SpineFFDTimeline.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<575>";
	c_SpineCurveTimeline.m_new.call(this,0);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<575>";
	pop_err();
	return this;
}
c_SpineFFDTimeline.prototype.p_SetFrame6=function(t_frameIndex,t_time,t_vertices){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<589>";
	dbg_array(this.m_Frames,t_frameIndex)[dbg_index]=t_time;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<590>";
	dbg_array(this.m_FrameVertices,t_frameIndex)[dbg_index]=t_vertices;
	pop_err();
}
c_SpineFFDTimeline.prototype.p_Apply=function(t_skeleton,t_lastTime,t_time,t_firedEvents,t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<594>";
	var t_slot=dbg_array(dbg_object(t_skeleton).m_Slots,this.m_SlotIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<595>";
	if(t_slot.p_Attachment()!=this.m_Attachment){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<597>";
	if(t_time<dbg_array(this.m_Frames,0)[dbg_index]){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<598>";
		dbg_object(t_slot).m_AttachmentVerticesCount=0;
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<602>";
	var t_vertexCount=dbg_array(this.m_FrameVertices,0)[dbg_index].length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<604>";
	var t_vertices=dbg_object(t_slot).m_AttachmentVertices;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<605>";
	if(t_vertices.length!=t_vertexCount){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<605>";
		t_alpha=1.0;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<606>";
	if(t_vertices.length<t_vertexCount){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<607>";
		t_vertices=new_number_array(t_vertexCount);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<608>";
		dbg_object(t_slot).m_AttachmentVertices=t_vertices;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<610>";
	dbg_object(t_slot).m_AttachmentVerticesCount=t_vertexCount;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<612>";
	var t_i=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<613>";
	if(t_time>=dbg_array(this.m_Frames,this.m_Frames.length-1)[dbg_index]){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<614>";
		var t_lastVertices=dbg_array(this.m_FrameVertices,this.m_Frames.length-1)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<615>";
		if(t_alpha<1.0){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<616>";
			for(t_i=0;t_i<t_vertexCount;t_i=t_i+1){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<617>";
				dbg_array(t_vertices,t_i)[dbg_index]+=(dbg_array(t_lastVertices,t_i)[dbg_index]-dbg_array(t_vertices,t_i)[dbg_index])*t_alpha;
			}
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<621>";
			for(t_i=0;t_i<t_vertexCount;t_i=t_i+1){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<622>";
				dbg_array(t_vertices,t_i)[dbg_index]=dbg_array(t_lastVertices,t_i)[dbg_index];
			}
		}
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<629>";
	var t_frameIndex=c_SpineAnimation.m_BinarySearch2(this.m_Frames,t_time);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<630>";
	var t_frameTime=dbg_array(this.m_Frames,t_frameIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<631>";
	var t_percent=1.0-(t_time-t_frameTime)/(dbg_array(this.m_Frames,t_frameIndex-1)[dbg_index]-t_frameTime);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<632>";
	t_percent=this.p_GetCurvePercent(t_frameIndex-1,bb_math_Max2(0.0,bb_math_Min2(1.0,t_percent)));
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<634>";
	var t_prevVertices=dbg_array(this.m_FrameVertices,t_frameIndex-1)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<635>";
	var t_nextVertices=dbg_array(this.m_FrameVertices,t_frameIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<637>";
	var t_prev=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<638>";
	if(t_alpha<1.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<639>";
		for(t_i=0;t_i<t_vertexCount;t_i=t_i+1){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<640>";
			t_prev=dbg_array(t_prevVertices,t_i)[dbg_index];
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<641>";
			dbg_array(t_vertices,t_i)[dbg_index]+=(t_prev+(dbg_array(t_nextVertices,t_i)[dbg_index]-t_prev)*t_percent-dbg_array(t_vertices,t_i)[dbg_index])*t_alpha;
		}
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<644>";
		for(t_i=0;t_i<t_vertexCount;t_i=t_i+1){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<645>";
			t_prev=dbg_array(t_prevVertices,t_i)[dbg_index];
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<646>";
			dbg_array(t_vertices,t_i)[dbg_index]=t_prev+(dbg_array(t_nextVertices,t_i)[dbg_index]-t_prev)*t_percent;
		}
	}
	pop_err();
}
function c_SpineDrawOrderTimeline(){
	Object.call(this);
	this.m_Frames=[];
	this.m_DrawOrders=[];
	this.implments={c_SpineTimeline:1};
}
c_SpineDrawOrderTimeline.m_new=function(t_frameCount){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<534>";
	this.m_Frames=new_number_array(t_frameCount);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<535>";
	this.m_DrawOrders=new_array_array(t_frameCount);
	pop_err();
	return this;
}
c_SpineDrawOrderTimeline.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<529>";
	pop_err();
	return this;
}
c_SpineDrawOrderTimeline.prototype.p_SetFrame7=function(t_frameIndex,t_time,t_drawOrder){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<544>";
	dbg_array(this.m_Frames,t_frameIndex)[dbg_index]=t_time;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<545>";
	dbg_array(this.m_DrawOrders,t_frameIndex)[dbg_index]=t_drawOrder;
	pop_err();
}
c_SpineDrawOrderTimeline.prototype.p_FrameCount=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<539>";
	var t_=this.m_Frames.length;
	pop_err();
	return t_;
}
c_SpineDrawOrderTimeline.prototype.p_Apply=function(t_skeleton,t_lastTime,t_time,t_events,t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<549>";
	if(t_time<dbg_array(this.m_Frames,0)[dbg_index]){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<551>";
	var t_frameIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<552>";
	if(t_time>=dbg_array(this.m_Frames,this.m_Frames.length-1)[dbg_index]){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<553>";
		t_frameIndex=this.m_Frames.length-1;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<555>";
		t_frameIndex=c_SpineAnimation.m_BinarySearch2(this.m_Frames,t_time)-1;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<558>";
	var t_drawOrder=dbg_object(t_skeleton).m_DrawOrder;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<559>";
	var t_slots=dbg_object(t_skeleton).m_Slots;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<561>";
	var t_drawOrderToSetupIndex=dbg_array(this.m_DrawOrders,t_frameIndex)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<562>";
	if(t_drawOrderToSetupIndex.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<563>";
		for(var t_i=0;t_i<t_drawOrder.length;t_i=t_i+1){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<564>";
			dbg_array(t_drawOrder,t_i)[dbg_index]=dbg_array(t_slots,t_i)[dbg_index];
		}
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<567>";
		var t_n=t_drawOrderToSetupIndex.length;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<568>";
		for(var t_i2=0;t_i2<t_n;t_i2=t_i2+1){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<569>";
			dbg_array(t_drawOrder,t_i2)[dbg_index]=dbg_array(t_slots,dbg_array(t_drawOrderToSetupIndex,t_i2)[dbg_index])[dbg_index];
		}
	}
	pop_err();
}
function c_SpineEvent(){
	Object.call(this);
	this.m_Data=null;
	this.m_IntValue=0;
	this.m_FloatValue=.0;
	this.m_StringValue="";
}
c_SpineEvent.m_new=function(t_data){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineevent.monkey<13>";
	dbg_object(this).m_Data=t_data;
	pop_err();
	return this;
}
c_SpineEvent.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineevent.monkey<6>";
	pop_err();
	return this;
}
function c_SpineEventTimeline(){
	Object.call(this);
	this.m_Frames=[];
	this.m_Events=[];
	this.implments={c_SpineTimeline:1};
}
c_SpineEventTimeline.m_new=function(t_frameCount){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<482>";
	this.m_Frames=new_number_array(t_frameCount);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<483>";
	this.m_Events=new_object_array(t_frameCount);
	pop_err();
	return this;
}
c_SpineEventTimeline.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<477>";
	pop_err();
	return this;
}
c_SpineEventTimeline.prototype.p_SetFrame8=function(t_frameIndex,t_time,t_event){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<492>";
	dbg_array(this.m_Frames,t_frameIndex)[dbg_index]=t_time;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<493>";
	dbg_array(this.m_Events,t_frameIndex)[dbg_index]=t_event;
	pop_err();
}
c_SpineEventTimeline.prototype.p_FrameCount=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<487>";
	var t_=this.m_Frames.length;
	pop_err();
	return t_;
}
c_SpineEventTimeline.prototype.p_Apply=function(t_skeleton,t_lastTime,t_time,t_firedEvents,t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<498>";
	if(t_firedEvents==null){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<499>";
	var t_frameCount=this.m_Frames.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<501>";
	if(t_lastTime>t_time){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<502>";
		this.p_Apply(t_skeleton,t_lastTime,999999999.0,t_firedEvents,t_alpha);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<503>";
		t_lastTime=-1.0;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<504>";
		if(t_lastTime>=dbg_array(this.m_Frames,t_frameCount-1)[dbg_index]){
			pop_err();
			return;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<508>";
	if(t_time<dbg_array(this.m_Frames,0)[dbg_index]){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<510>";
	var t_frameIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<511>";
	if(t_lastTime<dbg_array(this.m_Frames,0)[dbg_index]){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<512>";
		t_frameIndex=0;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<514>";
		t_frameIndex=c_SpineAnimation.m_BinarySearch2(this.m_Frames,t_lastTime);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<515>";
		var t_frame=dbg_array(this.m_Frames,t_frameIndex)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<516>";
		while(t_frameIndex>0){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<517>";
			if(dbg_array(this.m_Frames,t_frameIndex-1)[dbg_index]!=t_frame){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<517>";
				break;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<518>";
			t_frameIndex-=1;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<522>";
	while(t_frameIndex<t_frameCount && t_time>=dbg_array(this.m_Frames,t_frameIndex)[dbg_index]){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<523>";
		t_firedEvents.p_AddLast2(dbg_array(this.m_Events,t_frameIndex)[dbg_index]);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<524>";
		t_frameIndex+=1;
	}
	pop_err();
}
function c_SpineAnimation(){
	Object.call(this);
	this.m_Name="";
	this.m_Timelines=[];
	this.m_Duration=.0;
}
c_SpineAnimation.m_new=function(t_name,t_timelines,t_duration){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<12>";
	if(t_name.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<12>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"name cannot be empty.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<13>";
	if(t_timelines.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<13>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"timelines cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<14>";
	this.m_Name=t_name;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<15>";
	this.m_Timelines=t_timelines;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<16>";
	this.m_Duration=t_duration;
	pop_err();
	return this;
}
c_SpineAnimation.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<6>";
	pop_err();
	return this;
}
c_SpineAnimation.prototype.p_Apply2=function(t_skeleton,t_lastTime,t_time,t_events,t_loop){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<21>";
	if(t_skeleton==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<21>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"skeleton cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<25>";
	if(t_loop && this.m_Duration!=0.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<26>";
		t_time=t_time % this.m_Duration;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<27>";
		t_lastTime=t_lastTime % this.m_Duration;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<31>";
	for(var t_i=0;t_i<this.m_Timelines.length;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<32>";
		dbg_array(this.m_Timelines,t_i)[dbg_index].p_Apply(t_skeleton,t_lastTime,t_time,t_events,1.0);
	}
	pop_err();
}
c_SpineAnimation.prototype.p_Mix=function(t_skeleton,t_lastTime,t_time,t_loop,t_events,t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<39>";
	if(t_skeleton==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<39>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"skeleton cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<41>";
	if(t_loop && this.m_Duration!=0.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<42>";
		t_time=t_time % this.m_Duration;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<43>";
		t_lastTime=t_lastTime % this.m_Duration;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<46>";
	for(var t_i=0;t_i<this.m_Timelines.length;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<47>";
		dbg_array(this.m_Timelines,t_i)[dbg_index].p_Apply(t_skeleton,t_lastTime,t_time,t_events,t_alpha);
	}
	pop_err();
}
c_SpineAnimation.prototype.p_Mix2=function(t_skeleton,t_time,t_loop,t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<52>";
	this.p_Mix(t_skeleton,999999999.0,t_time,t_loop,null,t_alpha);
	pop_err();
}
c_SpineAnimation.m_BinarySearch=function(t_values,t_target,t_theStep){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<58>";
	var t_low=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<59>";
	var t_high=((t_values.length/t_theStep)|0)-2;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<60>";
	if(t_high==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<60>";
		pop_err();
		return t_theStep;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<61>";
	var t_current=t_high>>1;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<62>";
	while(true){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<63>";
		if(dbg_array(t_values,(t_current+1)*t_theStep)[dbg_index]<=t_target){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<64>";
			t_low=t_current+1;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<66>";
			t_high=t_current;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<69>";
		if(t_low==t_high){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<69>";
			var t_=(t_low+1)*t_theStep;
			pop_err();
			return t_;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<70>";
		t_current=t_low+t_high>>1;
	}
}
c_SpineAnimation.m_BinarySearch2=function(t_values,t_target){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<75>";
	var t_low=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<76>";
	var t_high=t_values.length-2;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<77>";
	if(t_high==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<77>";
		pop_err();
		return 1;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<78>";
	var t_current=t_high>>1;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<79>";
	while(true){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<80>";
		if(dbg_array(t_values,t_current+1)[dbg_index]<=t_target){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<81>";
			t_low=t_current+1;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<83>";
			t_high=t_current;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<86>";
		if(t_low==t_high){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<86>";
			var t_=t_low+1;
			pop_err();
			return t_;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineanimation.monkey<87>";
		t_current=t_low+t_high>>1;
	}
}
function c_SpineSkeleton(){
	Object.call(this);
	this.m_Data=null;
	this.m_Bones=[];
	this.m_Slots=[];
	this.m_DrawOrder=[];
	this.m_Time=.0;
	this.m_Skin=null;
	this.m_IkConstraints=[];
	this.m_boneCache=[];
	this.m_FlipX=false;
	this.m_FlipY=false;
	this.m_A=1.0;
	this.m_X=.0;
	this.m_Y=.0;
	this.m_R=1.0;
	this.m_G=1.0;
	this.m_B=1.0;
}
c_SpineSkeleton.prototype.p_GetAttachment=function(t_slotIndex,t_attachmentName){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<425>";
	if(t_attachmentName.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<425>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"attachmentName cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<426>";
	if(this.m_Skin!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<427>";
		var t_attachment=this.m_Skin.p_GetAttachment(t_slotIndex,t_attachmentName);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<428>";
		if(t_attachment!=null){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<428>";
			pop_err();
			return t_attachment;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<430>";
	if(dbg_object(this.m_Data).m_DefaultSkin!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<430>";
		var t_=dbg_object(this.m_Data).m_DefaultSkin.p_GetAttachment(t_slotIndex,t_attachmentName);
		pop_err();
		return t_;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<431>";
	pop_err();
	return null;
}
c_SpineSkeleton.prototype.p_GetAttachment2=function(t_slotName,t_attachmentName){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<421>";
	var t_=this.p_GetAttachment(this.m_Data.p_FindSlotIndex(t_slotName),t_attachmentName);
	pop_err();
	return t_;
}
c_SpineSkeleton.prototype.p_FindBone=function(t_boneName){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<356>";
	if(t_boneName.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<356>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"boneName cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<357>";
	var t_n=this.m_Bones.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<358>";
	for(var t_i=0;t_i<t_n;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<359>";
		if(dbg_object(dbg_object(dbg_array(this.m_Bones,t_i)[dbg_index]).m_Data).m_Name==t_boneName){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<359>";
			pop_err();
			return dbg_array(this.m_Bones,t_i)[dbg_index];
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<361>";
	pop_err();
	return null;
}
c_SpineSkeleton.prototype.p_UpdateCache=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<104>";
	var t_i=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<105>";
	var t_ii=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<106>";
	var t_parent=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<107>";
	var t_child=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<108>";
	var t_ikContraint=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<109>";
	var t_current=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<110>";
	var t_break=false;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<111>";
	var t_ikConstraintsCount=this.m_IkConstraints.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<112>";
	var t_boneCacheCount=t_ikConstraintsCount+1;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<113>";
	var t_bonesCount=this.m_Bones.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<114>";
	var t_bone=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<117>";
	this.m_boneCache=new_array_array(t_boneCacheCount);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<118>";
	var t_boneCacheCounts=new_number_array(t_boneCacheCount);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<121>";
	for(t_i=0;t_i<t_bonesCount;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<122>";
		t_current=dbg_array(this.m_Bones,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<124>";
		t_break=false;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<125>";
		do{
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<126>";
			for(t_ii=0;t_ii<t_ikConstraintsCount;t_ii=t_ii+1){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<127>";
				t_ikContraint=dbg_array(this.m_IkConstraints,t_ii)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<128>";
				t_parent=dbg_array(dbg_object(t_ikContraint).m_Bones,0)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<129>";
				t_child=dbg_array(dbg_object(t_ikContraint).m_Bones,dbg_object(t_ikContraint).m_Bones.length-1)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<131>";
				do{
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<132>";
					if(t_current==t_child){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<133>";
						dbg_array(t_boneCacheCounts,t_ii)[dbg_index]+=1;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<134>";
						dbg_array(t_boneCacheCounts,t_ii+1)[dbg_index]+=1;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<137>";
						t_break=true;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<138>";
						break;
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<141>";
					if(t_child==t_parent){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<141>";
						break;
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<142>";
					t_child=dbg_object(t_child).m_Parent;
				}while(!(false));
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<146>";
				if(t_break){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<146>";
					break;
				}
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<150>";
			if(t_break){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<150>";
				break;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<152>";
			t_current=dbg_object(t_current).m_Parent;
		}while(!(t_current==null));
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<156>";
		if(t_break==false){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<157>";
			dbg_array(t_boneCacheCounts,0)[dbg_index]+=1;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<164>";
	for(t_i=0;t_i<t_boneCacheCount;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<165>";
		dbg_array(this.m_boneCache,t_i)[dbg_index]=new_object_array(dbg_array(t_boneCacheCounts,t_i)[dbg_index]);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<166>";
		dbg_array(t_boneCacheCounts,t_i)[dbg_index]=0;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<170>";
	for(t_i=0;t_i<t_bonesCount;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<171>";
		t_bone=dbg_array(this.m_Bones,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<172>";
		t_current=t_bone;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<174>";
		t_break=false;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<175>";
		do{
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<176>";
			for(t_ii=0;t_ii<t_ikConstraintsCount;t_ii=t_ii+1){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<177>";
				t_ikContraint=dbg_array(this.m_IkConstraints,t_ii)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<178>";
				t_parent=dbg_array(dbg_object(t_ikContraint).m_Bones,0)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<179>";
				t_child=dbg_array(dbg_object(t_ikContraint).m_Bones,dbg_object(t_ikContraint).m_Bones.length-1)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<181>";
				do{
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<182>";
					if(t_current==t_child){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<183>";
						dbg_array(dbg_array(this.m_boneCache,t_ii)[dbg_index],dbg_array(t_boneCacheCounts,t_ii)[dbg_index])[dbg_index]=t_bone;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<184>";
						dbg_array(t_boneCacheCounts,t_ii)[dbg_index]+=1;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<185>";
						dbg_array(dbg_array(this.m_boneCache,t_ii+1)[dbg_index],dbg_array(t_boneCacheCounts,t_ii+1)[dbg_index])[dbg_index]=t_bone;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<186>";
						dbg_array(t_boneCacheCounts,t_ii+1)[dbg_index]+=1;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<189>";
						t_break=true;
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<190>";
						break;
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<193>";
					if(t_child==t_parent){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<193>";
						break;
					}
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<194>";
					t_child=dbg_object(t_child).m_Parent;
				}while(!(false));
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<198>";
				if(t_break){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<198>";
					break;
				}
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<202>";
			if(t_break){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<202>";
				break;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<204>";
			t_current=dbg_object(t_current).m_Parent;
		}while(!(t_current==null));
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<208>";
		if(t_break==false){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<209>";
			dbg_array(dbg_array(this.m_boneCache,0)[dbg_index],dbg_array(t_boneCacheCounts,0)[dbg_index])[dbg_index]=t_bone;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<210>";
			dbg_array(t_boneCacheCounts,0)[dbg_index]+=1;
		}
	}
	pop_err();
}
c_SpineSkeleton.m_new=function(t_data){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<32>";
	if(t_data==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<32>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"data cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<33>";
	this.m_Data=t_data;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<35>";
	var t_addIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<36>";
	var t_index=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<37>";
	var t_indexOf=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<38>";
	var t_parent=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<39>";
	var t_boneData=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<40>";
	var t_bone=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<41>";
	var t_slot=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<42>";
	var t_ikConstraint=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<44>";
	t_addIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<45>";
	this.m_Bones=new_object_array(dbg_object(this.m_Data).m_Bones.length);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<46>";
	for(t_index=0;t_index<dbg_object(this.m_Data).m_Bones.length;t_index=t_index+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<48>";
		t_boneData=dbg_array(dbg_object(this.m_Data).m_Bones,t_index)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<49>";
		t_parent=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<50>";
		if((dbg_object(t_boneData).m_Parent)!=null){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<51>";
			for(t_indexOf=0;t_indexOf<dbg_object(this.m_Data).m_Bones.length;t_indexOf=t_indexOf+1){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<52>";
				if(dbg_array(dbg_object(this.m_Data).m_Bones,t_indexOf)[dbg_index]==dbg_object(t_boneData).m_Parent){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<53>";
					t_parent=dbg_array(this.m_Bones,t_indexOf)[dbg_index];
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<54>";
					break;
				}
			}
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<60>";
		dbg_array(this.m_Bones,t_addIndex)[dbg_index]=c_SpineBone.m_new.call(new c_SpineBone,t_boneData,this,t_parent);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<61>";
		dbg_object(dbg_array(this.m_Bones,t_addIndex)[dbg_index]).m_parentIndex=t_addIndex;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<63>";
		t_addIndex+=1;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<66>";
	t_addIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<67>";
	this.m_Slots=new_object_array(dbg_object(this.m_Data).m_Slots.length);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<68>";
	this.m_DrawOrder=new_object_array(dbg_object(this.m_Data).m_Slots.length);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<69>";
	for(t_index=0;t_index<dbg_object(this.m_Data).m_Slots.length;t_index=t_index+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<70>";
		t_bone=null;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<71>";
		for(t_indexOf=0;t_indexOf<dbg_object(this.m_Data).m_Bones.length;t_indexOf=t_indexOf+1){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<72>";
			if(dbg_array(dbg_object(this.m_Data).m_Bones,t_indexOf)[dbg_index]==dbg_object(dbg_array(dbg_object(this.m_Data).m_Slots,t_index)[dbg_index]).m_BoneData){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<73>";
				t_bone=dbg_array(this.m_Bones,t_indexOf)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<74>";
				break;
			}
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<79>";
		t_slot=c_SpineSlot.m_new.call(new c_SpineSlot,dbg_array(dbg_object(this.m_Data).m_Slots,t_index)[dbg_index],t_bone);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<80>";
		dbg_object(t_slot).m_parentIndex=t_addIndex;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<82>";
		dbg_array(this.m_Slots,t_addIndex)[dbg_index]=t_slot;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<83>";
		dbg_array(this.m_DrawOrder,t_addIndex)[dbg_index]=t_slot;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<84>";
		t_addIndex+=1;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<87>";
	t_addIndex=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<88>";
	this.m_IkConstraints=new_object_array(dbg_object(this.m_Data).m_IkConstraints.length);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<89>";
	for(t_index=0;t_index<dbg_object(this.m_Data).m_IkConstraints.length;t_index=t_index+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<90>";
		t_ikConstraint=c_SpineIkConstraint.m_new.call(new c_SpineIkConstraint,dbg_array(dbg_object(this.m_Data).m_IkConstraints,t_index)[dbg_index],this);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<91>";
		dbg_object(t_ikConstraint).m_parentIndex=t_addIndex;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<93>";
		dbg_array(this.m_IkConstraints,t_addIndex)[dbg_index]=t_ikConstraint;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<94>";
		t_addIndex+=1;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<97>";
	this.p_UpdateCache();
	pop_err();
	return this;
}
c_SpineSkeleton.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<6>";
	pop_err();
	return this;
}
c_SpineSkeleton.prototype.p_SetBonesToSetupPose=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<326>";
	var t_i=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<327>";
	var t_n=this.m_Bones.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<328>";
	var t_ikConstraint=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<330>";
	for(t_i=0;t_i<t_n;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<331>";
		dbg_array(this.m_Bones,t_i)[dbg_index].p_SetToSetupPose();
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<334>";
	t_n=this.m_IkConstraints.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<335>";
	for(t_i=0;t_i<t_n;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<336>";
		t_ikConstraint=dbg_array(this.m_IkConstraints,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<337>";
		dbg_object(t_ikConstraint).m_BendDirection=dbg_object(dbg_object(t_ikConstraint).m_Data).m_BendDirection;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<338>";
		dbg_object(t_ikConstraint).m_Mix=dbg_object(dbg_object(t_ikConstraint).m_Data).m_Mix;
	}
	pop_err();
}
c_SpineSkeleton.prototype.p_SetSlotsToSetupPose=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<343>";
	var t_i=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<344>";
	var t_n=this.m_Slots.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<346>";
	for(t_i=0;t_i<t_n;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<347>";
		dbg_array(this.m_DrawOrder,t_i)[dbg_index]=dbg_array(this.m_Slots,t_i)[dbg_index];
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<350>";
	for(t_i=0;t_i<t_n;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<351>";
		dbg_array(this.m_Slots,t_i)[dbg_index].p_SetToSetupPose2(t_i);
	}
	pop_err();
}
c_SpineSkeleton.prototype.p_SetToSetupPose=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<321>";
	this.p_SetBonesToSetupPose();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<322>";
	this.p_SetSlotsToSetupPose();
	pop_err();
}
c_SpineSkeleton.prototype.p_SetSkin=function(t_newSkin){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<398>";
	if(t_newSkin!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<399>";
		if(this.m_Skin!=null){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<400>";
			t_newSkin.p_AttachAll(this,this.m_Skin);
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<402>";
			var t_n=this.m_Slots.length;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<403>";
			var t_slot=null;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<404>";
			var t_name="";
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<405>";
			var t_attachment=null;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<407>";
			for(var t_i=0;t_i<t_n;t_i=t_i+1){
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<408>";
				t_slot=dbg_array(this.m_Slots,t_i)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<409>";
				t_name=dbg_object(dbg_object(t_slot).m_Data).m_AttachmentName;
				err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<410>";
				if((t_name.length)!=0){
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<411>";
					t_attachment=t_newSkin.p_GetAttachment(t_i,t_name);
					err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<412>";
					if((t_attachment)!=null){
						err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<412>";
						t_slot.p_Attachment2(t_attachment);
					}
				}
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<417>";
	this.m_Skin=t_newSkin;
	pop_err();
}
c_SpineSkeleton.prototype.p_SetSkin2=function(t_skinName){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<392>";
	var t_skin=this.m_Data.p_FindSkin(t_skinName);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<393>";
	if(t_skin==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<393>";
		throw c_SpineException.m_new.call(new c_SpineException,"Spine skin '"+t_skinName+"' not found");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<394>";
	this.p_SetSkin(t_skin);
	pop_err();
}
c_SpineSkeleton.prototype.p_RootBone=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<27>";
	if(this.m_Bones.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<27>";
		pop_err();
		return null;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<28>";
	pop_err();
	return dbg_array(this.m_Bones,0)[dbg_index];
}
c_SpineSkeleton.prototype.p_UpdateWorldTransform=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<287>";
	var t_i=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<288>";
	var t_ii=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<289>";
	var t_nn=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<290>";
	var t_bone=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<291>";
	var t_last=this.m_boneCache.length-1;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<292>";
	var t_updateBones=[];
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<294>";
	var t_total=this.m_Bones.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<295>";
	for(t_i=0;t_i<t_total;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<296>";
		t_bone=dbg_array(this.m_Bones,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<297>";
		dbg_object(t_bone).m_RotationIK=dbg_object(t_bone).m_Rotation;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<300>";
	t_i=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<301>";
	do{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<302>";
		t_updateBones=dbg_array(this.m_boneCache,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<303>";
		t_nn=t_updateBones.length;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<304>";
		for(t_ii=0;t_ii<t_nn;t_ii=t_ii+1){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<305>";
			dbg_array(t_updateBones,t_ii)[dbg_index].p_UpdateWorldTransform();
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<307>";
		if(t_i==t_last){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<307>";
			break;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<308>";
		dbg_array(this.m_IkConstraints,t_i)[dbg_index].p_Apply3();
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<309>";
		t_i+=1;
	}while(!(false));
	pop_err();
}
c_SpineSkeleton.prototype.p_Update=function(t_delta){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineskeleton.monkey<469>";
	this.m_Time+=t_delta;
	pop_err();
}
function c_SpineBone(){
	Object.call(this);
	this.m_Data=null;
	this.m_Skeleton=null;
	this.m_Parent=null;
	this.m_X=.0;
	this.m_Y=.0;
	this.m_Rotation=.0;
	this.m_RotationIK=.0;
	this.m_ScaleX=.0;
	this.m_ScaleY=.0;
	this.m_parentIndex=0;
	this.m_M00=.0;
	this.m_M01=.0;
	this.m_WorldX=.0;
	this.m_M10=.0;
	this.m_M11=.0;
	this.m_WorldY=.0;
	this.m_WorldScaleX=.0;
	this.m_WorldScaleY=.0;
	this.m_WorldRotation=.0;
}
c_SpineBone.prototype.p_SetToSetupPose=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<104>";
	var t_data=this.m_Data;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<105>";
	this.m_X=dbg_object(t_data).m_X;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<106>";
	this.m_Y=dbg_object(t_data).m_Y;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<107>";
	this.m_Rotation=dbg_object(t_data).m_Rotation;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<108>";
	this.m_RotationIK=this.m_Rotation;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<109>";
	this.m_ScaleX=dbg_object(t_data).m_ScaleX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<110>";
	this.m_ScaleY=dbg_object(t_data).m_ScaleY;
	pop_err();
}
c_SpineBone.m_new=function(t_data,t_skeleton,t_parent){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<34>";
	if(t_data==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<34>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"data cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<35>";
	if(t_skeleton==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<35>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"skeleton cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<36>";
	this.m_Data=t_data;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<37>";
	this.m_Skeleton=t_skeleton;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<38>";
	this.m_Parent=t_parent;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<39>";
	this.p_SetToSetupPose();
	pop_err();
	return this;
}
c_SpineBone.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<6>";
	pop_err();
	return this;
}
c_SpineBone.prototype.p_UpdateWorldTransform=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<45>";
	if(this.m_Parent!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<46>";
		this.m_WorldX=this.m_X*dbg_object(this.m_Parent).m_M00+this.m_Y*dbg_object(this.m_Parent).m_M01+dbg_object(this.m_Parent).m_WorldX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<47>";
		this.m_WorldY=this.m_X*dbg_object(this.m_Parent).m_M10+this.m_Y*dbg_object(this.m_Parent).m_M11+dbg_object(this.m_Parent).m_WorldY;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<48>";
		if(dbg_object(this.m_Data).m_InheritScale){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<50>";
			this.m_WorldScaleX=this.m_ScaleX*dbg_object(this.m_Parent).m_WorldScaleX;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<51>";
			this.m_WorldScaleY=this.m_ScaleY*dbg_object(this.m_Parent).m_WorldScaleY;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<53>";
			this.m_WorldScaleX=this.m_ScaleX;
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<54>";
			this.m_WorldScaleY=this.m_ScaleY;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<57>";
		if(dbg_object(this.m_Data).m_InheritRotation){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<58>";
			this.m_WorldRotation=dbg_object(this.m_Parent).m_WorldRotation+this.m_RotationIK;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<60>";
			this.m_WorldRotation=this.m_RotationIK;
		}
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<67>";
		this.m_WorldX=this.m_X;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<71>";
		this.m_WorldY=this.m_Y;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<76>";
		this.m_WorldScaleX=this.m_ScaleX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<77>";
		this.m_WorldScaleY=this.m_ScaleY;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<79>";
		this.m_WorldRotation=this.m_RotationIK;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<82>";
	var t_cos=Math.cos((this.m_WorldRotation)*D2R);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<83>";
	var t_sin=Math.sin((this.m_WorldRotation)*D2R);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<85>";
	if(dbg_object(this.m_Skeleton).m_FlipX){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<86>";
		this.m_M00=-t_cos*this.m_WorldScaleX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<87>";
		this.m_M01=t_sin*this.m_WorldScaleY;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<89>";
		this.m_M00=t_cos*this.m_WorldScaleX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<90>";
		this.m_M01=-t_sin*this.m_WorldScaleY;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<93>";
	if(dbg_object(this.m_Skeleton).m_FlipY!=true){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<94>";
		this.m_M10=-t_sin*this.m_WorldScaleX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<95>";
		this.m_M11=-t_cos*this.m_WorldScaleY;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<97>";
		this.m_M10=t_sin*this.m_WorldScaleX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<98>";
		this.m_M11=t_cos*this.m_WorldScaleY;
	}
	pop_err();
}
c_SpineBone.prototype.p_WorldToLocal=function(t_worldX,t_worldY,t_out){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<114>";
	var t_dx=t_worldX-this.m_WorldX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<115>";
	var t_dy=t_worldY-this.m_WorldY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<116>";
	var t_m00=this.m_M00;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<117>";
	var t_m10=this.m_M10;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<118>";
	var t_m01=this.m_M01;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<119>";
	var t_m11=this.m_M11;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<121>";
	if(dbg_object(this.m_Skeleton).m_FlipX!=(dbg_object(this.m_Skeleton).m_FlipY!=true)){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<122>";
		t_m00=t_m00*-1.0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<123>";
		t_m11=t_m11*-1.0;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<126>";
	var t_invDet=1.0/(t_m00*t_m11-t_m01*t_m10);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<127>";
	dbg_array(t_out,0)[dbg_index]=t_dx*t_m00*t_invDet-t_dy*t_m01*t_invDet;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<128>";
	dbg_array(t_out,1)[dbg_index]=t_dy*t_m11*t_invDet-t_dx*t_m10*t_invDet;
	pop_err();
}
c_SpineBone.prototype.p_LocalToWorld=function(t_localX,t_localY,t_out){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<132>";
	dbg_array(t_out,0)[dbg_index]=t_localX*this.m_M00+t_localY*this.m_M01+this.m_WorldX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spinebone.monkey<133>";
	dbg_array(t_out,1)[dbg_index]=t_localX*this.m_M10+t_localY*this.m_M11+this.m_WorldY;
	pop_err();
}
function c_SpineSlot(){
	Object.call(this);
	this.m_Data=null;
	this.m_Bone=null;
	this.m_R=.0;
	this.m_G=.0;
	this.m_B=.0;
	this.m_A=.0;
	this.m_attachment=null;
	this.m_attachmentTime=.0;
	this.m_AttachmentVerticesCount=0;
	this.m_parentIndex=0;
	this.m_AttachmentVertices=[];
}
c_SpineSlot.prototype.p_Attachment=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<30>";
	pop_err();
	return this.m_attachment;
}
c_SpineSlot.prototype.p_Attachment2=function(t_attachment){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<34>";
	dbg_object(this).m_attachment=t_attachment;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<35>";
	this.m_attachmentTime=dbg_object(dbg_object(this.m_Bone).m_Skeleton).m_Time;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<36>";
	this.m_AttachmentVerticesCount=0;
	pop_err();
}
c_SpineSlot.prototype.p_SetToSetupPose2=function(t_slotIndex){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<56>";
	this.m_R=dbg_object(this.m_Data).m_R;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<57>";
	this.m_G=dbg_object(this.m_Data).m_G;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<58>";
	this.m_B=dbg_object(this.m_Data).m_B;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<59>";
	this.m_A=dbg_object(this.m_Data).m_A;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<60>";
	if(dbg_object(this.m_Data).m_AttachmentName.length==0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<61>";
		this.p_Attachment2(null);
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<63>";
		this.p_Attachment2(dbg_object(this.m_Bone).m_Skeleton.p_GetAttachment(t_slotIndex,dbg_object(this.m_Data).m_AttachmentName));
	}
	pop_err();
}
c_SpineSlot.prototype.p_SetToSetupPose=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<68>";
	var t_slots=dbg_object(dbg_object(dbg_object(this.m_Bone).m_Skeleton).m_Data).m_Slots;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<69>";
	var t_length=t_slots.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<70>";
	for(var t_indexOf=0;t_indexOf<t_length;t_indexOf=t_indexOf+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<71>";
		if(dbg_array(t_slots,t_indexOf)[dbg_index]==this.m_Data){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<72>";
			this.p_SetToSetupPose2(t_indexOf);
			pop_err();
			return;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<76>";
	this.p_SetToSetupPose2(-1);
	pop_err();
}
c_SpineSlot.m_new=function(t_data,t_bone){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<48>";
	if(t_data==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<48>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"data cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<49>";
	if(t_bone==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<49>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"bone cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<50>";
	this.m_Data=t_data;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<51>";
	this.m_Bone=t_bone;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<52>";
	this.p_SetToSetupPose();
	pop_err();
	return this;
}
c_SpineSlot.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineslot.monkey<6>";
	pop_err();
	return this;
}
function c_SpineIkConstraint(){
	Object.call(this);
	this.m_Data=null;
	this.m_Mix=1.0;
	this.m_BendDirection=1;
	this.m_Bones=[];
	this.m_Target=null;
	this.m_parentIndex=0;
}
c_SpineIkConstraint.m_new=function(t_data,t_skeleton){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<18>";
	this.m_Data=t_data;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<19>";
	this.m_Mix=dbg_object(t_data).m_Mix;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<20>";
	this.m_BendDirection=dbg_object(t_data).m_BendDirection;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<22>";
	this.m_Bones=new_object_array(dbg_object(t_data).m_Bones.length);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<23>";
	var t_boneData=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<24>";
	for(var t_i=0;t_i<dbg_object(t_data).m_Bones.length;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<25>";
		t_boneData=dbg_array(dbg_object(t_data).m_Bones,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<26>";
		dbg_array(this.m_Bones,t_i)[dbg_index]=t_skeleton.p_FindBone(dbg_object(t_boneData).m_Name);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<27>";
		this.m_Target=t_skeleton.p_FindBone(dbg_object(dbg_object(t_data).m_Target).m_Name);
	}
	pop_err();
	return this;
}
c_SpineIkConstraint.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<6>";
	pop_err();
	return this;
}
c_SpineIkConstraint.m_Apply=function(t_bone,t_targetX,t_targetY,t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<48>";
	var t_parentRotation=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<49>";
	if(!dbg_object(dbg_object(t_bone).m_Data).m_InheritRotation || dbg_object(t_bone).m_Parent==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<50>";
		t_parentRotation=0.0;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<52>";
		t_parentRotation=dbg_object(dbg_object(t_bone).m_Parent).m_WorldRotation;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<54>";
	var t_rotation=dbg_object(t_bone).m_Rotation;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<56>";
	var t_rotationIK=(Math.atan2(t_targetY-dbg_object(t_bone).m_WorldY,t_targetX-dbg_object(t_bone).m_WorldX)*R2D)-t_parentRotation;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<57>";
	dbg_object(t_bone).m_RotationIK=t_rotation+(t_rotationIK-t_rotation)*t_alpha;
	pop_err();
}
c_SpineIkConstraint.m_Apply2=function(t_parent,t_child,t_targetX,t_targetY,t_bendDirection,t_alpha){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<65>";
	var t_childRotation=dbg_object(t_child).m_Rotation;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<66>";
	var t_parentRotation=dbg_object(t_parent).m_Rotation;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<67>";
	if(t_alpha==0.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<68>";
		dbg_object(t_child).m_RotationIK=t_childRotation;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<69>";
		dbg_object(t_parent).m_RotationIK=t_parentRotation;
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<73>";
	var t_positionXY=new_number_array(2);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<74>";
	var t_parentParent=dbg_object(t_parent).m_Parent;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<75>";
	if((t_parentParent)!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<76>";
		t_parentParent.p_WorldToLocal(t_targetX,t_targetY,t_positionXY);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<77>";
		t_targetX=(dbg_array(t_positionXY,0)[dbg_index]-dbg_object(t_parent).m_X)*dbg_object(t_parentParent).m_WorldScaleX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<78>";
		t_targetY=(dbg_array(t_positionXY,1)[dbg_index]-dbg_object(t_parent).m_Y)*dbg_object(t_parentParent).m_WorldScaleY;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<80>";
		t_targetX-=dbg_object(t_parent).m_X;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<81>";
		t_targetY-=dbg_object(t_parent).m_Y;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<84>";
	if(dbg_object(t_child).m_Parent==t_parent){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<85>";
		dbg_array(t_positionXY,0)[dbg_index]=dbg_object(t_child).m_X;
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<86>";
		dbg_array(t_positionXY,1)[dbg_index]=dbg_object(t_child).m_Y;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<88>";
		dbg_object(t_child).m_Parent.p_LocalToWorld(dbg_object(t_child).m_X,dbg_object(t_child).m_Y,t_positionXY);
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<89>";
		t_parent.p_WorldToLocal(dbg_array(t_positionXY,0)[dbg_index],dbg_array(t_positionXY,1)[dbg_index],t_positionXY);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<92>";
	var t_childX=dbg_array(t_positionXY,0)[dbg_index]*dbg_object(t_parent).m_WorldScaleX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<93>";
	var t_childY=dbg_array(t_positionXY,1)[dbg_index]*dbg_object(t_parent).m_WorldScaleY;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<94>";
	var t_offset=(Math.atan2(t_childY,t_childX)*R2D);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<95>";
	var t_len1=Math.sqrt(t_childX*t_childX+t_childY*t_childY);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<96>";
	var t_len2=dbg_object(dbg_object(t_child).m_Data).m_Length*dbg_object(t_child).m_WorldScaleX;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<99>";
	var t_cosDenom=2.0*t_len1*t_len2;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<100>";
	if(t_cosDenom<0.0001){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<102>";
		dbg_object(t_child).m_RotationIK=t_childRotation+((Math.atan2(t_targetY,t_targetX)*R2D)-t_parentRotation-t_childRotation)*t_alpha;
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<105>";
	var t_cos=(t_targetX*t_targetX+t_targetY*t_targetY-t_len1*t_len1-t_len2*t_len2)/t_cosDenom;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<106>";
	if(t_cos<-1.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<107>";
		t_cos=-1.0;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<108>";
		if(t_cos>1.0){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<109>";
			t_cos=1.0;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<112>";
	var t_childAngle=(Math.acos(t_cos)*R2D)*(t_bendDirection);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<113>";
	var t_adjacent=t_len1+t_len2*t_cos;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<114>";
	var t_opposite=t_len2*Math.sin((t_childAngle)*D2R);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<115>";
	var t_parentAngle=(Math.atan2(t_targetY*t_adjacent-t_targetX*t_opposite,t_targetX*t_adjacent+t_targetY*t_opposite)*R2D);
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<117>";
	var t_rotation=t_parentAngle-t_offset-t_parentRotation;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<118>";
	if(t_rotation>180.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<119>";
		t_rotation-=360.0;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<120>";
		if(t_rotation<-180.0){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<121>";
			t_rotation+=360.0;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<123>";
	dbg_object(t_parent).m_RotationIK=t_parentRotation+t_rotation*t_alpha;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<125>";
	t_rotation=t_childAngle+t_offset-t_childRotation;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<126>";
	if(t_rotation>180.0){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<127>";
		t_rotation-=360.0;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<128>";
		if(t_rotation<-180.0){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<129>";
			t_rotation+=360.0;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<131>";
	dbg_object(t_child).m_RotationIK=t_childRotation+(t_rotation+dbg_object(t_parent).m_WorldRotation-dbg_object(dbg_object(t_child).m_Parent).m_WorldRotation)*t_alpha;
	pop_err();
}
c_SpineIkConstraint.prototype.p_Apply3=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<33>";
	var t_1=this.m_Bones.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<34>";
	if(t_1==1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<35>";
		c_SpineIkConstraint.m_Apply(dbg_array(this.m_Bones,0)[dbg_index],dbg_object(this.m_Target).m_WorldX,dbg_object(this.m_Target).m_WorldY,this.m_Mix);
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<36>";
		if(t_1==2){
			err_info="C:/MonkeyX_Projects/MODULES/spine/lib/spineikconstraint.monkey<37>";
			c_SpineIkConstraint.m_Apply2(dbg_array(this.m_Bones,0)[dbg_index],dbg_array(this.m_Bones,1)[dbg_index],dbg_object(this.m_Target).m_WorldX,dbg_object(this.m_Target).m_WorldY,this.m_BendDirection,this.m_Mix);
		}
	}
	pop_err();
}
function bb_spinemojo_LoadMojoSpineEntity(t_skeletonPath){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojo.monkey<36>";
	var t_atlasDir=bb_filepath_ExtractDir(t_skeletonPath);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojo.monkey<37>";
	var t_atlasPath=t_atlasDir+"/"+bb_filepath_StripAll(t_skeletonPath)+".atlas";
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojo.monkey<38>";
	var t_=c_SpineEntity.m_new.call(new c_SpineEntity,t_skeletonPath,t_atlasPath,t_atlasDir,bb_spinemojo_spineMojoFileLoader,bb_spinemojo_spineMojoAtlasLoader,bb_spinemojo_spineMojoTextureLoader);
	pop_err();
	return t_;
}
function bb_spinemojo_LoadMojoSpineEntity2(t_skeletonPath,t_atlasPath){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojo.monkey<43>";
	var t_atlasDir=bb_filepath_ExtractDir(t_skeletonPath);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojo.monkey<44>";
	var t_=c_SpineEntity.m_new.call(new c_SpineEntity,t_skeletonPath,t_atlasPath,t_atlasDir,bb_spinemojo_spineMojoFileLoader,bb_spinemojo_spineMojoAtlasLoader,bb_spinemojo_spineMojoTextureLoader);
	pop_err();
	return t_;
}
function bb_spinemojo_LoadMojoSpineEntity3(t_skeletonPath,t_atlasPath,t_atlasDir){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojo.monkey<49>";
	var t_=c_SpineEntity.m_new.call(new c_SpineEntity,t_skeletonPath,t_atlasPath,t_atlasDir,bb_spinemojo_spineMojoFileLoader,bb_spinemojo_spineMojoAtlasLoader,bb_spinemojo_spineMojoTextureLoader);
	pop_err();
	return t_;
}
var bb_LeGeo_spineDragon=null;
function c_List2(){
	Object.call(this);
	this.m__head=(c_HeadNode2.m_new.call(new c_HeadNode2));
}
c_List2.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_List2.prototype.p_AddLast2=function(t_data){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<108>";
	var t_=c_Node5.m_new.call(new c_Node5,this.m__head,dbg_object(this.m__head).m__pred,t_data);
	pop_err();
	return t_;
}
c_List2.m_new2=function(t_data){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<13>";
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[dbg_index];
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<14>";
		this.p_AddLast2(t_t);
	}
	pop_err();
	return this;
}
c_List2.prototype.p_IsEmpty=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<50>";
	var t_=dbg_object(this.m__head).m__succ==this.m__head;
	pop_err();
	return t_;
}
c_List2.prototype.p_FirstNode=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<62>";
	if(dbg_object(this.m__head).m__succ!=this.m__head){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<62>";
		pop_err();
		return dbg_object(this.m__head).m__succ;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<63>";
	pop_err();
	return null;
}
c_List2.prototype.p_Clear=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<36>";
	dbg_object(this.m__head).m__succ=this.m__head;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<37>";
	dbg_object(this.m__head).m__pred=this.m__head;
	pop_err();
	return 0;
}
function c_Node5(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node5.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<261>";
	this.m__succ=t_succ;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<262>";
	this.m__pred=t_pred;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<263>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<264>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<265>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node5.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<258>";
	pop_err();
	return this;
}
c_Node5.prototype.p_Value=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<269>";
	pop_err();
	return this.m__data;
}
c_Node5.prototype.p_GetNode=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<301>";
	pop_err();
	return this;
}
c_Node5.prototype.p_NextNode=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<282>";
	if(dbg_object(this.m__succ).m__pred!=this){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<282>";
		error("Illegal operation on removed node");
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<284>";
	var t_=this.m__succ.p_GetNode();
	pop_err();
	return t_;
}
function c_HeadNode2(){
	c_Node5.call(this);
}
c_HeadNode2.prototype=extend_class(c_Node5);
c_HeadNode2.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<310>";
	c_Node5.m_new2.call(this);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<311>";
	this.m__succ=(this);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<312>";
	this.m__pred=(this);
	pop_err();
	return this;
}
c_HeadNode2.prototype.p_GetNode=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/list.monkey<316>";
	pop_err();
	return null;
}
function c_MapKeys2(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys2.m_new=function(t_map){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<503>";
	dbg_object(this).m_map=t_map;
	pop_err();
	return this;
}
c_MapKeys2.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<500>";
	pop_err();
	return this;
}
c_MapKeys2.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<507>";
	var t_=c_KeyEnumerator2.m_new.call(new c_KeyEnumerator2,this.m_map.p_FirstNode());
	pop_err();
	return t_;
}
function c_KeyEnumerator2(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator2.m_new=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<459>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_KeyEnumerator2.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<456>";
	pop_err();
	return this;
}
c_KeyEnumerator2.prototype.p_HasNext=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<463>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_KeyEnumerator2.prototype.p_NextObject=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<467>";
	var t_t=this.m_node;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<468>";
	this.m_node=this.m_node.p_NextNode();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<469>";
	pop_err();
	return dbg_object(t_t).m_key;
}
var bb_LeGeo_spineTest=null;
function bb_graphics_DebugRenderDevice(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<53>";
	if(!((bb_graphics_renderDevice)!=null)){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<53>";
		error("Rendering operations can only be performed inside OnRender");
	}
	pop_err();
	return 0;
}
function bb_graphics_Cls(t_r,t_g,t_b){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<378>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<380>";
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	pop_err();
	return 0;
}
var bb_LeGeo_mapsx=0;
var bb_LeGeo_mapsy=0;
var bb_LeGeo_map=[];
var bb_LeGeo_mapy=0;
var bb_LeGeo_mapx=0;
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<452>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<453>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<453>";
		error("Invalid image frame");
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<456>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<458>";
	bb_graphics_context.p_Validate();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<460>";
	if((dbg_object(t_image).m_flags&65536)!=0){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<461>";
		bb_graphics_renderDevice.DrawSurface(dbg_object(t_image).m_surface,t_x-dbg_object(t_image).m_tx,t_y-dbg_object(t_image).m_ty);
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<463>";
		bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,t_x-dbg_object(t_image).m_tx,t_y-dbg_object(t_image).m_ty,dbg_object(t_f).m_x,dbg_object(t_f).m_y,dbg_object(t_image).m_width,dbg_object(t_image).m_height);
	}
	pop_err();
	return 0;
}
function bb_graphics_PushMatrix(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<333>";
	var t_sp=dbg_object(bb_graphics_context).m_matrixSp;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<334>";
	if(t_sp==dbg_object(bb_graphics_context).m_matrixStack.length){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<334>";
		dbg_object(bb_graphics_context).m_matrixStack=resize_number_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp*2);
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<335>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+0)[dbg_index]=dbg_object(bb_graphics_context).m_ix;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<336>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+1)[dbg_index]=dbg_object(bb_graphics_context).m_iy;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<337>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+2)[dbg_index]=dbg_object(bb_graphics_context).m_jx;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<338>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+3)[dbg_index]=dbg_object(bb_graphics_context).m_jy;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<339>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+4)[dbg_index]=dbg_object(bb_graphics_context).m_tx;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<340>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+5)[dbg_index]=dbg_object(bb_graphics_context).m_ty;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<341>";
	dbg_object(bb_graphics_context).m_matrixSp=t_sp+6;
	pop_err();
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<355>";
	var t_ix2=t_ix*dbg_object(bb_graphics_context).m_ix+t_iy*dbg_object(bb_graphics_context).m_jx;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<356>";
	var t_iy2=t_ix*dbg_object(bb_graphics_context).m_iy+t_iy*dbg_object(bb_graphics_context).m_jy;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<357>";
	var t_jx2=t_jx*dbg_object(bb_graphics_context).m_ix+t_jy*dbg_object(bb_graphics_context).m_jx;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<358>";
	var t_jy2=t_jx*dbg_object(bb_graphics_context).m_iy+t_jy*dbg_object(bb_graphics_context).m_jy;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<359>";
	var t_tx2=t_tx*dbg_object(bb_graphics_context).m_ix+t_ty*dbg_object(bb_graphics_context).m_jx+dbg_object(bb_graphics_context).m_tx;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<360>";
	var t_ty2=t_tx*dbg_object(bb_graphics_context).m_iy+t_ty*dbg_object(bb_graphics_context).m_jy+dbg_object(bb_graphics_context).m_ty;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<361>";
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	pop_err();
	return 0;
}
function bb_graphics_Transform2(t_m){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<351>";
	bb_graphics_Transform(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<365>";
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	pop_err();
	return 0;
}
function bb_graphics_Rotate(t_angle){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<373>";
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	pop_err();
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<369>";
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	pop_err();
	return 0;
}
function bb_graphics_PopMatrix(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<345>";
	var t_sp=dbg_object(bb_graphics_context).m_matrixSp-6;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<346>";
	bb_graphics_SetMatrix(dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+0)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+1)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+2)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+3)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+4)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+5)[dbg_index]);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<347>";
	dbg_object(bb_graphics_context).m_matrixSp=t_sp;
	pop_err();
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<470>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<471>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<471>";
		error("Invalid image frame");
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<474>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<476>";
	bb_graphics_PushMatrix();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<478>";
	bb_graphics_Translate(t_x,t_y);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<479>";
	bb_graphics_Rotate(t_rotation);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<480>";
	bb_graphics_Scale(t_scaleX,t_scaleY);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<482>";
	bb_graphics_Translate(-dbg_object(t_image).m_tx,-dbg_object(t_image).m_ty);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<484>";
	bb_graphics_context.p_Validate();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<486>";
	if((dbg_object(t_image).m_flags&65536)!=0){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<487>";
		bb_graphics_renderDevice.DrawSurface(dbg_object(t_image).m_surface,0.0,0.0);
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<489>";
		bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,0.0,0.0,dbg_object(t_f).m_x,dbg_object(t_f).m_y,dbg_object(t_image).m_width,dbg_object(t_image).m_height);
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<492>";
	bb_graphics_PopMatrix();
	pop_err();
	return 0;
}
function bb_LeGeo_drawmap(){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<666>";
	var t_visDragon=0;
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<667>";
	for(var t_y=0;t_y<=14;t_y=t_y+1){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<668>";
		for(var t_x=0;t_x<=20;t_x=t_x+1){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<669>";
			var t_x1=t_x*32+bb_LeGeo_mapsx-32;
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<670>";
			var t_y1=t_y*32+bb_LeGeo_mapsy;
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<671>";
			var t_imgNum=dbg_array(dbg_array(bb_LeGeo_map,t_y+bb_LeGeo_mapy)[dbg_index],t_x+bb_LeGeo_mapx)[dbg_index];
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<678>";
			var t_2=t_imgNum;
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<697>";
			if(t_2==187){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<698>";
				bb_LeGeo_spineDragon.p_SetPosition((t_x1),(t_y1));
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<716>";
				t_visDragon=1;
			}
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<718>";
			bb_graphics_DrawImage(bb_LeGeo_imgWorld,(t_x1),(t_y1),t_imgNum);
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<721>";
	if(t_visDragon==1){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<722>";
		t_visDragon=0;
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<723>";
		bb_LeGeo_spineDragon.p_SetAlpha(1.0);
	}else{
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<725>";
		bb_LeGeo_spineDragon.p_SetAlpha(0.0);
	}
	pop_err();
}
function c_player(){
	Object.call(this);
	this.m_LastKey=-1;
	this.m_x=96.0;
	this.m_y=192.0;
	this.m_w=32;
	this.m_h=32;
	this.m_jumpofvine=false;
	this.m_jumpofvinetimeout=0;
	this.m_facing=0;
	this.m_isjumping=false;
	this.m_incy=0.0;
}
c_player.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<334>";
	pop_err();
	return this;
}
c_player.prototype.p_draw=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<541>";
	if(this.m_LastKey==39){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<542>";
		bb_LeGeo_spineTest.p_SetPosition(this.m_x+40.0,this.m_y-240.0);
	}else{
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<543>";
		if(this.m_LastKey==37){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<544>";
			bb_LeGeo_spineTest.p_SetPosition(this.m_x+40.0,this.m_y-240.0);
		}else{
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<546>";
			bb_LeGeo_spineTest.p_SetPosition(this.m_x+20.0,this.m_y-240.0);
		}
	}
	pop_err();
	return 0;
}
c_player.prototype.p_regularmode=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<433>";
	if(this.m_jumpofvine==true){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<434>";
		if(bb_app_Millisecs()>this.m_jumpofvinetimeout){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<434>";
			this.m_jumpofvine=false;
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<437>";
	if((bb_input_KeyDown(39))!=0){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<438>";
		for(var t_i=0;t_i<4;t_i=t_i+1){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<439>";
			if(bb_LeGeo_ptc(1,0)==false){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<440>";
				this.m_x=this.m_x+1.0;
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<441>";
				this.m_facing=1;
			}else{
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<443>";
				if(bb_audio_ChannelState(0)==0){
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<444>";
					bb_audio_PlaySound(bb_LeGeo_sndHitBlock,0,0);
				}
			}
		}
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<448>";
		if(this.m_LastKey!=39){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<449>";
			bb_LeGeo_spineTest.p_SetFlip(false,false);
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<450>";
			bb_LeGeo_spineTest.p_SetAnimation2("walk",true);
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<451>";
			this.m_LastKey=39;
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<452>";
			print("Right");
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<455>";
	if((bb_input_KeyDown(37))!=0){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<456>";
		for(var t_i2=0;t_i2<4;t_i2=t_i2+1){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<457>";
			if(bb_LeGeo_ptc(-1,0)==false){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<458>";
				this.m_x=this.m_x-1.0;
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<459>";
				this.m_facing=0;
			}else{
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<461>";
				if(bb_audio_ChannelState(0)==0){
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<462>";
					bb_audio_PlaySound(bb_LeGeo_sndHitBlock,0,0);
				}
			}
		}
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<467>";
		if(this.m_LastKey!=37){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<468>";
			bb_LeGeo_spineTest.p_SetFlip(true,false);
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<469>";
			bb_LeGeo_spineTest.p_SetAnimation2("walk",true);
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<470>";
			this.m_LastKey=37;
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<471>";
			print("Right");
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<475>";
	if(bb_input_KeyDown(39)==0 && bb_input_KeyDown(37)==0){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<476>";
		if(this.m_LastKey!=0){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<477>";
			bb_LeGeo_spineTest.p_SetAnimation2("stand",true);
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<478>";
			this.m_LastKey=0;
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<485>";
	if((bb_input_KeyDown(13))!=0){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<486>";
		bb_LeGeo_spineTest.p_SetAnimation2("shoot",true);
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<492>";
	if(this.m_isjumping==false){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<493>";
		if(bb_LeGeo_ptc(0,1)==false){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<494>";
			this.m_isjumping=true;
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<496>";
			this.m_incy=0.0;
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<500>";
	if((bb_input_KeyDown(32))!=0){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<501>";
		if(this.m_isjumping==false){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<502>";
			this.m_isjumping=true;
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<503>";
			this.m_incy=-4.0;
		}
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<506>";
		bb_audio_PlaySound(bb_LeGeo_sndJump,0,0);
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<509>";
	if(this.m_isjumping==true){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<510>";
		if(this.m_incy>=0.0){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<511>";
			if(this.m_incy<4.0){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<511>";
				this.m_incy+=0.1;
			}
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<512>";
			for(var t_i3=0;(t_i3)<this.m_incy;t_i3=t_i3+1){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<513>";
				if(bb_LeGeo_ptc(0,1)==false){
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<514>";
					this.m_y=this.m_y+1.0;
				}else{
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<516>";
					this.m_isjumping=false;
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<517>";
					if(bb_audio_ChannelState(0)==0){
						err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<518>";
						bb_audio_PlaySound(bb_LeGeo_sndHitBlock,0,0);
					}
				}
			}
		}
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<523>";
		if(this.m_incy<0.0){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<524>";
			this.m_incy+=.1;
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<525>";
			for(var t_i4=0;(t_i4)<bb_math_Abs2(this.m_incy);t_i4=t_i4+1){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<526>";
				if(bb_LeGeo_ptc(0,-1)==false){
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<527>";
					this.m_y=this.m_y-1.0;
				}else{
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<529>";
					this.m_incy=0.0;
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<530>";
					if(bb_audio_ChannelState(0)==0){
						err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<531>";
						bb_audio_PlaySound(bb_LeGeo_sndHitBlock,0,0);
					}
				}
			}
		}
	}
	pop_err();
	return 0;
}
c_player.prototype.p_vinemode=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<356>";
	this.m_isjumping=false;
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<357>";
	this.m_incy=0.0;
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<358>";
	if((bb_input_KeyDown(32))!=0){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<359>";
		this.m_jumpofvine=true;
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<360>";
		this.m_jumpofvinetimeout=bb_app_Millisecs()+1000;
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<361>";
		this.m_isjumping=true;
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<362>";
		this.m_incy=-4.0;
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<363>";
		bb_audio_PlaySound(bb_LeGeo_sndJump,0,0);
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<365>";
	if((bb_input_KeyDown(38))!=0){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<366>";
		for(var t_i=0;t_i<4;t_i=t_i+1){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<367>";
			if(bb_LeGeo_pvc(0,0)==true && bb_LeGeo_ptc(0,-1)==false){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<368>";
				this.m_y=this.m_y-1.0;
			}else{
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<371>";
				if(bb_audio_ChannelState(0)==0){
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<372>";
					bb_audio_PlaySound(bb_LeGeo_sndHitBlock,0,0);
				}
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<377>";
	if((bb_input_KeyDown(40))!=0){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<378>";
		for(var t_i2=0;t_i2<4;t_i2=t_i2+1){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<379>";
			if(bb_LeGeo_pvc(0,0)==true && bb_LeGeo_ptc(0,1)==false){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<380>";
				this.m_y=this.m_y+1.0;
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<387>";
	if((bb_input_KeyDown(37))!=0){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<388>";
		for(var t_i3=0;t_i3<4;t_i3=t_i3+1){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<389>";
			if(bb_LeGeo_pvc(0,0)==true && bb_LeGeo_ptc(-1,0)==false){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<390>";
				this.m_x=this.m_x-1.0;
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<391>";
				this.m_facing=0;
			}else{
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<393>";
				if(bb_audio_ChannelState(0)==0){
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<394>";
					bb_audio_PlaySound(bb_LeGeo_sndHitBlock,0,0);
				}
			}
		}
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<398>";
		if(this.m_LastKey!=37){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<399>";
			bb_LeGeo_spineTest.p_SetFlip(true,false);
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<400>";
			bb_LeGeo_spineTest.p_SetAnimation2("walk",true);
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<401>";
			this.m_LastKey=37;
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<402>";
			print("LEFT VINEMODE");
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<405>";
	if((bb_input_KeyDown(39))!=0){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<406>";
		for(var t_i4=0;t_i4<4;t_i4=t_i4+1){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<407>";
			if(bb_LeGeo_pvc(0,0)==true && bb_LeGeo_ptc(1,0)==false){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<408>";
				this.m_x=this.m_x+1.0;
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<409>";
				this.m_facing=1;
			}else{
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<411>";
				if(bb_audio_ChannelState(0)==0){
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<412>";
					bb_audio_PlaySound(bb_LeGeo_sndHitBlock,0,0);
				}
			}
		}
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<416>";
		if(this.m_LastKey!=39){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<417>";
			bb_LeGeo_spineTest.p_SetFlip(false,false);
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<418>";
			bb_LeGeo_spineTest.p_SetAnimation2("walk",true);
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<419>";
			this.m_LastKey=39;
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<420>";
			print("Right VINEMODE");
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<424>";
	if(bb_input_KeyDown(39)==0 && bb_input_KeyDown(37)==0){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<425>";
		if(this.m_LastKey!=0){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<426>";
			bb_LeGeo_spineTest.p_SetAnimation2("stand",true);
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<427>";
			this.m_LastKey=0;
		}
	}
	pop_err();
	return 0;
}
c_player.prototype.p_update=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<347>";
	if(bb_LeGeo_pvc(0,0)==false || this.m_jumpofvine==true){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<347>";
		this.p_regularmode();
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<348>";
	if(bb_LeGeo_pvc(0,0)==true){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<349>";
		if(this.m_jumpofvine==false){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<350>";
			this.p_vinemode();
		}
	}
	pop_err();
	return 0;
}
var bb_LeGeo_p=null;
function bb_spinefunctions_SpineGetPolyBounding(t_poly,t_out,t_total){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<363>";
	if(t_total==-1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<363>";
		t_total=t_poly.length;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<364>";
	if(t_total<6){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<366>";
		dbg_array(t_out,0)[dbg_index]=0.0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<367>";
		dbg_array(t_out,1)[dbg_index]=0.0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<368>";
		dbg_array(t_out,2)[dbg_index]=0.0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<369>";
		dbg_array(t_out,3)[dbg_index]=0.0;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<373>";
		var t_minX=999999999.0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<374>";
		var t_minY=999999999.0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<375>";
		var t_maxX=-999999999.0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<376>";
		var t_maxY=-999999999.0;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<379>";
		for(var t_index=0;t_index<t_total;t_index=t_index+2){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<380>";
			if(dbg_array(t_poly,t_index)[dbg_index]<t_minX){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<380>";
				t_minX=dbg_array(t_poly,t_index)[dbg_index];
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<381>";
			if(dbg_array(t_poly,t_index)[dbg_index]>t_maxX){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<381>";
				t_maxX=dbg_array(t_poly,t_index)[dbg_index];
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<382>";
			if(dbg_array(t_poly,t_index+1)[dbg_index]<t_minY){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<382>";
				t_minY=dbg_array(t_poly,t_index+1)[dbg_index];
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<383>";
			if(dbg_array(t_poly,t_index+1)[dbg_index]>t_maxY){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<383>";
				t_maxY=dbg_array(t_poly,t_index+1)[dbg_index];
			}
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<387>";
		dbg_array(t_out,0)[dbg_index]=t_minX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<388>";
		dbg_array(t_out,1)[dbg_index]=t_minY;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<389>";
		dbg_array(t_out,2)[dbg_index]=t_maxX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<390>";
		dbg_array(t_out,3)[dbg_index]=t_minY;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<391>";
		dbg_array(t_out,4)[dbg_index]=t_maxX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<392>";
		dbg_array(t_out,5)[dbg_index]=t_maxY;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<393>";
		dbg_array(t_out,6)[dbg_index]=t_minX;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<394>";
		dbg_array(t_out,7)[dbg_index]=t_maxY;
	}
	pop_err();
}
function bb_graphics_DrawLine(t_x1,t_y1,t_x2,t_y2){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<401>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<403>";
	bb_graphics_context.p_Validate();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<404>";
	bb_graphics_renderDevice.DrawLine(t_x1,t_y1,t_x2,t_y2);
	pop_err();
	return 0;
}
function bb_graphics_DrawPoint(t_x,t_y){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<385>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<387>";
	bb_graphics_context.p_Validate();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<388>";
	bb_graphics_renderDevice.DrawPoint(t_x,t_y);
	pop_err();
	return 0;
}
function bb_spinefunctions_SpineDrawLinePoly(t_vertices,t_total,t_snapToPixels){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<409>";
	if(t_total==-1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<409>";
		t_total=t_vertices.length;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<412>";
	if(t_total<2){
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<415>";
	if(t_total<4){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<416>";
		bb_graphics_DrawPoint(dbg_array(t_vertices,0)[dbg_index],dbg_array(t_vertices,1)[dbg_index]);
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<421>";
	if(t_total<6){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<422>";
		if(t_snapToPixels){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<423>";
			bb_graphics_DrawLine(((dbg_array(t_vertices,0)[dbg_index])|0),((dbg_array(t_vertices,1)[dbg_index])|0),((dbg_array(t_vertices,2)[dbg_index])|0),((dbg_array(t_vertices,3)[dbg_index])|0));
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<425>";
			bb_graphics_DrawLine(dbg_array(t_vertices,0)[dbg_index],dbg_array(t_vertices,1)[dbg_index],dbg_array(t_vertices,2)[dbg_index],dbg_array(t_vertices,3)[dbg_index]);
		}
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<431>";
	if(t_total<8){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<432>";
		if(t_snapToPixels){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<433>";
			bb_graphics_DrawLine(((dbg_array(t_vertices,0)[dbg_index])|0),((dbg_array(t_vertices,1)[dbg_index])|0),((dbg_array(t_vertices,2)[dbg_index])|0),((dbg_array(t_vertices,3)[dbg_index])|0));
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<434>";
			bb_graphics_DrawLine(((dbg_array(t_vertices,2)[dbg_index])|0),((dbg_array(t_vertices,3)[dbg_index])|0),((dbg_array(t_vertices,4)[dbg_index])|0),((dbg_array(t_vertices,5)[dbg_index])|0));
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<436>";
			bb_graphics_DrawLine(dbg_array(t_vertices,0)[dbg_index],dbg_array(t_vertices,1)[dbg_index],dbg_array(t_vertices,2)[dbg_index],dbg_array(t_vertices,3)[dbg_index]);
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<437>";
			bb_graphics_DrawLine(dbg_array(t_vertices,2)[dbg_index],dbg_array(t_vertices,3)[dbg_index],dbg_array(t_vertices,4)[dbg_index],dbg_array(t_vertices,5)[dbg_index]);
		}
		pop_err();
		return;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<443>";
	var t_lastX=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<444>";
	var t_lastY=.0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<445>";
	if(t_snapToPixels){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<446>";
		for(var t_index=2;t_index<t_total;t_index=t_index+2){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<447>";
			t_lastX=((dbg_array(t_vertices,t_index)[dbg_index])|0);
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<448>";
			t_lastY=((dbg_array(t_vertices,t_index+1)[dbg_index])|0);
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<449>";
			bb_graphics_DrawLine(((dbg_array(t_vertices,t_index-2)[dbg_index])|0),((dbg_array(t_vertices,t_index-1)[dbg_index])|0),t_lastX,t_lastY);
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<451>";
		bb_graphics_DrawLine(t_lastX,t_lastY,((dbg_array(t_vertices,0)[dbg_index])|0),((dbg_array(t_vertices,1)[dbg_index])|0));
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<453>";
		for(var t_index2=2;t_index2<t_total;t_index2=t_index2+2){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<454>";
			t_lastX=dbg_array(t_vertices,t_index2)[dbg_index];
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<455>";
			t_lastY=dbg_array(t_vertices,t_index2+1)[dbg_index];
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<456>";
			bb_graphics_DrawLine(dbg_array(t_vertices,t_index2-2)[dbg_index],dbg_array(t_vertices,t_index2-1)[dbg_index],t_lastX,t_lastY);
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<458>";
		bb_graphics_DrawLine(t_lastX,t_lastY,dbg_array(t_vertices,0)[dbg_index],dbg_array(t_vertices,1)[dbg_index]);
	}
	pop_err();
}
function bb_input_KeyHit(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/input.monkey<44>";
	var t_=bb_input_device.p_KeyHit(t_key);
	pop_err();
	return t_;
}
function bb_input_MouseX(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/input.monkey<58>";
	var t_=bb_input_device.p_MouseX();
	pop_err();
	return t_;
}
function bb_input_MouseY(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/input.monkey<62>";
	var t_=bb_input_device.p_MouseY();
	pop_err();
	return t_;
}
function bb_spinefunctions_SpinePointInRect(t_pointX,t_pointY,t_rectX,t_rectY,t_rectWidth,t_rectHeight){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<221>";
	var t_=t_pointX>=t_rectX && t_pointX<t_rectX+t_rectWidth && t_pointY>=t_rectY && t_pointY<t_rectY+t_rectHeight;
	pop_err();
	return t_;
}
function bb_spinefunctions_SpinePointInRect2(t_pointX,t_pointY,t_vertices){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<227>";
	var t_=t_pointX>=dbg_array(t_vertices,0)[dbg_index] && t_pointX<=dbg_array(t_vertices,4)[dbg_index] && t_pointY>=dbg_array(t_vertices,1)[dbg_index] && t_pointY<=dbg_array(t_vertices,5)[dbg_index];
	pop_err();
	return t_;
}
function bb_spinefunctions_SpineGetQuad(t_axisX,t_axisY,t_vertX,t_vertY){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<172>";
	if(t_vertX<t_axisX){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<173>";
		if(t_vertY<t_axisY){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<174>";
			pop_err();
			return 1;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<176>";
			pop_err();
			return 4;
		}
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<179>";
		if(t_vertY<t_axisY){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<180>";
			pop_err();
			return 2;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<182>";
			pop_err();
			return 3;
		}
	}
}
function bb_math_Abs(t_x){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<46>";
	if(t_x>=0){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<46>";
		pop_err();
		return t_x;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<47>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function bb_math_Abs2(t_x){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<73>";
	if(t_x>=0.0){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<73>";
		pop_err();
		return t_x;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/math.monkey<74>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function bb_spinefunctions_SpinePointInPoly(t_pointX,t_pointY,t_xy,t_xyLength){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<246>";
	if(t_xyLength==-1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<246>";
		t_xyLength=t_xy.length;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<247>";
	if(t_xyLength<6 || ((t_xyLength&1)!=0)){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<247>";
		pop_err();
		return false;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<249>";
	var t_x1=dbg_array(t_xy,t_xyLength-2)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<250>";
	var t_y1=dbg_array(t_xy,t_xyLength-1)[dbg_index];
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<251>";
	var t_curQuad=bb_spinefunctions_SpineGetQuad(t_pointX,t_pointY,t_x1,t_y1);
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<252>";
	var t_nextQuad=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<253>";
	var t_total=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<255>";
	for(var t_i=0;t_i<t_xyLength;t_i=t_i+2){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<256>";
		var t_x2=dbg_array(t_xy,t_i)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<257>";
		var t_y2=dbg_array(t_xy,t_i+1)[dbg_index];
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<258>";
		t_nextQuad=bb_spinefunctions_SpineGetQuad(t_pointX,t_pointY,t_x2,t_y2);
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<259>";
		var t_diff=t_nextQuad-t_curQuad;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<261>";
		var t_1=t_diff;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<262>";
		if(t_1==2 || t_1==-2){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<263>";
			if(t_x2-(t_y2-t_pointY)*(t_x1-t_x2)/(t_y1-t_y2)<t_pointX){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<264>";
				t_diff=-t_diff;
			}
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<266>";
			if(t_1==3){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<267>";
				t_diff=-1;
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<268>";
				if(t_1==-3){
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<269>";
					t_diff=1;
				}
			}
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<272>";
		t_total+=t_diff;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<273>";
		t_curQuad=t_nextQuad;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<274>";
		t_x1=t_x2;
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<275>";
		t_y1=t_y2;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<278>";
	if(bb_math_Abs(t_total)==4){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<279>";
		pop_err();
		return true;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinefunctions.monkey<282>";
	pop_err();
	return false;
}
var bb_LeGeo_Ladder=0;
function bb_LeGeo_rectsoverlap(t_x1,t_y1,t_w1,t_h1,t_x2,t_y2,t_w2,t_h2){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<732>";
	if(t_x1>=t_x2+t_w2 || t_x1+t_w1<=t_x2){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<732>";
		pop_err();
		return false;
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<733>";
	if(t_y1>=t_y2+t_h2 || t_y1+t_h1<=t_y2){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<733>";
		pop_err();
		return false;
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<734>";
	pop_err();
	return true;
}
function bb_LeGeo_pvc(t_offsetx,t_offsety){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<622>";
	var t_cx=(((dbg_object(bb_LeGeo_p).m_x+(t_offsetx))/32.0+(bb_LeGeo_mapx))|0);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<623>";
	var t_cy=(((dbg_object(bb_LeGeo_p).m_y+(t_offsety))/32.0+(bb_LeGeo_mapy))|0);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<624>";
	for(var t_y2=t_cy-1;t_y2<t_cy+4;t_y2=t_y2+1){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<625>";
		for(var t_x2=t_cx-1;t_x2<t_cx+4;t_x2=t_x2+1){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<626>";
			if(t_x2>=0 && t_x2<150 && t_y2>=0 && t_y2<30){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<627>";
				if(dbg_array(dbg_array(bb_LeGeo_map,t_y2)[dbg_index],t_x2)[dbg_index]==bb_LeGeo_Ladder){
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<628>";
					var t_x3=(t_x2-bb_LeGeo_mapx)*32-32+bb_LeGeo_mapsx;
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<629>";
					var t_y3=(t_y2-bb_LeGeo_mapy)*32+bb_LeGeo_mapsy;
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<630>";
					if(bb_LeGeo_rectsoverlap(((dbg_object(bb_LeGeo_p).m_x+(t_offsetx))|0),((dbg_object(bb_LeGeo_p).m_y+(t_offsety))|0),dbg_object(bb_LeGeo_p).m_w,dbg_object(bb_LeGeo_p).m_h,t_x3,t_y3,32,32)==true){
						err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<631>";
						pop_err();
						return true;
					}
				}
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<637>";
	pop_err();
	return false;
}
function bb_input_KeyDown(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/input.monkey<40>";
	var t_=((bb_input_device.p_KeyDown(t_key))?1:0);
	pop_err();
	return t_;
}
var bb_LeGeo_SolidWall=0;
function bb_LeGeo_ptc(t_offsetx,t_offsety){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<645>";
	var t_cx=(((dbg_object(bb_LeGeo_p).m_x+(t_offsetx))/32.0+(bb_LeGeo_mapx))|0);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<646>";
	var t_cy=(((dbg_object(bb_LeGeo_p).m_y+(t_offsety))/32.0+(bb_LeGeo_mapy))|0);
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<647>";
	for(var t_y2=t_cy-1;t_y2<t_cy+4;t_y2=t_y2+1){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<648>";
		for(var t_x2=t_cx-1;t_x2<t_cx+4;t_x2=t_x2+1){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<649>";
			if(t_x2>=0 && t_x2<150 && t_y2>=0 && t_y2<30){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<650>";
				if(dbg_array(dbg_array(bb_LeGeo_map,t_y2)[dbg_index],t_x2)[dbg_index]==bb_LeGeo_SolidWall){
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<651>";
					var t_x3=(t_x2-bb_LeGeo_mapx)*32-32+bb_LeGeo_mapsx;
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<652>";
					var t_y3=(t_y2-bb_LeGeo_mapy)*32+bb_LeGeo_mapsy;
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<653>";
					if(bb_LeGeo_rectsoverlap(((dbg_object(bb_LeGeo_p).m_x+(t_offsetx))|0),((dbg_object(bb_LeGeo_p).m_y+(t_offsety))|0),dbg_object(bb_LeGeo_p).m_w,dbg_object(bb_LeGeo_p).m_h,t_x3,t_y3,32,32)==true){
						err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<654>";
						pop_err();
						return true;
					}
				}
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<661>";
	pop_err();
	return false;
}
function bb_audio_ChannelState(t_channel){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/audio.monkey<69>";
	var t_=bb_audio_device.ChannelState(t_channel);
	pop_err();
	return t_;
}
function bb_audio_PlaySound(t_sound,t_channel,t_flags){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/audio.monkey<53>";
	if(((t_sound)!=null) && ((dbg_object(t_sound).m_sample)!=null)){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/audio.monkey<53>";
		bb_audio_device.PlaySample(dbg_object(t_sound).m_sample,t_channel,t_flags);
	}
	pop_err();
	return 0;
}
function bb_LeGeo_alignmap(){
	push_err();
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<565>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<566>";
		if(dbg_object(bb_LeGeo_p).m_x>((bb_app_DeviceWidth()/2)|0)){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<567>";
			if(bb_LeGeo_mapx+20<149){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<568>";
				bb_LeGeo_mapsx-=1;
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<569>";
				if(bb_LeGeo_mapsx<0){
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<570>";
					bb_LeGeo_mapsx=31;
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<571>";
					bb_LeGeo_mapx+=1;
				}
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<573>";
				dbg_object(bb_LeGeo_p).m_x=dbg_object(bb_LeGeo_p).m_x-1.0;
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<578>";
	for(var t_i2=0;t_i2<4;t_i2=t_i2+1){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<579>";
		if(dbg_object(bb_LeGeo_p).m_x<((bb_app_DeviceWidth()/2)|0)){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<580>";
			if(bb_LeGeo_mapx>0){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<581>";
				bb_LeGeo_mapsx+=1;
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<582>";
				if(bb_LeGeo_mapsx>32){
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<583>";
					bb_LeGeo_mapsx=0;
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<584>";
					bb_LeGeo_mapx-=1;
				}
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<586>";
				dbg_object(bb_LeGeo_p).m_x=dbg_object(bb_LeGeo_p).m_x+1.0;
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<591>";
	for(var t_i3=0;t_i3<16;t_i3=t_i3+1){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<592>";
		if(dbg_object(bb_LeGeo_p).m_y>((bb_app_DeviceHeight()/2)|0)){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<593>";
			if(bb_LeGeo_mapy+14<29){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<594>";
				bb_LeGeo_mapsy-=1;
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<595>";
				if(bb_LeGeo_mapsy<0){
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<596>";
					bb_LeGeo_mapsy=31;
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<597>";
					bb_LeGeo_mapy+=1;
				}
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<599>";
				dbg_object(bb_LeGeo_p).m_y=dbg_object(bb_LeGeo_p).m_y-1.0;
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<604>";
	for(var t_i4=0;t_i4<16;t_i4=t_i4+1){
		err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<605>";
		if(dbg_object(bb_LeGeo_p).m_y<((bb_app_DeviceHeight()/2)|0)){
			err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<606>";
			if(bb_LeGeo_mapy>0){
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<607>";
				bb_LeGeo_mapsy+=1;
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<608>";
				if(bb_LeGeo_mapsy>31){
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<609>";
					bb_LeGeo_mapsy=0;
					err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<610>";
					bb_LeGeo_mapy-=1;
				}
				err_info="C:/MonkeyX_Projects/MYSTUFF/LeGeO/LeGeo.monkey<612>";
				dbg_object(bb_LeGeo_p).m_y=dbg_object(bb_LeGeo_p).m_y+1.0;
			}
		}
	}
	pop_err();
	return false;
}
function bb_graphics_DrawPoly(t_verts){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<433>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<435>";
	bb_graphics_context.p_Validate();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<436>";
	bb_graphics_renderDevice.DrawPoly(t_verts);
	pop_err();
	return 0;
}
function bb_graphics_DrawPoly2(t_verts,t_image,t_frame){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<441>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<442>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<442>";
		error("Invalid image frame");
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<444>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<445>";
	bb_graphics_context.p_Validate();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/mojo/graphics.monkey<446>";
	bb_graphics_renderDevice.DrawPoly2(t_verts,dbg_object(t_image).m_surface,dbg_object(t_f).m_x,dbg_object(t_f).m_y);
	pop_err();
	return 0;
}
function c_SpineMojoFile(){
	Object.call(this);
	this.m__path="";
	this.m_index=0;
	this.m_start=0;
	this.m_buffer=null;
	this.m_total=0;
	this.implments={c_SpineFile:1};
}
c_SpineMojoFile.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<6>";
	pop_err();
	return this;
}
c_SpineMojoFile.prototype.p_Load=function(t_path){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<24>";
	this.m__path=t_path;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<25>";
	this.m_index=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<26>";
	this.m_start=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<29>";
	this.m_buffer=c_DataBuffer.m_Load(this.m__path);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<30>";
	if(this.m_buffer==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<30>";
		throw (c_SpineException.m_new.call(new c_SpineException,"invalid file: "+t_path));
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<31>";
	this.m_total=this.m_buffer.Length();
	pop_err();
}
c_SpineMojoFile.prototype.p_path=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<16>";
	pop_err();
	return this.m__path;
}
c_SpineMojoFile.prototype.p_path2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<20>";
	this.m__path=t_value;
	pop_err();
}
c_SpineMojoFile.prototype.p_ReadLine=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<35>";
	if(this.m_buffer==null || this.m_index>=this.m_total){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<35>";
		pop_err();
		return "";
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<37>";
	for(this.m_index=this.m_index;this.m_index<this.m_total;this.m_index=this.m_index+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<39>";
		if(this.m_buffer.PeekByte(this.m_index)==10){
			err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<40>";
			var t_stringEndIndex=this.m_index;
			err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<43>";
			if(this.m_index>0 && this.m_buffer.PeekByte(this.m_index-1)==13){
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<44>";
				t_stringEndIndex-=1;
			}
			err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<48>";
			var t_result=this.m_buffer.p_PeekString(this.m_start,t_stringEndIndex-this.m_start,"utf8");
			err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<49>";
			this.m_index=this.m_index+1;
			err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<50>";
			this.m_start=this.m_index;
			err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<51>";
			pop_err();
			return t_result;
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<55>";
	pop_err();
	return "";
}
c_SpineMojoFile.prototype.p_ReadAll=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<59>";
	if(this.m_buffer==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<59>";
		pop_err();
		return "";
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<61>";
	var t_result=this.m_buffer.p_PeekString2(this.m_start,"utf8");
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<62>";
	this.m_start=this.m_total;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<63>";
	pop_err();
	return t_result;
}
c_SpineMojoFile.prototype.p_Eof=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<67>";
	var t_=this.m_index>=this.m_total;
	pop_err();
	return t_;
}
c_SpineMojoFile.prototype.p_Close=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<71>";
	if((this.m_buffer)!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<72>";
		this.m_buffer.Discard();
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojofile.monkey<73>";
		this.m_buffer=null;
	}
	pop_err();
}
function c_DataBuffer(){
	BBDataBuffer.call(this);
}
c_DataBuffer.prototype=extend_class(BBDataBuffer);
c_DataBuffer.m_new=function(t_length){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<94>";
	if(!this._New(t_length)){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<94>";
		error("Allocate DataBuffer failed");
	}
	pop_err();
	return this;
}
c_DataBuffer.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<91>";
	pop_err();
	return this;
}
c_DataBuffer.m_Load=function(t_path){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<289>";
	var t_buf=c_DataBuffer.m_new2.call(new c_DataBuffer);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<290>";
	if(t_buf._Load(t_path)){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<290>";
		pop_err();
		return t_buf;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<291>";
	pop_err();
	return null;
}
c_DataBuffer.prototype.p_PeekBytes=function(t_address,t_bytes,t_offset,t_count){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<137>";
	if(t_address+t_count>this.Length()){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<137>";
		t_count=this.Length()-t_address;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<138>";
	if(t_offset+t_count>t_bytes.length){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<138>";
		t_count=t_bytes.length-t_offset;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<139>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<140>";
		dbg_array(t_bytes,t_offset+t_i)[dbg_index]=this.PeekByte(t_address+t_i);
	}
	pop_err();
}
c_DataBuffer.prototype.p_PeekBytes2=function(t_address,t_count){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<130>";
	if(t_address+t_count>this.Length()){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<130>";
		t_count=this.Length()-t_address;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<131>";
	var t_bytes=new_number_array(t_count);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<132>";
	this.p_PeekBytes(t_address,t_bytes,0,t_count);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<133>";
	pop_err();
	return t_bytes;
}
c_DataBuffer.prototype.p_PeekString=function(t_address,t_count,t_encoding){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<206>";
	var t_1=t_encoding;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<207>";
	if(t_1=="utf8"){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<208>";
		var t_p=this.p_PeekBytes2(t_address,t_count);
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<209>";
		var t_i=0;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<209>";
		var t_e=t_p.length;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<209>";
		var t_err=false;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<210>";
		var t_q=new_number_array(t_e);
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<210>";
		var t_j=0;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<211>";
		while(t_i<t_e){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<212>";
			var t_c=dbg_array(t_p,t_i)[dbg_index]&255;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<213>";
			t_i+=1;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<214>";
			if((t_c&128)!=0){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<215>";
				if((t_c&224)==192){
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<216>";
					if(t_i>=t_e || (dbg_array(t_p,t_i)[dbg_index]&192)!=128){
						err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<217>";
						t_err=true;
						err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<218>";
						break;
					}
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<220>";
					t_c=(t_c&31)<<6|dbg_array(t_p,t_i)[dbg_index]&63;
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<221>";
					t_i+=1;
				}else{
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<222>";
					if((t_c&240)==224){
						err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<223>";
						if(t_i+1>=t_e || (dbg_array(t_p,t_i)[dbg_index]&192)!=128 || (dbg_array(t_p,t_i+1)[dbg_index]&192)!=128){
							err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<224>";
							t_err=true;
							err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<225>";
							break;
						}
						err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<227>";
						t_c=(t_c&15)<<12|(dbg_array(t_p,t_i)[dbg_index]&63)<<6|dbg_array(t_p,t_i+1)[dbg_index]&63;
						err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<228>";
						t_i+=2;
					}else{
						err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<230>";
						t_err=true;
						err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<231>";
						break;
					}
				}
			}
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<234>";
			dbg_array(t_q,t_j)[dbg_index]=t_c;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<235>";
			t_j+=1;
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<237>";
		if(t_err){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<239>";
			var t_=string_fromchars(t_p);
			pop_err();
			return t_;
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<241>";
		if(t_j<t_e){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<241>";
			t_q=t_q.slice(0,t_j);
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<242>";
		var t_2=string_fromchars(t_q);
		pop_err();
		return t_2;
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<243>";
		if(t_1=="ascii"){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<244>";
			var t_p2=this.p_PeekBytes2(t_address,t_count);
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<245>";
			for(var t_i2=0;t_i2<t_p2.length;t_i2=t_i2+1){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<246>";
				dbg_array(t_p2,t_i2)[dbg_index]&=255;
			}
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<248>";
			var t_3=string_fromchars(t_p2);
			pop_err();
			return t_3;
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<251>";
	error("Invalid string encoding:"+t_encoding);
	pop_err();
	return "";
}
c_DataBuffer.prototype.p_PeekString2=function(t_address,t_encoding){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/brl/databuffer.monkey<201>";
	var t_=this.p_PeekString(t_address,this.Length()-t_address,t_encoding);
	pop_err();
	return t_;
}
function c_SpineMojoAtlas(){
	Object.call(this);
	this.m_regions=c_StringMap3.m_new.call(new c_StringMap3);
	this.implments={c_SpineAtlas:1};
}
c_SpineMojoAtlas.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<6>";
	pop_err();
	return this;
}
c_SpineMojoAtlas.m_ReadTuple=function(t_file,t_tuple){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<159>";
	var t_line=t_file.p_ReadLine();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<160>";
	var t_colon=t_line.indexOf(":",0);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<161>";
	if(t_colon==-1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<162>";
		throw c_SpineException.m_new.call(new c_SpineException,"Invalid line: "+t_line);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<165>";
	var t_i=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<166>";
	var t_lastMatch=t_colon+1;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<167>";
	var t_comma=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<169>";
	for(t_i=0;t_i<3;t_i=t_i+1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<170>";
		t_comma=t_line.indexOf(",",t_lastMatch);
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<171>";
		if(t_comma==-1){
			err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<171>";
			break;
		}
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<172>";
		dbg_array(t_tuple,t_i)[dbg_index]=string_trim(t_line.slice(t_lastMatch,t_comma));
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<173>";
		t_lastMatch=t_comma+1;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<175>";
	dbg_array(t_tuple,t_i)[dbg_index]=string_trim(t_line.slice(t_lastMatch));
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<176>";
	var t_=t_i+1;
	pop_err();
	return t_;
}
c_SpineMojoAtlas.m_PathCombine=function(t_path1,t_path2){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<180>";
	t_path1=string_replace(t_path1,"\\","/");
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<181>";
	t_path2=string_replace(t_path2,"\\","/");
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<184>";
	var t_index=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<185>";
	var t_length=t_path2.length;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<186>";
	while(t_path2<String(t_length) && String(dbg_charCodeAt(t_path2,t_index))=="/"){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<187>";
		t_index+=1;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<189>";
	if(t_index==t_length){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<190>";
		t_path2="";
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<191>";
		if(t_index>0){
			err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<192>";
			t_path2=t_path2.slice(t_index);
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<196>";
	t_index=t_path1.length-1;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<197>";
	while(t_index>-1 && String(dbg_charCodeAt(t_path1,t_index))=="/"){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<198>";
		t_index-=1;
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<200>";
	if(t_index==-1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<201>";
		t_path1="";
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<202>";
		if(t_index<t_path1.length-1){
			err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<203>";
			t_path1=t_path1.slice(0,t_index);
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<206>";
	if(((t_path1.length)!=0) && ((t_path2.length)!=0)){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<207>";
		var t_=t_path1+"/"+t_path2;
		pop_err();
		return t_;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<208>";
		if((t_path1.length)!=0){
			err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<209>";
			pop_err();
			return t_path1;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<210>";
			if((t_path2.length)!=0){
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<211>";
				pop_err();
				return t_path2;
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<214>";
	pop_err();
	return "";
}
c_SpineMojoAtlas.m_ReadValue=function(t_file){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<149>";
	var t_line=t_file.p_ReadLine();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<150>";
	var t_colon=t_line.indexOf(":",0);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<151>";
	if(t_colon==-1){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<152>";
		throw c_SpineException.m_new.call(new c_SpineException,"Invalid line: "+t_line);
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<154>";
	var t_=string_trim(t_line.slice(t_colon+1));
	pop_err();
	return t_;
}
c_SpineMojoAtlas.prototype.p_Load2=function(t_file,t_imagesDir,t_textureLoader){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<15>";
	if(t_textureLoader==null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<15>";
		throw c_SpineArgumentNullException.m_new.call(new c_SpineArgumentNullException,"textureLoader cannot be Null.");
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<17>";
	var t_pages=new_object_array(1);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<18>";
	var t_pagesCount=0;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<20>";
	var t_tuple=new_string_array(4);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<21>";
	var t_page=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<22>";
	var t_region=null;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<23>";
	var t_line="";
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<25>";
	while(t_file.p_Eof()==false){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<26>";
		t_line=t_file.p_ReadLine();
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<28>";
		if(string_trim(t_line).length==0){
			err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<29>";
			t_page=null;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<30>";
			if(t_page==null){
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<31>";
				t_page=c_SpineMojoAtlasPage.m_new.call(new c_SpineMojoAtlasPage);
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<32>";
				t_page.p_name2(t_line);
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<35>";
				c_SpineMojoAtlas.m_ReadTuple(t_file,t_tuple);
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<36>";
				t_page.p_width2(parseInt((dbg_array(t_tuple,0)[dbg_index]),10));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<37>";
				t_page.p_height2(parseInt((dbg_array(t_tuple,1)[dbg_index]),10));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<40>";
				c_SpineMojoAtlas.m_ReadTuple(t_file,t_tuple);
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<41>";
				t_page.p_format2(c_SpineFormat.m_FromString(dbg_array(t_tuple,0)[dbg_index]));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<44>";
				c_SpineMojoAtlas.m_ReadTuple(t_file,t_tuple);
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<45>";
				t_page.p_minFilter2(c_SpineTextureFilter.m_FromString(dbg_array(t_tuple,0)[dbg_index]));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<46>";
				t_page.p_magFilter2(c_SpineTextureFilter.m_FromString(dbg_array(t_tuple,1)[dbg_index]));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<49>";
				c_SpineMojoAtlas.m_ReadTuple(t_file,t_tuple);
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<50>";
				var t_1=dbg_array(t_tuple,0)[dbg_index];
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<51>";
				if(t_1=="none"){
					err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<52>";
					t_page.p_uWrap2(1);
					err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<53>";
					t_page.p_vWrap2(1);
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<54>";
					if(t_1=="xy"){
						err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<55>";
						t_page.p_uWrap2(2);
						err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<56>";
						t_page.p_vWrap2(2);
					}else{
						err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<57>";
						if(t_1=="x"){
							err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<58>";
							t_page.p_uWrap2(2);
							err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<59>";
							t_page.p_vWrap2(1);
						}else{
							err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<60>";
							if(t_1=="y"){
								err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<61>";
								t_page.p_uWrap2(1);
								err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<62>";
								t_page.p_vWrap2(2);
							}
						}
					}
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<66>";
				t_page.p_texture2(t_textureLoader.p_Load(c_SpineMojoAtlas.m_PathCombine(t_imagesDir,t_page.p_name())));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<69>";
				if(t_pagesCount==t_pages.length){
					err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<69>";
					t_pages=resize_object_array(t_pages,t_pagesCount*2+10);
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<70>";
				dbg_array(t_pages,t_pagesCount)[dbg_index]=t_page;
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<71>";
				t_pagesCount+=1;
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<74>";
				t_region=c_SpineMojoAtlasRegion.m_new.call(new c_SpineMojoAtlasRegion);
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<75>";
				t_region.p_name2(t_line);
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<76>";
				t_region.p_page2(t_page);
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<79>";
				c_SpineMojoAtlas.m_ReadTuple(t_file,t_tuple);
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<80>";
				t_region.p_rotate2(dbg_array(t_tuple,0)[dbg_index]=="true");
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<82>";
				if(t_region.p_rotate()){
					err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<83>";
					throw (c_SpineException.m_new.call(new c_SpineException,"atlas rotation not supported in monkey"));
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<88>";
				c_SpineMojoAtlas.m_ReadTuple(t_file,t_tuple);
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<89>";
				t_region.p_x2(parseInt((dbg_array(t_tuple,0)[dbg_index]),10));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<90>";
				t_region.p_y2(parseInt((dbg_array(t_tuple,1)[dbg_index]),10));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<93>";
				c_SpineMojoAtlas.m_ReadTuple(t_file,t_tuple);
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<94>";
				t_region.p_width2(parseInt((dbg_array(t_tuple,0)[dbg_index]),10));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<95>";
				t_region.p_height2(parseInt((dbg_array(t_tuple,1)[dbg_index]),10));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<98>";
				t_region.p_u2((t_region.p_x())/(t_page.p_width()));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<99>";
				t_region.p_v2((t_region.p_y())/(t_page.p_height()));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<100>";
				if(t_region.p_rotate()){
					err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<101>";
					t_region.p_u23((t_region.p_x()+t_region.p_height())/(t_page.p_width()));
					err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<102>";
					t_region.p_v23((t_region.p_y()+t_region.p_width())/(t_page.p_height()));
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<104>";
					t_region.p_u23((t_region.p_x()+t_region.p_width())/(t_page.p_width()));
					err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<105>";
					t_region.p_v23((t_region.p_y()+t_region.p_height())/(t_page.p_height()));
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<113>";
				if(c_SpineMojoAtlas.m_ReadTuple(t_file,t_tuple)==4){
					err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<114>";
					t_region.p_splits2([parseInt((dbg_array(t_tuple,0)[dbg_index]),10),parseInt((dbg_array(t_tuple,1)[dbg_index]),10),parseInt((dbg_array(t_tuple,2)[dbg_index]),10),parseInt((dbg_array(t_tuple,3)[dbg_index]),10)]);
					err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<116>";
					if(c_SpineMojoAtlas.m_ReadTuple(t_file,t_tuple)==4){
						err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<117>";
						t_region.p_pads2([parseInt((dbg_array(t_tuple,0)[dbg_index]),10),parseInt((dbg_array(t_tuple,1)[dbg_index]),10),parseInt((dbg_array(t_tuple,2)[dbg_index]),10),parseInt((dbg_array(t_tuple,3)[dbg_index]),10)]);
						err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<119>";
						c_SpineMojoAtlas.m_ReadTuple(t_file,t_tuple);
					}
				}
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<124>";
				t_region.p_originalWidth2(parseInt((dbg_array(t_tuple,0)[dbg_index]),10));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<125>";
				t_region.p_originalHeight2(parseInt((dbg_array(t_tuple,1)[dbg_index]),10));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<128>";
				c_SpineMojoAtlas.m_ReadTuple(t_file,t_tuple);
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<129>";
				t_region.p_offsetX2(parseInt((dbg_array(t_tuple,0)[dbg_index]),10));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<130>";
				t_region.p_offsetY2(parseInt((dbg_array(t_tuple,1)[dbg_index]),10));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<133>";
				t_region.p_index2(parseInt((c_SpineMojoAtlas.m_ReadValue(t_file)),10));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<136>";
				t_region.p_rendererObject2(t_page.p_texture().p_Grab(t_region.p_x(),t_region.p_y(),t_region.p_width(),t_region.p_height(),(t_region.p_width())/2.0,(t_region.p_height())/2.0,t_region.p_rotate()));
				err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<139>";
				this.m_regions.p_Insert3(t_region.p_name(),t_region);
			}
		}
	}
	pop_err();
}
c_SpineMojoAtlas.prototype.p_FindRegion=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlas.monkey<221>";
	var t_=(this.m_regions.p_ValueForKey(t_name));
	pop_err();
	return t_;
}
function c_SpineMojoAtlasPage(){
	Object.call(this);
	this.m__name="";
	this.m__width=0;
	this.m__height=0;
	this.m__format=0;
	this.m__minFilter=0;
	this.m__magFilter=0;
	this.m__uWrap=0;
	this.m__vWrap=0;
	this.m__texture=null;
	this.implments={c_SpineAtlasPage:1};
}
c_SpineMojoAtlasPage.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<6>";
	pop_err();
	return this;
}
c_SpineMojoAtlasPage.prototype.p_name=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<28>";
	pop_err();
	return this.m__name;
}
c_SpineMojoAtlasPage.prototype.p_name2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<32>";
	this.m__name=t_value;
	pop_err();
}
c_SpineMojoAtlasPage.prototype.p_width=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<76>";
	pop_err();
	return this.m__width;
}
c_SpineMojoAtlasPage.prototype.p_width2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<80>";
	this.m__width=t_value;
	pop_err();
}
c_SpineMojoAtlasPage.prototype.p_height=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<84>";
	pop_err();
	return this.m__height;
}
c_SpineMojoAtlasPage.prototype.p_height2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<88>";
	this.m__height=t_value;
	pop_err();
}
c_SpineMojoAtlasPage.prototype.p_format=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<36>";
	var t_=String(this.m__format);
	pop_err();
	return t_;
}
c_SpineMojoAtlasPage.prototype.p_format2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<40>";
	this.m__format=t_value;
	pop_err();
}
c_SpineMojoAtlasPage.prototype.p_minFilter=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<44>";
	pop_err();
	return this.m__minFilter;
}
c_SpineMojoAtlasPage.prototype.p_minFilter2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<48>";
	this.m__minFilter=t_value;
	pop_err();
}
c_SpineMojoAtlasPage.prototype.p_magFilter=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<52>";
	pop_err();
	return this.m__magFilter;
}
c_SpineMojoAtlasPage.prototype.p_magFilter2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<56>";
	this.m__magFilter=t_value;
	pop_err();
}
c_SpineMojoAtlasPage.prototype.p_uWrap=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<60>";
	pop_err();
	return this.m__uWrap;
}
c_SpineMojoAtlasPage.prototype.p_uWrap2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<64>";
	this.m__uWrap=t_value;
	pop_err();
}
c_SpineMojoAtlasPage.prototype.p_vWrap=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<68>";
	pop_err();
	return this.m__vWrap;
}
c_SpineMojoAtlasPage.prototype.p_vWrap2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<72>";
	this.m__vWrap=t_value;
	pop_err();
}
c_SpineMojoAtlasPage.prototype.p_texture=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<20>";
	var t_=(this.m__texture);
	pop_err();
	return t_;
}
c_SpineMojoAtlasPage.prototype.p_texture2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlaspage.monkey<24>";
	this.m__texture=object_downcast((t_value),c_SpineMojoTexture);
	pop_err();
}
function c_SpineMojoAtlasRegion(){
	Object.call(this);
	this.m__name="";
	this.m__page=null;
	this.m__rotate=false;
	this.m__x=0;
	this.m__y=0;
	this.m__width=0;
	this.m__height=0;
	this.m__u=.0;
	this.m__v=.0;
	this.m__u2=.0;
	this.m__v2=.0;
	this.m__splits=[];
	this.m__pads=[];
	this.m__originalWidth=0;
	this.m__originaHeight=0;
	this.m__offsetX=.0;
	this.m__offsetY=.0;
	this.m__index=0;
	this.m__rendererObject=null;
	this.implments={c_SpineAtlasRegion:1};
}
c_SpineMojoAtlasRegion.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<6>";
	pop_err();
	return this;
}
c_SpineMojoAtlasRegion.prototype.p_name=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<46>";
	pop_err();
	return this.m__name;
}
c_SpineMojoAtlasRegion.prototype.p_name2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<50>";
	this.m__name=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_page=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<38>";
	var t_=(this.m__page);
	pop_err();
	return t_;
}
c_SpineMojoAtlasRegion.prototype.p_page2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<42>";
	this.m__page=object_downcast((t_value),c_SpineMojoAtlasPage);
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_rotate=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<158>";
	pop_err();
	return this.m__rotate;
}
c_SpineMojoAtlasRegion.prototype.p_rotate2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<162>";
	this.m__rotate=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_x=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<54>";
	pop_err();
	return this.m__x;
}
c_SpineMojoAtlasRegion.prototype.p_x2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<58>";
	this.m__x=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_y=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<62>";
	pop_err();
	return this.m__y;
}
c_SpineMojoAtlasRegion.prototype.p_y2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<66>";
	this.m__y=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_width=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<70>";
	pop_err();
	return this.m__width;
}
c_SpineMojoAtlasRegion.prototype.p_width2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<74>";
	this.m__width=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_height=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<78>";
	pop_err();
	return this.m__height;
}
c_SpineMojoAtlasRegion.prototype.p_height2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<82>";
	this.m__height=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_u=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<86>";
	pop_err();
	return this.m__u;
}
c_SpineMojoAtlasRegion.prototype.p_u2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<90>";
	this.m__u=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_v=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<94>";
	pop_err();
	return this.m__v;
}
c_SpineMojoAtlasRegion.prototype.p_v2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<98>";
	this.m__v=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_u22=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<102>";
	pop_err();
	return this.m__u2;
}
c_SpineMojoAtlasRegion.prototype.p_u23=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<106>";
	this.m__u2=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_v22=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<110>";
	pop_err();
	return this.m__v2;
}
c_SpineMojoAtlasRegion.prototype.p_v23=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<114>";
	this.m__v2=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_splits=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<166>";
	pop_err();
	return this.m__splits;
}
c_SpineMojoAtlasRegion.prototype.p_splits2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<170>";
	this.m__splits=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_pads=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<174>";
	pop_err();
	return this.m__pads;
}
c_SpineMojoAtlasRegion.prototype.p_pads2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<178>";
	this.m__pads=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_originalWidth=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<134>";
	pop_err();
	return this.m__originalWidth;
}
c_SpineMojoAtlasRegion.prototype.p_originalWidth2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<138>";
	this.m__originalWidth=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_originalHeight=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<142>";
	pop_err();
	return this.m__originaHeight;
}
c_SpineMojoAtlasRegion.prototype.p_originalHeight2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<146>";
	this.m__originaHeight=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_offsetX=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<118>";
	pop_err();
	return this.m__offsetX;
}
c_SpineMojoAtlasRegion.prototype.p_offsetX2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<122>";
	this.m__offsetX=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_offsetY=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<126>";
	pop_err();
	return this.m__offsetY;
}
c_SpineMojoAtlasRegion.prototype.p_offsetY2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<130>";
	this.m__offsetY=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_index=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<150>";
	pop_err();
	return this.m__index;
}
c_SpineMojoAtlasRegion.prototype.p_index2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<154>";
	this.m__index=t_value;
	pop_err();
}
c_SpineMojoAtlasRegion.prototype.p_rendererObject=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<30>";
	var t_=(this.m__rendererObject);
	pop_err();
	return t_;
}
c_SpineMojoAtlasRegion.prototype.p_rendererObject2=function(t_value){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojoatlasregion.monkey<34>";
	this.m__rendererObject=object_downcast((t_value),c_SpineMojoTextureRenderObject);
	pop_err();
}
function c_SpineFormat(){
	Object.call(this);
}
c_SpineFormat.m_FromString=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<15>";
	var t_1=t_name.toLowerCase();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<16>";
	if(t_1=="alpha"){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<17>";
		pop_err();
		return 0;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<18>";
		if(t_1=="intensity"){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<19>";
			pop_err();
			return 1;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<20>";
			if(t_1=="luminancealpha"){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<21>";
				pop_err();
				return 2;
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<22>";
				if(t_1=="rgb565"){
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<23>";
					pop_err();
					return 3;
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<24>";
					if(t_1=="rgba4444"){
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<25>";
						pop_err();
						return 4;
					}else{
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<26>";
						if(t_1=="rgb888"){
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<27>";
							pop_err();
							return 5;
						}else{
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<28>";
							if(t_1=="rgba8888"){
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<29>";
								pop_err();
								return 6;
							}
						}
					}
				}
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spineformat.monkey<31>";
	pop_err();
	return -1;
}
function c_SpineTextureFilter(){
	Object.call(this);
}
c_SpineTextureFilter.m_FromString=function(t_name){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<16>";
	var t_1=t_name.toLowerCase();
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<17>";
	if(t_1=="nearest"){
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<18>";
		pop_err();
		return 0;
	}else{
		err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<19>";
		if(t_1=="linear"){
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<20>";
			pop_err();
			return 1;
		}else{
			err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<21>";
			if(t_1=="mipmap"){
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<22>";
				pop_err();
				return 2;
			}else{
				err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<23>";
				if(t_1=="mipmapnearestnearest"){
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<24>";
					pop_err();
					return 3;
				}else{
					err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<25>";
					if(t_1=="mipmaplinearnearest"){
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<26>";
						pop_err();
						return 4;
					}else{
						err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<27>";
						if(t_1=="mipmapnearestlinear"){
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<28>";
							pop_err();
							return 5;
						}else{
							err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<29>";
							if(t_1=="mipmaplinearlinear"){
								err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<30>";
								pop_err();
								return 6;
							}
						}
					}
				}
			}
		}
	}
	err_info="C:/MonkeyX_Projects/MODULES/spine/glue/spinetexturefilter.monkey<32>";
	pop_err();
	return -1;
}
function c_SpineTextureWrap(){
	Object.call(this);
}
function c_SpineMojoTexture(){
	Object.call(this);
	this.m__path="";
	this.m_image=null;
	this.m__width=0;
	this.m__height=0;
	this.implments={c_SpineTexture:1};
}
c_SpineMojoTexture.m_new=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexture.monkey<6>";
	pop_err();
	return this;
}
c_SpineMojoTexture.prototype.p_Load=function(t_path){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexture.monkey<27>";
	this.m__path=t_path;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexture.monkey<28>";
	this.m_image=bb_graphics_LoadImage(t_path,1,c_Image.m_DefaultFlags);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexture.monkey<29>";
	if((this.m_image)!=null){
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexture.monkey<30>";
		this.m__width=this.m_image.p_Width();
		err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexture.monkey<31>";
		this.m__height=this.m_image.p_Height();
	}
	pop_err();
}
c_SpineMojoTexture.prototype.p_Grab=function(t_x,t_y,t_width,t_height,t_handleX,t_handleY,t_rotate){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexture.monkey<46>";
	var t_=(c_SpineMojoTextureRenderObject.m_new.call(new c_SpineMojoTextureRenderObject,this.m_image,t_x,t_y,t_width,t_height,t_handleX,t_handleY,t_rotate));
	pop_err();
	return t_;
}
function c_SpineMojoTextureRenderObject(){
	Object.call(this);
	this.m_rotate=false;
	this.m_texture=null;
	this.m_image=null;
	this.implments={c_SpineRenderObject:1};
}
c_SpineMojoTextureRenderObject.m_new=function(t_image,t_x,t_y,t_width,t_height,t_handleX,t_handleY,t_rotate){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexturerenderobject.monkey<30>";
	dbg_object(this).m_rotate=t_rotate;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexturerenderobject.monkey<31>";
	this.m_texture=t_image;
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexturerenderobject.monkey<42>";
	dbg_object(this).m_image=t_image.p_GrabImage(t_x,t_y,t_width,t_height,1,c_Image.m_DefaultFlags);
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexturerenderobject.monkey<43>";
	dbg_object(this).m_image.p_SetHandle(t_handleX,t_handleY);
	pop_err();
	return this;
}
c_SpineMojoTextureRenderObject.m_new2=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexturerenderobject.monkey<6>";
	pop_err();
	return this;
}
c_SpineMojoTextureRenderObject.prototype.p_width=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexturerenderobject.monkey<14>";
	var t_=this.m_image.p_Width();
	pop_err();
	return t_;
}
c_SpineMojoTextureRenderObject.prototype.p_height=function(){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexturerenderobject.monkey<18>";
	var t_=this.m_image.p_Height();
	pop_err();
	return t_;
}
c_SpineMojoTextureRenderObject.prototype.p_Draw=function(t_verts){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexturerenderobject.monkey<52>";
	bb_graphics_DrawPoly2(t_verts,this.m_image,0);
	pop_err();
}
c_SpineMojoTextureRenderObject.prototype.p_Draw2=function(t_x,t_y,t_angle,t_scaleX,t_scaleY,t_atlasScale){
	push_err();
	err_info="C:/MonkeyX_Projects/MODULES/spine/spinemojo/spinemojotexturerenderobject.monkey<64>";
	bb_graphics_DrawImage2(this.m_image,t_x,t_y,t_angle,t_scaleX*t_atlasScale,t_scaleY*t_atlasScale,0);
	pop_err();
}
function c_Map4(){
	Object.call(this);
	this.m_root=null;
}
c_Map4.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
c_Map4.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map4.prototype.p_RotateLeft4=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map4.prototype.p_RotateRight4=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map4.prototype.p_InsertFixup4=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<223>";
					this.p_RotateLeft4(t_node);
				}
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<227>";
				this.p_RotateRight4(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<239>";
					this.p_RotateRight4(t_node);
				}
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<243>";
				this.p_RotateLeft4(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map4.prototype.p_Set4=function(t_key,t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<29>";
	var t_node=this.m_root;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<34>";
		t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<45>";
	t_node=c_Node6.m_new.call(new c_Node6,t_key,t_value,-1,t_parent);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<53>";
		this.p_InsertFixup4(t_node);
	}else{
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<55>";
		this.m_root=t_node;
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
c_Map4.prototype.p_Insert3=function(t_key,t_value){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<146>";
	var t_=this.p_Set4(t_key,t_value);
	pop_err();
	return t_;
}
c_Map4.prototype.p_FindNode2=function(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<157>";
	var t_node=this.m_root;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<160>";
		var t_cmp=this.p_Compare2(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
c_Map4.prototype.p_Get=function(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<101>";
	var t_node=this.p_FindNode2(t_key);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
c_Map4.prototype.p_ValueForKey=function(t_key){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<151>";
	var t_=this.p_Get(t_key);
	pop_err();
	return t_;
}
function c_StringMap3(){
	c_Map4.call(this);
}
c_StringMap3.prototype=extend_class(c_Map4);
c_StringMap3.m_new=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<551>";
	c_Map4.m_new.call(this);
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
c_StringMap3.prototype.p_Compare2=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function c_Node6(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node6.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node6.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
function c_NodeEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_NodeEnumerator.m_new=function(t_node){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<437>";
	dbg_object(this).m_node=t_node;
	pop_err();
	return this;
}
c_NodeEnumerator.m_new2=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<434>";
	pop_err();
	return this;
}
c_NodeEnumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<441>";
	var t_=this.m_node!=null;
	pop_err();
	return t_;
}
c_NodeEnumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<445>";
	var t_t=this.m_node;
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<446>";
	this.m_node=this.m_node.p_NextNode();
	err_info="C:/Users/Robert/Documents/Monkey X Studio/MonkeyX/MonkeyXPro81b/modules/monkey/map.monkey<447>";
	pop_err();
	return t_t;
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_app__devWidth=0;
	bb_app__devHeight=0;
	bb_app__displayModes=[];
	bb_app__desktopMode=null;
	bb_graphics_renderDevice=null;
	bb_app__updateRate=0;
	bb_LeGeo_sndJump=null;
	bb_LeGeo_sndHitBlock=null;
	bb_LeGeo_imgWorld=null;
	bb_spinemojo_spineMojoFileLoader=(c_SpineMojoFileLoader.m_new.call(new c_SpineMojoFileLoader));
	bb_spinemojo_spineMojoAtlasLoader=(c_SpineMojoAtlasLoader.m_new.call(new c_SpineMojoAtlasLoader));
	bb_spinemojo_spineMojoTextureLoader=(c_SpineMojoTextureLoader.m_new.call(new c_SpineMojoTextureLoader));
	c_JSONToken.m_reusableToken=c_JSONToken.m_new.call(new c_JSONToken,-1,null);
	bb_LeGeo_spineDragon=null;
	bb_LeGeo_spineTest=null;
	bb_LeGeo_mapsx=0;
	bb_LeGeo_mapsy=0;
	bb_LeGeo_map=[[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,1],[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,1],[7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,83,83,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,83,83,83,83,83,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,83,83,83,83,83,37,37,37,83,37,37,37,7,1],[7,7,37,37,37,37,37,37,37,83,37,7,7,7,7,7,37,83,83,83,83,37,37,37,7,7,7,7,7,7,7,7,7,37,37,37,37,37,7,7,7,37,37,83,83,83,83,83,83,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,83,83,83,83,83,37,37,37,83,37,37,37,7,1],[7,7,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,83,83,83,83,37,37,37,7,7,7,7,7,7,7,7,7,37,37,37,37,37,7,7,7,37,37,83,83,83,83,83,83,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,83,83,83,83,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,37,37,83,83,83,83,83,83,37,37,37,83,37,37,37,7,1],[7,7,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,83,83,83,83,37,37,37,37,37,37,37,37,37,37,7,7,7,7,7,7,7,7,7,7,37,37,83,83,83,83,83,83,83,37,37,7,7,7,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,83,83,83,83,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,83,83,83,83,83,37,37,37,83,37,37,37,7,1],[7,7,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,7,7,7,7,7,7,7,7,7,7,37,37,37,37,37,37,37,37,37,37,37,7,7,7,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,83,83,83,83,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,7,7,7,37,37,37,37,37,37,37,37,83,83,83,83,83,37,37,7,7,7,7,7,7,7,7,7,7,7,7,7,7,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,7,7,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,7,7,7,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,7,7,37,37,83,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,7,7,37,37,83,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,37,83,37,7,7,7,7,7,7,7,7,7,7,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,37,83,37,7,7,7,7,7,7,7,7,7,7,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,7,7,7,37,37,37,7,7,7,7,7,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,37,37,37,37,37,83,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,37,83,37,7,7,37,37,37,37,83,37,7,7,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,37,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,37,37,37,37,37,37,7,7,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,7,7,37,37,37,83,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,37,83,37,7,7,37,37,37,37,83,37,7,7,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,37,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,37,37,37,37,37,37,7,7,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,37,37,37,37,37,83,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,37,83,37,7,7,7,7,7,37,83,37,7,7,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,37,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,37,37,37,7,7,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,37,37,37,37,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,37,83,37,7,7,7,7,7,37,83,37,7,7,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,4,37,37,7,7,7,37,37,37,37,37,37,7,7,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,37,37,37,37,37,37,7,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,37,83,37,7,7,7,7,7,37,83,37,7,7,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,4,37,37,7,7,7,37,37,37,37,37,37,7,7,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,37,37,37,37,37,37,7,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,37,83,37,7,7,7,7,7,37,83,37,7,7,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,7,7,7,7,37,4,37,37,7,7,7,37,37,37,7,7,7,7,7,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,7,7,37,37,37,37,7,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,37,83,37,7,7,7,7,7,37,83,37,7,7,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,7,7,7,7,7,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,4,37,37,7,7,7,37,37,37,37,37,37,7,7,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,37,37,37,37,37,37,7,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,7,7,37,37,37,37,37,37,37,37,37,37,37,37,7,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,37,83,37,7,7,7,7,7,37,83,37,7,7,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,7,7,7,7,7,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,4,37,37,7,7,7,37,37,37,37,37,37,7,7,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,37,37,37,37,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,7,7,37,37,37,37,37,37,37,37,37,37,37,37,7,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,37,83,37,7,7,7,7,7,37,83,37,7,7,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,7,7,7,7,37,37,37,37,37,4,37,37,7,7,7,7,7,7,37,37,37,7,7,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,7,7,37,37,37,37,7,7,7,7,37,37,37,37,7,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,37,83,37,7,7,7,7,7,37,83,37,7,7,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,4,37,37,7,7,7,37,37,37,37,37,37,7,7,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,7,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,37,83,37,7,7,37,37,37,37,83,37,7,7,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,4,37,37,7,7,7,37,37,37,37,37,37,7,7,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,7,7,7,7,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,7,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,83,37,37,37,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,83,37,37,37,7,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,7,7,7,7,7,37,37,37,37,37,37,37,7,7,37,37,83,37,7,7,7,7,7,7,7,7,7,7,7,7,37,37,37,7,7,7,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,7,7,7,7,7,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,83,37,37,37,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,7,7,37,37,37,37,37,37,37,37,37,37,37,83,37,7,7,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,83,37,37,37,37,37,37,83,37,37,37,7,7,7,7,7,7,7,7,7,7,7,7,83,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,7,7,37,37,37,37,37,37,37,37,37,37,37,83,37,7,7,7,7,7,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,83,37,37,37,7,1],[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,187,7,7,7,7,7,7,7,7,7,1],[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,1]];
	bb_LeGeo_mapy=0;
	bb_LeGeo_mapx=0;
	bb_LeGeo_p=c_player.m_new.call(new c_player);
	bb_LeGeo_Ladder=83;
	bb_LeGeo_SolidWall=7;
}
//${TRANSCODE_END}
