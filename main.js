var count=1;
var mk=0;
var cd =0;
var to=0;
var ls=0;
var echo=0;
var cat=0;
var rm=0;
var ln=0;
var cp=0;
var ino;
var current='~'

window.onload=function(){
  var check=getInode();
  if(isNaN(check))
  myStorage.set("INODE",0);
  let n=localStorage.getItem('~');
  if(!n){
    let obj={
      inode:0,
      filename:new Array(),
      catalog:new Array(),
    };
    myStorage.set('~',obj);
  }
}

var myStorage={
  set:function(key,value){
      localStorage.setItem(key,JSON.stringify(value));
  }
}

function getInode(){
  ino=localStorage.getItem("INODE");
  return (function(){
    inod=parseInt(ino);
    return inod;
  })();
}

function func(event){
  var a=event.keyCode;
  if (a==32){
    getValue_pre();
  }
  if(a==13){
    getValue();
   }
  }

function getValue(){
  var inputValue=document.getElementById("input-text"+count).value;
  switch(inputValue){
    case '':Space();break;
    case 'help':Help();Space();break;
    case 'ls':Ls();break;
  }
  if(mk==1){
    mk=0;
    let pre=current.lastIndexOf("\/");
    let list=current.substring(pre+1);
    console.log(list);
    var after=inputValue.match(/mkdir\u0020(.*)/)[1];
    var folder=localStorage.getItem(list);
    folder=JSON.parse(folder);
    folder.catalog.push(after);
    console.log(folder.catalog);
    myStorage.set(list,folder);
    ino=getInode()+1;
      myStorage.set("INODE",ino);
      obj={
        inode:ino,
        filename:new Array(),
        catalog:new Array(),
        date:new Date().toLocaleString(),
        authority:'drwxrwxr-x'
      };
      myStorage.set(after,obj);
    Space();
  }
  if(cd==1){
    cd=0;
    count++;
    var after=inputValue.match(/cd\u0020(.*)/)[1];
    if(after!='..'){
      current+='/'+after;
      var add=document.createElement("div");
      add.innerHTML='<span class="pre"><span class="usr">li@li</span>:</span>'+current+'<span class="pre">$ </span><input id="input-text'+count+'" class="text" type="text" onkeypress="func(event)" ></input>';
      document.body.appendChild(add);
      var pos=add.lastChild;
      pos.focus();
    }
    else{
      var t=current.lastIndexOf("\/");
      current=current.substring(0,t);
      var add=document.createElement("div");
      add.innerHTML='<span class="pre"><span class="usr">li@li</span>:</span>'+current+'<span class="pre">$ </span><input id="input-text'+count+'" class="text" type="text" onkeypress="func(event)" ></input>';
      document.body.appendChild(add);
      var pos=add.lastChild;
      pos.focus();
    }
  }
  
  if(to==1){
    to=0;
    count++;
    var after=inputValue.match(/touch\u0020(.*)/)[1];
    var pre=current.lastIndexOf("\/");
    var list=current.substring(pre+1);
    ino=getInode()+1;
    myStorage.set("INODE",ino);
    var data={
      inode:ino,
      link:0,
      data_block:null,
      type:'file',
      date:new Date().toLocaleString(),
      authority:'-rw-rw-r--'
    };
    var folder=localStorage.getItem(list);
    folder=JSON.parse(folder);
    folder.filename.push(after);
    console.log(folder.filename);
    myStorage.set(list,folder);
    myStorage.set(after,data);
    Space();
  }

  if(ls==1){
    ls=0;
    var after=inputValue.match(/ls\u0020(.*)/)[1];
    if(after=='-a'){
      let Div=document.createElement("div");
      Div.innerHTML='<span class="usr">.'+'   '+'..</span>';
      document.body.appendChild(Div);
      Ls();
    }
    if(after=='-l'){
      let pre=current.lastIndexOf("\/");
      let list=current.substring(pre+1);
      let file=localStorage.getItem(list);
      file=JSON.parse(file);
      let files=file.filename;
      let content=file.catalog;
      if(content){
        for(let i=0;i<content.length;i++){
          let s=localStorage.getItem(content[i]);
          s=JSON.parse(s);
          let Div=document.createElement('div');
          let length=s.catalog.length+s.filename.length;
          Div.innerHTML=s.authority+' '+length+' li li '+s.date+' <span class="usr">'+content[i]+'</span>';
          document.body.appendChild(Div);
        }
      }
      for(let n=0;n<files.length;n++){
        let d=localStorage.getItem(files[n]);
        d=JSON.parse(d);
        let div=document.createElement('div');
        div.innerHTML=d.authority+' 1 li li '+d.date+' '+files[n];
        document.body.appendChild(div);
      }
    }
    Space();
  }

  if(echo==1){
    echo=0;
    let after=inputValue.match(/echo\u0020(.*)/)[1];
    let markd=/\"/;
    let marks=/\'/;
    let files=/\u0020\>\u0020/;
    let infile=files.test(after);
    let testd=markd.test(after);
    let tests=marks.test(after);
    if(testd||tests){
      if(infile){
        let last=(function(){
          let x=after.lastIndexOf(' ');
          return x;
        })();
        let second=(function(){
          let x=after.lastIndexOf(' ',last-1);
          return x;
        })();
        let a=after.substring(1,second-1);
        let b=after.substring(last+1);
        console.log(a);
        console.log(b);
        let text=localStorage.getItem(b);
        text=JSON.parse(text);
        text.data_block=a;
        myStorage.set(b,text);
      }
      else{
        after=after.replace("\"","");
        after=after.replace("\"","");
        after=after.replace("\'","");
        after=after.replace("\'","");
        let Div=document.createElement("div");
        Div.innerHTML=after;
        document.body.appendChild(Div);
      }
    }
    else{
      if(infile){
        let last=(function(){
          let x=after.lastIndexOf(' ');
          return x;
        })();
        let second=(function(){
          let x=after.lastIndexOf(' ',last-1);
          return x;
        })();
        let a=after.substring(0,second);
        let b=after.substring(last+1);
        console.log(a);
        console.log(b);
        let text=localStorage.getItem(b);
        text=JSON.parse(text);
        text.data_block=a;
        myStorage.set(b,text);
      }
      else{
        let Div=document.createElement("div");
        Div.innerHTML=after;
        document.body.appendChild(Div);
      }
    } 
    Space();
  }
  if(cat==1){
    cat=0;
    let after=inputValue.match(/cat\u0020(.*)/)[1];
    let get=localStorage.getItem(after);
    get=JSON.parse(get);
    /*有问题*/                                             /* !!!!!*/
    if((get.type)=='softlink'){
      let name=get.data_block;
      let n=localStorage.getItem(name);
      n=JSON.parse(n);
      console.log(n);
      let Div=document.createElement("div");
      Div.innerHTML=n.data_block;
      document.body.appendChild(Div);
    }
    else{
      let Div=document.createElement("div");
      Div.innerHTML=get.data_block;
      document.body.appendChild(Div);
    }
    Space();
  }
  if(rm==1){
    rm=0;
    let after=inputValue.match(/rm\u0020(.*)/)[1];
    let pre=current.lastIndexOf("\/");
    let list=current.substring(pre+1);
    let r=/\-r/;
    if(r.test(after)){
       
    }
    else{
      let get=localStorage.getItem(list);
      get=JSON.parse(get);
      let q=get.filename.indexOf(after);
      get.filename.splice(q,1);
      console.log(get);
      myStorage.set(list,get);
      localStorage.removeItem(after);
    }   
    Space();
  }
  if(ln==1){
    ln=0;
    let after=inputValue.match(/ln\u0020(.*)/)[1];
    let pre=current.lastIndexOf("\/");
    let list=current.substring(pre+1);
    let x=/\-s/;
    if(x.test(after)){
      let last=(function(){
        let x=after.lastIndexOf(' ');
        return x;
      })();
      let second=(function(){
        let x=after.lastIndexOf(' ',last-1);
        return x;
      })();
      let a=after.substring(second+1,last);
      let b=after.substring(last+1);
      console.log(a);
      let get=localStorage.getItem(a);
      get=JSON.parse(get);
      console.log(get);
      ino=getInode()+1;
      myStorage.set("INODE",ino);
      let data={
      inode:ino,
      link:0,
      data_block:a,
      type:'softlink'
      };
      let folder=localStorage.getItem(list);
      folder=JSON.parse(folder);
      folder.filename.push(b);
      myStorage.set(b,data);
      myStorage.set(list,folder);
    }
    else{
      let last=after.lastIndexOf(' ');
      let a=after.substring(0,last);
      let b=after.substring(last+1);
      let get=localStorage.getItem(a);
      get=JSON.parse(get);
      get.link=get.link+1;
      let f=localStorage.getItem(list);
      f=JSON.parse(f);
      f.filename.push(b);
      let set={};
      set.inode=get.inode;
      set.link=get.link;
      set.data_block=get.data_block;
      set.type=get.type;
      myStorage.set(b,set);
      myStorage.set(a,get);
      myStorage.set(list,f);
    }
    Space();
  }
  if(cp==1){
    cp=0;
    let after=inputValue.match(/cp\u0020(.*)/)[1];
    let last=(function(){
      let x=after.lastIndexOf(' ');
      return x;
    })();
    let second=(function(){
      let x=after.lastIndexOf(' ',last-1);
      return x;
    })();
    let a=after.substring(second+1,last);
    let b=after.substring(last+1);
    let t=/\//;
    if(!(t.test(b))){
      let get=localStorage.getItem(a);
      get=JSON.parse(get);
      let getter=localStorage.getItem(b);
      getter=JSON.parse(getter);
      getter.data_block=get.data_block;
      myStorage.set(b,getter);
    }
    else{
      b=b.substring(0,b.length-1);
      let getter=localStorage.getItem(a);
      getter=JSON.parse(getter);
      ino=getInode()+1;
      myStorage.set("INODE",ino);
      let data={};
      data.inode=ino;
      data.link=0;
      data_block=a.data_block;
      data.type='file';
      let get=localStorage.getItem(b);
      get=JSON.parse(get);
      get.filename.push(a+'/'+data.inode+' ');
      myStorage.set(a+'/'+data.inode,data,data+' ');
      myStorage.set(b,get);
    }
    Space();
  }
}

function getValue_pre(){
  var inputValuep=document.getElementById("input-text"+count).value;
  switch(inputValuep){
    case 'mkdir':mk=1;break;
    case 'cd':cd=1;break;
    case 'touch':to=1;break;
    case 'ls':ls=1;break;
    case 'echo':echo=1;break;
    case 'cat':cat=1;break;
    case 'rm':rm=1;break;
    case 'ln':ln=1;break;
    case 'cp':cp=1;break;
  }
}

function Space(){
  count++;
  var Div=document.createElement("div");
  Div.innerHTML='<span class="pre"><span class="usr">li@li</span>:'+current+'$ </span><input id="input-text'+count+'" class="text" type="text" onkeypress="func(event)" >';
  document.body.appendChild(Div);
  var pos=Div.lastChild;
  pos.focus();
}

function Help(){
  var tip=document.createElement("div");
  tip.innerHTML='<span class="pre">You can use following commends.<br/><br/>ls<br/>mkdir<br/>touch<br/>ln<br/>cp<br/>rm<br/>cat<br/>echo<br/></span>';
  document.body.appendChild(tip);
}

function Ls(){   
  var pre=current.lastIndexOf("\/");
  var list=current.substring(pre+1);
  var file=localStorage.getItem(list);
  file=JSON.parse(file);
  var files=file.filename;
  var content=file.catalog;
  var t=/\//g;
  if((t.test(files))){
    let file=files.join(',');
    console.log(file);
    let f=file.replace(/\/(.+?)\,/g,',');
    f=f.replace(/\/(.+?)\ /,'');
    let name=f.split(',');
    console.log(name);
    files=name;
  }
  var Div=document.createElement("div");
  Div.innerHTML=files;
  document.body.appendChild(Div);
  let cata=document.createElement("div");
  cata.innerHTML='<span class="usr">'+content+'</span>';
  document.body.appendChild(cata);
  Space();
}

