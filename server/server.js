var fs=require('fs');
var natural=require('natural');

var data=fs.readFileSync('file1.txt','utf8');
var data1=fs.readFileSync('file2.txt','utf8');
var dict=fs.readFileSync('dict.txt','utf8');

var stat=[];
var sample={};
var standard={};
var results={};
var missSpell=0;
var missSpell1=0;
var percentMissSpell=0;

var tokenizer= new natural.WordTokenizer();
var textArr=tokenizer.tokenize(data);
var textArr1=tokenizer.tokenize(data1);
var dictArr=tokenizer.tokenize(dict);

var sampleCount=textArr.length;
var standardCount=textArr1.length;
var perWordCount=parseInt((sampleCount/standardCount)*100);
sample.sampleCount=sampleCount;
standard.standardCount=standardCount;
results.perWordCount=perWordCount;
var spellcheck= new natural.Spellcheck(dictArr);

for(var i=0;i<textArr.length;i++)
{
  if(!spellcheck.isCorrect(textArr[i].toLowerCase()))
  missSpell++;
}
for(i=0;i<textArr1.length;i++)
{
  if(!spellcheck.isCorrect(textArr1[i].toLowerCase()))
  missSpell1++;
}
percentMissSpell=parseInt((missSpell/missSpell1)*100);

sample.missSpell=missSpell;
standard.missSpell1=missSpell1;
results.percentMissSpell=percentMissSpell;

    console.log(missSpell+"----"+missSpell1+"---"+ percentMissSpell);
var WordPOS = require('wordpos');
    wordpos = new WordPOS();
var k=0;
var res=[];
var nouns,adj,verb,adv;
var nouns1,adj1,verb1,adv1;
var nounMatch=0,adjMatch=0,verbMatch=0,adjMatch=0;
var perNoun,perAdj,perVerb,perAdj;
wordpos.getNouns(textArr, function(result){
    nouns=result.length;
    console.log('nouns :'+nouns+'\n');
    wordpos.getNouns(textArr1, function(result1){
        nouns1=result1.length;
        console.log('nouns1:'+nouns1+'\n');
        nounMatch=match(result,result1);
        perNoun=parseInt((nouns/nouns1)*100);
        console.log(perNoun+" perNoun");
        console.log(nounMatch+" noun matches");
    });
});
wordpos.getAdjectives(textArr, function(result){
    adj=result.length;
    console.log('adj :'+adj+'\n');
    wordpos.getAdjectives(textArr1, function(result1){
        adj1=result1.length;
        console.log('adj1:'+nouns1+'\n');
        adjMatch=match(result,result1);
        perAdj=parseInt((adj/adj1)*100)
        console.log(perAdj+" perAdj");
        console.log(adjMatch+" adj matches");
    });

});
wordpos.getVerbs(textArr, function(result){
    verb=result.length;
    console.log('verb :'+verb+'\n');
    wordpos.getVerbs(textArr1, function(result1){
        verb1=result1.length;
        console.log('verb1:'+verb1+'\n');
        verbMatch=match(result,result1);
        perVerbs=parseInt((verb/verb1)*100);
        console.log(perVerbs+" perVerb");
        console.log(verbMatch+" verb matches");
    });
});
wordpos.getAdverbs(textArr, function(result){
    adv=result.length;
    console.log('adv :'+adv+'\n');
    wordpos.getAdverbs(textArr1, function(result1){
        adv1=result1.length;
        console.log('adv1:'+adv1+'\n');
        advMatch=match(result,result1);
        perAdv=parseInt((adv/adv1)*100);
        console.log(perAdv+" perAdv");
        console.log(advMatch+" adv matches");
    });
});
function match(result,result1) {
  var matchCount=0;
  var  res=[];
  for(var i=0;i<result1.length;i++)
  {
    res[i]=result1[i].toLowerCase();
    }
  var matchChecker= new natural.Spellcheck(res);
  for(var i=0;i<result.length;i++)
  {
    if(matchChecker.isCorrect(result[i].toLowerCase())){
      matchCount++;    }
  }
  return matchCount;
}
stat.push(sample);
stat.push(standard);
stat.push(results);
var json=JSON.stringify(stat,null,2);
fs.writeFile('stat.json',json,'utf8',(err)=>{
  if(err)
  {
    console.log("Error");
    return;
  }
  console.log("Success");
})
