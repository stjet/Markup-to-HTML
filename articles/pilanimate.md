# PilAnimate Documentation
PilAnimate is a python library that renders video frame by frame, using [PIL](https://pillow.readthedocs.io/en/stable/index.html).
## Why use PilAnimate?
I mostly made PilAnimate for my personal use, and I'm sure there's probably better ones out there, but I made PilAnimate to be fairly simple and easily extendable. It renders frame by frame, meaning that even the most complex tasks can be completed on old computers, albeit slowly.
## Animation
**Class**
Creates layers
Parameters: 
- layer_num: number of layers]
- size (optional=(1600,900)): size in pixels [width,height]
- fps (optional=25): frames per second
- mode (optional="RGBA"): Type and depth of a pixel in the image. See [PIL docs](https://pillow.readthedocs.io/en/stable/handbook/concepts.html#concept-modes).
- color (optional=0): background color to use for the image
Returns: itself
Properties: layers, fps, mode, size
### export
**Function**
Turns frames into video.
Parameters: 
- filename (optional="hey"): The name of the output file
Returns: Nothing, creates filename+".avi" video
## Layer
**Class**
Creates layer. A layer is essentially an array of images. When the video is exporting, the layers will be pasted on each other to create an array of frames (layer 0 is at the bottom).
~ Warning: Do not create this class yourself, making the `Animation` class will do it for you.
Parameters:
- size: size in pixels [width,height]
- fps: frames per second
- mode (optional="RGBA"): Type and depth of a pixel in the image
- color (optional=0): background color to use for the image
Returns: itself
Properties: size, img, layer, fps, frames, mode
### createPoint
**Function**
Creates a point at `coords`
Parameters:
- coords: Coordinates of the point [x,y]
- fill (optional=None): Color of pixel
Returns: nothing
### createLine
**Function**
Creates line, where each array `[x,y]` inside `coords` is a point, connected in order.
Parameters:
- coords: Coordinates of line [[x,y],[x,y],[x,y]...]
- fill (optional=None): Color of line
- width (optional=0): Width of line
- joint (optional=None): if 'curve', joint type between the points is curved
Returns: nothing
### createArc
**Function**
Creates arc with starting and ending angles inside the bounding box.
Parameters:
- boundingBox: array consisting of upper left and lower right corners [[x,y],[x,y]]
- startAngle: angle in degreees
- endAngle: angle in degrees
- fill (optional=None): color of arc
- width (optional=0): width of arc line
Returns: nothing
### createEllipse
**Function**
Creates ellipse inside bounding box
Parameters:
- boundingBox: array consisting of upper left and lower right corners [[x,y],[x,y]]
- fill (optional=None): color of ellipse inside
- outline (optional=None): outline color
- width (optional=0): pixel width of outline
Returns: nothing
### createPolygon
**Function**
Creates polygon
Parameters:
- coords: List of points of the polygon outline [[x,y],[x,y],[x,y]...]
- fill (optional=None): color of polygon inside
- outline (optional=None): outline color
Returns: nothing
### createRectangle
**Function**
Creates rectangle
Parameters:
- boundingBox: array consisting of upper left and lower right corners [[x,y],[x,y]]
- fill (optional=None): color of rectangle inside
- outline (optional=None): outline color
- width (optional=1): width of outline
Returns: nothing
### createRoundedRectangle
**Function**
Creates a rounded rectangle
Parameters:
- boundingBox: array consisting of upper left and lower right corners [[x,y],[x,y]]
- radius (optional=0): radius of the rounded corners of the rectangle
- fill (optional=None): color of rectangle inside
- outline (optional=None): outline color
- width (optional=0): width of outline
Returns: nothing
### fillAll
**Function**
Fills entire frame with color
Parameters:
- fill (optional=None): fill of frame
- outline (optional=None): outline color of frame
- width (optional=0): outline line width
Returns: nothing
### createText
**Function**
