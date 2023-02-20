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
		parentFrame.absoluteRotationAngle=90;
       /* parentFrame.transparencySettings.dropShadowSettings.mode = ShadowMode.drop;
        parentFrame.transparencySettings.dropShadowSettings.blendMode = BlendMode.MULTIPLY;
        parentFrame.transparencySettings.dropShadowSettings.opacity = 15;                                       //percentage
        parentFrame.transparencySettings.dropShadowSettings.xOffset =3;                                         //value in mm
        parentFrame.transparencySettings.dropShadowSettings.yOffset =2;                                         // value in mm
        parentFrame.transparencySettings.dropShadowSettings.distance = 3.606;                               // value in mm
        parentFrame.transparencySettings.dropShadowSettings.angle = 146.3;                                   // in degrees
        parentFrame.transparencySettings.dropShadowSettings.size = 2.5;                                         // value in mm
     */
 }