describe('test shopping cart',()=>{

    const class1 = 'Cardio-Masters';
    const class2 = 'Trip to Nirvana';
    const class3 = 'Surf Lessons 2.1';

    const signUp1 = () => cy.contains(class1).parents('.MuiCard-root').find('button');
    const signUp2 = () => cy.contains(class2).parents('.MuiCard-root').find('button');
    const signUp3 = () => cy.contains(class3).parents('.MuiCard-root').find('button');

    const registerClasses = () =>{
        signUp1().click();
        signUp2().click();
        signUp3().click();
    };

    const cartLink=()=>cy.get('#nav-cart');

    before(()=>{
        const loginLink=()=>cy.get('#nav-log-in');
        const email=()=>cy.get('#login-form-email-input');
        const password=()=>cy.get('#login-form-password-input');
        const submit=()=>cy.get('#login-form-submit');
        cy.visit('http://localhost:3000');
        loginLink().click();
        email().clear();
        password().clear();
        email().type('th@marvel.org');
        password().type('password');
        submit().click();
        cy.wait(10000);
    });
    it('renders class page',()=>{
        signUp1().should('exist');
        signUp2().should('exist');
        signUp3().should('exist');
    });
    it('can sign up',()=>{
        registerClasses();
        signUp1().should('have.text','unregister');
        signUp2().should('have.text','unregister');
        signUp3().should('have.text','unregister');
    });
    describe('test cart page',()=>{
        const checkout = () =>cy.get('#cart-checkout-button');
        const cardNum = '4242424242424242';
        const expDate = '12/99';
        const cvc = '123';
        before(()=>{
            cartLink().click();
        });
        it('can render cart page',()=>{
            cy.contains(class1).should('exist');
            cy.contains(class2).should('exist');
            cy.contains(class3).should('exist');
            checkout.should('exist');
            checkout.should('be.enabled');
        });
        describe('test checkout',()=>{
            before(()=>{
                checkout.click();
            });
            it('can use stripe',()=>{
                
            });
        })
        
    });
});