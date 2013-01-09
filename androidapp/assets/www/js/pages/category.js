//createSpinner("res/lib/jquerymobile/images/ajax-loader.gif");

$("#category").die("pageshow").live("pageshow", function (event, ui) {
    clearCategories();
});

$("#category").die("pageinit").live("pageinit", function (event, ui) {
    $('#registerButton').click(function () {
        blockUnblock(true);
        $.mobile.changePage($("#reportDialog"));
    });

    $('#unregisterButton').click(function () {
        blockUnblock(false);
        $.mobile.changePage($("#reportDialog"));
    });

    $('input[name="category"]').click(function () {
        if ($(this).is(':checked')) {
            checkCategory();
        } else {
            uncheckCategory();
        }
    });

    $('#selectAllCategory').click(function () {
        checkUncheckAllCategories();
    });
});

function checkCategory() {
    $('#registerButton').removeClass('ui-disabled');
    $('#unregisterButton').removeClass('ui-disabled');
    var allChecked = true;
    $('input[name="category"]').each(function () {
        if (allChecked) {
            allChecked = $(this).is(':checked');
        }
    });
    if (allChecked) {
        $('#selectAllCategory').attr('checked', true);
        $('#selectAllCategory').checkboxradio('refresh');
    }
}

function uncheckCategory() {
    $('#selectAllCategory').attr('checked', false);
    $('#selectAllCategory').checkboxradio('refresh');
    var allUnchecked = true;
    $('input[name="category"]').each(function () {
        if (allUnchecked) {
            allUnchecked = !$(this).is(':checked');
        }
    });
    if (allUnchecked) {
        $('#registerButton').addClass('ui-disabled');
        $('#unregisterButton').addClass('ui-disabled');
    }
}

function checkUncheckAllCategories() {
    $('input[name="category"]').attr({checked:$('#selectAllCategory').is(':checked')});
    $('input[name="category"]').checkboxradio("refresh");
    if ($('#selectAllCategory').is(':checked')) {
        $('#registerButton').removeClass('ui-disabled');
        $('#unregisterButton').removeClass('ui-disabled');
    } else {
        $('#registerButton').addClass('ui-disabled');
        $('#unregisterButton').addClass('ui-disabled');
    }
}

function clearCategories() {
    $('#selectAllCategory').attr('checked', false);
    $('#selectAllCategory').checkboxradio('refresh');

    $('input[name="category"]').each(function () {
        $(this).attr('checked', false);
    });
    $('input[name="category"]').checkboxradio('refresh');

    $('#registerButton').addClass('ui-disabled');
    $('#unregisterButton').addClass('ui-disabled');
}

function blockUnblock(isRegister) {
    var smsText = isRegister ? "START " : "STOP ";
    var values = [];
    var isAllChecked = false;
    $("input:checkbox").each(function () {
        if ($(this).is(':checked')) {
            values.push($(this).val());
            if ($(this).val() == "0") {
                isAllChecked = true;
            }
        }
    });
    if (isAllChecked) {
        smsText = isRegister ? "STOP " : "START ";
    }
    smsText = isAllChecked ? smsText + "0" : smsText + values.toString();
    moonwalkerStorage.setItem("sendingSmsText", smsText);
}