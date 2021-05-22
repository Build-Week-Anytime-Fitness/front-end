describe('test forms',()=>{

    before(()=>{
        cy.visit('http://localhost:3000');
    });

    const loginLink=()=>cy.get('[href="/login"]');
    const signupLink=()=>cy.get('[href="/signup"]');
    const classesLink=()=>cy.get('[href="/classes"]');

    it('form links render',()=>{
        loginLink().should('exist');
        signupLink().should('exist');
        classesLink().should('exist');
    });
    describe('test login form',()=>{
        before(()=>{
            loginLink().click();
        });
        const email=()=>cy.get('#login-form-email-input');
        const password=()=>cy.get('#login-form-passwoard-input');
        const submit=()=>cy.get('#login-form-submit');
    
        const emailValue='chris@gmail.com';
        const pwValue='12345678';
    
        const fillLoginForm=()=>{
            email().type(emailValue);
            password().type(pwValue);
        };
    
        it('renders login form',()=>{
            email().should('exist');
            password().should('exist');
            submit().should('exist');
        });

        it('submit disabled when empty',()=>{
            submit().should('be.disabled');
        });
    
        describe('login form inputs',()=>{
    
            before(()=>{
                fillLoginForm();
            });

            it('all form values are controlled',()=>{
                email().should('have.value',emailValue);
                password().should('have.value',pwValue);
            });
    
            it('submit enabled when filled',()=>{
                submit().should('be.enabled');
            });
        });
    });
});