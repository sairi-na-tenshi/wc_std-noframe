CComponent( 'i:noframe', function( el ){

	var nodeLoader= FLazy( function(){
		var node= el.getElementsByTagName( 'iframe' )[0]
		return FValue( node )
	})
	var nodeContent= FLazy( function(){
		var node= document.createElement( 'i:noframe-content' )
		el.appendChild( node )
		return FValue( node )
	})
	var docLoaded= function(){
    	return nodeLoader().contentWindow.document
	}
	var bodyLoaded= function(){
    	var doc= docLoaded()
    	var body= doc.getElementsByTagName( 'body' )[0]
    	return body
	}

    var updateContent= function(){
    	var body= bodyLoaded()
    	var content= nodeContent()
    	content.innerHTML= ''
    	var frag= docLoaded().createDocumentFragment()
		var child; while( child= body.firstChild ) frag.appendChild( child )
		content.appendChild( frag )
		el.className+= ' loaded=true'
		var hrefLoaded= docLoaded().location.href
		var hrefCurrent= document.location.href
		var links= document.links
		for( var i= 0; i < links.length; ++i ){
			var link= links[i]
			if( link.href === hrefCurrent ) link.className+= ' target=true'
			if( link.target !== nodeLoader().name ) continue
			if( link.href === hrefLoaded ) link.className+= ' target=true'
			else link.className= link.className.replace( /\btarget=true\b/, '' )
		}
		document.title= docLoaded().title
    }

    var loader= nodeLoader()
    loader.attachEvent
    	? loader.attachEvent( 'onload', updateContent )
    	: loader.onload= updateContent
    if( bodyLoaded() ) updateContent()

})