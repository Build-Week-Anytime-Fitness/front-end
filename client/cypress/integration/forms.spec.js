describe('test forms',()=>{

    before(()=>{
        cy.visit('http://localhost:3000');
    });

    // getting elements
    const loginLink=()=>cy.get('#nav-log-in');
    const signupLink=()=>cy.get('#nav-sign-up');
    const classesLink=()=>cy.get('#nav-classes');
    const instructorLink=()=>cy.get('#nav-instructor');

    it('form links render',()=>{
        loginLink().should('exist');
        signupLink().should('exist');
        classesLink().should('exist');
        instructorLink().should('exist');
    });


    // form info used in login and signup
    const emailValue='chris@gmail.com';
    const pwValue='12345678';
    const nameValue='Chris';

    // login form
    describe('test login form',()=>{

        before(()=>{
            loginLink().click({ multiple: true });
        });
        // getting elements
        const email=()=>cy.get('#login-form-email-input');
        const password=()=>cy.get('#login-form-passwoard-input');
        const submit=()=>cy.get('#login-form-submit');
    
        const clearForm=()=>{
            email().clear();
            password().clear();
        };
        const fillForm=()=>{
            clearForm();
            email().type(emailValue);
            password().type(pwValue);
        };
    
        it('renders login form',()=>{
            email().should('exist');
            password().should('exist');
            submit().should('exist');
        });

        it('submit disabled when empty',()=>{
            clearForm();
            submit().should('be.disabled');
        });
    
        describe('login form inputs',()=>{
    
            before(()=>{
                fillForm();
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


    // sign up form
    describe('test signup form',()=>{

        before(()=>{
            signupLink().click();
        });

        // getting elements
        const name=()=>cy.get('#sign-up-form-name');
        const email=()=>cy.get('#sign-up-form-email');
        const password=()=>cy.get('#sign-up-form-password');
        const eighteenPlus=()=>cy.get('#sign-up-form-18-plus');
        const instructor=()=>cy.get('#sign-up-form-instructor');
        const submit=()=>cy.get('#sign-up-form-submit');
        const clearForm=()=>{
            name().clear();
            email().clear();
            password().clear();
        };
        const fillForm=()=>{
            clearForm();
            name().type(nameValue);
            email().type(emailValue);
            password().type(pwValue);
            eighteenPlus().check();
            instructor().check();
        };
    
        it('renders signup form',()=>{
            name().should('exist');
            email().should('exist');
            password().should('exist');
            eighteenPlus().should('exist');
            instructor().should('exist');
            submit().should('exist');
        });

        it('submit disabled when empty',()=>{
            clearForm();
            submit().should('be.disabled');
        });
    
        describe('singup form inputs',()=>{
            before(()=>{
                fillForm();
            });

            it('all form values are controlled',()=>{
                name().should('have.value',nameValue);
                email().should('have.value',emailValue);
                password().should('have.value',pwValue);
                eighteenPlus().should('be.checked');
                instructor().should('be.checked');
            });
    
            it('submit enabled when filled',()=>{
                submit().should('be.enabled');
            });
        });
    });


    // form info used in class form 
    const classNameValue = 'Be a Bro';
    const classTypeValue = 'Strength';
    const classDateValue = '2021-01-01';
    const startTimeValue = '09:55:32.55';
    const intensityValue = 'high';
    const durationValue = '1';
    const locationValue = 'Liberty Park'
    const maxClassSizeValue = '20';


    // class form
    describe('test class form',()=>{

        before(()=>{
            instructorLink().click({ multiple: true });
        });

        // getting elements
        const className=()=>cy.get('#class-form-class-name');
        const classType=()=>cy.get('#class-form-class-type');
        const classDate=()=>cy.get('#class-form-class-date');
        const startTime=()=>cy.get('#class-form-start-time');
        const intensity=()=>cy.get('#class-form-intensity');
        const duration=()=>cy.get('#class-form-duration');
        const location=()=>cy.get('#class-form-location');
        const maxClassSize=()=>cy.get('#class-form-max-class-size');
        const submit=()=>cy.get('#class-form-submit');    
        const clearForm=()=>{
            className().clear({force: true});
            classType().clear({force: true});
            classDate().clear({force: true});
            startTime().clear({force: true});
            duration().clear({force:true});
            location().clear({force: true});
            maxClassSize().clear({force:true});
        };
        const fillForm=()=>{
            clearForm();
            className().type(classNameValue,{force: true});
            classType().type(classTypeValue,{force: true});
            classDate().type(classDateValue,{force: true});
            startTime().type(startTimeValue,{force: true});
            intensity().select(intensityValue,{force: true});
            duration().type(durationValue,{force: true});
            location().type(locationValue,{force: true});
            maxClassSize().type(maxClassSizeValue,{force: true});
        };
    
        it('renders class form',()=>{
            className().should('exist');
            classType().should('exist');
            classDate().should('exist');
            startTime().should('exist');
            intensity().should('exist');
            duration().should('exist');
            location().should('exist');
            maxClassSize().should('exist');
        });

        it('submit disabled when empty',()=>{
            submit().should('be.disabled');
        });
    
        describe('class form inputs',()=>{
    
            before(()=>{
                fillForm();
            });

            it('all form values are controlled',()=>{
                className().should('have.value',classNameValue);
                classType().should('have.value',classTypeValue);
                classDate().should('have.value',classDateValue);
                startTime().should('have.value',startTimeValue);
                intensity().should('have.value',intensityValue);
                duration().should('have.value',durationValue);
                location().should('have.value',locationValue);
                maxClassSize().should('have.value',maxClassSizeValue);
            });
    
            it('submit enabled when filled',()=>{
                submit().should('be.enabled');
            });
        });
    });
});