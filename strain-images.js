var StrainImages=(function(){
var _c=0;

function hash(s){
  var h=5381;
  for(var i=0;i<s.length;i++){h=((h<<5)+h)+s.charCodeAt(i);h=h&h;}
  return Math.abs(h);
}

function rng(seed,idx){
  var x=Math.sin(seed*0.00137+idx*127.1)*43758.5453;
  return x-Math.floor(x);
}

function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}

function hsl(h,s,l,a){
  h=Math.round(((h%360)+360)%360);
  s=Math.round(clamp(s,0,100));
  l=Math.round(clamp(l,0,100));
  if(a!==undefined) return"hsla("+h+","+s+"%,"+l+"%,"+a.toFixed(2)+")";
  return"hsl("+h+","+s+"%,"+l+"%)";
}

function generate(strain){
  _c++;
  var seed=hash(strain.name);
  var type=(strain.type||"Hybrid").toLowerCase();
  var uid="sv"+_c;
  var W=300,H=200,cx=150,cy=100;

  var bh,bs,bl;
  if(type==="indica"){
    bh=265+rng(seed,0)*35;bs=38+rng(seed,1)*22;bl=24+rng(seed,2)*10;
  }else if(type==="sativa"){
    bh=85+rng(seed,0)*45;bs=42+rng(seed,1)*25;bl=27+rng(seed,2)*10;
  }else{
    bh=155+rng(seed,0)*45;bs=40+rng(seed,1)*22;bl=25+rng(seed,2)*10;
  }

  var flavs=strain.flavors||[];
  var ah=bh;
  for(var fi=0;fi<flavs.length;fi++){
    var fl=flavs[fi].toLowerCase();
    if(fl.indexOf("berry")>-1||fl.indexOf("grape")>-1||fl.indexOf("blueberry")>-1){ah=280;break;}
    if(fl.indexOf("citrus")>-1||fl.indexOf("lemon")>-1||fl.indexOf("orange")>-1||fl.indexOf("tangerine")>-1){ah=45;break;}
    if(fl.indexOf("strawberry")>-1||fl.indexOf("cherry")>-1){ah=350;break;}
    if(fl.indexOf("tropical")>-1||fl.indexOf("mango")>-1||fl.indexOf("pineapple")>-1){ah=30;break;}
    if(fl.indexOf("vanilla")>-1||fl.indexOf("candy")>-1||fl.indexOf("cake")>-1){ah=320;break;}
    if(fl.indexOf("diesel")>-1||fl.indexOf("gas")>-1||fl.indexOf("chemical")>-1){ah=50;break;}
    if(fl.indexOf("pine")>-1||fl.indexOf("woody")>-1){ah=140;break;}
    if(fl.indexOf("chocolate")>-1||fl.indexOf("coffee")>-1){ah=25;break;}
    if(fl.indexOf("mint")>-1||fl.indexOf("menthol")>-1){ah=165;break;}
  }

  var thcVal=parseFloat((strain.thc||"20%").replace(/[^0-9.]/g,""))||20;
  if(strain.thc&&strain.thc.indexOf("-")>-1){
    var parts=strain.thc.split("-");
    thcVal=parseFloat(parts[1])||parseFloat(parts[0])||20;
  }

  var svg='<svg viewBox="0 0 '+W+" "+H+'" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">';

  svg+="<defs>";
  svg+='<radialGradient id="'+uid+'g"><stop offset="0%" stop-color="'+hsl(bh,bs+18,bl+18,0.55)+'"/><stop offset="100%" stop-color="'+hsl(bh,bs,bl,0)+'"/></radialGradient>';
  svg+='<radialGradient id="'+uid+'h"><stop offset="0%" stop-color="rgba(255,255,255,0.14)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient>';
  svg+="</defs>";

  svg+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="100" ry="78" fill="url(#'+uid+'g)"/>';

  svg+='<ellipse cx="'+cx+'" cy="'+(cy+38)+'" rx="40" ry="8" fill="rgba(0,0,0,0.18)"/>';

  var nc=5+Math.floor(rng(seed,10)*3);
  for(var i=0;i<nc;i++){
    var ang=(360/nc)*i+rng(seed,20+i)*50-25;
    var dist=rng(seed,30+i)*22+4;
    var ex=cx+Math.cos(ang*Math.PI/180)*dist;
    var ey=cy+Math.sin(ang*Math.PI/180)*dist*0.7;
    var erx=22+rng(seed,40+i)*18;
    var ery=17+rng(seed,50+i)*14;
    var rot=rng(seed,60+i)*360;
    var ch=bh+(rng(seed,70+i)-0.5)*28;
    var cs=bs+(rng(seed,80+i)-0.5)*14;
    var cl=bl+rng(seed,90+i)*10+3;
    svg+='<ellipse cx="'+ex.toFixed(1)+'" cy="'+ey.toFixed(1)+'" rx="'+erx.toFixed(1)+'" ry="'+ery.toFixed(1)+'" fill="'+hsl(ch,cs,cl)+'" opacity="0.82" transform="rotate('+rot.toFixed(0)+" "+ex.toFixed(1)+" "+ey.toFixed(1)+')"/>';
  }

  var nci=3+Math.floor(rng(seed,100)*3);
  for(var i=0;i<nci;i++){
    var ang2=rng(seed,110+i)*360;
    var dist2=rng(seed,120+i)*14;
    var ex2=cx+Math.cos(ang2*Math.PI/180)*dist2;
    var ey2=cy+Math.sin(ang2*Math.PI/180)*dist2*0.7;
    var erx2=10+rng(seed,130+i)*10;
    var ery2=8+rng(seed,140+i)*8;
    var rot2=rng(seed,150+i)*360;
    var ch2=bh+(rng(seed,160+i)-0.5)*15;
    var cl2=bl+14+rng(seed,170+i)*8;
    svg+='<ellipse cx="'+ex2.toFixed(1)+'" cy="'+ey2.toFixed(1)+'" rx="'+erx2.toFixed(1)+'" ry="'+ery2.toFixed(1)+'" fill="'+hsl(ch2,bs+8,cl2)+'" opacity="0.65" transform="rotate('+rot2.toFixed(0)+" "+ex2.toFixed(1)+" "+ey2.toFixed(1)+')"/>';
  }

  var nl=2+Math.floor(rng(seed,180)*2);
  for(var i=0;i<nl;i++){
    var lang=rng(seed,190+i)*360;
    var ldist=32+rng(seed,200+i)*14;
    var lx=cx+Math.cos(lang*Math.PI/180)*ldist;
    var ly=cy+Math.sin(lang*Math.PI/180)*ldist*0.65;
    var lrot=lang+90+(rng(seed,210+i)-0.5)*50;
    var llen=16+rng(seed,220+i)*12;
    var lwid=4+rng(seed,230+i)*3;
    var lhue=type==="indica"?120+rng(seed,240+i)*25:bh+(rng(seed,240+i)-0.5)*20;
    svg+='<ellipse cx="'+lx.toFixed(1)+'" cy="'+ly.toFixed(1)+'" rx="'+lwid.toFixed(1)+'" ry="'+llen.toFixed(1)+'" fill="'+hsl(lhue,42,28)+'" opacity="0.55" transform="rotate('+lrot.toFixed(0)+" "+lx.toFixed(1)+" "+ly.toFixed(1)+')"/>';
  }

  svg+='<ellipse cx="'+(cx-12)+'" cy="'+(cy-14)+'" rx="32" ry="22" fill="url(#'+uid+'h)" transform="rotate(-25 '+(cx-12)+" "+(cy-14)+')"/>';

  var nt=Math.round((10+rng(seed,250)*12)*(thcVal/20));
  nt=clamp(nt,6,28);
  for(var i=0;i<nt;i++){
    var tx=cx+(rng(seed,260+i)-0.5)*62;
    var ty=cy+(rng(seed,270+i)-0.5)*46;
    var tr=0.7+rng(seed,280+i)*2;
    var to=0.22+rng(seed,290+i)*0.55;
    svg+='<circle cx="'+tx.toFixed(1)+'" cy="'+ty.toFixed(1)+'" r="'+tr.toFixed(1)+'" fill="rgba(255,255,255,'+to.toFixed(2)+')"/>';
  }

  var np=4+Math.floor(rng(seed,300)*5);
  var ph=(ah+18)%360;
  for(var i=0;i<np;i++){
    var px=cx+(rng(seed,310+i)-0.5)*44;
    var py=cy+(rng(seed,320+i)-0.5)*32;
    var dir=rng(seed,325+i)>0.5?1:-1;
    var pcx2=px+dir*(4+rng(seed,330+i)*14);
    var pcy2=py-5-rng(seed,340+i)*14;
    var pex2=pcx2+dir*(3+rng(seed,350+i)*10);
    var pey2=pcy2-3-rng(seed,360+i)*9;
    var psat=55+rng(seed,370+i)*20;
    var plit=48+rng(seed,380+i)*15;
    svg+='<path d="M'+px.toFixed(1)+","+py.toFixed(1)+" Q"+pcx2.toFixed(1)+","+pcy2.toFixed(1)+" "+pex2.toFixed(1)+","+pey2.toFixed(1)+'" stroke="'+hsl(ph,psat,plit)+'" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.75"/>';
  }

  var ns=Math.floor(rng(seed,400)*3)+1;
  for(var i=0;i<ns;i++){
    var sx=cx+(rng(seed,410+i)-0.5)*50;
    var sy=cy+(rng(seed,420+i)-0.5)*36;
    var sr=2+rng(seed,430+i)*2.5;
    svg+='<circle cx="'+sx.toFixed(1)+'" cy="'+sy.toFixed(1)+'" r="'+sr.toFixed(1)+'" fill="rgba(255,255,255,0.08)"/>';
    svg+='<circle cx="'+sx.toFixed(1)+'" cy="'+sy.toFixed(1)+'" r="'+(sr*0.35).toFixed(1)+'" fill="rgba(255,255,255,0.5)"/>';
  }

  svg+="</svg>";
  return svg;
}

return{generate:generate};
})();
