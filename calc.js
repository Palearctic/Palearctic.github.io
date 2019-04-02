/*同消しはトリプルまでしか対応していません*/

var max_chain=13;
var chain_bonus_list=[0,0,8,16,32,64,96,128,160,192,224,256,288,320,352,384,416,448,480,512];
var connect_bonus_list=[0,0,0,0,0,2,3,4,5,6,7,10];
var color_bonus_list=[0,0,3,6];

function set(){
	var chains=parseInt(document.chain.chain.value);
	if(chains<=max_chain){
		for(var i=1;i<=chains;i++){
			eval("document.chain"+String(i)+".one.value=4");
		}
		for(var i=chains+1;i<=max_chain;i++){
			var p=String(i);
			eval("document.chain"+p+".one.value=0");
			eval("document.chain"+p+".two.value=0");
			eval("document.chain"+p+".three.value=0");
		}
	}		
}

function calc_score(){
	var ans=0;
	var vanish_puyo,connect_bonus,sin,dou,tri,p;
	for(var i=1;i<=max_chain;i++){
		p=String(i);
		var elements=document.getElementsByName(p);
		for(var color="",j=elements.length;j--;){
			if(elements[j].checked){
				var color=parseInt(elements[j].value);
				break;
			}
		}
		sin=parseInt(eval("document.chain"+p+".one.value"));
		dou=parseInt(eval("document.chain"+p+".two.value"));
		tri=parseInt(eval("document.chain"+p+".three.value"));
		vanish_puyo=sin+dou+tri;
		connect_bonus=connect_bonus_list[sin]+connect_bonus_list[dou]+connect_bonus_list[tri];
		ans+=vanish_puyo*Math.max(1,chain_bonus_list[i]+connect_bonus+color_bonus_list[color])*10;
	}
	document.ans.ans.value=ans;
	document.ans.ozyama.value=Math.floor(ans/70);
}