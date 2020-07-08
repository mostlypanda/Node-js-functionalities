//Form Validation
function validateForm() {
    let x = document.forms["myForm"]["fname"].value;
    if(x == " "){
        alert("Name must be inserted");
        return false;
    }
}
