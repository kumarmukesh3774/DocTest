var fs=require('fs');
var natural=require('natural');

var data=fs.readFileSync('docs/file1.txt','utf8');
var data1=fs.readFileSync('docs/file2.txt','utf8');
var dict=fs.readFileSync('docs/dict.txt','utf8');

stat={
  sample:{
    sampleCount:0,
    nouns:0,
    adj:0,
    verb:0,
    adv:0
  },
  standard:{
    standardCount:0,
    nouns1:0,
    adj1:0,
    verb1:0,
    adv1:0
  },
  results:{
    perWordCount:0,
    perNoun:0,
    perAdj:0,
    perVerb:0,
    perAdv:0
  }

};
var missSpell=0;
var missSpell1=0;
var percentMissSpell=0;

var tokenizer= new natural.WordTokenizer();
var textArr=tokenizer.tokenize(data);
var textArr1=tokenizer.tokenize(data1);
var dictArr=tokenizer.tokenize(dict);


stat.sample.sampleCount=textArr.length;;
stat.standard.standardCount=textArr1.length;;
stat.results.perWordCount=parseInt((stat.sample.sampleCount/stat.standard.standardCount)*100);;

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

percentMissSpell=parseInt(((missSpell1-missSpell)/missSpell1)*100);
stat.sample.missSpell=missSpell;
stat.standard.missSpell1=missSpell1;
stat.results.percentMissSpell=percentMissSpell;

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
        stat.sample.nouns=nouns;
        stat.standard.nouns1=nouns1;
        stat.results.perNoun=perNoun;
        stat.results.nounMatch=nounMatch;
        console.log(stat.results.perNoun+" perNoun");
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
        stat.sample.adj=adj;
        stat.standard.adj1=adj1;
        stat.results.perAdj=perAdj;
        stat.results.adjMatch=adjMatch;
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
        stat.sample.verb=verb;
        stat.standard.verb1=verb1;
        stat.results.perVerb=perVerbs;
        stat.results.verbMatch=verbMatch;
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
        stat.sample.adv=adv;
        stat.standard.adv1=adv1;
        stat.results.perAdv=perAdv;
        stat.results.advMatch=advMatch;
        console.log(perAdv+" perAdv");
        console.log(advMatch+" adv matches");


        var json=JSON.stringify(stat,null,2);
        fs.writeFile('json/stat.json',json,'utf8',(err)=>{
          if(err)
          {
            console.log("Error");
            return;
          }
          console.log("Success");
        });
    });
});

function match(result,result1) {
  var matchCount=0;
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
