import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { PCFShadowMap, PCFSoftShadowMap } from 'three'

//scene
const scene = new THREE.Scene()

//datgui
const gui = new dat.GUI()


//texture loader
const textureLoader = new THREE.TextureLoader()

const glassTexture = textureLoader.load('/glass/Facade002_1K_Color.jpg')
const glassDisplacementMapTexture = textureLoader.load('/glass/Facade002_1K_Displacement.jpg')
const glassNormalMapTexture = textureLoader.load('/glass/Facade002_1K_NormalGL.jpg')
const glassMetalnessMapTexture = textureLoader.load('/glass/Facade002_1K_Metalness.jpg')
const glassEmissionMapTexture = textureLoader.load('/glass/Facade002_1K_Emission.jpg')
const singleTexture = textureLoader.load('/singletexture.jpg')

glassTexture.repeat.set(1, 1)

glassTexture.wrapS = THREE.RepeatWrapping
glassTexture.wrapT = THREE.RepeatWrapping
glassTexture.repeat.set(1, 1)


const roadTexture = textureLoader.load('/Road/Road002_1K_Color.jpg')
const roadDisplacementMapTexture = textureLoader.load('/Road/Road002_1K_Displacement.jpg')
const roadNormalMapTexture = textureLoader.load('/Road/Road002_1K_NormalGL.jpg')
// const singleTexture = textureLoader.load('/singletexture.jpg')


const grassColorTexture = textureLoader.load('/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/grass/roughness.jpg')

const concreteColorTexture = textureLoader.load('/Concrete/Concrete034_1K_Color.jpg')
const concreteDisplacementTexture = textureLoader.load('/Concrete/Concrete034_1K_Displacement.jpg')
const concreteNormalTexture = textureLoader.load('/Concrete/Concrete034_1K_NormalDX.jpg')
const concreteRoughnessTexture = textureLoader.load('/Concrete/Concrete034_1K_Roughness.jpg')

const woodColorTexture = textureLoader.load('/Wood/Wood066_1K_Color.jpg')
const woodDisplacementTexture = textureLoader.load('/Wood/Wood066_1K_Displacement.jpg')
const woodNormalTexture = textureLoader.load('/Wood/Wood066_1K_NormalDX.jpg')
const woodRoughnessTexture = textureLoader.load('/Wood/Wood066_1K_Roughness.jpg')

const brickColorTexture = textureLoader.load('/bricks/color.jpg')
const brickAmbientOcclusionTexture = textureLoader.load('/bricks/ambientOcclusion.jpg')
const brickNormalTexture = textureLoader.load('/bricks/normal.jpg')
const brickRoughnessTexture = textureLoader.load('/bricks/roughness.jpg')

const doorAlphaTexture = textureLoader.load('/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/door/ambientOcclusion.jpg')
const doorColorTexture = textureLoader.load('/door/color.jpg')
const doorHeightTexture = textureLoader.load('/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/door/roughness.jpg')


woodColorTexture.repeat.set(8, 8)
woodDisplacementTexture.repeat.set(8, 8)
woodNormalTexture.repeat.set(8, 8)
woodRoughnessTexture.repeat.set(8, 8)

woodColorTexture.wrapS = THREE.RepeatWrapping
woodDisplacementTexture.wrapS = THREE.RepeatWrapping
woodNormalTexture.wrapS = THREE.RepeatWrapping
woodRoughnessTexture.wrapS = THREE.RepeatWrapping

woodColorTexture.wrapT = THREE.RepeatWrapping
woodDisplacementTexture.wrapT = THREE.RepeatWrapping
woodNormalTexture.wrapT = THREE.RepeatWrapping
woodRoughnessTexture.wrapT = THREE.RepeatWrapping

concreteColorTexture.repeat.set(8, 8)
concreteDisplacementTexture.repeat.set(8, 8)
concreteNormalTexture.repeat.set(8, 8)
concreteRoughnessTexture.repeat.set(8, 8)

concreteColorTexture.wrapS = THREE.RepeatWrapping
concreteDisplacementTexture.wrapS = THREE.RepeatWrapping
concreteNormalTexture.wrapS = THREE.RepeatWrapping
concreteRoughnessTexture.wrapS = THREE.RepeatWrapping

concreteColorTexture.wrapT = THREE.RepeatWrapping
concreteDisplacementTexture.wrapT = THREE.RepeatWrapping
concreteNormalTexture.wrapT = THREE.RepeatWrapping
concreteRoughnessTexture.wrapT = THREE.RepeatWrapping


grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

// glassTexture.repeat.set(2, 2)
// glassDisplacementMapTexture.repeat.set(1, 1)
// glassNormalMapTexture.repeat.set(1, 1)

// glassTexture.wrapS = THREE.RepeatWrapping

//lights

// ambientlight

const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
scene.add(ambientLight)

//directionallight
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.7)
moonLight.position.set(4, 5, - 2)
scene.add(moonLight)

//axes helper
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

//plane 
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        // transparent: true,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
     })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

//road
const roadGeometry1 = new THREE.PlaneBufferGeometry(2.5, 8.3)
const roadMaterial = new THREE.MeshStandardMaterial({
    map: roadTexture,
    displacementMap: concreteDisplacementTexture,
    displacementScale: 0.01,
    normalMap: concreteNormalTexture,
    roughnessMap: concreteRoughnessTexture
})

const road1 = new THREE.Mesh(roadGeometry1, roadMaterial)
road1.rotation.x = - Math.PI * 0.5
road1.position.x = 0.7
road1.position.y = 0.001
road1.position.z = 5.85
scene.add(road1)

const roadGeometry2 = new THREE.PlaneBufferGeometry(5, 8.3)

const road2 = new THREE.Mesh(roadGeometry2, roadMaterial)
road2.rotation.x = -Math.PI * 0.5
road2.rotation.z = -Math.PI * 0.5
road2.position.x = -5.8
road2.position.y = 0.001
road2.position.z = -0.8
scene.add(road2)


const road3 = new THREE.Mesh(roadGeometry2, roadMaterial)
road3.rotation.x = -Math.PI * 0.5
road3.rotation.z = -Math.PI * 0.5
road3.position.x = 5.8
road3.position.y = 0.001
road3.position.z = -0.8
scene.add(road3)

//house 1
const house1 = new THREE.Group()
scene.add(house1)

const house1WallGeometry1 = new THREE.BoxBufferGeometry(6.6, 0.5, 0.1)
const house1WallGeometry2 = new THREE.BoxBufferGeometry(9, 0.5, 0.1)
const house1wallMaterial = new THREE.MeshStandardMaterial({ 
    map: brickColorTexture,
    transparent: true,
    aoMap: brickAmbientOcclusionTexture,
    normalMap: brickNormalTexture,
    roughnessMap: brickRoughnessTexture
});


const wall1 = new THREE.Mesh(house1WallGeometry1, house1wallMaterial)
wall1.position.x = -9.9
wall1.position.y = 0.25
wall1.position.z = -6.7
wall1.rotation.y = Math.PI * 0.5
wall1.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(wall1.geometry.attributes.uv.array, 2)
)

wall1.castShadow = true


const wall2 = new THREE.Mesh(house1WallGeometry1, house1wallMaterial)
wall2.position.x = 1
wall2.position.y = 0.25
wall2.position.z = -6.7
wall2.rotation.y = Math.PI * 0.5
wall2.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(wall2.geometry.attributes.uv.array, 2)
)
wall2.castShadow = true


const wall3 = new THREE.Mesh(house1WallGeometry2, house1wallMaterial)
wall3.position.x = -3.5
wall3.position.y = 0.25
wall3.position.z = -3.4
wall3.rotation.y = Math.PI 
wall3.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(wall3.geometry.attributes.uv.array, 2)
)
house1.add(wall1, wall2, wall3) 
wall3.castShadow = true

//walls
const houseBody = new THREE.Mesh(
    new THREE.BoxBufferGeometry(6, 2.5, 4),
    new THREE.MeshStandardMaterial({ 
        map: brickColorTexture,
        transparent: true,
        aoMap: brickAmbientOcclusionTexture,
        normalMap: brickNormalTexture,
        roughnessMap: brickRoughnessTexture
    })  //best for relaistic 
)
houseBody.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(houseBody.geometry.attributes.uv.array, 2)
)
houseBody.castShadow = true


houseBody.position.y = 2.5 / 2 
houseBody.position.z = -7
houseBody.position.x = -5
house1.add(houseBody)

//roof
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(4.4, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45'})
)
roof.position.y = 2.5 + 0.5
roof.position.z = -7
roof.position.x = -5
roof.rotation.y = Math.PI * 0.25
house1.add(roof)
roof.castShadow = true

//door
const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({ 
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        // wireframe: true,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
door.castShadow = true

door.position.y = 2 / 2 
door.position.z = -5.001
door.position.x = -5
house1.add(door)

//doorlight
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(-5, 2, -4.5)
house1.add(doorLight)
doorLight.castShadow = true

//fog
// const fog = new THREE.Fog('#262837', 15, 15)
// scene.fog = fog


// graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    color: '#b2b6b1'
})

for (let i = 0; i < 40; i++){
    const angle = Math.random() * Math.PI * 2 
    const radius = 1 + Math.random() * 2.5
    const x = Math.sin(angle) * radius + 5.5
    const z = -Math.cos(angle) * radius - 6.5

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.4, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.3
    grave.castShadow = true
    graves.add(grave)
}


//night market
const nightMarket = new THREE.Group()
scene.add(nightMarket)

//concrete floor for baiyoke
const concreteFloorNightMarket = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(9.5, 8.3),
    new THREE.MeshStandardMaterial({ 
        map: concreteColorTexture,
        // transparent: true,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
     })
)
concreteFloorNightMarket.rotation.x = - Math.PI * 0.5
concreteFloorNightMarket.position.x = -5.3
concreteFloorNightMarket.position.z = 5.85
concreteFloorNightMarket.position.y = 0.01
nightMarket.add(concreteFloorNightMarket)
concreteFloorNightMarket.castShadow = true

//stick
const stickTentGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
const stickTentMaterial = new THREE.MeshBasicMaterial({ color: 0xCFD4D9 });

const tentx = [-9.5, -8.5, -7.5, -6.5, -5.5, -4.5, -3.5, -2.5]
const tenty = 0.5


for (let x = 0; x < tentx.length; x++){
    for (let z = 9; z > 3; z--){
        const sticks = new THREE.Mesh(stickTentGeometry, stickTentMaterial);
        sticks.position.set(tentx[x], tenty, z)
        sticks.castShadow = true
        nightMarket.add(sticks)
    }
}



// scene.add( cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8 );

// #b35f45
//roof
const roofGeometry = new THREE.ConeBufferGeometry(1, 0.5, 4)
const roofMaterial1 = new THREE.MeshStandardMaterial({ color: 0xFFFF00 })
const roofMaterial2 = new THREE.MeshStandardMaterial({ color: 0x0000FF })
const roofMaterial3 = new THREE.MeshStandardMaterial({ color: 0x00FF00 })
const roofMaterial4 = new THREE.MeshStandardMaterial({ color: 0xFF0000 })
const roofMaterial5 = new THREE.MeshStandardMaterial({ color: 0x00FFFF })

const roofMaterial = [roofMaterial1, roofMaterial2, roofMaterial3, roofMaterial4, roofMaterial5]
// roofMaterial1.castShadow = true
// roofMaterial2.castShadow = true
// roofMaterial3.castShadow = true
// roofMaterial4.castShadow = true
// roofMaterial5.castShadow = true
// const roof1 = new THREE.Mesh(roofGeometry, roofMaterial)
// roof1.position.y =  1.2
// roof1.position.x = -9
// roof1.position.z = 8.5
// roof1.rotation.y = Math.PI * 0.25

// const roof2 = new THREE.Mesh(roofGeometry, roofMaterial)
// roof2.position.y =  1.2
// roof2.position.x = -9
// roof2.position.z = 6.5
// roof2.rotation.y = Math.PI * 0.25

// const roof3 = new THREE.Mesh(roofGeometry, roofMaterial)
// roof3.position.y =  1.2
// roof3.position.x = -7
// roof3.position.z = 8.5
// roof3.rotation.y = Math.PI * 0.25

const roofx = [ -9, -7, -5, -3]
const roofz = [ 8.5, 6.5, 4.5]

// nightMarket.add(roof1, roof2, roof3)

for (let a = 0; a < roofx.length; a++){
    for (let b = 0; b < roofz.length; b++){
        const roofs = new THREE.Mesh(roofGeometry, roofMaterial[Math.floor(Math.random() * roofMaterial.length)])
        roofs.position.set(roofx[a], 1.2, roofz[b])
        roofs.rotation.y = Math.PI * 0.25
        roofs.castShadow = true
        nightMarket.add(roofs)
    }
}

// light from the market
const marketLight1 = new THREE.PointLight('#ffbb73', 1, 3, 1)
marketLight1.position.set(-7, 1.5, 6.5)
marketLight1.castShadow = true
nightMarket.add(marketLight1)

const marketLight2 = new THREE.PointLight('#ffbb73', 1, 3, 1)
marketLight2.position.set(-9, 1.5, 8.5)
nightMarket.add(marketLight2)

const marketLight3 = new THREE.PointLight('#ffbb73', 1, 3, 1)
marketLight2.position.set(-7, 1.5, 4.5)
nightMarket.add(marketLight2)

const marketLight4 = new THREE.PointLight('#ffbb73', 1, 3, 1)
marketLight2.position.set(-5, 1.5, 4.5)
nightMarket.add(marketLight2)

const marketLight5 = new THREE.PointLight('#ffbb73', 1, 3, 1)
marketLight5.position.set(-3, 1.5, 8.5)
nightMarket.add(marketLight5)


//charis
const chairGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5)
const chairMaterial = new THREE.MeshStandardMaterial({ 
    map: woodColorTexture,
    displacementMap: woodDisplacementTexture,
    displacementScale: 0.0001,
    normalMap: woodNormalTexture,
    roughnessMap: woodRoughnessTexture
 })

// const chair1 = new THREE.Mesh(chairGeometry, chairMaterial)
// chair1.position.x = -9
// chair1.position.z = 2.5
// chair1.position.y = 0.3

// const chair2 = new THREE.Mesh(chairGeometry, chairMaterial)
// chair2.position.x = -8
// chair2.position.z = 2.5
// chair2.position.y = 0.3

for (let bushx = 9; bushx > 1; bushx--){
    const chairsx = new THREE.Mesh(chairGeometry, chairMaterial)
    chairsx.position.set(-bushx, 0.3, 2.5)
    chairsx.castShadow = true
    nightMarket.add(chairsx)
}

for (let bushz = 4; bushz < 10; bushz++){
    console.log("bushz", bushz)
    const chairsz = new THREE.Mesh(chairGeometry, chairMaterial)
    chairsz.position.set(-1.3, 0.3, bushz)
    chairsz.castShadow = true
    nightMarket.add(chairsz)
}

// nightMarket.add(chair1, chair2)


//baiyoke 
const baiyoke = new THREE.Group()
scene.add(baiyoke)

// Tree 
const treeBodyGeometry = new THREE.CylinderGeometry( 0.1, 0.3, 1, 6 );
const treeBodymaterial = new THREE.MeshBasicMaterial({ color: 0x613B16});

const treebody1 = new THREE.Mesh(treeBodyGeometry, treeBodymaterial)
treebody1.position.y = 0.5
treebody1.position.z = 9.5
treebody1.position.x = 2.5
baiyoke.add(treebody1)

const treebody2 = new THREE.Mesh(treeBodyGeometry, treeBodymaterial)
treebody2.position.y = 0.5
treebody2.position.z = 7
treebody2.position.x = 2.5
baiyoke.add(treebody2)

const treebody3 = new THREE.Mesh(treeBodyGeometry, treeBodymaterial)
treebody3.position.y = 0.5
treebody3.position.z = 4
treebody3.position.x = 2.5
baiyoke.add(treebody3)

//bush for tree
const treeBushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
const treeBushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const treeBush1 = new THREE.Mesh(treeBushGeometry, treeBushMaterial)
treeBush1.scale.set(0.7, 0.7, 0.7)
treeBush1.position.set(2.5, 1, 9.5)
baiyoke.add(treeBush1)

const treeBush2 = new THREE.Mesh(treeBushGeometry, treeBushMaterial)
treeBush2.scale.set(0.5, 0.5, 0.5)
treeBush2.position.set(2.5, 1, 7)
baiyoke.add(treeBush2)

const treeBush3 = new THREE.Mesh(treeBushGeometry, treeBushMaterial)
treeBush3.scale.set(0.3, 0.3, 0.3)
treeBush3.position.set(2.5, 1, 4)
baiyoke.add(treeBush3)


//grass floor for baiyoke
const grassfloorBaiyoke = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(8.05, 8.3),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        // transparent: true,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
     })
)
grassfloorBaiyoke.rotation.x = - Math.PI * 0.5
grassfloorBaiyoke.position.x = 5.95
grassfloorBaiyoke.position.z = 5.85
grassfloorBaiyoke.position.y = 0.01
baiyoke.add(grassfloorBaiyoke)

//building
const baseGeometry1 = new THREE.CylinderGeometry(1, 1, 0.4, 6);
const baseGeometry2 = new THREE.CylinderGeometry(0.8, 0.8, 0.4, 6);
const baseGeometry3 = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 6);
const baseGeometry4 = new THREE.CylinderGeometry(0.1, 0.1, 1, 6);
const baseMaterial = new THREE.MeshStandardMaterial({ 
    map: glassTexture
});
const whitebaseMaterial = new THREE.MeshBasicMaterial({ color: 0xadd8e6 });
const steelBaseMateiral = new THREE.MeshBasicMaterial({ color: 0x71797E });

for (let x = 0; x < 7; x++){
    if (x == 6) {
        var base1 = new THREE.Mesh(baseGeometry1, whitebaseMaterial);
    } else {
        var base1 = new THREE.Mesh(baseGeometry1, baseMaterial);
    }
    base1.castShadow = true
    base1.position.set(7, 0.4 * x, 7)
    baiyoke.add(base1)
}


for (let x = 0; x < 7; x++){
    if (x == 6) {
        var base2 = new THREE.Mesh(baseGeometry2, whitebaseMaterial);
    } else {
        var base2 = new THREE.Mesh(baseGeometry2, baseMaterial);
    }
    
    base2.position.set(7, (0.4 * x) + 2.4, 7)
    baiyoke.add(base2)
}

for (let x = 0; x < 8; x++){
    if (x == 7) {
        var base3 = new THREE.Mesh(baseGeometry3, whitebaseMaterial);
    } else {
        var base3 = new THREE.Mesh(baseGeometry3, baseMaterial);
    }
    base3.position.set(7, (0.4 * x) + 4.8, 7)
    baiyoke.add(base3)
}

const base4 = new THREE.Mesh(baseGeometry4, steelBaseMateiral);
base4.position.set(7, 8, 7)
baiyoke.add(base4)

//Disco Light baiyoke
const discoBaiyokeLight1 = new THREE.PointLight('#991844', 1, 20, 2)
discoBaiyokeLight1.position.set(7, 1.2, 8.7)
scene.add(discoBaiyokeLight1)

const discoBaiyokeLight2 = new THREE.PointLight('#991844', 1, 20, 2)
discoBaiyokeLight2.position.set(5.5, 1.2, 7)
scene.add(discoBaiyokeLight2)

const discoBaiyokeLight3 = new THREE.PointLight('#991844', 1, 20, 2)
discoBaiyokeLight3.position.set(7, 1.2, 5.5)
scene.add(discoBaiyokeLight3)

const discoBaiyokeLight4 = new THREE.PointLight('#991844', 1, 20, 2)
discoBaiyokeLight3.position.set(8.5, 1.2, 7)
scene.add(discoBaiyokeLight3)


//mahanakorn
const mahanakorn = new THREE.Group()
scene.add(mahanakorn)

//grass for mahanakorn
const grassfloorMahanakorn = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(5, 5),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        // transparent: true,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
     })
)
grassfloorMahanakorn.rotation.x = - Math.PI * 0.5
grassfloorMahanakorn.position.x = 0.6
grassfloorMahanakorn.position.z = -0.8
grassfloorMahanakorn.position.y = 0.01
mahanakorn.add(grassfloorMahanakorn)

const block = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5)
const blockMaterial = new THREE.MeshStandardMaterial({ 
    map: singleTexture,
})

const lightMateiral = new THREE.MeshBasicMaterial({
    color: 0xadd8e6
})
 

for (let y = 0; y < 20; y++){
    for (let z = 0; z < 4; z++){
        for (let x = 0; x < 4; x++){
            // if (x == Math.floor(Math.random() * 4) && y == Math.floor(Math.random() * 17) || z == Math.floor(Math.random() * 3)) {
            //     break
            // } else {
                // console.log(x / 2, y / 2, -z / 2)
                if (x == 2 & y == 2 & z == 0) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 1 & y == 3 & z == 1) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 2 & y == 4 & z == 0) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 2 & y == 4 & z == 1) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 2 & y == 5 & z == 1) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 2 & y == 5 & z == 2) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 2 & y == 6 & z == 3) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 2 & y == 7 & z == 2) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 1 & y == 7 & z == 2) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 1 & y == 8 & z == 2) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 0 & y == 9 & z == 2) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 1 & y == 10 & z == 2) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 1 & y == 11 & z == 1) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 1 & y == 12 & z == 1) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 2 & y == 12 & z == 1) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 2 & y == 15 & z == 1) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 2 & y == 16 & z == 1) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 2 & y == 16 & z == 2) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 2 & y == 17 & z == 2) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 2 & y == 18 & z == 3) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }
                else if (x == 1 & y == 19 & z == 3) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 1 & y == 19 & z == 0) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 1 & y == 19 & z == 1) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }else if (x == 1 & y == 19 & z == 2) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }
                else if (x == 0 & y == 19 & z == 2) {
                    var blocks = new THREE.Mesh(block, lightMateiral)
                }
                else {
                    var blocks = new THREE.Mesh(block, blockMaterial)
                }
                blocks.castShadow = true
                blocks.position.set(x / 2, y/2 , -z / 2)
                mahanakorn.add(blocks)
            // }
            if (x == 0 & y == 2 & z == 0 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 1 & y == 2 & z == 0 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 1 & y == 3 & z == 0 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 2 & y == 3 & z == 0 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 4 & z == 0 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 4 & z == 1 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 5 & z == 1 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 5 & z == 2 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 6 & z == 2 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 6 & z == 3 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 2 & y == 7 & z == 3 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 1 & y == 7 & z == 3 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 1 & y == 8 & z == 3 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 0 & y == 9 & z == 3 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 0 & y == 10 & z == 3 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 0 & y == 10 & z == 2 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 0 & y == 11 & z == 1 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 0 & y == 11 & z == 0 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 1 & y == 12 & z == 0 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 1 & y == 11 & z == 0 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 2 & y == 13 & z == 0 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 2 & y == 12 & z == 0 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 14 & z == 0 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 15 & z == 1 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 15 & z == 0 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 16 & z == 1 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 16 & z == 2 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 17 & z == 2 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 18 & z == 3 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 1 & y == 18 & z == 3 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 19 & z == 3 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 2 & y == 19 & z == 3 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 2 & y == 19 & z == 2 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 2 & y == 19 & z == 1 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 3 & y == 19 & z == 1 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 0 & y == 19 & z == 1 ) {
                mahanakorn.remove(blocks)
            }
            if (x == 0 & y == 19 & z == 3 ) {
                mahanakorn.remove(blocks)
            }
        }
    }
}


//Disco Light
const discoLight1 = new THREE.PointLight('#0096FF', 0.5, 20, 2)
discoLight1.position.set(0.7, 1.2, 1)
scene.add(discoLight1)

const discoLight2 = new THREE.PointLight('#0096FF', 1, 25, 2)
discoLight2.position.set(-1.5, 1, -0.7)
scene.add(discoLight2)

const discoLight3 = new THREE.PointLight('#0096FF', 0.5, 25, 2)
discoLight3.position.set(1, 0, -2.8)
scene.add(discoLight3)

const discoLight4 = new THREE.PointLight('#0096FF', 0.5, 25, 2)
discoLight4.position.set(2.7, 0, -0.7)
scene.add(discoLight4)

//bushes
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(-1.3, 0.2, 1.2)
bush1.castShadow = true

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(-0.7, 0.1, 1.2)
bush2.castShadow = true

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.25, 0.25, 0.25)
bush3.position.set(-1.6, 0.2, -2.7)
bush3.castShadow = true

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.5, 0.5, 0.5)
bush4.position.set(-1, 0.1, -2.9)
bush4.castShadow = true

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial)
bush5.scale.set(0.25, 0.25, 0.25)
bush5.position.set(2.7, 0.2, -2.7)
bush5.castShadow = true

const bush6 = new THREE.Mesh(bushGeometry, bushMaterial)
bush6.scale.set(0.5, 0.5, 0.5)
bush6.position.set(2.5, 0.2, -2)
bush6.castShadow = true

const bush7 = new THREE.Mesh(bushGeometry, bushMaterial)
bush7.scale.set(0.5, 0.5, 0.5)
bush7.position.set(2.5, 0.2, 1.2)
bush7.castShadow = true

const bush8 = new THREE.Mesh(bushGeometry, bushMaterial)
bush8.scale.set(0.25, 0.25, 0.25)
bush8.position.set(2, 0.2, 1.2)
bush8.castShadow = true

mahanakorn.add(bush1, bush2, bush3, bush4, bush5, bush6, bush7, bush8)




// x = 0, 1, 2, 3
// z = 0, 3
// y = 



// for (let i = 0; i < 4; i++){
//     const x =  
// }
// mahanakorn.add(block1, block2, block3, block4, block5, block6, block7, block8)



//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.x = 3
camera.position.y = 2
camera.position.z = 10
scene.add(camera)


//gui add
// gui.add(block2.position, 'x').min(-5).max(10).step(0.001)
// gui.add(block3.position, 'x').min(-5).max(10).step(0.001)



//renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas
})

//shadow
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

floor.receiveShadow = true
grassfloorBaiyoke.receiveShadow = true
grassfloorMahanakorn.receiveShadow = true
concreteFloorNightMarket.receiveShadow = true
road1.receiveShadow = true
road2.receiveShadow = true
road3.receiveShadow = true


moonLight.castShadow = true
doorLight.castShadow = true
// mahanakorn.castShadow = true



renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//control
const control = new OrbitControls(camera, canvas)
control.enableDamping = true

window.addEventListener('resize', () => {
    

    //update size
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)

})

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    //control update
    control.update()

    //render
    renderer.render(scene, camera)

    //call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick()