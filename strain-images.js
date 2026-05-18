var StrainImages=(function(){

var FALLBACK_IMAGES = [
  "/images/strains/indica-1.jpg",
  "/images/strains/indica-2.jpg",
  "/images/strains/indica-3.jpg",
  "/images/strains/indica-4.jpg",
  "/images/strains/sativa-1.jpg",
  "/images/strains/sativa-2.jpg",
  "/images/strains/sativa-3.jpg",
  "/images/strains/sativa-4.jpg",
  "/images/strains/hybrid-1.jpg",
  "/images/strains/hybrid-2.jpg",
  "/images/strains/hybrid-3.jpg",
  "/images/strains/hybrid-4.jpg"
];

function hash(s){
  var h=5381;
  for(var i=0;i<s.length;i++){h=((h<<5)+h)+s.charCodeAt(i);h=h&h;}
  return Math.abs(h);
}

function generate(strain){
  var name = strain.name || "Cannabis";
  var type = (strain.type || "Hybrid");
  var typeLower = type.toLowerCase();
  var mapping = (typeof STRAIN_IMAGE_MAP !== "undefined") ? STRAIN_IMAGE_MAP[name] : null;

  var src, alt, isExact;

  if (mapping) {
    src = mapping.image;
    isExact = mapping.isExact;
    alt = isExact
      ? name + " cannabis flower photo"
      : "Representative cannabis flower image for " + name;
  } else {
    var idx = (hash(name) % FALLBACK_IMAGES.length);
    src = FALLBACK_IMAGES[idx];
    isExact = false;
    alt = "Representative cannabis flower image for " + name;
  }

  return '<img src="' + src + '" alt="' + alt + '" loading="lazy" decoding="async" width="600" height="400" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.onerror=null;this.src=\'/images/strains/' + typeLower + '-1.jpg\'"' + (isExact ? ' data-exact="true"' : ' data-exact="false"') + '>';
}

return{generate:generate};
})();
