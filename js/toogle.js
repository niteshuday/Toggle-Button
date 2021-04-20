/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var tri_toggle = $.noConflict(true);
var state = 0;	 //State of the button 0 - 1 - 2
var cpos = 3;	 //Initial position of the button
var cpx = [0, 17, 34]; //Positions of the button (left, mid, right)
var button = ["P", "A", "L"]; //Button Value
var color_state = ["#B9DCFF", "#FFFFFF", "#FFC5CB"]; //Colors of [0,1,2]


/**
 * Ready method prepare toogle and add space button to change the attendance.
 * Want to use A,P,L then use tri-toggle-background class
 * Want to use A,P then use double-toggle-background class
 */
tri_toggle(document).ready(function () {
    prepareTriToggleHtml();
    prepareDoubleToggleHtml();
    tri_toggle('div.tri-toggle-background').live("focus keyup", function (e) {
        if (e.keyCode === 32) {
            e.preventDefault();
            tri_toggle("div.tri_selectedDiv").click();
        } else {
            tri_toggle("div").removeClass("tri_selectedDiv");
            var focused = document.activeElement;
            tri_toggle("#" + focused.id).addClass("tri_selectedDiv");
        }
    });
    tri_toggle('div.double-toggle-background').live("focus keyup", function (e) {
        if (e.keyCode === 32) {
            e.preventDefault();
            tri_toggle("div.double_selectedDiv").click();
        } else {
            tri_toggle("div").removeClass("double_selectedDiv");
            var focused = document.activeElement;
            tri_toggle("#" + focused.id).addClass("double_selectedDiv");
        }
    });
    window.onkeydown = function (e) {
        if (tri_toggle(document.activeElement).is(".tri_selectedDiv") || tri_toggle(document.activeElement).is(".double_selectedDiv")) {
            return !(e.keyCode === 32);
        }
    };
});

/**
 * Prepare tri toggle button.
 * @returns {undefined}
 */
function prepareTriToggleHtml() {
    tri_toggle(".tri-toggle-input").each(function () {
        var id = tri_toggle(this).attr('id');
        var value = tri_toggle(this).val();
        if (isEmptyButton(value)) {
            value = button[2];// L
        }
        //Ignore duplicate button
        if (tri_toggle("#tri_toggleDiv" + id).length === 0) {
            tri_toggle("#" + id).attr("tabindex", -1);
            tri_toggle("#" + id).hide();
            var html = '<div class="tri-toggle-background" id="tri_toggleDiv' + id + '" tabindex="0" onclick="triToggleBox(this.id)">';
            html += ' <div class="tri-toggle-circle" id="tri-toggle-circle' + id + '" unselectable="on">' + value + '</div>';
            html += '</div>';
            tri_toggle("#" + id).after(html);
            //Apply button state
            ApplyTriToggleState("tri_toggleDiv" + id);
        }
    });
}
/**
 * toggle div and set state like P,A,L .
 * @param {type} div
 * @returns {undefined}
 */
function ApplyTriToggleState(div) {
    tri_toggle("div").removeClass("tri_selectedDiv");
    var circle = div.replace("tri_toggleDiv", "");
    state = button.indexOf(tri_toggle("#tri-toggle-circle" + circle).html());
    cpos = cpx[state];
    tri_toggle("#tri-toggle-circle" + circle).html(button[state]);
    tri_toggle("#" + circle).val(button[state]);
    tri_toggle("#tri-toggle-circle" + circle).css('margin-left', cpx[state] + "px");
    tri_toggle("#" + div).css('background-color', color_state[state]);
}

/**
 * Update all button with class name and apply all button state.
 * @param {type} className
 * @param {type} inputId
 * @returns {undefined}
 */
function updateToggleByClassName(className, inputId) {
    var value = tri_toggle("#" + inputId).val();
    tri_toggle("." + className).val(value);
    var currentState = button.indexOf(value);
    tri_toggle("." + className).each(function () {
        var id = tri_toggle(this).attr('id');
        ApplyTriToggleStateByState("tri_toggleDiv" + id, currentState);
    });
    tri_toggle("#tri_toggleDiv" + inputId).addClass("tri_selectedDiv");
}
/**
 * apply state by stateId
 * @param {type} div
 * @param {0,1,2} state 0:P,1:A,2:L
 * @returns {undefined}
 */
function ApplyTriToggleStateByState(div, state) {
    tri_toggle("div").removeClass("tri_selectedDiv");
    var circle = div.replace("tri_toggleDiv", "");
    cpos = cpx[state];
    tri_toggle("#tri-toggle-circle" + circle).html(button[state]);
    tri_toggle("#" + circle).val(button[state]);
    tri_toggle("#tri-toggle-circle" + circle).css('margin-left', cpx[state] + "px");
    tri_toggle("#" + div).css('background-color', color_state[state]);
}

/**
 * Make it toogle work with single or multiple.
 * @param {type} div
 * @returns {undefined}
 */
function triToggleBox(div) {
    tri_toggle("div").removeClass("tri_selectedDiv");
    var circle = div.replace("tri_toggleDiv", "");
    tri_toggle("#" + div).addClass("tri_selectedDiv");
    state = button.indexOf(tri_toggle("#tri-toggle-circle" + circle).html());
    if (state === 2) {
        state = 0;
    } else {
        state++;
    }
    cpos = cpx[state];
    tri_toggle("#tri-toggle-circle" + circle).html(button[state]);
    tri_toggle("#" + circle).val(button[state]);
    tri_toggle("#" + circle).change();
    tri_toggle("#tri-toggle-circle" + circle).css('margin-left', cpx[state] + "px");
    tri_toggle("#" + div).css('background-color', color_state[state]);
}
//END Tri toogle button.

/**
 * Start double toogle button methods
 */

/**
 * Prepare Double toggle button.
 * @returns {undefined}
 */
function prepareDoubleToggleHtml() {
    tri_toggle(".double-toggle-input").each(function () {
        var id = tri_toggle(this).attr('id');
        var value = tri_toggle(this).val();
        if (isEmptyButton(value)) {
            value = button[0];
        }
        //Ignore duplicate button
        if (tri_toggle("#double_toggleDiv" + id).length === 0) {
            tri_toggle("#" + id).attr("tabindex", -1);
            tri_toggle("#" + id).hide();
            var html = '<div class="double-toggle-background" id="double_toggleDiv' + id + '" tabindex="0" onclick="DoubleToggleBox(this.id)">';
            html += ' <div class="double-toggle-circle" id="double-toggle-circle' + id + '" unselectable="on">' + value + '</div>';
            html += '</div>';
            tri_toggle("#" + id).after(html);
            //Apply button state
            ApplyDoubleToggleState("double_toggleDiv" + id);
        }
    });
}
/**
 * toggle div and set state like P,A,L .
 * @param {type} div
 * @returns {undefined}
 */
function ApplyDoubleToggleState(div) {
    tri_toggle("div").removeClass("double_selectedDiv");
    var circle = div.replace("double_toggleDiv", "");
    state = button.indexOf(tri_toggle("#double-toggle-circle" + circle).html());
    cpos = cpx[state];
    tri_toggle("#double-toggle-circle" + circle).html(button[state]);
    tri_toggle("#" + circle).val(button[state]);
    tri_toggle("#double-toggle-circle" + circle).css('margin-left', cpx[state] + "px");
    tri_toggle("#" + div).css('background-color', color_state[state]);
}

/**
 * Update all button with class name and apply all button state.
 * @param {type} className
 * @param {type} inputId
 * @returns {undefined}
 */
function updateDoubleToggleByClassName(className, inputId) {
    var value = tri_toggle("#" + inputId).val();
    tri_toggle("." + className).val(value);
    var currentState = button.indexOf(value);
    tri_toggle("." + className).each(function () {
        var id = tri_toggle(this).attr('id');
        ApplyDoubleToggleStateByState("double_toggleDiv" + id, currentState);
    });
    tri_toggle("#double_toggleDiv" + inputId).addClass("double_selectedDiv");
}
/**
 * apply state by stateId
 * @param {type} div
 * @param {0,1,2} state 0:P,1:A,2:L
 * @returns {undefined}
 */
function ApplyDoubleToggleStateByState(div, state) {
    tri_toggle("div").removeClass("double_selectedDiv");
    var circle = div.replace("double_toggleDiv", "");
    cpos = cpx[state];
    tri_toggle("#double-toggle-circle" + circle).html(button[state]);
    tri_toggle("#" + circle).val(button[state]);
    tri_toggle("#double-toggle-circle" + circle).css('margin-left', cpx[state] + "px");
    tri_toggle("#" + div).css('background-color', color_state[state]);
}

/**
 * Make it toogle work with single or multiple.
 * @param {type} div
 * @returns {undefined}
 */
function DoubleToggleBox(div) {
    tri_toggle("div").removeClass("double_selectedDiv");
    var circle = div.replace("double_toggleDiv", "");
    tri_toggle("#" + div).addClass("double_selectedDiv");
    state = button.indexOf(tri_toggle("#double-toggle-circle" + circle).html());
    if (state === 1) {
        state = 0;
    } else {
        state++;
    }
    cpos = cpx[state];
    tri_toggle("#double-toggle-circle" + circle).html(button[state]);
    tri_toggle("#" + circle).val(button[state]);
    tri_toggle("#" + circle).change();
    tri_toggle("#double-toggle-circle" + circle).css('margin-left', cpx[state] + "px");
    tri_toggle("#" + div).css('background-color', color_state[state]);
}
//End double toogle button
/**
 * Chack is empty method.
 * @param {type} txt
 * @returns {Boolean}
 */
function isEmptyButton(txt) {
    if (txt === undefined) {
        return true;
    }
    if (txt === null || txt === 'null' || txt.toString().trim() === '') {
        return true;
    }
    return  false;
}

