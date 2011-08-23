/*
 * Rating.java
 *
 * Purpose:
 *
 * Description:
 *
 * History: 2010/10/13, Created by TonyQ
 *
 * Copyright (C) 2010 Potix Corporation. All Rights Reserved.
 */
package org.zkoss.rating;

import java.io.IOException;

import org.zkoss.rating.event.RatingEvent;
import org.zkoss.zk.au.AuRequest;
import org.zkoss.zk.ui.event.Events;
import org.zkoss.zk.ui.sys.ContentRenderer;
import org.zkoss.zul.impl.XulElement;

/**
 * Write a rating component from Richard's idea and implements.^^;;
 * 
 * @author tony
 * 
 */
public class Rating extends XulElement implements Comparable {

	static {
		addClientEvent(Rating.class, RatingEvent.NAME, 0);
	}

	/**
	 * The value which decide the stars , it's usually to be something like a
	 * statistic value , for example , every rater's average .
	 * 
	 */
	private int _value = -1;

	/**
	 * every single user may vote for their own value , and we will show the
	 * value in view for them .
	 */
	private int _ratedvalue = -1;

	/**
	 * this is for some situation
	 */
	private boolean _rated = false;

	private boolean _readOnly = false;

	/**
	 * The default zclass is "z-rating"
	 */
	public String getZclass() {
		return (this._zclass != null ? this._zclass : "z-rating");
	}

	/**
	 * @Override render the value and readted value to widget.
	 */
	protected void renderProperties(ContentRenderer renderer) throws IOException {
		super.renderProperties(renderer);
		if (_value != -1) {
			render(renderer, "value", "" + _value);
		}

		if (this._readOnly) {
			renderer.render("readOnly", this._readOnly);
		}
	
		if (_ratedvalue != -1) {
			render(renderer, "ratedvalue", "" + _ratedvalue);
			
			if(!this._rated){
				renderer.render("rated", this._rated);
			}
			
		}else if(_rated){
			renderer.render("rated", this._rated);
		}
		
	}

	/**	
	 * 
	 * The value which decide the stars , it's usually to be something like a
	 * statistic value , for example , every rater's average . default is -1.
	 * 
	 * @return
	 */
	public int getValue() {
		return _value;
	}

	/**
	 * set the value
	 * 
	 * @param value
	 */
	public void setValue(int value) {
		if (this._value != value) {
			this._value = value;
			smartUpdate("value", this._value);

		}
	}

	/**
	 * we will handle the rating event. here
	 * 
	 * @Override
	 */
	public void service(AuRequest request, boolean everError) {

		if (RatingEvent.NAME.equals(request.getCommand())) {
			RatingEvent evt = RatingEvent.getRatingEvent(request);

			// if user dont over write the method and write their on value rule,
			// we just use user's rating score to be the value.
			this.setRatedvalue(evt.getValue());
			Events.postEvent(evt);
		} else
			super.service(request, everError);
	}

	/**
	 * Default event handler,we will set rated value here. but developer can
	 * decide to stop the event or not , it's free.
	 * 
	 * @param evt
	 *            the rating event
	 */
	public void onRating(RatingEvent evt) {
		this.setRatedvalue(evt.getValue());
	}

	/**
	 * set user rated value.
	 * 
	 * It will update the stars only if value is empty .
	 * 
	 * @param ratedvalue
	 */
	public void setRatedvalue(int ratedvalue) {
		if (this._ratedvalue != ratedvalue) {
			this._ratedvalue = ratedvalue;
			
			this._rated = true;		
			smartUpdate("ratedvalue", this._ratedvalue);
			if(!this._rated){
				smartUpdate("rated", true);	
			}			
		}
	}

	/**
	 * get user rated value.
	 * 
	 * @return
	 */
	public int getRatedvalue() {
		return _ratedvalue;
	}

	/**
	 * if rated value is setted , rated value will be true. else will be false
	 * 
	 * @return whether rated value is setted
	 */
	public boolean isRated() {
		return _rated;
	}

	/**
	 * for compare to another Rating,we use "value" to compare.
	 */
	public int compareTo(Object arg0) {
		Integer val = Integer.valueOf(this.getValue());
		if (arg0 instanceof Rating) {
			Integer tar = Integer.valueOf(((Rating) arg0).getValue());
			return val.compareTo(tar);
		}
		return val.compareTo(arg0);
	}

	public boolean isReadOnly() {
		return _readOnly;
	}

	public void setReadOnly(boolean readOnly) {
		if (this._readOnly != readOnly) {
			this._readOnly = readOnly;
			smartUpdate("readOnly", readOnly);
		}
	}

	
	public void setRated(boolean _rated) {
		
		if(this._rated != _rated ){
			this._rated = _rated;
			smartUpdate("rated",this._rated );
		}
	}

}
