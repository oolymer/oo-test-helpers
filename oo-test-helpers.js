(function(global) {
  const Mocha = window.Mocha
  const interfaceExtensions = []

  function extendMochaInterfaces(helperFactory) {
    interfaceExtensions.push(() => {
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

  extendMochaInterfaces((context, interfaceName) => {
    if (interfaceName === "tdd") {
      // blocks the test suite run after Mocha's setup() was called.
      // useful to explore the current state of the user interface.
      context.setup.wait = function wait(callback) {
        context.setup(function(done) {
          this.enableTimeouts(false)
          callback(done)
        })
      }

      // blocks the test suite run after Mocha's test() was called.
      // useful to explore the current state of the user interface.
      context.test.wait = function wait(name, callback) {
        context.test(name, function(done) {
          this.enableTimeouts(false)
          callback(done)
        })
      }
    }
  })

  applyMochaExtensions()
})(this)
