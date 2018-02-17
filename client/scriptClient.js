function receiver()
{
var xmlhttp=new XMLHttpRequest();
var url ="http://localhost:3000/db";
//opening connection to url
xmlhttp.open("GET",url,true);
xmlhttp.send();
xmlhttp.onreadystatechange =function()
{
if(this.readyState==4 && this.status==200)
{
var myArr=JSON.parse(this.responseText);

var sampleText=  "<div class='res'>"+"Words :"+myArr.sample.sampleCount +"<br>"+
                 "Nouns : "+myArr.sample.nouns + "<br>"+
                 "Adjective : "+myArr.sample.adj + "<br>"+
                 "Verb : "+myArr.sample.verb + "<br>"+
                 "Adverbs : "+myArr.sample.verb + "<br>"+
                 "missSpell: "+myArr.sample.missSpell+"</div>";

var sampleText1= "<div class='res'>"+"Words :"+myArr.standard.standardCount + "<br>"+
                 "Nouns : "+myArr.standard.nouns1 + "<br>"+
                 "Adjective : "+myArr.standard.adj1 + "<br>"+
                 "Verb : "+myArr.standard.verb1 + "<br>"+
                 "Adverbs : "+myArr.standard.verb1   + "<br>"+
                 "missSpell: "+myArr.standard.missSpell1+"</div>";
                 
var sampleText2="<div class='res'>"+"Percent WordCount :"+myArr.results.perWordCount + "<br>"+
                 "Percent Nouns : "+myArr.results.perNoun + "<br>"+
                 "Percent Adjective : "+myArr.results.perAdj + "<br>"+
                 "Percent Verb : "+myArr.results.perVerb + "<br>"+
                  "Percent Adverbs : "+myArr.results.perAdv  + "<br>"+
                  "Percent missSpell: "+myArr.results.percentMissSpell+"</div>";
//
document.getElementById("msg").innerHTML=sampleText;
document.getElementById("msg1").innerHTML=sampleText1;
document.getElementById("msg2").innerHTML=sampleText2;
}

};

}
