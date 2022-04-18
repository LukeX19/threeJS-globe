import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
//applied antialiasing for sharp edges
const renderer = new THREE.WebGLRenderer({
    antialias: true
})

//just for testing
console.log(scene)
console.log(camera)
console.log(renderer)

//render the whole page
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)   //render object at the device native's resolution
document.body.appendChild(renderer.domElement)

//create the sphere object
const geometry = new THREE.SphereGeometry(5, 50, 50)
const texture = new THREE.TextureLoader()
const material = new THREE.ShaderMaterial({
    //color: 0xFF0000
    //map: texture.load('./images/Earth-hires.jpg')
    vertexShader: vertexShader,   //because property and value are equal, in js we can put only "vertexShader" instead of "vertexShader: vertexShader"
    fragmentShader: fragmentShader
})
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)
/*in order to see the sphere, camera must be moved back
otherwise, the camera will be placed inside the sphere
to do this, z axis value has to be greater than geometry value*/
camera.position.z = 15


function animate()
{
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()
