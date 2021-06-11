// to load/show and write all notes at restart/reload
shownotes();

let addbtn = document.getElementById(`addbtn`);
addbtn.addEventListener("click", function(e){
  
    let addtitle=document.getElementById("addtitle");
    let addtxt = document.getElementById("addtxt");
    
    let today=new Date();
    let dt=today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear();
    let time= today.getHours()+':'+today.getMinutes();
    var dttime=dt+" "+time;  

    let notes = localStorage.getItem(`notes`);
    let notetitle=localStorage.getItem("notetitle");
    let datetime= localStorage.getItem(`datetime`);
    if (notes == null) {
      notesobj = [];
      notetitlearr= [];
      datetimearr= [];
    } else {
      notesobj = JSON.parse(notes);
      notetitlearr= JSON.parse(notetitle);
      datetimearr= JSON.parse(datetime);
    }

    notesobj.push(addtxt.value);
    notetitlearr.push(addtitle.value);
    datetimearr.push(dttime);
    console.log(dttime);

    localStorage.setItem(`notes`, JSON.stringify(notesobj));
    localStorage.setItem(`notetitle`, JSON.stringify(notetitlearr));
    localStorage.setItem(`datetime`,JSON.stringify(datetimearr));
    addtxt.value = "";
    addtitle.value="";
    shownotes();
});

// fn to show saved notes from local storage
function shownotes() {
  let notes = localStorage.getItem(`notes`);
  let notetitle=localStorage.getItem("notetitle");
  let datetime= localStorage.getItem(`datetime`);
  if (notes == null) {
    notesobj = [];
    notetitlearr= [];
    datetimearr= [];
  } else {
    notesobj = JSON.parse(notes);
    notetitlearr= JSON.parse(notetitle);
    datetimearr= JSON.parse(datetime);
  }

  let txt = "";
    for (let index = 0; index < notesobj.length; index++) {

      if(notetitlearr[index]==""){  
        txt += ` <div class="noteCard my-1 mx-1 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title" style="width:60%">Untitled-Note</h5>
            <p class="card-text">${notesobj[index]}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
            </div>
            <h9 class="card-title" style="width:40%; font-size:10px;">${datetimearr[index]}</h9> 
            </div>`;
      }else{
        txt += ` <div class="noteCard my-1 mx-1 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${notetitlearr[index]}</h5>
            <p class="card-text">${notesobj[index]}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
          </div>
          <h9 class="card-title" style="width:40%; font-size:10px;" >${datetimearr[index]}</h9>
        </div>`;
    }  }

  let noteselm = document.getElementById("notes");
  let notestitelm = document.getElementById("notetitle");
  let dttimeelm= document.getElementById("datetime");
  
  if (notesobj.length != 0) {
    noteselm.innerHTML = txt;
  } else {
    noteselm.innerHTML = " <h6><b>Nothing to show !</b><h6> ";
  }
}

//fn to delete saved notes
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  let notetitle=localStorage.getItem("notetitle");
  let datetime= localStorage.getItem(`datetime`);

  if (notes == null) {
    notesobj = [];
    notetitle= [];
    datetimearr=[];
  } else {
    notesobj = JSON.parse(notes);
    notetitlearr= JSON.parse(notetitle);
    datetimearr= JSON.parse(datetime);
  }
  notesobj.splice(index, 1);
  notetitlearr.splice(index,1);
  datetimearr.splice(index,1);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  localStorage.setItem(`notetitle`, JSON.stringify(notetitlearr));
  localStorage.setItem(`datetime`,JSON.stringify(datetimearr));
  shownotes();
}

//fn to search a word
let search= document.getElementById("search");
search.addEventListener("input", function () {
  let ipvalue= search.value;
  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach(function (element) {
    let cartxt = element.getElementsByTagName("p")[0].innerText;
    let cartitle=element.getElementsByTagName("h5")[0].innerText;

    if (cartxt.includes(ipvalue)|| cartitle.includes(ipvalue)){
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

//Modal
/*
    $(function() {
        $('[data-toggle="modal"]').hover(function() {
            var modalId = $(this).data('target');
            $(modalId).modal('show');
        });
    });
*/