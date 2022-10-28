//999213#A1336-AA-002#5030
//console.log("moro");

/*
document.getElementById("0").addEventListener("click", function(){
    console.log(this.innerHTML);
})
*/
/*
function createbarcode(id) {
    var object = null;
    if (document.layers) {
     object = document.layers[id];
    } else if (document) {
     object = document[id];
    } else if (document.getElementById) {
     object = document.getElementById("barc");
    }
    return object;
   }
 get_object("inputdata").innerHTML=DrawCode39Barcode(get_object("inputdata").innerHTML,1);
 get_object("barc").DrawCode39Barcode("123456",1);
 /*  */




		function DrawCode39Barcode(data,
						   checkDigit)
		{
			return DrawHTMLBarcode_Code39(data,checkDigit,"yes","in", 0,3,0.7,3,"bottom","center", "","black","white"); 
		}

		function DrawHTMLBarcode_Code39(data,
						    checkDigit,
						    humanReadable,
						    units,
						    minBarWidth,
						    width,height,
						    barWidthRatio,
						    textLocation,
						    textAlignment,
						    textStyle,
						    foreColor,
						    backColor)
		{
			return DrawBarcode_Code39(data,
						 checkDigit,
						 humanReadable,
						 units,
						 minBarWidth,
						 width,height,
						 barWidthRatio,
						 textLocation,
						 textAlignment,
						 textStyle,
						 foreColor,
						 backColor,
						 "html");
		}

            function DrawBarcode_Code39(data,
						    checkDigit,
						    humanReadable,
						    units,
						    minBarWidth,
						    width,height,
						    barWidthRatio,
						    textLocation,
						    textAlignment,
						    textStyle,
						    foreColor,
						    backColor,
						    mode)
		{

			  if (foreColor==undefined)
				foreColor="black";
			  if (backColor==undefined)
				backColor="white";

			  if (textLocation==undefined)
				textLocation="bottom";
			  else if (textLocation!="bottom" && textLocation!="top")
				textLocation="bottom";
			  if (textAlignment==undefined)
				textAlignment="center";
			  else if (textAlignment!="center" && textAlignment!="left" && textAlignment!="right")
				textAlignment="center";
			  if (textStyle==undefined)
				textStyle="";
			  if (barWidthRatio==undefined)
				barWidthRatio=3;			  
			  if (height==undefined)
				height=1;
			  else if (height<=0 || height >15)
				height=1;
			  if (width==undefined)
				width=3;
			  else if (width<=0 || width >15)
				width=3;
			  if (minBarWidth==undefined)
			      minBarWidth=0;
			  else if (minBarWidth<0 || minBarWidth >2)
			      minBarWidth=0;
			  if (units==undefined)
				units="in";
			  else if (units!="in" && units !="cm")
				units="in";
			  if (humanReadable==undefined)
				humanReadable="yes";
			  else if (humanReadable!="yes" && humanReadable !="no")
				humanReadable="yes";

			  var encodedData=EncodeCode39(data,checkDigit);	
                    var humanReadableText = NoAsterisks(data,checkDigit);
  		        var encodedLength = 0;
                    var thinLength = 0;
                    var thickLength = 0.0;
                    var totalLength = 0.0;
                    var incrementWidth = 0.0;
                    var swing = 1;
			  var result="";
			  var barWidth=0;
			  var thickWidth=0.0;
			  var svg;
                    if (barWidthRatio >= 2 && barWidthRatio <= 3)
                    {
                    }
                    else
                        barWidthRatio = 3;

                    for (x = 0; x < encodedData.length; x++)
                    {
                        if (encodedData.substr(x,1) == 't')
                        {
                            thinLength++;
                            encodedLength++;
                        }
                        else if (encodedData.substr(x,1) == 'w')
                        {
                            thickLength = thickLength + barWidthRatio;
                            encodedLength = encodedLength + 3;
                        }
                    }
                    totalLength = totalLength + thinLength + thickLength;

                    if (minBarWidth > 0)
                    {
                        barWidth = minBarWidth.toFixed(2);
                        width=barWidth * totalLength;
                    }
                    else
                        barWidth = (width / totalLength).toFixed(2);

                    thickWidth = barWidth * 3;
                    if (barWidthRatio >= 2 && barWidthRatio <= 3.0)
                    {
                        thickWidth = barWidth * barWidthRatio;
                    }
	
			  if (mode=="html")
			  {
				  if (textAlignment=='center')
					  result='<div style="text-align:center">';
				  else if (textAlignment=='left')
					  result='<div style="text-align:left;">';
				  else if (textAlignment=='right')
					  result='<div style="text-align:right;">';

				  var humanSpan="";
				  if (humanReadable=='yes' && textLocation=='top')
				  {
					if (textStyle=='')
						humanSpan='<span style="font-family : arial; font-size:12pt;">'+humanReadableText+'</span><br />';
					else
						humanSpan='<span style='+textStyle+'>'+humanReadableText+'</span><br />';
				  }
				  result=result+humanSpan;
			  }
			  
                    for (x = 0; x < encodedData.length; x++)
                    {
                        var brush;
                        if (swing == 0)
                            brush = backColor;
                        else
                            brush = foreColor;

                        if (encodedData.substr(x,1) == 't')
                        {
				  if (mode=="html")
				    result=result
					     +'<span style="border-left:'
					     +barWidth
					     +units
					     +' solid ' 
					     +brush
					     +';height:'
					     +height
					     +units+';display:inline-block;"></span>';
			        incrementWidth = incrementWidth + barWidth;
				}
                        else if (encodedData.substr(x,1) == 'w')
                        {
				  if (mode=="html")
				    result=result
					     +'<span style="border-left :'
					     +thickWidth
					     +units+' solid ' 
					     +brush
					     +';height:'
					     +height
					     +units+';display:inline-block;"></span>';
	                    incrementWidth = incrementWidth + thickWidth;
				}

                        if (swing == 0)
                            swing = 1;
                        else
                            swing = 0;
                    }

			  if (mode=="html")
			  {
				  var humanSpan="";
				  if (humanReadable=='yes' && textLocation=='bottom')
				  {
					if (textStyle=='')
						humanSpan='<br /><span style=" text-align: margin: 0; position: absolute; width: 112px; z-index: 2; background: white; transform: translate(-50%, -25%);font-family : arial; font-size:12pt; ">'+humanReadableText+'</span>';
					else
						humanSpan='<br /><span style='+textStyle+'>'+humanReadableText+'</span>';
				  }
				  result=result+humanSpan+"</div>";
			  }
			  return result;	
		}
        
            function EncodeCode39(data,checkDigit)
            {
                var fontOutput = ConnectCode_Encode_Code39(data,checkDigit);
                var output = "";
                var pattern = "";
                for (x = 0; x < fontOutput.length; x++)
                {
                    switch (fontOutput.substr(x,1))
                    {
                        case '1':
                            pattern = "wttwttttwt";
                            break;
                        case '2':
                            pattern = "ttwwttttwt";
                            break;
                        case '3':
                            pattern = "wtwwtttttt";
                            break;
                        case '4':
                            pattern = "tttwwtttwt";
                            break;
                        case '5':
                            pattern = "wttwwttttt";
                            break;
                        case '6':
                            pattern = "ttwwwttttt";
                            break;
                        case '7':
                            pattern = "tttwttwtwt";
                            break;
                        case '8':
                            pattern = "wttwttwttt";
                            break;
                        case '9':
                            pattern = "ttwwttwttt";
                            break;
                        case '0':
                            pattern = "tttwwtwttt";
                            break;
                        case 'A':
                            pattern = "wttttwttwt";
                            break;
                        case 'B':
                            pattern = "ttwttwttwt";
                            break;
                        case 'C':
                            pattern = "wtwttwtttt";
                            break;
                        case 'D':
                            pattern = "ttttwwttwt";
                            break;
                        case 'E':
                            pattern = "wtttwwtttt";
                            break;
                        case 'F':
                            pattern = "ttwtwwtttt";
                            break;
                        case 'G':
                            pattern = "tttttwwtwt";
                            break;
                        case 'H':
                            pattern = "wttttwwttt";
                            break;
                        case 'I':
                            pattern = "ttwttwwttt";
                            break;
                        case 'J':
                            pattern = "ttttwwwttt";
                            break;
                        case 'K':
                            pattern = "wttttttwwt";
                            break;
                        case 'L':
                            pattern = "ttwttttwwt";
                            break;
                        case 'M':
                            pattern = "wtwttttwtt";
                            break;
                        case 'N':
                            pattern = "ttttwttwwt";
                            break;
                        case 'O':
                            pattern = "wtttwttwtt";
                            break;
                        case 'P':
                            pattern = "ttwtwttwtt";
                            break;
                        case 'Q':
                            pattern = "ttttttwwwt";
                            break;
                        case 'R':
                            pattern = "wtttttwwtt";
                            break;
                        case 'S':
                            pattern = "ttwtttwwtt";
                            break;
                        case 'T':
                            pattern = "ttttwtwwtt";
                            break;
                        case 'U':
                            pattern = "wwttttttwt";
                            break;
                        case 'V':
                            pattern = "twwtttttwt";
                            break;
                        case 'W':
                            pattern = "wwwttttttt";
                            break;
                        case 'X':
                            pattern = "twttwtttwt";
                            break;
                        case 'Y':
                            pattern = "wwttwttttt";
                            break;
                        case 'Z':
                            pattern = "twwtwttttt";
                            break;
                        case '-':
                            pattern = "twttttwtwt";
                            break;
                        case '.':
                            pattern = "wwttttwttt";
                            break;
                        case ' ':
                            pattern = "twwtttwttt";
                            break;
                        case '*':
                            pattern = "twttwtwttt";
                            break;
                        case '$':
                            pattern = "twtwtwtttt";
                            break;
                        case '/':
                            pattern = "twtwtttwtt";
                            break;
                        case '+':
                            pattern = "twtttwtwtt";
                            break;
                        case '%':
                            pattern = "tttwtwtwtt";
                            break;
				default : break;
                    }
                    
                    output=output+pattern;
                    
                }
                return output;
            }

		function ConnectCode_Encode_Code39(data,checkDigit)
		{
			var Result="";
			var cd="";
			var filtereddata="";
			filtereddata = filterInput(data);
			var filteredlength = filtereddata.length;
			if (checkDigit==1)
			{
				if (filteredlength > 254)
				{
					filtereddata = filtereddata.substr(0,254);
				}
				cd = generateCheckDigit(filtereddata);
			}
			else
			{
				if (filteredlength > 255)
				{
					filtereddata = filtereddata.substr(0,255);
				}
			}
			Result = "*" + filtereddata+"*";
  		      Result=html_decode(html_escape(Result));	
			return Result;
		}

        function NoAsterisks(data,checkDigit)
		{
			var ResultWithoutAsk="";
			var cd="";
			var filtereddata="";
			filtereddata = filterInput(data);
			var filteredlength = filtereddata.length;
			if (checkDigit==1)
			{
				if (filteredlength > 254)
				{
					filtereddata = filtereddata.substr(0,254);
				}
				cd = generateCheckDigit(filtereddata);
			}
			else
			{
				if (filteredlength > 255)
				{
					filtereddata = filtereddata.substr(0,255);
				}
			}
			ResultWithoutAsk = filtereddata;
  		      ResultWithoutAsk=html_decode(html_escape(ResultWithoutAsk));	
			return ResultWithoutAsk;
		}

		function getCode39Character(inputdecimal) {
			var CODE39MAP=new Array("0","1","2","3","4","5","6","7","8","9",
							"A","B","C","D","E","F","G","H","I","J",
							"K","L","M","N","O","P","Q","R","S","T",
							"U","V","W","X","Y","Z","-","."," ","$",
							"/","+","%");
			return CODE39MAP[inputdecimal];
		}

		function getCode39Value(inputchar) {
			var CODE39MAP=new Array("0","1","2","3","4","5","6","7","8","9",
							"A","B","C","D","E","F","G","H","I","J",
							"K","L","M","N","O","P","Q","R","S","T",
							"U","V","W","X","Y","Z","-","."," ","$",
							"/","+","%");
			var RVal=-1;
			for (i=0;i<43;i++)
			{
				if (inputchar==CODE39MAP[i])
				{
					RVal=i;
				}
			}
			return RVal;
		}

		function filterInput(data)
		{
			var Result="";
			var datalength=data.length;
			for (x=0;x<datalength;x++)
			{
				if (getCode39Value(data.substr(x,1)) != -1)
				{
					Result = Result + data.substr(x,1);
				}
			}
			return Result;
		}

		function generateCheckDigit(data)
		{
			var Result="";
			var datalength=data.length;
			var sumValue=0;
			for (x=0;x<datalength;x++)
			{
				sumValue=sumValue+getCode39Value(data.substr(x,1));
			}
			sumValue=sumValue % 43;
			return getCode39Character(sumValue);
		}

		function html_escape(data)
		{
			var Result="";
			for (x=0;x<data.length;x++)
			{
				Result=Result+"&#"+data.charCodeAt(x).toString()+";";
			}
			return Result;
		}

		function html_decode(str) {
			var ta=document.createElement("textarea");
		      ta.innerHTML=str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		      return ta.value;
		}



/* omat --->

let current = "i1"; //alkutilanteessa i1 valittu
document.getElementById(current).classList.add("valittu");

document.getElementById("i1").addEventListener("click", function(){
    current = "i1";

    //googlaa javascript remove from classlist
    document.getElementById("i2").classList.remove("valittu");

    //googlaa javascript add to classlist
    this.classList.add("valittu");
})

function laske(tapa){
    console.log("mitä tehdään: " + tapa);

    //let inputti1 = parseInt(document.getElementById("i1").value);
    //let inputti2 = parseInt(document.getElementById("i2").value);
    
    let inputti1 = document.getElementById("i1").value;

    console.log("luku 1 " + inputti1);
    let tulos;
    //console.log("luku 2 " + inputti2);
    /*if(tapa == "jako"){
        tulos = inputti1 / inputti2;
    }else if(tapa == "plus"){
        //parseInt(inputti1);
        //parseInt(inputti2);
        tulos = inputti1 + inputti2;
    }else if(tapa == "kerto"){
        tulos = inputti1 * inputti2;
    }else if(tapa == "miinus"){
        tulos = inputti1 - inputti2;
    }else 
    if(tapa == "on"){
        tulos = eval(inputti1);
    }
    console.log("Ja siitä tulee: " + tulos)

    document.getElementById("tulos").value = tulos;
}
document.getElementById("jako").addEventListener("click", function(){
    laske("jako");
})
document.getElementById("plus").addEventListener("click", function(){
    laske("plus");
})
document.getElementById("kerto").addEventListener("click", function(){
    laske("kerto");
})
document.getElementById("miinus").addEventListener("click", function(){
    laske("miinus");
})
document.getElementById("i2").addEventListener("click", function(){
    current = "i2";
    document.getElementById("i1").classList.remove("valittu");

    this.classList.add("valittu");
})

//googlaa javascript click class event
let numeroNappain = document.getElementsByClassName("numero");
for (var i = 0; i < numeroNappain.length; i++) {
    //numeroNappain[i].addEventListener('click', myFunction, false);
    numeroNappain[i].addEventListener("click", function(){
        console.log(this.innerHTML);
        
        document.getElementById(current).value += this.innerHTML;

        //let inputti = document.getElementById(current);
        //inputti.value += this.innerHTML;

        //let inputti = document.getElementById(current);
        //inputti.value = inputti.value + this.innerHTML;

        //document.getElementById(current).value = document.getElementById(current) + this.innerHTML;
    });
}

*/