/* Rating.js
 *
	Purpose: Provide a rating component

	Description:

	History:
		2010/10/13, Created by TonyQ

 Copyright (C) 2010 Potix Corporation. All Rights Reserved.
 */
(function(){
    /**
     * The rating widget.
     */
    rating.Rating = zk.$extends(zk.Widget, {
    	_mode:"default",
        /**
         *  a temp value for saving the user's slider value.
         */
        _ratingtmp:0,
        /**
         * just like server side , it means rated value is setted
         */
        _rated:false,
		_readOnly:false,
        $define:{
			rated:function () {
				if(this.desktop){
                   this._updateLabel();
                }
				this._updateState();
			},
			readOnly:function (val){
				this._updateState();
			},
            /**
             * the rated value for user
             * @param {Object} val
             */
            ratedvalue:function(val){
                this._rated = true;
                this._changeState( rating.Rating.RATED );				
				if(this.desktop){
                   this._updateLabel();
                }

            },
            mode:function(){
            	this.rerender();
            },
            /**
             *  The value which decide the stars , it's usually to be something
             *  like a statistic value , for example , every rater's average .
             * @param {Object} val
             */
            value:function(val){
                if (this.desktop) {
                    this._updateStar(val);
					this._updateLabel();
                }
            }
        },
        /**
         * init method , we create 4 children and append them here .
         */
        $init: function() {
    	    this.$supers(rating.Rating,'$init', arguments);

            this._ratedvalue = -1;
            this._value = -1 ;

            this._ratebtn = new zul.wgt.Toolbarbutton();
            this._ratebtn.setLabel("rate this");
            this.appendChild(this._ratebtn);

            this._slider = new zul.inp.Slider();
            this._slider.setWidth("69px");
            this.appendChild(this._slider);

            this._label = new zul.wgt.Label();
            this._label.setValue("You rated this: " + this._ratedvalue + "/100");

            this.appendChild(this._label);

            this._submitbtn = new zul.wgt.Toolbarbutton();
            this._submitbtn.setLabel("Submit rating");
            this.appendChild(this._submitbtn);

            this._changeState(rating.Rating.WAIT);
        },
        /**
         * event binding here.
         * @param {Object} desktop
         * @param {Object} skipper
         * @param {Object} after
         */
        bind_: function(desktop, skipper, after){
            this.$supers(rating.Rating, 'bind_', arguments);

            if(this._mode == "horizontal"){
            	jq(this.$n()).addClass(this.getZclass()+"-horizontal");
            }
            var stars = jq("."+ this.getZclass() +"-star-full",this.$n());
            stars.each(function(){
               jq(this).css("left", jq(this).prev().position().left);
            });

			this._updateState();
			
            this._updateStar(this._value);
			this._updateLabel();

			if(this._mode != "direct"){
				this.domListen_(this._label.$n(),"onClick","doRating_");
	            this.domListen_(this._ratebtn.$n(),"onClick","doRating_");
	            this.domListen_(this._submitbtn.$n(),"onClick","doRatingEnd_");
	            this._slider.listen({onScroll:[this,this.doRatingScroll_]});
			}else{
				this.domListen_(this.$n(),"onMouseMove","doDirectRatingScroll_");
				this.domListen_(this.$n(),"onClick","doDirectRatingEnd_");
			}

        },
        /**
         * event un binding here
         */
        unbind_: function(){
        	if(this._mode != "direct"){
	        	this.domUnlisten_(this._label.$n(),"onClick","doRating_");
	            this.domUnlisten_(this._submitbtn.$n(),"onClick","doRatingEnd_");
	            this.domUnlisten_(this._ratebtn.$n(),"onClick","doRating_");
        	}else{
				this.domUnlisten_(this.$n(),"onMouseMove","doDirectRatingScroll_");
				this.domUnlisten_(this.$n(),"onClick","doDirectRatingEnd_");        		
        	}
            this.$supers(rating.Rating, "unbind_", arguments);
        },
        /**
         * the zclass , default is z-rating
         */
        getZclass: function(){
            return (this._zclass != null ? this._zclass : "z-rating");
        },
        doDirectRatingScroll_: function(e){
        	if(!this._readOnly && ! this._rated){
        		jq(this.$n("stars")).addClass(this.getZclass()+"-editng");
	        	var pos = e.pageX , 
	        		posStartX = jq(this.$n("stars")).offset().left +15 ,
	        		offset = (posStartX > pos ? 0 : pos - posStartX ),  
					totalwidth = 14 * 5; //padding-left: 15
	        	
	        		if(offset > totalwidth){
	        			offset = totalwidth;
	        		}
	        	this._ratingtmp = zk.parseInt((offset/totalwidth) *100);
	        	this._updateStar( this._ratingtmp );
        	}
        },
        doDirectRatingEnd_: function(e){
        	if(!this._readOnly && ! this._rated){
        		this._updateStar(this._value);
        		this._rated = true;
        		this.fire("onRating",{ val: this._ratingtmp });
        		jq(this.$n("stars")).removeClass(this.getZclass()+"-editng");
        	}
        },
        /**
         * this method trigger when user going to rate ,
         * we need to show up the slider .
         */
        doRating_:function(){
			if(!this._readOnly)
            	this._changeState(rating.Rating.RATING);
            //@TODO check if here needs a rating start event
        },
        /**
         * each time user slide end , we need to update stars here.
         */
        doRatingScroll_:function(){
            this._ratingtmp = this._slider.getCurpos();
            this._updateStar(this._ratingtmp);

            //@TODO check if here needs a rating start event
        },
		_updateState:function(){
			if(this._readOnly)
				this._changeState( rating.Rating.READONLY );
			else if(this._rated)
				this._changeState( rating.Rating.RATED );
			else
				this._changeState( rating.Rating.WAIT );
		},
        /**
         * user click submit button , so we need to tell server to update here.
         */
        doRatingEnd_:function(){
            this._updateStar(this._value);
            this.fire("onRating",{ val: this._ratingtmp });
        },
        /**
         * private method for update the star,
         * about the star, it's kind of tricky for css/javascript , lol.
         * @param {Object} val the value , 0 ~ 100
         */
        _updateStar:function(val){
             var zcls = this.getZclass() ,
                 stars = jq("."+zcls+"-star-full",this.$n()),
                 fullwidth = 14 ,
                 gap = 20 ;

            /*
             *  maybe i should refactor here .
             *  the base rule is every gap for one star.
             *   20  stars  *
             *   40         **
             *   60         ***
             *   80         ****
             *  100         *****
             *
             *  If they are not divisible with 20 ,
             *  we just count the ratio and set it.
             */
             stars.width(0);
             if(val >= gap )
                 stars.eq(0).width(fullwidth); // a full star is 14 px width.
             if(val >= gap *2 )
                 stars.eq(1).width(fullwidth);
             if(val >= gap *3 )
                 stars.eq(2).width(fullwidth);
             if(val >= gap *4 )
                 stars.eq(3).width(fullwidth);

             if(val >= gap *5 )
                 stars.eq(4).width(fullwidth);
             else
                 stars.eq( zk.parseInt( val / gap ) ).width(
                     fullwidth * ((val % gap) /gap) );

        },
		_updateLabel:function() {
            if(this.desktop){
				if(this._rated){
					this._label.setValue( "Rated: " + this._value + " ( " +this._ratedvalue +" )");	
				}else{
					this._label.setValue( this._value );
				}
            }
		},
        /**
         * private method for manage the state ,
         * we have three state here.
         */
        _changeState:function(state){
        	if(this._mode == "direct"){
                this._slider.setVisible(false);
                this._submitbtn.setVisible(false);
                this._ratebtn.setVisible(false);
                this._label.setVisible(false); 
                return true;
        	}
            if(state == rating.Rating.RATED){
                this._slider.setVisible(false);
                this._submitbtn.setVisible(false);
                this._ratebtn.setVisible(false);
                this._label.setVisible(true);
            }else if(state == rating.Rating.RATING){
                this._slider.setVisible(true);
                this._submitbtn.setVisible(true);
                this._ratebtn.setVisible(false);
                this._label.setVisible(false);
            }else if(state == rating.Rating.WAIT){
                this._slider.setVisible(false);
                this._submitbtn.setVisible(false);
                this._ratebtn.setVisible(true);
                this._label.setVisible(false);
            }else if(state == rating.Rating.READONLY){
                this._slider.setVisible(false);
                this._submitbtn.setVisible(false);
                this._ratebtn.setVisible(false);
                this._label.setVisible(true);				
			}
        }
    },{
        /**
         * some state here .
         * rated when user set ratedvalue
         */
        RATED:"rated",
        /**
         * rating when user click rate this
         */
        RATING:"rating",
        /**
         * when user is not rating, it's waiting state.
         */
        WAIT:"wait",
		READONLY:"readonly"
    });
})();
