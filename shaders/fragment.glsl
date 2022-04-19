uniform sampler2D globeTextureUniform;
varying vec2 vertexUV;

void main()
{
    //for every pixel looped, set its color
    //gl_FragColor = vec4(1, 0, 0, 1);

    //we need to pass texture image through, using uniform
    //second parameter is an uv coordinate (xy coordinates for a 2D texture)
    //uv coordinates are used to map 2D images onto 3D objects
    gl_FragColor = texture2D(globeTextureUniform, vertexUV);
}