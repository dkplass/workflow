export const DetectiveWidth = {
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0
    }
  },
  mounted() {
    this.detector()
    this.$nextTick(() => {
      this.install()
    })
  },
  destroyed() {
    this.uninstall()
  },
  beforeRouteLeave(to, from, next) {
    this.uninstall()
    next()
  },
  methods: {
    detector() {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    },
    install() {
      window.addEventListener('resize', this.detector)
    },
    uninstall() {
      window.removeEventListener('resize', this.detector)
    }
  }
}
