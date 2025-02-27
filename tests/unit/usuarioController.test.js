const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const Usuario = require('../../models/usuario');
const usuarioController = require('../../controllers/usuarioController');

describe('Usuario Controller', () => {

    describe('registrar', () => {
        it('debería crear un nuevo usuario con contraseña cifrada', async () => {
            const req = {
                body: { nombre: 'Test', email: 'test@example.com', password: '123456' }
            };
            const res = { redirect: sinon.spy() };

            const hashStub = sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
            const createStub = sinon.stub(Usuario, 'create').resolves();

            await usuarioController.registrar(req, res);

            expect(hashStub.calledOnce).to.be.true;
            expect(createStub.calledWith({ 
                nombre: 'Test', 
                email: 'test@example.com', 
                password: 'hashedPassword' 
            })).to.be.true;
            expect(res.redirect.calledWith('/usuarios/login')).to.be.true;

            hashStub.restore();
            createStub.restore();
        });
    });

});
