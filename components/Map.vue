<template>
    <div
        id="map"
        ref="map"
        @wheel="onMouseWheel"
        @mousedown="canDrag = true"
        @mouseup="canDrag = false"
        @mousemove="onMouseMoves"
    />
</template>
<script>
import { Scene, PerspectiveCamera, WebGLRenderer, Vector3 } from 'three'
import Map from '~/assets/scripts/Map'

export default {
    name: 'Map',
    data() {
        return {
            zoom: 0,
            rotate: 0,
            canDrag: false,
        }
    },
    mounted() {
        this.scene = new Scene()
        this.Map = new Map()

        this.setRenderer()
        this.onResize()
        this.setCamera()

        this.scene.add(this.Map.layers.main)

        this.RafManager.addQueue(() => this.render())
        window.addEventListener('resize', () => this.onResize())

        this.Map.addMarker()
    },
    methods: {
        setRenderer() {
            this.renderer = new WebGLRenderer()

            this.renderer.setClearColor('#eee', 1)
            this.$el.appendChild(this.renderer.domElement)
        },
        setCamera() {
            this.camera = new PerspectiveCamera(
                45,
                this.width / this.height,
                0.1,
                10
            )

            this.camera.position.set(0, 0, 0)
            this.camera.lookAt(new Vector3(0, 0, 0))
        },
        onResize() {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.renderer.setSize(this.width, this.height)

            if (this.camera) {
                this.camera.aspect = this.width / this.height
            }
        },
        onMouseWheel(e) {
            this.zoom += (e.deltaY < 0 ? 1 : -1) * 0.02
            this.zoom = Math.min(1, Math.max(0, this.zoom))
            this.Map.setZoom(this.zoom)
        },
        onMouseMoves(e) {
            if (this.canDrag) {
                this.rotate += e.movementX * 0.1
                this.Map.setRotation(this.rotate)
            }
        },
        render() {
            this.renderer.render(this.scene, this.camera)
        },
    },
}
</script>
<style lang="scss">
#map {
    top: 0;
    left: 0;
    position: fixed;
    height: calc(100 * var(--vh));
    width: 100vw;
}
</style>
