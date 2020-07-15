import { PlaneVertices } from '~/assets/scripts/helpers/geometry'
import { BufferGeometry, BufferAttribute, MeshBasicMaterial, Mesh } from 'three'
import { degToRad } from '../helpers/math'
import Grid from '~/assets/scripts/prototype/Grid'

export default class {
    mesh = null

    constructor({ color, ratio, position, rotate, gridRow }) {
        this.ratio = ratio || 1
        this.color = color || 0xff0000
        this.position = position || [0, 0, 0]
        this.rotate = degToRad(rotate) || 0
        this.gridRow = gridRow || false

        this.createPlane()

        if (this.gridRow) {
            this.createGrid()
        }
    }

    createPlane() {
        const bg = new BufferGeometry()
        const vertices = new Float32Array(
            PlaneVertices.map((i) => i * this.ratio)
        )
        bg.setAttribute('position', new BufferAttribute(vertices, 3))

        this.mesh = new Mesh(bg, new MeshBasicMaterial({ color: this.color }))
        this.mesh.position.set(
            this.position[0],
            this.position[1],
            this.position[2]
        )
        this.mesh.rotateY(this.rotate)
    }

    createGrid() {
        const grid = new Grid({ row: this.gridRow })
        this.mesh.add(grid.mesh)
        grid.mesh.position.set(
            this.mesh.position.x,
            this.mesh.position.y,
            this.mesh.position.z + 0.01
        )
    }
}
