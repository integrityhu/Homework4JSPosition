if(typeof Array.prototype.copy==='undefined'){
  Array.prototype.copy=
    function(){
      var a=new Array();
      for(var keyval in this){
        a[keyval]=(typeof this[keyval].copy!=='undefined')?this[keyval].copy():this[keyval];
      }
      return a;
    };
}
