varying vec2 vertexUV;

//a group of 3 coordinates, which give the normal (direction) of the vertex in 3D plane
varying vec3 vertexNormal;

void main()
{
    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normal);
    //for every vertex, set its position (xyz coordinates)
    //fourth argument is w (used for translates/transforms)
    //position is of type 3, so it has the (1, 0, 1) value
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}