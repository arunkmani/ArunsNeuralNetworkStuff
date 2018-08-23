class Point
{
	 constructor(wid,hei)
	 {
	 	this.x=random(wid);
	 	this.y=random(hei);
	 	this.label;
	 	this.icon=dotSprite;
	 	this.icon1=hollowSprite;
	 	this.width=16;
	 	this.height=16;
	 	if(this.x>this.y)
	 	{
	 		this.label=1;
	 		
	 	}
	 	else
	 	{
	 		this.label=-1;
	 	}
	 }
	 show()
	 {
	 	if(this.label===1)
	 	{
	 		image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
	 	}
	 	if(this.label===-1)
	 	{
	 		image(this.icon1, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
	 	}
	 }
}