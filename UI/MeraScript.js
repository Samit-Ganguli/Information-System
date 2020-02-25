var dataSet = [
[ "Tiger Nixon", "System Architect", "Edinburgh", "5421"],
[ "Garrett Winters", "Accountant", "Tokyo", "8422"],
[ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562"],
[ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224"],
[ "Airi Satou", "Accountant", "Tokyo", "5407"]
];
$(document).ready(function() {
$('#example').DataTable( {
data: dataSet,
"columnDefs": [ 
{ title: "Name" },
{ title: "Position" },
{ title: "Office" },
{ title: "Extn." },
{
          "targets": -1,
          "data": null,
          "defaultContent": 
             '<button class="btn-view" type="button">Salary</button>'
             + '<button class="btn-delete"  type="button">Start Date</button>'
        }
]
} );
// Handle click on "View" button
$('#example tbody').on('click', '.btn-view', function (e) {
//var data = table.row( $(this).parents('tr') ).data();
} );
// Handle click on "Delete" button
$('#example tbody').on('click', '.btn-delete', function (e) {
//var data = table.row( $(this).parents('tr') ).data();
} );
} );