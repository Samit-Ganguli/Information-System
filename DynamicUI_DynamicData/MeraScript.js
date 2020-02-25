var data;
var dataTableData; 
var dataTableData2;
var userName = "Samit";
//var department = "itsl";
var userID = 1;
var entityType = "State";
var stateID = 1;
var department = sessionStorage.getItem('Department');
var JSONObject = {
	"singer": "Metallica",
	"title": "Enter Sandman",
	"data": [{
		"Name": "harami"
	}],
	"requestBody": {
		"EntityType" : entityType, // "State",
		"Department" : department, // "itsl",
		/* "Query" : {
		"StateID" : stateID, // 1,
		"State" : "New to ITSL"
	} */
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

var dataSet = tryFunction();
$(document).ready(function() {
    $('#example').DataTable( {
		
        data: dataSet,
        columns: [
            { data: "StateID",
			  title: "StateID"
			  },
            { data: "State",
			  title: "State"},
            { data: "DepartmentName",
			  title: "Department"},
			{ data: "StateDescription",
			  title: "Description"},  
			{
          "targets": -1,
          "data": null,
          "defaultContent": 
             '<button class="btn-view" type="button">Subscribe</button>'
             + '<button class="btn-delete"  type="button">Veiw Details</button>'
        }
]
    } );
	
	$('#example tbody').on( 'click', '.btn-view', function () {
//alert("view chala saala");
var rowData = $('#example').DataTable().row($(this).parents('tr')).data();
sessionStorage.setItem('Department',department);
sessionStorage.setItem('UserID',userID);
sessionStorage.setItem('StateID',stateID);
sessionStorage.setItem('UserName',userName);
sessionStorage.setItem('State',rowData["State"]);
var JSONObject = {
	"singer": "Metallica",
	"title": "Enter Sandman",
	"data": [{
		"Name": "harami"
	}],
	"requestBody": {
		"EntityType": "UserState",
			"UserID" : userID,  // 1,
			"UserName" : userName,  //"Samit",
			"EntityName": rowData["State"], //"New to ITSL",
			"State": rowData["State"],  //"New to ITSL",
			"StateID": stateID,  // 1,
			"DepartmentName": rowData["DepartmentName"], //"IT Security Lab",
			//"StateDescription": "This state contains information regarding how can a new member be added to ITSL",
			"CreatedBy": "Samit Ganguli",
			"CreatedOn": "11th September 2018",
			"Department": department  //"itsl"
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
window.location="http://localhost:8080/DynamicUI_UserState/DDT.html"   
});

// Handle click on "Delete" button
$('#example tbody').on( 'click', '.btn-delete', function () {
	sessionStorage.setItem('UserName','Samit'),
window.location="http://localhost:8080/DynamicUI_Substates/DDT.html"
});
})