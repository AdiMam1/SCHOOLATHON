var backGround, backGroundImg;
var corridor, corridorImg;
var boy, boyImg;
var idea, ideaImg, ideaGroup;
var teacher, teacherImg, teacherGroup;
var books, booksImg, booksGroup;
var testPaper, testPaperImg, testPaperGroup;
var enemy, enemyImg, enemyGroup;
var x,y;
var gameState = 1;
var score = 1;
var invisGround;
var gameOver, gameOverImg;
var winner, winnerImg;

function preload(){
  backGroundImg = loadImage("BACKGROUND_SCHOOL.jpg");
  corridorImg = loadImage("NON PLAYER_CORRIDOR.jpg");
  boyImg = loadImage("student.png");
  ideaImg = loadImage("NON PLAYER_IDEA.jpg");
  teacherImg = loadImage("NON PLAYER_TEACHER.jpg");
  booksImg  = loadImage("NON PLAYER_BOOKS.jpg");
  testPaperImg = loadImage("NON PLAYER_TEST PAPER.jpg");
  enemyImg = loadImage("NON PLAYER_ENEMY.jpg");
  gameOverImg = loadImage("GAMEOVER.png");
  winnerImg = loadImage("WINNER.png")
  ideaGroup = new Group();
  teacherGroup = new Group();
  booksGroup = new Group();
  testPaperGroup = new Group();
  enemyGroup = new Group();
  backGroundSound = loadSound("BACKGROUND_MUSIC.mp3");
}

function setup(){
  createCanvas(600,600);
  
  backGround = createSprite(300,300,600,600);
  backGround.addImage("School", backGroundImg);
  backGround.scale = 2;
  
  corridor = createSprite(300,590,600,20);
  corridor.addImage("Ground", corridorImg);
  corridor.velocityX = -2;
  corridor.scale = 2;
  
  boy = createSprite(50,550,30,50);
  boy.addImage(boyImg); 
  boy.scale = 0.4;
  boy.setCollider("rectangle",0,0,170,boy.height);
  //boy.debug = true;
  
  invisGround = createSprite(300,550,600,10);
  invisGround.visible = false;
  
  gameOver = createSprite(300,300,40,30);
  gameOver.addImage("GAME OVER", gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  
  winner = createSprite(300,300,30,30);
  winner.addImage("WINNER", winnerImg);
  winner.visible = false;
}

function draw(){
  
  if(gameState !== "end" && gameState !== "win"){
    
    //backGroundSound.play();
    
    //resetting the corridor
    
    if(corridor.x <= 0){
      corridor.x = 300;
    }
    
    
    //score calculation
    score = score + Math.round(getFrameRate()/60);
    
    //jumping when the obstacles are spawned
    if( keyDown("space")){
      boy.velocityY = -3;
    }
    
    //boy's gravity
    boy.velocityY += 0.2;
    
    spawnSprites();
    gamePlay();
    
      if(teacherGroup.isTouching(boy) || booksGroup.isTouching(boy) || testPaperGroup.isTouching(boy) || enemyGroup.isTouching(boy)){
    gameState = "end"
  }
  
 }
  if(gameState == "end"){
    corridor.velocityX = 0;
    invisGround.velocityX = 0;
    boy.velocityY = 0;
    teacherGroup.setVelocityXEach(0);
    booksGroup.setVelocityXEach(0);
    testPaperGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    gameOver.visible = true;
    backGround.visible = false;
    background(0);
    }

    if(gameState == "win"){
     corridor.velocityX = 0;
    invisGround.velocityX = 0;
    boy.velocityY = 0;
    teacherGroup.setVelocityXEach(0);
    booksGroup.setVelocityXEach(0);
    testPaperGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    teacherGroup.destroyEach();
    booksGroup.destroyEach();
    testPaperGroup.destroyEach();
    enemyGroup.destroyEach();
    winner.visible = true;
    backGround.visible = false;
    background(0);
  }
  
  boy.collide(invisGround);

  drawSprites();
  text("Score: "+ score, 350,100);
  
}

function spawnSprites(){
  switch (gameState){
      case 1:
      spawnTeacher();
      spawnTestPaper();
      break;
      
      case 2:
      spawnEnemy();
      spawnBooks();
      break;
      
      case 3:
      spawnTestPaper();
      spawnBooks();
      break;
      
      case 4:
      spawnTeacher();
      spawnTestPaper();
      break;
      
      case 5:
      spawnTeacher();
      spawnEnemy();
      break;
      
      case 6:
      spawnTeacher();
      spawnTestPaper();
      break;
      
      case 7:
      spawnEnemy();
      spawnBooks();
      break;
      
      case 8:
      spawnTeacher();
      spawnBooks();
      break;
      
      case 9:
      spawnEnemy();
      spawnTestPaper();
      break;
      
      case 10:
      spawnEnemy();
      spawnBooks();
      break;
      
      case 11:
      spawnTeacher();
      spawnBooks();
      spawnTestPaper();
      break;
      
      case 12:
      spawnTeacher();
      spawnEnemy();
      spawnTestPaper();
      spawnBooks();
      break;
      
      case "win":
      console.log("GAME ENDED");
      corridor.velocityX = 0;
    invisGround.velocityX = 0;
    boy.velocityY = 0;
    teacherGroup.setVelocityXEach(0);
    booksGroup.setVelocityXEach(0);
    testPaperGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    winner.visible = true;
    backGround.visible = false;
    background(0);
      
  }
    
}

function spawnIdea(){
  if(frameCount%200 == 0){  
  idea = createSprite(600,500,30,40);
  idea.velocityX = -3;
  idea.y = Math.round(random(300,580));
  idea.addImage("power2x", ideaImg);
  idea.scale = 0.05;
  idea.lifetime = 300;  
  ideaGroup.add(idea);
}
}

function spawnTeacher(){
  if(frameCount%190 == 0){
    teacher = createSprite(400,500,20,50);
    teacher.velocityX = -4;
    teacher.y = Math.round(random(510,400));
    teacher.addImage("Obsatcle1", teacherImg);
    teacher.scale = 0.2;
    teacherGroup.add(teacher);
  }
}

function spawnBooks(){
  if(frameCount%250 == 0){
    books = createSprite(500,400,30,20);
    books.velocityX = -5;
    books.y = Math.round(random(400,500));
    books.addImage("obstacle2", booksImg);
    books.scale = 0.1;
    booksGroup.add(books);
  }
}

function spawnTestPaper(){
  if(frameCount%230 == 0){
    testPaper = createSprite(300,450,20,50);
    testPaper.velocityX = -4;
    testPaper.y = Math.round(random(520,400));
    testPaper.addImage("obstacle3", testPaperImg);
    testPaper.scale = 0.05
    testPaperGroup.add(testPaper);
  }
}

function spawnEnemy(){
  if(frameCount%220 == 0){
    enemy = createSprite(400,450,20,60);
    enemy.velocityX = -4;
    enemy.y = Math.round(random(550,400));
    enemy.addImage("obstacle4", enemyImg);
    enemy.scale = 0.09
    enemyGroup.add(enemy);
}
}

function gamePlay(){
  if(score > 0 && score < 50){
    gameState = 2;
  }
  if(score > 50 && score < 100){
    gameState = 3;
  }
  if(score > 100 && score < 150){
    gameState = 4;
  }
  if(score > 150 && score < 200){
    gameState = 5;
  }
  if(score > 200 && score < 250){
    gameState = 6;
  }
  if(score > 250 && score < 300){
    gameState = 7;
  }
  if(score > 300 && score < 350){
    gameState = 8;
  }
  if(score > 350 && score < 400){
    gameState = 9;
  }
  if(score > 400 && score < 450){
    gameState = 10;
  }
  if(score > 450 && score < 500){
    gameState = 11;
  }
  if(score > 500 && score < 550){
    gameState = 12;
  }
  if(score > 550){
    gameState = "win"
  }
}