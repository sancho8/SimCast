
var modal = document.getElementById('firstLaunchModal');

var openModalBtn = document.getElementById("openStartModalBtn");

var closeModalBtn = document.getElementById("closeStartModalBtn");

closeModalBtn.onclick = function() {
	modal.style.display = "none";
}

openModalBtn.onclick = function() {
	modal.style.display = "block";
}

$(document).ready(function(){
     
     $("body").on("click","#deleteAllSearchesModalBtn",function(){
             
          //$("#deleteAllSearchesModal").modal("show");
       
          //appending modal background inside the blue div
          $('.modal-backdrop').appendTo('.table-container');   
     
          //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown
          $('body').removeClass("modal-open")
          $('body').css("padding-right","");     
      });
 
});