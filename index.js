// ======================= GLOBAL VAR ==============================
var numbers = {
    'bill': 0,
    'people': 0
}
var tipPercent = 0;

// condition checks for calculation
var bothNumbersFilled = false;
var tipPercentChosen = false;



// ======================= DETECT CHANGES ==============================
// detect changes in Bill 
$('.bill .number').on('keydown', function(){
    setTimeout(() => {
        // printInput($(this));
        changeNumbers(Number($(this).val()), 'bill');
    }, 1);
    
    // function printInput($input) {
    //     console.log($input.val());
    // }
});

// detect changes in People
$('.people .number').on('keydown', function(){
    setTimeout(() => {
        changeNumbers(Number($(this).val()), 'people');
    }, 1);
    
});

function changeNumbers(new_val, key) {
    isEntry = Object.keys(numbers).includes(key);
    if (!isEntry) {
        console.log('ERROR: valueName not included');
    }
    
    if(isNaN(new_val)) {
        // console.log('ERROR: NaN received');
    }
    numbers[key] = new_val;
}


// detect tip-button click
$('.tip-button .tip-percent').click(function () { 
    newTipPercent = $(this).text();
    newTipPercent = newTipPercent.substr(0, newTipPercent.length-1);

    tipPercent = newTipPercent / 100;
    
    tipPercentChosen = true;
    
    $('.custom-tip-input').val('');
});

// custom tip-button 
$('.custom-tip-input').on('keydown', function(){
    setTimeout(() => {
        custom_tip = Number($(this).val());
        if (custom_tip > 0) {
            tipPercent = custom_tip;
            tipPercentChosen = true;
        } else {
            tipPercentChosen = false;
        }
    }, 1);
});


// RESET button click
$('.reset-button').click(function(){
    bothNumbersFilled = false;
    tipPercentChosen = false;
    numbers['bill'] = 0;
    numbers['people'] = 0;
    tipPercent = 0;
    
    $('.number').each(function(index){
        if (index <= 1) {
            $(this).val('');
        } else {
            $(this).text('$0.00');
        }
    });
    $('.custom-tip-input').val('');
    
    $('.tip-button').removeClass('tip-button-clicked');
    $('.tip-button').addClass('tip-button-unclicked');
    
    $('.reset-button').removeClass('reset-button-on');
    $('.reset-button').addClass('reset-button-off');
});






// ###################### OUTLINES ########################

$('.people .number, .bill .number').on('focus focusout', function(){
    $(this).parent('.number-shower').toggleClass('number-shower-focused');
});

$('.custom-tip-input').on('focus focusout', function(){
    $(this).parent().toggleClass('number-shower-focused'); 
});

$('.people .number').on('keydown', function(){
    setTimeout(() => {
        if (Number($(this).val()) === 0) {
            $(this).parent('.number-shower').addClass('number-shower-invalid-input');
            console.log($(this).val());
        } else {
            $(this).parent('.number-shower').removeClass('number-shower-invalid-input');
        }
    }, 1);
});

$('.people .number').on('focusout', function(){
    if ($(this).val() == "") {
        $(this).parent('.number-shower').removeClass('number-shower-invalid-input');
    } 
});


// ##################### BUTTON CLICK #######################

let prevClickedButton = null;
$('.tip-button').click(function() {
    let clickedButton = $(this);
    $('.tip-button').each(function(index){
        if ($('.tip-button').index(clickedButton) !== index) {
            $(this).removeClass('tip-button-clicked');
            $(this).addClass('tip-button-unclicked');
        }
    });
    $(this).toggleClass('tip-button-clicked');
    $(this).toggleClass('tip-button-unclicked');
})

$('.custom-tip-button').click(function() {
    $('.tip-button').each(function(index){
        $(this).removeClass('tip-button-clicked');
        $(this).addClass('tip-button-unclicked');
    });
});







// ===================== CALCULATION ==========================

// check if calculation is ready
$('.people .number, .bill .number').on('keydown', function(){
    setTimeout(() => {
        checkNumberFilled();
        if (bothNumbersFilled && tipPercentChosen) {
            calculateBill();
        }
    }, 1);
});

$('.tip-button .tip-percent').click(function () { 
    checkNumberFilled();
    if (bothNumbersFilled && tipPercentChosen) {
        calculateBill();
    }
});

$('.custom-tip-input').on('keydown', function(){
    setTimeout(() => {
        checkNumberFilled();
        if (bothNumbersFilled && tipPercentChosen) {
            calculateBill();
        }
    }, 1);
})


function checkNumberFilled() {
    var bothFilled = true; 
    var resetAvailable = false;
    
    $('.left-pannel .number').each(function(index) {
        if ($(this).val() === "") { // both fields empty
            bothFilled = false;
        } else { 
            resetAvailable = true;
            
            if (Number($(this).val()) === 0) { 
                classList = $(this).parent().attr('class').split(' ');
                if (classList.includes('people')) { // if people number is 0 (division by 0)
                    bothFilled = false;
                }
            }
        }
    });
    bothNumbersFilled = bothFilled;
    
    
    setTimeout(() => {
        if ($(".tip-button-clicked")[0]) {
            index = $(".tip-button-clicked").index('.tip-button');
            console.log('index of on button: '+index);
            resetAvailable = true;
        } else {
            // console.log('does not exist');
        }
        
        if (resetAvailable) {
            $('.reset-button').removeClass('reset-button-off');
            $('.reset-button').addClass('reset-button-on');
        } else {
            $('.reset-button').removeClass('reset-button-on');
            $('.reset-button').addClass('reset-button-off');
        }
    }, 1);
}

function calculateBill() {
    if (tipPercent === 0) {
        return;
    }
    bill = numbers['bill'];
    people = numbers['people'];
    tipAmount = bill*tipPercent / people;
    total = bill / people;
    
    $('.right-pannel .number').each(function(index){
        if (index == 0) {
            $(this).text('$'+tipAmount.toFixed(2));
        } else if (index == 1){
            $(this).text('$'+total.toFixed(2));
        }
    });
}


