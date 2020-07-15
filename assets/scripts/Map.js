import { Object3D, Vector3 } from 'three'

import { degToRad, lerp } from '~/assets/scripts/helpers/math'

import Plane from '~/assets/scripts/prototype/Plane'

import Marker from '~/assets/scripts/Marker'

const rotateX = [-25, -75]
const positionZ = [-3, -1.2]

export default class extends Plane {
    rotateZ = 0
    markers = []
    layers = {
        main: new Object3D(),
        markers: new Object3D(),
    }

    constructor() {
        super({ color: 0xffffff, gridRow: 12 })

        this.layers.main.add(this.layers.markers)
        this.layers.main.add(this.mesh)
        this.setZoom(0)
    }

    addMarker() {
        const marker = new Marker()

        this.markers.push(marker)
        this.layers.markers.add(marker.mesh)
        marker.mesh.lookAt(new Vector3(0, 0, 0))
    }

    setRotation(velocityX) {
        this.rotateZ = velocityX
        this.layers.main.rotation.z = degToRad(this.rotateZ)
        this.markersLookAt()
    }

    setZoom(t) {
        this.layers.main.rotation.x = degToRad(lerp(rotateX[0], rotateX[1], t))
        this.layers.main.position.z = lerp(positionZ[0], positionZ[1], t)
        this.layers.main.position.y = 0.2
        this.markersLookAt()
    }

    markersLookAt() {
        this.markers.map((marker) => marker.mesh.lookAt(new Vector3(0, 0, 0)))
    }
}
