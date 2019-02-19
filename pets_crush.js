const BOARD_WIDTH = 9;
const BOARD_HEIGHT = 9;
const TB_HEIGHT = 135;
const INN_DIST = 4;

var CANDY_W = 45;
var CANDY_H = 45;
var board = [];
var candy_i;
var candy_j;
var candy_color;
var drag = false;
var locked_XR = false;
var locked_XL = false;
var locked_YD = false;
var locked_YU = false;
var title_color;

function preload(){
	titleFont = loadFont('assets/GreatVibes-Regular.otf');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	print(windowHeight);
	//candy_color = color(255, 100, 100);
	CANDY_W = 0.035*windowWidth;
	CANDY_H = 0.035*windowWidth;
	title_color = color(0, 200, 200);
	title = new Title(titleFont, TB_HEIGHT, title_color);
	board_setup();
}

function draw() {
	background(100);
	title.show();
	draw_candies();
}

function board_setup(){
	for (let i = 0; i < BOARD_HEIGHT; i++){
		board[i] = [];
		for (let j = 0; j < BOARD_WIDTH; j++){
			board[i][j] = new Candy(width/2 - (BOARD_WIDTH/2 - 0.5)*(CANDY_W+INN_DIST) + j*(CANDY_W+INN_DIST), TB_HEIGHT + i*(CANDY_H+INN_DIST), CANDY_W, CANDY_H, color(random(255),random(255),random(255)));
		}
	}
}

function draw_candies(){
	for (let i = 0; i < BOARD_HEIGHT; i++){
		for (let j = 0; j < BOARD_WIDTH; j++){
			board[i][j].show();
		}
	}
}

function mouseReleased() {
	drag = false;
	//Swap with right
	if(board[candy_i][candy_j].x > board[candy_i][candy_j+1].x){
		swap_candy(0, 1);
	}
	//Swap with left
	if(board[candy_i][candy_j].x < board[candy_i][candy_j-1].x){
		swap_candy(0, -1);
	}
	//Swap with down
	if(board[candy_i][candy_j].y > board[candy_i+1][candy_j].y){
		swap_candy(1, 0);
	}
	//Swap with up
	if(board[candy_i][candy_j].y < board[candy_i-1][candy_j].y){
		swap_candy(-1, 0);
	}
	set_candies_to_grid();
}

function mouseDragged() {
	if (!drag){
		check_which_candy_clicked();
	}
	if (drag){
		//Move candy right
		if(mouseX > board[candy_i][candy_j].gridX+INN_DIST && !locked_XL && !locked_YD && !locked_YU){
			locked_XR = true;
			if(abs(mouseX - board[candy_i][candy_j].gridX) < CANDY_W + INN_DIST){
				board[candy_i][candy_j].y = board[candy_i][candy_j].gridY;
				board[candy_i][candy_j].x = mouseX;
			}
			else{	//Force position if it glitches too far
				board[candy_i][candy_j].y = board[candy_i][candy_j].gridY;
				board[candy_i][candy_j].x = board[candy_i][candy_j].gridX + CANDY_H + INN_DIST
			}
			//Move adjacent candy
			board[candy_i][candy_j+1].x = board[candy_i][candy_j+1].gridX - (abs(board[candy_i][candy_j].x - board[candy_i][candy_j].gridX));
		}
		//Move candy left
		else if(mouseX < board[candy_i][candy_j].gridX-INN_DIST && !locked_XR && !locked_YD && !locked_YU){
			locked_XL = true;
			if(abs(mouseX - board[candy_i][candy_j].gridX) < CANDY_W + INN_DIST){
				board[candy_i][candy_j].y = board[candy_i][candy_j].gridY;
				board[candy_i][candy_j].x = mouseX;
			}
			else{	//Force position if it glitches too far
				board[candy_i][candy_j].y = board[candy_i][candy_j].gridY;
				board[candy_i][candy_j].x = board[candy_i][candy_j].gridX - CANDY_H - INN_DIST
			}
			//Move adjacent candy
			board[candy_i][candy_j-1].x = board[candy_i][candy_j-1].gridX + (abs(board[candy_i][candy_j].x - board[candy_i][candy_j].gridX));
		}
		//Move candy down
		else if(mouseY > board[candy_i][candy_j].gridY+INN_DIST && !locked_XR && !locked_XL && !locked_YU){
			locked_YD = true;
			if(abs(mouseY - board[candy_i][candy_j].gridY) < CANDY_H + INN_DIST){
				board[candy_i][candy_j].x = board[candy_i][candy_j].gridX;
				board[candy_i][candy_j].y = mouseY;
			}
			else{	//Force position if it glitches too far
				board[candy_i][candy_j].x = board[candy_i][candy_j].gridX;
				board[candy_i][candy_j].y = board[candy_i][candy_j].gridY + CANDY_H + INN_DIST
			}
			//Move adjacent candy
			board[candy_i+1][candy_j].y = board[candy_i+1][candy_j].gridY - (abs(board[candy_i][candy_j].y - board[candy_i][candy_j].gridY));
		}
		//Move candy up
		else if(mouseY < board[candy_i][candy_j].gridY-INN_DIST && !locked_XR && !locked_XL && !locked_YD){
			locked_YU = true;
			if(abs(mouseY - board[candy_i][candy_j].gridY) < CANDY_H + INN_DIST){
				board[candy_i][candy_j].x = board[candy_i][candy_j].gridX;
				board[candy_i][candy_j].y = mouseY;
			}
			else{	//Reset position if it glitches too far
				board[candy_i][candy_j].x = board[candy_i][candy_j].gridX;
				board[candy_i][candy_j].y = board[candy_i][candy_j].gridY - CANDY_H - INN_DIST
			}
			//Move adjacent candy
			board[candy_i-1][candy_j].y = board[candy_i-1][candy_j].gridY + (abs(board[candy_i][candy_j].y - board[candy_i][candy_j].gridY));
		}
		else{
			locked_XR = false;
			locked_XL = false;
			locked_YD = false;
			locked_YU = false;
		}
		if(!locked_XR && !locked_XL && !locked_YD && !locked_YU){
			board[candy_i][candy_j].x = mouseX;
			board[candy_i][candy_j].y = mouseY;
		}
	}
}

function check_which_candy_clicked(){
	for (let i = 0; i < BOARD_HEIGHT; i++){
		for (let j = 0; j < BOARD_WIDTH; j++){
			if(check_inside_candy_border(mouseX, mouseY, i, j)){
				candy_i = i;
				candy_j = j;
				drag = true;
			}
		}
	}
}

function check_inside_candy_border(x,y,i,j){
	if(x > board[i][j].x - board[i][j].w/2 &&
	   x < board[i][j].x + board[i][j].w/2 &&
	   y > board[i][j].y - board[i][j].h/2 &&
	   y < board[i][j].y + board[i][j].h/2
		){
		return true;
	}
	else return false;
}

function swap_candy(p, q){
	//Swap grid position
	let tempX = board[candy_i][candy_j].gridX;
	board[candy_i][candy_j].gridX = board[candy_i+p][candy_j+q].gridX;
	board[candy_i+p][candy_j+q].gridX = tempX;
	let tempY = board[candy_i][candy_j].gridY;
	board[candy_i][candy_j].gridY = board[candy_i+p][candy_j+q].gridY;
	board[candy_i+p][candy_j+q].gridY = tempY;
	//Swap candy object
	let tempCandy = board[candy_i][candy_j];
	board[candy_i][candy_j] = board[candy_i+p][candy_j+q];
	board[candy_i+p][candy_j+q] = tempCandy;
}

function set_candies_to_grid(){
	for (let p = -1; p <= 1; p++){
		for (let q = -1; q <=1; q++){
			board[candy_i+p][candy_j+q].x = board[candy_i+p][candy_j+q].gridX;
			board[candy_i+p][candy_j+q].y = board[candy_i+p][candy_j+q].gridY;
		}
	}
}
