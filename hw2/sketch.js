function setup() {
  createCanvas(600, 400);
  background(235, 245, 250);
  noStroke();

  // 머리 배경
  fill(50, 30, 10);
  rect(217, 150, 166, 280);
  
  
  // 목 
  fill(255, 235, 210); // 피부색
  rect(271, 230, 60, 40); // x, y, width, height


  // 얼굴
  fill(255, 255, 230);
  ellipse(300, 170, 125, 155); 

  
   // 앞머리 
  fill(50, 30, 10); 
  arc(300, 130, 165, 145, PI, 0, CHORD); 
  //rect(220, 100, 160, 40);
  rect(217, 130, 26, 20);
  rect(350, 130, 33, 20);

// 왼쪽 머리카락
  arc(263, 110, 100, 90, -QUARTER_PI, PI - QUARTER_PI, OPEN);

  // 오른쪽 머리카락
  arc(345, 120, 75, 75, QUARTER_PI, PI + QUARTER_PI, OPEN);

  // 눈 (간격 70px)
  drawEyeLeft(265, 170);   // 왼쪽 눈 
  drawEyeRight(335, 170);  // 오른쪽 눈
  
  
  // 눈썹
  noFill();
  stroke(0);
  strokeWeight(4);

  // 왼쪽 눈썹 
  // 왼쪽 눈썹 
  beginShape();
  vertex(245, 149);
  bezierVertex(255, 140, 270, 140, 280, 149);
  endShape();


  // 오른쪽 눈썹
  beginShape();
  vertex(320, 149);
  bezierVertex(330, 140, 345, 140, 355, 149);
  endShape();

  noStroke();


  // 코 
  stroke(80);
  strokeWeight(1.5);
  line(295, 185, 290, 200);
  line(290, 200, 300, 203);
  noStroke();

  // 입 
  noFill();
  stroke(50);
  strokeWeight(2);
  arc(300, 221, 20, 3, 0, PI);
  noStroke();

  // 귀
  fill(255, 255, 230);
  ellipse(233, 178, 24, 36);
  ellipse(367, 178, 24, 36);
  fill(240, 240, 220);
  ellipse(233, 178, 12, 24);
  ellipse(367, 178, 12, 24);
  
  noFill();
  stroke(150);        // 회색
  strokeWeight(3);
  ellipse(233, 198, 10, 10);  // 왼쪽 귀걸이
  ellipse(367, 198, 10, 10);  // 오른쪽 귀걸이
  noStroke();


  // 볼터치
  fill(255, 200, 200, 180);
  ellipse(255, 200, 25, 15);
  ellipse(345, 200, 25, 15);


  // 티셔츠 
  fill(100, 150, 255);  // 밝은 노란색
  rect(200, 265, 200, 150, 20);  // 본체
  fill(255, 235, 210);  // 배경색과 맞춤
  arc(301, 265, 60, 45, 0, PI, CHORD);  


  // 단추 3개
  fill(0);  // 단추색 (갈색)
  circle(300, 300, 7);
  circle(300, 320, 7);
  circle(300, 340, 7);


}

// 왼쪽 눈
function drawEyeLeft(x, y) {
  // 눈동자
  noStroke();
  fill(90, 60, 40);
  ellipse(x, y, 24, 24);
  fill(0);
  ellipse(x, y, 12, 12);
  fill(255);
  ellipse(x + 5, y - 5, 6, 4);

  // 윗눈꺼풀 
  stroke(0);
  strokeWeight(3);
  noFill();
  beginShape();
  vertex(x - 18, y - 10); 
  bezierVertex(x - 5, y - 14, x + 5, y - 14, x + 15, y - 10);
  endShape();

  // 아랫눈꺼풀
  strokeWeight(2);
  beginShape();
  vertex(x - 11.5, y + 10);
  bezierVertex(x - 3.5, y + 13, x + 3.5, y + 13, x + 11.5, y + 10);
  endShape();

  noStroke();

  fill(0);
  noStroke();
  triangle(
    x - 13, y - 10,  // 눈꼬리 중심
    x - 19, y - 9,   // 뒤로 뺀 위쪽
    x - 22, y - 15    // 뒤로 뺀 아래쪽
  );
}

// 오른쪽 눈
function drawEyeRight(x, y) {
  // 눈동자
  noStroke();
  fill(90, 60, 40);
  ellipse(x, y, 24, 24);
  fill(0);
  ellipse(x, y, 12, 12);
  fill(255);
  ellipse(x + 5, y - 5, 6, 4);

  // 윗눈꺼풀
  stroke(0);
  strokeWeight(3);
  noFill();
  beginShape();
  vertex(x - 15, y - 10); 
  bezierVertex(x - 5, y - 14, x + 5, y - 14, x + 18, y - 10); 
  endShape();

  // 아랫눈꺼풀 
  strokeWeight(2);
  beginShape();
  vertex(x - 11.5, y + 10);
  bezierVertex(x - 3.5, y + 13, x + 3.5, y + 13, x + 11.5, y + 10);
  endShape();

  noStroke();
  
  fill(0);
  noStroke();
  triangle(
    x + 13, y - 10,  // 눈꼬리 중심
    x + 19, y - 9,   // 뒤로 뺀 위쪽
    x + 22, y - 15    // 뒤로 뺀 아래쪽
  );



}
