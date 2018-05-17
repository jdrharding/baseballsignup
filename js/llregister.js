$(document).ready(function() {
    $('#ll_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            league: {
                validators: {

                }
            },
            first_name: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please provide your first name'
                    }
                }
            },
            last_name: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please provide your last name'
                    }
                }
            },
            address: {
                validators: {
                    stringLength: {
                        min: 10,
                    },
                    notEmpty: {
                        message: 'Please provide your street address'
                    }
                }
            }
        }        
    })
});