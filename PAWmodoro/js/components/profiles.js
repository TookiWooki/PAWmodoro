//NEED TO ADD FILE SCRIPT TO INDEX.HTML
//    <script src="./js/components/profiles.js"></script>

//Selectors
const studyProfile = document.getElementById('profile--study');
const studyCoding = document.getElementById('profile--coding');
const studyResearch = document.getElementById('profile--research');
const studyWork = document.getElementById('profile--work');
const studyWriting = document.getElementById('profile--writing');

//Event Listeners
studyProfile.addEventListener('click', loadStudyProfile, );
studyCoding.addEventListener('click', loadCodingProfile);
studyResearch.addEventListener('click', loadResearchProfile);
studyWork.addEventListener('click', loadWorkProfile);
studyWriting.addEventListener('click', loadWritingProfile);

//TODO: Need to show active button when profile is clickeds
//Functions
function loadStudyProfile(){
    document.getElementById('settings--focus-time').value = "25";
    document.getElementById('settings--short-time').value = "5";
    document.getElementById('settings--long-time').value = "15";
}

function loadCodingProfile(){
    document.getElementById('settings--focus-time').value = "50";
    document.getElementById('settings--short-time').value = "5";
    document.getElementById('settings--long-time').value = "30";
}

function loadResearchProfile(){
    document.getElementById('settings--focus-time').value = "45";
    document.getElementById('settings--short-time').value = "10";
    document.getElementById('settings--long-time').value = "30";
}

function loadWorkProfile(){
    document.getElementById('settings--focus-time').value = "25";
    document.getElementById('settings--short-time').value = "5";
    document.getElementById('settings--long-time').value = "15";
}

function loadWritingProfile(){
    document.getElementById('settings--focus-time').value = "35";
    document.getElementById('settings--short-time').value = "5";
    document.getElementById('settings--long-time').value = "15";
};