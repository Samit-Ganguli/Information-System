var data;
var dataTableData; 
var dataTableData2;

var department = sessionStorage.getItem('Department');
var userName = sessionStorage.getItem('UserName');
var userID = parseInt(sessionStorage.getItem('UserID'), 10);
var state = sessionStorage.getItem('State');
var stateID = parseInt(sessionStorage.getItem('StateID'), 10);

var JSONObject = {
	"singer": "Metallica",
	"title": "Enter Sandman",
	"data": [{
		"Name": "harami"
	}],
	"requestBody": {
		"EntityType" : "UserState",
		"Department" : department,
		"Query" : {
		"StateID" : stateID, //1,
		"State" : state,  //"New to ITSL"
		"UserName" : userName,
		"UserID" : userID
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
				 dataTableData = dataTableData
				},	 
            error: function (err) {
			  var jsonObj = $.parseJSON(err.responseText); 
              alert(jsonObj);
           }
});
return JSON.parse(dataTableData);
};

var dataSet = tryFunction();
dataSet = dataSet[0]["substates"];
console.log(dataSet);
$(document).ready(function() {
        dataTableData2 = $('#example').DataTable( {
        data: dataSet,
        columns: [
            { data: "SubstateID",
			  title: "SubstateID"
			  },
            { data: "SubstateName",
			  title: "SubstateName"},
            { data: "CurrentStatus",
			  title: "Status"},  
			{
          "targets": -1,
          "data": null,
          "defaultContent": 
             '<button class="btn-view" type="button">Mark Complete</button>'
        }
]
    } );
	
	$('#example tbody').on( 'click', '.btn-view', function () {
//alert("view chala saala");
var rowData = $('#example').DataTable().row($(this).parents('tr')).data();
var substateID = rowData["SubstateID"];
var substateName = rowData["SubstateName"];
var JSONObject = {
	"singer": "Metallica",
	"title": "Enter Sandman",
	"data": [{
		"Name": "harami"
	}],
	"requestBody": {
		"EntityType" : "UserState",
		"Department" : department,  //"itsl",
		"UserName" : userName,  //"Samit",
		"StateID" : stateID,  //1,
		"UserID" : userID,  //1,
		"State" : state,  //"New to ITSL",
		"SubstateID" : substateID,
		"SubstateName" : substateName
	}
};
$.ajax({
url: 'http://localhost:8080/RESTfulExample/rest/json/metallica/updateEntity',
        type: "POST",
		headers: {
            'Content-Type':'application/json'
        },
		data: JSON.stringify(JSONObject),
		dataType: "json",
		async: false,
        success: function (responseText) {
			alert("Updated Status of Substate")
				},	 
            error: function (err) {
			  alert("Updated Status of Substate")
           }
});
location.reload(true);
});


$('#example tbody').on( 'click', 'tr', function () {
//alert("view chala saala");
var rowData = dataTableData2.row( this ).data();  // $('#example').DataTable().row($(this).parents('tr')).data();
var substateID = rowData["SubstateID"];
var substateName = rowData["SubstateName"];
var JSONObject = {
	"singer": "Metallica",
	"title": "Enter Sandman",
	"data": [{
		"Name": "harami"
	}],
	"requestBody": {
		"EntityType" : "SubState",
		"Department" : department,  //"itsl",
		"UserName" : userName,  //"Samit",
		"StateID" : stateID,  //1,
		"UserID" : userID,  //1,
		"State" : state,  //"New to ITSL",		
		"Query" : {
		"SubStateID" : substateID,
		"EntityName" : substateName,	
		"StateID" : stateID,
		"State" : state
	}
}};
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
			jsonString = responseText,
			alert(responseText[0]["SubStateDescription"])
			//dataTableData = JSON.stringify(jsonString),
			},	 
        error: function (err) {
			alert("Updated Status of Substate")
           }
});
//location.reload(true);
});


// Handle click on "Delete" button
$('#example tbody').on( 'click', '.btn-delete', function () {
window.location="http://localhost:8080/DynamicUI_Substates/DDT.html"
});
})