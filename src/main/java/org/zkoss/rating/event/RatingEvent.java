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
 * trigger when tab is moved by user's dragging.
 */
public class RatingEvent extends Event {

	public final static String NAME = "onRating";

	public RatingEvent(String command, Component target) {
		super(command, target);

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

		/*
		 * if (startIndex == -1 || endIndex == -1) { throw new
		 * IllegalArgumentException("startIndex/endIndex wrong."); }
		 */

		return new RatingEvent(request.getCommand(),comp);
	}
}
