uniform sampler2D globeTextureUniform;
varying vec2 vertexUV;
varying vec3 vertexNormal;

void main()
{
    //for every pixel looped, set its color
    //gl_FragColor = vec4(1, 0, 0, 1);

    //we need to pass texture image through, using uniform
    //second parameter is an uv coordinate (xy coordinates for a 2D texture)
    //uv coordinates are used to map 2D images onto 3D objects
    //gl_FragColor = texture2D(globeTextureUniform, vertexUV);

    //the following 2 lines are taken from the creator of three.js
    //this adds an atmospheric glow effect
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

    gl_FragColor = vec4(atmosphere + texture2D(globeTextureUniform, vertexUV).xyz, 1);
}