function gameWon(){
	var y = 0,
		reps = 2;
	var interID = window.setInterval(function() {
		document.getElementById("screen").style.color = "#600";
		setTimeout(function() {
			document.getElementById("screen").style.color = "red";
			document.getElementById("screen").innerHTML = "WIN";
		}, 500);

		if (++y === reps) {
			window.clearInterval(interID);
		}
	}, 1000);
}


function seqErr() {
	var y = 0,
		reps = 2;
	var erSound = new Audio("https://res.cloudinary.com/dvqntjypw/video/upload/v1472341368/efx_NO-Fabio_Farinelli-955789468_thdpus.mp3");
	var interID = window.setInterval(function() {
		document.getElementById("screen").style.color = "#600";
		setTimeout(function() {
			document.getElementById("screen").style.color = "red";
			document.getElementById("screen").innerHTML = "!!";
		}, 500);
		erSound.play();

		if (++y === reps) {
			window.clearInterval(interID);
		}
	}, 1000);

}
//Initial Sequence Function on Start click
function startSeq(repetitions) {

	var x = 0,seq;
	document.getElementById("screen").innerHTML = repetitions;
	intervalID = window.setInterval(function flashing() {
		if (recordArr.length == x) {
			seq = series[Math.floor(Math.random() * 4)];
			recordArr.push(seq);
		} else {
			seq = recordArr[x];
		}
		//
		var re = seq.charAt(0);
		switch(re){
			case 'g':
				gSound.play();
			case 'r':
				rSound.play();
			case 'y':
				ySound.play();
			case 'b':
				bSound.play();
			break;
		}
		//
		document.getElementById(seq).style.opacity = 1;

		setTimeout(function() {
			document.getElementById(seq).style.opacity = 0.4
		}, 1000);

		if (++x === repetitions) {
			window.clearInterval(intervalID);
			q = document.querySelectorAll('#greenbtn,#redbtn,#yellowbtn,#bluebtn');
			for (var i = 0; i < q.length; i++) {
				q[i].style.pointerEvents = 'auto';
				q[i].style.cursor = "pointer";
			}
		}
		if (repetitions > 1) {
			return flashing;
		}
	}(), 2500);

}

$(function() {
	gSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
	rSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
	ySound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
	bSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
	series = ["bluebtn", "greenbtn", "redbtn", "yellowbtn"];
	counter = 0;
	intervalID = "";
	var resetCnt = 0;
	var strictMode = 0;
	function strictCheck(){
						seqErr();
						recordArr = [];
						myCount = 1;
						counter = 1;
						$(".push").css("pointer-events", "none");
						$(".push").css("cursor", "default");
						setTimeout(function() {
							startSeq(counter)
						}, 4000);
						clickArr = [];
	}
	$("#strictbtn").on("click", function() {
		if (strictMode === 1) {
			$(".light").css("background-color", "black");
			strictMode = 0;
		} else {
			$(".light").css("background-color", "red");
			strictMode = 1;
		}
	});

	$('#reset').click(function() {
		if (resetCnt === 0) {
			resetCnt = 1;
			$("#strictbtn").css("pointer-events", "auto");
			$("#strictbtn").css("cursor", "pointer");
			$("#startbtn").css("pointer-events", "auto");
			$("#startbtn").css("cursor", "pointer");
			$("#screen").css("color", "red");
		} else {
			resetCnt = 0;
			$("#strictbtn").css("pointer-events", "none");
			$("#strictbtn").css("cursor", "default");
			$("#startbtn").css("pointer-events", "none");
			$("#startbtn").css("cursor", "default");
			recordArr = [];
			clickArr = [];
			myCount = 0;
			$("#screen").text("--");
			$("#screen").css("color", "#660000");
			$(".light").css("background-color", "black");
			window.clearInterval(intervalID);
		}
	});

	$('#startbtn').click(function() {
		recordArr = [];
		clickArr = [];
		myCount = 0;
		if (resetCnt == 1) {
			myCount = 1;
			counter = myCount;
			$(".push").css("pointer-events", "none");
			$(".push").css("cursor", "default");
			startSeq(counter);
		} else
			return false;
	});

	$('.push').on('click', function() {
		var rec = this.id.charAt(0);
		switch(rec){
			case 'g':
				gSound.play();
			case 'r':
				rSound.play();
			case 'y':
				ySound.play();
			case 'b':
				bSound.play();
			break;
		}
		$(this).fadeTo(200, 1);
		$(this).fadeTo(200, 0.4);
		clickArr.push(this.id);
		myCount = clickArr.length;
		var subrecordArr = recordArr.slice(0, myCount);
		if (clickArr.length === recordArr.length) {
			if (_.isEqual(clickArr, recordArr)) {
				//alert("yes");
				if (myCount === 20) {
					gameWon();
					recordArr = [];
					myCount = 1;
					counter = 1;
					$(".push").css("pointer-events", "none");
					$(".push").css("cursor", "default");
					setTimeout(function() {
							startSeq(counter)
						}, 4000);
					clickArr = [];
				}
				else{
						clickArr = [];
						myCount++;
						counter = myCount;
						myCount = 0;
						$(".push").css("pointer-events", "none");
						$(".push").css("cursor", "default");
						setTimeout(function() {
							startSeq(counter)
						}, 3000);
				}
			} else {
				//
				if (strictMode === 1) {
						strictCheck();
					} else {
					//
						seqErr();
						//myCount--;
						counter = myCount;
						$(".push").css("pointer-events", "none");
						$(".push").css("cursor", "default");
						setTimeout(function() {
							startSeq(counter)
						}, 4000);
						clickArr = [];
						}

				}
		} else if (!_.isEqual(clickArr, subrecordArr)) {
				if (strictMode === 1) {
						strictCheck();
				}	else{
				seqErr();
				counter = recordArr.length;
				$(".push").css("pointer-events", "none");
				$(".push").css("cursor", "default");
				setTimeout(function() {
					startSeq(counter)
				}, 4000);
				clickArr = [];
				}
			
		} else {
			//alert(myCount);
			if (myCount !== clickArr.length) {
				myCount--;
			}
			myCount++;

		}
	});

});