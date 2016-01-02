  var navAgent = navigator.userAgent;
  var isMOZ = (navAgent.indexOf("Gecko")>=0 ? true : false); // Mozilla
  var isIE = (navAgent.indexOf("MSIE")>=0 ? true : false); // IE or compatible
  var isKonq = (navAgent.indexOf("Konqueror")>=0 ? true : false); // Konqueror or compatible
  var isOpera = !!(window.opera && document.getElementById);
  

  function getEventButton(e){
    return isIE?new Array(e.button&1,e.button&4,e.button&2):isKonq?new Array(e.button==1,e.button==3,e.button==2):isOpera?new Array(e.button==0,e.button==1,e.button==3):new Array(e.button==0,e.button==1,e.button==2);
  }


  function getOffset(obj) {
    var left = obj.offsetLeft;
    var top = obj.offsetTop;
    while (obj.tagName != "BODY") {
    obj = obj.offsetParent;
    left += obj.offsetLeft;
    top  += obj.offsetTop;
   } 
   //if (isIE){
   //	top+=(document.body.clientHeight-document.body.offsetHeight);
   //	left+=(document.body.clientWidth-document.body.offsetWidth);
   //}
   return Array(left, top);
  }
  

  function CoordAbstract(){
    this.raster_X=0;
    this.raster_Y=0;

    this.copy=copy_coords;
    this.toString=coordsToString;
  }
  

  function coordsToString(){
    var res='raster_X='+this.raster_X+';';
    res+='raster_Y='+this.raster_Y+';';
    return res;
  }


  function mouseToString(){
    var res = '<b>ButtonE:</b>'+this.LastButtonE+'\n';
    res+= '<b>ButtonState:</b>('+this.ButtonState[0]+',';
    res+=this.ButtonState[1]+',';
    res+=this.ButtonState[2]+')\n';
    res+='<b>PosNow:</b>\n'+this.PosNow+'\n';
    res+='<b>LastDown</b>\n'+this.LastDown+'\n';
    res+='<b>LastUp</b>\n'+this.LastUp+'\n';
    res+='<b>Delta</b>\n'+this.Delta+'\n';
    return res;
  }
  

  function mouse_debug(){
    if (DEBUG_DEFINED) setDebugDiv("mouse_debug_div",obj_mouse,false);
  }
  

  function copy_coords(srcobj){
    this.raster_X=srcobj.raster_X;
    this.raster_Y=srcobj.raster_Y;
  }
  

  function OnMouseUp(e){
    this.LastButtonE=e.button;
    var buttons=getEventButton(e);
    for (var i=buttons.length;i--;) {
      if (buttons[i]) {
        this.Delta[i].raster_X=this.PosNow.raster_X-this.LastDown[i].raster_X;
        this.Delta[i].raster_Y=this.PosNow.raster_Y-this.LastDown[i].raster_Y;
      }
    }
    this.debug();
  }


  function OnMouseDown(e){
    this.LastButtonE=e.button;
    this.debug();
  }
  

  function OnMouseMove(e){
    for(var i=3;i--;){
      if (this.ButtonState[i]){
          this.Delta[i].raster_X=this.PosNow.raster_X-this.LastDown[i].raster_X;
          this.Delta[i].raster_Y=this.PosNow.raster_Y-this.LastDown[i].raster_Y;
        }
    }
    this.debug();
  }
   

  function MouseAbstract(){
    this.LastButtonE;
    this.ButtonState=Array(false,false,false);

    this.LastDown=new Array(new CoordAbstract(),new CoordAbstract(),new CoordAbstract());

    this.LastUp=new Array(new CoordAbstract(),new CoordAbstract(),new CoordAbstract());

    this.Delta=new Array(new CoordAbstract(),new CoordAbstract(),new CoordAbstract());

    this.PosNow=new CoordAbstract();

    this.OnMouseUp=OnMouseUp;
    this.OnMouseDown=OnMouseDown;
    this.OnMouseMove=OnMouseMove;
    this.toString=mouseToString;
    this.debug=mouse_debug;
  }

var obj_mouse=new MouseAbstract();
