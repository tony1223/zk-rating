/*
 * RatingEvent.java
 *
 * Purpose:
 *
 * Description:
 *
 * History: 2010/10/13, Created by TonyQ
 *
 * Copyright (C) 2010 Potix Corporation. All Rights Reserved.
 */
package org.zkoss.rating.event;

import java.util.Map;

import org.zkoss.zk.au.AuRequest;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.event.Event;

/**
 * The event when user rating end , server side will receive the event , and
 * user should decide to update the value for what by themself.
 *
 * Because we didnt know how user want to present the rating , maybe it's a
 * average from database , we dont know .
 *
 * So we ask user to handle this event and decide how it work.
 *
 * @author tony
 *
 */

public class RatingEvent extends Event {

	/**
	 * The Event name is onRating
	 */
	public final static String NAME = "onRating";

	/**
	 * the value for user rated
	 */
	private int _value = 0;

	/**
	 * @param command event name
	 * @param target target component
	 * @param ratingvalue the value for user rated
	 */
	public RatingEvent(String command, Component target, int ratingvalue) {
		super(command, target);
		this._value = ratingvalue;

	}

	/**
	 * get the start/end paramter in the request and build a MoveTabEvent
	 *
	 * @param request
	 * @return
	 */
	public static final RatingEvent getRatingEvent(AuRequest request) {
		final Component comp = request.getComponent();

		final Map data = request.getData();

		if (!data.containsKey("val")) {
			throw new IllegalArgumentException("value wrong.");
		}
		int value = ((Integer) data.get("val")).intValue();
		return new RatingEvent(request.getCommand(), comp, value);
	}

	/**
	 * the value for user rated
	 * @return
	 */
	public int getValue() {
		return _value;
	}

	/**
	 *
	 * @param value
	 */
	public void setValue(int value) {
		this._value = value;
	}
}
