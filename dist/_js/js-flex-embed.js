(function( w, $ ) {
	"use strict";

	var name = "flex-embed",
		componentName = name + "-component",
		cl = {
			flexEmbed: "o-flex-embed",
			flexEmbedContent: "o-flex-embed__content",
			flexEmbedImg: "o-flex-embed__crop-item",
			flexEmbedImgShort: "o-flex-embed__crop-item--short",
			flexEmbedRatio: "o-flex-embed__ratio"
		};

	w.componentNamespace = w.componentNamespace || {};

	var FlexEmbed = w.componentNamespace.FlexEmbed = function( element,options ){
		if( !element ){
			throw new Error( "Element required to initialize object" );
		}
		this.element = element;
		this.$element = $( element );

		options = options || {};
		options.height = options.height || parseInt(this.$element.attr('height'), 10) || this.$element.data('height');
		options.width = options.width || parseInt(this.$element.attr('width'), 10) || this.$element.data('width');
		options.aspectRatio = options.aspectRatio || this.$element.data('aspect-ratio') || (options.height / options.width);
		this.options = options;
	};

	FlexEmbed.prototype.init = function(){
		if ( this.$element.data( componentName ) ) {
			return;
		}

		this.$element.data( componentName, this );
		this.$element.trigger( "beforecreate." + name );
		this._create();
		this.$element.trigger( "create." + name );
	};

	FlexEmbed.prototype._create = function(){
		var self = this,
			o = self.options;

		if ( this.$element.is('img') ) {
			this.$flexEmbed = this.$element.addClass(cl.flexEmbedImg)
											.wrap('<div class="' + cl.flexEmbed + '"><div class="' + cl.flexEmbedContent + '"></div></div>')
											.closest('.' + cl.flexEmbed);
			if (this.$element.width() > this.$element.height()) {
				this.$element.addClass(cl.flexEmbedImgShort);
			}
		} else {
			this.$flexEmbed = this.$element.addClass(cl.flexEmbedContent).wrap('<div class="' + cl.flexEmbed + '"></div>').parent();
		}

		this.$flexEmbedRatio = $( '<div class="' + cl.flexEmbedRatio + '"></div>' ).prependTo(this.$flexEmbed);

		this.$flexEmbedRatio.css('padding-bottom', (o.aspectRatio * 100) + "%");

		this.$element.removeAttr('height').removeAttr('width');
	};

})(this, jQuery);

(function( w, $ ) {
	"use strict";

		var pluginName = "flex-embed",
		initSelector = ".js-" + pluginName;

		$.fn[ pluginName ] = function(){
				return this.each( function(){
						new w.componentNamespace.FlexEmbed( this ).init();
				});
		};

	// auto-init on enhance (which is called on domready)
	$( document ).on( "enhance", function( e ){
		$( $( e.target ).is( initSelector ) && e.target ).add( initSelector, e.target ).filter( initSelector )[ pluginName ]();
	});

})(this, jQuery);

(function( w, $ ) {
	"use strict";

		var pluginName = "has-iframe",
		initSelector = ".js-" + pluginName;

		$.fn[ pluginName ] = function(){
				return this.each( function(){
					var $iframe = $(this).find('iframe');
						new w.componentNamespace.FlexEmbed( $iframe[0] ).init();
				});
		};

	// auto-init on enhance (which is called on domready)
	$( document ).on( "enhance", function( e ){
		$( $( e.target ).is( initSelector ) && e.target ).add( initSelector, e.target ).filter( initSelector )[ pluginName ]();
	});

})(this, jQuery);
