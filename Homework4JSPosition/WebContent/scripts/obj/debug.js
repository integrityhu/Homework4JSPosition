DEBUG_DEFINED = true;

function ClearDebug(){
  ClearDebugDiv("delta_debug_div");
  ClearDebugDiv("mouse_debug_div");
};

function setVisible(name,value){
  document.getElementById(name).style.display=value;
}

function DebugIsVisible(visble){
  setVisible('delta_debug_div',visble);
  setVisible('mouse_debug_div',visble);
}  

function setDebugDiv(divname,content,append){
  if (append)
    document.getElementById(divname).innerHTML+=content.toString().replace(/\n/g,'<br>');
  else
    document.getElementById(divname).innerHTML=content.toString().replace(/\n/g,'<br>');
}

function ClearDebugDiv(divname){
  document.getElementById(divname).innerHTML='';
}