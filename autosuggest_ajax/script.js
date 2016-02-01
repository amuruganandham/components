//Creates XmlHttpRequest for AJAX Calls
function getXmlHttpRequestObject() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		alert("Your Browser Sucks!\nIt's about time to upgrade don't you think?");
	}
}

var requestObj = getXmlHttpRequestObject();
var url = "https://restcountries.eu/rest/v1/name/";
function suggest(){
  var country = document.getElementById("country");
  if((requestObj.readyState == 4 || requestObj.readyState == 0) && country.value){
    requestObj.open("GET", url+country.value, true);
    requestObj.onreadystatechange = handleSuggestResponse;
    requestObj.send(null);
  }
}

function handleSuggestResponse(){
  var suggestBox = document.getElementById("suggest_country");
  if(requestObj.readyState == 4){
    suggestBox.innerHTML="";
    var suggestions = "";
    var response = JSON.parse(requestObj.responseText);
      if(response.length > 0){
        suggestBox.className = "right active";
        for (i = 0; i < response.length; i++) {
          suggestions+="<div onclick='javascript:selectSuggested(this)'>";
          suggestions+=response[i].name;
          suggestions+="</div>"
        }
      }  
      suggestBox.innerHTML=suggestions;
  }
}

function selectSuggested(selectedCountry){
  document.getElementById("country").value= selectedCountry.innerHTML;
  var suggestBox = document.getElementById("suggest_country");
  country.innerHTML=selectedCountry.innerHTML;
  suggestBox.className="right inactive";
  suggestBox.innerHTML="";
}
