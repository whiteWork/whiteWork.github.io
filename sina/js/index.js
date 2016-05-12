// JavaScript Document



function show1(sId1){
    var oD1=document.getElementById(sId1);
    var aUl=oD1.getElementsByTagName('ul');
    var oDrop=document.getElementById('drop');
    var oSpan1=document.getElementById('span1');
    var aI=oSpan1.getElementsByTagName('i');

    for(var i=0;i<4;i++){
    aI[i].index=i;
    aI[i].onclick=function(){
       for(var i=0;i<4;i++){
           aI[i].className='';
           aUl[i].className='comList hide'
       }
        this.className='active';
        aUl[this.index].className='comList';
    };
    }
}

function show2(sId2){
    var oD2=document.getElementById(sId2);
    var aLi=oD2.getElementsByTagName('li');

    for(var i=0;i<aLi.length;i++){
      aLi[i].index=i;
        aLi[i].onclick=function(){

            for(var i=0; i<aLi.length;i++){
               aLi[i].className='';
            }
                this.className='noBl active';
        };
    }
}


function show3(Sbig,big){

    var oDiv=document.getElementById(Sbig);
    var aLi=oDiv.getElementsByTagName('li');
    var oDiv2=document.getElementById(big);
    var aDiv=oDiv2.getElementsByTagName('div');



    for(var i=0;i<aLi.length;i++){
      aLi[i].index=i;
        aLi[i].onclick=function(){

            for(var i=0; i<aLi.length;i++){

               aLi[i].className='';
               aDiv[i].className='tabs_item';
            }
                this.className='noBl active';
                aDiv[this.index].className='tabs_item show'
        };
    }
}

function show4(Sbig2,big2){

    var oDiv=document.getElementById(Sbig2);
    var aLi=oDiv.getElementsByTagName('li');
    var oDiv2=document.getElementById(big2);
    var aDiv=oDiv2.getElementsByTagName('div');



    for(var i=0;i<aLi.length;i++){
        aLi[i].index=i;
        aLi[i].onclick=function(){

            for(var i=0; i<aLi.length;i++){

               aLi[i].className='';
               aDiv[i].className='tabs_item';
            }
                this.className='noBl active';
                aDiv[this.index].className='tabs_item show'
        };
    }
}



function show5(Sbig2,big2){

    var oDiv=document.getElementById(Sbig2);
    var aDiv3=oDiv.getElementsByTagName('div');
    var oDiv2=document.getElementById(big2);
    var aDiv=oDiv2.getElementsByTagName('ul');



    for(var i=0;i<aDiv3.length;i++){
        aDiv3[i].index=i;
        aDiv3[i].onclick=function(){

            for(var i=0; i<aDiv3.length;i++){

                aDiv3[i].className='';
               aDiv[i].className='item';
            }
                this.className='active';
                aDiv[this.index].className='item show'
        };
    }
}

function show6(Sbig2,big2,ssbig){

    var oDiv=document.getElementById(Sbig2);
    var aSpan=oDiv.getElementsByTagName('span');
    var oSpan=document.getElementById(ssbig);
    var oDiv2=document.getElementById(big2);
    var aDiv=oDiv2.getElementsByTagName('div');




    for(var i=0;i<aSpan.length;i++){
        aSpan[i].index=i;
        aSpan[i].onclick=function(){

            for(var i=0; i<aSpan.length;i++){

                aSpan[i].className='contNav_item';
               aSpan[4].className='contNav_item last';
               aDiv[i].className='tabs_item';
            }
                this.className='contNav_item active';
            //aSpan[4].className='contNav_item last active';
            aDiv[this.index].className='tabs_item show'

        };
    }
}



window;onload=function(){



show1('div1');
show2('div2');
show3('div3','div4');
show3('div5','div6');

    show5('div13','div14')
    show6('div30','div31');
    show6('div33','div34');
};