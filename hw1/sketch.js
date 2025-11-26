function setup() {
  createCanvas(600, 400);
  noLoop();
}

function draw() {
  background(20);

  // 중앙 구분선
  stroke(255, 150);
  strokeWeight(2);
  line(width/2, 0, width/2, height);
  noStroke();

  // ===== 낮 =====
  fill(135, 206, 235);
  quad(0, 0, width/2, 0, width/2, height, 0, height);


  // 태양 후광 
  fill(255, 204, 0, 180); ellipse(width/4, height/3, 120);
  fill(255, 204, 0, 120); ellipse(width/4, height/3, 90);
  fill(255, 204, 0, 60);  ellipse(width/4, height/3, 60);

  // 낮 부분 오른쪽 작은 산
  fill(80, 190, 95, 170);  
  triangle(
    width/3,   height*0.75,   
    width/2.2, height*0.55,   
    width/2,   height*0.75    
  );

  // 산
  fill(70, 160, 80, 200);
  beginShape();
  vertex(0, height*0.75);
  vertex(width/4, height*0.45);
  vertex(width/2, height*0.75);
  vertex(width/4, height*0.6);
  endShape(CLOSE);


  
    // ===== 땅 =====
  fill(180,150,100,230); 
  quad(
    0, height,           // 좌하
    width/2, height,     // 우하
    width/2, height*0.75,// 우상  
    0, height*0.75       // 좌상
  );
  
  // 하늘색이 삐져나오는 세모 덮기
  fill(180,150,100,230);   
  triangle(
    0, height*0.75,        
    width/2, height*0.75,  
    width/4, height*0.6   
  );


  // 도로
  fill(90); //회색 도로

  quad(
    width/4 - 50, height,          // 좌하  
    width/4 + 50, height,          // 우하  
    width/4 + 15, height*0.6,      // 우상 
    width/4 - 15, height*0.6       // 좌상  
  );
  // 중앙 흰색 라인
  stroke(255);
  strokeWeight(3);
  line(width/4, height, width/4, height*0.6);
  noStroke();
  
  // 가로등
  stroke(180);
  strokeWeight(3);
  line(width/4-60, height*0.7, width/4-60, height*0.55);
  noStroke();
  fill(255, 240, 180, 120);
  ellipse(width/4-60, height*0.55, 20);

  fill(120);
  quad(width/4 - 50, height, width/4 - 40, height,
       width/4 - 15, height*0.6, width/4 - 20, height*0.6);
  quad(width/4 + 40, height, width/4 + 50, height,
       width/4 + 20, height*0.6, width/4 + 15, height*0.6);



  // 구름 2개
  fill(255, 200);
  arc(width/4, height*0.55, 80, 40, PI, TWO_PI);
  arc(width/4 + 40, height*0.6, 70, 40, PI, TWO_PI);

  // 새 3마리
  fill(255, 180);
  triangle(100, 80, 112, 85, 88, 85);
  triangle(160, 100, 172, 105, 148, 105);
  triangle(200, 70, 212, 75, 188, 75);
  
    // ===== 왼쪽 꽃 3개 =====
  fill(255, 100, 150);    
  ellipse(40,  height*0.8, 12);
  ellipse(80,  height*0.90, 10);
  ellipse(100, height*0.78, 14);

  // ===== 오른쪽 꽃 3개 =====
  fill(255, 180, 0);      
  ellipse(width/2 - 40, height*0.82, 12);
  ellipse(width/2 - 80, height*0.87, 10);
  ellipse(width/2 - 100, height*0.74, 14);


  // =====  =====
  fill(25, 25, 80);
  quad(width/2, 0, width, 0, width, height, width/2, height);

  // 달 후광 3겹
  fill(240, 150); ellipse(width*0.75, height/3, 90);
  fill(240, 100); ellipse(width*0.75, height/3, 60);
  fill(240, 60);  ellipse(width*0.75, height/3, 40);

  // 별 10개
  fill(255);
  ellipse(350, 40, 3); ellipse(420, 70, 4);
  ellipse(500, 50, 3); ellipse(560, 90, 2);
  ellipse(380, 130, 3); ellipse(450, 160, 2);
  ellipse(520, 200, 4); ellipse(570, 150, 3);
  ellipse(400, 240, 3); ellipse(480, 260, 2);

  // 도시 실루엣
  fill(0, 180);
  beginShape();
  vertex(width/2, height);
  vertex(width*0.6, height*0.6);
  vertex(width*0.7, height*0.65);
  vertex(width*0.8, height*0.55);
  vertex(width*0.95, height);
  endShape(CLOSE);

  // 가로등
  stroke(220);
  strokeWeight(3);
  line(340, height-120, 340, height);
  line(410, height-100, 410, height);
  line(500, height-140, 500, height);
  noStroke();
  fill(255, 220, 120, 120);
  ellipse(340, height-120, 50);
  ellipse(410, height-100, 50);
  ellipse(500, height-140, 50);
  fill(255, 240, 180, 80);
  ellipse(340, height-120, 80);
  ellipse(410, height-100, 80);
  ellipse(500, height-140, 80);

  //  별똥별 
  stroke('#FFD700');
  strokeWeight(3);
  line(width*0.6, height*0.25, width*0.8, height*0.35);
}
