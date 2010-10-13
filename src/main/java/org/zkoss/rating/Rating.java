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

import org.zkoss.zk.ui.sys.ContentRenderer;
import org.zkoss.zul.impl.XulElement;

/**
 * Write a rating component from Richard's idea and implements.^^;;
 * @author tony
 *
 */
public class Rating extends XulElement {

	private int _value = 0;

	private int _steps = 100;

	/**
	 * this is for some situation
	 */
	private boolean rated = false;

	/**
	 * toggle editing or displaying
	 */
	private boolean editing = false;
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

		if (_steps != 100) {
			render(renderer, "steps", "" + _steps);
		}

	}

	public int getValue() {
		return _value;
	}

	public void setValue(int value) {
		this._value = value;
	}

	public int getSteps() {
		return _steps;
	}

	public void setSteps(int steps) {
		this._steps = steps;
	}


	public boolean isEditing() {
		return editing;
	}


	public void setEditing(boolean edit) {
		this.editing = edit;
	}


	public boolean isRated() {
		return rated;
	}
}
