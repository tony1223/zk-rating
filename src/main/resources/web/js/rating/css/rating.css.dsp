<%--
rating.css.dsp

	Purpose:

	Description:

	History:
		2010/10/13, Created by TonyQ

Copyright (C) 2010 Potix Corporation. All Rights Reserved.

This program is distributed under GPL Version 3.0 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
--%><%@ taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" %>

.z-rating{
	width: 85px;
	text-align:center;
}
.z-rating-star-empty,.z-rating-star-full{
	float:left;
}
.z-rating-stars{
	width: 75px;
	padding-left:5px;
	position:relative;
	height:14px;
	overflow:hidden;
}
.z-rating-star-empty{
    width:14px;
    height:14px;
    display:block;
    background:url('${c:encodeURL('~./img/rating/star-empty.png')}');
}
.z-rating-star-full{
    display:block;
    width:0px;
    height:14px;
    position:absolute;
    background:url('${c:encodeURL('~./img/rating/star-full.png')}');
}