(function() {
	/* Custom scroller deal for on-page links
	 */
	$.each( $( 'a' ), function() {
		var $link = $( this );
		if ( $link.attr( 'href' ).substr( 0, 1 ) == '#' ) {
			$link.click( function( e ) {
				e.preventDefault();

				var hash = $( this ).attr( 'href' );
				$( 'html, body' ).animate({
					scrollTop : Math.ceil( $( hash ).offset().top )
				});
			});
		}
	});
})();