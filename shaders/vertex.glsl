varying vec2 vertexUV;

void main()
{
    vertexUV = uv;
    //for every vertex, set its position (xyz coordinates)
    //fourth argument is w (used for translates/transforms)
    //position is of type 3, so it has the (1, 0, 1) value
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}