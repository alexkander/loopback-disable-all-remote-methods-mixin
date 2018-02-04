'use strict';
// Taken from comment of @ericaprieto in https://github.com/strongloop/loopback/issues/651

module.exports = function(Model, options) { 

  if (!Model.sharedClass || options.active!==true) return;

  var modelName = Model.sharedClass.name,
      methodsToExpose = {},
      // Obtener solo los nombres de los metodos
      methods = Model.sharedClass.methods().map((method) => {
        return (method.isStatic?'':'prototype.') + method.name;
      });

  // Agregar los nombres de los metodos de las relaciones
  try {
    Object.keys(Model.definition.settings.relations).forEach((relation) => {
      methods.push('prototype.__findById__'    + relation);
      methods.push('prototype.__destroyById__' + relation);
      methods.push('prototype.__updateById__'  + relation);
      methods.push('prototype.__exists__'      + relation);
      methods.push('prototype.__link__'        + relation);
      methods.push('prototype.__get__'         + relation);
      methods.push('prototype.__create__'      + relation);
      methods.push('prototype.__update__'      + relation);
      methods.push('prototype.__destroy__'     + relation);
      methods.push('prototype.__unlink__'      + relation);
      methods.push('prototype.__count__'       + relation);
      methods.push('prototype.__delete__'      + relation);
    });
  } catch(err) {}

  // Determinar que metodos seran deshabilitados
  if (Model.settings.acls) {
    Model.settings.acls.forEach((value) => {
      if (!value.property) return;
      var properties = value.property === '*'? methods : (value.property instanceof Array? value.property : [value.property]);
      properties.map((property) => {
        if (methods.indexOf(property) == -1) methods.push(property);
        methodsToExpose[property] = value.permission === 'ALLOW';
      });
    });
  }

  // Desabilitar los metodos
  options.debug && console.log('DISABLE METHODS', modelName);
  methods.forEach((methodName) => {
    var remove = !methodsToExpose[methodName];
    if (remove) {
      Model.disableRemoteMethodByName(methodName);
    }
    options.debug && console.log(' %s %s.%s', remove?' ':'+', modelName, methodName);
  });

};