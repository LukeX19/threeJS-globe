import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

//just for testing
console.log(scene)
console.log(camera)
console.log(renderer)

//render the whole page
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

//create the sphere object
const geometry = new THREE.SphereGeometry(5, 50, 50)
const material = new THREE.MeshBasicMaterial({
    color: 0xFF0000
})
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)
/*in order to see the sphere, camera must be moved back
otherwise, the camera will be placed inside the sphere
to do this, z axis number has to be greater than geometry value*/
camera.position.z = 10


function animate()
{
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()
