//使用する変数を用意
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

//音声認識の準備
const speech = new webkitSpeechRecognition();
speech.lang = "ja-JP";
speech.interimResults = true;
speech.continuous = true;

let finalTranscript = ""; // 確定した(白の)認識結果

speech.onresult = (e) => {
  let interimTranscript = ""; // 暫定(灰色)の認識結果
  for (let i = e.resultIndex; i < e.results.length; i++) {
    let text = e.results[i][0].transcript;
    if (e.results[i].isFinal) {
      finalTranscript += text;
    } else {
      interimTranscript = text;
    }
  }
  document.querySelector("#content").innerHTML =
    '<p style="display: inline-block;">' +
    finalTranscript +
    "</p>" +
    '<i style="color:#acacac; display: inline-block;">' +
    interimTranscript +
    "</i>";

  let p = document.querySelector("#content > p");
  let i = document.querySelector("#content > i");

  if (finalTranscript.length < 100) {
    p.innerHTML = finalTranscript;
    i.innerHTML = interimTranscript;
    if (i.innerHTML.length == 0) {
      setTimeout(() => {
        p.innerHTML = "";
        finalTranscript = "";
      }, 1000);
    }
  } else {
    p.innerHTML = "";
    i.innerHTML = "";
  }
  console.log(finalTranscript, finalTranscript.length);
  // content.innerHTML = '<p>' + finalTranscript  + '<i style="color:#acacac;">' + interimTranscript + '</i>' + '</p>';

};

startBtn.onclick = () => {
  // 音声認識をスタート

  try {
    speech.start();
  } catch (e) {
    alert("すでにマイクがONになっています。");
  }
};

stopBtn.onclick = () => {
  // 音声認識をストップ
  speech.stop();
  finalTranscript = "";
  interimTranscript = "";
  content.innerHTML = "";
  console.log("終了");
};
