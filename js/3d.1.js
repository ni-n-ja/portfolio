'use strict'
window.onload = function () {
    var container;
    var camera, scene, renderer;
    var mouseX = 0,
        mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var r = 4;
    var th = 0;
    init();
    camera.position.x = 0;
    camera.position.y = 0.3;
    camera.position.z = 0;
    camera.lookAt(scene.position);
    animate();

    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        scene = new THREE.Scene();
        var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        scene.add(ambientLight);
        var pointLight = new THREE.PointLight(0xffffff, 0.8);
        camera.add(pointLight);
        scene.add(camera);
        material = new THREE.ShaderMaterial({
            uniforms: {},
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent
        });
        var manager = new THREE.LoadingManager();
        var loader = new THREE.OBJLoader(manager);
        loader.load('obj/Skull3D.obj', function (object) {
            object.position.y = 0;
            scene.add(object);
        }, null, null);
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        th += 0.01;
        th %= 2 * Math.PI;
        camera.position.x = r * Math.sin(th);
        camera.position.z = r * Math.cos(th);
        camera.lookAt(scene.position);
        render();
    }

    function render() {
        renderer.render(scene, camera);
    }
}