import {
    BufferGeometry,
    LineBasicMaterial,
    Line,
    Vector3,
    Object3D,
} from 'three'

export default class {
    mesh = null

    constructor({ color, row }) {
        this.color = color || 0xff0000
        this.mesh = new Object3D()

        const increase = 2 / row
        for (let x = -1; x < 1; x += increase) {
            this.createLine([new Vector3(x, -1, 0), new Vector3(x, 1, 0)])
        }

        for (let y = -1; y < 1; y += increase) {
            this.createLine([new Vector3(-1, y, 0), new Vector3(1, y, 0)])
        }
    }

    createLine(points) {
        const line = new Line(
            new BufferGeometry().setFromPoints(points),
            new LineBasicMaterial({ color: this.color })
        )

        this.mesh.add(line)
    }
}
