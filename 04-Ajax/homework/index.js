"use strict";

let url = 'http://localhost:5000/amigos';//array de amigos

let showFriends = function(){//al hacer click
    $('#lista').empty();//para que no se llene la lista cada que aprietas
    $.get(`${url}`, function(friends) {//se obtiene el array completo 'url'
        friends.forEach(element => {//se itera sobre cada uno
            $('#lista').append(`<li id="${element.id}">${element.name}     <button id="${element.id}" onClick="deleteFriend(${element.id})"> X </button></li>`);//se apendea cada uno con su id mostrando el nombre
        });
    })
}

let getFriend = function(){
    let id = $('#input').val();//el valor del input
    $('#lista').empty();
    if (id) {
        //http://localhost:5000/amigos/id
        $.get(`${url}/${id}`, function (friend) {//obtiene el elemento del id pasado en input
            $('#lista').append(`<li id="${friend.id}">${friend.name} X</li>`);//apendea el id mostrando su nombre
        })//obtenemos el elemento con el id
    }
}

let deleteFriend = function(idButton){//el parametro es el id del boton
    let id;

    if (typeof idButton === 'number'){//
        id = idButton;//si se preciona el boton se asigna el id del boton
    } else {
        id = $('#inputDelete').val();//el valor del input
    }

    
    let friend;

    if (id) { 
        
        $.get(`${url}/${id}`, function(f){//obtiene el amigo
            friend = f;//asigna a la variable
        });

        $.ajax({//comunica con servidor
            url: `${url}/${id}`,//dato
            type: "DELETE",//accion de servidor
            success: function() {//completar 
                $('#success').text(`Tu amigo, ${friend.name} fue eliminado`);
                $('#inputDelete').val("");//borra el id ingresado
                showFriends();
            }
            
        })
    } else {
        $('#success').text('ingresa un ID')
    }

}


$('#boton').click(showFriends);//se ejecuta la funcion
$('#search').click(getFriend);
$('#delete').click(deleteFriend);