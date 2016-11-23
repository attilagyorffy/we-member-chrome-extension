function setBackground() {
  document.body.style.backgroundColor="white";

  var imgUrl = chrome.extension.getURL("/images/member.jpg");
  document.body.style.background = imgUrl;
}

function checkSubmitButtonText(submitButton) {
  var candidates = [
    "Reset my password",
    "Send instructions",
    "Send password reset email",
    "Reset"
  ]

  for (var i = 0; i < candidates.length; i++) {
    var candidate = new RegExp(candidates[i], 'i');
    var matches = submitButton.value.match(candidate);
    if (matches) return true;
  }

  return false;
}

function checkHeadings() {
  var elements = document.getElementsByTagName('*');

  for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      for (var j = 0; j < element.childNodes.length; j++) {
          var node = element.childNodes[j];

          if (node.nodeType === 3) {
              var text = node.nodeValue;

              var regExp = new RegExp("Forgotten your password?", "i");
              var replacedText = text.replace(regExp, "'Member your password?");

              if (replacedText !== text) {
                  element.replaceChild(document.createTextNode(replacedText), node);
              }
          }
      }
  }
}


var submitButtons = document.querySelectorAll("form input[type='submit']");

submitButtons.forEach(function(submitButton) {
  var matches = checkSubmitButtonText(submitButton);

  if (matches) {
    submitButton.value = "We 'member!";
    submitButton.style.background = '#8952A1';
    setBackground();
  }
});

checkHeadings();
