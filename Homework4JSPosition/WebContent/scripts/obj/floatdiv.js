function ShowDiv(){
  if (this.OnGetInner) 
    this.Main_div.innerHTML=this.OnGetInner();
  this.Main_div.style.display='block';
  var dw=this.Main_div.style.pixelWidth||this.Main_div.offsetWidth;
  var dh=this.Main_div.pixelHeight||this.Main_div.offsetHeight;
  this.Shadow_div.style.width=dw;
  this.Shadow_div.style.height=dh;
  this.Shadow_div.style.display='block';
  var lvOffset=getOffset(this.Main_div);
  this.OffsetX=lvOffset[0];
  this.OffsetY=lvOffset[1];
  this.visible=true;
}

function HideDiv(){
  this.visible=false;
  this.Main_div.style.display='none';
  this.Shadow_div.style.display='none';
  LastDiv=null;
  obj_mouse.PosNow.FloatDiv=null;
}

function MoveDiv(dx,dy){
  this.Main_div.style.top=this.OffsetY+dy;
  this.Main_div.style.left=this.OffsetX+dx;
  this.Shadow_div.style.top=this.OffsetY+dy+10;
  this.Shadow_div.style.left=this.OffsetX+dx+10;  
}

function divOnMouseDown(e) {
  if (!e) e=event;
  obj_mouse.PosNow.FloatDiv=eval(this.tt_varname);
  var buttons=getEventButton(e);
  for (var i=buttons.length;i--;) {
    if (buttons[i]) {
      obj_mouse.LastDown[i].FloatDiv=obj_mouse.PosNow.FloatDiv;
      obj_mouse.Delta[i].FloatDiv=obj_mouse.PosNow.FloatDiv;
      LastDiv=obj_mouse.PosNow.FloatDiv;
    }
  }
  return true;
}

function divOnMouseUp(e) {
  if (!e) e=event;
  var buttons=getEventButton(e);
  for (var i=buttons.length;i--;) {
    if (buttons[i]) {
      obj_mouse.LastUp[i].FloatDiv=obj_mouse.PosNow.FloatDiv;
      LastDiv=obj_mouse.PosNow.FloatDiv;
    }
  }
  if (buttons[MoveButton]){
    var fdiv=eval(obj_mouse.LastDown[MoveButton].FloatDiv);
    if (fdiv){
      var lvOffset=getOffset(fdiv.Main_div);
      fdiv.OffsetX=lvOffset[0];
      fdiv.OffsetY=lvOffset[1];
    }
  }
  return true;
}

function divOnContext(e) {
  //if (!e) e=event;
  return false;
}

function divOnMouseOver(e) {
  obj_mouse.PosNow.FloatDiv=eval(this.varname);
  return true;
}

function divOnMouseOut(e) {
  obj_mouse.PosNow.FloatDiv=null;
  LastDiv=null;
  return true;
}

function FloatDiv(DivName,VarName,main_div,shadow_div,vx,vy,main_opacity,shadow_opacity){
  this.name=DivName;
  this.visible=false;
  this.movable=false;
  this.varname=VarName;
  this.Main_div=main_div;
  this.Main_div.tt_varname=VarName;
  this.Shadow_div=shadow_div;
  this.OffsetX=0;
  this.OffsetY=0;
  this.Main_div.style.top=vy;
  this.Main_div.style.left=vx;
  this.Shadow_div.style.top=vy+10;
  this.Shadow_div.style.left=vx+10;
  this.OnGetInner=null;
  this.Main_div.onmousedown=divOnMouseDown;
  this.Main_div.onmouseover=divOnMouseOver;
  this.Main_div.onmouseout=divOnMouseOut;
  this.Main_div.onmouseup=divOnMouseUp;
  this.Main_div.oncontextmenu=divOnContext;
  if (isIE){
    this.Main_div.style.filter = 'alpha(opacity=' + main_opacity + ')';
  } else {
    this.Main_div.style.opacity = main_opacity/100;
  }
  if (isIE){
    this.Shadow_div.style.filter = 'alpha(opacity=' + shadow_opacity + ')';
  } else {
    this.Shadow_div.style.opacity = shadow_opacity/100;
  }

  this.Show=ShowDiv;
  this.Move=MoveDiv;
  this.Hide=HideDiv;
}
