import Plane from '~/assets/scripts/prototype/Plane'
export default class extends Plane {
    constructor() {
        const ratio = 0.02
        super({ ratio, position: [0, 0, ratio], rotate: 45 })
    }
}
