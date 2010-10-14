/* rating.js

	Purpose:   To render the html with swifttab , support movable / closable feature.

	Description:

	History:
		2010/10/13, Created by TonyQ

Copyright (C) 2010 Potix Corporation. All Rights Reserved.

*/
function (out) {
	var zcls = this.getZclass();

	out.push('<div ', this.domAttrs_(), '><div class="',zcls,'-stars">');
    for (var i = 0; i < 5; ++i) {
        out.push('<div class="', zcls, '-star-empty"></div>',
            '<div class="', zcls, '-star-full"></div>');
    }
    out.push('<span style="clear:both;">&nbsp;</span></div>');

    for (var w = this.firstChild; w; w = w.nextSibling)
    			w.redraw(out);
    out.push('</div');

}