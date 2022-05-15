import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js'
import gsap from 'gsap'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphere_vertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphere_fragment.glsl'

const canvasContainer = document.querySelector('#canvasContainer')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000)
//applied antialiasing for sharp edges
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.querySelector('canvas')
})

//just for testing
/*console.log(scene)
console.log(camera)
console.log(renderer)*/

//render half page
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight)
renderer.setPixelRatio(window.devicePixelRatio)   //render object at the device native's resolution
//document.body.appendChild(renderer.domElement)

//create the sphere object
const earthGeometry = new THREE.SphereGeometry(5, 50, 50)
const earthTexture = new THREE.TextureLoader()
const earthMaterial = new THREE.ShaderMaterial({
    //color: 0xFF0000
    //map: texture.load('./images/Earth-hires.jpg')
    vertexShader: vertexShader,   //because property and value are equal, in js we can put only "vertexShader" instead of "vertexShader: vertexShader"
    fragmentShader: fragmentShader,
    uniforms: {
        globeTextureUniform: {
            //value: texture.load('./images/Earth-hires.jpg')
            value: earthTexture.load('./images/world.topo.bathy.200401.3x5400x2700.jpg')
        }
    }
})
const earthSphere = new THREE.Mesh(earthGeometry, earthMaterial)
//scene.add(earthSphere)
/*in order to see the sphere, camera must be moved back
otherwise, the camera will be placed inside the sphere
to do this, z axis value has to be greater than geometry value*/
camera.position.z = 15

//create a second sphere, for the bigger atmoshpere glow effect
const atmosphereGeometry = new THREE.SphereGeometry(5, 50, 50)
const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
})
const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
atmosphere.scale.set(1.2, 1.2, 1.2)
scene.add(atmosphere)

//put the earth sphere into a group in order to rotate it based on mouse movement
//without altering the background 0.001 y rotation
const group = new THREE.Group()
group.add(earthSphere)
scene.add(group)

//add stars in the background
const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
})
const starVertices = []
//produce 10000 stars randomly on screen
for(let i=0; i<10000; i++)
{
    const x = (Math.random() - 0.5)*2000
    const y = (Math.random() - 0.5)*2000
    const z = -Math.random() * 2000
    starVertices.push(x, y, z)
}
console.log(starVertices);
//second parameter is 3 because for a star, we have an x, an y and a z coordinate which altogether make a group for that star
const starFloatBuffer = new THREE.Float32BufferAttribute(starVertices, 3);
starGeometry.setAttribute('position', starFloatBuffer);
const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)

//mouse and keyboard interaction
const mouse = {
    x: 0,
    y: 0
}
var keyPressedCounter = 0;
addEventListener('keypress', (event) => {
    if(event.key === 'r')
    {
        keyPressedCounter = keyPressedCounter + 1;
    }
})
addEventListener('mousemove', () => {
    if(keyPressedCounter %2 == 1)
    {
        mouse.x = (event.clientX / innerWidth)*2 - 1
        //mouse.y = (event.clientY / innerHeight)*2 + 1
        mouse.y = (event.clientY / innerHeight)*2
    }
})

function animate()
{
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    earthSphere.rotation.y = earthSphere.rotation.y + 0.002
    gsap.to(group.rotation, {
        //decrease the mouse rotation value by 50%
        x: mouse.y * 0.3,
        y: mouse.x * 0.5,
        //increase duration of interpolation by 2 seconds for smoother rotation effect
        duration: 2
    })
}
animate()
