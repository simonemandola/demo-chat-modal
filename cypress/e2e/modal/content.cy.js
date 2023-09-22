describe("Test The content of Modal", ()=> {

    beforeEach(()=> {
        cy.openModal()
    })

    it("Test Modal top bar", ()=> {
        cy.get("aside[data-e2e-modal-top-bar]").find("h1").should("have.text", "Comentarios")
        cy.get("aside[data-e2e-modal-top-bar]")
            .find("button[data-e2e-modal-button-close]")
            .should("be.visible")
    })

    it("Test Messages list", ()=> {
        // Check if it has messages loaded
        cy.get("ul[data-e2e-modal-messages-list] > li").should("have.length.greaterThan", 1)
    });

    it("Test Modal form", ()=> {
        // File input
        cy.get("form[data-e2e-modal-form]")
            .find("input[data-e2e-modal-form-attach-input]")
            .should("exist")
            .should("not.be.disabled")
        cy.get("form[data-e2e-modal-form]")
            .find("button[data-e2e-modal-form-remove-attach]")
            .should("not.exist")
        cy.get("form[data-e2e-modal-form]")
            .find("span[data-e2e-modal-form-attach-icon]")
            .should("be.visible")

        // Text input
        cy.get("form[data-e2e-modal-form]")
            .find("input[data-e2e-modal-form-text-input]")
            .should("not.be.disabled")

        // Submit button
        cy.get("form[data-e2e-modal-form]")
            .find("button[data-e2e-modal-form-submit-button]")
            .should("not.be.disabled")

    });

})