var StrainImages=(function(){

function hash(s){
  var h=5381;
  for(var i=0;i<s.length;i++){h=((h<<5)+h)+s.charCodeAt(i);h=h&h;}
  return Math.abs(h);
}

function generate(strain){
  var type=(strain.type||"Hybrid").toLowerCase();
  var seed=hash(strain.name);
  var idx=(seed%4)+1;
  var cat;
  if(type==="indica") cat="indica";
  else if(type==="sativa") cat="sativa";
  else cat="hybrid";
  var src="/images/strains/"+cat+"-"+idx+".jpg";
  var alt=(strain.name||"Cannabis")+" cannabis flower image";
  return '<img src="'+src+'" alt="'+alt+'" loading="lazy" decoding="async" width="600" height="400" style="width:100%;height:100%;object-fit:cover;display:block;">';
}

return{generate:generate};
})();
