describe('service is available', function () {
	before(function () {
		cy.visit('http://localhost:5173');
	});

	it('should open constructor page by default', function () {
		cy.contains('Соберите бургер');
	});

	it('should log in', function () {
		cy.contains('Личный кабинет').click();
		cy.get('.input').as('login-form');
		cy.get('@login-form').find('[class^=text]').first().as('email-input');
		cy.get('@login-form').find('[class^=input__icon]').first().click();
		cy.get('@email-input').type('fzelner4@google.com.br');
		cy.get('@login-form')
			.find('[class^=text]')
			.last()
			.as('password-input')
			.type('2');
		cy.contains('Войти').click();
	});

	it('should open and close modal by icon', function () {
		cy.contains('Флюоресцентная булка R2-D3').click();
		cy.contains('Детали ингредиента').should('be.visible');
		cy.contains('Флюоресцентная булка R2-D3').should('be.visible');
		cy.get('#closeModal').click();
	});

	it('should open and close modal by overlay', function () {
		cy.contains('Флюоресцентная булка R2-D3').click();
		cy.contains('Детали ингредиента').should('be.visible');
		cy.contains('Флюоресцентная булка R2-D3').should('be.visible');
		cy.get('#modalOverlay').click(-10, -10, { force: true });
	});

	it('should check drag and drop and make order', function () {
		cy.contains('Флюоресцентная булка R2-D3').trigger('dragstart');
		cy.get('#constructor').trigger('drop');
		cy.get('#constructor').contains('Флюоресцентная булка R2-D3');
		cy.contains('Биокотлета из марсианской Магнолии').trigger('dragstart');
		cy.get('#constructor').trigger('drop');
		cy.get('#constructor').contains('Биокотлета из марсианской Магнолии');
		cy.contains('Кристаллы марсианских альфа-сахаридов').trigger('dragstart');
		cy.get('#constructor').trigger('drop');
		cy.get('#constructor').contains('Кристаллы марсианских альфа-сахаридов');
		cy.contains('Соус Spicy-X').trigger('dragstart');
		cy.get('#constructor').trigger('drop');
		cy.get('#constructor').contains('Соус Spicy-X');
		cy.contains('Оформить заказ').click();
		cy.wait(20000);
		cy.contains('Ваш заказ начали готовить').should('exist');
		cy.get('#closeModal').click();
	});

	it('should log out', function () {
		cy.contains('Личный кабинет').click();
		cy.contains('Выход').click();
		cy.contains('Конструктор').click();
	});
});
