const FORM_ID = "1FAIpQLSdUZMPMsHVG8XjDwCwFb40Zbw5V_MjYj-gIaf51HTqdxnrc0w";
var rating;
var opt = document.querySelectorAll("input[name=rate]");
var otherCheckbox = document.getElementById("otherCheckbox");
var submitBtn = document.getElementById("submitBtn");

setTimeout(function() {
    $('#modal').modal('show');
   }, 100);

var getSiblings = function (elem) {
    var siblings = [];
    var sibling = elem.parentNode.firstChild;
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== elem) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
    return siblings;
  };


for (let i of opt) {
i.addEventListener("click", function () {
  rating = i.value;
  let rateNum = "label[for=rate" + rating  + "]";
  let optBtn = document.querySelector(rateNum);
  optBtn.style.backgroundColor = "#0580DE";
  let sib = getSiblings(optBtn);
  // console.log(sib);
  for (let i in sib) {
    sib[i].style.backgroundColor = "var(--mediumGreyOp)";
  }

  var feedbackQuestion = document.getElementById("feedbackQuestion");

  var moreFeedback = document.getElementById("moreFeedback");


  if(rating>=0 && rating <= 8){
    feedbackQuestion.innerHTML = "What areas could we improve?"
  }else{
    feedbackQuestion.innerHTML = "Great! What can we do better?"
  }

  moreFeedback.style.display = "block";

});
}


$(function () {
 $('#otherCheckbox').change(function () {                
    $('#textArea').toggle(this.checked);
 }).change(); //ensure visible state matches initially
});


function updateCheckboxes() {         
 var allVals = [];
 $('input[type=checkbox]:checked').each(function() {
   allVals.push($(this).val());
 });

 return allVals;
}

submitBtn.addEventListener("click", function () {
 var message = $('#floatingTextarea').val()

 var suggestions = updateCheckboxes();
 var other = $('input[name=otherCheckbox]:checked').val()
 console.log("Rating of : "+ rating+"\nImprove : "+suggestions+"\nOther : "+message);


let pop = document.getElementById("modalBody");


document.getElementById("modalLabel").style.display = "none";

var params = new URLSearchParams();

params.append("entry.604323597", rating)

for(var p =0; p<suggestions.length;p++){
 params.append("entry.1001340167",suggestions[p])
}

params.append("entry.1001340167.other_option_response", message)

fetch(`https://docs.google.com/forms/u/0/d/e/${FORM_ID}/formResponse`, {
 method: 'POST',
 mode: 'no-cors',
 headers:{
   'Content-Type': 'application/x-www-form-urlencoded'
 },    
 body: params
});

submitBtn.innerHTML = "Submitted"
pop.innerHTML = "<h4>Thank you for your feedback !</h4>"

});
