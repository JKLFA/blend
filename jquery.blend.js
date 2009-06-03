/*
	jQuery Blend v1.0
	(c) 2009 Jack Moore - www.colorpowered.com - jack@colorpowered.com
	Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
*/
(function($){
    /*
        Blend creates a 2nd layer on top of the target element.
        This layer is faded in and out to create the effect.  The orignal, bottom layer
        has it's class set to 'hover' and remains that way for the duration to
        keep the CSS :hover state from being apparent when the object is moused-over.
    */
    
    $.fn.blend = function(options, callback) {
        var settings = $.extend({}, $.fn.blend.settings, options);
        
        $(this).each(function(){
            
            var $this, $target, $hover, $clone, bgImage, bgRepeat, bgPosition, bgxPosition, bgyPosition, bgColor;
            
            $this = $(this);
            
            $target = $(settings.target ? settings.target : this);
            
            if($target[0].style.position != 'absolute'){
                $target.css({position:'relative'});   
            }
            
            if(!$target.hasClass('hover')){
                $target.wrapInner('<div style="position:relative" />');
            }
	    
            bgImage = $target.css('background-image');
            bgRepeat = $target.css('background-repeat');
            bgColor = $target.css('background-color');
	    bgxPosition = $target.css('background-position-x');
	    bgyPosition = $target.css('background-position-y');
	    bgPosition = $target.css('background-position');
	    
	    $target.addClass("hover");
	    
	    //checks to see if blend has already been applied to an element.
            if($target.find(".jsblend").length === 0){
                $hover = $('<div class="jsblend" />').css({
                    position:'absolute',
                    top:'0',
                    left:'0',
                    width:$target.css('width'),
                    height:$target.css('height'),
		    cursor:'pointer',
                    'background-image':$target.css('background-image'),
                    'background-repeat':$target.css('background-repeat'),
		    'background-position':$target.css('background-position'),
                    'background-position-x':$target.css('background-position-x'),
		    'background-position-y':$target.css('background-position-y'),
                    'background-color':$target.css('background-color')
                });
		
		if(settings.top){
		    $hover.appendTo($target);
		} else {
		    $hover.prependTo($target);
		}
            } else {
                $hover = $target.find(".jsblend");
            }
	    
	    $target.css({
		'background-image':bgImage,
		'background-repeat':bgRepeat,
		'background-position':bgPosition,
		'background-position-x':bgxPosition,
		'background-position-y':bgyPosition,
		'background-color':bgColor
	    });
	    
            var active = false;
            var out = 0;
            var opacity = settings.opacity;
            
            if(settings.reverse){
                out = settings.opacity;
                opacity = 0;
            }
            $hover.css({opacity:out});
            
            function pulse(o){
                if(active){
                    $hover.fadeTo(settings.speed, o, function(){
                        pulse(o==out?opacity:out);
                    });
                }
            }
	    
            if(settings.pulse && settings.active){
                active = true;
                pulse(opacity);
	    } else if(settings.pulse){
                $this.hover(function(){
                    active = true;
                    pulse(opacity);
                }, function(){
                    active = false;
                    $hover.stop(true).fadeTo(settings.speed, out);
                });
            } else {
                $this.hover(function(){
                    $hover.stop().fadeTo(settings.speed, opacity);
                }, function(){
                    $hover.stop().fadeTo(settings.speed, out);
                });
            }
        });
        return this;
    };
    
    $.fn.blend.settings = {
        speed : 500,
        opacity : 1,
        target : false,
        reverse : false,
	pulse : false,
	active : false,
	top : false
    };
    
})(jQuery);