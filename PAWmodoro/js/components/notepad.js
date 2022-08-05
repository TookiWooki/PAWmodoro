
//Event Listeners
window.addEventListener('load', function(){
    document.getElementById('panel--edit-box').setAttribute('contenteditable', 'true');
});

//Functions
function format(command, value) {
    document.execCommand(command, false, value);
 }

function heading(command, vlaue) {
    document.execCommand('formatBlock', false, '<H3>');
}