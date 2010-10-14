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
public class Rating extends XulElement {

	private int _value = 0;

	private int _ratedvalue = -1;

	{
		addClientEvent(Rating.class, "onRating", CE_IMPORTANT | CE_NON_DEFERRABLE);
	}

	/**
	 * this is for some situation
	 */
	private boolean rated = false;

	/**
	 * The default zclass is "z-rating"
	 */
	public String getZclass() {
		return (this._zclass != null ? this._zclass : "z-rating");
	}

	/**
	 * @Override
	 */
	protected void renderProperties(ContentRenderer renderer) throws IOException {
		super.renderProperties(renderer);

		if (_value != 0) {
			render(renderer, "value", "" + _value);
		}
		if (_ratedvalue != 0) {
			render(renderer, "value", "" + _ratedvalue);
		}

	}

	public int getValue() {
		return _value;
	}

	public void setValue(int value) {
		if (this._value != value) {
			this._value = value;
			smartUpdate("value", this._value);

		}
	}

	public void service(AuRequest request, boolean everError) {

		if (RatingEvent.NAME.equals(request.getCommand())) {
			RatingEvent evt = RatingEvent.getRatingEvent(request);
			Events.postEvent(evt);
		} else
			super.service(request, everError);
	}

	public void onRating(RatingEvent evt) {
		this.setRatedvalue(evt.getValue());
	}

	public boolean isRated() {
		return rated;
	}

	public int getRatedvalue() {
		return _ratedvalue;
	}

	public void setRatedvalue(int ratedvalue) {
		if (this._ratedvalue != ratedvalue) {
			this._ratedvalue = ratedvalue;
			smartUpdate("ratedvalue", this._ratedvalue);
		}
	}
}
