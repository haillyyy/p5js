let tStart;

function setup() {
  createCanvas(600, 400);
  frameRate(60);
  colorMode(RGB);
  tStart = millis();
}

function draw() {
  let t = (millis() - tStart) / 1000.0;  // 초 단위
  background(20);

  // 중앙 구분선
  stroke(255, 150);
  strokeWeight(2);
  line(width/2, 0, width/2, height);
  noStroke();

  // === 시간 기반 값 ===
  let swing = sin(t * 1.2);        // 부드러운 진동
  let swingFast = sin(t * 3.0);    // 빠른 진동
  let swingVeryFast = sin(t * 6.0);

  // ====== 낮 배경 ======

  // 하늘 색 서서히 바꾸기 
  let cDay1 = color(135, 206, 235);    // 기본 하늘
  let cDay2 = color(255, 220, 180);    // 노을 느낌
  let mixDay = (sin(t * 0.4) + 1) / 2; 
  let daySky = lerpColor(cDay1, cDay2, mixDay);

  fill(daySky);
  quad(0, 0, width/2, 0, width/2, height, 0, height);

  // 태양 위치 움직이기
  let sunX = width/4 + 10 * cos(t * 0.8);
  let sunY = height/3 + 5 * sin(t * 1.0);

  // 태양 후광
  for (let i = 0; i < 3; i++) {
    let baseR = 60 + i * 30;
    let pulsate = 5 * swing; // 크기 변화
    let r = baseR + pulsate;
    let alpha = 180 - i * 60 + 20 * swingFast;
    alpha = constrain(alpha, 40, 200);
    fill(255, 204, 0, alpha);
    ellipse(sunX, sunY, r);
  }

  // 낮 오른쪽 작은 산
  fill(80, 190, 95, 170);
  let smallMountainOffset = 3 * swingFast;
  triangle(
    width/3,   height*0.75 + smallMountainOffset,
    width/2.2, height*0.55 + smallMountainOffset,
    width/2,   height*0.75 + smallMountainOffset
  );

  // 큰 산
  fill(70, 160, 80, 200);
  beginShape();
  vertex(0, height*0.75);
  vertex(width/4, height*0.45);
  vertex(width/2, height*0.75);
  vertex(width/4, height*0.6);
  endShape(CLOSE);

  // 땅
  fill(180,150,100,230);
  quad(
    0, height,
    width/2, height,
    width/2, height*0.75,
    0, height*0.75
  );

  // 산 위 부분 덮기
  fill(180,150,100,230);
  triangle(
    0, height*0.75,
    width/2, height*0.75,
    width/4, height*0.6
  );

  // 도로
  let roadOffset = 5 * swingFast;
  fill(90);
  quad(
    width/4 - 50, height,
    width/4 + 50, height,
    width/4 + 15, height*0.6 + roadOffset,
    width/4 - 15, height*0.6 + roadOffset
  );

  // 중앙 흰색 라인
  stroke(255);
  strokeWeight(3);
  line(width/4, height, width/4, height*0.6 + roadOffset);
  noStroke();

  // 가로등 기둥
  stroke(180);
  strokeWeight(3);
  line(width/4-60, height*0.7, width/4-60, height*0.55);
  noStroke();

  // 가로등 불빛
  let lampAlpha = 120 + 40 * swingFast;
  fill(255, 240, 180, lampAlpha);
  ellipse(width/4-60, height*0.55, 20);

  // 도로 옆 경계
  fill(120);
  quad(width/4 - 50, height, width/4 - 40, height,
       width/4 - 15, height*0.6 + roadOffset, width/4 - 20, height*0.6 + roadOffset);
  quad(width/4 + 40, height, width/4 + 50, height,
       width/4 + 20, height*0.6 + roadOffset, width/4 + 15, height*0.6 + roadOffset);

  // 구름 오른쪽으로 흘러
  let cloudShift = (t * 20) % (width/2 + 200); // 속도 20
  fill(255, 200);
  // 첫 번째 구름
  arc(width/4 - cloudShift + 50, height*0.55, 80, 40, PI, TWO_PI);
  // 두 번째 구름
  arc(width/4 + 40 - cloudShift + 50, height*0.6, 70, 40, PI, TWO_PI);

  // 새 3마리
  let birdShift = (frameCount * 0.5) % (width/2 + 100);
  fill(255, 180);
  triangle(100 + birdShift, 80, 112 + birdShift, 85, 88 + birdShift, 85);
  triangle(160 + birdShift, 100, 172 + birdShift, 105, 148 + birdShift, 105);
  triangle(200 + birdShift, 70, 212 + birdShift, 75, 188 + birdShift, 75);

  // 왼쪽 꽃 3개 
  let s1 = 12 + 3 * swingFast;
  let s2 = 10 + 2 * sin(t * 2.5 + 1.0);
  let s3 = 14 + 3 * sin(t * 3.0 + 2.0);
  fill(255, 100, 150);
  ellipse(40,  height*0.8,  s1);
  ellipse(80,  height*0.90, s2);
  ellipse(100, height*0.78, s3);

  // 오른쪽 꽃 3개
  let s4 = 12 + 3 * sin(t * 2.0 + 0.5);
  let s5 = 10 + 2 * sin(t * 3.0 + 1.5);
  let s6 = 14 + 3 * sin(t * 4.0 + 2.5);
  fill(255, 180, 0);
  ellipse(width/2 - 40, height*0.82, s4);
  ellipse(width/2 - 80, height*0.87, s5);
  ellipse(width/2 - 100, height*0.74, s6);

  // ====== 밤 배경 ======

  // 밤하늘 색
  let cNight1 = color(25, 25, 80);
  let cNight2 = color(80, 30, 120);
  let mixNight = (sin(t * 0.4 + PI) + 1) / 2;
  let nightSky = lerpColor(cNight1, cNight2, mixNight);

  fill(nightSky);
  quad(width/2, 0, width, 0, width, height, width/2, height);

  // 달
  let moonX = width*0.75 + 8 * cos(t * 0.9 + PI/3);
  let moonY = height/3 + 5 * sin(t * 1.1 + PI/4);
  for (let i = 0; i < 3; i++) {
    let baseR = 40 + i * 25;
    let r = baseR + 4 * swing;
    let alpha = 150 - i * 50 + 20 * swingFast;
    alpha = constrain(alpha, 40, 170);
    fill(240, alpha);
    ellipse(moonX, moonY, r);
  }

  // 별
  function drawStar(x, y, baseSize) {
    let twinkle = random(150, 255); 
    fill(255, twinkle);
    ellipse(x, y, baseSize);
  }

  drawStar(350, 40, 3);
  drawStar(420, 70, 4);
  drawStar(500, 50, 3);
  drawStar(560, 90, 2);
  drawStar(380, 130, 3);
  drawStar(450, 160, 2);
  drawStar(520, 200, 4);
  drawStar(570, 150, 3);
  drawStar(400, 240, 3);
  drawStar(480, 260, 2);

  // 도시 실루엣
  fill(0, 180);
  let cityOffset = 4 * swingFast;
  beginShape();
  vertex(width/2, height);
  vertex(width*0.6, height*0.6 + cityOffset);
  vertex(width*0.7, height*0.65 + cityOffset);
  vertex(width*0.8, height*0.55 + cityOffset);
  vertex(width*0.95, height);
  endShape(CLOSE);

  // 밤 가로등 3개
  stroke(220);
  strokeWeight(3);
  line(340, height-120, 340, height);
  line(410, height-100, 410, height);
  line(500, height-140, 500, height);
  noStroke();

  // 불빛 깜빡임
  let lampPulse = 80 + 40 * swingFast;
  fill(255, 220, 120, lampPulse);
  ellipse(340, height-120, 50);
  ellipse(410, height-100, 50);
  ellipse(500, height-140, 50);
  fill(255, 240, 180, lampPulse * 0.7);
  ellipse(340, height-120, 80);
  ellipse(410, height-100, 80);
  ellipse(500, height-140, 80);

  // 별똥별 3.5초 주기
  stroke('#FFD700');
  strokeWeight(3);
  let shootPhase = t % 3.5;
  if (shootPhase < 1.2) {
    let p = shootPhase / 1.2; 
    let sx = width*0.8 - 200 * p;
    let sy = height*0.25 + 80 * p;
    line(sx, sy, sx - 40, sy + 10);
  }
  noStroke();
}


// 키보드 's'를 누르면 10초짜리 gif 저장 (브라우저 콘솔도 참고)
function keyPressed() {
  if (key === 's' || key === 'S') {
    // 라이브러리 연결되어 있다는 전제 (교재 4.4 참고)
    saveGif('day_night_abstract', 10);
  }
}