//版权 北京智能社©, 保留所有权利

function Cannon(imgs, type){
	Sprite.call(this, imgs['cannon'+type]);
	
	var size=[
		null,
		{w: 74, h: 74},
		{w: 74, h: 76},
		{w: 74, h: 76},
		{w: 74, h: 83},
		{w: 74, h: 85},
		{w: 74, h: 90},
		{w: 74, h: 94},
	];
	
	this.w=size[type].w;
	this.h=size[type].h;
	
	this.type=type;
}

Cannon.prototype=new Sprite();
Cannon.prototype.constructor=Cannon;