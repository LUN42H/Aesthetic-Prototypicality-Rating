// ######## ##     ## ########  ########
// ##        ##   ##  ##     ##    ##
// ##         ## ##   ##     ##    ##
// ######      ###    ########     ##
// ##         ## ##   ##           ##
// ##        ##   ##  ##           ##
// ######## ##     ## ##           ##

// data saving
let formal = false;
let experiment_name = "negProto";
let subj_num_script = "php/subjNum.php";
let saving_script = "php/save.php";
let visit_file = "visit_" + experiment_name + ".txt";
let subj_num_file = "subjNum_" + experiment_name + ".txt";
let attrition_file = "attrition_" + experiment_name + ".txt";
let rating_file = "rating_" + experiment_name + ".txt";
let subj_file = "subj_" + experiment_name + ".txt";
let saving_dir = formal
    ? "/var/www-data-experiments/cvlstudy_data/YCC/" + experiment_name + "/formal"
    : "/var/www-data-experiments/cvlstudy_data/YCC/" + experiment_name + "/testing";
let id_variable_name = "id";
let completion_url = "XXX";

// stimuli
let stim_path = "media/";
let categories = ["bird", "earring", "flower", "gun", "insect", "snake"];
let instance_n = 50;
let practice_list = categories.map((x) => ["practice", x]);
let practice_trial_n = practice_list.length;
let aesthetic_trial_list = [];
for (let c of categories) {
    for (let i = 1; i <= instance_n; i++) {
        aesthetic_trial_list.push([c, i]);
    }
}
aesthetic_trial_list = shuffle_array(aesthetic_trial_list);
let aesthetic_trial_n = aesthetic_trial_list.length;

let prototypical_trial_list = [];
for (let c of categories) {
    let img_num_list = range(1, instance_n + 1);
    img_num_list = shuffle_array(img_num_list);
    let category_trial_list = img_num_list.map((i) => [c, i]);
    prototypical_trial_list = prototypical_trial_list.concat(category_trial_list);
}
let prototypical_trial_n = prototypical_trial_list.length;
let instr_trial_n = practice_trial_n + aesthetic_trial_n;

let intertrial_interval = 0.5;
let instr_img_list = ["maximize_window.png"];
let task_image_list = aesthetic_trial_list.map((c, i) => c + "/" + c + i + ".jpg");
let all_img_list = instr_img_list.concat(practice_list).concat(task_image_list);

// criteria
let viewport_min_w = 800;
let viewport_min_h = 600;
let instr_reading_time_min = 0.3;

// object variables
let subj, instr, task;

function halt_experiment(explanation) {
    $(".page-box").hide();
    $("#instr-text").html(explanation);
    $("#next-button").hide();
    $("#instr-box").show();
    allow_selection();
}

function allow_selection() {
    $("body").css({
        "-webkit-user-select": "text",
        "-moz-user-select": "text",
        "-ms-user-select": "text",
        "user-select": "text"
    });
}

function ajax_failed() {
    halt_experiment('SERVER ERROR: Please email zxzhou@g.ucla.edu with the message "AJAX-ERR" to receive credit.');
}

// ########  ########    ###    ########  ##    ##
// ##     ## ##         ## ##   ##     ##  ##  ##
// ##     ## ##        ##   ##  ##     ##   ####
// ########  ######   ##     ## ##     ##    ##
// ##   ##   ##       ######### ##     ##    ##
// ##    ##  ##       ##     ## ##     ##    ##
// ##     ## ######## ##     ## ########     ##

$(document).ready(function () {
    subj = new Subject(subj_options);
    subj.id = subj.getID(id_variable_name);
    subj.saveVisit();
    //if (subj.validID) { XXX
    if (true) {
        load_img(0, stim_path, all_img_list);
        instr = new Instructions(instr_options);
        instr.start();
    } else {
        halt_experiment(
            'ID ERROR: Please visit the experiment page again from the link provided on the website you signed up for the experiment. If you believe you have received this message in error, please contact the experimenter at zxzhou@g.ucla.edu with the message "ID-ERROR" .'
        );
    }
});

//  ######  ##     ## ########        ## ########  ######  ########
// ##    ## ##     ## ##     ##       ## ##       ##    ##    ##
// ##       ##     ## ##     ##       ## ##       ##          ##
//  ######  ##     ## ########        ## ######   ##          ##
//       ## ##     ## ##     ## ##    ## ##       ##          ##
// ##    ## ##     ## ##     ## ##    ## ##       ##    ##    ##
//  ######   #######  ########   ######  ########  ######     ##

let subj_titles = [
    "num",
    "date",
    "startTime",
    "id",
    "endTime",
    "duration",
    "instrReadingTimes",
    "quickReadingPageN",
    "hiddenCount",
    "hiddenDurations",
    "serious",
    "fullscreen",
    "problems",
    "gender",
    "age",
    "inView",
    "viewportW",
    "viewportH"
];

function update_task_object_subj_info() {
    if (typeof task !== "undefined") {
        task.subj = subj;
        task.getSubjectData();
    }
}

function submit_debriefing_questions() {
    let open_ended_names = ["problems", "age"];
    let choice_names = ["serious", "fullscreen", "gender"];
    fetch_debriefing_responses(subj, open_ended_names, choice_names);
    let all_responded = show_hide_warnings(subj, open_ended_names, choice_names);
    if (all_responded) {
        for (let q of open_ended_names) {
            subj[q] = $("#" + q)
                .val()
                .replace(/(?:\r\n|\r|\n)/g, "<br />");
        }
        subj.instrReadingTimes = JSON.stringify(instr.readingTimes);
        subj.quickReadingPageN = Object.values(instr.readingTimes).filter((d) => d < instr_reading_time_min).length;
        subj.submitAnswers();
        $("#questions-box").hide();
        exit_fullscreen();
        allow_selection();
        $("#debriefing-box").show();
        $("html, body").animate({ scrollTop: 0 }, "fast");
    }
}

function fetch_debriefing_responses(obj, open_ended_names, choice_names) {
    for (let q of open_ended_names) {
        obj[q] = $("#" + q)
            .val()
            .replace(/(?:\r\n|\r|\n|\s)/g, "");
    }
    for (let q of choice_names) {
        obj[q] = $("input[name=" + q + "]:checked").val();
    }
}

function show_hide_warnings(obj, open_ended_names, choice_names) {
    let all_responded = true;
    for (let q of open_ended_names) {
        if (obj[q] == "") {
            $("#" + q + "-warning").show();
            $("body").scrollTop(0);
            all_responded = false;
        } else {
            $("#" + q + "-warning").hide();
        }
    }
    for (let q of choice_names) {
        if (typeof obj[q] == "undefined") {
            $("#" + q + "-warning").show();
            $("body").scrollTop(0);
            all_responded = false;
        } else {
            $("#" + q + "-warning").hide();
        }
    }
    return all_responded;
}

function go_to_completion_page() {
    window.location.href = completion_url + subj.id;
}

let subj_options = {
    titles: subj_titles,
    viewportMinW: viewport_min_w,
    viewportMinH: viewport_min_h,
    subjNumCallback: update_task_object_subj_info,
    subjNumScript: subj_num_script,
    savingScript: saving_script,
    subjNumFile: subj_num_file,
    visitFile: visit_file,
    attritionFile: attrition_file,
    subjFile: subj_file,
    savingDir: saving_dir
};

// #### ##    ##  ######  ######## ########
//  ##  ###   ## ##    ##    ##    ##     ##
//  ##  ####  ## ##          ##    ##     ##
//  ##  ## ## ##  ######     ##    ########
//  ##  ##  ####       ##    ##    ##   ##
//  ##  ##   ### ##    ##    ##    ##    ##
// #### ##    ##  ######     ##    ##     ##

let instructions = [
    [
        false,
        false,
        "Welcome!<br /><br />This study will take about 45 minutes to complete. Please read the instructions, and don't use the refresh or back button."
    ],
    [show_maximize_window, false, "The webpage will switch to the full-screen view on the next page."],
    [enter_fullscreen, hide_instr_img, "Please stay in the full screen mode until the study switches out from it."],
    [false, false, "This study has two parts. I will explain how they work at the start of each part."],
    [
        false,
        false,
        "For the first part, you will view " +
            instr_trial_n +
            " images, one at a time. The images will depict birds, snakes, flowers, insects, guns, or earrings."
    ],
    [
        false,
        false,
        "I am interested in how visually aesthetically pleasing you find each depicted item or animal to be.<br /><br />In other words, you will share how good the depicted item/animal looks to you."
    ],
    [
        false,
        false,
        "You will rate your visual impression on a scale of 1 to 6, with 1 being not good at all, and 6 being extremely good."
    ],
    [
        false,
        false,
        "Note that we are asking you to rate the depicted items/animals, and NOT the overall images. Please do your best to NOT consider the background or the way the images were taken.<br /><br />Thus, an image of a centered item with a nice background should receive the same rating as a weirdly framed image of the same item with a less ideal background."
    ],
    [
        show_consent,
        listen_to_start_task,
        "Ready? You can press SPACE to start.<br /><br />Please focus after you start (Don't switch to other windows or tabs!)"
    ],
    [
        false,
        false,
        "You have completed the first part!<br /><br />For the second part, you will view the images you’ve seen earlier once again. This time, you will see each category of item/animal consecutively (e.g., you will see all birds consecutively)."
    ],
    [
        false,
        false,
        "Your job this time is to rate your visual impression of how typical each item looks as a member of its kind (i.e., as birds, snakes, flowers, insects, guns, or earrings).<br /><br />For example, let’s consider the fruit category:<br />An apple might visually appear like a typical fruit to you, so you may give it a high rating.<br />An avocado might visually appear less typical, so you may give it a low rating.<br /><br />(There will NOT actually be a fruit category. This is just an example.) "
    ],
    [
        false,
        false,
        "Again, we are asking you to rate the depicted items/animals, and NOT the overall images. Thus, please do NOT consider the way the images were taken, so a normal image of an normal-looking apple should receive the same rating as a weirdly cropped image of the same apple."
    ],
    [
        false,
        false,
        "Also, please rate how typical an item/animal looks as a member of its kind in general (i.e., NOT just among the examples you’ve seen in this study)."
    ],
    [listen_to_start_task, false, "Ready? Press the SPACE key to start!"]
];

function show_instr_img(file_name) {
    $("#instrution-img").attr("src", stim_path + file_name);
    $("#instrution-img").css("display", "block");
}

function hide_instr_img() {
    $("#instrution-img").css("display", "none");
}

function show_maximize_window() {
    show_instr_img("maximize_window.png");
}

function show_consent() {
    $("#consent-box").show();
}

function listen_to_start_task() {
    $("#next-button").hide();
    $(document).keyup(function (e) {
        if (e.key == " ") {
            $(document).off("keyup");
            instr.next();
            $("#next-button").show();
            $("#instr-box").hide();
            $("#consent-box").hide();
            subj.saveAttrition();
            show_task();
        }
    });
}

let instr_options = {
    textBox: $("#instr-box"),
    textElement: $("#instr-text"),
    arr: instructions
};

// ########    ###     ######  ##    ##
//    ##      ## ##   ##    ## ##   ##
//    ##     ##   ##  ##       ##  ##
//    ##    ##     ##  ######  #####
//    ##    #########       ## ##  ##
//    ##    ##     ## ##    ## ##   ##
//    ##    ##     ##  ######  ##    ##

let task_titles = [
    "subjNum",
    "subjStartDate",
    "subjStartTime",
    "blockNum",
    "trialNum",
    "category",
    "stimNum",
    "rating",
    "rt",
    "inView"
];

function show_task() {
    if (typeof subj.partNum === "undefined") {
        aesthetic_task_options["subj"] = subj;
        task = new Task(aesthetic_task_options);
        subj.partNum = 1;
    } else {
        prototypical_task_options["subj"] = subj;
        task = new Task(prototypical_task_options);
        subj.partNum = 2;
    }
    $("#task-box").show();
    subj.detectVisibilityStart();
    task.run();
}

function task_update(formal_trial, last, this_trial, next_trial, path) {
    task.category = this_trial[0];
    task.stimNum = this_trial[1];
    let stim_name = task.category + "/" + task.category + task.stimNum + ".jpg";
    $("#trial-progress").text(task.progress);
    $("#test-img").attr("src", path + stim_name);
    if (subj.partNum == 2) {
        $("#task-prompt").text("How typical does this look as a " + task.category + "?");
    }
    if (!last) {
        let next_stim_name = next_trial[0] + "/" + next_trial[0] + next_trial[1] + ".jpg";
        $("#buffer-img").attr("src", path + next_stim_name);
    }
}

function rating() {
    $("#test-img").show();
    $(".rating-button").mouseup(function (event) {
        $(".rating-button").unbind("mouseup");
        task.inView = check_fully_in_view($("#test-img"));
        $("#test-img").hide();
        let target = $(event.target).closest(".rating-button");
        task.end(target.attr("value"));
    });
}

function end_task() {
    subj.detectVisibilityEnd();
    task.save();
    $("#task-box").hide();
    if (subj.partNum == 1) instruct_part_two();
    else $("#questions-box").show();
}

function instruct_part_two() {
    $("#instr-box").show();
    instr.startTimer();
}

let aesthetic_task_options = {
    titles: task_titles,
    pracTrialN: practice_trial_n,
    trialN: aesthetic_trial_n,
    savingScript: saving_script,
    dataFile: rating_file,
    stimPath: stim_path,
    savingDir: saving_dir,
    trialList: aesthetic_trial_list,
    pracList: practice_list,
    intertrialInterval: intertrial_interval,
    updateFunc: task_update,
    trialFunc: rating,
    endExptFunc: end_task,
    progressInfo: true
};

let prototypical_task_options = {
    titles: task_titles,
    pracTrialN: 0,
    trialN: prototypical_trial_n,
    savingScript: saving_script,
    dataFile: rating_file,
    stimPath: stim_path,
    savingDir: saving_dir,
    trialList: prototypical_trial_list,
    intertrialInterval: intertrial_interval,
    updateFunc: task_update,
    trialFunc: rating,
    endExptFunc: end_task,
    progressInfo: true
};
