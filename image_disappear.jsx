// Customer - Swarovski
// Project - Swarovski_Project
// Jira Ticket - DEV-15170

// IMPORTANT - The Image frame/ Image fields should have name as 'topView' set in Project Editor to apply the dropshadow.
app.scriptPreferences.measurementUnit = MeasurementUnits.MILLIMETERS;

var inddFileName = app.scriptArgs.get("docName"); 

var inddDoc = app.documents.itemByName(inddFileName);

// allGraphics returns inner images and inline images.
var images= inddDoc.allGraphics;
for (i = 0; i < images.length; i++)	
{ 
    image = images[i];
    
        var parentFrame = image.parent;
		parentFrame.visible=false;
		
       
     
 }