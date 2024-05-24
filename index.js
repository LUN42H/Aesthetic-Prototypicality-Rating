// Yi-Chia Chen


// ######## ##     ## ########  ########
// ##        ##   ##  ##     ##    ##
// ##         ## ##   ##     ##    ##
// ######      ###    ########     ##
// ##         ## ##   ##           ##
// ##        ##   ##  ##           ##
// ######## ##     ## ##           ##

//$('#practiceBox').show();

const FORMAL = false;
const EXPERIMENT_NAME = 'SVRT4';
const SUBJ_NUM_FILE = 'subjNum_' + EXPERIMENT_NAME + '.txt';
const TRIAL_FILE = 'trial_' + EXPERIMENT_NAME + '.txt';
const SUBJ_FILE = 'subj_' + EXPERIMENT_NAME + '.txt';
const VISIT_FILE = 'visit_' + EXPERIMENT_NAME + '.txt';
const ATTRITION_FILE = 'attrition_' + EXPERIMENT_NAME + '.txt';
const PLEDGE_FILE = 'pledge_' + EXPERIMENT_NAME + '.txt';
const SAVING_SCRIPT = 'save.php';
const SAVING_DIR = FORMAL ? 'data/formal' : 'data/testing';
const ID_GET_VARIABLE_NAME = 'sonacode';
const FREE_PASS_ID = '1234'; // this is used for testing so this id will always have future access regardless of pledge responses
const REDIRECT_LINK = 'https://ucla.sona-systems.com/webstudy_credit.aspx?experiment_id=1951&credit_token=72ed812a01a64c25ba7396d105281efb&survey_code=';
const MAX_RATING_Q = 6;

const IMG_Path = 'stimuli/images/';
const IMG_FILE = '.jpg';
const IMG_SET = ['1', '2', '3', '4', '5', '6'];
TRIAL_NUM = 0;        

const CAUSAL_CONTEXT_COUNTERBALANCE = [[causal_context1, causal_context2, associative_context3, associative_context4],
[associative_context3, associative_context4, causal_context1, causal_context2],
[associative_context1, associative_context2, causal_context3, causal_context4],
[causal_context3, causal_context4, associative_context1, associative_context2],]

var CAUSAL_CONTEXT = [causal_context1, causal_context2, causal_context3, causal_context4];
if (FORMAL) {
    const INDEX = getRandomInt(CAUSAL_CONTEXT_COUNTERBALANCE.length);
    CAUSAL_CONTEXT = CAUSAL_CONTEXT_COUNTERBALANCE[INDEX];
}

const VIEWPORT_MIN_W = 800;
const VIEWPORT_MIN_H = 600;
const INSTR_READING_TIME_MIN = 0.5;
const STIM_PATH = "Stimuli\\";


// STIMULI & TRIAL
practice = true;
likability = false;
prototypicality = false;
const CATEGORY_NUM = 2; // should be 50 in real experiment
CATEGORY_BLOCK_INDEX = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleTwo(array, array2) {
    var counter = array.length, temp, temp2, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        temp2 = array2[counter];

        array[counter] = array[index];
        array2[counter] = array2[index];

        array[index] = temp;
        array2[index] = temp2;
    }
}
  
arrayOfStrings = [];
for (let i = 1; i <= CATEGORY_NUM; i++) {
    for (let k = 1; k<=6; k ++) {
        arrayOfStrings.push(String(i));
    }
}

arrayOfStringsBlock = [];
for (let f = 1; f <= CATEGORY_NUM; f++) {
    arrayOfStringsBlock.push(String(f));
}
  
originalArray = ["bird", "snake", "gun", "earring", "flower", "insect"];
multipliedArray = Array.from({ length: CATEGORY_NUM }, () => originalArray).flat();

SHUFFLED_PRACTICE = shuffleArray(originalArray);
SHUFFLED_CATEGORY = multipliedArray;
SHUFFLED_INDEX = arrayOfStrings;
SHUFFLED_CATEGORY_BLOCK = shuffleArray(originalArray);
SHUFFLED_INDEX_BLOCK = shuffleArray(arrayOfStringsBlock);
shuffleTwo(SHUFFLED_CATEGORY, SHUFFLED_INDEX);

$('#img0').attr('src', IMG_Path + 'practice/' + SHUFFLED_PRACTICE[TRIAL_NUM] + IMG_FILE);
$('#titleText').html("Please rate how good the " + SHUFFLED_PRACTICE[TRIAL_NUM] + " looks");

PRELOAD_IMG(SHUFFLED_CATEGORY, SHUFFLED_INDEX);

PRACTICE_TRIAL_N = 6;
TRIAL_N = 600;
PRACTICE_LIST = SHUFFLED_PRACTICE;

// OBJECT VARIABLE
var instr, subj, trial;


// ########  ########    ###    ########  ##    ##
// ##     ## ##         ## ##   ##     ##  ##  ##
// ##     ## ##        ##   ##  ##     ##   ####
// ########  ######   ##     ## ##     ##    ##
// ##   ##   ##       ######### ##     ##    ##
// ##    ##  ##       ##     ## ##     ##    ##
// ##     ## ######## ##     ## ########     ##

$(document).ready(function () {
    subj = new subjObject(subj_options); // getting subject number
    subj.id = subj.getID(ID_GET_VARIABLE_NAME);
    subj.saveVisit();

    instr = new instrObject(instr_options);
    //trial_options["subj"] = subj;
    trial = new trialObject(trial_options);
    instr.start();

    if (subj.phone) {
        $('#instrText').html('It seems that you are using a touchscreen device or a phone. Please use a laptop or desktop instead.<br /><br />If you believe you have received this message in error, please contact the experimenter at fushuhao@ucla.edu<br /><br />Otherwise, please switch to a laptop or a desktop computer for this experiment.');
        $('#nextButton').hide();
        $('#instrBox').show();
    } else if (subj.id !== null) {
        $('#pledgeBox').show();
    } else {
        // $('#instrText').html("We can't identify a valid ID. Please reopen the study from the sona website again. Thank you!");
        // $('#nextButton').hide();
        // $('#instrBox').show();
        $('#pledgeBox').show();
    }
    $('#pledgeBox').hide();
});


//  ######  ##     ## ########        ## ########  ######  ########
// ##    ## ##     ## ##     ##       ## ##       ##    ##    ##
// ##       ##     ## ##     ##       ## ##       ##          ##
//  ######  ##     ## ########        ## ######   ##          ##
//       ## ##     ## ##     ## ##    ## ##       ##          ##
// ##    ## ##     ## ##     ## ##    ## ##       ##    ##    ##
//  ######   #######  ########   ######  ########  ######     ##

const SUBJ_TITLES = ['num',
    'date',
    'startTime',
    'id',
    'userAgent',
    'endTime',
    'duration',
    'instrQAttemptN',
    'instrReadingTimes',
    'quickReadingPageN',
    'hiddenCount',
    'hiddenDurations',
    'serious',
    'problems',
    'gender',
    'age',
    'inView',
    'viewportW',
    'viewportH'
];

function AJAX_FAILED() {
    $('.pageBox').hide();
    $('#instrText').html('Oops! An error has occurred. Please contact the experiment fushuhao@ucle.edu with the code "CAPTCHA_AJAX_ERR". Sorry!');
    $('#nextButton').hide();
    $('#instrBox').show();
}

function SUBMIT_PLEDGE_Q(p_idx) {
    var pledge_response = $('input[name=pledge]:checked').val();
    var responded = CHECK_IF_RESPONDED([], [pledge_response]);
    if (responded) {
        $('#pledgeBox').hide();
        $('#pledgeBox2').hide();
        if (pledge_response == 1) {
            if (p_idx == '1') {
                NEXT_PLEDGE();
            } else {
                ACCEPT_PLEDGE();
            }
        } else {
            REFUSE_PLEDGE(p_idx);
        }
    } else {
        $('#pledgeQWarning').text('Please answer the question to start the experiment. Thank you!');
    }
}

function NEXT_PLEDGE() {
    $('input[name=pledge]:checked').prop('checked', false);
    $('#pledgeBox2').show();
}

function REFUSE_PLEDGE(p_idx) {
    if (p_idx == '1') {
        $('#instrText').html('It seems that you have reported that you will not read the instructions carefully. In that case, you will not be fully informed and thus we are not allowed to let you participate because of the ethical concerns.<br /><br /> We are sorry that we have to ask you to cancel your sign-up.');
    } else {
        $('#instrText').html('It seems that you have reported that you would not like to share anonymous data with the research team. In that case, we are not allowed to let you participate because of the ethical concerns.<br /><br /> We are sorry that we have to ask you to cancel your sign-up.');
    }
    $('#nextButton').hide();
    $('#instrBox').show();
}

function HANDLE_VISIBILITY_CHANGE() {
    if (document.hidden) {
        subj.hiddenCount += 1;
        subj.hiddenStartTime = Date.now();
    } else {
        subj.hiddenDurations.push((Date.now() - subj.hiddenStartTime) / 1000);
    }
}

function SUBMIT_DEBRIEFING_Q() {
    subj.serious = $('input[name=serious]:checked').val();
    subj.problems = $('#problems').val();
    subj.gender = $('input[name=gender]:checked').val();
    subj.age = $('#age').val();
    var open_ended_attribute_names = ['age', 'problems'];
    var open_ended_list = [subj.age, subj.problems];
    var choice_list = [subj.serious, subj.gender];
    var all_responded = CHECK_IF_RESPONDED(open_ended_list, choice_list);
    if (all_responded) {
        for (var i = 0; i < open_ended_attribute_names.length; i++) {
            subj[open_ended_attribute_names[i]] = subj[open_ended_attribute_names[i]].replace(/(?:\r\n|\r|\n)/g, '<br />');
        }
        subj.instrQAttemptN = instr.qAttemptN['onlyQ'];
        subj.instrReadingTimes = JSON.stringify(instr.readingTimes);
        subj.quickReadingPageN = Object.values(instr.readingTimes).filter(d => d < INSTR_READING_TIME_MIN).length;
        subj.submitQ();
        $('#questionsBox').hide();
        ALLOW_SELECTION();
        $('#debriefingBox').show();
        $('html')[0].scrollIntoView();
    } else {
        $('#QWarning').text('Please answer all the questions. Thank you!');
    }
}

function END_TO_PROLIFIC() {
    window.location.href = REDIRECT_LINK + subj.id;
}

function ALLOW_SELECTION() {
    $('body').css({
        '-webkit-user-select': 'text',
        '-moz-user-select': 'text',
        '-ms-user-select': 'text',
        'user-select': 'text'
    });
}

var subj_options = {
    subjNumFile: SUBJ_NUM_FILE,
    titles: SUBJ_TITLES,
    viewportMinW: VIEWPORT_MIN_W,
    viewportMinH: VIEWPORT_MIN_H,
    savingScript: SAVING_SCRIPT,
    visitFile: VISIT_FILE,
    attritionFile: ATTRITION_FILE,
    subjFile: SUBJ_FILE,
    savingDir: SAVING_DIR,
    handleVisibilityChange: HANDLE_VISIBILITY_CHANGE
};


// #### ##    ##  ######  ######## ########
//  ##  ###   ## ##    ##    ##    ##     ##
//  ##  ####  ## ##          ##    ##     ##
//  ##  ## ## ##  ######     ##    ########
//  ##  ##  ####       ##    ##    ##   ##
//  ##  ##   ### ##    ##    ##    ##    ##
// #### ##    ##  ######     ##    ##     ##

var instr_text = new Array;
instr_text[0] = 'Welcome! <br><br>Thank you for agreeing to participate in the study. The whole study takes no more than 60 minutes to complete. Please read the instructions carefully, and avoid using the refresh or back buttons.';
instr_text[1] = 'The webpage will switch to the full-screen view on the next page.';
instr_text[2] = 'Please stay in the full screen mode until the study automatically switches out from it.';
instr_text[3] = 'This study has two parts. I will explain how they work at the start of each part.';
instr_text[4] = 'For the first part, you will view images, one at a time. The images will depict birds, snakes, flowers, insects, guns, or earrings.';
instr_text[5] = 'I am interested in how aesthetically pleasing you find each depicted item or animal to be. In other words, you will share how good the depicted item/animal looks to you.';
instr_text[6] = 'You will rate your impression on a scale of 1 to 6, with 1 being not good at all, and 6 being extremely good. Let\'s try a few examples on the next page.';
instr_text[7] = '';
instr_text[8] = 'Note that we are asking you to rate the depicted items/animals, and NOT the images. Please do your best to NOT consider the background or the way the images were taken. Thus, an image of a centered item with a nice background should receive the same rating as a weirdly framed image of the same item with a less ideal background.';
instr_text[9] = "Ready? You can press SPACE to start.<br /><br />Please focus after you start (Don't switch to other windows or tabs!)";
instr_text[10] = "You have completed the first part of the experiment!<br /><br />For the second part, you will view the images you’ve seen earlier once again. This time, you will see each category of item/animal consecutively (e.g., you will see all birds consecutively). ";
instr_text[11] = "Your job this time is to rate your impression of how typical each item is as a member of its kind (i.e., as birds, snakes, flowers, insects, guns, or earrings).<br /><br />For example, let’s consider the fruit category. An apple might be a typical fruit to you, so you may give it a high rating. An avocado might be less typical, so you may give it a low rating. (There will NOT actually be a fruit category. This is just an example.) ";
instr_text[12] = "Again, we are asking you to rate the depicted items/animals, and NOT the images. Thus, please do NOT consider the way the images were taken, so a normal image of an apple should receive the same rating as a weirdly cropped image of the same apple.";
instr_text[13] = "Also, please rate how typical an item/animal looks as a member of its kind in general (i.e., NOT just among the examples you’ve seen in this study).";
instr_text[14] = "Ready? Press the SPACE key to start!";

const INSTR_FUNC_DICT = {
    2: SHOW_MAXIMIZE_WINDOW,
    3: HIDE_INSTR_IMG,
    7: SHOW_PRACTICE_TRIAL,
    9: SHOW_CONSENT,
    14: SHOW_SECOND_PART
};

function SHOW_PRACTICE_TRIAL() {
    $('#nextButton').hide();
    $('#practiceBox').show();
    TRIAL_NUM = 0;
}

function SHOW_PROTOTYPE() {
    $('#nextButton').hide();
    $('#practiceBox').show();
    TRIAL_NUM = 0;
    $('#img0').attr('src', IMG_Path + SHUFFLED_CATEGORY_BLOCK[CATEGORY_BLOCK_INDEX] + '\\'+ SHUFFLED_CATEGORY_BLOCK[CATEGORY_BLOCK_INDEX] + SHUFFLED_INDEX_BLOCK[TRIAL_NUM] + IMG_FILE);
    $('#titleText').html("Please rate how typical the " + SHUFFLED_CATEGORY_BLOCK[CATEGORY_BLOCK_INDEX] + " looks");
}

function SHOW_INSTR_IMG(file_name) {
    $('#instrImg').attr('src', STIM_PATH + file_name);
    $('#instrImg').css('display', 'block');
    enter_fullscreen();
}

function HIDE_INSTR_IMG() {
    $('#instrImg').css('display', 'none');
}

function SHOW_MAXIMIZE_WINDOW() {
    SHOW_INSTR_IMG('maximize_window.png');
}

function SHOW_INSTR_QUESTION() {
    $('#instrBox').hide();
    $('#instrQBox').show();
}

function SUBMIT_INSTR_Q() {
    let l1 = document.getElementById("option1").checked;
    let l2 = document.getElementById("option2").checked;
    let l3 = document.getElementById("option3").checked;
    let l4 = document.getElementById("option4").checked;
    let fg = document.getElementById("forget").checked;
    if (!l1 && !l2 && !l3 && !l4 && !fg) {
        $('#instrQWarning').text('Please answer the question. Thank you!');
    } else if (l1 && l2 && l3 && !l4 && !fg) {
        instr.saveReadingTime();
        instr.next();
        $('#instrQBox').hide();
        $('#instrBox').show();
    } else {
        instr.qAttemptN['onlyQ'] += 1;
        instr.saveReadingTime();
        $('#instrText').html('You have given an incorrect answer. Please read the instructions again carefully.');
        instr.index = -1;
        $('#instrBox').show();
        $('#instrQBox').hide();
        $('input[name="instrQ"]:checked').prop('checked', false);
    }
}

function SHOW_CONSENT() {
    $('#instrQBox').hide();
    $('#nextButton').hide();
    $('#consentBox').show();
    $('#instrBox').show();
    $(document).keyup(function (e) {
        if (e.which == 32) { // the 'space' key
            $(document).off('keyup');
            instr.saveReadingTime();
            $('#instrBox').hide();
            $('#consentBox').hide();
            subj.saveAttrition();
            SHOW_TRIALS();
        }
    });
    RESET();
}

function SHOW_SECOND_PART() {
    $('#nextButton').hide();
    $(document).keyup(function (e) {
        if (e.which == 32) { // the 'space' key
            $(document).off('keyup');
            instr.saveReadingTime();
            $('#instrBox').hide();
            SHOW_PROTOTYPE();
        }
    });
}

var instr_options = {
    text: instr_text,
    funcDict: INSTR_FUNC_DICT,
    qConditions: ['onlyQ']
};


// ######## ########  ####    ###    ##
//    ##    ##     ##  ##    ## ##   ##
//    ##    ##     ##  ##   ##   ##  ##
//    ##    ########   ##  ##     ## ##
//    ##    ##   ##    ##  ######### ##
//    ##    ##    ##   ##  ##     ## ##
//    ##    ##     ## #### ##     ## ########

const TRIAL_TITLES = [
    "subjNum",
    "subjStartDate",
    "subjStartTime",

    "categoryName",
    "categoryIndex",

    "trialNum",
    "ratingLike",
    "ratingTypical",

    "inView",
    "startTime",
    "respondTime",
    "rt",
];

var base_image, offsetX, offsetY, answers;
var question_index = 0;

function SHOW_TRIALS() {
    //trial.run();
    subj.detectVisibilityStart();
    trial.startTime = Date.now();
    $('#practiceBox').show();
}


function CONTEXT_Q(question, choices, cur_answers) {
    document.getElementById("contextQ").innerHTML = question;
    document.getElementById("op1_text").innerHTML = choices[0];
    document.getElementById("op2_text").innerHTML = choices[1];
    document.getElementById("op3_text").innerHTML = choices[2];
    document.getElementById("op4_text").innerHTML = choices[3];
    cur_answers.sort(function (a, b) { return a - b });
    answers = ""
    for (let i = 0; i < cur_answers.length; i++) {
        answers = answers + "op" + cur_answers[i].toString();
    }
    $('#textBox').hide();
    $('#contextQBox').show();
}

function SHOW_CONTEXT_Q() {
    $('#textBox').hide();
    if (question_index >= 2) {
        question_index = 0;
        start(trial.context);
    } else {
        CONTEXT_Q(trial.context.questions[question_index], trial.context.choices[question_index], trial.context.answers[question_index]);
    }
}


function getCheckboxValue() {
    var l1 = document.getElementById("op1");
    var l2 = document.getElementById("op2");
    var l3 = document.getElementById("op3");
    var l4 = document.getElementById("op4");
    var fg = document.getElementById("fg");

    if (fg.checked === true) {
        return 'fg';
    }

    var res = "";
    if (l1.checked === true) {
        res = "op1";
    }
    if (l2.checked === true) {
        res = res + "op2";
    }
    if (l3.checked === true) {
        res = res + "op3";
    }
    if (l4.checked === true) {
        res = res + "op4";
    }

    return res;
}

function SUBMIT_CONTEXT_Q() {
    // var contextChoice = $('input[name="contextQ"]:checked').val();
    let contextChoice = getCheckboxValue();
    $('#wrongAns').text('');

    // Disabled answer checking for this template
    // if (contextChoice === "") {
    //     $('#contextQWarning').text('Please answer the question. Thank you!');
    // } else if (contextChoice !== answers) {
    //     if (contextChoice !== 'fg') {
    //         $('#wrongAns').text('You have given an incorrect answer. Please read the passage again carefully and then answer the questions.');
    //     }
    //     question_index = 0;
    //     $('input[name="contextQ"]:checked').prop('checked', false);
    //     $('#contextQBox').hide();
    //     SHOW_CONTEXT();
    // } else {
    question_index += 1;
    $('input[name="contextQ"]:checked').prop('checked', false);
    $('#contextQBox').hide();
    SHOW_CONTEXT_Q();
    // }
}

function SHOW_CONTEXT() {
    $('#bufferPage').hide();
    $('#textBox').show();
}


function TRIAL() {
    $('#textBox').show();
}

function SHOW_RATING() {
    let relations = trial.context.relation;
    // set all ratings to invisible first
    for (let i = 0; i < MAX_RATING_Q; i++) {
        let rating_sec = '#r' + (i + 1).toString();
        if (i < relations.length) {
            let rating_text = '#r' + (i + 1).toString() + 'q';
            $(rating_text).text(relations[i]);
            $(rating_sec).show();
        } else {
            $(rating_sec).hide();
        }
    }
    $('#ratingBox').show();
}

function SUBMIT_RATING() {
    let checked_all = true;
    let ratings = [];

    for (let i = 0; i < trial.context.relation.length; i++) {
        let cur_rating = $('input[name=r' + (i + 1).toString() + ']:checked').val();
        if (typeof cur_rating === 'undefined') {
            checked_all = false;
            $('#ratingQWarning').text('Please answer all questions. Thank you!');
            break;
        } else {
            ratings.push(cur_rating);
            $('input[name=r' + (i + 1).toString() + ']:checked').prop('checked', false);
        }
    }

    if (checked_all) {
        trial.ratings = ratings;
        $('#ratingQWarning').text('');
        $('#ratingBox').hide();
        END_THIS_TRIAL();
    }
}


function END_THIS_TRIAL() {
    if (trial.trialNum > 0) {
        const DATA = LIST_FROM_ATTRIBUTE_NAMES(trial, trial.titles);
        trial.allData += LIST_TO_FORMATTED_STRING(DATA);
    }
    CHECK_TO_REST();
}

function CHECK_TO_REST() {
    if (trial.trialNum < trial.trialN) {
        // if (trial.trialNum % REST_TRIAL_N == 0 && trial.trialNum > 0) {
        //         REST();
        // } else {
        trial.run();
        // }
    } else {
        trial.endExptFunc();
    }
}

function REST() {
    $('#trialBox').hide();
    subj.detectVisibilityEnd();
    trial.rest($('#restBox'), $('#restText'), function () {
        $('#trialBox').show();
        subj.detectVisibilityStart();
        trial.run();
    });
}

function END_TRIALS() {
    $('#practiceBox').hide();
    $('#questionsBox').show();
    subj.detectVisibilityEnd();
    trial.save();
}

var trial_options = {
    subj: 'pre-post',
    titles: TRIAL_TITLES,
    pracTrialN: PRACTICE_TRIAL_N,
    trialN: TRIAL_N,
    stimPath: STIM_PATH,
    dataFile: TRIAL_FILE,
    savingScript: SAVING_SCRIPT,
    savingDir: SAVING_DIR,
    trialList: CAUSAL_CONTEXT,
    pracList: PRACTICE_LIST,
    blockList: SHUFFLED_CATEGORY_BLOCK,
    updateFunc: SUBMIT,
    endExptFunc: END_TRIALS,
    progressInfo: true
}

// TRIAL FUNCTIONS
function SUBMIT(rating) {
    // saving data: category, index, rating, likability, prototypicality, trialNum
    trial.respondTime = Date.now();
    trial.saverating(SHUFFLED_CATEGORY[TRIAL_NUM], SHUFFLED_INDEX[TRIAL_NUM], rating, likability, prototypicality, TRIAL_NUM, CHECK_FULLY_IN_VIEW($('#img0')));
    
    TRIAL_NUM = TRIAL_NUM + 1;
    
    // updating data 
    if (practice & TRIAL_NUM < 6) {
        $('#img0').attr('src', IMG_Path + 'practice/' + SHUFFLED_PRACTICE[TRIAL_NUM] + IMG_FILE);
        $('#titleText').html("Please rate how good the " + SHUFFLED_PRACTICE[TRIAL_NUM] + " looks");
    }
    else if (practice & TRIAL_NUM == 6) {
        TRIAL_NUM = 1;
        practice = false;
        likability = true;
        $('#img0').attr('src', IMG_Path + SHUFFLED_CATEGORY[TRIAL_NUM] + '\\'+ SHUFFLED_CATEGORY[TRIAL_NUM] + SHUFFLED_INDEX[TRIAL_NUM] + IMG_FILE);
        $('#titleText').html("Please rate how good the " + SHUFFLED_CATEGORY[TRIAL_NUM] + " looks");
        $("#practiceBox").hide();
        $("#nextButton").show();
        instr.next();
    }
    else if (likability & TRIAL_NUM < (6*CATEGORY_NUM)) {
        $('#img0').attr('src', IMG_Path + SHUFFLED_CATEGORY[TRIAL_NUM] + '\\'+ SHUFFLED_CATEGORY[TRIAL_NUM] + SHUFFLED_INDEX[TRIAL_NUM] + IMG_FILE);
        $('#titleText').html("Please rate how good the " + SHUFFLED_CATEGORY[TRIAL_NUM] + " looks");
    }
    else if (likability & TRIAL_NUM == (6*CATEGORY_NUM)) {
        TRIAL_NUM = 1;
        prototypicality = true;
        likability = false;
        $("#practiceBox").hide();
        $("#nextButton").show();
        $('#instrBox').show();
        instr.next();
    }
    else if (prototypicality & TRIAL_NUM < CATEGORY_NUM) {
        $('#img0').attr('src', IMG_Path + SHUFFLED_CATEGORY_BLOCK[CATEGORY_BLOCK_INDEX] + '\\'+ SHUFFLED_CATEGORY_BLOCK[CATEGORY_BLOCK_INDEX] + SHUFFLED_INDEX_BLOCK[TRIAL_NUM] + IMG_FILE);
    }
    else if (prototypicality & TRIAL_NUM == CATEGORY_NUM) {
        TRIAL_NUM = 0;
        CATEGORY_BLOCK_INDEX = CATEGORY_BLOCK_INDEX + 1;
        if (CATEGORY_BLOCK_INDEX == 6) {
            END_TRIALS();
        }
        $('#titleText').html("Please rate how typical the " + SHUFFLED_CATEGORY_BLOCK[CATEGORY_BLOCK_INDEX] + " looks");
        $('#img0').attr('src', IMG_Path + SHUFFLED_CATEGORY_BLOCK[CATEGORY_BLOCK_INDEX] + '\\'+ SHUFFLED_CATEGORY_BLOCK[CATEGORY_BLOCK_INDEX] + SHUFFLED_INDEX_BLOCK[TRIAL_NUM] + IMG_FILE);
    }
}

function PRELOAD_IMG(srcs, index) {
    var img;
    var remaining = srcs.length;
    for (var i = 0; i < srcs.length; i++) {
        img = new Image();
        img.onload = function() {
            --remaining;
        };
        img.src = IMG_Path + srcs[i] + '/' + srcs[i] + '' + index[i] + '' + IMG_FILE;
    }
}
