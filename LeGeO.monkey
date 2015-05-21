'see license.txt For source licenses
'This example demonstrates how we can see when an animation has finished.
Import spine.spinemojo
Import mojo





Global map:Int[][] =[[7, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 01],
	[7, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 83, 83, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 83, 83, 83, 83, 83, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 83, 83, 83, 83, 83, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 37, 37, 37, 37, 37, 37, 37, 83, 37, 07, 07, 07, 07, 07, 37, 83, 83, 83, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 07, 07, 07, 37, 37, 83, 83, 83, 83, 83, 83, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 83, 83, 83, 83, 83, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 83, 83, 83, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 07, 07, 07, 37, 37, 83, 83, 83, 83, 83, 83, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 83, 83, 83, 83, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 83, 83, 83, 83, 83, 83, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 83, 83, 83, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 83, 83, 83, 83, 83, 83, 83, 37, 37, 07, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 83, 83, 83, 83, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 83, 83, 83, 83, 83, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 83, 83, 83, 83, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 83, 83, 83, 83, 83, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 07, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 07, 07, 07, 37, 37, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 83, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 37, 37, 37, 37, 83, 37, 07, 07, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 83, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 37, 37, 37, 37, 83, 37, 07, 07, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 83, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 04, 37, 37, 07, 07, 07, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 04, 37, 37, 07, 07, 07, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 37, 04, 37, 37, 07, 07, 07, 37, 37, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 37, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 04, 37, 37, 07, 07, 07, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 04, 37, 37, 07, 07, 07, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 37, 37, 37, 37, 37, 04, 37, 37, 07, 07, 07, 07, 07, 07, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 07, 07, 37, 37, 37, 37, 07, 07, 07, 07, 37, 37, 37, 37, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 04, 37, 37, 07, 07, 07, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 37, 83, 37, 07, 07, 37, 37, 37, 37, 83, 37, 07, 07, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 04, 37, 37, 07, 07, 07, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 83, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 37, 37, 37, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 83, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 07, 07, 07, 07, 07, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 83, 37, 37, 37, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 187, 07, 07, 07, 07, 07, 07, 07, 07, 07, 01],
	[7, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 07, 01]]


Const mapwidth:Int=150
Const mapheight:Int=30
Const tilewidth:Int=32
Const tileheight:Int=32
Global mapx:Int=0
Global mapy:Int=0
Global mapsx:Int=0
Global mapsy:Int=0




Function Main:Int()
	New MyApp
	Return 0
End

Global spineTest:SpineEntity
Global spineDragon:SpineEntity
Global sndJump:Sound
Global sndHitBlock:Sound
Global imgWorld:Image
Global imgWall1:Image



Class MyApp Extends App Implements SpineEntityCallback
	Field timestamp:Int
	'Field spineTest:SpineEntity
	Field showMessageText:String
	Field showMessageAlpha:Float = 4.0
	
	Field banana:SpineMojoImageAttachment
	
	Method OnSpineEntityAnimationComplete:Void(entity:SpineEntity, name:String)
		' --- animation has finished ---
		Select entity
			Case spineTest
		End
	End
	
	Method OnSpineEntityEvent:Void(entity:SpineEntity, event:String, intValue:Int, floatValue:Float, stringValue:String)
		' --- event has triggered ---
		Print "SpineEvent: " + event + " int:" + intValue + " float:" + floatValue + " string:" + stringValue
	End
	
	Method OnCreate:Int()
		' --- create the app ---
		'setup runtime
		SetUpdateRate(60)
		timestamp = Millisecs()
		sndJump = LoadSound("jump.mp3")
		sndHitBlock = LoadSound("Wall_Hit.mp3")
		
		'sndMusic1 = LoadSound("Army_Strong.mp3")
		
		PlayMusic("Army_Strong.mp3", 1)
		
		'imgWorld = LoadImage("faithful32x32.png")
		imgWorld = LoadImage("faithful32x32.png", 32, 32, 256)
		'imgWall1 = imgWorld.GrabImage(32 * 7, 0, 32, 32, 1)
		
		'player.AddLast(New players())
	'	initelevators
		
		
		'load some stuff to maybe use
		banana = New SpineMojoImageAttachment("banana_attachment", "monkey://data/banana.png")
		
		
		spineDragon = LoadMojoSpineEntity("monkey://data/goblins-ffd.json")
		spineDragon.SetAnimation("walk", True)
		'spineDragon.SetSkin("goblin")
		spineDragon.SetSkin("goblingirl")
	
		spineDragon.SetScale(0.4)
		spineDragon.SetSpeed(0.3)
		
		
		spineDragon.SetDebug(False, False)
		spineDragon.SetCallback(Self)
		spineDragon.SetSnapToPixels(False)
		spineDragon.SetIgnoreRootPosition(False)
		spineDragon.SetFlip(True, False)
		'spineDragon.SetPosition(DeviceWidth() / 2, DeviceHeight() / 2)
		spineDragon.SetAlpha(0)
		
		'load spineTest
		Try
			'#TEST = "custom_attachment"
			#TEST = "spineboy"
			'which mode ?
			#If TEST = "spineboy"
			spineTest = LoadMojoSpineEntity("monkey://data/spineboy.json")
			spineTest.SetAnimation("stand", True)
			spineTest.SetScale(0.1)
			spineTest.SetSpeed(0.5)
			
			
			
			#ElseIf TEST = "goblin"
			spineTest = LoadMojoSpineEntity("monkey://data/goblins-ffd.json")
			spineTest.SetAnimation("walk", True)
			spineTest.SetSkin("goblin")
			'spineTest.SetSkin("goblingirl")
			spineTest.SetScale(1.0)
			spineTest.SetSpeed(0.2)
			
			#ElseIf TEST = "powerup"
			spineTest = LoadMojoSpineEntity("monkey://data/powerup.json")
			spineTest.SetAnimation("animation", True)
			
			#ElseIf TEST = "regions"
			spineTest = LoadMojoSpineEntity("monkey://data/smile_skeleton.json")
			spineTest.SetAnimation("animation", True)
			
			#ElseIf TEST = "ffd"
			spineTest = LoadMojoSpineEntity("monkey://data/mesh_skeleton.json")
			spineTest.SetAnimation("animation", True)
			
			#ElseIf TEST = "ffd_simple"
			spineTest = LoadMojoSpineEntity("monkey://data/simple_mesh_skeleton.json")
			spineTest.SetAnimation("animation", True)
			
			#ElseIf TEST = "skinned_mesh"
			spineTest = LoadMojoSpineEntity("monkey://data/skinned_mesh_skeleton.json")
			spineTest.SetAnimation("animation", True)
			
			#ElseIf TEST = "bounding_boxes"
			spineTest = LoadMojoSpineEntity("monkey://data/bounding_boxes_skeleton.json")
			spineTest.SetAnimation("animation", True)
			spineTest.SetSpeed(0.3)
			
			#ElseIf TEST = "ik"
			spineTest = LoadMojoSpineEntity("monkey://data/ik_skeleton.json")
			spineTest.SetAnimation("animation", True)
			spineTest.SetSpeed(0.3)
			
			#ElseIf TEST = "events"
			spineTest = LoadMojoSpineEntity("monkey://data/events_skeleton.json")
			spineTest.SetAnimation("animation", True)
			spineTest.SetSpeed(0.5)

			#ElseIf TEST = "custom_attachment"
			spineTest = LoadMojoSpineEntity("monkey://data/spineboy.json")
			spineTest.SetAnimation("run", True)
			spineTest.SetScale(0.4)
			spineTest.SetSpeed(0.2)			
			
			#Else
			Error("no test specified")
				
			#EndIf
			
			
			spineTest.SetDebug(False, False)
			spineTest.SetCallback(Self)
			spineTest.SetSnapToPixels(False)
			spineTest.SetIgnoreRootPosition(False)
			spineTest.SetFlip(False, False)
			spineTest.SetPosition(DeviceWidth() / 2, DeviceHeight() / 2)
			
		Catch exception:SpineException
			Error("Exception: " + exception)
		End
		
		'must alwasy Return
		Return 0
	End
	
	Method OnRender:Int()
		' --- render the app ---
		Cls(0, 0, 0)
		
		
		'For Local y:Int = 0 Until mapheight
		'	For Local x:Int = 0 Until mapwidth
		'		If map[y][x] = 1 Then DrawRect(x*tilewidth,y*tileheight,tilewidth,tileheight)
		'	End
		'End
		
		'DrawRect 0, 0, DeviceWidth(), 32
		
		
		
		'For Local i:=Eachin elevator
		'	i.draw
		'Next
		'SetColor 255,255,255
		'DrawText "Platformer Elevators Example",10,10
		'DrawText "Use cursor left/right and space bar",160,10
		'For Local i:=Eachin player
		'	i.draw
		'Next
		drawmap
		p.draw
		
		
		
		'simples! render current item
		spineDragon.Render()
		spineTest.Render()
		
		'render message
		'If showMessageAlpha > 0.0
		'	SetColor(255, 255, 255)
		'	SetAlpha(Min(1.0, showMessageAlpha))
		'	DrawText(showMessageText, 5, 5)
		'EndIf
		
		'SetColor(0, 0, 0)
		'DrawRect(MouseX(), MouseY(), 32, 32)
	'	DrawText(TouchX(0), 20, 20)
	'	DrawText("KEY_D=" + KeyDown(KEY_D), 20, 30)
	'	DrawText("KEY_A=" + KeyDown(KEY_A), 20, 40)
		
		
		
		
		
		
		
		'must alwasy Return
		Return 0
	End
	Field LastKey:Int = -1
	Method OnUpdate:Int()
		
		
		
	
		
		' --- update the app ---
		'check For quit
		If KeyHit(KEY_ESCAPE) OnClose()
		
		'update time/delta
		Local newTimestamp:Int = Millisecs()
		Local deltaInt:Int = newTimestamp - timestamp
		Local deltaFloat:Float = deltaInt / 1000.0
		timestamp = newTimestamp
		
		'make changes to the entity before updating
		'spineTest.SetPosition(MouseX(), MouseY())
		'spineTest.SetRotation(spineTest.GetRotation() +1.0)
		'spineTest.SetRotation(MouseY())
		'spineTest.SetBonePosition("bone4", MouseX(), MouseY(), True)
		spineTest.Update(deltaFloat)
		spineDragon.Update(deltaFloat)
		
		'do stuff based on test
		#If TEST = "custom_attachment"
			spineTest.SetSlotCustomAttachment("gun", banana)
		#EndIf
		
		'make changes to certain bones after it has been updated
		'spineTest.SetBonePosition("bone4", MouseX(), MouseY(), True)
		'spineTest.SetBoneRotation("head", MouseX(), True)
		
		'If spineTest.RectOverlapsSlot(MouseX(), MouseY(), 32, 32, "bounding_slot", True)
		'If spineTest.PointInsideBoundingBox(MouseX(), MouseY(), SPINE_PRECISION_HULL)
		If spineTest.PointInside(MouseX(), MouseY(), SPINE_PRECISION_HULL)
			spineTest.SetColor(255, 0, 0)
		Else
			spineTest.SetColor(255, 255, 255)
		EndIf
		

		
		p.update
		alignmap
		
		'update fading message
		'If showMessageAlpha > 0
		'	showMessageAlpha -= 0.05
		'EndIf
		
		'must alwasy Return
		Return 0
	End
End



'''''''''''''''''''







Class player
	
	Field LastKey:Int = -1
	Field x:Float=32*3
	Field y:Float=32*6
	Field w:Int=32
	Field h:Int=32
	Field incy:Float=0
	Field isjumping:Bool = False
	Field facing:Int '0 = left , 1 = right
	Field jumpofvine:Bool=False
	Field jumpofvinetimeout:Int
	Method update()
		If pvc(0,0) = False Or jumpofvine = True Then regularmode
		If pvc(0,0) = True
			If jumpofvine = False
				vinemode
			End If
		End If
	End Method

	Method vinemode()
		isjumping = False
		incy=0
		If KeyDown(KEY_SPACE)
			jumpofvine = True
			jumpofvinetimeout = Millisecs() + 1000
			isjumping = True
			incy = -4
			PlaySound(sndJump)
		End If
		If KeyDown(KEY_UP)
			For Local i=0 Until 4
				If pvc(0,0) = True And ptc(0,-1) = False
					y -= 1
					
				Else
					If ChannelState(0) = 0 Then
						PlaySound(sndHitBlock)
					End If
				End If
			Next
		End If
		If KeyDown(KEY_DOWN)
			For Local i=0 Until 4
				If pvc(0,0) = True And ptc(0,1) = False
					y += 1
				Else
					'PlaySound(sndHitBlock)
				
				End If
			Next
		End If
		If KeyDown(KEY_LEFT)
			For Local i=0 Until 4
				If pvc(0,0) = True And ptc(-1,0) = False
					x-=1
					facing = 0
				Else
					If ChannelState(0) = 0 Then
						PlaySound(sndHitBlock)
					End If
				End If
			Next
			If LastKey <> KEY_LEFT Then
				spineTest.SetFlip(True, False)
				spineTest.SetAnimation("walk", True)
				LastKey = KEY_LEFT
				Print "LEFT VINEMODE"
			End If
		End If
		If KeyDown(KEY_RIGHT)
			For Local i=0 Until 4
				If pvc(0,0) = True And ptc(1,0) = False
					x+=1
					facing = 1
				Else
					If ChannelState(0) = 0 Then
						PlaySound(sndHitBlock)
					End If
				End If
			Next
			If LastKey <> KEY_RIGHT Then
				spineTest.SetFlip(False, False)
				spineTest.SetAnimation("walk", True)
				LastKey = KEY_RIGHT
				Print "Right VINEMODE"
			End If
			
		End If
		If KeyDown(KEY_RIGHT) = 0 and KeyDown(KEY_LEFT) = 0 Then
			If LastKey <> 0 Then
				spineTest.SetAnimation("stand", True)
				LastKey = 0
			EndIf
		EndIf
			
	End Method
	Method regularmode()
		If jumpofvine = True
			If Millisecs() > jumpofvinetimeout Then jumpofvine=False
		End If
		'Left and Right movement
		If KeyDown(KEY_RIGHT)
			For Local i=0 Until 4 ' move with 4 pixels at a time
				If ptc(1,0) = False
					x+=1
					facing = 1
				Else
					If ChannelState(0) = 0 Then
						PlaySound(sndHitBlock)
					End If
				End If
			Next
			If LastKey <> KEY_RIGHT Then
				spineTest.SetFlip(False, False)
				spineTest.SetAnimation("walk", True)
				LastKey = KEY_RIGHT
				Print "Right"
			End If
		End If
		If KeyDown(KEY_LEFT)
			For Local i=0 Until 4
				If ptc(-1,0) = False
					x-=1
					facing = 0
				Else
					If ChannelState(0) = 0 Then
						PlaySound(sndHitBlock)
					End If
				End If
				
			Next
			If LastKey <> KEY_LEFT Then
				spineTest.SetFlip(True, False)
				spineTest.SetAnimation("walk", True)
				LastKey = KEY_LEFT
				Print "Right"
			End If
		End If
		
		If KeyDown(KEY_RIGHT) = 0 and KeyDown(KEY_LEFT) = 0 Then
			If LastKey <> 0 Then
				spineTest.SetAnimation("stand", True)
				LastKey = 0
			Else
				'If ChannelState(0) = 0 Then
				'	PlaySound(sndHitBlock)
				'End If
			EndIf
		EndIf
		If KeyDown(KEY_ENTER)
			spineTest.SetAnimation("shoot", True)
			
		EndIf
		
		'player gravity part
		'if in the air and not in jump
		If isjumping = False
			If ptc(0,1) = False
				isjumping = True
				
				incy=0
			End If
		End If
		' jump
		If KeyDown(KEY_SPACE)
			If isjumping = False
				isjumping = True
				incy = -4 'Jump hight/speed
				
			End If
			PlaySound(sndJump)
		End If
		' if we are in a jump/falling down
		If isjumping=True
			If incy>=0 'if we are going down
				If incy < 4 Then incy += 0.1
				For Local i=0 Until(incy)
					If ptc(0,1) = False
						y += 1 'Falling speed
					Else
						isjumping = False
						If ChannelState(0) = 0 Then
							PlaySound(sndHitBlock)
						End If
					End If
				Next
			End If
			If incy<0 'if we are going up
				incy+=.1
				For Local i=0 Until Abs(incy)
					If ptc(0,-1) = False
						y-=1
					Else
						incy = 0
						If ChannelState(0) = 0 Then
							PlaySound(sndHitBlock)
						EndIf
					End If
				Next
			End If
		End If
	End Method
	Method draw()
		'SetColor 255,255,0
		'DrawRect x, y, w, h
		If LastKey = KEY_RIGHT Then
			spineTest.SetPosition(x + 40, y - 240)
		ElseIf LastKey = KEY_LEFT
			spineTest.SetPosition(x + 40, y - 240)
		Else
			spineTest.SetPosition(x + 20, y - 240)
		EndIf
		'spineTest.SetPosition(x + 12, y - 240)
	End Method
End Class

Global p:player = New player






Function Main2()
	New MyGame()
End


Function alignmap:Bool()
	For Local i=0 Until 4
		If p.x > DeviceWidth / 2
			If mapx+20 < mapwidth-1
				mapsx-=1
				If mapsx < 0 Then
					mapsx = 31
					mapx += 1
				Endif
				p.x -= 1
			End If
		End If
	Next

	For Local i=0 Until 4
		If p.x < DeviceWidth / 2
			If mapx > 0
				mapsx+=1
				If mapsx > 32 Then
					mapsx = 0
					mapx -= 1
				Endif
				p.x+=1
			End If
		End If
	Next
	' scrolling down
	For Local i=0 Until 16
		If p.y > DeviceHeight / 2
			If mapy+14 < mapheight-1
				mapsy -= 1
				If mapsy < 0 Then
					mapsy = 31
					mapy += 1
				Endif
				p.y -= 1
			End If
		End If
	Next
	' scrolling up
	For Local i=0 Until 16
		If p.y < DeviceHeight / 2
			If mapy > 0
				mapsy+=1
				If mapsy > 31 Then
					mapsy = 0
					mapy -= 1
				Endif
				p.y+=1
			End If
		End If
	Next
End Function


'player collide with vines blocks true/false
Global Ladder:Int = 83
Function pvc:Bool(offsetx:Int=0,offsety:Int=0)
	Local cx = (p.x+offsetx)/tilewidth+mapx
	Local cy = (p.y+offsety)/tileheight+mapy
	For Local y2=cy-1 Until cy+4
		For Local x2=cx-1 Until cx+4
			If x2>=0 And x2<mapwidth And y2>=0 And y2<mapheight
				If map[y2][x2] = Ladder 'Change this
					Local x3 = (x2-mapx)*tilewidth-32+mapsx
					Local y3 = (y2-mapy)*tileheight+mapsy
					If rectsoverlap(p.x+offsetx,p.y+offsety,p.w,p.h,x3,y3,tilewidth,tileheight) = True
						Return True
					End If
				End If
			End If
		Next
	Next
	Return False
End Function


'player collide with solid blocks true/false
Global SolidWall:Int = 7

Function ptc:Bool(offsetx:Int = 0, offsety:Int = 0)
	Local cx = (p.x+offsetx)/tilewidth+mapx
	Local cy = (p.y+offsety)/tileheight+mapy
	For Local y2=cy-1 Until cy+4
		For Local x2 = cx - 1 Until cx + 4
			If x2>=0 And x2<mapwidth And y2>=0 And y2<mapheight
				If map[y2][x2] = SolidWall 'Change this
					Local x3 = (x2-mapx)*tilewidth-32+mapsx
					Local y3 = (y2-mapy)*tileheight+mapsy
					If rectsoverlap(p.x+offsetx,p.y+offsety,p.w,p.h,x3,y3,tilewidth,tileheight) = True
						Return True
						
					End If
				End If
			End If
		Next
	Next
	Return False
End Function


Function drawmap:Void()
	Local visDragon = 0
	For Local y=0 To 14
		For Local x=0 To 20
			Local x1 = ((x*tilewidth)+mapsx)-tilewidth
			Local y1 = ( (y * tileheight) + mapsy)
			Local imgNum:int = map[y + mapy][x + mapx]
			
			
			
			
			
			
			Select imgNum
			'	Case 0
			'		DrawImage(imgWorld.GrabImage(32 * 5, 32 * 2, 32, 32, 1), x1, y1)
			'	Case 1'Wall
			'	'	DrawImage(imgWorld.GrabImage(32 * 7, 0, 32, 32, 1), x1, y1)
			'		DrawImage(imgWall1, x1, y1)
			'		'SetColor 100,100,100
			'		'DrawRect x1,y1,tilewidth,tileheight
			'	Case 2'Ladder
			'		DrawImage(imgWorld.GrabImage(32 * 3, 32 * 5, 32, 32, 1), x1, y1)
			'		'SetColor 0, 100, 0
			'		'DrawRect x1, y1, tilewidth, tileheight
			'	Case 3
			'		'SetColor 100, 0, 0
			'		'DrawRect x1, y1, tilewidth, tileheight
			'	Case 4
			'		DrawImage(imgWorld.GrabImage(0, 32 * 8, 32, 32, 1), x1, y1)
			'End Select
			'DrawImage(imgWorld.GrabImage(32 * (map[y + mapy][x + mapx]), 0, 32, 32, 1), x1, y1)
				Case 187
					spineDragon.SetPosition(x1, y1)
					'If x1 > 20 Or x1 < 0 Then
					'	spineDragon.SetAlpha(0)
					'EndIf
					'If y1 > 14 Or y1 < 0 Then
					'	spineDragon.SetAlpha(0)
					'EndIf
					
					'If x1 < 20 Or x1 > 0 Then
					'	spineDragon.SetAlpha(1)
					'EndIf
					'If y1 < 14 Or y1 > 0 Then
					'	spineDragon.SetAlpha(1)
					'EndIf
					'spineDragon.SetAlpha(1)
					'imgNum = 7
					'Print "x1: " + x1
					'Print "y1: " + y1
					visDragon = 1
			End
			DrawImage(imgWorld, x1, y1, imgNum)
		Next
	Next
    If visDragon = 1 Then
		visDragon = 0
		spineDragon.SetAlpha(1)
	Else
		spineDragon.SetAlpha(0)
	
	EndIf
End Function


Function rectsoverlap:Bool(x1:Int, y1:Int, w1:Int, h1:Int, x2:Int, y2:Int, w2:Int, h2:Int)
	If x1 >= (x2 + w2) Or (x1 + w1) <= x2 Then Return False
	If y1 >= (y2 + h2) Or (y1 + h1) <= y2 Then Return False
	Return True
End Function
