(function(global) {
  // blocks the test suite run after Mocha's setup() was called.
  // useful to explore the current state of the user interface.
  global.setupBlocked = function setupBlocked(callback) {
    global.setup(function(done) {
      this.enableTimeouts(false)
      callback(done)
    })
  }

  const interfaceExtensions = []

  function extendMochaInterfaces(helperFactory) {
    interfaceExtensions.push(() => {
      const Mocha = window.Mocha

      Object.keys(Mocha.interfaces).forEach(interfaceName => {
        const baseInterface = Mocha.interfaces[interfaceName]

        Mocha.interfaces[interfaceName] = function(suite) {
          baseInterface.apply(this, arguments)
          suite.on("pre-require", function(context, _file, _mocha) {
            helperFactory(context, interfaceName)
          })
        }
      })
    })
  }

  function applyMochaExtensions() {
    interfaceExtensions.forEach(applyExtension => {
      applyExtension()
    })
  }

  extendMochaInterfaces(context => {
    context.setup.blocked = function blocked(callback) {
      context.setup(function(done) {
        this.enableTimeouts(false)
        callback(done)
      })
    }
  })

  applyMochaExtensions()

})(this)
