function receiver()
{
var xmlhttp=new XMLHttpRequest();
var url ="http://localhost:3000/db";

xmlhttp.open("GET",url,true);
xmlhttp.send();
xmlhttp.onreadystatechange =function()
{
if(this.readyState==4 && this.status==200)
{
var myArr=JSON.parse(this.responseText);
var sampleText="<div>"+"Words :"+myArr.sample.sampleCount + "</div>"+
                "Nouns : "+myArr.sample.nouns + "<br>"+
                "Adjective : "+myArr.sample.adj + "<br>"+
                "Verb : "+myArr.sample.verb + "<br>"+
                "Adverbs : "+myArr.sample.verb ;
var sampleText1="Words :"+myArr.standard.standardCount + "<br>"+
                "Nouns : "+myArr.standard.nouns1 + "<br>"+
                "Adjective : "+myArr.standard.adj1 + "<br>"+
                "Verb : "+myArr.standard.verb1 + "<br>"+
               "Adverbs : "+myArr.standard.verb1 ;
var sampleText2="Percent WordCount :"+myArr.results.perWordCount + "<br>"+
                 "Percent Nouns : "+myArr.results.perNoun + "<br>"+
                 "Percent Adjective : "+myArr.results.perAdj + "<br>"+
                 "Percent Verb : "+myArr.results.perVerb + "<br>"+
                  "Percent Adverbs : "+myArr.results.perAdv ;
//var dataObj=JSON.stringify(myArr);
document.getElementById("msg").innerHTML=sampleText;
document.getElementById("msg1").innerHTML=sampleText1;
document.getElementById("msg2").innerHTML=sampleText2;
}

};

}
