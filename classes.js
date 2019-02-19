class Candy {
	constructor(x, y, w, h, color){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.gridX = x;
		this.gridY = y;
		this.color = color;
	}

	show() {
		noStroke();
		fill(this.color);
		rectMode(CENTER);
		rect(this.x, this.y, this.w, this.h, 20, 20, 20, 20);
	}
}

class Title {
	constructor(font, titleSize, color){
		textFont(font);
		textSize(0.8 * titleSize);
		textAlign(CENTER, CENTER);
		this.titleSize = titleSize;
		this.color = color;
	}

	show() {
		fill(this.color);
		text('Pets Crush', width/2, this.titleSize*2/5-3);
	}
}
