let planes;
let carriers;
let fires;
let trucks;
function preload()
{
	planes= loadBytes("data/Airplane1000.bin");
	carriers= loadBytes("data/Carriers1000.bin");
	fires= loadBytes("data/Campfire1000.bin");
	trucks= loadBytes("data/Firetruck1000.bin");

}
function setup()
{
	createCanvas(280,280);
	background(0);
}