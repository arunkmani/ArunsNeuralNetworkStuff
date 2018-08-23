function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
}
class Point
{
	 constructor(wid,hei)
	 {
	 	this.x=random(-wid/2,wid/2);
	 	this.y=random(-hei/2,hei/2);
	 	this.label;
	 	this.icon=dotSprite;
	 	this.icon1=hollowSprite;
	 	this.width=16;
	 	this.height=16;
	 	this.wid=wid;
	 	this.hei=hei;
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
	 
	 	this.x=this.x+this.hei/2;
	 	this.y=this.y+this.wid/2;
	 	if(this.label===1)
	 	{
	 		image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
	 	}
	 	if(this.label===-1)
	 	{
	 		image(this.icon1, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
	 	}
	 	//var r =[px,py];
	 	//return r;
	 }
}