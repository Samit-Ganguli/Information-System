var data;
var dataTableData; 
var dataTableData2;
var JSONObject = {
	"singer": "Metallica",
	"title": "Enter Sandman",
	"data": [{
		"Name": "harami"
	}],
	"requestBody": {
		"EntityType" : "SubState",
		"Department" : "itsl",
		"Query" : {
		"StateID" : 1,
		"State" : "New to ITSL"
	}
}};
function tryFunction(){
$.ajax({
        url: 'http://localhost:8080/RESTfulExample/rest/json/metallica/getQueryData',
        type: "POST",
		headers: {
            'Content-Type':'application/json'
        },
		data: JSON.stringify(JSONObject),
		dataType: "json",
		async: false,
        success: function (responseText) {
			console.log(responseText),
                 jsonString = responseText,
				 dataTableData = JSON.stringify(jsonString)
				},	 
            error: function (err) {
			  var jsonObj = $.parseJSON(err.responseText); 
              alert(jsonObj);
           }
});
return JSON.parse(dataTableData);
};

var table;

var dataSet = tryFunction();
$(document).ready(function() {
	var user = sessionStorage.getItem('UserName');
	console.log(user);
	alert(user);
    table = $('#example').DataTable( {
		
        data: dataSet,
        columns: [
            { data: "SubStateID",
			  title: "SubStateID"
			  },
            { data: "EntityName",
			  title: "SubstateName"},
            { data: "DepartmentName",
			  title: "Department"},
			{ data: "SubStateDescription",
			  title: "Description"}
]
    } );
	
var $input = $('<input type="button" value="Subscribe" />');
	//$input.css({right: 10, position:'absolute'})
	$input.click(function() {
		var JSONObject = {
	"singer": "Metallica",
	"title": "Enter Sandman",
	"data": [{
		"Name": "harami"
	}],
	"requestBody": {
		"EntityType": "UserState",
			"UserID" : 1,
			"UserName" : "Samit",
			"EntityName": "New to ITSL",
			"State": "New to ITSL",
			"StateID": 1,
			"DepartmentName": "IT Security Lab",
			"StateDescription": "This state contains information regarding how can a new member be added to ITSL",
			"CreatedBy": "Samit Ganguli",
			"CreatedOn": "11th September 2018",
			"Department": "itsl"
	}
};
$.ajax({
type: 'POST',
headers: {
            'Content-Type':'application/json'
        },
		data: JSON.stringify(JSONObject),
		dataType: "json",
url: 'http://localhost:8080/RESTfulExample/rest/json/metallica/post',
async: false,
success: function (result) {
alert("You are subscribed to the state New to ITSL");
},	 
            error: function (err) {
			  alert("You are subscribed to the state New to ITSL");
              
           }
});
		alert("Button chala");
	});
    $input.appendTo($('#example'));	

	
	
 /* table.button().add( 0, {
  extend:'create',
  editor: editor
} );  */
	
	$('#example tbody').on( 'click', '.btn-view', function () {
//alert("view chala saala");
$.ajax({
type: 'GET',
url: 'http://localhost:8080/RESTfulExample/rest/json/metallica/get',
async: false,
dataType: "text", // data type of response
success: function (result) {
var jsonObj = $.parseJSON(result);
var i;
for(i = 0; i < jsonObj.length; i++)
{
	alert(jsonObj[i].name);
}
//alert(jsonObj.length);
}
});
});



// Handle click on "Delete" button
$('#example tbody').on( 'click', '.btn-delete', function () {
var data = $('#example').DataTable().row($(this).parents('tr')).data();
var JSONObject = {
	"singer": "Metallica",
	"title": "Enter Sandman",
	"data": [{
		"Name": "harami"
	}],
	"requestBody": {
		"EntityType" : "SubState",
		"Department" : "itsl",
		"Query" : {
		"StateID" : 1,
		"State" : "New to ITSL"
	}
}};
var check = {"ID":"00123"};
$.ajax({
        url: 'http://localhost:8080/RESTfulExample/rest/json/metallica/getQueryData',
        type: "POST",
		headers: {
            'Content-Type':'application/json'
        },
		data: JSON.stringify(JSONObject),
		dataType: "json",
		async: false,
        success: function (responseText) {
			console.log(responseText),
                 jsonString = responseText,
				 dataTableData = JSON.stringify(jsonString)
				},	 
            error: function (err) {
			  var jsonObj = $.parseJSON(err.responseText); 
              alert(jsonObj);
           }
});
});
})