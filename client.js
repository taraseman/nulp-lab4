var arr;
var selectedItem;

function addUserClick(){
    if(selectedItem != undefined){
        selectedItem.username = document.getElementById('inptName').value;
        selectedItem.userage = document.getElementById('inptAge').value;

        $.post('/updateuser',selectedItem,function(data){
            getUsers();
        })
        selectedItem = null;
        document.getElementById('formSubmit').value = 'Add';
    }else{
        var name=$('.name').val();
        var age=$('.age').val();
        $('.name').val("");
        $('.age').val("");
        addUser(name,age);
    }
}

function getUsers(){

    $.get('/getusers',function(data){
        createTable('table', data);
    })
}

function createTable(element,mas){
debugger;
    arr = mas;
    console.log(mas);
    var div = document.getElementById(element);
    $(div).empty();
    var table = document.createElement("table");
    $(table).appendTo(div);
    $(table)
    .addClass("table table-bordered table-primary col-6");
   
    for(var i=0;i<mas.length;i++){
        $('<tr>').addClass('tr').appendTo(table);
        for(var key in mas[i]){
            console.log(mas[i]);
        $('<td>').addClass('td')
        .appendTo('.tr:last').text(mas[i][key]);
        }
        $('.tr:last .td:first').hide();
        $('<td>').appendTo('.tr:last');
        $('<button>').text('Delete').addClass('btn btn-danger')
        .appendTo('td:last').click(function(){
            var id=$(this).parent().parent().find('td:first').text();
            console.log(id);
            deleteUser(id);
        });

        $('.tr:last .td:first').hide();
        $('<td>').appendTo('.tr:last');
        $('<button>').text('Update').addClass('btn btn-danger')
        .appendTo('td:last').click(function(){
            var id=$(this).parent().parent().find('td:first').text();
            console.log(id);
            updateUser(id);
        });
    }

   
}

function addUser(name,age){
    if(!name||!age) return;
    var obj={
        username:name,
        userage:age
    }
    $.post('/adduser',obj,function(data){
        console.log(data);
        getUsers();
    })
}

function deleteUser(id){
    var obj={id:id};
    $.post('/deleteuser',obj,function(data){
    console.log(data);
    getUsers();
    })
}

function updateUser(id){
    var res = arr.find(x => x._id === id);
    if(res != undefined){
        selectedItem = res;
        
        document.getElementById('inptName').value = selectedItem.username;
        document.getElementById('inptAge').value = selectedItem.userage;

        document.getElementById('formSubmit').value = 'Update';
    }
    
    $('.add').click(function(){
      
        $('.name').val("");
        $('.age').val("");
    });
}

$(document).ready(function(){
    getUsers();
})