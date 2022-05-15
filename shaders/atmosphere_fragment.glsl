varying vec3 vertexNormal;

void main()
{
    //for every pixel looped, set its color
    //gl_FragColor = vec4(1, 0, 0, 1);

    //we need to pass texture image through, using uniform
    //second parameter is an uv coordinate (xy coordinates for a 2D texture)
    //uv coordinates are used to map 2D images onto 3D objects
    //gl_FragColor = texture2D(globeTextureUniform, vertexUV);

    float intensity = pow(0.7 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);

    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
}

