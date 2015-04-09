/*!
 * Featured products
 * 
 *
 */

// Needs to know current browser size, can fetch at responsible times
// 


;(function( $, window, document, undefined ){
    "use strict";

    // Create the defaults once
    var pluginName = "featuredProducts",
        defaults = {

        };

    // The actual plugin constructor
    function Plugin( element, options ){
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this.state = {
            currentIndex : 0
        };
        this.sortedProducts = [];
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function( ){
            this.setup();
        },
        setup: function( ){ 

            var plugin              = this,
                $elem               = $(this.element),
                navLeft             = $elem.find('.left'),
                navRight            = $elem.find('.right'),
                productsContainer   = $elem.find('.products ul'),
                products            = $elem.find('.products li'),
                browserWidth        = $('html').width();

            this.elems = {
                navLeft             : navLeft,
                navRight            : navRight,
                productsContainer   : productsContainer
            };

            // populate this.sortedProducts array
            this.sortProducts(products);
            console.log(this.sortedProducts);
            // clear viewport
            this.clearViewport();
            // display some products
            this.displayProducts();
            // bind button controls

            navLeft.on( 'click', function( e ){
                e.preventDefault();
                plugin.previousArray();
            });

            navRight.on( 'click', function( e ){
                e.preventDefault();
                plugin.nextArray();
            });

        },
        clearViewport: function( ){
            $(this.element).find('.products li').remove();
        },
        // use this.state.currentIndex & this.sortedProducts to display elements

        displayProducts: function( modifier ){

            var $productsContainer  = this.elems.productsContainer,
                currentIndex        = this.state.currentIndex,
                productsArray       = this.sortedProducts,
                arraySelect         = currentIndex,
                products            = [],
                $product            = [];

            // if we have a modifier 
            if( modifier ){
                arraySelect = ( modifier === 'next' ) ? currentIndex + 1 : currentIndex - 1;

                // Go to first / last array item when reaching min/max values
                if( arraySelect < 0 ){
                    arraySelect = productsArray.length - 1;
                } else if( arraySelect === productsArray.length ){
                    arraySelect = 0;
                }

            }

            products = productsArray[arraySelect];

            console.log( arraySelect, productsArray.length, products );

            // add products to product container
            for (var i = 0, len = products.length; i < len; i++) {

                $product = $(products[i]);
                $productsContainer.append($product);

            }

            // update state
            this.state.currentIndex = arraySelect;

        },
        sortProducts: function( products ){

            var productIndex = 0,
                sortedProducts = [],
                childArray = [];

            // for every 4th item in the products array, make new child array to be pushed to the products sorted array
            products.each(function( i ){

                childArray.push(this);

                // Make a child arry for products
                if (((i+1) % 4 ) === 0) {

                    sortedProducts.push(childArray);
                    childArray = [];

                } else if ((i + 1) === products.length){
                    sortedProducts.push(childArray);
                }

            });

            this.sortedProducts = sortedProducts;

        },
        previousArray: function( ){
            this.clearViewport();
            this.displayProducts( 'previous' );
        },
        nextArray: function( ){
            this.clearViewport();
            this.displayProducts( 'next' );
        },
        watchBrowser: function( ){

        },
        animateNext: function( ){

        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };

})( jQuery, window, document );
