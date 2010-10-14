/* Rating.js
 *
	Purpose: To provide a movable and lighter tab.

	Description:

	History:
		2010/10/13, Created by TonyQ

 Copyright (C) 2010 Potix Corporation. All Rights Reserved.
 */
(function(){

    rating.Rating = zk.$extends(zk.Widget, {
        _ratingtmp:0,
        _rated:false,
        $define:{
            ratedvalue:function(val){
                if(this.$n()){
                    this._label.setValue("You rated this: "+val+"/100");
                }
                _rated = true;

                if (this._value == -1 ){
                    this.setValue(this._ratedvalue);
                }
                this._updatestate( rating.Rating.RATED );

            },
            value:function(val){
                if (this.$n()) {
                    this._updateStar(val);
                }
            }
        },
        _updatestate:function(state){
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
            }
        },
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

            this._updatestate(rating.Rating.WAIT);
        },
        doRating_:function(){
            this._ratingtmp = this._ratedvalue == -1 ? this._value : this._ratedvalue ;
            this._updatestate(rating.Rating.RATING);
            //@TODO check if here needs a rating start event
        },
        bind_: function(desktop, skipper, after){
            this.$supers(rating.Rating, 'bind_', arguments);

            var stars = jq("."+ this.getZclass() +"-star-full",this.$n());
            stars.each(function(){
               jq(this).css("left", jq(this).prev().position().left);
            });

            this.domListen_(this._ratebtn.$n(),"onClick","doRating_");
            this.domListen_(this._submitbtn.$n(),"onClick","doRatingEnd_");
            this._slider.listen({onScroll:[this,this.doRatingScroll_]});

        },
        doRatingScroll_:function(){
            this._ratingtmp = this._slider.getCurpos();
            this._updateStar(this._ratingtmp);

            //@TODO check if here needs a rating start event
        },
        doRatingEnd_:function(){
            this._updateStar(this._value);
            this.fire("onRating",{ val: this._ratingtmp });
        },
        _updateStar:function(val){
             var zcls = this.getZclass();
             var stars = jq("."+zcls+"-star-full",this.$n());
             stars.width(0);
             if(val >= 20 )
                 stars.eq(0).width(14);
             if(val >= 40 )
                 stars.eq(1).width(14);
             if(val >= 60 )
                 stars.eq(2).width(14);
             if(val >= 80 )
                 stars.eq(3).width(14);

             if(val >= 100 )
                 stars.eq(4).width(14);
             else
                 stars.eq( zk.parseInt(val/20) ).width(14 * ((val%20) /20) );

        },
        unbind_: function(){
            this.$supers(rating.Rating, "unbind_", arguments);
        },
        getZclass: function(){
            return (this._zclass != null ? this._zclass : "z-rating");
        }

    },{
        RATED:"rated",
        RATING:"rating",
        WAIT:"wait"
    });
})();
