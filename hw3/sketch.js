// === 세팅 ===

const ANCHOR_X = 300;
const ANCHOR_Y = 415;

const EYE_L = { x: 265, y: 170 };
const EYE_R = { x: 335, y: 170 };

let blinkT = 0;
let blinking = false;

let tongueTimer = 0;
const TONGUE_DUR = 45; 

// 드래그 오프셋/상태
let offX = 0, offY = 0;
let dragging = false;

// 반짝임 4개 변수
let s1 = {x:0, y:0, life:0, size:0};
let s2 = {x:0, y:0, life:0, size:0};
let s3 = {x:0, y:0, life:0, size:0};
let s4 = {x:0, y:0, life:0, size:0};
const SPARKLE_DUR = 40;

function setup() {
  createCanvas(600, 400);
  noStroke();
}

function draw() {
  background(235, 245, 250);
  const centerX = width / 2;
  const groundY = height - 20;

  // 바닥 + 윗부분
  fill(220, 225, 230);
  rect(0, groundY, width, height - groundY);
  rect(0, 0, width, height - groundY);

  // 깜빡 애니메이션
  if (blinking) {
    blinkT += 0.2;
    if (blinkT >= 1) { blinking = false; blinkT = 0; }
  }

  if (tongueTimer > 0) tongueTimer--;

  // 캐릭터
  push();
  translate(centerX + offX, groundY + 30 + offY);
  translate(-ANCHOR_X, -ANCHOR_Y);
  drawCharacter();
  pop();

  // 반짝임 4개
  drawSparkle(s1);
  drawSparkle(s2);
  drawSparkle(s3);
  drawSparkle(s4);

  // 카메라 뷰파인더
  drawViewfinderOverlay();
}

// ====== 유틸 ======
function getCharCenterWorld() {
  const centerX = width / 2;
  const groundY = height - 20;
  const cx = 300, cy = 230; // 캐릭터 로컬 중심
  return {
    x: centerX + offX + (cx - ANCHOR_X),
    y: groundY + 30 + offY + (cy - ANCHOR_Y)
  };
}

// 반짝임 4개 생성
function spawnSparkles() {
  const c = getCharCenterWorld();
  s1 = makeSparkle(c.x, c.y, 0);
  s2 = makeSparkle(c.x, c.y, 90);
  s3 = makeSparkle(c.x, c.y, 180);
  s4 = makeSparkle(c.x, c.y, 270);
}

// 개별 반짝임 생성
function makeSparkle(cx, cy, baseAngle) {
  const ang = radians(baseAngle) + random(-PI/10, PI/10);
  const r = random(110, 160);
  return {
    x: cx + cos(ang) * r,
    y: cy + sin(ang) * r,
    life: SPARKLE_DUR,
    size: random(9, 14)
  };
}

// 개별 반짝임 그리기
function drawSparkle(s) {
  if (s.life <= 0) return;
  s.life--;
  const a = map(s.life, 0, SPARKLE_DUR, 0, 255);
  const pulse = 0.9 + 0.2 * sin((SPARKLE_DUR - s.life) * 0.6);
  const S = s.size * pulse;

  push();
  translate(s.x, s.y);

  // 코어
  noStroke();
  fill(255, 230, 80, a);
  circle(0, 0, S * 0.6);

  // 십자 광선
  stroke(255, 255, 120, a);
  strokeWeight(2);
  line(-S, 0, S, 0);   // 가로
  line(0, -S, 0, S);   // 세로
  pop();
}

// ====== 카메라 뷰파인더 ======
function drawViewfinderOverlay() {
  const L = 28, T = 3, M = 14, A = 210;
  strokeWeight(T);
  stroke(255, 255, 255, A);
  noFill();

  // 코너 ㄱ자
  line(M, M, M + L, M); line(M, M, M, M + L);
  line(width - M, M, width - M - L, M); line(width - M, M, width - M, M + L);
  line(M, height - M, M + L, height - M); line(M, height - M, M, height - M - L);
  line(width - M, height - M, width - M - L, height - M);
  line(width - M, height - M, width - M, height - M - L);

  // 가운데 가이드
  stroke(255, 255, 255, 60);
  strokeWeight(1.5);
  line(width/2, M, width/2, height - M);
  line(M, height/2, width - M, height/2);

  // REC
  const recX = M + 6, recY = M + 6;
  noStroke();
  const pulse = 180 + 60 * sin(frameCount * 0.2);
  fill(255, 40, 40, pulse);
  circle(recX + 8, recY + 7, 10);
  fill(255);
  textSize(17);
  textAlign(LEFT, CENTER);
  text("REC", recX + 18, recY + 9);
}

// ====== 캐릭터 ======
function drawCharacter() {
  // 머리 배경
  fill(50, 30, 10);
  rect(217, 150, 166, 280);

  // 목
  fill(255, 235, 210);
  rect(271, 230, 60, 40);

  // 얼굴
  fill(255, 255, 230);
  ellipse(300, 170, 125, 155);

  // 앞머리
  fill(50, 30, 10);
  arc(300, 130, 165, 145, PI, 0, CHORD);
  rect(217, 130, 26, 20);
  rect(350, 130, 33, 20);
  arc(263, 110, 100, 90, -QUARTER_PI, PI - QUARTER_PI, OPEN);
  arc(345, 120, 75, 75, QUARTER_PI, PI + QUARTER_PI, OPEN);

  // 눈(고정 + 깜빡)
  drawEyeFixed(EYE_L.x, EYE_L.y, -1);
  drawEyeFixed(EYE_R.x, EYE_R.y, +1);

  // 눈썹
  noFill();
  stroke(0);
  strokeWeight(4);
  beginShape(); vertex(245, 149); bezierVertex(255, 140, 270, 140, 280, 149); endShape();
  beginShape(); vertex(320, 149); bezierVertex(330, 140, 345, 140, 355, 149); endShape();
  noStroke();

  // 코
  stroke(80); strokeWeight(1.5);
  line(295, 185, 290, 200);
  line(290, 200, 300, 203);
  noStroke();

  // 입: 메롱 or 미소
  if (tongueTimer > 0) {
    const mx = 300, my = 224;
    fill(40); rect(mx - 14, my - 8, 28, 16, 8);
    fill(255, 110, 130); rect(mx - 10, my - 2, 20, 14, 7);
    stroke(210, 70, 90); strokeWeight(2); line(mx, my - 1, mx, my + 10); noStroke();
    stroke(50); strokeWeight(2); line(mx - 10, my - 6, mx + 10, my - 6); noStroke();
  } else {
    noFill(); stroke(50); strokeWeight(2); arc(300, 221, 20, 3, 0, PI); noStroke();
  }

  // 귀 + 귀걸이
  fill(255, 255, 230);
  ellipse(233, 178, 24, 36);
  ellipse(367, 178, 24, 36);
  fill(240, 240, 220);
  ellipse(233, 178, 12, 24);
  ellipse(367, 178, 12, 24);
  noFill(); stroke(150); strokeWeight(3);
  ellipse(233, 198, 10, 10);
  ellipse(367, 198, 10, 10);
  noStroke();

  // 볼터치
  fill(255, 200, 200, 180);
  ellipse(255, 200, 25, 15);
  ellipse(345, 200, 25, 15);

  // 티셔츠
  fill(100, 150, 255);
  rect(200, 265, 200, 150, 20);
  fill(255, 235, 210);
  arc(301, 265, 60, 45, 0, PI, CHORD);

  // 단추
  fill(0);
  circle(300, 300, 7);
  circle(300, 320, 7);
  circle(300, 340, 7);
}

// 눈 + 깜빡
function drawEyeFixed(x, y, dir) {
  let lid = blinking ? map(abs(sin(blinkT * PI)), 0, 1, 1, 0.25) : 1;
  let eyeW = 24, eyeH = 24 * lid;

  noStroke();
  fill(90, 60, 40);
  ellipse(x, y, eyeW, eyeH);

  fill(0);
  ellipse(x, y, 12 * lid, 12 * lid);

  fill(255);
  ellipse(x + 5 * lid, y - 5 * lid, 6 * lid, 4 * lid);

  stroke(0); strokeWeight(3); noFill();
  if (dir < 0) {
    beginShape(); vertex(x - 18, y - 10);
    bezierVertex(x - 5, y - 14, x + 5, y - 14, x + 15, y - 10); endShape();
  } else {
    beginShape(); vertex(x - 15, y - 10);
    bezierVertex(x - 5, y - 14, x + 5, y - 14, x + 18, y - 10); endShape();
  }
  strokeWeight(2);
  beginShape(); vertex(x - 11.5, y + 10);
  bezierVertex(x - 3.5, y + 13, x + 3.5, y + 13, x + 11.5, y + 10); endShape();
  noStroke();

  fill(0);
  if (dir < 0) triangle(x - 13, y - 10, x - 19, y - 9, x - 22, y - 15);
  else         triangle(x + 13, y - 10, x + 19, y - 9, x + 22, y - 15);
}

// ====== 마우스(드래그 이동) ======
function mousePressed() {
  const c = getCharCenterWorld();
  // 드래그 
  if (dist(mouseX, mouseY, c.x, c.y) < 150) {
    dragging = true;
  }
}
function mouseDragged() {
  if (dragging) {
    offX += movedX;
    offY += movedY;
  }
}
function mouseReleased() {
  dragging = false;
}

// ====== 키보드 ======

function keyPressed() {
  const k = (key || '').toLowerCase();
  // B: 깜빡
  if (k === 'b' || key === 'ㅠ') {
    if (!blinking) { blinking = true; blinkT = 0; }
  }

  // U: 메롱 + 반짝임
  if (k === 'u' || key === 'ㅕ') {
    tongueTimer = TONGUE_DUR;
    spawnSparkles();
  }
}
