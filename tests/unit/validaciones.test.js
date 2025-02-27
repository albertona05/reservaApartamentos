const { esEmailValido, esPasswordValido } = require('../../utils/validaciones');

describe('Validaciones de Datos', () => {
    
    it('Validar un email correcto', () => {
        if (!esEmailValido('test@example.com')) {
            throw new Error('El email debería ser válido');
        }
    });

    it('Detectar un email incorrecto', () => {
        if (esEmailValido('testexample.com')) {
            throw new Error('El email debería ser inválido');
        }
    });

    it('Validar un password seguro', () => {
        if (!esPasswordValido('Pass1234!')) {
            throw new Error('El password debería ser seguro');
        }
    });

    it('Detectar un password inseguro', () => {
        if (esPasswordValido('123')) {
            throw new Error('El password debería ser inseguro');
        }
    });
});
